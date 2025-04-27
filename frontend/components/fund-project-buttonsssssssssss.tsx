"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FundProjectModal } from "./fund-project-modal"

interface FundProjectButtonProps {
    projectId: string
    projectTitle: string
}

export function FundProjectButton({ projectId, projectTitle }: FundProjectButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectStats, setProjectStats] = useState({
        fundingRaised: 0,
        backers: 0,
    })

    const handleFundingComplete = (amount: number) => {
        setProjectStats((prev) => {
            // Destructure values from prev state
            const { fundingRaised, backers } = prev;

            // Return the updated state in a single object
            return {
                fundingRaised: fundingRaised + amount,
                backers: backers + 1,
            };
        });

        // In a real application, you would refetch the project data
        // or update the UI based on the response from the API
    }

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Fund This Project
            </Button>

            <FundProjectModal
                projectId={projectId}
                projectTitle={projectTitle}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onFundingComplete={handleFundingComplete}
            />
        </>
    )
}
