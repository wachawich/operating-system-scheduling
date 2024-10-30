import * as React from "react"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 text-xs",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md text-xs h-10",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-4 w-15 px-3 text-xs",
  }

  return (
    <button
      ref={ref}
      className={`h-8 inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-xs ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }