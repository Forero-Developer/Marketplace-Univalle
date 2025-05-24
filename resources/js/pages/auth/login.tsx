import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import AppLogoIcon from '@/components/app-logo-icon';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Panel Izquierdo con animación */}
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

            {/* Panel Derecho con animación */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                className="relative md:w-1/2 w-full flex items-center justify-center p-8 bg-white"
            >
                <div className='absolute top-4 right-4 '>
                    <TextLink href={route('home')}>
                        <LogOut/>  
                    </TextLink>
                </div>
                <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
                    <Head title="Log in" />

                    <form className="w-full max-w-md flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@correounivalle.edu.co"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>
                            

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button type="submit" className="bg-red-600 hover:bg-red-700 cursor-pointer mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Don't have an account?{' '}
                            <TextLink href={route('register')} tabIndex={5}>
                                Sign up
                            </TextLink>
                        </div>
                    </form>

                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
                    )}
                </AuthLayout>
            </motion.div>
        </div>
    );
}
