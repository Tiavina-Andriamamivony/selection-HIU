"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs"
import { 
  BookOpen, 
  Home,
  GraduationCap,
  MessageSquare,
  FileText
} from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold">SkillAI</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/dashboard" className="flex items-center space-x-2 hover:text-primary">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link href="/courses" className="flex items-center space-x-2 hover:text-primary">
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </Link>
          <Link href="/chat" className="flex items-center space-x-2 hover:text-primary">
            <MessageSquare className="h-4 w-4" />
            <span>AI Chat</span>
          </Link>
          <Link href="/documents" className="flex items-center space-x-2 hover:text-primary">
            <FileText className="h-4 w-4" />
            <span>Documents</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  )
}