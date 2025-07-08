import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try {
        const { type, monthlyRevenue, location, hasWebsite, websiteUrl } = await request.json();

        const prompt = `
    Eres un experto consultor en desarrollo web y marketing digital en Chile con conocimiento actualizado del mercado 2025.
    
    Analiza este negocio y proporciona costos REALES de mercado:
    - Tipo: ${type}
    - Ventas mensuales: $${monthlyRevenue.toLocaleString()} CLP
    - Ubicacion: ${location}
    - Tiene sitio web profesional: ${hasWebsite ? 'Si' : 'No'}
    ${websiteUrl ? `- URL actual: ${websiteUrl}` : ''}
    
    Proporciona un analisis realista con precios REALES del mercado chileno en formato JSON:
    
    {
      "websiteCost": [numero - costo realista sitio web profesional en CLP],
      "monthlyLoss": [numero - dinero perdido mensual por falta de presencia digital],
      "monthlyGain": [numero - ganancia mensual estimada con sitio web],
      "paybackMonths": [numero - meses para recuperar inversion],
      "roi": [numero - ROI porcentual primer ano - máximo 400%],
      "yearlyGain": [numero - ganancia anual estimada],
      "netProfit": [numero - ganancia neta después de descontar inversión],
      "breakdown": [
        {
          "concept": "Descripcion especifica del problema",
          "amount": [numero - cantidad perdida por este concepto]
        }
      ],
      "recommendations": [
        "Recomendacion especifica 1",
        "Recomendacion especifica 2", 
        "Recomendacion especifica 3"
      ],
      "marketInsights": {
        "averageWebsiteCost": [numero - costo promedio mercado],
        "competitorAnalysis": "Análisis breve competencia local",
        "regionalFactors": "Factores específicos de la región"
      }
    }
    
    PRECIOS REALES MERCADO CHILENO 2025:
    
    SITIOS WEB PROFESIONALES:
    - Landing page básica: $300,000 - $500,000 CLP
    - Sitio corporativo: $600,000 - $1,200,000 CLP  
    - E-commerce básico: $800,000 - $1,500,000 CLP
    - E-commerce avanzado: $1,500,000 - $3,000,000 CLP
    - Aplicación web: $2,000,000 - $5,000,000 CLP
    
    FACTORES UBICACIÓN CHILE:
    - Santiago: +20% sobre promedio
    - Regiones principales: +10%
    - Castro/Chiloé: Precios estándar
    - Ciudades pequeñas: -10%
    
    FACTORES POR TIPO NEGOCIO:
    - Restaurante: Landing + reservas + menú digital
    - Hotel: Sitio corporativo + motor reservas + galería
    - Retail: E-commerce + inventario + pagos
    - Servicios: Sitio corporativo + portfolio + CRM
    
    PÉRDIDAS DIGITALES REALES:
    - Sin presencia digital: 15-25% ingresos perdidos
    - Sitio desactualizado: 8-15% pérdidas
    - No responsive: 40% usuarios móvil perdidos
    
    Considera factores especificos:
    - Turismo en Chiloe y Los Lagos
    - Competencia local
    - Busquedas Google en la region
    - Comportamiento digital de la zona
    - Estacionalidad del negocio
    
    Para ${type} en ${location}:
    - Si es restaurant: considera turistas, delivery, reservas online
    - Si es hotel: considera booking directo vs. plataformas, turismo estacional
    - Si es retail: considera e-commerce, redes sociales, marketplace
    - Si es servicios: considera lead generation, presencia profesional
    
    Se realista con los numeros. Evita ROIs inflados. Usa precios reales del mercado.
    `;

        const model = genAI.getGenerativeModel({ 
            model: 'gemini-1.5-flash',
            generationConfig: {
                temperature: 0.2,
                topK: 1,
                topP: 0.8,
                maxOutputTokens: 2048,
            },
        });

        const result = await model.generateContent(prompt);
        const analysisText = result.response.text();

        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found in Gemini response');
        }

        const analysis = JSON.parse(jsonMatch[0]);
        
        // Validaciones y límites realistas
        if (analysis.websiteCost) {
            analysis.websiteCost = Math.max(300000, Math.min(analysis.websiteCost, 3000000));
        }
        if (analysis.roi) {
            analysis.roi = Math.max(50, Math.min(analysis.roi, 400));
        }
        if (analysis.paybackMonths) {
            analysis.paybackMonths = Math.max(2, Math.min(analysis.paybackMonths, 24));
        }

        return Response.json(analysis);
    } catch (error) {
        console.error('ROI Analysis Error:', error);
        
        // Fallback con cálculos realistas
        const fallbackAnalysis = getFallbackAnalysis(type, monthlyRevenue, location, hasWebsite);
        
        return Response.json(fallbackAnalysis);
    }
}

function getFallbackAnalysis(type, monthlyRevenue, location, hasWebsite) {
    const baseCosts = {
        restaurant: 650000,
        hotel: 950000,
        retail: 850000,
        services: 550000
    };
    
    const locationMultipliers = {
        santiago: 1.2,
        valparaiso: 1.1,
        concepcion: 1.1,
        'puerto-montt': 1.0,
        castro: 1.0,
        chiloe: 1.0,
        osorno: 0.95,
        valdivia: 1.0,
        'los-lagos': 1.0,
        otras: 0.9
    };

    const websiteCost = Math.round(baseCosts[type] * (locationMultipliers[location] || 1.0));
    const lossPercentage = hasWebsite ? 0.08 : 0.18; // 8% si tiene web básica, 18% si no tiene
    const monthlyLoss = Math.round(monthlyRevenue * lossPercentage);
    const monthlyGain = Math.round(monthlyLoss * 0.6);
    const paybackMonths = Math.ceil(websiteCost / monthlyGain);
    const yearlyGain = monthlyGain * 12;
    const netProfit = yearlyGain - websiteCost;
    const roi = Math.min(Math.round((netProfit / websiteCost) * 100), 400);

    return {
        websiteCost,
        monthlyLoss,
        monthlyGain,
        paybackMonths,
        roi,
        yearlyGain,
        netProfit,
        breakdown: [
            {
                concept: 'Clientes que no te encuentran online',
                amount: Math.round(monthlyLoss * 0.4)
            },
            {
                concept: 'Pérdida de credibilidad profesional',
                amount: Math.round(monthlyLoss * 0.3)
            },
            {
                concept: 'Competencia con mejor presencia digital',
                amount: Math.round(monthlyLoss * 0.3)
            }
        ],
        recommendations: [
            'Sitio web profesional y responsive',
            'SEO local para aparecer en Google',
            'Integración con redes sociales',
            'Sistema de contacto efectivo'
        ],
        marketInsights: {
            averageWebsiteCost: websiteCost,
            competitorAnalysis: 'Análisis básico de competencia local',
            regionalFactors: `Factores específicos de ${location}`
        }
    };
}
