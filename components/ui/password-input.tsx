"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export const PasswordInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} className={className} ref={ref} {...props} />
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0 h-auto w-auto"
        onClick={() => setShowPassword(!showPassword)}
        type="button"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
      </Button>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"
