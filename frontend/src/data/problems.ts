export interface Question {
  id: number;
  type: 'multiple_choice' | 'free_response';
  question: string;
  options?: string[];
  correct?: string;
  rubric?: string[];
}

export interface TestCase {
  input: string;
  expected: unknown;
}

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: number;
  problem_type: 'paper_analysis' | 'experiment_design' | 'replication' | 'pipeline';
  description: string;
  topic?: string;
  content_json: {
    type: string;
    paper_excerpt?: string;
    scenario?: string;
    description?: string;
    paper_reference?: string;
    starter_code?: string;
    hints?: string[];
    questions?: Question[];
    test_cases?: TestCase[];
  };
}

export const PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "Understanding Attention",
    slug: "understanding-attention",
    difficulty: 1,
    problem_type: "paper_analysis",
    topic: "Transformers",
    description: "Read an excerpt from 'Attention Is All You Need' and answer questions about the key concepts.",
    content_json: {
      type: "paper_analysis",
      paper_excerpt: `## Attention Is All You Need (Vaswani et al., 2017) - Excerpt

### Abstract
The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.

### 3.2 Attention
An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.

We call our particular attention "Scaled Dot-Product Attention". The input consists of queries and keys of dimension d_k, and values of dimension d_v. We compute the dot products of the query with all keys, divide each by sqrt(d_k), and apply a softmax function to obtain the weights on the values.

In practice, we compute the attention function on a set of queries simultaneously, packed together into a matrix Q. The keys and values are also packed together into matrices K and V.`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "What is the main architectural innovation proposed in this paper?",
          options: [
            "A) Using larger recurrent networks",
            "B) Combining CNNs with RNNs",
            "C) Using only attention mechanisms without recurrence or convolutions",
            "D) Adding more attention layers to existing RNN models"
          ],
          correct: "C"
        },
        {
          id: 2,
          type: "multiple_choice",
          question: "Why do the authors divide by sqrt(d_k) in scaled dot-product attention?",
          options: [
            "A) To make computation faster",
            "B) To prevent dot products from growing too large for high dimensions",
            "C) To normalize the output to be between 0 and 1",
            "D) To reduce memory usage"
          ],
          correct: "B"
        },
        {
          id: 3,
          type: "free_response",
          question: "Explain in your own words how the attention mechanism computes its output. What role do queries, keys, and values play?",
          rubric: [
            "mentions weighted sum of values",
            "mentions compatibility between query and key",
            "mentions softmax for weights"
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: "Gradient Descent Intuition",
    slug: "gradient-descent-intuition",
    difficulty: 1,
    problem_type: "experiment_design",
    topic: "Optimization",
    description: "Design an experiment to understand how learning rate affects gradient descent convergence.",
    content_json: {
      type: "experiment_design",
      scenario: `You want to understand how the learning rate hyperparameter affects the convergence of gradient descent when training a simple linear regression model.

Your goal is to design an experiment that clearly demonstrates the effect of different learning rates on:
1. Convergence speed
2. Final loss value
3. Stability of training

You have access to:
- A dataset with 1000 samples
- A simple linear regression model: y = wx + b
- Mean squared error loss function
- 1000 training iterations`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "Which of the following is the most important independent variable in this experiment?",
          options: [
            "A) The number of training samples",
            "B) The learning rate",
            "C) The final loss value",
            "D) The model architecture"
          ],
          correct: "B"
        },
        {
          id: 2,
          type: "free_response",
          question: "Design the experiment: What learning rate values would you test, and what metrics would you track? Explain your reasoning.",
          rubric: [
            "mentions testing multiple learning rates",
            "mentions tracking loss over iterations",
            "mentions comparing convergence behavior"
          ]
        },
        {
          id: 3,
          type: "free_response",
          question: "What results would you expect for a learning rate that is too large? Too small?",
          rubric: [
            "mentions divergence or oscillation for large learning rate",
            "mentions slow convergence for small learning rate",
            "mentions optimal range exists"
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: "Implement Softmax",
    slug: "implement-softmax",
    difficulty: 1,
    problem_type: "replication",
    topic: "Basics",
    description: "Implement the softmax function, a fundamental building block of neural networks.",
    content_json: {
      type: "replication",
      paper_reference: "Softmax function - foundational deep learning",
      description: `# Implement Softmax

The softmax function converts a vector of real numbers into a probability distribution. It's defined as:

softmax(x_i) = exp(x_i) / sum(exp(x_j) for all j)

For numerical stability, we typically subtract the maximum value before computing:

softmax(x_i) = exp(x_i - max(x)) / sum(exp(x_j - max(x)) for all j)

## Your Task

Implement the \`softmax\` function that:
1. Takes a list of numbers as input
2. Returns a list of probabilities that sum to 1
3. Handles numerical stability (hint: subtract the max)

## Function Signature
\`\`\`python
def softmax(x):
    # x is a list of numbers
    # return a list of probabilities
    pass
\`\`\``,
      starter_code: `def softmax(x):
    # Your implementation here
    # Hint: subtract max(x) for numerical stability
    pass

# Test your implementation
print(softmax([1.0, 2.0, 3.0]))`,
      test_cases: [
        { input: "softmax([1.0, 2.0, 3.0])", expected: [0.09003057317038046, 0.24472847105479767, 0.6652409557748219] },
        { input: "softmax([0.0, 0.0, 0.0])", expected: [0.3333333333333333, 0.3333333333333333, 0.3333333333333333] },
        { input: "softmax([1000.0, 1000.0])", expected: [0.5, 0.5] }
      ],
      hints: [
        "Remember to subtract the maximum for numerical stability",
        "Use math.exp() for the exponential function",
        "The output should sum to 1.0"
      ]
    }
  },
  {
    id: 4,
    title: "Implement Scaled Dot-Product Attention",
    slug: "scaled-dot-product-attention",
    difficulty: 3,
    problem_type: "replication",
    topic: "Transformers",
    description: "Implement the scaled dot-product attention mechanism from 'Attention Is All You Need'.",
    content_json: {
      type: "replication",
      paper_reference: "Attention Is All You Need (Vaswani et al., 2017)",
      description: `# Implement Scaled Dot-Product Attention

From the paper: "We compute the dot products of the query with all keys, divide each by sqrt(d_k), and apply a softmax function to obtain the weights on the values."

The formula is:
Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V

Where:
- Q is the query matrix (seq_len x d_k)
- K is the key matrix (seq_len x d_k)
- V is the value matrix (seq_len x d_v)
- d_k is the dimension of queries/keys

## Your Task

Implement scaled dot-product attention using only basic Python and math operations.`,
      starter_code: `import math

def softmax(x):
    # Helper: apply softmax to a 1D list
    max_x = max(x)
    exp_x = [math.exp(xi - max_x) for xi in x]
    sum_exp = sum(exp_x)
    return [e / sum_exp for e in exp_x]

def matmul(A, B):
    # Helper: multiply two 2D matrices
    rows_A, cols_A = len(A), len(A[0])
    rows_B, cols_B = len(B), len(B[0])
    result = [[0] * cols_B for _ in range(rows_A)]
    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                result[i][j] += A[i][k] * B[k][j]
    return result

def transpose(M):
    # Helper: transpose a 2D matrix
    return [[M[j][i] for j in range(len(M))] for i in range(len(M[0]))]

def scaled_attention(Q, K, V):
    # Implement scaled dot-product attention
    # Q, K, V are 2D lists (matrices)
    pass`,
      test_cases: [
        {
          input: "scaled_attention([[1.0, 0.0], [0.0, 1.0]], [[1.0, 0.0], [0.0, 1.0]], [[1.0, 2.0], [3.0, 4.0]])",
          expected: [[1.6224593312018544, 2.6224593312018544], [2.3775406687981456, 3.3775406687981456]]
        }
      ],
      hints: [
        "First compute Q * K^T using matmul and transpose",
        "Divide by sqrt(d_k) where d_k = number of columns in Q",
        "Apply softmax to each row",
        "Finally multiply by V"
      ]
    }
  },
  {
    id: 5,
    title: "Backpropagation Through Time",
    slug: "backprop-through-time",
    difficulty: 3,
    problem_type: "paper_analysis",
    topic: "RNNs",
    description: "Analyze the backpropagation through time algorithm and its challenges.",
    content_json: {
      type: "paper_analysis",
      paper_excerpt: `## Learning Long-Term Dependencies with Gradient Descent is Difficult (Bengio et al., 1994) - Excerpt

### Abstract
Recurrent neural networks can be used to map input sequences to output sequences. However, training them with gradient descent to learn long-term dependencies is difficult because of the vanishing gradient problem.

### The Vanishing Gradient Problem
When training recurrent neural networks using backpropagation through time (BPTT), gradients must flow backward through many time steps. At each step, the gradient is multiplied by the recurrent weight matrix.

If the largest eigenvalue of this matrix is less than 1, gradients exponentially decrease (vanish). If greater than 1, gradients exponentially increase (explode).

This makes it very difficult to learn dependencies between events that are many time steps apart.

### Implications
1. RNNs struggle to capture long-range dependencies
2. The network's "memory" is effectively limited
3. Training becomes unstable for long sequences`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "What causes gradients to vanish in BPTT?",
          options: [
            "A) The activation function saturates",
            "B) Repeated multiplication by weight matrices with eigenvalues < 1",
            "C) The learning rate is too small",
            "D) The sequences are too short"
          ],
          correct: "B"
        },
        {
          id: 2,
          type: "multiple_choice",
          question: "What happens when the largest eigenvalue of the recurrent weight matrix is greater than 1?",
          options: [
            "A) Gradients vanish",
            "B) Training converges faster",
            "C) Gradients explode",
            "D) The network learns better"
          ],
          correct: "C"
        },
        {
          id: 3,
          type: "free_response",
          question: "Based on this analysis, propose two possible solutions to the vanishing gradient problem in RNNs.",
          rubric: [
            "mentions gating mechanisms like LSTM or GRU",
            "mentions gradient clipping",
            "mentions skip connections or residual connections",
            "mentions better weight initialization"
          ]
        }
      ]
    }
  },
  {
    id: 6,
    title: "Design an Ablation Study",
    slug: "design-ablation-study",
    difficulty: 3,
    problem_type: "experiment_design",
    topic: "Methodology",
    description: "Learn to design proper ablation studies to understand which components contribute to model performance.",
    content_json: {
      type: "experiment_design",
      scenario: `You have developed a new image classification model with the following components:

1. **Data Augmentation**: Random crops, flips, and color jittering
2. **Architecture**: ResNet-50 with squeeze-and-excitation (SE) blocks
3. **Training Tricks**:
   - Label smoothing (0.1)
   - Mixup augmentation
   - Cosine learning rate schedule
4. **Regularization**: Dropout (0.5) and weight decay (1e-4)

Your model achieves 85% accuracy on the test set. A reviewer asks: "Which components are actually necessary for this performance?"

You need to design an ablation study to answer this question.`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "What is the primary purpose of an ablation study?",
          options: [
            "A) To make the model faster",
            "B) To understand the contribution of each component",
            "C) To find the best hyperparameters",
            "D) To compare with other models"
          ],
          correct: "B"
        },
        {
          id: 2,
          type: "free_response",
          question: "Design the ablation study: List at least 4 specific experiments you would run, and what each would tell you.",
          rubric: [
            "mentions baseline without all additions",
            "mentions removing one component at a time",
            "mentions measuring impact on accuracy",
            "mentions controlling for other variables"
          ]
        },
        {
          id: 3,
          type: "free_response",
          question: "What potential issues could arise in your ablation study, and how would you address them?",
          rubric: [
            "mentions computational cost",
            "mentions interactions between components",
            "mentions need for multiple runs or statistical testing",
            "mentions fair comparison"
          ]
        }
      ]
    }
  },
  {
    id: 7,
    title: "Implement Multi-Head Attention",
    slug: "multi-head-attention",
    difficulty: 4,
    problem_type: "replication",
    topic: "Transformers",
    description: "Implement multi-head attention, allowing the model to attend to information from different subspaces.",
    content_json: {
      type: "replication",
      paper_reference: "Attention Is All You Need (Vaswani et al., 2017)",
      description: `# Implement Multi-Head Attention

From the paper: "Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions."

MultiHead(Q, K, V) = Concat(head_1, ..., head_h) * W_O

where head_i = Attention(Q * W_Q^i, K * W_K^i, V * W_V^i)

For this simplified version:
- Assume Q, K, V are already the projected inputs
- Implement splitting into heads, attention, and concatenation
- Number of heads divides evenly into the dimension`,
      starter_code: `import math

def softmax(x):
    max_x = max(x)
    exp_x = [math.exp(xi - max_x) for xi in x]
    sum_exp = sum(exp_x)
    return [e / sum_exp for e in exp_x]

def scaled_attention(Q, K, V):
    # Your scaled attention implementation
    pass

def multi_head_attention(Q, K, V, num_heads):
    # Implement multi-head attention
    # Q, K, V: seq_len x d_model
    # num_heads: number of heads (d_model must be divisible by num_heads)
    # Returns: seq_len x d_model
    pass`,
      test_cases: [
        {
          input: "multi_head_attention([[1.0, 0.0, 0.0, 0.0], [0.0, 1.0, 0.0, 0.0]], [[1.0, 0.0, 0.0, 0.0], [0.0, 1.0, 0.0, 0.0]], [[1.0, 2.0, 3.0, 4.0], [5.0, 6.0, 7.0, 8.0]], 2)",
          expected: [[2.689414213699951, 3.689414213699951, 4.689414213699951, 5.689414213699951], [3.310585786300049, 4.310585786300049, 5.310585786300049, 6.310585786300049]]
        }
      ],
      hints: [
        "Split each matrix into num_heads parts along the last dimension",
        "Apply scaled_attention to each head independently",
        "Concatenate the results along the last dimension"
      ]
    }
  },
  {
    id: 8,
    title: "Reproduce MNIST Results",
    slug: "reproduce-mnist",
    difficulty: 3,
    problem_type: "pipeline",
    topic: "End-to-end",
    description: "Complete an end-to-end research pipeline: read about a result, implement it, and analyze your findings.",
    content_json: {
      type: "pipeline",
      description: `# Research Pipeline: MNIST Classification

This is a multi-step problem that takes you through the complete research pipeline.

## Background
The MNIST dataset is a classic benchmark for image classification. A simple neural network can achieve >95% accuracy.

## Your Tasks
Complete each step of the research pipeline below.`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "What is the input dimension for MNIST images?",
          options: [
            "A) 28 x 28 = 784 pixels",
            "B) 32 x 32 = 1024 pixels",
            "C) 64 x 64 = 4096 pixels",
            "D) 256 x 256 = 65536 pixels"
          ],
          correct: "A"
        },
        {
          id: 2,
          type: "free_response",
          question: "Design a simple neural network for MNIST. Describe: number of layers, activation functions, and output layer design.",
          rubric: [
            "mentions hidden layers",
            "mentions activation function like ReLU",
            "mentions softmax output for 10 classes",
            "mentions reasonable layer sizes"
          ]
        }
      ]
    }
  },
  {
    id: 9,
    title: "Critique a Methodology",
    slug: "critique-methodology",
    difficulty: 4,
    problem_type: "paper_analysis",
    topic: "Critical Thinking",
    description: "Develop critical thinking skills by identifying methodological issues in research papers.",
    content_json: {
      type: "paper_analysis",
      paper_excerpt: `## A Fictional Study: "SuperNet Achieves State-of-the-Art Results"

### Abstract
We present SuperNet, a novel architecture that achieves state-of-the-art results on ImageNet classification. Our model achieves 95% top-1 accuracy, surpassing all previous methods.

### Methods
- We trained SuperNet on a custom dataset of 10 million images collected from the internet
- Training took 2 weeks on 64 TPUs
- We used extensive data augmentation including our novel "SuperAug" technique
- Hyperparameters were tuned using the test set to ensure best performance
- We compare against ResNet-50 trained for 90 epochs with default settings

### Results
SuperNet achieves 95% accuracy on ImageNet, compared to 76% for ResNet-50.

### Conclusion
SuperNet is clearly the best image classification model and should be used for all applications.`,
      questions: [
        {
          id: 1,
          type: "multiple_choice",
          question: "What is the most serious methodological flaw in this study?",
          options: [
            "A) The model is too large",
            "B) Hyperparameters were tuned on the test set",
            "C) Training took too long",
            "D) The dataset was too small"
          ],
          correct: "B"
        },
        {
          id: 2,
          type: "free_response",
          question: "List at least 3 methodological problems with this study and explain why each is problematic.",
          rubric: [
            "mentions test set hyperparameter tuning (data leakage)",
            "mentions unfair baseline comparison",
            "mentions unreproducible custom dataset",
            "mentions overstated claims",
            "mentions lack of ablation study"
          ]
        },
        {
          id: 3,
          type: "free_response",
          question: "How would you redesign this study to make it more rigorous?",
          rubric: [
            "mentions validation set for hyperparameter tuning",
            "mentions fair baseline comparison with same compute",
            "mentions standard benchmark datasets",
            "mentions ablation study",
            "mentions multiple runs"
          ]
        }
      ]
    }
  },
  {
    id: 10,
    title: "Your First Research Question",
    slug: "first-research-question",
    difficulty: 5,
    problem_type: "pipeline",
    topic: "Full Cycle",
    description: "The ultimate challenge: formulate a research question, design experiments, and plan your investigation.",
    content_json: {
      type: "pipeline",
      description: `# Your First Research Question

Congratulations on reaching the final challenge! This problem guides you through formulating and planning a research investigation.

## Context
You've noticed that different activation functions (ReLU, GELU, Swish) seem to work better for different tasks, but you don't understand why. You want to investigate this.

## Your Mission
Complete each step to develop a research plan.`,
      questions: [
        {
          id: 1,
          type: "free_response",
          question: "Formulate a specific, testable research question about activation functions. A good research question should be focused, measurable, and novel.",
          rubric: [
            "mentions specific activation functions",
            "mentions measurable outcome",
            "mentions controlled comparison",
            "question is focused and answerable"
          ]
        },
        {
          id: 2,
          type: "free_response",
          question: "Design an experiment to answer your research question. Include: datasets, models, metrics, baselines, and controls.",
          rubric: [
            "mentions multiple datasets",
            "mentions controlled model architecture",
            "mentions appropriate metrics",
            "mentions baseline comparisons",
            "mentions controlling for hyperparameters"
          ]
        },
        {
          id: 3,
          type: "free_response",
          question: "What results would support or refute your hypothesis? How would you interpret different outcomes?",
          rubric: [
            "mentions expected patterns in results",
            "mentions statistical significance",
            "mentions alternative explanations",
            "mentions limitations of conclusions"
          ]
        },
        {
          id: 4,
          type: "multiple_choice",
          question: "If your results show that GELU consistently outperforms ReLU, what should you do next?",
          options: [
            "A) Publish immediately claiming GELU is always better",
            "B) Run ablation studies and test on more diverse tasks",
            "C) Abandon the research and try something else",
            "D) Only report the successful experiments"
          ],
          correct: "B"
        }
      ]
    }
  }
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return PROBLEMS.find(p => p.slug === slug);
}

export function filterProblems(filters: {
  difficulty?: number;
  problem_type?: string;
  topic?: string;
}): Problem[] {
  return PROBLEMS.filter(p => {
    if (filters.difficulty && p.difficulty !== filters.difficulty) return false;
    if (filters.problem_type && p.problem_type !== filters.problem_type) return false;
    if (filters.topic && !p.topic?.toLowerCase().includes(filters.topic.toLowerCase())) return false;
    return true;
  });
}
