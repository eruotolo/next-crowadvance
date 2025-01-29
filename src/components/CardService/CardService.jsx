import Image from 'next/image';

const services = [
    {
        id: 1,
        image: '/img-servicios-01.webp',
        title: 'Desarrollo Web',
        description:
            'Diseñamos aplicaciones web versátiles y eficientes que ofrecen una experiencia de usuario coherente en diversos dispositivos, garantizando así un alcance amplio y satisfacción del público.',
    },
    {
        id: 2,
        image: '/img-servicios-02.webp',
        title: 'Consultoría Informatica',
        description:
            'Ofrecemos consultoría informática de vanguardia, con enfoque en assessments detallados para optimizar la excelencia tecnológica en su empresa.',
    },
    {
        id: 3,
        image: '/img-servicios-03.webp',
        title: 'Gestión de Proyectos',
        description:
            'Nos destacamos en gestión y acompañamiento de proyectos, especializados en metodologías ágiles para asegurar desarrollo eficiente y adaptativo.',
    },
    {
        id: 4,
        image: '/img-servicios-04.webp',
        title: 'Brand Design',
        description:
            'Nuestro equipo de expertos en branding está listo para colaborar contigo en la creación y desarrollo de una estrategia integral de branding.',
    },
];

export default function CardService() {
    return (
        <>
            {services.map((service) => (
                <div key={service.id} className="flex flex-col pb-[40px] md:w-3/12 md:px-[16px]">
                    <Image
                        src={service.image}
                        alt={service.title}
                        width={1000}
                        height={1000}
                        className="rounded-[10px]"
                    />
                    <h2 className="mt-[20px] mb-[10px] text-[20px] font-semibold uppercase">
                        {service.title}
                    </h2>
                    <p>{service.description}</p>
                </div>
            ))}
        </>
    );
}
