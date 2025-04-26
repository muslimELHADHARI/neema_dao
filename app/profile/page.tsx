"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Award, Bell, Camera, Check, Edit, Globe, Key, Leaf, Lock, Mail, Phone, Save, Shield, User } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="mr-2">Saving</span>
                    <span className="animate-spin">...</span>
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and public profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-emerald-200">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                      <AvatarFallback className="text-lg">SA</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute -bottom-2 -right-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Change profile picture</span>
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">Sarah Ben Ali</h3>
                      <Badge className="bg-emerald-100 text-emerald-800">Project Inventor</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Member since January 2023</p>
                    <p className="text-sm">
                      <span className="font-medium">1,250</span> points • <span className="font-medium">7</span> badges
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        defaultValue="Sarah"
                        disabled={!isEditing}
                        className={!isEditing ? "opacity-70" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        defaultValue="Ben Ali"
                        disabled={!isEditing}
                        className={!isEditing ? "opacity-70" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="sarah@example.com"
                      disabled={!isEditing}
                      className={!isEditing ? "opacity-70" : ""}
                    />
                    {!isEditing && (
                      <div className="flex items-center mt-1">
                        <Check className="h-4 w-4 text-emerald-600 mr-1" />
                        <span className="text-xs text-emerald-600">Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+216 55 123 456"
                      disabled={!isEditing}
                      className={!isEditing ? "opacity-70" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      defaultValue="Food waste reduction enthusiast and entrepreneur. Founder of the Bread to Croutons Initiative, working to reduce bread waste in Tunisia."
                      disabled={!isEditing}
                      className={!isEditing ? "opacity-70 resize-none" : "resize-none"}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select defaultValue="tunis" disabled={!isEditing}>
                        <SelectTrigger id="location" className={!isEditing ? "opacity-70" : ""}>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunis">Tunis</SelectItem>
                          <SelectItem value="sfax">Sfax</SelectItem>
                          <SelectItem value="sousse">Sousse</SelectItem>
                          <SelectItem value="bizerte">Bizerte</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization (Optional)</Label>
                      <Input
                        id="organization"
                        defaultValue="University of Tunis"
                        disabled={!isEditing}
                        className={!isEditing ? "opacity-70" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website or Social Media (Optional)</Label>
                    <Input
                      id="website"
                      defaultValue="https://linkedin.com/in/sarahbenali"
                      disabled={!isEditing}
                      className={!isEditing ? "opacity-70" : ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>Control what information is visible to other users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label htmlFor="public-profile">Public Profile</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your profile and contributions
                      </p>
                    </div>
                    <Switch id="public-profile" defaultChecked disabled={!isEditing} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label htmlFor="show-email">Show Email Address</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                    </div>
                    <Switch id="show-email" disabled={!isEditing} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label htmlFor="show-phone">Show Phone Number</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                    </div>
                    <Switch id="show-phone" disabled={!isEditing} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label htmlFor="show-badges">Show Badges</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Display your earned badges on your public profile</p>
                    </div>
                    <Switch id="show-badges" defaultChecked disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Receive a verification code via SMS when signing in</p>
                  </div>
                  <Switch id="2fa" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Label htmlFor="login-alerts">Login Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new logins to your account
                    </p>
                  </div>
                  <Switch id="login-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Automatically log out after a period of inactivity</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Manage what emails you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="project-updates">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about projects you've created or supported
                    </p>
                  </div>
                  <Switch id="project-updates" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="votes-comments">Votes and Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications when someone votes or comments on your projects
                    </p>
                  </div>
                  <Switch id="votes-comments" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-projects">New Projects</Label>
                    <p className="text-sm text-muted-foreground">
                      Updates about new projects in your areas of interest
                    </p>
                  </div>
                  <Switch id="new-projects" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive our monthly newsletter with platform updates and success stories
                    </p>
                  </div>
                  <Switch id="newsletter" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In-App Notifications</CardTitle>
                <CardDescription>Control what notifications you see within the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="project-activity">Project Activity</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about updates to projects you're involved with
                    </p>
                  </div>
                  <Switch id="project-activity" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mentions">Mentions</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when someone mentions you in a comment or update
                    </p>
                  </div>
                  <Switch id="mentions" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="badges-earned">Badges Earned</Label>
                    <p className="text-sm text-muted-foreground">Notifications when you earn a new badge</p>
                  </div>
                  <Switch id="badges-earned" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="funding-updates">Funding Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about funding progress for your projects
                    </p>
                  </div>
                  <Switch id="funding-updates" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Achievements you've earned on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                      <Award className="h-8 w-8 text-emerald-600" />
                    </div>
                    <span className="font-medium">Eco Innovator</span>
                    <p className="text-xs text-muted-foreground mt-1">Earned on March 15, 2023</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                      <Leaf className="h-8 w-8 text-blue-600" />
                    </div>
                    <span className="font-medium">Waste Reducer</span>
                    <p className="text-xs text-muted-foreground mt-1">Earned on April 2, 2023</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <User className="h-8 w-8 text-purple-600" />
                    </div>
                    <span className="font-medium">Green Leader</span>
                    <p className="text-xs text-muted-foreground mt-1">Earned on May 10, 2023</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                      <Bell className="h-8 w-8 text-amber-600" />
                    </div>
                    <span className="font-medium">Eco Warrior</span>
                    <p className="text-xs text-muted-foreground mt-1">Earned on June 22, 2023</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                      <Award className="h-8 w-8 text-red-600" />
                    </div>
                    <span className="font-medium">Super Voter</span>
                    <p className="text-xs text-muted-foreground mt-1">Earned on July 5, 2023</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                      <Award className="h-8 w-8 text-slate-600" />
                    </div>
                    <span className="font-medium">Profit Maker</span>
                    <p className="text-xs text-muted-foreground mt-1">Earned on August 18, 2023</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2 opacity-50">
                      <Award className="h-8 w-8 text-emerald-600" />
                    </div>
                    <span className="font-medium text-muted-foreground">Food Rescuer</span>
                    <p className="text-xs text-muted-foreground mt-1">Not yet earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges Progress</CardTitle>
                <CardDescription>Track your progress towards earning new badges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Food Rescuer</span>
                    <span className="text-sm font-medium">75/100 kg</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Save 100kg of food from being wasted to earn this badge
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Community Builder</span>
                    <span className="text-sm font-medium">3/5 partnerships</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Establish 5 partnerships with other members to earn this badge
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Funding Champion</span>
                    <span className="text-sm font-medium">2,500/5,000 TND</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Raise 5,000 TND in total project funding to earn this badge
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
