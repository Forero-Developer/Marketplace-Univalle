'use client';

import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-background relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-y-auto p-4">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-red-50 opacity-30 blur-3xl sm:h-48 sm:w-48 md:h-64 md:w-64"></div>
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-pink-50 opacity-30 blur-3xl sm:h-48 sm:w-48 md:h-64 md:w-64"></div>

            {/* Patrón de puntos sutil */}
            <div className="pointer-events-none absolute inset-0 opacity-5">
                <div className="absolute top-16 left-16 h-1 w-1 rounded-full bg-red-400 sm:top-20 sm:left-20 sm:h-1.5 sm:w-1.5"></div>
                <div className="absolute top-24 left-32 h-0.5 w-0.5 rounded-full bg-red-300 sm:top-32 sm:left-40 sm:h-1 sm:w-1"></div>
                <div className="absolute top-32 left-12 h-0.5 w-0.5 rounded-full bg-red-500 sm:top-40 sm:left-16 sm:h-1 sm:w-1"></div>
                <div className="absolute right-16 bottom-32 h-1 w-1 rounded-full bg-red-400 sm:right-20 sm:bottom-40 sm:h-1.5 sm:w-1.5"></div>
                <div className="absolute right-32 bottom-24 h-0.5 w-0.5 rounded-full bg-red-300 sm:right-40 sm:bottom-32 sm:h-1 sm:w-1"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
                <div className="flex flex-col gap-6 sm:gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex flex-col items-center justify-between gap-3 sm:gap-4"
                    >
                      <div className="relative flex items-center justify-end w-full h-16">
                        {/* Logo centrado */}
                        <Link
                          href={route('home')}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-2 font-medium"
                        >
                          <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-rose-700 shadow-lg shadow-red-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-red-500/40 sm:h-14 sm:w-14 md:h-16 md:w-16">
                            <AppLogoIcon className="h-7 w-7 fill-current text-white sm:h-8 sm:w-8 md:h-10 md:w-10" />
                          </div>
                          <span className="sr-only">{title}</span>
                        </Link>

                        {/* Flecha a la derecha */}
                        <Button
                          onClick={() => router.visit(route('home'))}
                          variant={'outline'}
                          className="group cursor-pointer rounded-xl p-2 transition-all duration-200 hover:bg-red-50 sm:p-3"
                        >
                          <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-red-500 sm:h-5 sm:w-5" />
                        </Button>
                      </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="space-y-2 text-center sm:space-y-3"
                        >
                            <h1 className="bg-gradient-to-r from-red-600 to-rose-700 bg-clip-text text-xl leading-tight font-bold text-transparent sm:text-2xl md:text-3xl">
                                {title}
                            </h1>
                            <p className="text-muted-foreground px-2 text-center text-xs leading-relaxed sm:px-4 sm:text-sm md:text-base">
                                {description}
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="rounded-2xl border border-red-100/20 bg-white p-4 shadow-xl shadow-red-500/5 sm:p-6 md:p-8"
                    >
                        {children}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
