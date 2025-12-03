import { cn } from "@/lib/utils";

type ContentBlockProp = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProp) {
  return (
    <div
      className={cn(
        "bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden w-full h-full",
        className
      )}
    >
      <div className="h-full overflow-y-auto">{children}</div>
    </div>
  );
}
