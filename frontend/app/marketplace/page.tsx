"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus, Search } from "lucide-react"
import { FoodListingCard, type FoodListing } from "@/components/food-listing-card"

// Mock data for demonstration
const MOCK_LISTINGS: FoodListing[] = [
    {
        id: "1",
        title: "Fresh Bread Surplus",
        description: "Assorted bread and pastries from today's baking. Perfect condition.",
        price: 15.99,
        quantity: 5,
        unit: "kg",
        expiryDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        sellerId: "seller1",
        sellerName: "Bakery Deluxe",
        location: "Tunis",
        image: "/placeholder.svg?height=200&width=300",
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Unused Vegetables",
        description: "Fresh vegetables from our restaurant. Slightly imperfect but perfectly edible.",
        price: 12.5,
        quantity: 8,
        unit: "kg",
        expiryDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
        sellerId: "seller2",
        sellerName: "Green Garden Restaurant",
        location: "Sousse",
        image: "/placeholder.svg?height=200&width=300",
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        title: "Dairy Products",
        description: "Assorted dairy products approaching best-by date. Perfect quality.",
        price: 22.0,
        quantity: 4,
        unit: "kg",
        expiryDate: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
        sellerId: "seller3",
        sellerName: "Hotel Continental",
        location: "Sfax",
        image: "/placeholder.svg?height=200&width=300",
        createdAt: new Date().toISOString(),
    },
]

export default function MarketplacePage() {
    const [listings, setListings] = useState<FoodListing[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [category, setCategory] = useState("all")
    const [location, setLocation] = useState("all")

    useEffect(() => {
        // Simulate API call with mock data
        const fetchListings = async () => {
            setLoading(true)

            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Filter listings based on search, category, and location
            let filteredListings = [...MOCK_LISTINGS]

            if (searchTerm) {
                filteredListings = filteredListings.filter(
                    (listing) =>
                        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        listing.description.toLowerCase().includes(searchTerm.toLowerCase()),
                )
            }

            if (location !== "all") {
                filteredListings = filteredListings.filter(
                    (listing) => listing.location.toLowerCase() === location.toLowerCase(),
                )
            }

            setListings(filteredListings)
            setLoading(false)
        }

        fetchListings()
    }, [searchTerm, category, location])

    const handleContactSeller = (listingId: string) => {
        // In a real app, this would open a chat or contact form
        console.log(`Contact seller for listing ${listingId}`)
        alert(`Contact request sent for listing ${listingId}`)
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Food Waste Marketplace</h1>
                    <p className="text-muted-foreground">
                        Connect with local restaurants and hotels to buy and sell surplus food
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Listing
                </Button>
            </div>

            <div className="mb-8">
                <Tabs defaultValue="buy">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="buy">Buy Food</TabsTrigger>
                        <TabsTrigger value="sell">Sell Food</TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy" className="space-y-4 pt-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search listings..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="produce">Produce</SelectItem>
                                    <SelectItem value="dairy">Dairy</SelectItem>
                                    <SelectItem value="bakery">Bakery</SelectItem>
                                    <SelectItem value="prepared">Prepared Food</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={location} onValueChange={setLocation}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Locations</SelectItem>
                                    <SelectItem value="tunis">Tunis</SelectItem>
                                    <SelectItem value="sousse">Sousse</SelectItem>
                                    <SelectItem value="sfax">Sfax</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : listings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                {listings.map((listing) => (
                                    <FoodListingCard key={listing.id} listing={listing} onContactSeller={handleContactSeller} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No listings found matching your criteria.</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="sell">
                        <div className="bg-muted/50 rounded-lg p-8 text-center">
                            <h3 className="text-xl font-medium mb-2">Create a New Listing</h3>
                            <p className="text-muted-foreground mb-4">
                                List your surplus food items for sale to reduce waste and recover costs.
                            </p>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Create Listing
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
