import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Instagram, Phone, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gris h-auto md:h-auto md:py-[10px]">
            <div className="bg-negro container mx-auto flex h-[200px] flex-col items-center px-[20px] py-[20px] md:h-auto md:px-[30px] md:py-[20px] xl:rounded-[10px]">
                <div className="container flex flex-col items-center justify-between md:flex-row md:px-[30px] md:pb-[40px]">
                    <div className="flex w-full flex-col items-center md:w-6/2 xl:items-start">
                        <h3 className="text-rosa md:text-[20px]">¿NECESITAS AYUDA?</h3>
                        <ul className="mt-2 flex flex-col md:mt-0 md:flex-row md:pt-[5px]">
                            <li>
                                <Link
                                    href="https://www.linkedin.com/company/crow-advance/"
                                    className="text-blanco text-[14px] md:text-[16px] md:hover:underline"
                                    target="_blank"
                                >
                                    Trabaja con Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacto"
                                    className="text-blanco text-[14px] md:px-[15px] md:text-[16px] md:hover:underline"
                                >
                                    Contacta con Nosotros
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-[20px] mb-[10px] flex w-full items-end justify-center md:w-6/12 md:flex-row md:justify-end">
                        <ul className="flex sm:flex">
                            <li className="px-[8px] md:py-[2px]">
                                <Link href="https://www.instagram.com/crowadvance/" target="_blank">
                                    <Instagram
                                        color={'#ffffff'}
                                        strokeWidth={1.5}
                                        className="hover:stroke-rosa"
                                    />
                                </Link>
                            </li>
                            <li className="px-[8px] md:py-[2px]">
                                <Link href="https://www.facebook.com/advancecrow/" target="_blank">
                                    <Facebook
                                        color={'#ffffff'}
                                        strokeWidth={1.5}
                                        className="hover:stroke-rosa"
                                    />
                                </Link>
                            </li>
                            <li className="px-[8px] md:py-[2px]">
                                <Link
                                    href="https://www.linkedin.com/company/crow-advance"
                                    target="_blank"
                                >
                                    <Linkedin
                                        color={'#ffffff'}
                                        strokeWidth={1.5}
                                        className="hover:stroke-rosa"
                                    />
                                </Link>
                            </li>
                            <li className="px-[8px] md:py-[2px]">
                                <Link href="tel:+56967553841">
                                    <Phone
                                        color={'#ffffff'}
                                        strokeWidth={1.5}
                                        className="hover:stroke-rosa"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="container flex flex-col items-center justify-between md:flex-row md:px-[30px]">
                    <Link href="/">
                        <Image
                            src="/logo-text-wh.svg"
                            alt="Logo Crow Advance"
                            width={174}
                            height={26}
                        />
                    </Link>

                    <ul className="hidden sm:flex">
                        <li className="md:px-[8px] md:py-[2px]">
                            <p className="text-blanco">
                                © Copyright Crow Advance |{' '}
                                <Link href="/privacity" className="hover:text-rosa">
                                    Política de Privacidad
                                </Link>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
