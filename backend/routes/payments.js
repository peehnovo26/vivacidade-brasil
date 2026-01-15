const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const PLANS = {
  'free': {
    name: 'Grátis',
    price: 0,
    stripePriceId: null
  },
  'start': {
    name: 'Start',
    price: 2990, // R$ 29,90 em centavos
    stripePriceId: process.env.STRIPE_PRICE_START || 'price_start_plan'
  },
  'plus': {
    name: 'Plus',
    price: 4990, // R$ 49,90 em centavos
    stripePriceId: process.env.STRIPE_PRICE_PLUS || 'price_plus_plan'
  },
  'elite': {
    name: 'Elite',
    price: 7990, // R$ 79,90 em centavos
    stripePriceId: process.env.STRIPE_PRICE_ELITE || 'price_elite_plan'
  }
};

// Get Stripe public key
router.get('/stripe-key', (req, res) => {
  try {
    res.json({ publicKey: process.env.STRIPE_PUBLIC_KEY });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create subscription
router.post('/subscribe', async (req, res) => {
  try {
    const { plan, paymentMethodId, email, name } = req.body;

    if (!PLANS[plan]) {
      return res.status(400).json({ error: 'Plano inválido' });
    }

    // Se for plano grátis, apenas retornar sucesso
    if (plan === 'free') {
      return res.json({ 
        msg: 'Plano grátis ativado',
        plan: 'free'
      });
    }

    // Criar customer se não existir
    let customer = await stripe.customers.list({
      email: email,
      limit: 1
    });

    let customerId;
    if (customer.data.length > 0) {
      customerId = customer.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: email,
        name: name
      });
      customerId = newCustomer.id;
    }

    // Attach payment method to customer
    if (paymentMethodId) {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId
      });

      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });
    }

    // Criar subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: PLANS[plan].stripePriceId
        }
      ],
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription'
      }
    });

    res.json({
      msg: 'Assinatura criada com sucesso',
      subscriptionId: subscription.id,
      clientSecret: subscription.client_secret,
      plan: plan
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Webhook para confirmar pagamento
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object;
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
      console.log('Pagamento bem-sucedido para:', subscription.customer);
    }

    if (event.type === 'customer.subscription.deleted') {
      console.log('Assinatura cancelada');
    }

    res.json({received: true});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get subscription status
router.get('/status', async (req, res) => {
  try {
    const { customerId } = req.query;
    
    if (!customerId) {
      return res.status(400).json({ error: 'customerId é obrigatório' });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1
    });

    if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0];
      res.json({
        status: subscription.status,
        plan: subscription.items.data[0].price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
      });
    } else {
      res.json({ status: 'none' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel subscription
router.post('/cancel', async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ error: 'subscriptionId é obrigatório' });
    }

    await stripe.subscriptions.del(subscriptionId);

    res.json({ msg: 'Assinatura cancelada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create PIX Payment
router.post('/create-pix', async (req, res) => {
  try {
    const { plan, email, name, amount } = req.body;

    if (!PLANS[plan]) {
      return res.status(400).json({ error: 'Plano inválido' });
    }

    const planPrice = PLANS[plan].price;

    // Criar Payment Intent para PIX
    const paymentIntent = await stripe.paymentIntents.create({
      amount: planPrice,
      currency: 'brl',
      payment_method_types: ['br_pix'],
      metadata: {
        plan: plan,
        email: email,
        name: name
      }
    });

    // Confirmar pagamento automaticamente
    const confirmedIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: (await stripe.paymentMethods.list({
        limit: 1,
        type: 'br_pix'
      })).data[0]?.id || 'pm_default'
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      qrCode: paymentIntent.charges?.data[0]?.receipt_email || 'PIX_QR_CODE',
      expiresIn: '10 minutes'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Erro ao gerar PIX' });
  }
});

// Create Boleto Payment
router.post('/create-boleto', async (req, res) => {
  try {
    const { plan, email, name, cpfCnpj, amount } = req.body;

    if (!PLANS[plan]) {
      return res.status(400).json({ error: 'Plano inválido' });
    }

    const planPrice = PLANS[plan].price;

    // Criar Payment Intent para Boleto
    const paymentIntent = await stripe.paymentIntents.create({
      amount: planPrice,
      currency: 'brl',
      payment_method_types: ['boleto'],
      metadata: {
        plan: plan,
        email: email,
        name: name,
        cpfCnpj: cpfCnpj
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      barcode: '12345.67890 12345.678901 12345.678901 1 12345678901234',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 dias
      expiresIn: '3 business days'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Erro ao gerar boleto' });
  }
});

module.exports = router;
