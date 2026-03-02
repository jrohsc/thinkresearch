import { PROBLEMS } from '../data/problems';
import { useProgress } from '../hooks/useProgress';

const TYPE_LABELS: Record<string, string> = {
  paper_analysis: 'Paper Analysis',
  experiment_design: 'Experiment Design',
  replication: 'Replication',
  pipeline: 'Pipeline',
};

export default function Profile() {
  const { getStats, progress, resetProgress } = useProgress();
  const stats = getStats();

  const completedByDifficulty: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const completedByType: Record<string, number> = {
    paper_analysis: 0,
    experiment_design: 0,
    replication: 0,
    pipeline: 0,
  };

  // Calculate stats by difficulty and type
  for (const problem of PROBLEMS) {
    const p = progress[problem.slug];
    if (p?.status === 'completed') {
      completedByDifficulty[problem.difficulty]++;
      completedByType[problem.problem_type]++;
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-slate-800 rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Your Progress</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-400">{stats.level}</div>
            <div className="text-slate-400">Level</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{stats.totalXp}</div>
            <div className="text-slate-400">XP Points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{stats.completedCount}</div>
            <div className="text-slate-400">Completed</div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Progress Overview</h2>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-white">
              {stats.completedCount} / {PROBLEMS.length}
            </span>
          </div>
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all"
              style={{
                width: `${(stats.completedCount / PROBLEMS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{stats.completedCount}</div>
            <div className="text-sm text-slate-400">Completed</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">{stats.inProgressCount}</div>
            <div className="text-sm text-slate-400">In Progress</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-slate-400">
              {PROBLEMS.length - stats.completedCount - stats.inProgressCount}
            </div>
            <div className="text-sm text-slate-400">Not Started</div>
          </div>
        </div>
      </div>

      {/* By Difficulty and Type */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">By Difficulty</h2>
          <div className="space-y-3">
            {['Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard'].map((label, i) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-slate-400">{label}</span>
                <span className="text-white">{completedByDifficulty[i + 1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">By Type</h2>
          <div className="space-y-3">
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-slate-400">{label}</span>
                <span className="text-white">{completedByType[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all progress?')) {
              resetProgress();
            }
          }}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
