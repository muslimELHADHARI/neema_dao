import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, Filter, Clock, CheckCircle, AlertCircle, Leaf, ArrowUpRight, PlusCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock project data
const projects = [
  {
    id: 1,
    title: "Bread to Croutons Initiative",
    description: "Converting day-old bread from bakeries into packaged croutons for restaurants and retail.",
    category: "Food Processing",
    inventor: "Sarah Ben Ali",
    inventorType: "Student",
    fundingGoal: 2500,
    fundingRaised: 1800,
    votes: 78,
    status: "active",
    wasteReduction: "500kg monthly",
    location: "Tunis",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Bread", "Bakery", "Retail"],
  },
  {
    id: 2,
    title: "Restaurant Food Donation App",
    description: "Mobile application connecting restaurants with excess food to local charities for same-day pickup.",
    category: "Technology",
    inventor: "Tech4Good Tunisia",
    inventorType: "Startup",
    fundingGoal: 5000,
    fundingRaised: 5000,
    votes: 124,
    status: "funded",
    wasteReduction: "1200kg monthly",
    location: "Multiple Cities",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["App", "Restaurants", "Charity"],
  },
  {
    id: 3,
    title: "Vegetable Preservation Workshop",
    description: "Training program teaching traditional preservation techniques for seasonal vegetables.",
    category: "Education",
    inventor: "Chef Mehdi Trabelsi",
    inventorType: "Restaurant",
    fundingGoal: 1200,
    fundingRaised: 300,
    votes: 42,
    status: "active",
    wasteReduction: "300kg monthly",
    location: "Sfax",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Vegetables", "Education", "Preservation"],
  },
  {
    id: 4,
    title: "Compost System for Hotels",
    description: "Implementing efficient composting systems for large hotels to process food waste on-site.",
    category: "Infrastructure",
    inventor: "EcoSolutions Tunisia",
    inventorType: "Startup",
    fundingGoal: 7500,
    fundingRaised: 2200,
    votes: 67,
    status: "active",
    wasteReduction: "2000kg monthly",
    location: "Hammamet",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Compost", "Hotels", "Waste Management"],
  },
  {
    id: 5,
    title: "Fruit Juice Production from Surplus",
    description: "Converting surplus and imperfect fruits into bottled juices for local markets.",
    category: "Food Processing",
    inventor: "Fruity Startup",
    inventorType: "Startup",
    fundingGoal: 4000,
    fundingRaised: 4000,
    votes: 98,
    status: "completed",
    wasteReduction: "800kg monthly",
    location: "Sousse",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Fruit", "Juice", "Market"],
  },
  {
    id: 6,
    title: "AI-Powered Inventory Management",
    description: "Smart system using AI to predict food usage and minimize waste in restaurant kitchens.",
    category: "Technology",
    inventor: "DataTech Tunisia",
    inventorType: "Startup",
    fundingGoal: 8000,
    fundingRaised: 3500,
    votes: 85,
    status: "active",
    wasteReduction: "1500kg monthly",
    location: "Tunis",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["AI", "Restaurants", "Inventory"],
  },
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Projects</h1>
            <p className="text-muted-foreground">Discover and support food waste reduction initiatives in Tunisia</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Submit Project
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-slate-50 p-4 rounded-lg mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-slate-500" />
            <h2 className="font-medium">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input placeholder="Search projects..." />
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="food-processing">Food Processing</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="tunis">Tunis</SelectItem>
                  <SelectItem value="sfax">Sfax</SelectItem>
                  <SelectItem value="sousse">Sousse</SelectItem>
                  <SelectItem value="hammamet">Hammamet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="funded">Funded</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Project Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="funded">Funded</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.status === "active")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="funded" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.status === "funded")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.status === "completed")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-emerald-50">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Active
          </Badge>
        )
      case "funded":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Funded
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Leaf className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )
      default:
        return (
          <Badge className="bg-slate-100 text-slate-800">
            <AlertCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        )
    }
  }

  const fundingPercentage = Math.min(Math.round((project.fundingRaised / project.fundingGoal) * 100), 100)

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
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
          {project.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-slate-50">
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
            <Leaf className="h-4 w-4 text-emerald-600 mr-1" />
            <span>Reduces {project.wasteReduction} of food waste</span>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between pt-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{project.votes}</span>
          </Button>
        </div>
        <Button asChild size="sm" className="gap-1">
          <Link href={`/projects/${project.id}`}>
            View Details <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
