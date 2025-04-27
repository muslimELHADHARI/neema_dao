import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  Leaf,
  Recycle,
  ThumbsUp,
  Users,
  Utensils,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 -z-10" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 -z-10" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:text-emerald-900">
                SDG 12.3 Initiative
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Reducing Food Waste Through Community Innovation
              </h1>
              <p className="text-xl text-muted-foreground">
                Join Neema DAO to connect, collaborate, and create solutions that tackle food waste in Tunisia while
                building sustainable businesses.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/register">
                    Join the DAO <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/projects">Explore Projects</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/poster_neema.jpg"
                alt="Food waste reduction initiative"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-emerald-600 mb-2">5,000+</p>
              <p className="text-sm text-muted-foreground">Kg of Food Saved</p>
            </div>
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-emerald-600 mb-2">24</p>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </div>
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-emerald-600 mb-2">450+</p>
              <p className="text-sm text-muted-foreground">DAO Members</p>
            </div>
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-emerald-600 mb-2">15,000</p>
              <p className="text-sm text-muted-foreground">TND Funded</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Neema DAO Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform connects all stakeholders in the food waste ecosystem to create, fund, and implement
              innovative solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>1. Join</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Register as a student, project inventor, restaurant/hotel, or investor to access the platform.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>2. Submit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Propose food waste reduction projects or browse existing initiatives to support.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <ThumbsUp className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>3. Vote</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Participate in community governance by voting on projects you believe in.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>4. Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Invest in approved projects and track their impact on food waste reduction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">Innovative solutions making an impact across Tunisia</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <Card className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/project_1.jpg"
                  alt="Bread to Croutons Initiative"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-100 text-amber-800">Active</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Bread to Croutons Initiative</CardTitle>
                <CardDescription>Food Processing • Tunis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Converting day-old bread from bakeries into packaged croutons for restaurants and retail.
                </p>
                <div className="flex items-center text-sm">
                  <Leaf className="h-4 w-4 text-emerald-600 mr-1" />
                  <span>Reduces 500kg monthly of food waste</span>
                </div>
              </CardContent>
            </Card>

            {/* Project 2 */}
            <Card className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/project_2.jpg"
                  alt="Restaurant Food Donation App"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-emerald-100 text-emerald-800">
                    <CheckCircle className="h-3 w-3 mr-1" /> Funded
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Restaurant Food Donation App</CardTitle>
                <CardDescription>Technology • Multiple Cities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Mobile application connecting restaurants with excess food to local charities for same-day pickup.
                </p>
                <div className="flex items-center text-sm">
                  <Leaf className="h-4 w-4 text-emerald-600 mr-1" />
                  <span>Reduces 1200kg monthly of food waste</span>
                </div>
              </CardContent>
            </Card>

            {/* Project 3 */}
            <Card className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/project_3.jpg"
                  alt="Compost System for Hotels"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-100 text-amber-800">Active</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Compost System for Hotels</CardTitle>
                <CardDescription>Infrastructure • Hammamet</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Implementing efficient composting systems for large hotels to process food waste on-site.
                </p>
                <div className="flex items-center text-sm">
                  <Leaf className="h-4 w-4 text-emerald-600 mr-1" />
                  <span>Reduces 2000kg monthly of food waste</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-16 md:py-24 bg-emerald-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Who Can Join Neema DAO?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform brings together diverse stakeholders to create a complete ecosystem for food waste reduction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about sustainability, join project teams, and develop innovative solutions while earning points
                  and badges.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Access to educational resources</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Opportunities to join startups</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Practical sustainability experience</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Project Inventors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Submit food waste reduction ideas, secure funding, and build sustainable businesses with community
                  support.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Access to funding opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Mentorship and guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Visibility for your innovations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Restaurants & Hotels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Reduce operational costs, meet sustainability goals, and access partner discounts while reducing food
                  waste.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Supplier discounts based on points</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Waste reduction solutions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Eco-friendly brand reputation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Investors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Fund impactful projects, track your investments, and support sustainable businesses with measurable
                  outcomes.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Transparent impact metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>Early access to promising startups</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" />
                    <span>ESG investment opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-100 text-emerald-800">Engagement</Badge>
              <h2 className="text-3xl font-bold mb-6">Earn Points & Badges</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our gamification system rewards your contributions to food waste reduction with points and badges that
                unlock real benefits.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Award className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Recognition</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn badges that showcase your commitment to sustainability and food waste reduction.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tangible Benefits</h3>
                    <p className="text-sm text-muted-foreground">
                      Convert points to partner discounts, priority access to events, and exclusive opportunities.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Community Status</h3>
                    <p className="text-sm text-muted-foreground">
                      Rise through the ranks to become a recognized leader in Tunisia's food waste reduction movement.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-emerald-50 to-white">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">Eco Warrior</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Earn 100 points through platform activities</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-white">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Super Voter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Vote on 50 different projects</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-50 to-white">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Food Rescuer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Save 100kg of food from being wasted</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-white">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Project Starter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Launch a funded project on the platform</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join Neema DAO today and be part of Tunisia's movement to reduce food waste while creating sustainable
            economic opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Link href="/register">
                Join the DAO <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-emerald-700">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">Neema DAO</h3>
              <p className="text-sm text-slate-400 mb-4">
                A decentralized platform to reduce food waste in Tunisia, aligning with SDG 12.3.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-slate-400 hover:text-white">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/statistics" className="text-slate-400 hover:text-white">
                    Statistics
                  </Link>
                </li>
                <li>
                  <Link href="/education" className="text-slate-400 hover:text-white">
                    Education Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-slate-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-slate-400 hover:text-white">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-slate-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Neema DAO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
