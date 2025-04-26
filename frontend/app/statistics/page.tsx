"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, Filter, Leaf, MapPin, PieChart, TrendingUp } from "lucide-react"

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("all")

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Statistics</h1>
            <p className="text-muted-foreground">Track our collective impact on food waste reduction in Tunisia</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Export Data
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-50 p-4 rounded-lg mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-slate-500" />
            <h2 className="font-medium">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="year">Past Year</SelectItem>
                  <SelectItem value="6months">Past 6 Months</SelectItem>
                  <SelectItem value="3months">Past 3 Months</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="tunis">Tunis</SelectItem>
                  <SelectItem value="sfax">Sfax</SelectItem>
                  <SelectItem value="sousse">Sousse</SelectItem>
                  <SelectItem value="other">Other Regions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Project Category" />
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
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Food Waste Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,280 kg</div>
              <p className="text-xs text-emerald-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-emerald-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +4 new this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">452</div>
              <p className="text-xs text-emerald-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +28 this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,750 TND</div>
              <p className="text-xs text-emerald-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +3,200 TND this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Data */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="waste">Waste Reduction</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Food Waste Reduction Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-emerald-600" />
                    Food Waste Reduction Over Time
                  </CardTitle>
                  <CardDescription>Monthly food waste saved in kilograms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center p-4">
                      <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Chart visualization would appear here in a real application
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Showing increasing trend of food waste reduction over time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-emerald-600" />
                    Project Categories
                  </CardTitle>
                  <CardDescription>Distribution of projects by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center p-4">
                      <PieChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Chart visualization would appear here in a real application
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Showing distribution of projects across different categories
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Regional Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  Regional Impact
                </CardTitle>
                <CardDescription>Food waste reduction by region in Tunisia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center p-4">
                    <MapPin className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Map visualization would appear here in a real application
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Showing food waste reduction impact across different regions of Tunisia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Waste Reduction Tab */}
          <TabsContent value="waste" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Food Waste Reduction by Category</CardTitle>
                <CardDescription>Breakdown of waste reduction by food type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Bread & Bakery</span>
                      <span className="text-sm font-medium">2,100 kg</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">40% of total waste reduction</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Fruits & Vegetables</span>
                      <span className="text-sm font-medium">1,850 kg</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">35% of total waste reduction</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Prepared Foods</span>
                      <span className="text-sm font-medium">800 kg</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">15% of total waste reduction</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Dairy Products</span>
                      <span className="text-sm font-medium">530 kg</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">10% of total waste reduction</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Waste Reduction</CardTitle>
                  <CardDescription>Progress over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center p-4">
                      <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Chart visualization would appear here in a real application
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Equivalent environmental benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CO₂ Emissions Saved</p>
                        <p className="text-xl font-bold">2.1 tons</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Water Saved</p>
                        <p className="text-xl font-bold">1.8 million liters</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Land Use Reduced</p>
                        <p className="text-xl font-bold">0.8 hectares</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                  <CardDescription>Distribution of projects by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center p-4">
                      <PieChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Chart visualization would appear here in a real application
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-amber-600">14</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-emerald-600">6</p>
                      <p className="text-xs text-muted-foreground">Funded</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-blue-600">4</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Funding Progress</CardTitle>
                  <CardDescription>Total funding by project category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center p-4">
                      <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Chart visualization would appear here in a real application
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-xl font-bold">6,200 TND</p>
                      <p className="text-xs text-muted-foreground">Food Processing</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-xl font-bold">5,100 TND</p>
                      <p className="text-xs text-muted-foreground">Technology</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-xl font-bold">2,800 TND</p>
                      <p className="text-xs text-muted-foreground">Education</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-xl font-bold">1,650 TND</p>
                      <p className="text-xs text-muted-foreground">Infrastructure</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Projects</CardTitle>
                <CardDescription>Projects with highest waste reduction impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Restaurant Food Donation App</p>
                        <p className="text-xs text-muted-foreground">Technology • Multiple Cities</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">1,200 kg</p>
                      <p className="text-xs text-muted-foreground">monthly reduction</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Compost System for Hotels</p>
                        <p className="text-xs text-muted-foreground">Infrastructure • Hammamet</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">800 kg</p>
                      <p className="text-xs text-muted-foreground">monthly reduction</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Fruit Juice Production from Surplus</p>
                        <p className="text-xs text-muted-foreground">Food Processing • Sousse</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">800 kg</p>
                      <p className="text-xs text-muted-foreground">monthly reduction</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Bread to Croutons Initiative</p>
                        <p className="text-xs text-muted-foreground">Food Processing • Tunis</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">500 kg</p>
                      <p className="text-xs text-muted-foreground">monthly reduction</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Member Distribution</CardTitle>
                  <CardDescription>Breakdown by user type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center p-4">
                      <PieChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Chart visualization would appear here in a real application
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-blue-600">215</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-purple-600">98</p>
                      <p className="text-xs text-muted-foreground">Project Inventors</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-amber-600">85</p>
                      <p className="text-xs text-muted-foreground">Restaurants/Hotels</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-red-600">54</p>
                      <p className="text-xs text-muted-foreground">Investors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Member Growth</CardTitle>
                  <CardDescription>New members over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center p-4">
                      <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Chart visualization would appear here in a real application
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-emerald-600">+28</p>
                      <p className="text-xs text-muted-foreground">This Month</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-emerald-600">+120</p>
                      <p className="text-xs text-muted-foreground">This Quarter</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-md">
                      <p className="text-2xl font-bold text-emerald-600">+350</p>
                      <p className="text-xs text-muted-foreground">This Year</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>Members with highest impact and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Sarah Ben Ali</p>
                        <p className="text-xs text-muted-foreground">Project Inventor • 1,250 points</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">7 badges</p>
                      <p className="text-xs text-muted-foreground">2 projects</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Chef Mehdi Trabelsi</p>
                        <p className="text-xs text-muted-foreground">Restaurant • 1,120 points</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">6 badges</p>
                      <p className="text-xs text-muted-foreground">3 partnerships</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Mohamed Karim</p>
                        <p className="text-xs text-muted-foreground">Student • 980 points</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">5 badges</p>
                      <p className="text-xs text-muted-foreground">10 project votes</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-600">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Leila Mansour</p>
                        <p className="text-xs text-muted-foreground">Investor • 850 points</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">4 badges</p>
                      <p className="text-xs text-muted-foreground">5 funded projects</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
