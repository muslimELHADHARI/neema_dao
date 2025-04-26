"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDown,
  Bot,
  Copy,
  FileText,
  Leaf,
  Lightbulb,
  Loader2,
  MessageSquare,
  Mic,
  Plus,
  Send,
  ThumbsUp,
  User,
} from "lucide-react"

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm Neema, your AI assistant for food waste reduction. I can help you with project ideas, food preservation tips, funding opportunities, and more. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setIsLoading(true)
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let response
      if (input.toLowerCase().includes("project")) {
        response = {
          role: "assistant",
          content:
            "Here are some project ideas for food waste reduction:\n\n1. **Community Composting** - Set up composting stations in neighborhoods to turn food waste into valuable soil.\n\n2. **Restaurant Surplus App** - Create an app that connects restaurants with surplus food to people who can use it.\n\n3. **Preservation Workshops** - Organize workshops to teach traditional food preservation techniques.\n\n4. **Ugly Produce Market** - Start a market for imperfect fruits and vegetables that would otherwise be discarded.\n\nWould you like more details on any of these ideas?",
        }
      } else if (input.toLowerCase().includes("funding")) {
        response = {
          role: "assistant",
          content:
            "There are several funding opportunities for food waste reduction projects in Tunisia:\n\n1. **Neema DAO Platform** - Submit your project on our platform to get community votes and investor funding.\n\n2. **Green Innovation Fund** - Offers grants of up to 10,000 TND for sustainable projects.\n\n3. **Mediterranean Food Waste Initiative** - Provides matching funds for food waste reduction startups.\n\n4. **Tunisia Entrepreneurship Bank** - Offers low-interest loans for green businesses.\n\nI can help you prepare an application for any of these if you're interested!",
        }
      } else if (input.toLowerCase().includes("preservation") || input.toLowerCase().includes("store")) {
        response = {
          role: "assistant",
          content:
            "Here are some food preservation tips to reduce waste:\n\n1. **Proper Storage** - Store fruits and vegetables separately as many fruits release ethylene gas that speeds ripening.\n\n2. **Freezing** - Most vegetables should be blanched before freezing. Fruits can be frozen on a tray first, then transferred to containers.\n\n3. **Pickling** - A traditional method that works for vegetables, eggs, and even some fruits.\n\n4. **Drying** - Sun drying or using a dehydrator works well for herbs, fruits, and some vegetables.\n\nWould you like specific instructions for preserving a particular food item?",
        }
      } else {
        response = {
          role: "assistant",
          content:
            "I'm here to help with all your food waste reduction questions! I can provide information on:\n\n- Project ideas and implementation\n- Funding opportunities\n- Food preservation techniques\n- Composting methods\n- Restaurant inventory management\n- Community engagement strategies\n- Environmental impact calculations\n\nFeel free to ask about any of these topics or something else related to food waste reduction!",
        }
      }
      setMessages((prev) => [...prev, response])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="space-y-4">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </Button>

              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Recent Chats</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span className="truncate">Food preservation methods</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span className="truncate">Project funding ideas</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span className="truncate">Restaurant waste reduction</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Suggested Topics</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setInput("What are some project ideas for food waste reduction?")
                        setTimeout(handleSendMessage, 100)
                      }}
                    >
                      <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
                      <span className="truncate">Project ideas</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setInput("How can I get funding for my food waste project?")
                        setTimeout(handleSendMessage, 100)
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4 text-blue-500" />
                      <span className="truncate">Funding opportunities</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setInput("What are the best ways to preserve vegetables?")
                        setTimeout(handleSendMessage, 100)
                      }}
                    >
                      <Leaf className="mr-2 h-4 w-4 text-emerald-500" />
                      <span className="truncate">Food preservation tips</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1">
            <Card className="h-[calc(100vh-8rem)] flex flex-col">
              <CardHeader className="px-4 py-3 border-b">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Neema AI Assistant</CardTitle>
                    <CardDescription className="text-xs">
                      <Badge variant="outline" className="text-xs font-normal rounded-sm mr-1">
                        Food Waste Expert
                      </Badge>
                      <span className="text-xs">•</span>
                      <span className="text-xs ml-1">Updated April 2023</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <div className="px-4 border-b">
                  <TabsList className="w-full justify-start h-10 p-0 bg-transparent">
                    <TabsTrigger
                      value="chat"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent"
                    >
                      Chat
                    </TabsTrigger>
                    <TabsTrigger
                      value="knowledge"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent"
                    >
                      Knowledge Base
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`flex max-w-[80%] ${
                            message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                          }`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            <Avatar className="h-8 w-8">
                              {message.role === "assistant" ? (
                                <>
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                                  <AvatarFallback>
                                    <Bot className="h-4 w-4" />
                                  </AvatarFallback>
                                </>
                              ) : (
                                <>
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                  <AvatarFallback>
                                    <User className="h-4 w-4" />
                                  </AvatarFallback>
                                </>
                              )}
                            </Avatar>
                          </div>
                          <div
                            className={`mx-2 p-3 rounded-lg ${
                              message.role === "assistant"
                                ? "bg-slate-100 text-foreground"
                                : "bg-emerald-600 text-white"
                            }`}
                          >
                            <div className="whitespace-pre-line">{message.content}</div>
                            {message.role === "assistant" && (
                              <div className="flex items-center justify-end gap-2 mt-2">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Copy className="h-3 w-3" />
                                  <span className="sr-only">Copy</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span className="sr-only">Like</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex max-w-[80%]">
                          <div className="flex-shrink-0 mt-1">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                              <AvatarFallback>
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="mx-2 p-3 rounded-lg bg-slate-100">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex items-end gap-2">
                      <div className="relative flex-1">
                        <Input
                          placeholder="Type your message..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="pr-10 py-6 resize-none"
                          disabled={isLoading}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 bottom-2 h-8 w-8"
                          disabled={isLoading}
                        >
                          <Mic className="h-5 w-5 text-muted-foreground" />
                          <span className="sr-only">Voice input</span>
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isLoading}
                      >
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                    <div className="flex justify-center mt-2">
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        Scroll to bottom
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="knowledge" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
                  <div className="text-center py-8">
                    <Leaf className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Food Waste Knowledge Base</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      Access our comprehensive resources on food waste reduction, preservation techniques, and
                      sustainable practices.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Food Preservation Guide</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive techniques for extending food shelf life and reducing waste.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Guide
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Project Implementation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Step-by-step guides for implementing food waste reduction projects.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Guide
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
