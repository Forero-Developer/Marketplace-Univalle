import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShoppingBag,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
// import AppLogoIcon from '@/components/app-logo-icon';
import { motion } from 'framer-motion';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Corregido: Usar "scroll" en lugar de "scrolled"
    window.addEventListener("scrolled", handleScroll)
    return () => window.removeEventListener("scrolled", handleScroll)
  }, [])

  return (
    <>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>

      <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18]">
        {/* Header */}
       <header className="fixed top-0 z-50 w-full bg-red-600 transition-all duration-300">
  <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
    
    {/* Logo + Título */}
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-xl ${
          scrolled ? "bg-gradient-to-r from-red-600 to-rose-500" : "bg-white/15 backdrop-blur-sm"
        }`}
      >
        <AppLogoIcon className={`w-6 h-6 ${scrolled ? "text-white" : "text-red-600"}`} />
      </div>
      <span className={`text-lg sm:text-xl font-bold ${scrolled ? "text-red-600" : "text-white"}`}>
        MarketplaceUnivalle
      </span>
    </div>

    {/* Botones */}
    <nav className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 mt-2 sm:mt-0">
      {auth.user ? (
        <Link
          href={route('dashboard')}
          className="rounded-md border border-white text-white px-4 py-1.5 text-sm sm:text-base hover:bg-white hover:text-red-600 transition-colors"
        >
          Dashboard
        </Link>
      ) : (
        <>
          <Link
            href={route('login')}
            className="rounded-md border border-white text-white px-4 py-1.5 text-sm sm:text-base hover:bg-white hover:text-red-600 transition-colors"
          >
            Acceso
          </Link>
          <Link
            href={route('register')}
            className="rounded-md border border-white text-white px-4 py-1.5 text-sm sm:text-base hover:bg-white hover:text-red-600 transition-colors"
          >
            Registro
          </Link>
        </>
      )}
    </nav>
  </div>
</header>


        {/* Main Content */}
        <main className="flex-1 pt-16 md:pt-0">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full min-h-screen py-12 md:py-24 lg:py-32 bg-gradient-to-b from-red-50 to-white flex flex-col items-center justify-center text-center"
          >
            <div className="container px-4 md:px-6 max-w-3xl space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-red-700">
                  Marketplace Univalle
                </h1>
                <p className="text-gray-600 md:text-xl">
                  La plataforma digital donde la comunidad universitaria puede
                  comprar, vender e intercambiar productos y servicios.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 min-[400px]:flex-row">
                <Link href={route('register')}>
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Únete Ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    const featuresSection = document.getElementById('features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Conoce Más
                </Button>
              </div>
              <div className="flex items-center justify-center mt-8">
              <img src="https://campusvirtual.univalle.edu.co/moodle/theme/image.php/mooveuv/theme_mooveuv/1746188544/logouv" width="96" height="96" alt="Descripción" />
              </div>
            </div>
          </motion.section>

          {/* Características */}
          <motion.section
            id="features"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700">
                  Características
                </div>
                <h2 className="text-3xl font-bold md:text-4xl text-red-700">
                  Todo lo que necesitas en un solo lugar
                </h2>
                <p className="max-w-[900px] mx-auto text-gray-600 md:text-xl">
                  Diseñado para satisfacer las necesidades de la comunidad universitaria de UniValle.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                {[{
                  icon: <ShoppingBag className="h-12 w-12 text-red-600" />,
                  title: 'Compra y Venta',
                  desc: 'Encuentra libros, materiales, electrónicos y más o vende lo que ya no usas.'
                }, {
                  icon: <BookOpen className="h-12 w-12 text-red-600" />,
                  title: 'Intercambio Académico',
                  desc: 'Intercambia libros, apuntes y recursos educativos con otros estudiantes.'
                }, {
                  icon: <Users className="h-12 w-12 text-red-600" />,
                  title: 'Comunidad',
                  desc: 'Conecta con estudiantes, docentes y administrativos de la Universidad del Valle.'
                }].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"
                  >
                    {feature.icon}
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-500">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Acerca de */}
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-red-50"
          >
            <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex items-center justify-center mt-8">
              <img src="https://campusvirtual.univalle.edu.co/moodle/theme/image.php/mooveuv/theme_mooveuv/1746188544/logouv" width="96" height="96" alt="Descripción" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-red-700 sm:text-4xl">Acerca de MarketplaceUnivalle</h2>
                <p className="text-gray-600 md:text-xl">
                  Una iniciativa para fomentar la economía circular en la comunidad universitaria. Accede a recursos a buen precio y genera ingresos extra.
                </p>
                <p className="text-gray-600 md:text-xl">
                  Hecho por y para la comunidad de UniValle: estudiantes, docentes y personal administrativo.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contacto */}
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 text-center"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold md:text-4xl text-red-700 mb-4">¿Tienes preguntas?</h2>
              <p className="max-w-[600px] mx-auto text-gray-600 md:text-xl">
                Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
                <Button className="bg-red-600 hover:bg-red-700">Contáctanos</Button>
                <Button variant="outline">FAQ</Button>
              </div>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t bg-gray-100"
        >
          <div className="container mx-auto px-4 md:px-6 py-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
              <div className="flex flex-col gap-2 w-full md:w-1/2 text-left">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-red-600" />
                  <span className="text-xl font-bold">MarketplaceUnivalle</span>
                </div>
                <p className="text-sm text-gray-500">
                  © 2024 Universidad del Valle. Todos los derechos reservados.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 w-full md:w-1/2 md:justify-end text-left md:text-right">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">Plataforma</h3>
                  <Link href="#" className="text-sm text-gray-500 hover:underline">Términos de Servicio</Link>
                  <a
                    href="https://campusvirtual.univalle.edu.co/moodle/local/infocvuv/privacidad-campus-virtual.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Politicas de Privacidad
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">Contacto</h3>
                  <Link href="#" className="text-sm text-gray-500 hover:underline">soporte@univalle.edu.co</Link>
                  <a
                    href="https://campusvirtual.univalle.edu.co/moodle/login/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Campus Virtual
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
}
