"use client"
import * as React from "react"
import { Moon, Sun, Sunrise, Sunset } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./button"


export const ModeToggle = () => {

    const { theme, setTheme } = useTheme()

    return (
        <>
            <Button
                variant="ghost"
                size="'icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={"hover:bg-accent p-4"}
            >
                {
                    theme === "light" ? (
                        <Moon className="size-5" />
                    ) : (
                        <Sun className="size-5" />
                    )
                }
            </Button>
        </>
    )
}