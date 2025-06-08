import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LogOut } from 'lucide-react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';


import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import AppLogoIcon from '@/components/app-logo-icon';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Panel Izquierdo animado */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="md:w-1/2 w-full flex flex-col justify-between bg-red-600 text-white p-8"
            >
                <div className="flex items-center gap-3">
                    <AppLogoIcon className="w-10 h-10" />
                    <h3 className="text-2xl font-bold">MarketplaceUnivalle</h3>
                </div>

                <div className="mt-auto">
                    <h4 className="text-white/80 mt-4 text-sm">
                        El marketplace oficial para la comunidad de la Universidad del Valle
                    </h4>
                    <p className="text-xs text-white">Universidad del Valle</p>
                </div>
            </motion.div>

            {/* Panel Derecho animado */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                className="relative md:w-1/2 w-full flex items-center justify-center bg-white p-8"
            >
                <div className='absolute top-4 right-4 '>
                    <TextLink href={route('home')}>
                        <LogOut/>  
                    </TextLink>
                </div>
                <div className="w-full max-w-md">
                    
                    <AuthLayout
                        title="Crear una cuenta"
                        description="Ingrese sus datos a continuación para crear su cuenta"
                    >
                        <Head title="Register" />

                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Nombre completo"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Direccion de correo electronico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@correounivalle.edu.co"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">contraseña</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="contraseña"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Confirm password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirme tu contraseña</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirme tu contraseña"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="bg-red-600 hover:bg-red-700 cursor-pointer mt-2 w-full"
                                    tabIndex={5}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Crear cuenta
                                </Button>
                            </div>

                            <div className="text-muted-foreground text-center text-sm">
                                ¿Ya tienes una cuenta?{' '}
                                <TextLink href={route('login')} tabIndex={6}>
                                    Iniciar Sesion
                                </TextLink>
                            </div>
                        </form>
                    </AuthLayout>
                </div>
            </motion.div>
        </div>
    );
}
