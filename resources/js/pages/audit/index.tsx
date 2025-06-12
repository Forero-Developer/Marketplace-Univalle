"use client"

import { usePage } from "@inertiajs/react"
import { router, type PageProps } from "@inertiajs/core"
import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { Search, Filter, Calendar, User, Activity, ChevronLeft, ChevronRight, Eye, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"

interface ActivityType {
  id: number
  description: string
  properties: object
  created_at: string
  causer?: { name: string } | null
}

interface Props extends PageProps {
  activities: {
    data: ActivityType[]
    prev_page_url: string | null
    next_page_url: string | null
  }
  [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Inicio",
    href: "/dashboard",
  },
  {
    title: "Auditoría",
    href: "/audit",
  },
]

export default function AuditIndex() {
  const { activities } = usePage<Props>().props
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null)
  const [filterBy, setFilterBy] = useState<"all" | "user" | "system">("all")

  // Filtrar actividades basado en búsqueda y filtros
  const filteredActivities = useMemo(() => {
    return activities.data.filter((activity) => {
      const matchesSearch =
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.causer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(activity.properties).toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter =
        filterBy === "all" || (filterBy === "user" && activity.causer) || (filterBy === "system" && !activity.causer)

      return matchesSearch && matchesFilter
    })
  }, [activities.data, searchTerm, filterBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getActionBadgeColor = (description: string) => {
    if (description.includes("created") || description.includes("creado")) return "bg-green-100 text-green-800"
    if (description.includes("updated") || description.includes("actualizado")) return "bg-blue-100 text-blue-800"
    if (description.includes("deleted") || description.includes("eliminado")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50 rounded-full opacity-30 blur-3xl"></div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl shadow-red-500/5 border border-red-100/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                  Registro de Auditoría
                </h1>
                <p className="text-gray-600 mt-2">Monitorea todas las actividades del sistema</p>
              </div>

              <div className="flex items-center gap-4">
                {/* <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button> */}
               <Button variant="outline" onClick={() => router.visit(route('admin.products.index'))} className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button> 
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Activity className="w-4 h-4" />
                  {filteredActivities.length} actividades
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtros y Búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-red-500/5 border border-red-100/20">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Buscador */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por usuario, acción o detalles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-xl"
                />
              </div>

              {/* Filtros */}
              <div className="flex gap-2">
                <Button
                  variant={filterBy === "all" ? "default" : "outline"}
                  onClick={() => setFilterBy("all")}
                  className={`rounded-xl cursor-pointer ${
                    filterBy === "all"
                      ? "bg-gradient-to-r from-red-600 to-rose-500 text-white"
                      : "border-red-200 text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Todas
                </Button>
                <Button
                  variant={filterBy === "user" ? "default" : "outline"}
                  onClick={() => setFilterBy("user")}
                  className={`rounded-xl cursor-pointer ${
                    filterBy === "user"
                      ? "bg-gradient-to-r from-red-600 to-rose-500 text-white"
                      : "border-red-200 text-red-600 hover:bg-red-50"
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Usuarios
                </Button>
                <Button
                  variant={filterBy === "system" ? "default" : "outline"}
                  onClick={() => setFilterBy("system")}
                  className={`rounded-xl cursor-pointer ${
                    filterBy === "system"
                      ? "bg-gradient-to-r from-red-600 to-rose-500 text-white"
                      : "border-red-200 text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Sistema
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabla */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl shadow-red-500/5 border border-red-100/20 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700">Usuario</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700">Acción</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700">Fecha</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-700">Detalles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredActivities.map((activity, index) => (
                  <motion.tr
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-red-50/50 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-rose-500 flex items-center justify-center text-white text-sm font-medium">
                          {activity.causer?.name ? activity.causer.name.charAt(0).toUpperCase() : "S"}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{activity.causer?.name || "Sistema"}</div>
                          {activity.causer && <div className="text-sm text-gray-500">Usuario registrado</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${getActionBadgeColor(activity.description)} border-0 font-medium`}>
                        {activity.description}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(activity.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedActivity(activity)}
                        className="text-red-600 hover:bg-red-50 rounded-lg group-hover:opacity-100 transition-all duration-200 cursor-pointer "
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver detalles
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron actividades</h3>
              <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </motion.div>

        {/* Paginación */}
        {(activities.prev_page_url || activities.next_page_url) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <div className="bg-white rounded-2xl p-4 shadow-xl shadow-red-500/5 border border-red-100/20">
              <div className="flex items-center gap-4">
                {activities.prev_page_url ? (
                  <a
                    href={activities.prev_page_url}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 text-gray-400 rounded-xl">
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </div>
                )}

                <div className="w-px h-6 bg-gray-200"></div>

                {activities.next_page_url ? (
                  <a
                    href={activities.next_page_url}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 text-gray-400 rounded-xl">
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                Detalles de la Actividad
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedActivity(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Usuario:</label>
                <p className="text-gray-900">{selectedActivity.causer?.name || "Sistema"}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Acción:</label>
                <p className="text-gray-900">{selectedActivity.description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Fecha:</label>
                <p className="text-gray-900">{formatDate(selectedActivity.created_at)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Propiedades:</label>
                <div className="mt-2 bg-gray-50 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                    {JSON.stringify(selectedActivity.properties, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  </AppLayout>
  )
}
