"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  Filter,
  LineChart,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  TrendingDown,
  TrendingUp,
  Upload,
  Utensils,
  Warehouse,
  Leaf,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Sample inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 15,
    unit: "kg",
    expiryDate: "2023-05-10",
    status: "good",
    wastePotential: "low",
    location: "Main Kitchen",
    lastUpdated: "2023-05-02",
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Meat",
    quantity: 8,
    unit: "kg",
    expiryDate: "2023-05-06",
    status: "warning",
    wastePotential: "medium",
    location: "Cold Storage",
    lastUpdated: "2023-05-02",
  },
  {
    id: 3,
    name: "Milk",
    category: "Dairy",
    quantity: 12,
    unit: "L",
    expiryDate: "2023-05-05",
    status: "critical",
    wastePotential: "high",
    location: "Refrigerator 2",
    lastUpdated: "2023-05-02",
  },
  {
    id: 4,
    name: "Bread",
    category: "Bakery",
    quantity: 20,
    unit: "loaves",
    expiryDate: "2023-05-04",
    status: "critical",
    wastePotential: "high",
    location: "Pantry",
    lastUpdated: "2023-05-02",
  },
  {
    id: 5,
    name: "Lettuce",
    category: "Vegetables",
    quantity: 6,
    unit: "kg",
    expiryDate: "2023-05-05",
    status: "warning",
    wastePotential: "medium",
    location: "Main Kitchen",
    lastUpdated: "2023-05-02",
  },
  {
    id: 6,
    name: "Eggs",
    category: "Dairy",
    quantity: 60,
    unit: "units",
    expiryDate: "2023-05-15",
    status: "good",
    wastePotential: "low",
    location: "Refrigerator 1",
    lastUpdated: "2023-05-02",
  },
  {
    id: 7,
    name: "Potatoes",
    category: "Vegetables",
    quantity: 25,
    unit: "kg",
    expiryDate: "2023-05-20",
    status: "good",
    wastePotential: "low",
    location: "Dry Storage",
    lastUpdated: "2023-05-02",
  },
  {
    id: 8,
    name: "Yogurt",
    category: "Dairy",
    quantity: 15,
    unit: "kg",
    expiryDate: "2023-05-08",
    status: "warning",
    wastePotential: "medium",
    location: "Refrigerator 2",
    lastUpdated: "2023-05-02",
  },
]

// Sample waste log data
const wasteLogData = [
  {
    id: 1,
    item: "Bread",
    quantity: 5,
    unit: "loaves",
    reason: "Expired",
    date: "2023-05-01",
    cost: 7.5,
    reportedBy: "Chef Ahmed",
  },
  {
    id: 2,
    item: "Tomatoes",
    quantity: 2,
    unit: "kg",
    reason: "Spoiled",
    date: "2023-05-01",
    cost: 6.0,
    reportedBy: "Sous Chef Leila",
  },
  {
    id: 3,
    item: "Chicken Breast",
    quantity: 1.5,
    unit: "kg",
    reason: "Overproduction",
    date: "2023-04-30",
    cost: 18.0,
    reportedBy: "Chef Ahmed",
  },
  {
    id: 4,
    item: "Lettuce",
    quantity: 1,
    unit: "kg",
    reason: "Spoiled",
    date: "2023-04-29",
    cost: 4.0,
    reportedBy: "Kitchen Staff Mehdi",
  },
  {
    id: 5,
    item: "Milk",
    quantity: 2,
    unit: "L",
    reason: "Expired",
    date: "2023-04-28",
    cost: 3.6,
    reportedBy: "Sous Chef Leila",
  },
]

