import Image from 'next/image';
import HeaderPaginas from '@/components/HeaderPaginas/HeaderPaginas';
import CardService from '@/components/CardService/CardService';
import ButtonMore from '@/components/ButtonMore/ButtonMore';

export const metadata = {
    title: 'Servicios | Crow Advance',
    alternates: {
        canonical: 'https://www.crowadvance.com/servicios',
        language: {
            es: '/',
        },
    },
};

export default function Servicios() {
    return (
        <>
            <HeaderPaginas
                title="Potenciando tu
                proyecto juntos"
                description="Nuestros servicios ofrecen plataformas web que simplifican el
                                trabajo para cualquier tipo de negocio o proyecto. Nos
                                especializamos en desarrollar soluciones eficientes y versátiles,
                                diseñadas para mejorar la productividad y el éxito de nuestros
                                clientes."
                image="/servicios-01.webp"
                className="bg-purpura"
            />

            <section className="py-[70px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <h2 className="text-negro text-[22px] leading-[30px] md:text-[30px] md:leading-[40px]">
                        Facilitamos el acceso a{' '}
                        <span className="text-rosa">
                            soluciones informáticas inteligentes y sostenibles
                        </span>{' '}
                        para ti y tu empresa, con un enfoque en maximizar la eficiencia y
                        productividad de tus operaciones.
                    </h2>
                    <div className="mt-[40px] flex flex-col md:flex-row">
                        <div className="w-full pb-[30px] md:w-8/12 md:pr-[15px] md:pb-0">
                            <Image
                                src="/servicios-02.webp"
                                width={1080}
                                height={350}
                                className="h-[350px] w-[100%] rounded-[10px] object-cover md:h-[400px]"
                                alt="Servicios 02"
                            />
                        </div>
                        <div className="w-full pb-[30px] md:w-4/12 md:pb-0 md:pl-[15px]">
                            <Image
                                src="/servicios-03.webp"
                                alt="servicios 03"
                                width={1080}
                                height={1080}
                                className="h-[350px] w-[100%] rounded-[10px] object-cover md:h-[400px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-[70px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <div className="flex justify-center">
                        <h3 className="rounded-[17px] border-[1px] px-[20px] py-[8px] text-[14px] leading-[14px] uppercase">
                            Cultura
                        </h3>
                    </div>
                    <div className="my-[30px] flex justify-center">
                        <h2 className="text-center text-[40px] leading-[46px] font-[700] uppercase md:text-[56px] md:leading-[56px]">
                            Inquietos, Muy <span className="text-rosa">Inquietos</span>
                        </h2>
                    </div>
                    <div className="my-[30px] flex justify-center">
                        <p>
                            La innovación nos impulsa a estar a tu lado en todo momento, sin
                            importar cuál sea tu requerimiento.
                        </p>
                    </div>
                </div>
                <div className="container mx-auto mt-[70px] flex flex-col px-[20px] md:flex-row md:px-[32px]">
                    <CardService />
                </div>
            </section>

            <section className="bg-gris py-[70px]">
                <div className="container mx-auto my-[30px] flex flex-col items-center justify-center">
                    <h1 className="text-negro hidden text-[40px] leading-[46px] font-[700] uppercase md:block md:text-center md:text-[56px] md:leading-[56px]">
                        Es tiempo de <span className="text-rosa">redefinir</span> <br />
                        tus necesidades
                    </h1>
                    <h1 className="text-negro text-center text-[38px] leading-[46px] font-[700] uppercase md:hidden">
                        Es tiempo de <span className="text-rosa">redefinir</span> tus necesidades
                    </h1>
                    <div className="mt-[50px]">
                        <ButtonMore link="/contacto" text="Empieza Ahora" />
                    </div>
                </div>
            </section>
        </>
    );
}
