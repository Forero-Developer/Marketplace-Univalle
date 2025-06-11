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
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-50">
      {/* Panel Izquierdo - Moderno y sutil con rojos vibrantes */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="md:w-1/2 w-full flex flex-col justify-between relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #e60000 0%, #b30000 100%)",
        }}
      >
        {/* Elementos decorativos sutiles */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2"></div>

        {/* Efecto de brillo mejorado */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-red-400/20 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-pink-500/15 blur-2xl rounded-full"></div>

        {/* Patrón de líneas */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Patrón de puntos sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-32 left-40 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-40 left-16 w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-40 w-1 h-1 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-white/15 rounded-xl backdrop-blur-sm shadow-xl shadow-red-900/10">
              <AppLogoIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">MarketplaceUnivalle</h3>
          </motion.div>
        </div>

        <div className="relative z-10 p-12 space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl shadow-red-900/10">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">Únete a nosotros</h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Crea tu cuenta y forma parte de la comunidad universitaria más grande del Valle del Cauca.
              </p>

              <div className="mt-6 flex items-center gap-3 text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/60"></div>
                  <div className="w-8 h-2 rounded-full bg-white/80"></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-white/70 text-sm font-medium"
          >
            Universidad del Valle
          </motion.div>
        </div>
      </motion.div>

      {/* Panel Derecho - Limpio y moderno */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="relative md:w-1/2 w-full flex items-center justify-center p-8 bg-white overflow-y-auto"
      >
        {/* Elementos decorativos sutiles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50 rounded-full opacity-30 blur-3xl"></div>

        <div className="absolute top-6 right-6">
          <TextLink href={route("home")} className="p-3 rounded-xl hover:bg-red-50 transition-all duration-200 group">
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
          </TextLink>
        </div>

        <div className="w-full max-w-md relative z-10 mt-33">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <AuthLayout title="Crear una cuenta" description="Ingresa tus datos para crear tu cuenta">
              <Head title="Register" />

              <form className="flex flex-col gap-6 mt-8" onSubmit={submit}>
                <div className="grid gap-6">
                  {/* Name */}
                  <div className="grid gap-3">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Nombre completo
                    </Label>
                    <div className="relative group">
                      <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        disabled={processing}
                        placeholder="Tu nombre completo"
                        className="h-12 pl-4 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-xl transition-all duration-200 group-hover:border-red-300"
                      />
                      <div className="absolute inset-0 rounded-xl border border-red-500/0 group-hover:border-red-500/5 pointer-events-none transition-all duration-300"></div>
                    </div>
                    <InputError message={errors.name} />
                  </div>

                  {/* Email */}
                  <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Correo electrónico
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        required
                        tabIndex={2}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        disabled={processing}
                        placeholder="email@correounivalle.edu.co"
                        className="h-12 pl-4 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-xl transition-all duration-200 group-hover:border-red-300"
                      />
                      <div className="absolute inset-0 rounded-xl border border-red-500/0 group-hover:border-red-500/5 pointer-events-none transition-all duration-300"></div>
                    </div>
                    <InputError message={errors.email} />
                  </div>

                  {/* Password */}
                  <div className="grid gap-3">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Contraseña
                    </Label>
                    <div className="relative group">
                      <Input
                        id="password"
                        type="password"
                        required
                        tabIndex={3}
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        disabled={processing}
                        placeholder="••••••••"
                        className="h-12 pl-4 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-xl transition-all duration-200 group-hover:border-red-300"
                      />
                      <div className="absolute inset-0 rounded-xl border border-red-500/0 group-hover:border-red-500/5 pointer-events-none transition-all duration-300"></div>
                    </div>
                    <InputError message={errors.password} />
                  </div>

                  {/* Confirm password */}
                  <div className="grid gap-3">
                    <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">
                      Confirmar contraseña
                    </Label>
                    <div className="relative group">
                      <Input
                        id="password_confirmation"
                        type="password"
                        required
                        tabIndex={4}
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        disabled={processing}
                        placeholder="••••••••"
                        className="h-12 pl-4 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-xl transition-all duration-200 group-hover:border-red-300"
                      />
                      <div className="absolute inset-0 rounded-xl border border-red-500/0 group-hover:border-red-500/5 pointer-events-none transition-all duration-300"></div>
                    </div>
                    <InputError message={errors.password_confirmation} />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="h-12 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group mt-2"
                    tabIndex={5}
                    disabled={processing}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/0 via-white/10 to-red-600/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <span className="relative flex items-center justify-center">
                      {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-2" />}
                      Crear cuenta
                    </span>
                  </Button>
                </div>

                <div className="text-gray-500 text-center text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <TextLink
                    href={route("login")}
                    className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                    tabIndex={6}
                  >
                    Iniciar sesión
                  </TextLink>
                </div>
              </form>
            </AuthLayout>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
