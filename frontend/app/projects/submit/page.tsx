"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Leaf } from "lucide-react"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"

export default function SubmitProjectPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        longDescription: "",
        category: "",
        fundingGoal: "",
        wasteReduction: "",
        location: "",
        image: "",
        gallery: "",
        tags: "",
        timeline: "",
        team: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
    }

    const userToken = localStorage.getItem("token")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("http://localhost:5000/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(userToken && { authorization: userToken }),
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error("Failed to submit the project. Please try again.")
            }

            const data = await response.json()
            toast.success("Project submitted successfully!", {
                style: {
                    background: "#059669",
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "12px",
                },
            })
            // Reset form
            setFormData({
                title: "",
                description: "",
                longDescription: "",
                category: "",
                fundingGoal: "",
                wasteReduction: "",
                location: "",
                image: "",
                gallery: "",
                tags: "",
                timeline: "",
                team: "",
            })
        } catch (err) {
            console.error("Error submitting project:", err)
            toast.error("Something went wrong. Please try again later.", {
                style: {
                    background: "#dc2626",
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "12px",
                },
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Submit New Project</h1>
                            <p className="text-muted-foreground">Share your innovative idea to reduce food waste</p>
                        </div>
                    </div>
                    <Button
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Project"}
                    </Button>
                </div>

                {/* Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>Fill in the details of your project below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            {/* Project Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g., Bread to Croutons Initiative"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your project and its goals"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={5}
                                    required
                                />
                            </div>

                            {/* Long Description */}
                            <div className="space-y-2">
                                <Label htmlFor="longDescription">Long Description</Label>
                                <Textarea
                                    id="longDescription"
                                    name="longDescription"
                                    placeholder="Provide a more detailed description of the project"
                                    value={formData.longDescription}
                                    onChange={handleInputChange}
                                    rows={5}
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    name="category"
                                    onValueChange={(value) => handleSelectChange("category", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="food-processing">Food Processing</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                        <SelectItem value="community">Community</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Funding Goal */}
                            <div className="space-y-2">
                                <Label htmlFor="fundingGoal">Funding Goal (TND)</Label>
                                <Input
                                    id="fundingGoal"
                                    name="fundingGoal"
                                    type="number"
                                    placeholder="e.g., 2500"
                                    value={formData.fundingGoal}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Waste Reduction */}
                            <div className="space-y-2">
                                <Label htmlFor="wasteReduction">Waste Reduction</Label>
                                <Input
                                    id="wasteReduction"
                                    name="wasteReduction"
                                    placeholder="e.g., 500kg per month"
                                    value={formData.wasteReduction}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="e.g., Tunis"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Image */}
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    placeholder="e.g., https://example.com/image.jpg"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Gallery */}
                            <div className="space-y-2">
                                <Label htmlFor="gallery">Gallery URLs</Label>
                                <Textarea
                                    id="gallery"
                                    name="gallery"
                                    placeholder="e.g., https://example.com/image1.jpg, https://example.com/image2.jpg"
                                    value={formData.gallery}
                                    onChange={handleInputChange}
                                    rows={3}
                                />
                            </div>

                            {/* Tags */}
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    placeholder="e.g., food waste, sustainability"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Timeline */}
                            <div className="space-y-2">
                                <Label htmlFor="timeline">Timeline</Label>
                                <Input
                                    id="timeline"
                                    name="timeline"
                                    placeholder="e.g., 3 months"
                                    value={formData.timeline}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Team */}
                            <div className="space-y-2">
                                <Label htmlFor="team">Team Members</Label>
                                <Textarea
                                    id="team"
                                    name="team"
                                    placeholder="List the members of your team"
                                    value={formData.team}
                                    onChange={handleInputChange}
                                    rows={3}
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                            <Link href="/dashboard">Cancel</Link>
                        </Button>
                        <Button
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            <Leaf className="h-4 w-4 mr-2" />
                            {isSubmitting ? "Submitting..." : "Submit Project"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}