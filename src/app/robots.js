export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            // Puedes agregar más reglas aquí
        ],
        sitemaps: ['https://www.crowadvance.com/sitemap.xml'],
    };
}
