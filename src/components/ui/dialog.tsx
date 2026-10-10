"use client";
import { Dialog as Primitive } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogTitle = Primitive.Title;
export const DialogDescription = Primitive.Description;
export function DialogContent({
  children,
  className,
  onOpenAutoFocus,
  onCloseAutoFocus,
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  const previousFocus = useRef<HTMLElement | null>(null);
  return (
    <Primitive.Portal>
      <Primitive.Overlay className="dialog-overlay" />
      <Primitive.Content
        className={cn("dialog-content", className)}
        {...props}
        onOpenAutoFocus={(event) => {
          previousFocus.current = document.activeElement as HTMLElement;
          onOpenAutoFocus?.(event);
        }}
        onCloseAutoFocus={(event) => {
          onCloseAutoFocus?.(event);
          if (!event.defaultPrevented && previousFocus.current?.isConnected) {
            event.preventDefault();
            previousFocus.current.focus();
          }
        }}
      >
        {children}
        <Primitive.Close className="dialog-close" aria-label="Fechar">
          <X size={22} />
        </Primitive.Close>
      </Primitive.Content>
    </Primitive.Portal>
  );
}
