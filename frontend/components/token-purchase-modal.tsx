"use client"

import type React from "react"

import { useState } from "react"
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
    open: boolean
    onOpenChange: (open: boolean) => void
    onPurchaseComplete: (amount: number) => void
}

export function TokenPurchaseModal({ open, onOpenChange, onPurchaseComplete }: TokenPurchaseModalProps) {
    const [amount, setAmount] = useState("1")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

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

        try {
            setIsSubmitting(true)

            // For demo purposes, we'll simulate a successful purchase
            // In a real application, you would call your API
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast({
                title: "Purchase successful!",
                description: `You have successfully purchased ${amount} tokens.`,
            })

            onOpenChange(false)
            onPurchaseComplete(Number(amount))
            setAmount("1")
        } catch (error) {
            console.error("Token purchase error:", error)
            toast({
                title: "Purchase failed",
                description: "There was an error processing your purchase. Please try again.",
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
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
