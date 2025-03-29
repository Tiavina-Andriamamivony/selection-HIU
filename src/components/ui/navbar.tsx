"use client"

import * as React from "react"
import { useEffect } from "react"
import { UserButton, SignInButton, useUser } from "@clerk/nextjs"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "./button"

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          await fetch('/api/user/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              profileImage: user.imageUrl,
            }),
          });
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    if (isSignedIn) {
      syncUser();
    }
  }, [isSignedIn, user]);

  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="text-xl font-bold text-primary">
          SkillAI
        </Link>
        
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex gap-6">
            {isSignedIn ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-background hover:bg-accent">
                    Formation Pro
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Accueil Formation
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Votre assistant de formation personnalisé
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/chat" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Chat Formation</div>
                            <p className="text-sm leading-snug text-muted-foreground">
                              Discutez avec votre formateur IA
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Analyse LinkedIn</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/analyze" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Analyser ma photo</div>
                            <p className="text-sm leading-snug text-muted-foreground">
                              Obtenez un retour détaillé sur votre photo de profil
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/history" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">Historique</div>
                            <p className="text-sm leading-snug text-muted-foreground">
                              Consultez vos analyses précédentes
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/profile" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Mon Profil
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <p className="text-muted-foreground">
                  Connectez-vous pour accéder à toutes les fonctionnalités
                </p>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Se connecter
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar