import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ButtonMore({ link, text }) {
    return (
        <>
            <Link
                href={link}
                className="bg-purpura text-blanco hover:bg-rosa flex h-[45px] w-[180px] items-center justify-center rounded-[30px] text-[13px] uppercase"
            >
                {text}
                <ArrowRight size={16} strokeWidth={1.5} className="ml-[5px]" />
            </Link>
        </>
    );
}
