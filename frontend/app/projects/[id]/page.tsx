"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Heart,
  Leaf,
  Loader2,
  MapPin,
  MessageSquare,
  Share2,
  Users,
  Wallet,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { FundProjectModal } from "@/components/fund-project-modal"
import { VoteButton } from "@/components/vote-button"
import { TokenPurchaseModal } from "@/components/token-purchase-modal"

// Define interfaces for the API response
interface Inventor {
  id: string
  firstName: string
  lastName: string
  userType: string
  organization: string
  avatar?: string
}

interface Comment {
  id: string
  userId: string
  projectId: string
  content: string
  createdAt: string
  user: {
    firstName: string
    lastName: string
    avatar?: string
  }
}

interface Update {
  id?: string
  title: string
  content: string
  date: string
}

interface TimelineItem {
  date: string
  title: string
  description: string
}

interface TeamMember {
  name: string
  role: string
  avatar?: string
}

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  inventorId: string
  fundingGoal: number
  fundingRaised: number
  backers: number
  votes: number
  status: string
  wasteReduction: string
  location: string
  image: string
  gallery: string | string[]
  tags: string | string[]
  timeline: string | TimelineItem[]
  team: string | TeamMember[]
  updates: Update[] | string
  comments?: Comment[]
  startDate: string | null
  endDate: string | null
  isPublished: boolean
  createdAt: string
  updatedAt: string
  inventor: Inventor
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  // Add state for the funding modal
  const [fundingModalOpen, setFundingModalOpen] = useState(false)

  // Add state for the token purchase modal
  const [tokenModalOpen, setTokenModalOpen] = useState(false)

  // Add state for user tokens (in a real app, this would come from auth context)
  const [userTokens, setUserTokens] = useState(0)

  // Add a function to handle successful funding
  const handleFundingComplete = (amount: number) => {
    // Update the project data with the new funding amount
    setProject((prev) => {
      if (!prev) return null
      return {
        ...prev,
        fundingRaised: prev.fundingRaised + amount,
        backers: prev.backers + 1,
      }
    })
  }

  // Add a function to handle successful voting
  const handleVoteComplete = () => {
    // Update the project data with the new vote count
    setProject((prev) => {
      if (!prev) return null
      return {
        ...prev,
        votes: prev.votes + 1,
      }
    })

    // Decrease user tokens
    setUserTokens((prev) => Math.max(0, prev - 1))
  }

  // Add a function to handle token purchase
  const handleTokenPurchase = (amount: number) => {
    setUserTokens((prev) => prev + amount)
  }

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`http://localhost:5000/api/projects/${id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.statusText}`)
        }

        const data = await response.json()
        setProject(data)
      } catch (err) {
        console.error("Error fetching project:", err)
        setError(err instanceof Error ? err.message : "Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      })

      if (!response.ok) {
        throw new Error("Failed to post comment")
      }

      // Refresh project data to get updated comments
      const updatedProject = await fetch(`http://localhost:5000/api/projects/${id}`).then((res) => res.json())
      setProject(updatedProject)
      setComment("")
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Helper functions to parse data
  const parseGallery = (gallery: string | string[]): string[] => {
    if (Array.isArray(gallery)) return gallery
    try {
      return typeof gallery === "string" ? JSON.parse(gallery) : []
    } catch {
      // If it's a comma-separated string or single URL
      return gallery ? gallery.split(",").map((item) => item.trim()) : []
    }
  }

  const parseTags = (tags: string | string[]): string[] => {
    if (Array.isArray(tags)) return tags
    try {
      return typeof tags === "string" ? JSON.parse(tags) : []
    } catch {
      // If it's a comma-separated string
      return tags ? tags.split(",").map((tag) => tag.trim()) : []
    }
  }

  const parseTimeline = (timeline: string | TimelineItem[]): TimelineItem[] => {
    if (Array.isArray(timeline)) return timeline
    try {
      return typeof timeline === "string" ? JSON.parse(timeline) : []
    } catch {
      return []
    }
  }

  const parseTeam = (team: string | TeamMember[]): TeamMember[] => {
    if (Array.isArray(team)) return team
    try {
      return typeof team === "string" ? JSON.parse(team) : []
    } catch {
      return []
    }
  }

  const parseUpdates = (updates: Update[] | string): Update[] => {
    if (Array.isArray(updates)) return updates
    try {
      return typeof updates === "string" ? JSON.parse(updates) : []
    } catch {
      return []
    }
  }

  // Calculate days left if start and end dates are available
  const calculateDaysLeft = (endDate: string | null): number => {
    if (!endDate) return 0
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  if (loading) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600 mb-4" />
        <p className="text-lg">Loading project details...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center">
        <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Failed to load project</h2>
        <p className="text-muted-foreground mb-6">{error || "Project not found"}</p>
        <Button asChild>
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </div>
    )
  }

  const fundingPercentage = Math.min(Math.round((project.fundingRaised / project.fundingGoal) * 100), 100)
  const galleryImages = parseGallery(project.gallery)
  const projectTags = parseTags(project.tags)
  const timelineItems = parseTimeline(project.timeline)
  const teamMembers = parseTeam(project.team)
  const projectUpdates = parseUpdates(project.updates)
  const daysLeft = calculateDaysLeft(project.endDate)

  // Check if project has enough votes for funding
  const canFund = project.votes >= 100

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/projects" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={
                    project.status === "active"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                      : project.status === "completed"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : project.status === "funded"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }
                >
                  <Clock className="h-3 w-3 mr-1" /> {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
                <Badge variant="outline">
                  <MapPin className="h-3 w-3 mr-1" /> {project.location}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h1>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" /> Save
              </Button>
              <VoteButton projectId={project.id} onVoteComplete={handleVoteComplete} userTokens={userTokens} />
            </div>
          </div>

          {/* Project Image */}
          <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
            <Image
              src={project.image.startsWith("http") ? project.image : `/placeholder.svg?height=400&width=800`}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="md:col-span-2 space-y-8">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{project.longDescription}</p>

                    {galleryImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        {galleryImages.map((image, index) => (
                          <div key={index} className="relative h-[150px] rounded-md overflow-hidden">
                            <Image
                              src={image.startsWith("http") ? image : `/placeholder.svg?height=200&width=300`}
                              alt={`Project gallery ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {projectTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {projectTags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-50 dark:bg-slate-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium">Food Waste Reduction</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          {project.wasteReduction}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      This project helps reduce food waste by repurposing food that would otherwise be thrown away. By
                      converting this waste into a valuable product, we're creating a sustainable solution that benefits
                      the environment and creates economic opportunities.
                    </p>
                  </CardContent>
                </Card>

                {timelineItems.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative border-l border-muted pl-6 ml-2 space-y-8">
                        {timelineItems.map((item, index) => (
                          <div key={index} className="relative">
                            <div className="absolute -left-[27px] bg-emerald-100 dark:bg-emerald-900 rounded-full p-1">
                              <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                              {item.date}
                            </time>
                            <h3 className="text-base font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Updates Tab */}
              <TabsContent value="updates">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Updates</CardTitle>
                    <CardDescription>Latest news and progress on the project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {projectUpdates.length > 0 ? (
                      <div className="space-y-6">
                        {projectUpdates.map((update, index) => (
                          <div key={index} className="pb-6 border-b last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              >
                                Update
                              </Badge>
                              <span className="text-sm text-muted-foreground">{update.date}</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                            <p className="text-muted-foreground">{update.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No updates have been posted yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Team</CardTitle>
                    <CardDescription>Meet the people behind this initiative</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {teamMembers.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {teamMembers.map((member, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center text-center p-4 border rounded-lg dark:border-gray-700"
                          >
                            <Avatar className="h-20 w-20 mb-4">
                              <AvatarImage
                                src={member.avatar || "/placeholder.svg?height=80&width=80"}
                                alt={member.name}
                              />
                              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Team information is not available.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Discussion</CardTitle>
                    <CardDescription>Join the conversation about this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {project.comments && project.comments.length > 0 ? (
                      <div className="space-y-6">
                        {project.comments.map((comment, index) => (
                          <div key={index} className="flex gap-4 pb-6 border-b last:border-0">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={comment.user.avatar || "/placeholder.svg?height=40&width=40"}
                                alt={`${comment.user.firstName} ${comment.user.lastName}`}
                              />
                              <AvatarFallback>{`${comment.user.firstName.charAt(0)}${comment.user.lastName.charAt(0)}`}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{`${comment.user.firstName} ${comment.user.lastName}`}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 mb-6">
                        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                      </div>
                    )}

                    <div className="mt-6">
                      <form onSubmit={handleSubmitComment}>
                        <textarea
                          className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                          rows={3}
                          placeholder="Add your comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <Button
                          type="submit"
                          className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                          disabled={!comment.trim()}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" /> Post Comment
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Funding and Inventor */}
          <div className="space-y-6">
            {/* Funding Card */}
            {canFund ? (
              <Card>
                <CardHeader>
                  <CardTitle>Project Funding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Progress</span>
                      <span>{fundingPercentage}%</span>
                    </div>
                    <Progress value={fundingPercentage} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{project.fundingRaised} TND raised</span>
                      <span>Goal: {project.fundingGoal} TND</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-sm">Backers</span>
                    <span className="font-medium">{project.backers}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-sm">Votes</span>
                    <span className="font-medium">{project.votes}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm">Days Left</span>
                    <span className="font-medium">{daysLeft > 0 ? daysLeft : "N/A"}</span>
                  </div>

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setFundingModalOpen(true)}
                  >
                    <Wallet className="h-4 w-4 mr-2" /> Fund This Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Project Funding</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-2" />
                    <h3 className="text-lg font-medium mb-2">Funding Not Available Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      This project needs at least 100 votes before funding can begin. Current votes: {project.votes}/100
                    </p>
                    <Progress value={(project.votes / 100) * 100} className="h-2 mb-4" />
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" onClick={() => setTokenModalOpen(true)}>
                        Purchase Tokens to Vote
                      </Button>
                      <div className="text-xs text-muted-foreground mt-2">1 token = $1 = 1 vote</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Inventor Card */}
            <Card>
              <CardHeader>
                <CardTitle>Project Inventor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage
                      src={project.inventor.avatar || "/placeholder.svg?height=80&width=80"}
                      alt={`${project.inventor.firstName} ${project.inventor.lastName}`}
                    />
                    <AvatarFallback>{`${project.inventor.firstName.charAt(0)}${project.inventor.lastName.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{`${project.inventor.firstName} ${project.inventor.lastName}`}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{project.inventor.userType.replace("-", " ")}</p>
                  <p className="text-sm text-muted-foreground">{project.inventor.organization}</p>

                  <Separator className="my-4" />

                  <div className="w-full">
                    <Button variant="outline" className="w-full">
                      <Users className="h-4 w-4 mr-2" /> Contact Inventor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Similar Project 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Fruit Juice Production from Surplus</p>
                      <p className="text-xs text-muted-foreground">Food Processing • Sousse</p>
                      <div className="flex items-center text-xs mt-1">
                        <Leaf className="h-3 w-3 text-emerald-600 dark:text-emerald-400 mr-1" />
                        <span>800kg monthly</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Similar Project 2"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Vegetable Preservation Workshop</p>
                      <p className="text-xs text-muted-foreground">Education • Sfax</p>
                      <div className="flex items-center text-xs mt-1">
                        <Leaf className="h-3 w-3 text-emerald-600 dark:text-emerald-400 mr-1" />
                        <span>300kg monthly</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/projects">
                      View More <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Funding Modal */}
      {project && (
        <FundProjectModal
          projectId={project.id}
          projectTitle={project.title}
          open={fundingModalOpen}
          onOpenChange={setFundingModalOpen}
          onFundingComplete={handleFundingComplete}
        />
      )}

      {/* Token Purchase Modal */}
      <TokenPurchaseModal
        open={tokenModalOpen}
        onOpenChange={setTokenModalOpen}
        onPurchaseComplete={handleTokenPurchase}
      />
    </div>
  )
}
