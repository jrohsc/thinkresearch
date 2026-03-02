interface ProblemViewProps {
  title: string;
  difficulty: number;
  description: string;
  children: React.ReactNode;
}

const DIFFICULTY_LABELS = ['', 'Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard'];

export default function ProblemView({
  title,
  difficulty,
  description,
  children,
}: ProblemViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
            {DIFFICULTY_LABELS[difficulty]}
          </span>
        </div>
        <p className="text-slate-400">{description}</p>
      </div>
      {children}
    </div>
  );
}
