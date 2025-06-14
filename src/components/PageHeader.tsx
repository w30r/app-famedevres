import { cn } from "@/lib/utils"

export default function PageHeader({ title, className }: { title: string, className?: string }) {
  return (
    <div className={cn("self-start mb-6", className)}>
      <h2 className="text-4xl font-bold">{title}</h2>
    </div>
  );
}
