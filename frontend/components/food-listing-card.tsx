"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"

export interface FoodListing {
    id: string
    title: string
    description: string
    price: number
    quantity: number
    unit: string
    expiryDate: string
    sellerId: string
    sellerName: string
    location: string
    image?: string
    createdAt: string
}

interface FoodListingCardProps {
    listing: FoodListing
    onContactSeller?: (listingId: string) => void
}

export function FoodListingCard({ listing, onContactSeller }: FoodListingCardProps) {
    const handleContactClick = () => {
        if (onContactSeller) {
            onContactSeller(listing.id)
        }
    }

    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src={listing.image || "/placeholder.svg?height=200&width=300"}
                    alt={listing.title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{listing.title}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                        ${listing.price.toFixed(2)}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{listing.description}</p>
                <div className="flex items-center text-sm mb-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{listing.location}</span>
                </div>
                <div className="flex items-center text-sm mb-3">
                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">Expires: {new Date(listing.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-medium">
                            {listing.quantity} {listing.unit}
                        </span>
                    </div>
                    <Button size="sm" onClick={handleContactClick}>
                        Contact Seller
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
