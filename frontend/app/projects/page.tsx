"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ThumbsUp,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Leaf,
  ArrowUpRight,
  PlusCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Define types based on the API response
interface Inventor {
  id: string
  firstName: string
  lastName: string
  userType: string
  organization: string
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
  gallery: string
  tags: string
  timeline: string
  team: string
  updates: any[]
  startDate: string | null
  endDate: string | null
  isPublished: boolean
  createdAt: string
  updatedAt: string
  inventor: Inventor
}

interface ApiResponse {
  projects: Project[]
  totalProjects: number
  totalPages: number
  currentPage: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchProjects()
  }, [currentPage, searchTerm, categoryFilter, locationFilter, statusFilter])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      // Build query parameters
      const queryParams = new URLSearchParams()
      queryParams.append("page", currentPage.toString())

      if (searchTerm) queryParams.append("search", searchTerm)
      if (categoryFilter !== "all") queryParams.append("category", categoryFilter)
      if (locationFilter !== "all") queryParams.append("location", locationFilter)
      if (statusFilter !== "all") queryParams.append("status", statusFilter)

      const response = await fetch(`http://localhost:5000/api/projects?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error(`Error fetching projects: ${response.status}`)
      }

      const data: ApiResponse = await response.json()

      setProjects(data.projects)
      setTotalPages(data.totalPages)
      setCurrentPage(data.currentPage)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch projects:", err)
      setError("Failed to load projects. Please try again later.")
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page when searching
    fetchProjects()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true
    return project.status === activeTab
  })

  // Parse tags string to array
  const getTagsArray = (tags: string) => {
    if (Array.isArray(tags)) {
      return tags;
    } else if (typeof tags === "string") {
      return tags.split(",");
    } else {
      return [];
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Projects</h1>
            <p className="text-muted-foreground">Discover and support food waste reduction initiatives in Tunisia</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Submit Project
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <h2 className="font-medium">Filters</h2>
          </div>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Food Processing">Food Processing</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Tunis">Tunis</SelectItem>
                  <SelectItem value="Sfax">Sfax</SelectItem>
                  <SelectItem value="Sousse">Sousse</SelectItem>
                  <SelectItem value="Hammamet">Hammamet</SelectItem>
                  <SelectItem value="Mounasstir">Mounasstir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="funded">Funded</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>

        {/* Project Tabs */}
        <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="funded">Funded</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {renderProjectsContent(filteredProjects, isLoading, error, getTagsArray)}
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            {renderProjectsContent(filteredProjects, isLoading, error, getTagsArray)}
          </TabsContent>

          <TabsContent value="funded" className="mt-6">
            {renderProjectsContent(filteredProjects, isLoading, error, getTagsArray)}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {renderProjectsContent(filteredProjects, isLoading, error, getTagsArray)}
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {!isLoading && !error && totalPages > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  className={currentPage === page ? "bg-emerald-50 dark:bg-emerald-900" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function renderProjectsContent(
  projects: Project[],
  isLoading: boolean,
  error: string | null,
  getTagsArray: (tags: string) => string[],
) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <span className="ml-2 text-lg">Loading projects...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Failed to load projects</h3>
        <p className="text-muted-foreground">{error}</p>
        <Button className="mt-4" variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later for new projects.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} getTagsArray={getTagsArray} />
      ))}
    </div>
  )
}

function ProjectCard({ project, getTagsArray }: { project: Project; getTagsArray: (tags: string) => string[] }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
            <Clock className="h-3 w-3 mr-1" /> Draft
          </Badge>
        )
      case "active":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-800">
            <Clock className="h-3 w-3 mr-1" /> Active
          </Badge>
        )
      case "funded":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Funded
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800">
            <Leaf className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )
      default:
        return (
          <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        )
    }
  }

  const fundingPercentage = Math.min(Math.round((project.fundingRaised / project.fundingGoal) * 100), 100)
  const tags = getTagsArray(project.tags)
  const imageUrl = project.image || "/placeholder.svg?height=200&width=400"

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md dark:border-slate-700">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl.startsWith("http") ? imageUrl : `/placeholder.svg?height=200&width=400`}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">{getStatusBadge(project.status)}</div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <CardDescription className="text-sm">
              {project.category} • {project.location}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-slate-50 dark:bg-slate-800">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Funding Progress</span>
              <span>{fundingPercentage}%</span>
            </div>
            <Progress value={fundingPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{project.fundingRaised} TND raised</span>
              <span>Goal: {project.fundingGoal} TND</span>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-500 mr-1" />
            <span>Reduces {project.wasteReduction} of food waste</span>
          </div>
        </div>
      </CardContent>
      <Separator className="dark:bg-slate-700" />
      <CardFooter className="flex justify-between pt-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{project.votes}</span>
          </Button>
        </div>
        <Button
          asChild
          size="sm"
          className="gap-1 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
        >
          <Link href={`/projects/${project.id}`}>
            View Details <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
