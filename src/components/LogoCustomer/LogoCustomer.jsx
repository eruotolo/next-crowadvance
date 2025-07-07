import Image from 'next/image';

export default function LogoCustomer() {
    const logoAntu = '/customer/antu.svg';
    const logoFundacionFrutillar = '/customer/fundacion-frutilla.svg';
    const logoAltoVolcanes = '/customer/altovolcanes.svg';
    const logoCuelloNegro = '/customer/cuellonegro.svg';
    const logoIglesias = '/customer/iglesias.svg';
    const logoNinoCerro = '/customer/ninocerroplomo_black.svg';
    const logoIndaga = '/customer/indaga.png';
    const logoLagoEnLinea = '/customer/lagoenlinea.svg';
    const logoLagoSinHuella = '/customer/lagosinhuella.svg';
    const lagoPuyehue = '/customer/lago-puyehue.svg';
    const logoFutrono = '/customer/futrono.svg';
    const logoBosqueNativo = '/customer/bosque-nativo.svg';
    const logoSmartMedical = '/customer/smartmedical.png';
    const logoHumedalesChiloe = '/customer/humedales-chiloe.svg';
    const logoExploraRepositorio = '/customer/explora-repositorio.svg';
    const logoSaberesEnRed = '/customer/saberes-enred.svg';
    const logoCrusoe = '/customer/crusoe.svg';
    const logoRedpagos = '/customer/redpagos.svg';
    const logoBirdsChile = '/customer/birds.png';
    const logoComunesCosteros = '/customer/comunes-costeros.svg';
    const logoCuencaSostenible = '/customer/cuenca-sostenible.png';
    const logoUnaSalud = '/customer/unsalud.svg';
    const logoRecobatt = '/customer/recobatt.svg';
    const logoProfisio = '/customer/profisio.svg';
    const logoBarcoPapel = '/customer/logo-barco.png';
    const logoExploraAraucania = '/customer/explora-laaraucania.png';
    const logoRedLac = '/customer/logo_redlac-color.svg';

    const clientes = [
        {
            id: 27,
            image: logoRedLac,
            link: 'https://congreso.redlac.org/',
            width: 194,
            height: 50,
            alt: 'Congreso RedLac 2025',
        },
        {
            id: 26,
            image: logoExploraAraucania,
            link: 'https://www.explorandolaaraucania.cl/',
            width: 94,
            height: 90,
            alt: 'Explora La Araucanía',
        },
        {
            id: 25,
            image: logoBarcoPapel,
            link: 'https://www.barcodepapel.cl/',
            width: 160,
            height: 69,
            alt: 'Barco de Papel',
        },
        {
            id: 1,
            image: logoAntu,
            link: 'https://www.antumovement.com/',
            width: 150,
            height: 60,
            alt: 'Antu Movement',
        },
        {
            id: 2,
            image: logoCrusoe,
            link: 'https://crusoecargo.com/',
            width: 200,
            height: 21,
            alt: 'Crusoe Cargo',
        },
        {
            id: 3,
            image: logoFundacionFrutillar,
            link: 'https://www.fundacionfrutillar.org/',
            width: 190,
            height: 47,
            alt: 'Fundación Frutillar',
        },
        {
            id: 4,
            image: logoAltoVolcanes,
            link: 'https://www.altovolcanes.org/',
            width: 180,
            height: 50,
            alt: 'Alto Volcanes',
        },
        {
            id: 5,
            image: logoCuelloNegro,
            link: 'https://cuellonegro.cl',
            width: 90,
            height: 90,
            alt: 'Cerveza Cuello Negro',
        },
        {
            id: 6,
            image: logoIglesias,
            link: 'https://www.rutaiglesiaschiloe.cl/',
            width: 150,
            height: 92,
            alt: 'Ruta de Iglesias Chiloé',
        },
        {
            id: 7,
            image: logoNinoCerro,
            link: 'https://www.ninocerroplomo.cl/',
            width: 100,
            height: 93,
            alt: 'Nino Cerro Plomo',
        },
        {
            id: 20,
            image: logoComunesCosteros,
            link: 'https://www.comunescosteros.cl/',
            width: 150,
            height: 46,
            alt: 'Comunes Costeros',
        },

        {
            id: 9,
            image: logoLagoEnLinea,
            link: 'https://www.lagoenlinea.cl/',
            width: 180,
            height: 57,
            alt: 'Lago en Linea',
        },
        {
            id: 10,
            image: logoLagoSinHuella,
            link: 'https://www.lagosinhuella.cl/',
            width: 200,
            height: 48,
            alt: 'Lago sin Huella',
        },
        {
            id: 11,
            image: lagoPuyehue,
            link: 'https://www.lagoenlinea.cl/',
            width: 150,
            height: 81,
            alt: 'Lago Puyehue',
        },
        {
            id: 12,
            image: logoFutrono,
            link: 'https://www.corporacionfutrono.cl/',
            width: 190,
            height: 56,
            alt: 'Futrono',
        },
        {
            id: 13,
            image: logoBosqueNativo,
            link: 'https://www.bosquenativo.cl/',
            width: 100,
            height: 90,
            alt: 'Bosque Nativo',
        },
        {
            id: 24,
            image: logoProfisio,
            link: 'https://www.profisio.com.uy/',
            width: 150,
            height: 27,
            alt: 'Profisio',
        },
        {
            id: 14,
            image: logoSmartMedical,
            link: 'https://www.smartmedical.cl/',
            width: 190,
            height: 41,
            alt: 'Smart Medical',
        },
        {
            id: 15,
            image: logoHumedalesChiloe,
            link: 'https://www.humedaleschiloe.cl/',
            width: 190,
            height: 111,
            alt: 'Humedales Chiloé',
        },
        {
            id: 16,
            image: logoExploraRepositorio,
            link: 'https://exploraloslagos.uach.cl/',
            width: 120,
            height: 115,
            alt: 'Explora Repositorio',
        },
        {
            id: 17,
            image: logoSaberesEnRed,
            link: 'https://www.saberesenred.cl/',
            width: 120,
            height: 64,
            alt: 'Saberes en Red',
        },
        {
            id: 8,
            image: logoIndaga,
            link: 'https://www.indaga.me/',
            width: 170,
            height: 95,
            alt: 'Indaga',
        },
        {
            id: 18,
            image: logoRedpagos,
            link: 'https://www.redpagos.com.uy/',
            width: 190,
            height: 81,
            alt: 'Redpagos',
        },
        {
            id: 19,
            image: logoBirdsChile,
            link: 'https://www.birdschile.com/',
            width: 140,
            height: 51,
            alt: 'Birds Chile',
        },
        {
            id: 21,
            image: logoCuencaSostenible,
            link: 'https://www.cuencasostenible.cl/',
            width: 150,
            height: 84,
            alt: 'Cuenca Sostenible',
        },
        {
            id: 22,
            image: logoUnaSalud,
            link: 'https://www.unasalud.cl/',
            width: 140,
            height: 58,
            alt: 'Una Salud',
        },
        {
            id: 23,
            image: logoRecobatt,
            link: 'https://www.recobatt.cl/',
            width: 90,
            height: 80,
            alt: 'Recobatt',
        },
    ];

    return (
        <>
            {clientes.map((cliente) => (
                <div
                    className="mx-[40px] my-[20px] flex items-center justify-center"
                    key={cliente.id}
                >
                    <a
                        href={cliente.link}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer"
                    >
                        <Image
                            src={cliente.image}
                            alt={cliente.alt}
                            width={cliente.width}
                            height={cliente.height}
                            style={{ width: `${cliente.width}px`, height: `${cliente.height}px` }}
                        />
                    </a>
                </div>
            ))}
        </>
    );
}
