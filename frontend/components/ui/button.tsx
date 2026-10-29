import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b2a52]/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "border-[#0e1316] bg-[#0e1316] text-white hover:bg-[#27313a]",
        outline: "border-[#e7e5e4] bg-white text-[#202124] hover:bg-[#f7f7f5]",
        ghost: "border-transparent bg-transparent text-[#454545] hover:bg-[#f4f3f0]",
        destructive: "border-[#b91c1c] bg-[#b91c1c] text-white hover:bg-[#991b1b]",
        link: "min-h-0 border-0 bg-transparent p-0 text-[#1b2a52] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10",
        sm: "h-8 min-h-8 px-3 text-xs",
        lg: "h-11 px-5",
        icon: "size-10 min-h-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const buttonClassName = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      const child = React.Children.only(props.children);
      if (!React.isValidElement(child)) {
        throw new Error("Button with asChild requires a single React element child.");
      }

      const childProps = child.props as React.HTMLAttributes<HTMLElement>;
      return React.cloneElement(child as React.ReactElement<any>, {
        ...props,
        ...childProps,
        className: cn(buttonClassName, childProps.className),
        ref,
      });
    }

    return <button ref={ref} className={buttonClassName} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
