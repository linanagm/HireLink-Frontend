export default function StatCard({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-slate-700">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
