"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import Searchinput from "./Searchinput";
import { ToggleMode } from "./ToggleMode";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Show,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuopen] = useState(false);
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Desktop Navigation */}
          <div className="flex items-center  gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Tushar
                </span>
                <span className="text-foreground">Code</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/articles"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Articles
            </Link>
            <Link
              href="/tutorials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tutorials
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          </div>

          {/* Right Section - Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <Searchinput />

            {/* Theme Toggle */}
            <ToggleMode />

            {/* User Actions */}

            <Show when="signed-in">
              <UserButton />
            </Show>


            <Show when="signed-out">
                <div className="hidden md:flex items-center gap-2">
              <SignInButton >
                  <Button variant="outline">Login</Button>
              </SignInButton>

              <SignUpButton>
                  <Button>Sign up</Button>
              </SignUpButton>
                </div>
            </Show>

            

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuopen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Search Bar (Mobile) */}
            <div className="px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link
                href="/articles"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuopen(false)}
              >
                Articles
              </Link>
              <Link
                href="/tutorials"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuopen(false)}
              >
                Tutorials
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuopen(false)}
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuopen(false)}
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            {/* <SignedOut> */}
            <div className="px-4 flex flex-col gap-2">
              {/* <SignInButton> */}
              <Button variant="outline" className="w-full">
                Login
              </Button>
              {/* </SignInButton> */}
              {/* <SignUpButton> */}
              <Button className="w-full">Sign up</Button>
              {/* </SignUpButton> */}
            </div>
            {/* </SignedOut> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
