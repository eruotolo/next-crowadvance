import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Reemplaza con tus credenciales SMTP de Brevo
const SMTP_HOST = 'smtp-relay.brevo.com';
const SMTP_PORT = 587;
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

console.log('SMTP_USERNAME:', process.env.SMTP_USERNAME);
console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD);
console.log('EMAIL_CONTACT:', process.env.EMAIL_CONTACT);

export async function POST(request) {
    try {
        console.log('Data', request.body);

        const { name, email, phone, message } = await request.json();

        // Configura el transporte SMTP
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD,
            },
        });

        // Crea el correo electrónico
        const emailData = {
            from: 'Formulario contacto CrowAdvance <web@crowadvance.com>', // Reemplaza con tu correo electrónico de envío
            to: 'edgardoruotolo@gmail.com',
            subject: 'Nuevo Mensaje desde la web Crow!',
            html: `
                <p>Hola,</p>
                <p>Tienes un nuevo mensaje de: ${name}.</p>
                <p>Email: ${email}.</p>
                <p>Phone: ${phone}.</p>
                <p>Mensaje: ${message}.</p>
            `,
        };

        // Envía el correo electrónico
        const response = await transporter.sendMail(emailData);
        console.log('Respuesta del servidor SMTP:', response);

        return NextResponse.json({ submitted: true }, { status: 200 });
    } catch (error) {
        console.error('Error detallado:', error.message, error.stack);
        return NextResponse.json(
            { error: 'No se pudo enviar el correo electrónico', detalle: error.message },
            { status: 500 }
        );
    }
}
