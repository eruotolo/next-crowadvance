import LocalROICalculator from '@/components/LocalROICalculator/LocalROICalculator';
import HeaderPaginas from '@/components/HeaderPaginas/HeaderPaginas';
import TitlesDecorative from '@/components/TitlesDecorative/TitlesDecorative';
import ButtonMore from '@/components/ButtonMore/ButtonMore';

export const metadata = {
    title: 'Calculadora ROI | Crow Advance',
    alternates: {
        canonical: 'https://www.crowadvance.com/calculadora',
        language: {
            es: '/',
        },
    },
    description:
        'Calculadora gratuita de ROI para negocios en Castro y Los Lagos. Descubre cuánto dinero pierdes cada mes sin una presencia digital profesional y conoce el retorno de inversión de un sitio web.',
    keywords: [
        'Calculadora ROI Castro',
        'ROI sitio web Castro',
        'Pérdidas digitales negocio',
        'Retorno inversión web Castro',
        'Calculadora gratuita Chiloé',
        'Marketing digital Castro',
        'Desarrollo web Los Lagos',
        'Crow Advance',
        'ROI marketing digital',
        'Calculadora presencia digital',
        'Negocio online Castro',
        'Inversión sitio web',
    ],
};

export default function CalculadoraPage() {
    return (
        <>
            <HeaderPaginas
                title="Calculadora de ROI"
                description="Descubre cuánto dinero pierdes cada mes sin una presencia digital profesional. Calcula el retorno de inversión real de tu sitio web y toma decisiones informadas para el crecimiento de tu negocio."
                image="/servicios-02.webp"
                className="bg-celeste"
            />
            
            <LocalROICalculator />
            
            <section className="bg-gris py-[70px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <div className="grid xl:grid-cols-2">
                        <div className="order-2 col-span-1 flex flex-col items-center pt-[10px] xl:order-1 xl:items-start xl:pr-[200px]">
                            <p className="mb-[20px] xl:py-2">
                                Los resultados de nuestra calculadora se basan en estudios de comportamiento digital y casos reales de nuestros clientes en la región de Los Lagos.
                            </p>
                            <p className="mb-[20px] xl:py-2">
                                Cada negocio es único. Agenda una consulta gratuita para obtener un análisis personalizado y una propuesta específica para tu empresa.
                            </p>
                            <ButtonMore link="/contacto" text="Consulta gratuita" />
                        </div>
                        <TitlesDecorative textOne="¿Listo para" textTwo="crecer?" />
                    </div>
                </div>
            </section>
        </>
    );
}
