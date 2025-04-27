"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { TokenPurchaseModal } from "./token-purchase-modal"

interface VoteButtonProps {
    projectId: string
    onVoteComplete: () => void
    userTokens?: number
}

export function VoteButton({ projectId, onVoteComplete, userTokens = 0 }: VoteButtonProps) {
    const [isVoting, setIsVoting] = useState(false)
    const [showTokenModal, setShowTokenModal] = useState(false)
    const { toast } = useToast()

    const handleVote = async () => {
        if (userTokens < 1) {
            setShowTokenModal(true)
            return
        }

        try {
            setIsVoting(true)

            // For demo purposes, we'll simulate a successful vote
            // In a real application, you would call your API
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: "Vote successful!",
                description: "Your vote has been recorded. Thank you for your support!",
            })

            onVoteComplete()
        } catch (error) {
            console.error("Voting error:", error)
            toast({
                title: "Voting failed",
                description: "There was an error processing your vote. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsVoting(false)
        }
    }

    const handleTokenPurchase = (amount: number) => {
        toast({
            title: "Tokens purchased",
            description: `You now have ${amount} tokens available for voting.`,
        })
        // In a real app, you would update the user's token count in state or context
    }

    return (
        <>
            <Button
                onClick={handleVote}
                disabled={isVoting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                size="sm"
            >
                {isVoting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Voting...
                    </>
                ) : (
                    <>
                        <ThumbsUp className="h-4 w-4 mr-2" /> Vote
                    </>
                )}
            </Button>

            <TokenPurchaseModal
                open={showTokenModal}
                onOpenChange={setShowTokenModal}
                onPurchaseComplete={handleTokenPurchase}
            />
        </>
    )
}
