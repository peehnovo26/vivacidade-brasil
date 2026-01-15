/**
 * Utilitários para gerenciar Seals (Badges) de negócios
 * Seals são atribuídos automaticamente baseado em critérios de qualidade
 */

const Business = require('../models/Business');
const Review = require('../models/Review');

// Tipos de seals disponíveis
const SEAL_TYPES = {
  VERIFIED: 'verified',          // Negócio verificado (admin)
  TOP_RATED: 'top-rated',        // Rating >= 4.5
  EXCELLENT: 'excellent',        // Rating >= 4.8 E reviews >= 50
  AWARD_WINNING: 'award-winning' // Rating >= 4.9 E reviews >= 100
};

const SEAL_LABELS = {
  verified: '✓ Verificado',
  'top-rated': '⭐ Top Avaliado',
  excellent: '💎 Excelente',
  'award-winning': '🏆 Premiado'
};

const SEAL_COLORS = {
  verified: '#0066cc',    // Azul
  'top-rated': '#ffb300', // Ouro
  excellent: '#9933ff',   // Roxo
  'award-winning': '#ff6600' // Laranja
};

/**
 * Atualiza seals de um negócio baseado em rating e número de reviews
 */
async function updateBusinessSeals(businessId) {
  try {
    const business = await Business.findById(businessId).populate('reviews');
    if (!business) return;

    // Contar reviews
    const reviewCount = business.reviews ? business.reviews.length : 0;
    
    // Calcular rating médio
    const avgRating = business.rating || 0;

    // Iniciar com seals vazios (mantém 'verified' se já tem)
    const newSeals = business.seals && business.seals.includes(SEAL_TYPES.VERIFIED) 
      ? [SEAL_TYPES.VERIFIED] 
      : [];

    // Aplicar lógica de seals automáticos
    if (avgRating >= 4.5) {
      newSeals.push(SEAL_TYPES.TOP_RATED);
    }
    
    if (avgRating >= 4.8 && reviewCount >= 50) {
      newSeals.push(SEAL_TYPES.EXCELLENT);
    }
    
    if (avgRating >= 4.9 && reviewCount >= 100) {
      newSeals.push(SEAL_TYPES.AWARD_WINNING);
    }

    // Remover duplicatas
    const uniqueSeals = [...new Set(newSeals)];

    // Atualizar se houve mudanças
    if (JSON.stringify(uniqueSeals) !== JSON.stringify(business.seals)) {
      business.seals = uniqueSeals;
      await business.save();
    }

    return uniqueSeals;
  } catch (err) {
    console.error('Erro ao atualizar seals:', err);
  }
}

/**
 * Adiciona manualmente um seal verificado
 */
async function addVerifiedSeal(businessId) {
  try {
    const business = await Business.findById(businessId);
    if (!business) return null;

    if (!business.seals.includes(SEAL_TYPES.VERIFIED)) {
      business.seals.push(SEAL_TYPES.VERIFIED);
      await business.save();
    }

    return business.seals;
  } catch (err) {
    console.error('Erro ao adicionar seal verificado:', err);
  }
}

/**
 * Remove um seal de um negócio
 */
async function removeSeal(businessId, sealType) {
  try {
    const business = await Business.findById(businessId);
    if (!business) return null;

    business.seals = business.seals.filter(s => s !== sealType);
    await business.save();

    return business.seals;
  } catch (err) {
    console.error('Erro ao remover seal:', err);
  }
}

/**
 * Atualiza todos os seals de todos os negócios
 * Executado periodicamente
 */
async function updateAllBusinessSeals() {
  try {
    const businesses = await Business.find();
    const results = await Promise.all(
      businesses.map(b => updateBusinessSeals(b._id))
    );
    console.log(`Seals atualizados para ${results.length} negócios`);
    return results;
  } catch (err) {
    console.error('Erro ao atualizar seals de todos negócios:', err);
  }
}

module.exports = {
  SEAL_TYPES,
  SEAL_LABELS,
  SEAL_COLORS,
  updateBusinessSeals,
  addVerifiedSeal,
  removeSeal,
  updateAllBusinessSeals
};
