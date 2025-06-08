import { Head, Link, usePage } from "@inertiajs/react"
import { ArrowLeft, MessageSquare, ChevronRight, User, Clock, Package } from "lucide-react"
import type { PageProps } from "@/types/inertia" // Ajusta la ruta según tu proyecto
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"

interface Product {
  id: number
  name: string
  images?: string[]
}

interface Message {
  id: number
  message: string
  created_at: string
  user_id: number
}

interface Conversation {
  id: number
  user1_id: number
  user2_id: number
  user1: PageProps["auth"]["user"]
  user2: PageProps["auth"]["user"]
  product: Product
  messages: Message[]
  updated_at: string
}

interface Props {
  conversations: Conversation[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Inicio",
    href: "/dashboard",
  },
  {
    title: "Conversaciones",
    href: route("conversations.index"),
  },
]

export default function Index({ conversations }: Props) {
  const { auth } = usePage<PageProps>().props
  const user = auth.user

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return `Hoy, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays === 1) {
      return `Ayer, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays < 7) {
      const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
      return `${days[date.getDay()]}, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return date.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "2-digit" })
    }
  }

  // Sort conversations by last message date
  const sortedConversations = [...conversations].sort((a, b) => {
    const dateA = a.messages[0]?.created_at || a.updated_at
    const dateB = b.messages[0]?.created_at || b.updated_at
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mis Conversaciones" />

      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Mis Conversaciones</h1>
              <p className="text-white/80 mt-1">Gestiona tus mensajes con vendedores y compradores</p>
            </div>

            <Link
              href={route("dashboard")}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al dashboard
            </Link>
          </div>
        </div>

        {/* Conversations list */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
          {sortedConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No tienes conversaciones</h2>
              <p className="text-gray-500 max-w-md mb-6">
                Cuando inicies una conversación con un vendedor o un comprador, aparecerá aquí.
              </p>
              <Link
                href={route("dashboard")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl px-6 py-3 font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Explorar productos
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {sortedConversations.map((conversation) => {
                const otherUser = conversation.user1_id !== user.id ? conversation.user1 : conversation.user2

                const lastMessage = conversation.messages[0]
                const lastMessageText = lastMessage?.message || "Sin mensajes aún"
                const lastMessageDate = lastMessage?.created_at || conversation.updated_at
                const isLastMessageFromCurrentUser = lastMessage?.user_id === user.id

                return (
                  <li key={conversation.id} className="group">
                    <Link
                      href={route("conversations.show", conversation.id)}
                      className="block p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        {/* Product image */}
                        {conversation.product.images && conversation.product.images[0] ? (
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                            <img
                              src={`/storage/${conversation.product.images[0]}`}
                              alt={conversation.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 truncate pr-4">{conversation.product.name}</h3>
                            <span className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
                              <Clock className="w-3 h-3" />
                              {formatDate(lastMessageDate)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <User className="w-3 h-3" />
                              <span>{otherUser.name}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className={`text-sm truncate max-w-[80%] ${lastMessage ? "" : "italic text-gray-500"}`}>
                              {isLastMessageFromCurrentUser && lastMessage && (
                                <span className="font-medium text-gray-700">Tú: </span>
                              )}
                              {lastMessageText}
                            </p>

                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
