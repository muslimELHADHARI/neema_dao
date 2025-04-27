"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bot,
  BookOpen,
  Copy,
  Download,
  Edit,
  FileText,
  Folder,
  FolderOpen,
  Keyboard,
  Leaf,
  Lightbulb,
  Loader2,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Pin,
  PinOff,
  Plus,
  Search,
  Send,
  Settings,
  Tag,
  Trash,
  User,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Knowledge base data
const knowledgeBaseData = [
  {
    id: "kb-1",
    category: "DAO Models",
    title: "Decentralized Autonomous Organizations",
    content: `
# Decentralized Autonomous Organizations (DAOs)

DAOs are organizations represented by rules encoded as a computer program that is transparent, controlled by the organization members, and not influenced by a central government.

## Key Components:
- **Smart Contracts**: Self-executing contracts with the terms directly written into code
- **Governance Tokens**: Digital assets that grant voting rights
- **Treasury Management**: Collective control of organization funds
- **Proposal Systems**: Mechanisms for suggesting and voting on changes

## Benefits for Eco-Projects:
- **Transparency**: All transactions and decisions are visible on the blockchain
- **Community Ownership**: Stakeholders have direct influence over project direction
- **Reduced Overhead**: Automated processes reduce administrative costs
- **Global Collaboration**: Enables worldwide participation without traditional barriers

Neema DAO specifically focuses on using this structure to address food waste reduction and sustainability initiatives through community-driven governance.
    `,
    tags: ["governance", "blockchain", "community", "decentralization"],
  },
  {
    id: "kb-2",
    category: "Environmental Justice",
    title: "Principles of Environmental Justice",
    content: `
# Environmental Justice Principles

Environmental justice is the fair treatment and meaningful involvement of all people regardless of race, color, national origin, or income with respect to the development, implementation, and enforcement of environmental laws, regulations, and policies.

## Core Principles:
- **Equal Protection**: All communities deserve equal protection from environmental hazards
- **Meaningful Participation**: Communities should have a voice in decisions affecting their environment
- **Fair Access**: Everyone deserves fair access to environmental benefits
- **Accountability**: Those who cause environmental harm should be held accountable

## Application in Sustainability Projects:
- **Community-Led Initiatives**: Prioritizing solutions designed by affected communities
- **Equitable Resource Distribution**: Ensuring benefits reach marginalized populations
- **Traditional Knowledge Integration**: Valuing indigenous and local knowledge systems
- **Intersectional Approach**: Recognizing how environmental issues connect with other social justice concerns

Neema DAO incorporates these principles by ensuring that sustainability initiatives address social equity alongside environmental goals.
    `,
    tags: ["justice", "equity", "community", "social impact"],
  },
  {
    id: "kb-3",
    category: "Regenerative Agriculture",
    title: "Regenerative Farming Practices",
    content: `
# Regenerative Agriculture

Regenerative Agriculture is a conservation and rehabilitation approach to food and farming systems. It focuses on topsoil regeneration, increasing biodiversity, improving the water cycle, enhancing ecosystem services, supporting biosequestration, increasing resilience to climate change, and strengthening the health and vitality of farm soil.

## Key Practices:
- **No-Till Farming**: Minimizing soil disturbance to maintain soil structure
- **Cover Cropping**: Planting crops to cover soil rather than leaving it bare
- **Crop Rotation**: Changing crops grown on a field to improve soil health
- **Composting**: Converting organic waste into valuable soil amendments
- **Holistic Grazing**: Managing livestock to mimic natural grazing patterns

## Benefits:
- **Carbon Sequestration**: Pulls carbon from atmosphere into soil
- **Water Retention**: Improves soil's ability to hold water
- **Biodiversity**: Creates habitat for beneficial organisms
- **Reduced Inputs**: Decreases need for synthetic fertilizers and pesticides
- **Nutrient-Dense Food**: Produces more nutritious crops

Neema DAO supports regenerative agriculture as a key strategy for sustainable food systems and reducing food waste through healthier, more resilient local food production.
    `,
    tags: ["agriculture", "soil health", "carbon sequestration", "biodiversity"],
  },
  {
    id: "kb-4",
    category: "Eco-Innovation",
    title: "Circular Economy Models",
    content: `
# Circular Economy Models

The circular economy is an economic system aimed at eliminating waste and the continual use of resources. It employs reuse, sharing, repair, refurbishment, remanufacturing and recycling to create a closed-loop system, minimizing resource inputs and waste, pollution and carbon emissions.

## Key Principles:
- **Design Out Waste**: Create products designed for durability and recyclability
- **Keep Materials in Use**: Maintain products at their highest value for as long as possible
- **Regenerate Natural Systems**: Return valuable nutrients to the soil and other ecosystems

## Implementation Strategies:
- **Product-as-a-Service**: Selling the service a product provides rather than the product itself
- **Sharing Platforms**: Maximizing product use through shared access
- **Resource Recovery**: Recovering and reusing materials at end-of-life
- **Life Extension**: Repairing and refurbishing to extend product lifespans
- **Industrial Symbiosis**: Using one industry's waste as another's raw material

## Food System Applications:
- **Food Waste Prevention**: Systems to prevent surplus food generation
- **Redistribution Networks**: Connecting excess food with those who need it
- **Composting Infrastructure**: Converting inedible food waste to soil amendments
- **Upcycled Products**: Creating value-added products from food by-products

Neema DAO leverages circular economy principles to create closed-loop food systems that minimize waste while maximizing value and nutrition.
    `,
    tags: ["circular economy", "zero waste", "resource efficiency", "sustainability"],
  },
  {
    id: "kb-5",
    category: "Community Empowerment",
    title: "Community-Led Sustainability Initiatives",
    content: `
# Community-Led Sustainability Initiatives

Community-led sustainability initiatives empower local groups to design and implement environmental solutions tailored to their specific needs and contexts. These grassroots approaches build resilience, foster social cohesion, and create lasting change through local ownership.

## Success Factors:
- **Inclusive Governance**: Decision-making structures that include diverse voices
- **Capacity Building**: Developing local skills and leadership
- **Appropriate Technology**: Using accessible, maintainable technologies
- **Social Capital**: Building networks of trust and reciprocity
- **Knowledge Sharing**: Systems for documenting and sharing learnings

## Example Models:
- **Community Gardens**: Shared spaces for growing food and building community
- **Repair Cafés**: Volunteer-run spaces where people repair items together
- **Tool Libraries**: Shared resources that reduce individual consumption
- **Community Energy**: Locally owned renewable energy projects
- **Food Sharing Networks**: Systems for redistributing surplus food

## Implementation Steps:
1. **Community Mapping**: Identifying local assets, needs, and opportunities
2. **Vision Setting**: Collectively defining goals and success metrics
3. **Action Planning**: Developing concrete steps and responsibilities
4. **Resource Mobilization**: Securing necessary funding and support
5. **Implementation**: Carrying out planned activities
6. **Reflection and Adaptation**: Regular evaluation and course correction

Neema DAO supports community-led initiatives by providing resources, connection, and amplification while respecting local autonomy and wisdom.
    `,
    tags: ["community", "grassroots", "local action", "empowerment"],
  },
]

