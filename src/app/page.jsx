import Image from 'next/image';

import CardHome from '@/components/CardHome/CardHome';
import ButtonMore from '@/components/ButtonMore/ButtonMore';
import TitlesDecorative from '@/components/TitlesDecorative/TitlesDecorative';

export default function Home() {
    const cardDevelop = '/desarrolloweb.webp';
    const cardConsult = '/consultoria.webp';
    const cardProject = '/metodologia.webp';
    const cardBrand = '/branding.webp';

    return (
        <>
            <section className="relative h-screen">
                <div className="absolute inset-0 z-10 container mx-auto flex flex-col pl-[10px] lg:pl-0">
                    <h3 className="text-blanco pt-[65vh] text-[30px] leading-[38px] drop-shadow-lg xl:pt-[50vh] xl:text-[56px] xl:leading-[70px] xl:font-bold 2xl:pt-[60vh] 2xl:text-[76px] 2xl:leading-[80px]">
                        HABLEMOS DE
                    </h3>
                    <h1 className="text-blanco text-[50px] leading-[58px] font-bold drop-shadow-lg xl:text-[160px] xl:leading-[160px] 2xl:text-[186px] 2xl:leading-[186px]">
                        TU INICIATIVA
                    </h1>
                </div>
                <video
                    preload="none"
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="static top-0 z-[-1] h-full w-full overflow-clip object-cover"
                >
                    <source src="/principal-office.mp4" type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                </video>
            </section>

            <section className="bg-blanco h-auto py-[70px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <div className="flex justify-end">
                        <h6 className="text-[15px] xl:pb-[10px] xl:text-[24px]">
                            Tus necesidades, nuestra prioridad
                        </h6>
                    </div>
                    <TitlesDecorative textOne="Qué bien" textTwo="suena eso..." />
                </div>
                <div className="container mx-auto">
                    <div className="mt-[50px] flex flex-wrap items-center justify-center xl:mt-[50px]">
                        <CardHome
                            image={cardDevelop}
                            title="Desarrollo Web"
                            description="Desarrollamos aplicaciones web versátiles y eficientes que garantizan una experiencia de usuario uniforme en diversos dispositivos para una audiencia amplia."
                        />
                        <CardHome
                            image={cardConsult}
                            title="Consultoría Informatica"
                            description="Brindamos consultoría informática de vanguardia centrada en assessments, entregando análisis detallados para mejorar la excelencia tecnológica en su empresa."
                        />
                        <CardHome
                            image={cardProject}
                            title="Gestión de Proyectos"
                            description="Destacamos en la gestión y acompañamiento de proyectos, especializándonos en metodologías ágiles para garantizar un desarrollo eficiente y adaptativo."
                        />
                        <CardHome
                            image={cardBrand}
                            title="Brand Design"
                            description="Nuestro equipo de expertos en branding trabajará contigo para desarrollar una estrategia de branding."
                        />
                    </div>
                </div>
            </section>

            <section className="bg-gris h-autoo py-[70px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <div className="flex justify-end">
                        <h6 className="text-[15px] xl:pb-[10px] xl:text-[24px]">Nosotros</h6>
                    </div>
                    <div className="grid xl:grid-cols-2">
                        <div className="order-2 col-span-1 pt-[10px] xl:order-1 xl:pr-[200px]">
                            <p className="mb-[20px] text-justify xl:py-2 xl:text-left">
                                Buscamos la excelencia en cada aspecto de nuestros proyectos, desde
                                la atención meticulosa a los detalles, hasta superar las
                                expectativas de quienes confían en nosotros.
                            </p>
                            <ButtonMore link="/nosotros" text="Sabes más" />
                        </div>
                        <TitlesDecorative textOne="¿Por qué" textTwo="ELEGIRNOS?" />
                    </div>
                </div>
                <div className="container mx-auto mt-[40px] px-[20px] md:px-[32px] xl:mt-[70px]">
                    <div className="flex flex-row">
                        <div className="pr-[10px] xl:w-6/12">
                            <Image
                                src="/home-01.webp"
                                width={768}
                                height={650}
                                alt="mujer"
                                className="h-[200px] rounded-[10px] object-cover md:h-[620px]"
                            />
                        </div>
                        <div className="flex flex-col xl:w-6/12 xl:pl-[10px]">
                            <Image
                                src="/graphicdesign.jpg"
                                width={760}
                                height={320}
                                alt="Diseño grafico"
                                className="mb-[13px] h-[94px] rounded-[10px] object-cover md:h-auto xl:mb-[20px]"
                            />
                            <Image
                                src="/developer.jpg"
                                width={760}
                                height={320}
                                alt="Diseño grafico"
                                className="h-[94px] rounded-[10px] object-cover md:h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
