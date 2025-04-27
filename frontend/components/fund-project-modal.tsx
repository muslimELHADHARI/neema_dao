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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface FundProjectModalProps {
    projectId: string
    projectTitle: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onFundingComplete: (amount: number) => void
}

export function FundProjectModal({
    projectId,
    projectTitle,
    open,
    onOpenChange,
    onFundingComplete,
}: FundProjectModalProps) {
    const [amount, setAmount] = useState<string>("")
    const [paymentMethod, setPaymentMethod] = useState<string>("credit-card")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!amount || Number.parseFloat(amount) <= 0) {
            toast({
                title: "Invalid amount",
                description: "Please enter a valid funding amount.",
                variant: "destructive",
            })
            return
        }

        try {
            setIsSubmitting(true)

            // Replace the simulation code with this actual API call
            try {
                setIsSubmitting(true)

                // Make the actual API call to your backend
                const response = await fetch(`http://localhost:5000/api/projects/${projectId}/fund`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        //If you have a token stored, include it here
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        amount: Number.parseFloat(amount),
                        paymentMethod,
                    }),
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fund project");
                }

                const data = await response.json();

                // Show success message
                toast({
                    title: "Funding successful!",
                    description: `You have successfully funded ${projectTitle} with ${amount} TND.`,
                });

                // Close the modal and update the UI
                onOpenChange(false);
                onFundingComplete(Number.parseFloat(amount));

                // Reset form
                setAmount("");
                setPaymentMethod("credit-card");
            } catch (error) {
                console.error("Funding error:", error);
                toast({
                    title: "Funding failed",
                    description: "There was an error processing your funding. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setIsSubmitting(false);
            }
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Simulate successful funding
            const fundingAmount = Number.parseFloat(amount)

            // Show success message
            toast({
                title: "Funding successful!",
                description: `You have successfully funded ${projectTitle} with ${amount} TND.`,
            })

            // Close the modal and update the UI
            onOpenChange(false)
            //onFundingComplete(fundingAmount)

            // Reset form
            setAmount("")
            setPaymentMethod("credit-card")
        } catch (error) {
            console.error("Funding error:", error)
            toast({
                title: "Funding failed",
                description: "There was an error processing your funding. Please try again.",
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
                    <DialogTitle>Fund this project</DialogTitle>
                    <DialogDescription>
                        Support "{projectTitle}" by providing funding. Enter the amount you would like to contribute.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Funding Amount (TND)</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                step="0.01"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Payment Method</Label>
                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="credit-card" id="credit-card" />
                                    <Label htmlFor="credit-card">Credit Card</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                                    <Label htmlFor="bank-transfer">Bank Transfer</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="wallet" id="wallet" />
                                    <Label htmlFor="wallet">Digital Wallet</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Fund Project"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
