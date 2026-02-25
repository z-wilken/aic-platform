import * as React from "react";
import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-aic-muted border-gray-200 flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-aic-copper focus-visible:ring-2 focus-visible:ring-aic-copper/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
