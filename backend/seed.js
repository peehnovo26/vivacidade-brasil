const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Business = require('./models/Business');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Business.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Administrador',
      email: 'admin@vivacidade.com',
      password: 'Admin@123',
      role: 'admin'
    });

    console.log('✓ Admin user created');

    // Create test users
    const user = await User.create({
      name: 'Usuário Teste',
      email: 'user@vivacidade.com',
      password: 'User@123',
      role: 'user'
    });

    console.log('✓ Test user created');

    // Create sample businesses
    const businesses = [
      {
        name: 'Hotel Fazenda Serra Verde',
        category: 'Hospedagem',
        city: 'Itatiaia',
        description: 'Experiência única na Serra da Mantiqueira com piscina natural e trilhas exclusivas.',
        address: 'Estrada Rio-Niterói, Km 350 - Itatiaia',
        phone: '(24) 3352-1234',
        email: 'info@hotelserraverde.com.br',
        website: 'https://www.hotelserraverde.com.br',
        rating: 4.9,
        plan: 'elite',
        featured: true,
        owner: admin._id,
        tags: ['luxo', 'natureza', 'romântico'],
        discount: 20
      },
      {
        name: 'Sabor da Serra',
        category: 'Gastronomia',
        city: 'Resende',
        description: 'Culinária regional com ingredientes orgânicos da fazenda própria.',
        address: 'Rua Principal, 123 - Resende',
        phone: '(24) 3354-5678',
        email: 'contato@sabordaserra.com.br',
        website: 'https://www.sabordaserra.com.br',
        rating: 4.8,
        plan: 'plus',
        featured: true,
        owner: admin._id,
        tags: ['comida caseira', 'orgânico', 'ambiente agradável']
      },
      {
        name: 'Parque Nacional do Itatiaia',
        category: 'Turismo',
        city: 'Itatiaia',
        description: 'O primeiro parque nacional do Brasil com trilhas incríveis e cachoeiras.',
        address: 'Estrada do Parque Nacional - Itatiaia',
        phone: '(24) 3352-8901',
        rating: 4.9,
        plan: 'elite',
        featured: true,
        owner: admin._id,
        tags: ['trilhas', 'cachoeiras', 'ecoturismo']
      },
      {
        name: 'Pousada Recanto Serrano',
        category: 'Hospedagem',
        city: 'Itatiaia',
        description: 'Aconchego montanhês com vista panorâmica da Serra da Mantiqueira.',
        address: 'Estrada para Itatiaia, Km 5',
        phone: '(24) 3352-2234',
        email: 'reservas@recantoserrano.com.br',
        rating: 4.7,
        plan: 'plus',
        owner: admin._id,
        tags: ['aconchego', 'vista', 'familiar']
      },
      {
        name: 'Restaurante Típico Fluminense',
        category: 'Gastronomia',
        city: 'Barra Mansa',
        description: 'Receitas tradicionais da culinária fluminense preparadas com carinho.',
        address: 'Centro de Barra Mansa',
        phone: '(24) 3333-1111',
        rating: 4.6,
        plan: 'free',
        owner: admin._id,
        tags: ['comida típica', 'tradicional', 'família']
      },
      {
        name: 'Trilhas e Aventuras',
        category: 'Turismo',
        city: 'Resende',
        description: 'Empresa especializada em trilhas guiadas e atividades de aventura.',
        address: 'Avenida Brasil - Resende',
        phone: '(24) 3366-7788',
        website: 'https://trilhaseaventuras.com',
        rating: 4.8,
        plan: 'plus',
        owner: admin._id,
        tags: ['trilhas', 'aventura', 'guiado']
      },
      {
        name: 'Loja de Artesanato Local',
        category: 'Comércio e Serviços',
        city: 'Quatis',
        description: 'Produtos artesanais e souvenirs da região Sul Fluminense.',
        address: 'Praça Central - Quatis',
        phone: '(24) 3312-5555',
        rating: 4.5,
        plan: 'free',
        owner: admin._id,
        tags: ['artesanato', 'local', 'souvenirs']
      },
      {
        name: 'Fábrica de Cachaça Premium',
        category: 'Comércio e Serviços',
        city: 'Porto Real',
        description: 'Produção artesanal de cachaça de qualidade com visitas guiadas.',
        address: 'Km 312 - Porto Real',
        phone: '(24) 3388-9999',
        website: 'https://cachacapremium.com.br',
        rating: 4.7,
        plan: 'plus',
        owner: admin._id,
        tags: ['bebidas', 'visitas', 'artesanal']
      }
    ];

    await Business.insertMany(businesses);
    console.log(`✓ ${businesses.length} businesses created`);

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
    process.exit(1);
  }
};

seedDatabase();
