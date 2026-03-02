# ThinkResearch: LeetCode for Research

A platform that teaches research methodology through progressive, hands-on challenges. Learn to read papers, design experiments, implement algorithms, and develop research intuition.

## Live Demo

Visit: https://jrohsc.github.io/thinkresearch/

## Features

- **Paper Analysis**: Read paper excerpts and answer comprehension questions
- **Experiment Design**: Design experiments given research questions and constraints
- **Replication Coding**: Implement algorithms from papers (with code editor)
- **Research Pipeline**: Complete end-to-end research projects
- **Progress Tracking**: localStorage-based progress saved in your browser

## Quick Start (Development)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

## Deploy to GitHub Pages

1. Update `vite.config.ts` to set the correct base path:
   ```ts
   base: '/your-repo-name/',
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to GitHub Pages using:
   - GitHub Actions (recommended)
   - Or manually push to `gh-pages` branch

### GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install and Build
        run: |
          cd frontend
          npm ci
          npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

## Problem Types

| Type | Description | Grading |
|------|-------------|---------|
| Paper Analysis | Read excerpts, answer comprehension questions | Multiple choice + keyword matching |
| Experiment Design | Design experiments, choose metrics | Keyword matching rubric |
| Replication | Implement algorithms with code editor | Manual (static mode) |
| Pipeline | Full research workflow | Mixed |

## 10 Problems Included

1. **Understanding Attention** (Paper Analysis, Easy) - Transformers
2. **Gradient Descent Intuition** (Experiment Design, Easy) - Optimization
3. **Implement Softmax** (Replication, Easy) - Basics
4. **Scaled Dot-Product Attention** (Replication, Medium) - Transformers
5. **Backpropagation Through Time** (Paper Analysis, Medium) - RNNs
6. **Design an Ablation Study** (Experiment Design, Medium) - Methodology
7. **Multi-Head Attention** (Replication, Hard) - Transformers
8. **Reproduce MNIST Results** (Pipeline, Medium) - End-to-end
9. **Critique a Methodology** (Paper Analysis, Hard) - Critical Thinking
10. **Your First Research Question** (Pipeline, Hard) - Full Cycle

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **localStorage** for progress persistence

## Project Structure

```
frontend/
├── src/
│   ├── data/
│   │   └── problems.ts      # All problem content
│   ├── hooks/
│   │   └── useProgress.ts   # localStorage progress tracking
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Problems.tsx
│   │   ├── Problem.tsx
│   │   └── Profile.tsx
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Adding New Problems

Edit `src/data/problems.ts` and add a new problem object:

```typescript
{
  id: 11,
  title: "Your Problem Title",
  slug: "your-problem-slug",
  difficulty: 2,  // 1-5
  problem_type: "paper_analysis",  // or experiment_design, replication, pipeline
  topic: "Your Topic",
  description: "Brief description",
  content_json: {
    type: "paper_analysis",
    paper_excerpt: "...",
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Question text?",
        options: ["A) ...", "B) ...", "C) ...", "D) ..."],
        correct: "B"
      },
      {
        id: 2,
        type: "free_response",
        question: "Open-ended question?",
        rubric: ["mentions keyword1", "mentions keyword2"]
      }
    ]
  }
}
```

## License

MIT
