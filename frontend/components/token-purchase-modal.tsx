"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CreditCard } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface TokenPurchaseModalProps {
    projectId: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onPurchaseComplete: (amount: number) => void
}

type User = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
};

export function TokenPurchaseModal({ projectId, open, onOpenChange, onPurchaseComplete }: TokenPurchaseModalProps) {
    const [amount, setAmount] = useState("1")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const { toast } = useToast()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser) as User)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!amount || Number(amount) <= 0) {
            toast({
                title: "Invalid amount",
                description: "Please enter a valid token amount.",
                variant: "destructive",
            })
            return
        }

        if (!user) {
            toast({
                title: "User not found",
                description: "Please log in before voting.",
                variant: "destructive",
            })
            return
        }

        try {
            setIsSubmitting(true)
            console.log("Submitting vote for project:", projectId, "with amount:", amount, "by user:", user.id)
            const response = await fetch(`http://localhost:5000/api/projects/${projectId}/vote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token if you have it stored
                },
                body: JSON.stringify({ tokens: Number(amount), user }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || "Something went wrong")
            }

            const result = await response.json()

            toast({
                title: "Vote Successful!",
                description: `You have voted for the project.`,
            })

            onOpenChange(false)
            onPurchaseComplete(Number(amount))
            setAmount("1")
        } catch (error: any) {
            console.error("Vote project error:", error)
            toast({
                title: "Vote failed",
                description: error.message || "There was an error processing your vote. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Purchase Tokens</DialogTitle>
                    <DialogDescription>Purchase tokens to vote for projects. 1 token = $1 = 1 vote.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Number of Tokens</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                disabled={isSubmitting}
                                className="col-span-3"
                            />
                            <p className="text-sm text-muted-foreground">
                                Total cost: ${amount ? Number(amount).toFixed(2) : "0.00"}
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label>Payment Method</Label>
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                <span>Credit Card (ending in 4242)</span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Purchase Tokens"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
