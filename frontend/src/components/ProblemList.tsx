import { Link } from 'react-router-dom';

interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: number;
  problem_type: string;
  description: string;
  topic?: string;
}

interface ProblemListProps {
  problems: Problem[];
}

const DIFFICULTY_LABELS = ['', 'Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard'];
const DIFFICULTY_COLORS = [
  '',
  'text-green-400',
  'text-green-300',
  'text-yellow-400',
  'text-orange-400',
  'text-red-400',
];

const TYPE_ICONS: Record<string, string> = {
  paper_analysis: '📄',
  experiment_design: '🔬',
  replication: '💻',
  pipeline: '🔄',
};

const TYPE_LABELS: Record<string, string> = {
  paper_analysis: 'Paper Analysis',
  experiment_design: 'Experiment Design',
  replication: 'Replication',
  pipeline: 'Pipeline',
};

export default function ProblemList({ problems }: ProblemListProps) {
  if (problems.length === 0) {
    return <div className="text-slate-400 text-center py-12">No problems found</div>;
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <Link
          key={problem.id}
          to={`/problems/${problem.slug}`}
          className="block bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 rounded-lg p-6 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{TYPE_ICONS[problem.problem_type]}</span>
                <h2 className="text-xl font-semibold text-white">{problem.title}</h2>
              </div>
              <p className="text-slate-400 mb-3">{problem.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className={DIFFICULTY_COLORS[problem.difficulty]}>
                  {DIFFICULTY_LABELS[problem.difficulty]}
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">{TYPE_LABELS[problem.problem_type]}</span>
                {problem.topic && (
                  <>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400">{problem.topic}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
