import Image from 'next/image';

export default function HeaderPaginas({ title, description, image, className }) {
    return (
        <section className={`md:h-[820px] ${className}`}>
            <div className="container mx-auto px-[20px] pt-[120px] md:px-[32px]">
                <div className="flex flex-col md:flex-row">
                    <div className="flex items-end md:h-[240px] md:w-1/2 md:pr-[80px]">
                        <h1 className="text-[40px] leading-[48px] font-bold uppercase md:text-[70px] md:leading-[80px]">
                            {title}
                        </h1>
                    </div>
                    <div className="flex items-end py-[30px] md:h-[240px] md:w-1/2 md:py-0">
                        <p className="md:text-right 2xl:pl-[160px]">{description}</p>
                    </div>
                </div>
                <div className="flex pb-[30px] md:pb-0">
                    <Image
                        src={image}
                        alt="Imagen Header Paginas"
                        width={1080}
                        height={350}
                        className="h-[320px] rounded-[10px] object-cover md:mt-[20px] md:h-[400px] md:w-[100%]"
                    />
                </div>
            </div>
        </section>
    );
}
