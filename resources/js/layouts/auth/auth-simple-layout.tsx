import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="bg-background flex h-full w-full flex-col items-center justify-center overflow-y-auto p-6 md:p-10 relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50 rounded-full opacity-30 blur-3xl"></div>

      {/* Patrón de puntos sutil */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
        <div className="absolute top-32 left-40 w-1 h-1 bg-red-300 rounded-full"></div>
        <div className="absolute top-40 left-16 w-1 h-1 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-32 right-40 w-1 h-1 bg-red-300 rounded-full"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Link href={route("home")} className="flex flex-col items-center gap-2 font-medium group">
              <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-rose-700 shadow-lg shadow-red-500/25 transition-all duration-300 group-hover:shadow-red-500/40 group-hover:scale-105">
                <AppLogoIcon className="size-10 fill-current text-white" />
              </div>
              <span className="sr-only">{title}</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-3 text-center"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 bg-clip-text to-rose-700 text-transparent">
                {title}
              </h1>
              <p className="text-muted-foreground text-center text-sm px-4">{description}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-xl shadow-red-500/5 border border-red-100/20"
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}