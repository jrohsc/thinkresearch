import { useState, useEffect } from 'react';

export interface ProblemProgress {
  status: 'not_started' | 'in_progress' | 'completed';
  bestScore: number;
  attempts: number;
  lastAttempt?: string;
}

export interface UserStats {
  totalXp: number;
  level: number;
  completedCount: number;
  inProgressCount: number;
}

const STORAGE_KEY = 'thinkresearch_progress';

function loadProgress(): Record<string, ProblemProgress> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: Record<string, ProblemProgress>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, ProblemProgress>>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const getProblemProgress = (slug: string): ProblemProgress => {
    return progress[slug] || { status: 'not_started', bestScore: 0, attempts: 0 };
  };

  const updateProgress = (slug: string, score: number, _difficulty: number) => {
    setProgress(prev => {
      const current = prev[slug] || { status: 'not_started', bestScore: 0, attempts: 0 };
      const newProgress: ProblemProgress = {
        status: score >= 70 ? 'completed' : 'in_progress',
        bestScore: Math.max(current.bestScore, score),
        attempts: current.attempts + 1,
        lastAttempt: new Date().toISOString(),
      };
      return { ...prev, [slug]: newProgress };
    });
  };

  const getStats = (): UserStats => {
    const entries = Object.values(progress);
    const completedCount = entries.filter(p => p.status === 'completed').length;
    const inProgressCount = entries.filter(p => p.status === 'in_progress').length;

    // Calculate XP: sum of best scores
    const totalXp = entries.reduce((sum, p) => sum + Math.round(p.bestScore), 0);
    const level = Math.floor(totalXp / 100) + 1;

    return { totalXp, level, completedCount, inProgressCount };
  };

  const resetProgress = () => {
    setProgress({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return { getProblemProgress, updateProgress, getStats, progress, resetProgress };
}
