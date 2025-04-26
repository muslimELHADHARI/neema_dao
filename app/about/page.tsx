import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Award, BarChart3, Leaf, Recycle, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:text-emerald-900">
            SDG 12.3
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About Neema DAO</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A decentralized platform to reduce food waste in Tunisia through innovation, collaboration, and sustainable
            practices.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-emerald-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Neema DAO aims to create a sustainable ecosystem that connects students, project inventors,
                restaurants/hotels, and investors to collaboratively reduce food waste in Tunisia, contributing to SDG
                12.3 goals while creating economic opportunities.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-emerald-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the leading platform for food waste reduction in Tunisia, transforming challenges into
                opportunities through decentralized governance, innovative projects, and community engagement.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  Community Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A democratic system where all stakeholders can submit, vote on, and fund projects that reduce food
                  waste.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-600" />
                  Gamification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Points and badges systems that reward users for positive actions, driving engagement and sustainable
                  behaviors.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  Impact Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Transparent metrics showing food waste saved, projects funded, and community growth across Tunisia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Implementation Phases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Implementation Plan</h2>
          <Tabs defaultValue="phase1" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phase1">Phase 1: MVP</TabsTrigger>
              <TabsTrigger value="phase2">Phase 2: Expansion</TabsTrigger>
            </TabsList>
            <TabsContent value="phase1" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Minimum Viable Product (3-6 months)</CardTitle>
                  <CardDescription>Building the core platform functionality</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>User registration and profiles for all stakeholders</li>
                    <li>Project submission and voting system</li>
                    <li>Basic funding mechanism (fiat and mock tokens)</li>
                    <li>Points and badges systems for engagement</li>
                    <li>Food waste data tracker with manual reporting</li>
                    <li>Education center with SDG 12.3 resources</li>
                    <li>Open statistics page for transparency</li>
                    <li>Basic partnership module for restaurants/hotels</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="phase2" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gamification and Data Enhancement (6-12 months)</CardTitle>
                  <CardDescription>Expanding engagement and improving data collection</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Expanded points system with more actions</li>
                    <li>Advanced badges with tiers and special rewards</li>
                    <li>Automated food waste data tracking via API integration</li>
                    <li>Dynamic eco-news feed for community updates</li>
                    <li>Enhanced partnership module with real-time discounts</li>
                    <li>Mock token economy for testing blockchain integration</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Food Waste Statistics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Food Waste in Tunisia</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg bg-emerald-50">
              <p className="text-4xl font-bold text-emerald-700 mb-2">33%</p>
              <p className="text-muted-foreground">of all food produced is wasted annually</p>
            </div>
            <div className="p-6 rounded-lg bg-emerald-50">
              <p className="text-4xl font-bold text-emerald-700 mb-2">900k</p>
              <p className="text-muted-foreground">tons of bread wasted each year</p>
            </div>
            <div className="p-6 rounded-lg bg-emerald-50">
              <p className="text-4xl font-bold text-emerald-700 mb-2">$350M</p>
              <p className="text-muted-foreground">economic impact of food waste</p>
            </div>
          </div>
        </div>

        {/* Get Involved */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join Neema DAO today and be part of the solution to reduce food waste in Tunisia. Whether you're a student,
            entrepreneur, restaurant owner, or investor, there's a place for you in our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/register">
                Join the DAO <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
