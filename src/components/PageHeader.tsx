export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="self-start mb-6">
      <h1>{title}</h1>
    </div>
  );
}
