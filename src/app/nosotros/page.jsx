import Image from 'next/image';
import HeaderPaginas from '@/components/HeaderPaginas/HeaderPaginas';
import ButtonMore from '@/components/ButtonMore/ButtonMore';
import TitlesDecorative from '@/components/TitlesDecorative/TitlesDecorative';
import LogoCustomer from '@/components/LogoCustomer/LogoCustomer';

export const metadata = {
    title: 'Nosotros | Crow Advance',
    alternates: {
        canonical: 'https://www.crowadvance.com/nosotros',
        language: {
            es: '/',
        },
    },
    description:
        'Conoce al equipo de Crow Advance, una agencia de desarrollo web en Castro Chiloé. Descubre nuestra cultura, valores y experiencia en diseño web, desarrollo de software y marketing digital. Impulsamos el crecimiento de tu negocio con soluciones innovadoras.',
    keywords: [
        'Agencia desarrollo web Castro, Chiloé',
        'Diseño web Puerto Varas',
        'Desarrollo software Castro, Chiloé',
        'Marketing digital Castro, Chiloé',
        'Agencia digital',
        'Diseño UI/UX',
        'Desarrollo aplicaciones móviles',
        'Crow Advance',
        'Equipo Crow Advance',
        'Valores',
        'Misión',
        'Cultura empresarial',
        'Innovación',
        'Crecimiento empresarial',
    ],
};

export default function Nosotros() {
    return (
        <>
            <HeaderPaginas
                title="IMPULSANDO NUESTRA VISIÓN EN CONJUNTO"
                description="En nuestro equipo, combinamos experiencia en desarrollo web,
                                consultoría informática, gestión de proyectos y diseño de marca.
                                Estamos comprometidos a proporcionar servicios que transformen ideas
                                en realidades digitales, impulsando el éxito empresarial de nuestros
                                clientes."
                image="/nosotros-01.webp"
                className="bg-morado"
            />
            <section className="py-[70px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <p>
                        Creemos que el verdadero éxito se construye sobre una base sólida de
                        principios y valores fundamentales. La ética, la responsabilidad, la
                        transparencia y el compromiso con la excelencia son los pilares que nos
                        guían en cada decisión y acción que tomamos.
                    </p>
                    <p className="mt-[20px]">
                        Nuestro crecimiento no ha sido solo el resultado de estrategias
                        empresariales, sino también de la confianza que nuestros empleados, clientes
                        y colaboradores han depositado en nosotros a lo largo del tiempo. Esta
                        confianza es nuestra mayor fortaleza y nos impulsa a mejorar continuamente,
                        innovando y adaptándonos a un entorno en constante evolución.
                    </p>
                    <p className="mt-[20px]">
                        Valoramos profundamente las relaciones que hemos construido, basadas en el
                        respeto mutuo y la cooperación. Creemos en el poder del trabajo en equipo y
                        en la importancia de crear un ambiente donde cada persona se sienta
                        valorada, escuchada y motivada a alcanzar su máximo potencial.
                    </p>
                    <p className="mt-[20px]">
                        Seguimos avanzando con la convicción de que el crecimiento sostenible solo
                        es posible cuando se fundamenta en el bienestar de las personas y en la
                        generación de un impacto positivo en la sociedad. Por ello, continuamos
                        fortaleciendo nuestros lazos con quienes confían en nosotros, trabajando con
                        integridad y dedicación para ofrecer soluciones de calidad que marquen la
                        diferencia.
                    </p>
                </div>
                <div className="container mx-auto mt-[40px]">
                    <div className="flex flex-col md:flex-row md:px-[32px] xl:py-6">
                        <div className="w-full pb-[30px] md:w-8/12 md:pr-[15px] md:pb-0">
                            <Image
                                src="/nosotros-02.webp"
                                alt="Nosotros"
                                height={1200}
                                width={1800}
                                className="h-[350px] rounded-[10px] object-cover"
                            />
                        </div>
                        <div className="w-full pb-[30px] md:w-4/12 md:pb-0 md:pl-[15px]">
                            <Image
                                src="/nosotros-03.webp"
                                alt="Nosotros"
                                height={1192}
                                width={1800}
                                className="h-[350px] rounded-[10px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-[70px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <div className="flex justify-center">
                        <h3 className="rounded-[17px] border-[1px] px-[20px] py-[8px] text-[14px] leading-[14px] uppercase">
                            Clientes
                        </h3>
                    </div>
                    <div className="my-[30px] flex justify-center">
                        <h2 className="text-right text-[40px] leading-[46px] font-[700] uppercase md:text-center md:text-[56px] md:leading-[56px]">
                            Creciendo, Siempre <span className="text-rosa">Creciendo</span>
                        </h2>
                    </div>
                    <div className="my-[30px] flex justify-center">
                        <p>
                            Nuestra pasión por innovar nos permite acompañarte en cada paso,
                            adaptándonos a tus necesidades.
                        </p>
                    </div>
                    <div className="mt-[60px] flex flex-wrap justify-center">
                        <LogoCustomer />
                    </div>
                </div>
            </section>

            <section className="bg-gris py-[70px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <div className="grid xl:grid-cols-2">
                        <div className="order-2 col-span-1 pt-[10px] xl:order-1 xl:pr-[200px]">
                            <p className="mb-[20px] xl:py-2">
                                Buscamos la excelencia en cada aspecto de nuestros proyectos, desde
                                la atención meticulosa a los detalles, hasta superar las
                                expectativas de quienes confían en nosotros.
                            </p>
                            <ButtonMore link="/servicios" text="Saber más" />
                        </div>
                        <TitlesDecorative textOne="¿Tienes alguna" textTwo="idea?" />
                    </div>
                </div>
            </section>
        </>
    );
}
