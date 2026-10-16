import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "../../lib/utils";

export function Dialog(props: BaseDialog.Root.Props) {
  return <BaseDialog.Root {...props} />;
}

export function DialogTrigger(props: BaseDialog.Trigger.Props) {
  return <BaseDialog.Trigger {...props} />;
}

export function DialogPortal(props: BaseDialog.Portal.Props) {
  return <BaseDialog.Portal {...props} />;
}

export function DialogOverlay({ className, ...props }: BaseDialog.Backdrop.Props) {
  return (
    <BaseDialog.Backdrop
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  ...props
}: BaseDialog.Popup.Props) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <BaseDialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
        <BaseDialog.Close
          aria-label="Κλείσιμο"
          className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center rounded text-muted-foreground hover:text-foreground"
        >
          ✕
        </BaseDialog.Close>
      </BaseDialog.Popup>
    </DialogPortal>
  );
}

export function DialogTitle(props: BaseDialog.Title.Props) {
  return <BaseDialog.Title {...props} />;
}

export function DialogDescription(props: BaseDialog.Description.Props) {
  return <BaseDialog.Description {...props} />;
}
