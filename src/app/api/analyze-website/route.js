import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return Response.json({ error: 'URL required' }, { status: 400 });
        }

        const analysis = await analyzeWebsiteWithAI(url);
        return Response.json(analysis);
    } catch (error) {
        console.error('Website analysis error:', error);
        return Response.json(
            {
                error: 'Error analyzing website',
                overallScore: 0,
                speed: 0,
                seo: 0,
                mobile: 0,
                criticalIssues: ['No se pudo analizar el sitio web'],
            },
            { status: 500 }
        );
    }
}

async function analyzeWebsiteWithAI(url) {
    let html = '';
    let loadTime = 3000;
    
    try {
        // Primero intentamos obtener el HTML
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const startTime = Date.now();
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; CrowAdvance-Analyzer/1.0)',
            },
        });
        loadTime = Date.now() - startTime;

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        html = await response.text();
        
        // Intentamos análisis con AI con retry logic
        const aiAnalysis = await tryAIAnalysis(url, html, loadTime);
        if (aiAnalysis) {
            return aiAnalysis;
        }
        
    } catch (error) {
        console.error('Error fetching website:', error);
    }
    
    // Fallback: siempre usar análisis básico si AI falla
    return await analyzeWebsiteBasic(url, html, loadTime);
}

async function tryAIAnalysis(url, html, loadTime, retries = 3) {
    const cleanHtml = html.substring(0, 8000);
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`AI Analysis attempt ${attempt}/${retries} for ${url}`);
            
            const prompt = `
Eres un experto en analisis de sitios web, SEO, UX y performance. 

Analiza este sitio web (${url}) basandote en el HTML proporcionado y el tiempo de carga de ${loadTime}ms.

HTML del sitio (primeros 8000 caracteres):
${cleanHtml}

Proporciona un analisis detallado en formato JSON con:

{
  "url": "${url}",
  "overallScore": [numero del 0-100 - puntuacion general],
  "speed": [numero del 0-100 - puntuacion de velocidad],
  "seo": [numero del 0-100 - puntuacion SEO],
  "mobile": [numero del 0-100 - puntuacion movil],
  "hasContactForm": [boolean - tiene formulario contacto],
  "hasWhatsApp": [boolean - tiene WhatsApp],
  "criticalIssues": [
    "Problema critico 1",
    "Problema critico 2"
  ],
  "recommendations": [
    "Recomendacion especifica 1",
    "Recomendacion especifica 2",
    "Recomendacion especifica 3"
  ]
}

Criterios de evaluacion:

VELOCIDAD (0-100):
- ${loadTime}ms de carga
- Tamano del HTML
- Optimizacion de recursos

SEO (0-100):
- Title tag (presente, longitud, relevancia)
- Meta description
- Estructura H1, H2, H3
- Imagenes con alt text
- URLs amigables
- Estructura semantica (header, main, section)
- Schema markup

MOVIL (0-100):
- Viewport meta tag
- Diseno responsive (clases CSS, media queries)
- Navegacion movil
- Tamanos de texto apropiados
- Elementos tactiles

PROBLEMAS CRITICOS detectar:
- Falta de HTTPS
- Tiempo de carga >3 segundos
- Sin viewport meta
- Sin title o muy corto
- Sin meta description
- Muchas imagenes sin alt
- No responsive
- Contenido generico (Lorem ipsum)

RECOMENDACIONES especificas para mejorar cada aspecto.

Se preciso y especifico en el analisis basandote en el HTML real proporcionado.
`;

            const model = genAI.getGenerativeModel({ 
                model: 'gemini-1.5-flash',
                generationConfig: {
                    temperature: 0.1,
                    topK: 1,
                    topP: 0.8,
                    maxOutputTokens: 2048,
                },
            });
            
            const result = await model.generateContent(prompt);
            const analysisText = result.response.text();

            const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.warn(`AI Analysis attempt ${attempt}: No JSON found in response`);
                continue;
            }

            const analysis = JSON.parse(jsonMatch[0]);

            if (!analysis.overallScore || !analysis.speed || !analysis.seo || !analysis.mobile) {
                console.warn(`AI Analysis attempt ${attempt}: Invalid analysis structure`);
                continue;
            }

            console.log(`AI Analysis successful on attempt ${attempt}`);
            return analysis;
            
        } catch (error) {
            console.error(`AI Analysis attempt ${attempt} failed:`, error);
            
            // Si es error 503 (sobrecarga), esperamos antes del siguiente intento
            if (error.status === 503 && attempt < retries) {
                console.log(`Waiting ${attempt * 2} seconds before retry...`);
                await new Promise(resolve => setTimeout(resolve, attempt * 2000));
                continue;
            }
            
            // Si es el último intento o un error diferente, salimos
            if (attempt === retries) {
                console.error('All AI analysis attempts failed, using fallback');
                return null;
            }
        }
    }
    
    return null;
}

