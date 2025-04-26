import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Heart,
  Leaf,
  MapPin,
  MessageSquare,
  Share2,
  ThumbsUp,
  Users,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// This would come from a database in a real app
const project = {
  id: 1,
  title: "Bread to Croutons Initiative",
  description:
    "Converting day-old bread from bakeries into packaged croutons for restaurants and retail. This project aims to reduce bread waste, which is one of the most commonly wasted food items in Tunisia, by creating a sustainable business model that transforms waste into a valuable product.",
  longDescription:
    "In Tunisia, approximately 900,000 tons of bread are wasted annually. Our initiative collects day-old bread from local bakeries that would otherwise be thrown away and transforms it into seasoned croutons that can be sold to restaurants, hotels, and retail stores. The process involves cutting the bread into cubes, seasoning them with locally sourced herbs and spices, baking them until crisp, and packaging them for distribution. This not only reduces food waste but also creates jobs and provides bakeries with a small additional revenue stream for bread they would otherwise discard. The croutons have a much longer shelf life than fresh bread and can be used in salads, soups, and as garnishes.",
  category: "Food Processing",
  inventor: {
    name: "Sarah Ben Ali",
    type: "Student",
    university: "University of Tunis",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  fundingGoal: 2500,
  fundingRaised: 1800,
  backers: 24,
  votes: 78,
  status: "active",
  wasteReduction: "500kg monthly",
  location: "Tunis",
  image: "/placeholder.svg?height=400&width=800",
  gallery: [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ],
  tags: ["Bread", "Bakery", "Retail"],
  timeline: [
    {
      date: "April 2023",
      title: "Project Launch",
      description: "Initial setup and partnership with 3 local bakeries",
    },
    {
      date: "May 2023",
      title: "Production Setup",
      description: "Purchase equipment and set up production facility",
    },
    {
      date: "June 2023",
      title: "First Production Run",
      description: "Begin producing croutons and establish initial distribution channels",
    },
    {
      date: "August 2023",
      title: "Expansion",
      description: "Expand to 10 bakeries and add new flavor varieties",
    },
  ],
  team: [
    {
      name: "Sarah Ben Ali",
      role: "Founder",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Ahmed Trabelsi",
      role: "Production Manager",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Leila Mansour",
      role: "Marketing",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ],
  updates: [
    {
      date: "March 15, 2023",
      title: "Partnership with Hotel Jasmine",
      content:
        "We're excited to announce our new partnership with Hotel Jasmine, who will be using our croutons in their restaurant salads and soups. This partnership will help us save an additional 50kg of bread waste monthly.",
    },
    {
      date: "March 1, 2023",
      title: "Production Equipment Secured",
      content:
        "We've secured the necessary equipment for our production facility at a 15% discount, allowing us to allocate more funds to marketing and distribution.",
    },
  ],
  comments: [
    {
      user: {
        name: "Mohamed Karim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "March 20, 2023",
      content: "This is a great initiative! I've seen how much bread is wasted in my neighborhood bakery.",
    },
    {
      user: {
        name: "Fatima Zouari",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "March 18, 2023",
      content:
        "As a restaurant owner, I'm interested in your product. Will you be offering different flavors or just the traditional croutons?",
    },
  ],
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the project data based on the ID
  // const { id } = params;

  const fundingPercentage = Math.min(Math.round((project.fundingRaised / project.fundingGoal) * 100), 100)

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
                <Badge className="bg-emerald-100 text-emerald-800">
                  <Clock className="h-3 w-3 mr-1" /> Active
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
              <Button className="bg-emerald-600 hover:bg-emerald-700" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" /> Vote
              </Button>
            </div>
          </div>

          {/* Project Image */}
          <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
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

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {project.gallery.map((image, index) => (
                        <div key={index} className="relative h-[150px] rounded-md overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Project gallery ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-slate-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">Food Waste Reduction</p>
                        <p className="text-2xl font-bold text-emerald-600">{project.wasteReduction}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      This project helps reduce food waste by repurposing day-old bread that would otherwise be thrown
                      away. By converting this waste into a valuable product, we're creating a sustainable solution that
                      benefits the environment and creates economic opportunities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l border-muted pl-6 ml-2 space-y-8">
                      {project.timeline.map((item, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-[27px] bg-emerald-100 rounded-full p-1">
                            <Calendar className="h-4 w-4 text-emerald-600" />
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
              </TabsContent>

              {/* Updates Tab */}
              <TabsContent value="updates">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Updates</CardTitle>
                    <CardDescription>Latest news and progress on the project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {project.updates.map((update, index) => (
                        <div key={index} className="pb-6 border-b last:border-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-800">
                              Update
                            </Badge>
                            <span className="text-sm text-muted-foreground">{update.date}</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                          <p className="text-muted-foreground">{update.content}</p>
                        </div>
                      ))}
                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {project.team.map((member, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                          <Avatar className="h-20 w-20 mb-4">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      ))}
                    </div>
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
                    <div className="space-y-6">
                      {project.comments.map((comment, index) => (
                        <div key={index} className="flex gap-4 pb-6 border-b last:border-0">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                            <AvatarFallback>{comment.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{comment.user.name}</span>
                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <textarea
                        className="w-full p-3 border rounded-md"
                        rows={3}
                        placeholder="Add your comment..."
                      ></textarea>
                      <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                        <MessageSquare className="h-4 w-4 mr-2" /> Post Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Funding and Inventor */}
          <div className="space-y-6">
            {/* Funding Card */}
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

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm">Backers</span>
                  <span className="font-medium">{project.backers}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm">Votes</span>
                  <span className="font-medium">{project.votes}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Days Left</span>
                  <span className="font-medium">18</span>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Wallet className="h-4 w-4 mr-2" /> Fund This Project
                </Button>
              </CardContent>
            </Card>

            {/* Inventor Card */}
            <Card>
              <CardHeader>
                <CardTitle>Project Inventor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={project.inventor.avatar || "/placeholder.svg"} alt={project.inventor.name} />
                    <AvatarFallback>{project.inventor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{project.inventor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{project.inventor.type}</p>
                  <p className="text-sm text-muted-foreground">{project.inventor.university}</p>

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
                        alt="Fruit Juice Production"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Fruit Juice Production from Surplus</p>
                      <p className="text-xs text-muted-foreground">Food Processing • Sousse</p>
                      <div className="flex items-center text-xs mt-1">
                        <Leaf className="h-3 w-3 text-emerald-600 mr-1" />
                        <span>800kg monthly</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Vegetable Preservation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Vegetable Preservation Workshop</p>
                      <p className="text-xs text-muted-foreground">Education • Sfax</p>
                      <div className="flex items-center text-xs mt-1">
                        <Leaf className="h-3 w-3 text-emerald-600 mr-1" />
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
    </div>
  )
}
