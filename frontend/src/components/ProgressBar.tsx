interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export default function ProgressBar({ value, max, className = '' }: ProgressBarProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className={`h-2 bg-slate-700 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-emerald-600 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
