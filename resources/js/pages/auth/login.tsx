"use client"

import { Head, useForm } from "@inertiajs/react"
import { LoaderCircle } from "lucide-react"
import type { FormEventHandler } from "react"
import { motion } from "framer-motion"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/layouts/auth-layout"
import AppLogoIcon from "@/components/app-logo-icon"

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

interface LoginProps {
  status?: string
  canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: "",
    password: "",
    remember: false,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route("login"), {
      onFinish: () => reset("password"),
    })
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Panel Izquierdo - Moderno y sutil con rojos vibrantes */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:w-1/2 w-full min-h-[40vh] lg:min-h-screen flex flex-col justify-between relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #e60000 0%, #b30000 100%)",
        }}
      >
        {/* Elementos decorativos sutiles */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-80 sm:h-80 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2"></div>

        {/* Efecto de brillo mejorado */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-rose-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 sm:w-48 sm:h-48 bg-red-400/20 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-pink-500/15 blur-2xl rounded-full"></div>

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

        <div className="relative z-10 p-4 sm:p-6 lg:p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div className="p-2 sm:p-3 bg-white/15 rounded-xl backdrop-blur-sm shadow-xl shadow-red-900/10">
              <AppLogoIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">MarketplaceUnivalle</h3>
          </motion.div>
        </div>

        <div className="relative z-10 p-4 sm:p-6 lg:p-12 space-y-4 sm:space-y-6 lg:space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl shadow-red-900/10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                Bienvenido de vuelta
              </h1>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">
                Conecta con la comunidad universitaria y descubre oportunidades únicas en nuestro marketplace.
              </p>

              <div className="mt-4 sm:mt-6 flex items-center gap-3 text-white/60">
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
            className="text-white/70 text-xs sm:text-sm font-medium"
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
        className="relative lg:w-1/2 w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white min-h-[60vh] lg:min-h-screen"
      >
        {/* Elementos decorativos sutiles */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-red-50 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-pink-50 rounded-full opacity-30 blur-3xl"></div>

        <div className="w-full max-w-sm sm:max-w-md relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <AuthLayout
              title="Inicia sesión en tu cuenta"
              description="Ingresa tus credenciales para acceder a tu cuenta"
            >
              <Head title="Log in" />

              <form className="w-full flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8" onSubmit={submit}>
                <div className="grid gap-4 sm:gap-6">
                  <div className="grid gap-2 sm:gap-3">
                    <Label htmlFor="email" className="text-gray-700 font-medium text-sm sm:text-base">
                      Correo electrónico
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="email@correounivalle.edu.co"
                        className="h-10 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-xl transition-all duration-200 group-hover:border-red-300"
                      />
                      <div className="absolute inset-0 rounded-xl border border-red-500/0 group-hover:border-red-500/5 pointer-events-none transition-all duration-300"></div>
                    </div>
                    <InputError message={errors.email} />
                  </div>

                  <div className="grid gap-2 sm:gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-700 font-medium text-sm sm:text-base">
                        Contraseña
                      </Label>
                      {canResetPassword && (
                        <TextLink
                          href={route("password.request")}
                          className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                          tabIndex={5}
                        >
                          ¿Olvidaste tu contraseña?
                        </TextLink>
                      )}
                    </div>
                    <div className="relative group">
                      <Input
                        id="password"
                        type="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="••••••••"
                        className="h-10 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-xl transition-all duration-200 group-hover:border-red-300"
                      />
                      <div className="absolute inset-0 rounded-xl border border-red-500/0 group-hover:border-red-500/5 pointer-events-none transition-all duration-300"></div>
                    </div>
                    <InputError message={errors.password} />
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Checkbox
                      id="remember"
                      name="remember"
                      checked={data.remember}
                      onClick={() => setData("remember", !data.remember)}
                      tabIndex={3}
                      className="text-red-600 focus:ring-red-500 rounded"
                    />
                    <Label htmlFor="remember" className="text-gray-600 font-medium text-sm sm:text-base">
                      Recordarme
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="h-10 sm:h-12 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group text-sm sm:text-base"
                    tabIndex={4}
                    disabled={processing}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/0 via-white/10 to-red-600/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <span className="relative flex items-center justify-center">
                      {processing && <LoaderCircle className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />}
                      Iniciar sesión
                    </span>
                  </Button>
                </div>

                <div className="text-gray-500 text-center text-xs sm:text-sm">
                  ¿No tienes una cuenta?{" "}
                  <TextLink
                    href={route("register")}
                    className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                    tabIndex={5}
                  >
                    Crear cuenta
                  </TextLink>
                </div>
              </form>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl text-center text-xs sm:text-sm font-medium text-green-700"
                >
                  {status}
                </motion.div>
              )}
            </AuthLayout>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
