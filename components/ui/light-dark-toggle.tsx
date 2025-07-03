"use client"

import { Button } from "./button";
import { SunIcon, MoonIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export function LightDarkToggle({
    className,
}:{
    className?: string;

 
}){
    const {setTheme,resolvedTheme} = useTheme();
    return (
        <TooltipProvider>   
            <Tooltip>
                <TooltipTrigger asChild className={className} onClick={() => {
                    setTheme(resolvedTheme === "light" ? "dark" : "light");
                } }>
                    <Button variant="outline">
                        <SunIcon  className="block dark:hidden"/>
                        <MoonIcon className="hidden dark:block" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span className="hidden dark:inline">Enable Light Mode</span>
                    <span className="inline dark:hidden">Enable Dark Mode</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}