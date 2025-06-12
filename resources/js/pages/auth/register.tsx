"use client"

import { Head, useForm } from "@inertiajs/react"
import { motion } from "framer-motion"
import { LoaderCircle } from "lucide-react"
import type { FormEventHandler } from "react"

import AppLogoIcon from "@/components/app-logo-icon"
import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/layouts/auth-layout"
type RegisterForm = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
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
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-80 sm:h-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5"></div>

        {/* Efecto de brillo mejorado */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 animate-pulse rounded-full bg-rose-500/20 blur-3xl"></div>
        <div className="absolute right-1/3 bottom-1/3 w-24 h-24 sm:w-48 sm:h-48 rounded-full bg-red-400/20 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 sm:w-32 sm:h-32 rounded-full bg-pink-500/15 blur-2xl"></div>

        {/* Patrón de líneas */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 h-full w-full">
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
          <div className="absolute top-20 left-20 h-2 w-2 rounded-full bg-white"></div>
          <div className="absolute top-32 left-40 h-1 w-1 rounded-full bg-white"></div>
          <div className="absolute top-40 left-16 h-1.5 w-1.5 rounded-full bg-white"></div>
          <div className="absolute right-20 bottom-40 h-2 w-2 rounded-full bg-white"></div>
          <div className="absolute right-40 bottom-32 h-1 w-1 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10 p-4 sm:p-6 lg:p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div className="rounded-xl bg-white/15 p-2 sm:p-3 shadow-xl shadow-red-900/10 backdrop-blur-sm">
              <AppLogoIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">MarketplaceUnivalle</h3>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8 p-4 sm:p-6 lg:p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="rounded-2xl bg-white/10 p-4 sm:p-6 lg:p-8 shadow-xl shadow-red-900/10 backdrop-blur-md">
              <h1 className="mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl leading-tight font-bold text-white">
                Únete a nosotros
              </h1>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/80">
                Crea tu cuenta y forma parte de la comunidad universitaria más grande del Valle del Cauca.
              </p>

              <div className="mt-4 sm:mt-6 flex items-center gap-3 text-white/60">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white/40"></div>
                  <div className="h-2 w-2 rounded-full bg-white/60"></div>
                  <div className="h-2 w-8 rounded-full bg-white/80"></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-xs sm:text-sm font-medium text-white/70"
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
        className="relative flex w-full items-center justify-center overflow-y-auto bg-white p-4 sm:p-6 lg:p-8 min-h-[65vh] lg:min-h-screen lg:w-1/2"
      >
        {/* Elementos decorativos sutiles */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-red-50 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-pink-50 opacity-30 blur-3xl"></div>

        <div className="relative z-10 w-full max-w-sm sm:max-w-md py-4 sm:py-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <AuthLayout title="Crear una cuenta" description="Ingresa tus datos para crear tu cuenta" >
              <Head title="Register" />

              <form className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6" onSubmit={submit}>
                <div className="grid gap-4 sm:gap-6">
                  {/* Name */}
                  <div className="grid gap-2 sm:gap-3">
                    <Label htmlFor="name" className="font-medium text-gray-700 text-sm sm:text-base">
                      Nombre completo
                    </Label>
                    <div className="group relative">
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
                        className="h-10 sm:h-12 rounded-xl border-gray-200 pl-3 sm:pl-4 text-sm sm:text-base transition-all duration-200 group-hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl border border-red-500/0 transition-all duration-300 group-hover:border-red-500/5"></div>
                    </div>
                    <InputError message={errors.name} />
                  </div>

                  {/* Email */}
                  <div className="grid gap-2 sm:gap-3">
                    <Label htmlFor="email" className="font-medium text-gray-700 text-sm sm:text-base">
                      Correo electrónico
                    </Label>
                    <div className="group relative">
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
                        className="h-10 sm:h-12 rounded-xl border-gray-200 pl-3 sm:pl-4 text-sm sm:text-base transition-all duration-200 group-hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl border border-red-500/0 transition-all duration-300 group-hover:border-red-500/5"></div>
                    </div>
                    <InputError message={errors.email} />
                  </div>

                  {/* Password */}
                  <div className="grid gap-2 sm:gap-3">
                    <Label htmlFor="password" className="font-medium text-gray-700 text-sm sm:text-base">
                      Contraseña
                    </Label>
                    <div className="group relative">
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
                        className="h-10 sm:h-12 rounded-xl border-gray-200 pl-3 sm:pl-4 text-sm sm:text-base transition-all duration-200 group-hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl border border-red-500/0 transition-all duration-300 group-hover:border-red-500/5"></div>
                    </div>
                    <InputError message={errors.password} />
                  </div>

                  {/* Confirm password */}
                  <div className="grid gap-2 sm:gap-3">
                    <Label htmlFor="password_confirmation" className="font-medium text-gray-700 text-sm sm:text-base">
                      Confirmar contraseña
                    </Label>
                    <div className="group relative">
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
                        className="h-10 sm:h-12 rounded-xl border-gray-200 pl-3 sm:pl-4 text-sm sm:text-base transition-all duration-200 group-hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl border border-red-500/0 transition-all duration-300 group-hover:border-red-500/5"></div>
                    </div>
                    <InputError message={errors.password_confirmation} />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="group relative mt-2 h-10 sm:h-12 transform overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-500 font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-red-700 hover:to-rose-600 hover:shadow-red-500/40 text-sm sm:text-base"
                    tabIndex={5}
                    disabled={processing}
                  >
                    <span className="absolute inset-0 h-full w-full -translate-x-full transform bg-gradient-to-r from-red-600/0 via-white/10 to-red-600/0 transition-transform duration-1000 group-hover:translate-x-full"></span>
                    <span className="relative flex items-center justify-center">
                      {processing && <LoaderCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-spin" />}
                      Crear cuenta
                    </span>
                  </Button>
                </div>

                <div className="text-center text-xs sm:text-sm text-gray-500">
                  ¿Ya tienes una cuenta?{" "}
                  <TextLink
                    href={route("login")}
                    className="font-semibold text-red-600 transition-colors hover:text-red-800"
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
