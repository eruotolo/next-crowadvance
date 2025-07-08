import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try {
        const { type, monthlyRevenue, location, hasWebsite } = await request.json();

        const prompt = `
    Eres un experto en marketing digital y ROI para pequenos negocios en Chile.
    
    Analiza este negocio:
    - Tipo: ${type}
    - Ventas mensuales: $${monthlyRevenue} CLP
    - Ubicacion: ${location}
    - Tiene sitio web profesional: ${hasWebsite ? 'Si' : 'No'}
    
    Proporciona un analisis realista y especifico para Chile en formato JSON con:
    
    {
      "monthlyLoss": [numero - dinero perdido mensual por falta de presencia digital],
      "roi": [numero - ROI porcentual en primer ano],
      "paybackMonths": [numero - meses para recuperar inversion],
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
      ]
    }
    
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
    
    Se realista con los numeros para el contexto chileno.
    Si ya tiene sitio web, enfocate en optimizacion y mejoras.
    `;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent(prompt);
        const analysisText = result.response.text();

        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found in Gemini response');
        }

        const analysis = JSON.parse(jsonMatch[0]);

        return Response.json(analysis);
    } catch (error) {
        console.error('ROI Analysis Error:', error);
        return Response.json(
            {
                error: 'Error analyzing business',
                monthlyLoss: 0,
                roi: 0,
                breakdown: [],
                recommendations: ['Error al procesar analisis. Intenta nuevamente.'],
            },
            { status: 500 }
        );
    }
}
