import { useRef } from "react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  condition: string
  faculty: string
  images: string[]
  qr_code: string
  user_id: number
  created_at: string
  user: {
    id: number
    name: string
  }
}

interface QrCodeProductProps {
  product: Product
}

const QrCodeProduct = ({ product }: QrCodeProductProps) => {
  const currentUrl = window.location.href
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const qrRef = useRef<SVGSVGElement>(null)

  const generateProductQR = async () => {
    const canvas = canvasRef.current
    if (!canvas || !qrRef.current) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar canvas con mayor resolución
    canvas.width = 800
    canvas.height = 1100

    // Fondo degradado elegante

    ctx.fillStyle = "#D3D3D3"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Contenedor principal blanco
    const containerPadding = 30
    const containerWidth = canvas.width - containerPadding * 2
    const containerHeight = canvas.height - containerPadding * 2

    ctx.fillStyle = "white"
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
    ctx.shadowBlur = 25
    ctx.shadowOffsetY = 15
    ctx.roundRect(containerPadding, containerPadding, containerWidth, containerHeight, 25)
    ctx.fill()

    // Reset shadow
    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    // Header - Marketplace Universidad
    ctx.fillStyle = "#B8000A"
    ctx.font = "bold 28px Arial"
    ctx.textAlign = "center"
    ctx.fillText("MARKETPLACE UNVIVRSITARIO", canvas.width / 2, 90)

    // Línea decorativa
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 120, 105)
    ctx.lineTo(canvas.width / 2 + 120, 105)
    ctx.stroke()

    // Nombre del producto (título principal)
    ctx.fillStyle = "#111827"
    ctx.font = "bold 32px Arial"
    const productName = product.name.toUpperCase()

    // Dividir el nombre si es muy largo
    const maxWidth = containerWidth - 60
    if (ctx.measureText(productName).width > maxWidth) {
      const words = productName.split(" ")
      let line1 = ""
      let line2 = ""
      let currentLine = 1

      for (const word of words) {
        const testLine = (currentLine === 1 ? line1 : line2) + word + " "
        if (ctx.measureText(testLine).width > maxWidth && (currentLine === 1 ? line1 : line2) !== "") {
          if (currentLine === 1) {
            currentLine = 2
            line2 = word + " "
          } else {
            break
          }
        } else {
          if (currentLine === 1) {
            line1 = testLine
          } else {
            line2 = testLine
          }
        }
      }

      ctx.fillText(line1.trim(), canvas.width / 2, 160)
      if (line2.trim()) {
        ctx.fillText(line2.trim(), canvas.width / 2, 200)
      }
    } else {
      ctx.fillText(productName, canvas.width / 2, 160)
    }

    // Precio destacado
    ctx.fillStyle = "#dc2626"
    ctx.font = "bold 42px Arial"
    const formattedPrice = `$${new Intl.NumberFormat("es-ES").format(product.price)}`
    ctx.fillText(formattedPrice, canvas.width / 2, 260)

    // Tags de información
    const tags = [
      { text: product.faculty, color: "#3b82f6" },
      { text: product.condition, color: "#059669" },
      { text: product.category, color: "#7c3aed" },
    ]

    let tagY = 300
    ctx.font = "16px Arial"

    tags.forEach((tag) => {
      const tagWidth = ctx.measureText(tag.text).width + 24
      const tagX = (canvas.width - tagWidth) / 2

      // Fondo del tag
      ctx.fillStyle = tag.color
      ctx.roundRect(tagX, tagY - 20, tagWidth, 30, 15)
      ctx.fill()

      // Texto del tag
      ctx.fillStyle = "white"
      ctx.fillText(tag.text, canvas.width / 2, tagY - 5)

      tagY += 45
    })

    // Descripción (primeras líneas)
    ctx.fillStyle = "#4b5563"
    ctx.font = "18px Arial"
    const description = product.description || "Producto disponible en el marketplace universitario"
    const descWords = description.split(" ")
    let descLine = ""
    let descY = tagY + 20
    let lineCount = 0
    const maxLines = 3

    for (let i = 0; i < descWords.length && lineCount < maxLines; i++) {
      const testLine = descLine + descWords[i] + " "
      if (ctx.measureText(testLine).width > maxWidth - 40 && descLine !== "") {
        ctx.fillText(descLine.trim(), canvas.width / 2, descY)
        descLine = descWords[i] + " "
        descY += 25
        lineCount++
      } else {
        descLine = testLine
      }
    }

    if (lineCount < maxLines && descLine.trim()) {
      ctx.fillText(descLine.trim(), canvas.width / 2, descY)
    }

    // Convertir QR SVG a imagen
    const svgData = new XMLSerializer().serializeToString(qrRef.current)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    const qrImage = new Image()
    qrImage.crossOrigin = "anonymous"
    qrImage.onload = () => {
      // Posición del QR
      const qrSize = 280
      const qrX = (canvas.width - qrSize) / 2
      const qrY = descY + 50

      // Fondo blanco para el QR con sombra sutil
      ctx.fillStyle = "#f9fafb"
      ctx.roundRect(qrX - 25, qrY - 25, qrSize + 50, qrSize + 50, 15)
      ctx.fill()

      // Borde del QR
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 2
      ctx.roundRect(qrX - 25, qrY - 25, qrSize + 50, qrSize + 50, 15)
      ctx.stroke()

      // Dibujar QR
      ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize)

      // Información del vendedor
      const sellerY = qrY + qrSize + 60
      ctx.fillStyle = "#1f2937"
      ctx.font = "bold 22px Arial"
      ctx.fillText(`Vendedor: ${product.user.name.toUpperCase()}`, canvas.width / 2, sellerY)

      // Fecha de publicación
      ctx.fillStyle = "#6b7280"
      ctx.font = "16px Arial"
      const publishDate = new Date(product.created_at).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      ctx.fillText(`Publicado: ${publishDate}`, canvas.width / 2, sellerY + 30)

      // ID del producto
      ctx.fillStyle = "#9ca3af"
      ctx.font = "14px Arial"
      ctx.fillText(`ID: #${product.id}`, canvas.width / 2, sellerY + 55)

      // Footer con instrucciones
      ctx.fillStyle = "#374151"
      ctx.font = "bold 16px Arial"
      ctx.fillText("Escanea para ver más detalles", canvas.width / 2, canvas.height - 80)

      ctx.fillStyle = "#6b7280"
      ctx.font = "12px Arial"
      ctx.fillText("Marketplace Universidad - Compra y venta entre estudiantes", canvas.width / 2, canvas.height - 50)

      URL.revokeObjectURL(svgUrl)
    }

    qrImage.src = svgUrl
  }

  const handleDownload = async () => {
    await generateProductQR()

    const canvas = canvasRef.current
    if (!canvas) return

    setTimeout(() => {
      const pngFile = canvas.toDataURL("image/png", 1.0)
      const downloadLink = document.createElement("a")
      downloadLink.href = pngFile
      const fileName = `qr-${product.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${product.id}.png`
      downloadLink.download = fileName
      downloadLink.click()
    }, 800)
  }

  return (
    <div className="space-y-4">
      {/* Vista previa del QR simple */}
      <div className="bg-white p-4 rounded-lg border-2 border-gray-100 flex flex-col items-center">
        <QRCode ref={qrRef} value={currentUrl} size={150} style={{ height: "auto", maxWidth: "100%"}} />
        <div className="mt-3 text-center">
          <p className="text-sm font-medium text-gray-800 mt-3 break-all">{currentUrl}</p>
        </div>
      </div>

      {/* Botón de descarga */}
      <Button onClick={handleDownload} className="w-full" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Descargar QR Profesional
      </Button>

      {/* Canvas oculto */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  )
}

export default QrCodeProduct