// Sample suggestions data
const suggestionData = [
  {
    id: 1,
    title: "Use expiring bread for croutons",
    description: "5 loaves of bread will expire in 2 days. Consider making croutons or bread pudding.",
    impact: "Potential savings: 7.5 TND",
    type: "recipe",
  },
  {
    id: 2,
    title: "Adjust milk order quantity",
    description: "Milk consistently expires before use. Consider reducing your next order by 20%.",
    impact: "Potential monthly savings: 28.8 TND",
    type: "order",
  },
  {
    id: 3,
    title: "Special promotion for chicken dishes",
    description: "8kg of chicken breast will expire in 4 days. Consider running a special promotion.",
    impact: "Potential savings: 96 TND",
    type: "promotion",
  },
]

export default function SmartInventoryPage() {
  const [inventory, setInventory] = useState(inventoryItems)
  const [wasteLog, setWasteLog] = useState(wasteLogData)
  const [suggestions, setSuggestions] = useState(suggestionData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const refreshData = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Filter inventory based on search and filters
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Calculate waste metrics
  const totalWasteCost = wasteLog.reduce((sum, item) => sum + item.cost, 0)
  const mostWastedItem = wasteLog.reduce((prev, current) => {
    const prevCount = wasteLog.filter((item) => item.item === prev).length
    const currentCount = wasteLog.filter((item) => item.item === current.item).length
    return prevCount > currentCount ? prev : current.item
  }, wasteLog[0]?.item || "None")

  // Calculate inventory metrics
  const expiringItems = inventory.filter((item) => item.status === "critical").length
  const totalItems = inventory.length
  const inventoryValue = inventory.reduce((sum, item) => sum + item.quantity * ((item.id % 5) + 1), 0) // Mock calculation

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Smart Inventory Management</h1>
            <p className="text-muted-foreground">Monitor your inventory, reduce waste, and optimize ordering</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
              {isRefreshing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh Data
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <div className="flex items-center text-xs text-emerald-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+3 since last week</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expiringItems}</div>
              <div className="flex items-center text-xs text-red-600 mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Requires immediate attention</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Waste This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWasteCost.toFixed(1)} TND</div>
              <div className="flex items-center text-xs text-emerald-600 mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>-12% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryValue.toFixed(1)} TND</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last updated: Today, 10:30 AM</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="waste-log">Waste Log</TabsTrigger>
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4 mt-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                        <SelectItem value="Meat">Meat</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                        <SelectItem value="Bakery">Bakery</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Table */}
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInventory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell>{item.expiryDate}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                item.status === "good"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : item.status === "warning"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {item.status === "good" ? "Good" : item.status === "warning" ? "Warning" : "Critical"}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Item</DropdownMenuItem>
                                <DropdownMenuItem>Update Quantity</DropdownMenuItem>
                                <DropdownMenuItem>Move Location</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Report as Waste</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between py-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredInventory.length} of {inventory.length} items
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Waste Log Tab */}
          <TabsContent value="waste-log" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Food Waste Log</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Log Waste
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Log Food Waste</DialogTitle>
                    <DialogDescription>Record food waste to track and analyze patterns</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="waste-item" className="text-right">
                        Item
                      </Label>
                      <Select defaultValue="select">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="select">Select item</SelectItem>
                          {inventory.map((item) => (
                            <SelectItem key={item.id} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="waste-quantity" className="text-right">
                        Quantity
                      </Label>
                      <div className="col-span-3 flex gap-2">
                        <Input id="waste-quantity" type="number" min="0" step="0.1" className="flex-1" />
                        <Select defaultValue="kg">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="units">units</SelectItem>
                            <SelectItem value="loaves">loaves</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="waste-reason" className="text-right">
                        Reason
                      </Label>
                      <Select defaultValue="select" className="col-span-3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="select">Select reason</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                          <SelectItem value="Spoiled">Spoiled</SelectItem>
                          <SelectItem value="Overproduction">Overproduction</SelectItem>
                          <SelectItem value="Preparation Waste">Preparation Waste</SelectItem>
                          <SelectItem value="Customer Plate Waste">Customer Plate Waste</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="waste-notes" className="text-right">
                        Notes
                      </Label>
                      <Textarea id="waste-notes" placeholder="Additional details..." className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {wasteLog.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.date}</TableCell>
                          <TableCell className="font-medium">{log.item}</TableCell>
                          <TableCell>
                            {log.quantity} {log.unit}
                          </TableCell>
                          <TableCell>{log.reason}</TableCell>
                          <TableCell>{log.cost.toFixed(1)} TND</TableCell>
                          <TableCell>{log.reportedBy}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Waste by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Bakery</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Dairy</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Vegetables</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Meat</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Waste by Reason</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Expired</span>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Spoiled</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overproduction</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Other</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Waste Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Waste Cost:</span>
                      <span className="font-medium">{totalWasteCost.toFixed(1)} TND</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Most Wasted Item:</span>
                      <span className="font-medium">{mostWastedItem}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Waste Trend:</span>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        <TrendingDown className="mr-1 h-3 w-3" />
                        Decreasing
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Monthly Average:</span>
                      <span className="font-medium">45.2 TND</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">AI-Powered Suggestions</h2>
              <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
                {isRefreshing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh Suggestions
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardHeader className="pb-2">
                    <Badge
                      className={
                        suggestion.type === "recipe"
                          ? "bg-blue-100 text-blue-800 mb-2"
                          : suggestion.type === "order"
                            ? "bg-purple-100 text-purple-800 mb-2"
                            : "bg-amber-100 text-amber-800 mb-2"
                      }
                    >
                      {suggestion.type === "recipe"
                        ? "Recipe Suggestion"
                        : suggestion.type === "order"
                          ? "Order Optimization"
                          : "Promotion Idea"}
                    </Badge>
                    <CardTitle className="text-base">{suggestion.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                    <p className="text-sm font-medium text-emerald-600">{suggestion.impact}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Apply Suggestion
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Smart Inventory Features</CardTitle>
                <CardDescription>Optimize your inventory management with AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Utensils className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">Recipe Suggestions</p>
                        <p className="text-sm text-muted-foreground">Get recipe ideas for items nearing expiration</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Warehouse className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Order Optimization</p>
                        <p className="text-sm text-muted-foreground">Receive suggestions to optimize your ordering</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Menu Planning</p>
                        <p className="text-sm text-muted-foreground">Get menu suggestions based on inventory</p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <Settings className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Automatic Alerts</p>
                        <p className="text-sm text-muted-foreground">Receive alerts for items nearing expiration</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Inventory Analytics</h2>
              <div className="flex gap-2">
                <Select defaultValue="month">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Waste Trends</CardTitle>
                  <CardDescription>Monthly food waste by category</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center p-4">
                    <LineChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Chart visualization would appear here in a real application
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Turnover</CardTitle>
                  <CardDescription>How quickly items are used</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center p-4">
                    <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Chart visualization would appear here in a real application
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Waste Reduction Impact</CardTitle>
                <CardDescription>Environmental and financial benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-slate-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 mb-2">15%</p>
                    <p className="text-muted-foreground">Reduction in food waste</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-2">320 TND</p>
                    <p className="text-muted-foreground">Cost savings this year</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <Leaf className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-600 mb-2">180 kg</p>
                    <p className="text-muted-foreground">CO₂ emissions prevented</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Based on your inventory analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-md">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Optimize Bread Orders</p>
                      <p className="text-sm text-muted-foreground">
                        Reduce bread orders by 20% to match actual usage patterns and minimize waste.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-md">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Improve Dairy Storage</p>
                      <p className="text-sm text-muted-foreground">
                        Adjust refrigerator temperature to 3°C for optimal dairy preservation and longer shelf life.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-md">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Staff Training</p>
                      <p className="text-sm text-muted-foreground">
                        Conduct FIFO (First In, First Out) training for kitchen staff to ensure proper inventory
                        rotation.
                      </p>
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
