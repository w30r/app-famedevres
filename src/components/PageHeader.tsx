export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="self-start mb-6">
      <h2 className="text-4xl font-bold">{title}</h2>
    </div>
  );
}
