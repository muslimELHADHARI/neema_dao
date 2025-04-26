"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, CheckCircle, Leaf, User, Users, Utensils, Wallet } from "lucide-react"
import Link from "next/link"

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  university: string
  organization: string
  businessName: string
  businessType: string
  businessLicense: string
  investorType: string
  investmentFocus: string
  bio: string
  location: string
  phoneNumber: string
  website: string
  interests: string[]
  communicationPrefs: {
    emailUpdates: boolean
    newsletter: boolean
  }
  termsAccepted: boolean
}

export default function RegisterPage() {
  const [userType, setUserType] = useState("student")
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    organization: "",
    businessName: "",
    businessType: "",
    businessLicense: "",
    investorType: "",
    investmentFocus: "",
    bio: "",
    location: "",
    phoneNumber: "",
    website: "",
    interests: [],
    communicationPrefs: {
      emailUpdates: true,
      newsletter: true
    },
    termsAccepted: false
  })

  const handleUserTypeChange = (value: string) => {
    setUserType(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (id === "terms") {
      setFormData(prev => ({
        ...prev,
        termsAccepted: checked
      }))
    } else if (id.startsWith("interest-")) {
      const interest = id.replace("interest-", "")
      setFormData(prev => {
        const newInterests = checked
            ? [...prev.interests, interest]
            : prev.interests.filter(i => i !== interest)
        return {
          ...prev,
          interests: newInterests
        }
      })
    } else if (id === "email-updates" || id === "newsletter") {
      setFormData(prev => ({
        ...prev,
        communicationPrefs: {
          ...prev.communicationPrefs,
          [id]: checked
        }
      }))
    }
  }

  const nextStep = () => {
    setStep(step + 1)
    setError("")
  }

  const prevStep = () => {
    setStep(step - 1)
    setError("")
  }

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const payload = {
        userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        ...(userType === "student" && { university: formData.university }),
        ...(userType === "project-inventor" && { organization: formData.organization }),
        ...(userType === "restaurant-hotel" && {
          businessName: formData.businessName,
          businessType: formData.businessType,
          businessLicense: formData.businessLicense
        }),
        ...(userType === "investor" && {
          investorType: formData.investorType,
          investmentFocus: formData.investmentFocus
        }),
        bio: formData.bio,
        location: formData.location,
        phoneNumber: formData.phoneNumber,
        website: formData.website,
        interests: formData.interests,
        communicationPrefs: formData.communicationPrefs
      }

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      nextStep()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Join Neema DAO</h1>
            <p className="text-muted-foreground">
              Create your account to start reducing food waste and making a difference in Tunisia
            </p>
          </div>

          {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
          )}

          {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Role</CardTitle>
                  <CardDescription>Select how you want to participate in the DAO</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                      defaultValue={userType}
                      onValueChange={handleUserTypeChange}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="student" id="student" className="peer sr-only" />
                      <Label
                          htmlFor="student"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600 cursor-pointer"
                      >
                        <Users className="mb-3 h-6 w-6 text-blue-600" />
                        <div className="text-center">
                          <p className="font-medium">Student</p>
                          <p className="text-sm text-muted-foreground">Learn about sustainability and join project teams</p>
                        </div>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="project-inventor" id="project-inventor" className="peer sr-only" />
                      <Label
                          htmlFor="project-inventor"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600 cursor-pointer"
                      >
                        <Leaf className="mb-3 h-6 w-6 text-purple-600" />
                        <div className="text-center">
                          <p className="font-medium">Project Inventor</p>
                          <p className="text-sm text-muted-foreground">
                            Submit food waste reduction ideas and secure funding
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="restaurant-hotel" id="restaurant-hotel" className="peer sr-only" />
                      <Label
                          htmlFor="restaurant-hotel"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600 cursor-pointer"
                      >
                        <Utensils className="mb-3 h-6 w-6 text-amber-600" />
                        <div className="text-center">
                          <p className="font-medium">Restaurant/Hotel</p>
                          <p className="text-sm text-muted-foreground">
                            Reduce operational costs and meet sustainability goals
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="investor" id="investor" className="peer sr-only" />
                      <Label
                          htmlFor="investor"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 [&:has([data-state=checked])]:border-emerald-600 cursor-pointer"
                      >
                        <Wallet className="mb-3 h-6 w-6 text-red-600" />
                        <div className="text-center">
                          <p className="font-medium">Investor</p>
                          <p className="text-sm text-muted-foreground">
                            Fund impactful projects and track your investments
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
          )}

          {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Account</CardTitle>
                  <CardDescription>
                    {userType === "student"
                        ? "Join as a student to learn and participate in projects"
                        : userType === "project-inventor"
                            ? "Register as a project inventor to submit your ideas"
                            : userType === "restaurant-hotel"
                                ? "Register your restaurant or hotel to reduce food waste"
                                : "Join as an investor to fund impactful projects"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                      />
                    </div>

                    {userType === "student" && (
                        <div className="space-y-2">
                          <Label htmlFor="university">University/School</Label>
                          <Input
                              id="university"
                              placeholder="Enter your university or school name"
                              value={formData.university}
                              onChange={handleInputChange}
                          />
                        </div>
                    )}

                    {userType === "project-inventor" && (
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization (Optional)</Label>
                          <Input
                              id="organization"
                              placeholder="Enter your organization name if applicable"
                              value={formData.organization}
                              onChange={handleInputChange}
                          />
                        </div>
                    )}

                    {userType === "restaurant-hotel" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                placeholder="Enter your restaurant or hotel name"
                                value={formData.businessName}
                                onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="businessType">Business Type</Label>
                            <Select
                                onValueChange={(value) => handleSelectChange("businessType", value)}
                                value={formData.businessType}
                            >
                              <SelectTrigger id="businessType">
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                <SelectItem value="hotel">Hotel</SelectItem>
                                <SelectItem value="cafe">Café</SelectItem>
                                <SelectItem value="bakery">Bakery</SelectItem>
                                <SelectItem value="catering">Catering Service</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="businessLicense">Business License Number</Label>
                            <Input
                                id="businessLicense"
                                placeholder="Enter your business license number"
                                value={formData.businessLicense}
                                onChange={handleInputChange}
                            />
                          </div>
                        </>
                    )}

                    {userType === "investor" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="investorType">Investor Type</Label>
                            <Select
                                onValueChange={(value) => handleSelectChange("investorType", value)}
                                value={formData.investorType}
                            >
                              <SelectTrigger id="investorType">
                                <SelectValue placeholder="Select investor type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="corporate">Corporate</SelectItem>
                                <SelectItem value="foundation">Foundation</SelectItem>
                                <SelectItem value="government">Government Entity</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="investmentFocus">Investment Focus (Optional)</Label>
                            <Select
                                onValueChange={(value) => handleSelectChange("investmentFocus", value)}
                                value={formData.investmentFocus}
                            >
                              <SelectTrigger id="investmentFocus">
                                <SelectValue placeholder="Select investment focus" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technology">Food Technology</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                <SelectItem value="processing">Food Processing</SelectItem>
                                <SelectItem value="all">All Areas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => handleCheckboxChange("terms", checked as boolean)}
                      />
                      <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link href="/terms" className="text-emerald-600 hover:underline">
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-emerald-600 hover:underline">
                          privacy policy
                        </Link>
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                      onClick={nextStep}
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
          )}

          {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Profile</CardTitle>
                  <CardDescription>Add additional information to your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-photo">Profile Photo</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <Button variant="outline" size="sm">
                          Upload Photo
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                          id="bio"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us about yourself and your interest in food waste reduction"
                          value={formData.bio}
                          onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select
                          onValueChange={(value) => handleSelectChange("location", value)}
                          value={formData.location}
                      >
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select your location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunis">Tunis</SelectItem>
                          <SelectItem value="sfax">Sfax</SelectItem>
                          <SelectItem value="sousse">Sousse</SelectItem>
                          <SelectItem value="bizerte">Bizerte</SelectItem>
                          <SelectItem value="gabes">Gabes</SelectItem>
                          <SelectItem value="ariana">Ariana</SelectItem>
                          <SelectItem value="kairouan">Kairouan</SelectItem>
                          <SelectItem value="monastir">Monastir</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Areas of Interest</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="interest-technology"
                              checked={formData.interests.includes("technology")}
                              onCheckedChange={(checked) => handleCheckboxChange("interest-technology", checked as boolean)}
                          />
                          <label
                              htmlFor="interest-technology"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Food Technology
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="interest-education"
                              checked={formData.interests.includes("education")}
                              onCheckedChange={(checked) => handleCheckboxChange("interest-education", checked as boolean)}
                          />
                          <label
                              htmlFor="interest-education"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Education
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="interest-processing"
                              checked={formData.interests.includes("processing")}
                              onCheckedChange={(checked) => handleCheckboxChange("interest-processing", checked as boolean)}
                          />
                          <label
                              htmlFor="interest-processing"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Food Processing
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="interest-infrastructure"
                              checked={formData.interests.includes("infrastructure")}
                              onCheckedChange={(checked) => handleCheckboxChange("interest-infrastructure", checked as boolean)}
                          />
                          <label
                              htmlFor="interest-infrastructure"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Infrastructure
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                      <Input
                          id="phoneNumber"
                          placeholder="Enter your phone number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Social Media (Optional)</Label>
                      <Input
                          id="website"
                          placeholder="Enter your website or social media profile"
                          value={formData.website}
                          onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Communication Preferences</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="email-updates"
                              checked={formData.communicationPrefs.emailUpdates}
                              onCheckedChange={(checked) => handleCheckboxChange("email-updates", checked as boolean)}
                          />
                          <label
                              htmlFor="email-updates"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Receive email updates about projects
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="newsletter"
                              checked={formData.communicationPrefs.newsletter}
                              onCheckedChange={(checked) => handleCheckboxChange("newsletter", checked as boolean)}
                          />
                          <label
                              htmlFor="newsletter"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Subscribe to newsletter
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                      onClick={handleSubmit}
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Complete Registration"}
                  </Button>
                </CardFooter>
              </Card>
          )}

          {step === 4 && (
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl">Registration Complete!</CardTitle>
                  <CardDescription>Your account has been successfully created</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">
                    Welcome to Neema DAO! You're now part of Tunisia's movement to reduce food waste while creating
                    sustainable economic opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/projects">Explore Projects</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
          )}
        </div>
      </div>
  )
}