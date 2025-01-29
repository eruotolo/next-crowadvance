'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm() {
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        setError('');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Intenta obtener un mensaje de error del servidor
                throw new Error(errorData.message || 'Error en la solicitud'); // Lanza un error con el mensaje del servidor o un mensaje genérico
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData); // Muestra la respuesta en la consola
            reset(); // Limpia el formulario después del envío exitoso

            return responseData;
        } catch (error) {
            setError(error.message);
            console.error('Error submitting form:', error);
        }
    });

    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
                <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                    <input
                        className="bg-blanco w-full rounded-[24px] border-[1px] border-solid border-[#e4e4e4] px-[16px] py-[12px] text-[#4a4759] placeholder-[#4a4759]"
                        type="text"
                        {...register('name', { required: true })}
                        placeholder="Nombre Completo *"
                        autoComplete="name"
                    />
                </div>
                <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                    <input
                        className="bg-blanco w-full rounded-[24px] border-[1px] border-solid border-[#e4e4e4] px-[16px] py-[12px] text-[#4a4759] placeholder-[#4a4759]"
                        type="email"
                        placeholder="Email *"
                        autoComplete="email"
                        {...register('email', { required: true })}
                    />
                </div>
                <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                    <input
                        className="bg-blanco w-full rounded-[24px] border-[1px] border-solid border-[#e4e4e4] px-[16px] py-[12px] text-[#4a4759] placeholder-[#4a4759]"
                        type="number"
                        placeholder="Su número de teléfono *"
                        autoComplete="tel"
                        {...register('phone', { required: true })}
                    />
                </div>
                <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                    <textarea
                        className="bg-blanco h-[200px] w-full rounded-[24px] border-[1px] border-solid border-[#e4e4e4] px-[16px] py-[12px] text-[#4a4759] placeholder-[#4a4759]"
                        placeholder="Deja tu mensaje aquí *"
                        {...register('message', { required: true })}
                    ></textarea>
                </div>
                <div className="my-[10px] w-full md:my-[15px] md:w-6/12">
                    {/*<ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={(value) => {
                            // you got the token!
                            console.log(value);
                        }}
                    />*/}
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
        </>
    );
}
