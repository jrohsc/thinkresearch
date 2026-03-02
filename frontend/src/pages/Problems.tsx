import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROBLEMS, filterProblems } from '../data/problems';
import { useProgress } from '../hooks/useProgress';

const DIFFICULTY_LABELS = ['', 'Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard'];
const DIFFICULTY_COLORS = ['', 'text-green-400', 'text-green-300', 'text-yellow-400', 'text-orange-400', 'text-red-400'];

const TYPE_LABELS: Record<string, string> = {
  paper_analysis: 'Paper Analysis',
  experiment_design: 'Experiment Design',
  replication: 'Replication',
  pipeline: 'Pipeline',
};

const TYPE_ICONS: Record<string, string> = {
  paper_analysis: '📄',
  experiment_design: '🔬',
  replication: '💻',
  pipeline: '🔄',
};

export default function Problems() {
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const { getProblemProgress } = useProgress();

  const problems = filterProblems({
    difficulty: difficultyFilter || undefined,
    problem_type: typeFilter || undefined,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Problems</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-slate-400 text-sm mb-1">Difficulty</label>
          <select
            value={difficultyFilter || ''}
            onChange={(e) => setDifficultyFilter(e.target.value ? parseInt(e.target.value) : null)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
          >
            <option value="">All Difficulties</option>
            {[1, 2, 3, 4, 5].map((d) => (
              <option key={d} value={d}>
                {DIFFICULTY_LABELS[d]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-sm mb-1">Type</label>
          <select
            value={typeFilter || ''}
            onChange={(e) => setTypeFilter(e.target.value || null)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
          >
            <option value="">All Types</option>
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Problem List */}
      <div className="space-y-4">
        {problems.map((problem) => {
          const progress = getProblemProgress(problem.slug);
          return (
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
                    {progress.status === 'completed' && (
                      <span className="text-green-400 text-sm">✓ Completed</span>
                    )}
                    {progress.status === 'in_progress' && (
                      <span className="text-yellow-400 text-sm">In Progress</span>
                    )}
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
                    {progress.bestScore > 0 && (
                      <>
                        <span className="text-slate-500">|</span>
                        <span className="text-emerald-400">Best: {progress.bestScore.toFixed(0)}%</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