async function analyzeWebsiteBasic(url, html, loadTime) {
    console.log(`Using basic analysis for ${url}`);
    
    const analysis = {
        url: url,
        overallScore: 0,
        speed: 0,
        seo: 0,
        mobile: 0,
        hasContactForm: false,
        hasWhatsApp: false,
        criticalIssues: [],
        recommendations: [],
    };

    // Si no tenemos HTML, generamos un análisis básico
    if (!html) {
        analysis.overallScore = 30;
        analysis.speed = 25;
        analysis.seo = 20;
        analysis.mobile = 45;
        analysis.criticalIssues = [
            'No se pudo acceder al sitio web',
            'Verificar que la URL sea correcta',
            'Posible problema de conectividad'
        ];
        analysis.recommendations = [
            'Verificar que el sitio esté online',
            'Revisar configuración de DNS',
            'Contactar al proveedor de hosting'
        ];
        return analysis;
    }

    try {
        analysis.speed = calculateSpeedScore(loadTime);
        analysis.seo = analyzeSEO(html);
        analysis.mobile = analyzeMobile(html);

        analysis.hasContactForm =
            html.includes('<form') &&
            (html.includes('contact') ||
                html.includes('contacto') ||
                html.includes('email') ||
                html.includes('mensaje'));

        analysis.hasWhatsApp = html.includes('whatsapp') || html.includes('wa.me');

        analysis.overallScore = Math.round((analysis.speed + analysis.seo + analysis.mobile) / 3);
        analysis.criticalIssues = identifyCriticalIssues(analysis, html, loadTime);

        // Recomendaciones específicas basadas en el análisis
        analysis.recommendations = generateRecommendations(analysis);

    } catch (error) {
        console.error('Error in basic analysis:', error);
        // Valores por defecto si hay error
        analysis.overallScore = 40;
        analysis.speed = 40;
        analysis.seo = 35;
        analysis.mobile = 45;
        analysis.recommendations = [
            'Optimizar velocidad de carga',
            'Mejorar SEO básico',
            'Asegurar compatibilidad móvil',
        ];
    }

    return analysis;
}

function generateRecommendations(analysis) {
    const recommendations = [];
    
    if (analysis.speed < 70) {
        recommendations.push('Optimizar velocidad de carga - comprimir imágenes y minificar CSS/JS');
    }
    
    if (analysis.seo < 60) {
        recommendations.push('Mejorar SEO - agregar meta description y optimizar títulos');
    }
    
    if (analysis.mobile < 60) {
        recommendations.push('Implementar diseño responsive para móviles');
    }
    
    if (!analysis.hasContactForm) {
        recommendations.push('Agregar formulario de contacto funcional');
    }
    
    if (!analysis.hasWhatsApp) {
        recommendations.push('Integrar WhatsApp para contacto directo');
    }
    
    if (recommendations.length === 0) {
        recommendations.push('Continuar optimizando la experiencia del usuario');
    }
    
    return recommendations;
}

function calculateSpeedScore(loadTime) {
    if (loadTime < 1000) return 95;
    if (loadTime < 2000) return 85;
    if (loadTime < 3000) return 70;
    if (loadTime < 5000) return 50;
    return 25;
}

function analyzeSEO(html) {
    let score = 100;

    const hasTitle = /<title[^>]*>([^<]+)<\/title>/i.test(html);
    if (!hasTitle) score -= 20;

    const hasMetaDesc = /meta[^>]*name=['"]description['"][^>]*content=['"]([^'"]+)['"]/i.test(
        html
    );
    if (!hasMetaDesc) score -= 20;

    const hasH1 = /<h1[^>]*>([^<]+)<\/h1>/i.test(html);
    if (!hasH1) score -= 15;

    const images = html.match(/<img[^>]*>/gi) || [];
    const imagesWithoutAlt = images.filter((img) => !img.includes('alt=')).length;
    if (imagesWithoutAlt > 0) score -= Math.min(25, imagesWithoutAlt * 5);

    const hasSemanticTags =
        html.includes('<header') || html.includes('<main') || html.includes('<section');
    if (!hasSemanticTags) score -= 10;

    return Math.max(0, score);
}

function analyzeMobile(html) {
    let score = 100;

    const hasViewport = /meta[^>]*name=['"]viewport['"]/i.test(html);
    if (!hasViewport) score -= 30;

    const hasBootstrap = html.includes('bootstrap') || html.includes('col-');
    const hasTailwind = html.includes('tailwind') || html.includes('md:') || html.includes('sm:');
    const hasMediaQueries = html.includes('@media');
    const hasFlexGrid = html.includes('flex') || html.includes('grid');

    if (!(hasBootstrap || hasTailwind || hasMediaQueries || hasFlexGrid)) {
        score -= 40;
    }

    const hasMobileNav =
        html.includes('hamburger') || html.includes('menu-toggle') || html.includes('mobile-menu');
    if (!hasMobileNav) score -= 15;

    const hasFixedFontSizes = /font-size:\s*\d+px/gi.test(html);
    if (hasFixedFontSizes) score -= 15;

    return Math.max(0, score);
}

function identifyCriticalIssues(analysis, html, loadTime) {
    const issues = [];

    if (loadTime > 5000) {
        issues.push('Tiempo de carga extremadamente lento (+5 segundos)');
    } else if (loadTime > 3000) {
        issues.push('Tiempo de carga lento (+3 segundos)');
    }

    if (analysis.seo < 50) {
        issues.push('SEO muy deficiente - no apareceras en Google');
    }

    if (analysis.mobile < 50) {
        issues.push('No optimizado para moviles - pierdes 70% de visitantes');
    }

    if (!analysis.hasContactForm) {
        issues.push('Falta formulario de contacto efectivo');
    }

    if (!analysis.url.startsWith('https://')) {
        issues.push('Sitio no seguro (sin HTTPS) - Google penaliza');
    }

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1].length < 20) {
        issues.push('Titulo muy corto - malo para SEO');
    }

    const hasGenericContent =
        html.includes('Lorem ipsum') ||
        html.includes('Sample text') ||
        html.includes('Your company name');
    if (hasGenericContent) {
        issues.push('Contenido generico detectado - falta personalizacion');
    }

    return issues;
}
