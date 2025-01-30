'use client';

import { useState } from 'react';
import Confetti from 'react-confetti';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm() {
    const [isSubmitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    message,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Respuesta:', response.body);

            if (response.status === 200) {
                setSubmitted(true);
            } else {
                console.error('Error submitting form', await response.text());
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            {isSubmitted ? (
                <div className="container mx-auto md:h-[450px]">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="font-questrial text-negro mt-[150px] text-center text-[50px] font-semibold">
                            ¡Gracias por tu mensaje!
                        </h1>
                        <Confetti />
                    </div>
                </div>
            ) : (
                <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
                    <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                        <input
                            className="bg-blanco w-full rounded-[24px] border-[1px] border-solid border-[#e4e4e4] px-[16px] py-[12px] text-[#4a4759] placeholder-[#4a4759]"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre Completo *"
                            autoComplete="name"
                            required
                        />
                    </div>
                    <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                        <input
                            className="bg-blanco w-full rounded-[24px] border-[1px] border-solid border-[#e4e4e4] px-[16px] py-[12px] text-[#4a4759] placeholder-[#4a4759]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email *"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                        <input
                            className="bg-blanco w-full rounded-[24px] border-[1px] border-solid border-[#e4e4e4] px-[16px] py-[12px] text-[#4a4759] placeholder-[#4a4759]"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="number"
                            placeholder="Su número de teléfono *"
                            autoComplete="tel"
                            required
                        />
                    </div>
                    <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                        <textarea
                            className="bg-blanco h-[200px] w-full rounded-[24px] border-[1px] border-solid border-[#e4e4e4] px-[16px] py-[12px] text-[#4a4759] placeholder-[#4a4759]"
                            placeholder="Deja tu mensaje aquí *"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={(value) => {
                                // you got the token!
                                console.log(value);
                            }}
                        />
                    </div>
                    <div className="my-[10px] flex w-full justify-center md:my-[15px] md:w-6/12">
                        <button
                            type="submit"
                            className="bg-purpura text-blanco hover:bg-rosa flex h-[45px] w-[180px] cursor-pointer items-center justify-center rounded-[30px] text-[13px] uppercase"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}
