# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Configuración de Idioma

IMPORTANTE: Siempre responde en ESPAÑOL a este usuario. Todas las comunicaciones deben ser en idioma español.

## Comandos

- `npm run dev` - Iniciar servidor de desarrollo en localhost:3000
- `npm run build` - Construir versión de producción
- `npm run start` - Iniciar servidor de producción
- `npm run lint` - Ejecutar ESLint
- `npm run clean` - Limpiar directorio .next y reconstruir
- `npm run preview` - Construir e iniciar servidor de producción

## Arquitectura

Este es un proyecto Next.js 15 usando App Router con:

- **Framework**: Next.js 15.1.6 con React 19
- **Estilos**: Tailwind CSS 4.0 con PostCSS
- **Tipografía**: Montserrat (Google Fonts)
- **Email**: Nodemailer con Brevo SMTP
- **Analíticas**: Google Analytics via @next/third-parties
- **UI**: Iconos Lucide React, react-confetti
- **Seguridad**: Integración reCAPTCHA

### Estructura del Proyecto

```
src/
├── app/                    # Páginas App Router
│   ├── layout.jsx         # Layout raíz con Header/Footer
│   ├── page.jsx           # Página principal
│   ├── nosotros/          # Página sobre nosotros
│   ├── servicios/         # Página de servicios
│   ├── contacto/          # Página de contacto
│   ├── privacity/         # Página de política de privacidad
│   ├── robots.js          # Configuración robots.txt
│   ├── sitemap.js         # Generador de sitemap
│   └── api/contact/       # Endpoint API formulario contacto
└── components/            # Componentes UI reutilizables
    ├── Header/           # Navegación (desktop + mobile)
    ├── Footer/           # Pie de página
    ├── ContactForm/      # Formulario contacto con reCAPTCHA
    ├── CardHome/         # Tarjetas página principal
    ├── CardService/      # Tarjetas de servicios
    ├── LogoCustomer/     # Grid de logos clientes
    ├── TitlesDecorative/ # Títulos decorativos
    ├── ButtonMore/       # Botones call-to-action
    └── HeaderPaginas/    # Headers para páginas internas
```

### Características Principales

- **Diseño Responsivo**: Enfoque mobile-first con componente HeaderMobile separado
- **SEO Optimizado**: Metadatos completos, OpenGraph, Twitter cards, robots.txt, sitemap
- **Sistema de Contacto**: Envío de formulario vía API route con notificaciones por email
- **Multi-idioma**: Español como idioma primario (es_ES)
- **Analíticas**: Google Analytics integrado
- **Video Hero**: Video autoplay en página principal con overlay de texto
- **Galería de Clientes**: 25+ logos de clientes con enlaces externos

### Variables de Entorno

Requeridas para funcionalidad del formulario de contacto:
- `SMTP_USERNAME` - Usuario SMTP de Brevo
- `SMTP_PASSWORD` - Contraseña SMTP de Brevo
- `EMAIL_CONTACT` - Email receptor de contactos
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Clave pública de reCAPTCHA
- `GA_TRACKING_ID` - ID de seguimiento Google Analytics (G-B3L5F5QHDE)

### Alias de Rutas

Usa alias `@/*` apuntando a `./src/*` para imports más limpios.

### Contexto de la Empresa

Crow Advance es una agencia chilena de desarrollo web y diseño gráfico especializada en identidad corporativa, desarrollo web y soluciones digitales. El sitio web muestra sus servicios y portafolio de clientes.

### Detalles Técnicos Importantes

#### Colores Personalizados (Tailwind CSS)
- `negro`: #000000
- `blanco`: #ffffff
- `gris`: #EEEEEE
- `grisclaro`: #FCFCFC
- `grisoscuro`: #333333
- `purpura`: #9E00D4
- `celeste`: #3FFFF1
- `rosa`: #E706A3
- `morado`: #6C62C4

#### Componentes Clave

1. **Header**: Navegación fija con versión desktop y mobile separadas
2. **ContactForm**: Formulario con validación reCAPTCHA y animación confetti
3. **CardHome**: Tarjetas con imagen de fondo para servicios principales
4. **CardService**: Grid de servicios con datos hardcodeados
5. **LogoCustomer**: Galería de 25+ logos de clientes con enlaces externos
6. **TitlesDecorative**: Títulos bicolor decorativos
7. **ButtonMore**: Botones CTA reutilizables con iconos
8. **HeaderPaginas**: Headers para páginas internas con imagen y texto

#### Páginas y Funcionalidades

- **Homepage**: Video hero, tarjetas de servicios, sección nosotros
- **Nosotros**: Información de la empresa, valores, galería de clientes
- **Servicios**: Descripción de servicios, galería de imágenes
- **Contacto**: Formulario de contacto con reCAPTCHA
- **Privacidad**: Política de privacidad completa
- **API Contact**: Endpoint para envío de emails via Brevo SMTP

#### SEO y Metadatos

- Metadatos completos en cada página
- OpenGraph y Twitter Cards
- Robots.txt dinámico
- Sitemap.xml generado automáticamente
- Canonical URLs configuradas
- Keywords extensas para SEO local (Chile, Castro, Chiloé)

#### Redes Sociales

- Instagram: @crowadvance
- Facebook: advancecrow
- LinkedIn: crow-advance
- Teléfono: +56 9 6755 3841
- Email: hola@crowadvance.com

#### Errores Conocidos

- TitlesDecorative.jsx línea 8: Error de sintaxis en clase CSS (`2xl:leading-120px]` - falta `[`)
- ContactForm: reCAPTCHA no valida antes del envío
- API Contact: Logs de credenciales en consola (líneas 10-12)