// Types
type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
}

type Conversation = {
  id: string
  title: string
  messages: Message[]
  pinned: boolean
  category?: string
  lastUpdated: number
}

type KnowledgeItem = {
  id: string
  category: string
  title: string
  content: string
  tags: string[]
}

// Declare webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

export default function AIAssistantPage() {
  // State
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState("")
  const [visionUnlocked, setVisionUnlocked] = useState(false)
  const [suggestions, setSuggestions] = useState([
    "Eco-Project Ideas",
    "Sustainability Models",
    "Community Building for Green Initiatives",
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [settings, setSettings] = useState({
    darkMode: false,
    autoScroll: true,
    notifications: true,
    saveHistory: true,
    voiceInput: false,
  })
  const [isRecording, setIsRecording] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>(knowledgeBaseData)
  const [selectedKnowledgeItem, setSelectedKnowledgeItem] = useState<KnowledgeItem | null>(null)
  const [kbSearchQuery, setKbSearchQuery] = useState("")
  const [kbActiveCategory, setKbActiveCategory] = useState<string | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<"text" | "json" | "markdown">("markdown")
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Derived state
  const filteredConversations = conversations.filter((conversation) => {
    if (!searchQuery) return true
    return (
      conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const sortedConversations = [...filteredConversations].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    // Then sort by last updated timestamp (most recent first)
    return b.lastUpdated - a.lastUpdated
  })

  const filteredKnowledgeBase = knowledgeBase.filter((item) => {
    const matchesSearch =
      !kbSearchQuery ||
      item.title.toLowerCase().includes(kbSearchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(kbSearchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(kbSearchQuery.toLowerCase()))

    const matchesCategory = !kbActiveCategory || item.category === kbActiveCategory

    return matchesSearch && matchesCategory
  })

  const knowledgeCategories = Array.from(new Set(knowledgeBase.map((item) => item.category)))

  // Effects
  useEffect(() => {
    // Load all conversations from localStorage
    const savedConversations = JSON.parse(localStorage.getItem("allConversations") || "[]")
    if (savedConversations.length > 0) {
      setConversations(savedConversations)
      // Set the active conversation to the most recent one
      const mostRecent = savedConversations.sort((a, b) => b.lastUpdated - a.lastUpdated)[0]
      setActiveConversationId(mostRecent.id)
      setMessages(mostRecent.messages)
    } else {
      // Create a new conversation if none exist
      createNewChat()
    }

    // Load settings
    const savedSettings = JSON.parse(localStorage.getItem("assistantSettings") || "null")
    if (savedSettings) {
      setSettings(savedSettings)
    }

    // Set up keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearching(true)
        setTimeout(() => document.getElementById("conversation-search")?.focus(), 100)
      }

      // Cmd/Ctrl + N for new chat
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault()
        createNewChat()
      }

      // Esc to cancel search
      if (e.key === "Escape" && isSearching) {
        setIsSearching(false)
        setSearchQuery("")
      }

      // Alt + 1 for Chat tab
      if (e.altKey && e.key === "1") {
        e.preventDefault()
        setActiveTab("chat")
      }

      // Alt + 2 for Knowledge Base tab
      if (e.altKey && e.key === "2") {
        e.preventDefault()
        setActiveTab("knowledge")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSearching])

  useEffect(() => {
    // Scroll to bottom when messages change if autoScroll is enabled
    if (settings.autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, settings.autoScroll])

  useEffect(() => {
    // Save settings when they change
    localStorage.setItem("assistantSettings", JSON.stringify(settings))
  }, [settings])

  // Functions
  const createNewChat = () => {
    const newId = Date.now().toString()
    const newConversation: Conversation = {
      id: newId,
      title: `New Chat ${conversations.length + 1}`,
      messages: [],
      pinned: false,
      lastUpdated: Date.now(),
    }

    const updatedConversations = [newConversation, ...conversations]
    setConversations(updatedConversations)
    setActiveConversationId(newId)
    setMessages([])
    setInput("")

    // Save to localStorage
    localStorage.setItem("allConversations", JSON.stringify(updatedConversations))

    // Focus the input field
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the conversation selection

    const updatedConversations = conversations.filter((conv) => conv.id !== id)
    setConversations(updatedConversations)

    // If we're deleting the active conversation, switch to the first available one or create a new one
    if (id === activeConversationId) {
      if (updatedConversations.length > 0) {
        setActiveConversationId(updatedConversations[0].id)
        setMessages(updatedConversations[0].messages)
      } else {
        createNewChat()
      }
    }

    // Save to localStorage
    localStorage.setItem("allConversations", JSON.stringify(updatedConversations))
  }

  const togglePinConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the conversation selection

    const updatedConversations = conversations.map((conv) =>
      conv.id === id ? { ...conv, pinned: !conv.pinned } : conv,
    )

    setConversations(updatedConversations)
    localStorage.setItem("allConversations", JSON.stringify(updatedConversations))
  }

  const openRenameDialog = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the conversation selection
    setActiveConversationId(id)
    setNewTitle(currentTitle)
    setIsRenameDialogOpen(true)
  }

  const handleRenameConversation = () => {
    if (!activeConversationId || !newTitle.trim()) return

    const updatedConversations = conversations.map((conv) =>
      conv.id === activeConversationId ? { ...conv, title: newTitle.trim() } : conv,
    )

    setConversations(updatedConversations)
    localStorage.setItem("allConversations", JSON.stringify(updatedConversations))
    setIsRenameDialogOpen(false)
  }

  const exportConversation = (format: "text" | "json" | "markdown") => {
    if (!activeConversationId) return

    const conversation = conversations.find((c) => c.id === activeConversationId)
    if (!conversation) return

    let content = ""
    const filename = `${conversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${new Date().toISOString().split("T")[0]}`

    if (format === "json") {
      content = JSON.stringify(conversation, null, 2)
      downloadFile(`${filename}.json`, content, "application/json")
    } else if (format === "text") {
      content = conversation.messages
        .map((msg) => `${msg.role === "user" ? "You" : "Neema"}: ${msg.content}`)
        .join("\n\n")
      downloadFile(`${filename}.txt`, content, "text/plain")
    } else if (format === "markdown") {
      content = `# ${conversation.title}\n\n`
      content += `*Exported from Neema DAO Assistant on ${new Date().toLocaleString()}*\n\n`
      content += conversation.messages
        .map((msg) => `## ${msg.role === "user" ? "You" : "Neema"}\n\n${msg.content}\n`)
        .join("\n")
      downloadFile(`${filename}.md`, content, "text/markdown")
    }

    setIsExportDialogOpen(false)
  }

  const downloadFile = (filename: string, content: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !activeConversationId) return

    const messageId = Date.now().toString()
    const userMessage: Message = {
      id: messageId,
      role: "user",
      content: input,
      timestamp: Date.now(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)
    setCurrentStreamingMessage("")

    // Update the title of the conversation if it's the first message
    let updatedConversations = [...conversations]
    const conversationIndex = updatedConversations.findIndex((c) => c.id === activeConversationId)

    if (conversationIndex !== -1) {
      // Update the conversation with the new message
      updatedConversations[conversationIndex].messages = updatedMessages
      updatedConversations[conversationIndex].lastUpdated = Date.now()

      // Update the title if it's the first message
      if (updatedConversations[conversationIndex].messages.length === 1) {
        // Use the first few words of the first message as the title
        const title = input.split(" ").slice(0, 3).join(" ") + "..."
        updatedConversations[conversationIndex].title = title
      }
    }

    setConversations(updatedConversations)
    localStorage.setItem("allConversations", JSON.stringify(updatedConversations))

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gemma3:1b",
          prompt: generatePrompt(userMessage.content, updatedMessages),
          stream: true,
        }),
      })

      if (!response.body) throw new Error("No response body from API.")

      const reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let aiMessage = ""

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })

        const lines = chunk.split("\n").filter((line) => line.trim() !== "")
        for (const line of lines) {
          const parsed = JSON.parse(line)
          if (parsed.error) throw new Error(parsed.error)
          if (parsed.response) {
            aiMessage += parsed.response
            setCurrentStreamingMessage(aiMessage)
          }
        }
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: aiMessage.trim(),
        timestamp: Date.now(),
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)

      // Update the conversation with the AI response
      updatedConversations = [...conversations]
      const updatedIndex = updatedConversations.findIndex((c) => c.id === activeConversationId)
      if (updatedIndex !== -1) {
        updatedConversations[updatedIndex].messages = finalMessages
        updatedConversations[updatedIndex].lastUpdated = Date.now()
      }

      setConversations(updatedConversations)

      // Save all conversations to localStorage
      localStorage.setItem("allConversations", JSON.stringify(updatedConversations))
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "⚠️ Oops! Failed to get response. Please check your connection and try again.",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, errorMessage])

      // Update the conversation with the error message
      const updatedConversations = [...conversations]
      const conversationIndex = updatedConversations.findIndex((c) => c.id === activeConversationId)
      if (conversationIndex !== -1) {
        updatedConversations[conversationIndex].messages = [...updatedMessages, errorMessage]
        updatedConversations[conversationIndex].lastUpdated = Date.now()
        setConversations(updatedConversations)
        localStorage.setItem("allConversations", JSON.stringify(updatedConversations))
      }
    } finally {
      setIsLoading(false)
      setCurrentStreamingMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const switchConversation = (id: string) => {
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      setActiveConversationId(id)
      setMessages(conversation.messages)
      setIsSearching(false)
      setSearchQuery("")
    }
  }

  const handleNewVision = () => {
    createNewChat()
    setVisionUnlocked(true)
    setSuggestions(["New Eco-Solutions", "Tech Innovations for Sustainability", "Smart Community Projects"])
    setInput("What is a good eco-project idea for Neema DAO?")
    setTimeout(handleSendMessage, 100)
  }

  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input is not supported in your browser. Please try Chrome.")
      return
    }

    setIsRecording(true)

    // @ts-ignore - WebkitSpeechRecognition is not in the TypeScript types
    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("")

      setInput(transcript)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could show a toast notification here
      console.log("Copied to clipboard")
    })
  }

  const clearAllConversations = () => {
    if (window.confirm("Are you sure you want to delete all conversations? This cannot be undone.")) {
      setConversations([])
      localStorage.setItem("allConversations", "[]")
      createNewChat()
    }
  }

  const selectKnowledgeItem = (item: KnowledgeItem) => {
    setSelectedKnowledgeItem(item)
  }

  const insertKnowledgeIntoChat = (content: string) => {
    setInput((prev) => prev + (prev ? " " : "") + content)
    setActiveTab("chat")
    inputRef.current?.focus()
  }

  const generatePrompt = (userInput: string, conversationHistory: Message[] = []) => {
    // Extract previous messages for context
    const previousMessages = conversationHistory
      .slice(0, -1) // Exclude the latest user message which we'll add explicitly
      .map((msg) => `${msg.role === "user" ? "User" : "Neema"}: ${msg.content}`)
      .join("\n")

    return `
You are Neema, the AI heart of the Neema DAO — a decentralized autonomous organization focused on food waste reduction, sustainability, community empowerment, and eco-innovation.

Act like our assistant with minimal and precise response.

${previousMessages ? `Previous conversation:\n${previousMessages}\n\n` : ""}

The user asked:
"${userInput}"

Now, respond as Neema would — with wisdom, creativity, and purpose.
`
  }

  const parseMessage = (content: string) => {
    // Handle bold text
    const parsedContent = content
    const boldRegex = /\*\*(.*?)\*\*/g
    const boldParts: (string | JSX.Element)[] = []
    let lastIndex = 0

    let match
    while ((match = boldRegex.exec(content)) !== null) {
      // Push text before the match
      if (match.index > lastIndex) {
        boldParts.push(content.slice(lastIndex, match.index))
      }
      // Push the bolded part
      boldParts.push(
        <span key={match.index} className="font-bold">
          {match[1]}
        </span>,
      )
      lastIndex = boldRegex.lastIndex
    }

    // Push any remaining text after the last match
    if (lastIndex < content.length) {
      boldParts.push(content.slice(lastIndex))
    }

    // If no bold formatting was found, just return the original content
    if (boldParts.length === 0) {
      return content
    }

    return boldParts
  }

  const renderMarkdown = (content: string) => {
    // This is a simple markdown renderer for the knowledge base
    // In a real app, you'd use a proper markdown library

    // Handle headers
    let html = content.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')

    // Handle bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Handle italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // Handle lists
    html = html.replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')

    // Convert paragraphs
    html = html.replace(/\n\n/g, '</p><p class="my-2">')

    // Wrap in paragraph tags
    html = '<p class="my-2">' + html + "</p>"

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={createNewChat}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Chat
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowKeyboardShortcuts(true)}>
                      <Keyboard className="mr-2 h-4 w-4" />
                      Keyboard Shortcuts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearAllConversations} className="text-red-500">
                      <Trash className="mr-2 h-4 w-4" />
                      Clear All Conversations
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Search */}
              <div className="relative">
                {isSearching ? (
                  <div className="flex items-center">
                    <Input
                      id="conversation-search"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-8"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => {
                        setIsSearching(false)
                        setSearchQuery("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => setIsSearching(true)}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search conversations...
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </Button>
                )}
              </div>

              {/* Conversations */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    Conversations
                    {sortedConversations.length > 0 && (
                      <Badge variant="outline" className="ml-2">
                        {sortedConversations.length}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-0 max-h-[calc(100vh-20rem)] overflow-y-auto">
                  {sortedConversations.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      {searchQuery ? "No conversations found" : "No conversations yet"}
                    </div>
                  ) : (
                    <AnimatePresence>
                      <div className="space-y-1">
                        {sortedConversations.map((conversation) => (
                          <motion.div
                            key={conversation.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center group"
                          >
                            <Button
                              variant={activeConversationId === conversation.id ? "default" : "ghost"}
                              className="w-full justify-start text-left overflow-hidden"
                              onClick={() => switchConversation(conversation.id)}
                            >
                              {conversation.pinned ? (
                                <Pin className="mr-2 h-4 w-4 text-emerald-500" />
                              ) : (
                                <MessageSquare className="mr-2 h-4 w-4" />
                              )}
                              <span className="truncate">{conversation.title}</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => togglePinConversation(conversation.id, e)}>
                                  {conversation.pinned ? (
                                    <>
                                      <PinOff className="mr-2 h-4 w-4" />
                                      Unpin
                                    </>
                                  ) : (
                                    <>
                                      <Pin className="mr-2 h-4 w-4" />
                                      Pin
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => openRenameDialog(conversation.id, conversation.title, e)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setActiveConversationId(conversation.id)
                                    setIsExportDialogOpen(true)
                                  }}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Export
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => deleteConversation(conversation.id, e)}
                                  className="text-red-500"
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  )}
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => {
                          setInput(suggestion)
                          setActiveTab("chat")
                          setTimeout(handleSendMessage, 100)
                        }}
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1">
            <Card className="h-[calc(100vh-8rem)] flex flex-col">
              <CardHeader className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg" alt="Neema Assistant" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Neema DAO Assistant</CardTitle>
                      <CardDescription className="text-xs">
                        <Badge variant="outline" className="text-xs font-normal rounded-sm mr-1">
                          Eco DAO Expert
                        </Badge>
                        <span className="text-xs">• Updated April 2025</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setShowKeyboardShortcuts(true)}>
                            <Keyboard className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Keyboard shortcuts</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(true)}>
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Settings</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="px-4 border-b">
                  <TabsList className="w-full justify-start h-10 p-0 bg-transparent">
                    <TabsTrigger value="chat" className="data-[state=active]:bg-muted">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="knowledge" className="data-[state=active]:bg-muted">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Knowledge Base
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chat" className="flex-1 flex flex-col p-0 overflow-hidden">
                  <ScrollArea className="flex-1 p-4">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                        <div>
                          <Leaf className="mx-auto h-12 w-12 mb-4 text-emerald-500" />
                          <h3 className="text-lg font-medium mb-2">Welcome to Neema DAO Assistant</h3>
                          <p className="max-w-md">
                            Ask me about sustainability, eco-projects, or how to build community around green
                            initiatives.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                          >
                            <div
                              className={`flex max-w-[80%] group ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                                }`}
                            >
                              <Avatar className="h-8 w-8 mt-1">
                                {message.role === "assistant" ? (
                                  <>
                                    <AvatarImage src="/placeholder.svg" alt="Neema" />
                                    <AvatarFallback>
                                      <Bot className="h-4 w-4" />
                                    </AvatarFallback>
                                  </>
                                ) : (
                                  <>
                                    <AvatarImage src="/placeholder.svg" alt="User" />
                                    <AvatarFallback>
                                      <User className="h-4 w-4" />
                                    </AvatarFallback>
                                  </>
                                )}
                              </Avatar>
                              <div className="relative">
                                <div
                                  className={`ml-2 p-3 rounded-lg ${message.role === "assistant"
                                      ? "bg-muted text-muted-foreground"
                                      : "bg-emerald-600 text-white"
                                    }`}
                                >
                                  {parseMessage(message.content)}
                                </div>
                                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm"
                                    onClick={() => copyToClipboard(message.content)}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 ml-2">
                                  {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {currentStreamingMessage && (
                          <div className="flex justify-start">
                            <div className="flex max-w-[80%] flex-row">
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarImage src="/placeholder.svg" alt="Neema" />
                                <AvatarFallback>
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-2 p-3 rounded-lg bg-muted text-muted-foreground">
                                {parseMessage(currentStreamingMessage)}
                                <span className="inline-block w-2 h-4 ml-1 bg-emerald-500 animate-pulse"></span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>
                  <div className="border-t p-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        ref={inputRef}
                        className="flex-1"
                        placeholder="Plant your idea here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                      />
                      {settings.voiceInput && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={startVoiceInput}
                          disabled={isLoading || isRecording}
                          className={isRecording ? "bg-red-100" : ""}
                        >
                          <Mic className={`h-4 w-4 ${isRecording ? "text-red-500 animate-pulse" : ""}`} />
                        </Button>
                      )}
                      <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="knowledge" className="flex-1 flex flex-col p-0 overflow-hidden">
                  <div className="flex h-full">
                    {/* Knowledge Base Sidebar */}
                    <div className="w-64 border-r flex flex-col">
                      <div className="p-4 border-b">
                        <Input
                          placeholder="Search knowledge base..."
                          value={kbSearchQuery}
                          onChange={(e) => setKbSearchQuery(e.target.value)}
                          className="mb-2"
                        />
                      </div>
                      <ScrollArea className="flex-1">
                        <div className="p-2">
                          <div className="mb-4">
                            <Button
                              variant={kbActiveCategory === null ? "default" : "ghost"}
                              className="w-full justify-start text-left mb-1"
                              onClick={() => setKbActiveCategory(null)}
                            >
                              <FolderOpen className="mr-2 h-4 w-4" />
                              All Categories
                            </Button>
                            {knowledgeCategories.map((category) => (
                              <Button
                                key={category}
                                variant={kbActiveCategory === category ? "default" : "ghost"}
                                className="w-full justify-start text-left mb-1"
                                onClick={() => setKbActiveCategory(category)}
                              >
                                <Folder className="mr-2 h-4 w-4" />
                                {category}
                              </Button>
                            ))}
                          </div>
                          <Separator className="my-2" />
                          <div className="space-y-1">
                            {filteredKnowledgeBase.map((item) => (
                              <Button
                                key={item.id}
                                variant={selectedKnowledgeItem?.id === item.id ? "default" : "ghost"}
                                className="w-full justify-start text-left"
                                onClick={() => selectKnowledgeItem(item)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                <span className="truncate">{item.title}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Knowledge Base Content */}
                    <div className="flex-1 flex flex-col">
                      {selectedKnowledgeItem ? (
                        <div className="flex flex-col h-full">
                          <div className="p-4 border-b flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{selectedKnowledgeItem.title}</h3>
                              <p className="text-sm text-muted-foreground">{selectedKnowledgeItem.category}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(selectedKnowledgeItem.content)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => insertKnowledgeIntoChat(selectedKnowledgeItem.title)}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Ask About This
                              </Button>
                            </div>
                          </div>
                          <ScrollArea className="flex-1 p-6">
                            {renderMarkdown(selectedKnowledgeItem.content)}

                            <div className="mt-6 pt-4 border-t">
                              <div className="flex flex-wrap gap-2">
                                {selectedKnowledgeItem.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => setKbSearchQuery(tag)}
                                  >
                                    <Tag className="mr-1 h-3 w-3" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </ScrollArea>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-center text-muted-foreground p-4">
                          <div>
                            <BookOpen className="mx-auto h-12 w-12 mb-4 text-emerald-500" />
                            <h3 className="text-lg font-medium mb-2">Knowledge Base</h3>
                            <p className="max-w-md mb-4">
                              Explore our curated knowledge on sustainability, eco-innovation, and community
                              empowerment.
                            </p>
                            <p className="text-sm">Select a category or article from the sidebar to get started.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Customize your Neema DAO Assistant experience</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-scroll">Auto-scroll to new messages</Label>
                <p className="text-sm text-muted-foreground">Automatically scroll to the latest message</p>
              </div>
              <Switch
                id="auto-scroll"
                checked={settings.autoScroll}
                onCheckedChange={(checked) => setSettings({ ...settings, autoScroll: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="save-history">Save conversation history</Label>
                <p className="text-sm text-muted-foreground">Store conversations in your browser</p>
              </div>
              <Switch
                id="save-history"
                checked={settings.saveHistory}
                onCheckedChange={(checked) => setSettings({ ...settings, saveHistory: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="voice-input">Voice input</Label>
                <p className="text-sm text-muted-foreground">Enable voice input for messages</p>
              </div>
              <Switch
                id="voice-input"
                checked={settings.voiceInput}
                onCheckedChange={(checked) => setSettings({ ...settings, voiceInput: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Conversation</DialogTitle>
            <DialogDescription>Enter a new name for this conversation</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Conversation name"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameConversation} disabled={!newTitle.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Conversation</DialogTitle>
            <DialogDescription>Choose a format to export your conversation</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={exportFormat === "markdown" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setExportFormat("markdown")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Markdown
              </Button>
              <Button
                variant={exportFormat === "text" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setExportFormat("text")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Text
              </Button>
              <Button
                variant={exportFormat === "json" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setExportFormat("json")}
              >
                <FileText className="mr-2 h-4 w-4" />
                JSON
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => exportConversation(exportFormat)}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogDescription>Boost your productivity with these shortcuts</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>New chat</span>
                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>N
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Search conversations</span>
                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Send message</span>
                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  Enter
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Switch to Chat tab</span>
                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">Alt</span>1
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Switch to Knowledge Base tab</span>
                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">Alt</span>2
                </kbd>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowKeyboardShortcuts(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
