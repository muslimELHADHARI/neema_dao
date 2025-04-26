"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Award,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Leaf,
  Settings,
  ThumbsUp,
  User,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userType] = useState("project-inventor") // This would come from auth context in a real app
  type User = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
  };

// Get the user from localStorage
  const storedUser = localStorage.getItem('user');

  let user: User | null = null;

  if (storedUser) {
    user = JSON.parse(storedUser) as User;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-emerald-200">
              <AvatarImage src="/placeholder.svg?height=50&width=50" alt="User" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{user?.firstName +" " + user?.lastName }</h1>
                <Badge className="bg-emerald-100 text-emerald-800">Project Inventor</Badge>
              </div>
              <p className="text-muted-foreground">Member since January 2023</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Edit Profile</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">user?.points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-xs text-muted-foreground mt-1">+120 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Badges Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground mt-1">2 new badges</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">1 active, 2 completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Food Waste Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">850 kg</div>
              <p className="text-xs text-muted-foreground mt-1">+150 kg this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            <Tabs defaultValue="projects">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="projects">My Projects</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="votes">My Votes</TabsTrigger>
              </TabsList>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Bread to Croutons Initiative</CardTitle>
                      <Badge className="bg-amber-100 text-amber-800">
                        <Clock className="h-3 w-3 mr-1" /> Active
                      </Badge>
                    </div>
                    <CardDescription>Food Processing • Tunis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Funding Progress</span>
                          <span>72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1,800 TND raised</span>
                          <span>Goal: 2,500 TND</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <Leaf className="h-4 w-4 text-emerald-600 mr-1" />
                        <span>Reduces 500kg monthly of food waste</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>78 votes</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      Edit Project
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/projects/1">View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Fruit Juice Production from Surplus</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">
                        <CheckCircle className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    </div>
                    <CardDescription>Food Processing • Sousse</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Funding Progress</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>4,000 TND raised</span>
                          <span>Goal: 4,000 TND</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <Leaf className="h-4 w-4 text-emerald-600 mr-1" />
                        <span>Reduces 800kg monthly of food waste</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>98 votes</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/projects/5">View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <div className="flex justify-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Submit New Project</Button>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Activity Timeline */}
                      <div className="relative border-l border-muted pl-6 ml-2">
                        <div className="mb-10 relative">
                          <div className="absolute -left-[27px] bg-emerald-100 rounded-full p-1">
                            <Award className="h-4 w-4 text-emerald-600" />
                          </div>
                          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                            Today, 10:30 AM
                          </time>
                          <h3 className="text-base font-semibold">Earned "Eco Innovator" Badge</h3>
                          <p className="text-sm text-muted-foreground">
                            You received the Eco Innovator badge for your first funded project.
                          </p>
                        </div>

                        <div className="mb-10 relative">
                          <div className="absolute -left-[27px] bg-blue-100 rounded-full p-1">
                            <ThumbsUp className="h-4 w-4 text-blue-600" />
                          </div>
                          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                            Yesterday, 2:45 PM
                          </time>
                          <h3 className="text-base font-semibold">Voted on "AI-Powered Inventory Management"</h3>
                          <p className="text-sm text-muted-foreground">
                            You voted for the AI-Powered Inventory Management project and earned 5 points.
                          </p>
                        </div>

                        <div className="mb-10 relative">
                          <div className="absolute -left-[27px] bg-purple-100 rounded-full p-1">
                            <Users className="h-4 w-4 text-purple-600" />
                          </div>
                          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                            March 15, 2023
                          </time>
                          <h3 className="text-base font-semibold">Partnered with Hotel Jasmine</h3>
                          <p className="text-sm text-muted-foreground">
                            You established a partnership with Hotel Jasmine for your Bread to Croutons project and
                            earned 150 points.
                          </p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-[27px] bg-amber-100 rounded-full p-1">
                            <Calendar className="h-4 w-4 text-amber-600" />
                          </div>
                          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                            March 10, 2023
                          </time>
                          <h3 className="text-base font-semibold">Submitted "Bread to Croutons Initiative"</h3>
                          <p className="text-sm text-muted-foreground">
                            You submitted a new project and earned 100 points.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Votes Tab */}
              <TabsContent value="votes">
                <Card>
                  <CardHeader>
                    <CardTitle>Projects You've Voted On</CardTitle>
                    <CardDescription>Track the progress of projects you support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <ThumbsUp className="h-4 w-4 text-emerald-600" />
                          <div>
                            <p className="font-medium">AI-Powered Inventory Management</p>
                            <p className="text-sm text-muted-foreground">Technology • Tunis</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/projects/6">View</Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between py-3 border-t">
                        <div className="flex items-center gap-3">
                          <ThumbsUp className="h-4 w-4 text-emerald-600" />
                          <div>
                            <p className="font-medium">Vegetable Preservation Workshop</p>
                            <p className="text-sm text-muted-foreground">Education • Sfax</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/projects/3">View</Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between py-3 border-t">
                        <div className="flex items-center gap-3">
                          <ThumbsUp className="h-4 w-4 text-emerald-600" />
                          <div>
                            <p className="font-medium">Restaurant Food Donation App</p>
                            <p className="text-sm text-muted-foreground">Technology • Multiple Cities</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/projects/2">View</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Badges Card */}
            <Card>
              <CardHeader>
                <CardTitle>My Badges</CardTitle>
                <CardDescription>Achievements you've unlocked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                      <Award className="h-6 w-6 text-emerald-600" />
                    </div>
                    <span className="text-xs font-medium">Eco Innovator</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                      <Leaf className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium">Waste Reducer</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-xs font-medium">Green Leader</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                      <User className="h-6 w-6 text-amber-600" />
                    </div>
                    <span className="text-xs font-medium">Eco Warrior</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                      <ThumbsUp className="h-6 w-6 text-red-600" />
                    </div>
                    <span className="text-xs font-medium">Super Voter</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                      <BarChart3 className="h-6 w-6 text-slate-600" />
                    </div>
                    <span className="text-xs font-medium">Profit Maker</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Badges
                </Button>
              </CardFooter>
            </Card>

            {/* Points Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Points Breakdown</CardTitle>
                <CardDescription>How you've earned your points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Leaf className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-sm">Project Submissions</span>
                    </div>
                    <span className="font-medium">400 pts</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <ThumbsUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm">Voting Activity</span>
                    </div>
                    <span className="font-medium">125 pts</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm">Partnerships</span>
                    </div>
                    <span className="font-medium">300 pts</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm">Completed Projects</span>
                    </div>
                    <span className="font-medium">300 pts</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <Award className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-sm">Other Activities</span>
                    </div>
                    <span className="font-medium">125 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded bg-emerald-100 text-emerald-600 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold">APR</span>
                      <span className="text-sm font-bold">15</span>
                    </div>
                    <div>
                      <p className="font-medium">Food Waste Hackathon</p>
                      <p className="text-sm text-muted-foreground">Tunis Tech Hub, 9:00 AM</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded bg-blue-100 text-blue-600 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold">APR</span>
                      <span className="text-sm font-bold">22</span>
                    </div>
                    <div>
                      <p className="font-medium">Investor Pitch Day</p>
                      <p className="text-sm text-muted-foreground">Virtual Event, 2:00 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded bg-purple-100 text-purple-600 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold">MAY</span>
                      <span className="text-sm font-bold">05</span>
                    </div>
                    <div>
                      <p className="font-medium">Preservation Workshop</p>
                      <p className="text-sm text-muted-foreground">Sfax Culinary School, 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
