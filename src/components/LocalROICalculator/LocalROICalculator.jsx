'use client';

import { useState } from 'react';
import { ArrowRight, Calculator, TrendingUp, AlertCircle } from 'lucide-react';

export default function LocalROICalculator() {
    const [formData, setFormData] = useState({
        type: 'restaurant',
        monthlyRevenue: 0,
        location: 'castro',
        hasWebsite: false,
        websiteUrl: '',
    });

    const [analysis, setAnalysis] = useState(null);
    const [websiteAnalysis, setWebsiteAnalysis] = useState(null);
    const [isAnalyzingWebsite, setIsAnalyzingWebsite] = useState(false);

    // Función para analizar sitio web
    const analyzeWebsite = async (url) => {
        if (!url) return null;

        setIsAnalyzingWebsite(true);

        try {
            // Normalizar URL
            let cleanUrl = url.trim();
            if (!cleanUrl.startsWith('http')) {
                cleanUrl = 'https://' + cleanUrl;
            }

            const response = await fetch('/api/analyze-website', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: cleanUrl }),
            });

            const result = await response.json();
            setWebsiteAnalysis(result);
            return result;
        } catch (error) {
            console.error('Error analyzing website:', error);
            return null;
        } finally {
            setIsAnalyzingWebsite(false);
        }
    };

    // Lógica de cálculo MEJORADA con análisis web y costos reales de IA
    const calculateROI = async () => {
        const { type, monthlyRevenue, location, hasWebsite, websiteUrl } = formData;

        if (!monthlyRevenue) return;

        try {
            // Análisis paralelo: website + ROI con IA
            const promises = [];
            
            // Si tiene website, analizarlo
            if (hasWebsite && websiteUrl) {
                promises.push(analyzeWebsite(websiteUrl));
            } else {
                promises.push(Promise.resolve(null));
            }
            
            // Análisis ROI con IA (costos reales)
            promises.push(
                fetch('/api/gemini/roi-analysis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type,
                        monthlyRevenue,
                        location,
                        hasWebsite,
                        websiteUrl: websiteUrl || null,
                    }),
                })
                .then(res => res.json())
            );

            const [websiteScore, roiAnalysis] = await Promise.all(promises);

            // Usar datos de la IA o fallback
            const analysis = {
                monthlyLoss: roiAnalysis.monthlyLoss,
                roi: roiAnalysis.roi,
                paybackMonths: roiAnalysis.paybackMonths,
                websiteCost: roiAnalysis.websiteCost,
                monthlyGain: roiAnalysis.monthlyGain,
                yearlyGain: roiAnalysis.yearlyGain,
                netProfit: roiAnalysis.netProfit,
                breakdown: roiAnalysis.breakdown || [],
                recommendations: roiAnalysis.recommendations || [],
                marketInsights: roiAnalysis.marketInsights || {},
                websiteAnalyzed: !!websiteScore,
                websiteUrl: websiteUrl || null,
            };

            // Si hay análisis de website, ajustar breakdown con problemas específicos
            if (websiteScore) {
                const websiteIssues = [];

                if (websiteScore.speed < 70) {
                    websiteIssues.push({
                        concept: 'Sitio web muy lento (pierdes visitantes)',
                        amount: Math.round(analysis.monthlyLoss * 0.25),
                    });
                }

                if (websiteScore.seo < 60) {
                    websiteIssues.push({
                        concept: 'SEO deficiente (no apareces en Google)',
                        amount: Math.round(analysis.monthlyLoss * 0.3),
                    });
                }

                if (websiteScore.mobile < 70) {
                    websiteIssues.push({
                        concept: 'No optimizado para móviles',
                        amount: Math.round(analysis.monthlyLoss * 0.2),
                    });
                }

                if (!websiteScore.hasContactForm) {
                    websiteIssues.push({
                        concept: 'Falta formulario de contacto efectivo',
                        amount: Math.round(analysis.monthlyLoss * 0.15),
                    });
                }

                if (websiteIssues.length > 0) {
                    analysis.breakdown = websiteIssues;
                }
            }

            setAnalysis(analysis);
            
        } catch (error) {
            console.error('Error en cálculo ROI:', error);
            
            // Fallback local si falla la IA
            const fallbackAnalysis = calculateFallbackROI();
            setAnalysis(fallbackAnalysis);
        }
    };

    // Función fallback local
    const calculateFallbackROI = () => {
        const { type, monthlyRevenue, location, hasWebsite, websiteUrl } = formData;

        const baseCosts = {
            restaurant: 650000,
            hotel: 950000,
            retail: 850000,
            services: 550000
        };

        const locationMultipliers = {
            'castro': 1.0,
            'puerto-montt': 1.0,
            'chiloe': 1.0,
            'osorno': 0.95,
            'valdivia': 1.0,
            'los-lagos': 1.0,
            'otras': 0.9
        };

        const websiteCost = Math.round(baseCosts[type] * (locationMultipliers[location] || 1.0));
        const lossPercentage = hasWebsite ? 0.08 : 0.18;
        const monthlyLoss = Math.round(monthlyRevenue * lossPercentage);
        const monthlyGain = Math.round(monthlyLoss * 0.6);
        const paybackMonths = Math.ceil(websiteCost / monthlyGain);
        const yearlyGain = monthlyGain * 12;
        const netProfit = yearlyGain - websiteCost;
        const roi = Math.min(Math.round((netProfit / websiteCost) * 100), 400);

        return {
            monthlyLoss,
            roi,
            paybackMonths,
            websiteCost,
            monthlyGain,
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
            websiteAnalyzed: false,
            websiteUrl: websiteUrl || null,
        };
    };

    return (
        <section className="py-[70px]">
            <div className="container mx-auto px-[20px] md:px-[32px]">
                {/* Header section */}
                <div className="mb-[40px] text-center">
                    <div className="mb-[20px] flex justify-center">
                        <div className="bg-purpura text-blanco flex h-[50px] w-[50px] items-center justify-center rounded-full">
                            <Calculator size={24} strokeWidth={1.5} />
                        </div>
                    </div>
                    <h2 className="text-negro mb-[20px] text-[32px] leading-[40px] font-bold xl:text-[48px] xl:leading-[56px]">
                        ¿CUÁNTO <span className="text-rosa">DINERO</span> PIERDES
                    </h2>
                    <h2 className="text-negro mb-[20px] text-[32px] leading-[40px] font-bold xl:text-[48px] xl:leading-[56px]">
                        CADA MES?
                    </h2>
                    <p className="text-grisoscuro text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] xl:px-[200px]">
                        Calculadora gratuita para negocios de Castro y Los Lagos. Descubre el
                        impacto real de no tener presencia digital profesional.
                    </p>
                </div>

                {/* Grid principal */}
                <div className="grid gap-[30px] md:grid-cols-2">
                    {/* Formulario */}
                    <div className="bg-blanco rounded-[10px] p-[30px] shadow-lg">
                        <h3 className="text-negro mb-[30px] text-[24px] leading-[30px] font-bold md:text-[28px] md:leading-[34px]">
                            Datos de tu negocio
                        </h3>

                        <div className="space-y-[20px]">
                            <div>
                                <label className="text-grisoscuro mb-[10px] block text-[14px] leading-[20px] font-medium">
                                    Tipo de negocio
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({ ...formData, type: e.target.value })
                                    }
                                    className="border-gris focus:border-purpura w-full rounded-[8px] border-2 p-[12px] text-[16px] transition-colors focus:outline-none"
                                >
                                    <option value="restaurant">🍽️ Restaurante</option>
                                    <option value="hotel">🏨 Hotel/Hospedaje</option>
                                    <option value="retail">🛍️ Tienda/Retail</option>
                                    <option value="services">💼 Servicios Profesionales</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-grisoscuro mb-[10px] block text-[14px] leading-[20px] font-medium">
                                    Ventas mensuales aproximadas
                                </label>
                                <div className="relative">
                                    <span className="text-grisoscuro absolute top-[12px] left-[12px] text-[16px]">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        value={formData.monthlyRevenue || ''}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                monthlyRevenue: parseInt(e.target.value) || 0,
                                            })
                                        }
                                        placeholder="2,500,000"
                                        className="border-gris focus:border-purpura w-full rounded-[8px] border-2 p-[12px] pr-[50px] pl-[32px] text-[16px] transition-colors focus:outline-none"
                                    />
                                    <span className="text-grisoscuro absolute top-[12px] right-[12px] text-[16px]">
                                        CLP
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="text-grisoscuro mb-[10px] block text-[14px] leading-[20px] font-medium">
                                    Ubicación
                                </label>
                                <select
                                    value={formData.location}
                                    onChange={(e) =>
                                        setFormData({ ...formData, location: e.target.value })
                                    }
                                    className="border-gris focus:border-purpura w-full rounded-[8px] border-2 p-[12px] text-[16px] transition-colors focus:outline-none"
                                >
                                    <option value="castro">Castro</option>
                                    <option value="puerto-montt">Puerto Montt</option>
                                    <option value="osorno">Osorno</option>
                                    <option value="valdivia">Valdivia</option>
                                    <option value="chiloe">Otro lugar Chiloé</option>
                                    <option value="los-lagos">Otra ciudad Los Lagos</option>
                                    <option value="otras">Otra ubicación de Chile</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-grisoscuro mb-[10px] block text-[14px] leading-[20px] font-medium">
                                    ¿Tienes sitio web profesional?
                                </label>
                                <div className="space-y-[15px]">
                                    <div className="flex flex-col gap-[10px] md:flex-row md:gap-[20px]">
                                        <label className="flex cursor-pointer items-center">
                                            <input
                                                type="radio"
                                                name="hasWebsite"
                                                checked={!formData.hasWebsite}
                                                onChange={() =>
                                                    setFormData({
                                                        ...formData,
                                                        hasWebsite: false,
                                                        websiteUrl: '',
                                                    })
                                                }
                                                className="text-purpura focus:ring-purpura mr-[8px]"
                                            />
                                            <span className="text-grisoscuro text-[14px]">
                                                No tengo o es muy básico
                                            </span>
                                        </label>
                                        <label className="flex cursor-pointer items-center">
                                            <input
                                                type="radio"
                                                name="hasWebsite"
                                                checked={formData.hasWebsite}
                                                onChange={() =>
                                                    setFormData({ ...formData, hasWebsite: true })
                                                }
                                                className="text-purpura focus:ring-purpura mr-[8px]"
                                            />
                                            <span className="text-grisoscuro text-[14px]">
                                                Sí, tengo uno profesional
                                            </span>
                                        </label>
                                    </div>

                                    {formData.hasWebsite && (
                                        <div className="bg-gris mt-[15px] rounded-[8px] p-[15px]">
                                            <label className="text-purpura mb-[10px] block text-[14px] leading-[20px] font-medium">
                                                🔗 URL de tu sitio web (para análisis automático):
                                            </label>
                                            <input
                                                type="url"
                                                value={formData.websiteUrl}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        websiteUrl: e.target.value,
                                                    })
                                                }
                                                placeholder="https://tu-sitio-web.com"
                                                className="border-purpura focus:border-rosa w-full rounded-[8px] border-2 p-[12px] text-[16px] transition-colors focus:outline-none"
                                            />
                                            <p className="text-purpura mt-[8px] text-[12px]">
                                                ⚡ Analizaremos velocidad, SEO, móvil y más
                                                automáticamente
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={calculateROI}
                                disabled={
                                    !formData.monthlyRevenue ||
                                    (formData.hasWebsite && isAnalyzingWebsite)
                                }
                                className="bg-purpura hover:bg-rosa text-blanco flex w-full cursor-pointer items-center justify-center rounded-[8px] p-[15px] text-[16px] font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isAnalyzingWebsite ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Analizando tu sitio web...
                                    </span>
                                ) : formData.hasWebsite && formData.websiteUrl ? (
                                    <>
                                        <TrendingUp
                                            size={20}
                                            strokeWidth={1.5}
                                            className="mr-[8px]"
                                        />
                                        Analizar mi sitio web + ROI
                                    </>
                                ) : (
                                    <>
                                        <Calculator
                                            size={20}
                                            strokeWidth={1.5}
                                            className="mr-[8px]"
                                        />
                                        Calcular pérdidas GRATIS
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Panel de resultados */}
                    <div className="bg-blanco rounded-[10px] p-[30px] shadow-lg">
                        {!analysis ? (
                            <div className="flex h-full min-h-[400px] items-center justify-center">
                                <div className="text-center">
                                    <div className="mb-[20px] text-[64px]">📊</div>
                                    <p className="text-grisoscuro mb-[10px] text-[18px] leading-[24px]">
                                        Completa el formulario para ver tu análisis
                                    </p>
                                    <p className="text-purpura text-[14px] leading-[20px] font-medium">
                                        Resultado INSTANTÁNEO con AI
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-negro mb-[30px] text-[24px] leading-[30px] font-bold md:text-[28px] md:leading-[34px]">
                                    🔍 Análisis de tu negocio
                                    {analysis.websiteAnalyzed && (
                                        <span className="text-purpura mt-[8px] block text-[14px] font-normal">
                                            ✅ Incluye análisis automático de tu sitio web
                                        </span>
                                    )}
                                </h3>

                                {/* Website Analysis Results */}
                                {websiteAnalysis && (
                                    <div className="border-purpura bg-gris mb-[30px] rounded-[8px] border-l-4 p-[20px]">
                                        <h4 className="text-purpura mb-[15px] text-[16px] font-semibold">
                                            📊 Análisis de tu sitio web: {analysis.websiteUrl}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-[15px] text-[14px]">
                                            <div className="flex justify-between">
                                                <span className="text-grisoscuro">Velocidad:</span>
                                                <span
                                                    className={`font-medium ${websiteAnalysis.speed > 70 ? 'text-green-600' : 'text-rosa'}`}
                                                >
                                                    {websiteAnalysis.speed}/100
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-grisoscuro">SEO:</span>
                                                <span
                                                    className={`font-medium ${websiteAnalysis.seo > 70 ? 'text-green-600' : 'text-rosa'}`}
                                                >
                                                    {websiteAnalysis.seo}/100
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-grisoscuro">Móvil:</span>
                                                <span
                                                    className={`font-medium ${websiteAnalysis.mobile > 70 ? 'text-green-600' : 'text-rosa'}`}
                                                >
                                                    {websiteAnalysis.mobile}/100
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-grisoscuro">
                                                    Puntuación general:
                                                </span>
                                                <span
                                                    className={`font-bold ${websiteAnalysis.overallScore > 70 ? 'text-green-600' : 'text-rosa'}`}
                                                >
                                                    {websiteAnalysis.overallScore}/100
                                                </span>
                                            </div>
                                        </div>

                                        {websiteAnalysis.criticalIssues &&
                                            websiteAnalysis.criticalIssues.length > 0 && (
                                                <div className="mt-[15px] rounded-[8px] bg-red-100 p-[15px]">
                                                    <p className="text-[14px] font-medium text-red-800">
                                                        🚨 Problemas críticos detectados:
                                                    </p>
                                                    <ul className="mt-[8px] space-y-[4px] text-[12px] text-red-700">
                                                        {websiteAnalysis.criticalIssues.map(
                                                            (issue, index) => (
                                                                <li key={index}>• {issue}</li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                    </div>
                                )}

                                {/* Pérdida mensual */}
                                <div className="border-rosa mb-[20px] rounded-[8px] border-l-4 bg-red-50 p-[20px]">
                                    <p className="text-[14px] font-medium text-red-700">
                                        💸 Dinero perdido cada mes:
                                    </p>
                                    <p className="text-rosa text-[28px] leading-[34px] font-bold md:text-[32px] md:leading-[38px]">
                                        ${analysis.monthlyLoss?.toLocaleString()} CLP
                                    </p>
                                    <p className="mt-[8px] text-[12px] text-red-600">
                                        = ${(analysis.monthlyLoss * 12)?.toLocaleString()} CLP al
                                        año
                                    </p>
                                </div>

                                {/* Retorno de Inversión */}
                                <div className="mb-[30px] rounded-[8px] border-l-4 border-green-500 bg-green-50 p-[20px]">
                                    <div className="grid gap-[15px] md:grid-cols-2">
                                        <div>
                                            <p className="text-[14px] font-medium text-green-700">
                                                💰 Costo del sitio web:
                                            </p>
                                            <p className="text-[22px] leading-[28px] font-bold text-green-800">
                                                ${analysis.websiteCost?.toLocaleString()} CLP
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-medium text-green-700">
                                                📈 Ganancia estimada año 1:
                                            </p>
                                            <p className="text-[22px] leading-[28px] font-bold text-green-800">
                                                ${analysis.yearlyGain?.toLocaleString()} CLP
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-[15px] p-[15px] bg-green-100 rounded-[8px]">
                                        <p className="text-[14px] font-medium text-green-700 mb-[8px]">
                                            💸 Ganancia neta (después de descontar la inversión):
                                        </p>
                                        <p className="text-[28px] leading-[34px] font-bold text-green-800 md:text-[32px] md:leading-[38px]">
                                            ${analysis.netProfit?.toLocaleString()} CLP
                                        </p>
                                        <p className="mt-[8px] text-[12px] text-green-600">
                                            {analysis.paybackMonths <= 3 
                                                ? `Tu inversión se paga sola en solo ${analysis.paybackMonths} meses` 
                                                : analysis.paybackMonths <= 12
                                                ? `Tu inversión se recupera en ${analysis.paybackMonths} meses`
                                                : 'La inversión se recupera gradualmente en el primer año'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Breakdown */}
                                <div className="mb-[30px] space-y-[8px]">
                                    <h4 className="text-negro text-[16px] leading-[20px] font-semibold">
                                        Desglose de pérdidas:
                                    </h4>
                                    {analysis.breakdown?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border-gris flex justify-between border-b pb-[8px] text-[14px]"
                                        >
                                            <span className="text-grisoscuro">{item.concept}</span>
                                            <span className="text-rosa font-medium">
                                                ${item.amount?.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Recomendaciones */}
                                <div className="bg-gris mb-[20px] rounded-[8px] p-[20px]">
                                    <h4 className="text-purpura mb-[15px] text-[16px] font-semibold">
                                        💡 Recomendaciones:
                                    </h4>
                                    <ul className="text-grisoscuro space-y-[8px] text-[14px]">
                                        {analysis.recommendations.map((rec, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-purpura mr-[8px]">•</span>
                                                {rec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA */}
                                <div className="bg-gris rounded-[8px] p-[20px] text-center">
                                    <p className="text-grisoscuro mb-[15px] text-[14px]">
                                        ¿Quieres recuperar ese dinero perdido?
                                    </p>
                                    <button
                                        onClick={() => {
                                            window.scrollTo({
                                                top: document.body.scrollHeight,
                                                behavior: 'smooth',
                                            });
                                        }}
                                        className="bg-purpura hover:bg-rosa text-blanco mx-auto flex cursor-pointer items-center justify-center rounded-[8px] px-[25px] py-[12px] font-bold transition-colors duration-200"
                                    >
                                        <ArrowRight
                                            size={16}
                                            strokeWidth={1.5}
                                            className="mr-[8px]"
                                        />
                                        Quiero una consulta gratuita
                                    </button>
                                    <p className="text-purpura mt-[8px] text-[12px]">
                                        Análisis personalizado sin compromiso
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Testimonios locales */}
                <div className="bg-blanco mt-[50px] rounded-[10px] p-[30px] shadow-lg">
                    <h3 className="text-negro mb-[30px] text-center text-[24px] leading-[30px] font-bold md:text-[28px] md:leading-[34px]">
                        ✅ Casos de éxito en Los Lagos
                    </h3>
                    <div className="grid gap-[20px] md:grid-cols-3">
                        <div className="rounded-[8px] bg-green-50 p-[20px] text-center">
                            <div className="mb-[10px] text-[32px]">🍽️</div>
                            <h4 className="text-[16px] leading-[20px] font-bold text-green-800">
                                Restaurant Castro
                            </h4>
                            <p className="mt-[8px] text-[14px] text-green-600">
                                +40% ventas online
                            </p>
                            <p className="text-grisoscuro mt-[4px] text-[12px]">
                                ROI: 320% primer año
                            </p>
                        </div>
                        <div className="rounded-[8px] bg-blue-50 p-[20px] text-center">
                            <div className="mb-[10px] text-[32px]">🏨</div>
                            <h4 className="text-[16px] leading-[20px] font-bold text-blue-800">
                                Hotel Chiloé
                            </h4>
                            <p className="mt-[8px] text-[14px] text-blue-600">
                                +60% reservas directas
                            </p>
                            <p className="text-grisoscuro mt-[4px] text-[12px]">
                                ROI: 450% primer año
                            </p>
                        </div>
                        <div className="rounded-[8px] bg-purple-50 p-[20px] text-center">
                            <div className="mb-[10px] text-[32px]">💼</div>
                            <h4 className="text-[16px] leading-[20px] font-bold text-purple-800">
                                Consultora P. Montt
                            </h4>
                            <p className="mt-[8px] text-[14px] text-purple-600">
                                +25 clientes nuevos
                            </p>
                            <p className="text-grisoscuro mt-[4px] text-[12px]">
                                ROI: 280% primer año
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
