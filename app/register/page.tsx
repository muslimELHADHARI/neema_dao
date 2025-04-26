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

export default function RegisterPage() {
  const [userType, setUserType] = useState("student")
  const [step, setStep] = useState(1)

  const handleUserTypeChange = (value: string) => {
    setUserType(value)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
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
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm your password" />
                </div>

                {userType === "student" && (
                  <div className="space-y-2">
                    <Label htmlFor="university">University/School</Label>
                    <Input id="university" placeholder="Enter your university or school name" />
                  </div>
                )}

                {userType === "project-inventor" && (
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input id="organization" placeholder="Enter your organization name if applicable" />
                  </div>
                )}

                {userType === "restaurant-hotel" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input id="business-name" placeholder="Enter your restaurant or hotel name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-type">Business Type</Label>
                      <Select>
                        <SelectTrigger id="business-type">
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
                      <Label htmlFor="business-license">Business License Number</Label>
                      <Input id="business-license" placeholder="Enter your business license number" />
                    </div>
                  </>
                )}

                {userType === "investor" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="investor-type">Investor Type</Label>
                      <Select>
                        <SelectTrigger id="investor-type">
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
                      <Label htmlFor="investment-focus">Investment Focus (Optional)</Label>
                      <Select>
                        <SelectTrigger id="investment-focus">
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
                  <Checkbox id="terms" />
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
              <Button onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
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
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
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
                      <Checkbox id="interest-technology" />
                      <label
                        htmlFor="interest-technology"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Food Technology
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest-education" />
                      <label
                        htmlFor="interest-education"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Education
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest-processing" />
                      <label
                        htmlFor="interest-processing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Food Processing
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest-infrastructure" />
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
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website/Social Media (Optional)</Label>
                  <Input id="website" placeholder="Enter your website or social media profile" />
                </div>

                <div className="space-y-2">
                  <Label>Communication Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-updates" defaultChecked />
                      <label
                        htmlFor="email-updates"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Receive email updates about projects
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" defaultChecked />
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
              <Button className="bg-emerald-600 hover:bg-emerald-700">Complete Registration</Button>
            </CardFooter>
          </Card>
        )}

        {/* Success Message */}
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
