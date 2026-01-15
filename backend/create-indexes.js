/**
 * Script para criar índices no MongoDB
 * Melhora significativamente a performance de queries
 */

require('dotenv').config();
const mongoose = require('mongoose');

// Importar modelos
const Business = require('./models/Business');
const User = require('./models/User');
const Review = require('./models/Review');
const Event = require('./models/Event');
const Coupon = require('./models/Coupon');

async function createIndexes() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Conectado ao MongoDB. Criando índices...\n');

        // Índices para Business
        console.log('Criando índices para Business...');
        await Business.collection.createIndex({ name: 'text', description: 'text' });
        await Business.collection.createIndex({ city: 1 });
        await Business.collection.createIndex({ category: 1 });
        await Business.collection.createIndex({ plan: 1 });
        await Business.collection.createIndex({ owner: 1 });
        await Business.collection.createIndex({ featured: 1, rating: -1 });
        await Business.collection.createIndex({ createdAt: -1 });
        await Business.collection.createIndex({ rating: -1 });
        console.log('✓ Índices de Business criados\n');

        // Índices para User
        console.log('Criando índices para User...');
        await User.collection.createIndex({ email: 1 }, { unique: true });
        await User.collection.createIndex({ createdAt: -1 });
        await User.collection.createIndex({ 'subscription.status': 1 });
        console.log('✓ Índices de User criados\n');

        // Índices para Review
        console.log('Criando índices para Review...');
        await Review.collection.createIndex({ businessId: 1 });
        await Review.collection.createIndex({ userId: 1 });
        await Review.collection.createIndex({ rating: -1 });
        await Review.collection.createIndex({ createdAt: -1 });
        await Review.collection.createIndex({ businessId: 1, createdAt: -1 });
        console.log('✓ Índices de Review criados\n');

        // Índices para Event
        console.log('Criando índices para Event...');
        await Event.collection.createIndex({ businessId: 1 });
        await Event.collection.createIndex({ date: 1 });
        await Event.collection.createIndex({ city: 1 });
        await Event.collection.createIndex({ createdAt: -1 });
        await Event.collection.createIndex({ businessId: 1, date: 1 });
        console.log('✓ Índices de Event criados\n');

        // Índices para Coupon
        console.log('Criando índices para Coupon...');
        await Coupon.collection.createIndex({ code: 1 }, { unique: true });
        await Coupon.collection.createIndex({ businessId: 1 });
        await Coupon.collection.createIndex({ active: 1 });
        await Coupon.collection.createIndex({ expiresAt: 1 });
        await Coupon.collection.createIndex({ businessId: 1, active: 1 });
        console.log('✓ Índices de Coupon criados\n');

        console.log('✅ Todos os índices foram criados com sucesso!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Erro ao criar índices:', err.message);
        process.exit(1);
    }
}

createIndexes();
