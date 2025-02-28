More AI is used, more is the chance of catastrophic failure. A case exists of man committing suicide after chatbot suggested it to. (!)

Without a clear understanding of where the system fails, no amount of evaluation or metrics can make the system robust.

Because evaluation is difficult, many people settle for word of mouth.

Using human evaluation remains a necessary option for many models. But that is slow. Rising start is using AI as a judge.

# Challenge of Evaluating Models

1. More intelligent AI models become, more difficult it is to evaluate them. We need domain experts to fact-check and reason.

2. With traditional ML, tasks are close-ended. For Generative AI, there are many possible correct responses.

Most people have just a small set of prompts that they use to evaluate a model.

# Language Modeling Metrics

Cross Entropy, Perplexity, Bits-per-character, Bits-per-Byte.

Technically, a language model learns the probability distribution of its training data.

## Functional Correctness

Similar to unit tests. Can be used for models code generation ability, playing games, or any tasks which can be empirically measured.

## Similarity Measure Against Reference Data

Translation tasks can be measured against _ground truths_. This approach is bottlenecked by how much and how fast _ground truths_ can be generated.

### 1. Exact Match

For Factual Questions

### 2. Lexical Similarity

Measures how much 2 texts overlap. "Approximate String Matching". Common metrics for lexical similarity are BLEU, ROUGE, etc.

### 3. Semantic Similarity

Similarity score between vector embeddings.

## AI as a judge

- Most AI evaluation tools use AI as a judge in 1 way or another.

- They are good enough to guide an app's development.

- Different AI evaluation tools use different criteria

1. MLFlow.metrics use Faithfulness, relevance
2. Langchain Criteria-Evaluation uses Conciseness, relevance, correctness, coherence, misoginy, criminality, etc
3. Ragas Faithfulness, answer relevance
4. Llamaindex
5. Azureflow

- Using AI as a judge requires some crafty prompt engineering.

### Limitations of AI as a judge

- Inconsistency - Due to probabilistic nature of model.
- Criteria Ambiguity - For eg Different AI judge can have "relevancy" as a criteria but they may 'define' _relevancy_ different based on their prompt.
- Increased cost.
- Can generate wildly different results based on different models.

- **Biases**

1. Humans have recency-bias. AI models have first position bias.

- **Should we use a stronger model as a judge ?** Some argue that judge can be weaker because the task is not that intensive.

- Using the same model to judge itself is cheating.

## Ranking Model With Comparative Evaluation

Preference based voting works only if the voters are knowledgeable in the subject.

# Challenges of Comparative Evaluation

1. Scalability Bottlenecks.
2. 
