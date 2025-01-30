import ContactForm from '@/components/ContactForm/ContactForm';

export default function ContactPage() {
    return (
        <>
            <section className="bg-gris pt-[120px] pb-[40px] xl:py-[150px]">
                <div className="container mx-auto px-[20px] md:px-[32px]">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-grisoscuro text-center text-[32px] leading-[40px] font-bold xl:text-[60px] xl:leading-[70px] 2xl:text-[70px] 2xl:leading-[80px]">
                            COMENCEMOS CON
                        </h1>
                        <h1 className="text-rosa text-center text-[32px] leading-[40px] font-bold xl:text-[60px] xl:leading-[70px] 2xl:text-[70px] 2xl:leading-[80px]">
                            UN MENSAJE.
                        </h1>
                        <p className="pt-[20px] text-center xl:px-[400px]">
                            Hoy podemos ayudarle a llegar más lejos. Lo que sea. Todo comienza
                            completando este sencillo formulario.
                        </p>
                    </div>
                </div>
                <div className="container mx-auto mt-[40px] px-[20px] md:px-[32px]">
                    <ContactForm />
                </div>
            </section>
        </>
    );
}
