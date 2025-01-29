export default function CardHome({ description, title, image }) {
    return (
        <>
            <div
                className="m-[20px] flex h-[450px] w-[350px] flex-col-reverse rounded-[10px] bg-cover p-[20px] xl:h-[450px] xl:w-[280px] 2xl:h-[500px] 2xl:w-[340px]"
                style={{ backgroundImage: `url(${image})` }}
            >
                <p className="text-blanco h-[160px] font-light">{description}</p>
                <h4 className="text-blanco mb-[5px] text-[20px] leading-[32px] font-medium">
                    {title}
                </h4>
            </div>
        </>
    );
}
