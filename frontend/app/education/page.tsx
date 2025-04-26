import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Download, ExternalLink, FileText, Leaf, Play, Search, ThumbsUp, Video } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EducationPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:text-emerald-900">
            SDG 12.3
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Education Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about food waste reduction, sustainable practices, and how you can make a difference in Tunisia
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search for resources, guides, and more..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Understanding SDG 12.3</h2>
                <p className="text-muted-foreground mb-4">
                  Sustainable Development Goal 12.3 aims to halve per capita global food waste at the retail and
                  consumer levels and reduce food losses along production and supply chains, including post-harvest
                  losses, by 2030.
                </p>
                <p className="text-muted-foreground mb-4">
                  In Tunisia, approximately 33% of all food produced is wasted annually, including around 900,000 tons
                  of bread. This waste has significant economic, environmental, and social impacts.
                </p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="#learn-more">Learn More About SDG 12.3</Link>
                </Button>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Food waste reduction"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle>Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Food waste contributes to greenhouse gas emissions, water waste, and land degradation. When food
                    decomposes in landfills, it produces methane, a potent greenhouse gas.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="#environmental-impact">Read More</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <ThumbsUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Economic Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reducing food waste can save money for households, businesses, and the economy as a whole. It also
                    creates opportunities for new businesses and jobs in food recovery and redistribution.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="#economic-benefits">Read More</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Social Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Food waste reduction can help address food insecurity and hunger. By redistributing surplus food, we
                    can ensure that more people have access to nutritious meals.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="#social-impact">Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Food Waste in Tunisia: Key Statistics</CardTitle>
                <CardDescription>Understanding the scale of the problem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-slate-50 rounded-lg">
                    <p className="text-4xl font-bold text-emerald-600 mb-2">33%</p>
                    <p className="text-muted-foreground">of all food produced in Tunisia is wasted annually</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-lg">
                    <p className="text-4xl font-bold text-emerald-600 mb-2">900k</p>
                    <p className="text-muted-foreground">tons of bread wasted each year</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-lg">
                    <p className="text-4xl font-bold text-emerald-600 mb-2">$350M</p>
                    <p className="text-muted-foreground">economic impact of food waste</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>For Restaurants & Hotels</CardTitle>
                  <CardDescription>Practical guides to reduce food waste in your establishment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Inventory Management Best Practices
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Learn how to optimize your inventory to reduce waste and save costs.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Staff Training for Waste Reduction
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Effective strategies to train your staff on food waste prevention.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Menu Planning to Minimize Waste
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Design menus that reduce waste while maintaining quality and variety.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Setting Up Donation Programs
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          How to safely donate surplus food to those in need.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Link href="#">View All Restaurant Guides</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>For Project Inventors</CardTitle>
                  <CardDescription>Resources to help you develop food waste reduction solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Business Model Canvas for Food Waste Startups
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Template and guide for creating a sustainable business model.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Funding Opportunities for Food Waste Projects
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Overview of grants, investments, and other funding sources.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Regulatory Compliance for Food Businesses
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Understanding the legal requirements for food handling and processing.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Marketing Your Food Waste Solution
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Strategies to effectively communicate your value proposition.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Link href="#">View All Inventor Guides</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>For Students</CardTitle>
                  <CardDescription>Educational materials and project ideas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Food Waste Research Project Ideas
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Topics and methodologies for academic research on food waste.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Campus Food Waste Audit Guide
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          How to conduct a food waste audit at your school or university.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Starting a Food Recovery Club
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Step-by-step guide to creating a student organization focused on food waste.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Link href="#">View All Student Guides</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>For Investors</CardTitle>
                  <CardDescription>Information on food waste investment opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Food Waste Investment Landscape
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Overview of the market and opportunities in food waste reduction.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Due Diligence Checklist for Food Waste Startups
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Key factors to evaluate when considering an investment.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Impact Measurement Framework
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          How to assess and report on the environmental and social impact of investments.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Link href="#">View All Investor Guides</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Studies</CardTitle>
                  <CardDescription>Research on food waste in Tunisia and globally</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Tunisia Food Waste Report 2023
                        </Link>
                        <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          FAO Global Food Loss and Waste Report
                        </Link>
                        <p className="text-xs text-muted-foreground">PDF • 3.8 MB</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Economic Impact of Food Waste in North Africa
                        </Link>
                        <p className="text-xs text-muted-foreground">PDF • 1.7 MB</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="#">View All Reports</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Toolkits & Templates</CardTitle>
                  <CardDescription>Practical tools for food waste reduction</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Download className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Food Waste Audit Spreadsheet
                        </Link>
                        <p className="text-xs text-muted-foreground">Excel • 245 KB</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Download className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Restaurant Waste Tracking Template
                        </Link>
                        <p className="text-xs text-muted-foreground">PDF • 320 KB</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Download className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Food Donation Safety Checklist
                        </Link>
                        <p className="text-xs text-muted-foreground">PDF • 180 KB</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="#">View All Toolkits</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Studies</CardTitle>
                  <CardDescription>Success stories in food waste reduction</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Hotel Jasmine: 50% Waste Reduction
                        </Link>
                        <p className="text-xs text-muted-foreground">Case Study • 5 min read</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          Bread Rescue Initiative in Tunis
                        </Link>
                        <p className="text-xs text-muted-foreground">Case Study • 4 min read</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link href="#" className="font-medium hover:underline">
                          University Cafeteria Transformation
                        </Link>
                        <p className="text-xs text-muted-foreground">Case Study • 6 min read</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="#">View All Case Studies</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>External Resources</CardTitle>
                <CardDescription>Valuable resources from partner organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <ExternalLink className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <Link
                        href="https://www.fao.org/food-loss-and-food-waste/en/"
                        className="font-medium hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        FAO Food Loss and Waste
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive resources from the Food and Agriculture Organization of the United Nations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ExternalLink className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <Link
                        href="https://champions123.org/"
                        className="font-medium hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Champions 12.3
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Coalition of executives dedicated to accelerating progress toward SDG 12.3.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ExternalLink className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <Link
                        href="https://www.wrap.org.uk/"
                        className="font-medium hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WRAP
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        UK charity working with governments, businesses, and communities to deliver practical solutions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ExternalLink className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <Link
                        href="https://www.refed.org/"
                        className="font-medium hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ReFED
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        U.S. nonprofit working to reduce food waste through data-driven solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full bg-slate-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-emerald-600" />
                  </div>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Understanding Food Waste in Tunisia</CardTitle>
                  <CardDescription>Overview of the challenges and opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Video className="h-4 w-4 mr-1" />
                    <span>15:24 • 2,450 views</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Watch Video
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full bg-slate-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-emerald-600" />
                  </div>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Restaurant Food Waste Reduction Tips</CardTitle>
                  <CardDescription>Practical strategies for food service businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Video className="h-4 w-4 mr-1" />
                    <span>12:08 • 1,820 views</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Watch Video
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full bg-slate-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-emerald-600" />
                  </div>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Food Preservation Techniques</CardTitle>
                  <CardDescription>Traditional and modern methods to extend food life</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Video className="h-4 w-4 mr-1" />
                    <span>18:35 • 3,120 views</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Watch Video
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full bg-slate-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-emerald-600" />
                  </div>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Success Stories: Bread to Croutons Initiative</CardTitle>
                  <CardDescription>Case study of a successful food waste project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Video className="h-4 w-4 mr-1" />
                    <span>10:42 • 1,560 views</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Watch Video
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full bg-slate-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-emerald-600" />
                  </div>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">How to Conduct a Food Waste Audit</CardTitle>
                  <CardDescription>Step-by-step guide for businesses and schools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Video className="h-4 w-4 mr-1" />
                    <span>14:18 • 2,210 views</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Watch Video
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full bg-slate-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-emerald-600" />
                  </div>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Composting for Beginners</CardTitle>
                  <CardDescription>How to start composting food waste at home or business</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Video className="h-4 w-4 mr-1" />
                    <span>20:05 • 4,380 views</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Watch Video
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="#">View All Videos</Link>
              </Button>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about food waste and our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is SDG 12.3?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        SDG 12.3 is a target under the United Nations Sustainable Development Goal 12 (Responsible
                        Consumption and Production). It aims to halve per capita global food waste at the retail and
                        consumer levels and reduce food losses along production and supply chains, including
                        post-harvest losses, by 2030.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How serious is food waste in Tunisia?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        In Tunisia, approximately 33% of all food produced is wasted annually. This includes around
                        900,000 tons of bread waste each year. The economic impact of this waste is estimated at $350
                        million annually. Food waste also contributes to environmental problems such as greenhouse gas
                        emissions and water waste.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How can restaurants reduce food waste?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        Restaurants can reduce food waste through several strategies:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Conducting regular food waste audits</li>
                        <li>Optimizing inventory management and ordering</li>
                        <li>Training staff on proper food handling and storage</li>
                        <li>Implementing creative menu planning that uses ingredients across multiple dishes</li>
                        <li>Offering different portion sizes</li>
                        <li>Donating surplus food to charities</li>
                        <li>Composting unavoidable food waste</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What types of projects does Neema DAO support?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        Neema DAO supports a wide range of food waste reduction projects, including:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Food processing initiatives that transform surplus or imperfect food into new products</li>
                        <li>Technology solutions for better inventory management or food donation coordination</li>
                        <li>Educational programs that raise awareness about food waste</li>
                        <li>Infrastructure projects such as composting systems or cold storage facilities</li>
                        <li>Food recovery and redistribution programs</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How can I get funding for my food waste project?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">To get funding through Neema DAO:</p>
                      <ol className="list-decimal pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Register as a Project Inventor on our platform</li>
                        <li>
                          Submit your project proposal with details about your idea, funding needs, and expected impact
                        </li>
                        <li>
                          Gather votes from the community (projects need at least 50 votes to be eligible for funding)
                        </li>
                        <li>Once eligible, your project will be visible to investors on the platform</li>
                        <li>If fully funded, you'll receive the funds and can begin implementation</li>
                      </ol>
                      <p className="mt-2 text-muted-foreground">
                        We also provide resources on other funding opportunities outside our platform, including grants
                        and competitions.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>How does the points system work?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        Our points system rewards users for actions that contribute to food waste reduction. Different
                        actions earn different point values:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Joining the DAO: +50 points</li>
                        <li>Voting on a project: +5 points per vote</li>
                        <li>Submitting a project: +20 points</li>
                        <li>Reporting food waste rescue (with proof): +30 points</li>
                        <li>Bringing a sponsor: +50 points</li>
                      </ul>
                      <p className="mt-2 text-muted-foreground">
                        Different user types (Students, Project Inventors, Restaurants/Hotels, Investors) also have
                        specific actions that earn additional points. Points can unlock badges and benefits such as
                        partner discounts and recognition on the platform.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>How can I verify my restaurant or hotel on the platform?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">To verify your restaurant or hotel:</p>
                      <ol className="list-decimal pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Register as a Restaurant/Hotel user type</li>
                        <li>Provide your business details including name, location, and business type</li>
                        <li>Upload your business license or registration document</li>
                        <li>Our team will review your documentation within 2-3 business days</li>
                        <li>
                          Once verified, you'll receive a verification badge on your profile and access to all
                          restaurant/hotel features
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <Card className="bg-emerald-50 border-none">
          <CardHeader>
            <CardTitle className="text-center">Stay Updated</CardTitle>
            <CardDescription className="text-center">
              Subscribe to our newsletter for the latest resources, events, and success stories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
