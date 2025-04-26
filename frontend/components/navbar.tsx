"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, ChevronDown, Leaf, LogOut, Menu, MessageSquare, Search, Settings, User, Warehouse } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes

  type User = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
  };

// Get the user from localStorage
  const storedUser = localStorage.getItem('user');

  let user: User | null = null;

  if (storedUser) {
    user = JSON.parse(storedUser) as User;
  }
  // Check if user is scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Statistics", href: "/statistics" },
    { name: "Education", href: "/education" },
  ]

  const userNavLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <User className="h-4 w-4 mr-2" /> },
    {
      name: "Smart Inventory",
      href: "/smart-inventory",
      icon: <Warehouse className="h-4 w-4 mr-2" />,
    },
    {
      name: "AI Assistant",
      href: "/ai-assistant",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
    },
    { name: "Profile", href: "/profile", icon: <User className="h-4 w-4 mr-2" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background border-b shadow-sm" : "bg-background/80 backdrop-blur-md"
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
            <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="font-bold text-lg">Neema DAO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${pathname === link.href ? "text-emerald-600 dark:text-emerald-400" : "text-foreground/80"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side - Search, Notifications, User */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Search Button */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-emerald-600 dark:bg-emerald-500">
                      <span className="text-[10px]">3</span>
                    </Badge>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <DropdownMenuItem key={i} className="cursor-pointer py-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">New project vote</p>
                            <p className="text-xs text-muted-foreground">
                              Your project "Bread to Croutons" received a new vote
                            </p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer justify-center">
                    <Link href="/notifications" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 flex items-center gap-2 pl-2 pr-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-flex text-sm font-medium">{user?.firstName  }</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.firstName +" " + user?.lastName }</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userNavLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild className="cursor-pointer">
                      <Link href={link.href} className="flex items-center">
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white"
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Neema DAO</SheetTitle>
                <SheetDescription>Food waste reduction platform</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${pathname === link.href ? "text-emerald-600 dark:text-emerald-400" : "text-foreground/80"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                {isLoggedIn ? (
                  <>
                    {userNavLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    ))}
                    <Button variant="ghost" className="justify-start px-2 text-red-600 dark:text-red-400">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log out</span>
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline">
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white"
                    >
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
