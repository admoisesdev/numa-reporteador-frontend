import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "presentation/lib/utils";

const alertVariants = cva(
  "flex flex-col gap-2 w-full border p-2 px-3 shadow-sm border-l-4 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-l-border-l-destructive",
        destructive: "dark:border-red-700 [&>svg]:text-red-700 border-red-700",
        success:
          "dark:border-emerald-700 [&>svg]:text-emerald-700 border-emerald-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "font-semibold text-gray-600 leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
