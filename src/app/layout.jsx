import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
    variable: '--font-montserrat',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

export const metadata = {
    title: 'Crow Advance | Tus necesidades, nuestra prioridad',
    description:
        'Crow Advance, con más de 10 años en diseño y desarrollo web, y especialistas en diseño de marca. Innovamos para ayudarte a avanzar en tu negocio digital.',
    generator: 'Next.js',
    applicationName: 'WebPage Crow Advance',
    keywords: [
        'web',
        'agencia',
        'agencia de comunicación',
        'agencia gráfica',
        'agencia web',
        'consultor gráfico',
        'consultor web',
        'consultor de comunicación',
        'desarrollo de sitios web',
        'desarrollos de páginas web',
        'Desarrollo de sitios web profesionales',
        'Agencia de diseño gráfico y web',
        'Especialistas en desarrollo y diseño de marca',
        'Consultoría en tecnologías web',
        'Servicios de diseño web en Chile y Uruguay',
        'Desarrollo de sitios web con HTML5 y CSS3',
        'Desarrollo de sitios web con React',
        'Desarrollo de comercio electrónico',
        'Implementación de sitios web con Next.js',
        'Diseño de sitios web con Bootstrap',
        'Soluciones de programación en PHP',
        'Implementaciones con jQuery y TailwindCSS',
        'Desarrollo de aplicaciones con AngularJS',
        'desarrollo web',
        'identidad corporativa',
        'desarrollo de identidad corporativa',
        'desarrollo de campañas gráficas',
        'últimas tecnologías',
        'programación web',
        'programación php',
        'design',
        'diseño web',
        'web design',
        'web designer',
        'diseñadores',
        'desarrollo',
        'developer',
        'arte web',
        'bootstrap',
        'ecommerce',
        'photoshop',
        'dreamweaver',
        'fireworks',
        'html5',
        'css3',
        'tailwindCss',
        'jquery',
        'gxportal',
        'adobe',
        'google apps',
        'Uruguay',
        'Chile',
        'Región de Los Lagos',
        'Castro',
        'Chiloé',
        'Patagonia',
    ],
    authors: [{ name: 'Edgardo Ruotolo Cardozo', url: 'https://crowadvance.com' }],
    creator: 'Edgardo Ruotolo Cardozo',
    publisher: 'Edgardo Ruotolo Cardozo',
    category: 'Soluciones en Tecnología',
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://crowadvance.com',
        languages: {
            es: '/',
        },
    },
    openGraph: {
        title: 'Crow Advance | Tus necesidades, nuestra prioridad',
        description:
            'Crow Advance, con más de 10 años en diseño y desarrollo web, y especialistas en diseño de marca. Innovamos para ayudarte a avanzar en tu negocio digital.',
        url: 'https://crowadvance.com',
        siteName: 'Crow Advance',
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Crow Advance | Tus necesidades, nuestra prioridad',
        description:
            'Crow Advance, con más de 10 años en diseño y desarrollo web, y especialistas en diseño de marca.',
        creator: '@crowadvance',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`${montserrat.className} antialiased`}>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
