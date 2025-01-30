export default function TitlesDecorative({ textOne, textTwo }) {
    return (
        <>
            <div className="order-1 col-span-1 flex flex-col items-center xl:order-1 xl:items-end">
                <h1 className="text-purpura text-center text-[40px] leading-[44px] font-bold uppercase xl:text-right xl:text-[56px] xl:leading-[60px] 2xl:text-[80px] 2xl:leading-[110px]">
                    {textOne}
                </h1>
                <h1 className="text-rosa 2xl:leading-120px] text-center text-[40px] leading-[44px] font-bold uppercase xl:text-right xl:text-[56px] xl:leading-[60px] 2xl:text-[80px]">
                    {textTwo}
                </h1>
            </div>
        </>
    );
}
