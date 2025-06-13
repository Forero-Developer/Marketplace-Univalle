"use client"

import type React from "react"

import { useForm, router, Head } from "@inertiajs/react"
import { useEffect, useRef} from "react"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"
import { ArrowLeft, Send, MessageSquare } from "lucide-react"


type MessageForm = {
  message: string
}

interface ShowProps {
  conversation: {
    id: number
    user1_id: number
    user2_id: number
    user1: { id: number; name: string }
    user2: { id: number; name: string }
    product?: {
      id: number
      name: string
      images?: string[]
    }
  }
  messages: {
    id: number
    message: string
    created_at: string
    user: { id: number; name: string }
  }[]
  currentUserId: number
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
  {
    title: "Mensajes",
    href: route("conversations.show", { conversation: 0 }),
  },
]

export default function Show({ conversation, messages, currentUserId }: ShowProps) {
  const { data, setData, post, processing } = useForm<MessageForm>({
    message: "",
  })

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.message.trim()) return

    post(route("messages.store", conversation.id), {
      preserveScroll: true,
      onSuccess: () => {
        setData("message", "")
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto"
        }
      },
    })
  }

  const otherUser = conversation.user1.id === currentUserId ? conversation.user2 : conversation.user1

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData("message", e.target.value)

    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    // Show typing indicator
  }

  // Format date
  const formatMessageTime = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Conversación con ${otherUser.name}`} />

      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-23 md:pt-13">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.visit(route("conversations.index"))}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>

              <div className="text-right">
                <h2 className="text-sm font-medium text-white/80">Conversación con</h2>
                <h1 className="text-xl font-bold">{otherUser.name}</h1>
              </div>
            </div>

            {/* Product info if available */}
            {conversation.product && (
              <div className="mt-4 flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                {conversation.product.images && conversation.product.images[0] && (
                  <div className="w-12 h-12 rounded-lg bg-white/20 overflow-hidden flex-shrink-0">
                    <img
                      src={`/storage/${conversation.product.images[0]}`}
                      alt={conversation.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white/70">Producto</p>
                  <p className="text-sm font-semibold text-white truncate">{conversation.product.name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="h-[400px] sm:h-[500px] overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="space-y-4">
              {messages.length > 0 ? (
                messages.map((message) => {
                  const isCurrentUser = message.user.id === currentUserId
                  return (
                    <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                          isCurrentUser
                            ? "bg-gradient-to-r from-red-600 to-red-500 text-white rounded-br-none"
                            : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-semibold ${isCurrentUser ? "text-white/90" : "text-gray-600"}`}
                          >
                            {message.user.name}
                          </span>
                          {message.created_at && (
                            <span className={`text-xs ${isCurrentUser ? "text-white/70" : "text-gray-400"}`}>
                              {formatMessageTime(message.created_at)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base whitespace-pre-wrap break-words">{message.message}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No hay mensajes aún</p>
                  <p className="text-gray-400 text-sm mt-1">Envía el primer mensaje para iniciar la conversación</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message form */}
          <div className="border-t border-gray-100 p-4 sm:p-6">
            <form onSubmit={sendMessage} className="flex flex-col gap-3">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={data.message}
                  onChange={handleTextareaChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent min-h-[80px] max-h-[200px] transition-all duration-200"
                  placeholder="Escribe un mensaje..."
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={processing || !data.message.trim()}
                  className={`absolute right-3 bottom-3 p-2 rounded-full transition-all duration-200 ${
                    data.message.trim()
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-md hover:shadow-red-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5 cursor-pointer" />
                </button>
              </div>

              {/* Typing indicator */}
              <div className="flex justify-between items-center px-1">
                <div className="text-xs text-gray-400 ml-auto">Presiona el boton para enviar</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
