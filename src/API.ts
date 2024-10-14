// import { shuffleArray } from "./utils";

// export type Question = {
//   category: string;
//   correct_answer: string;
//   difficulty: string;
//   incorrect_answers: string[];
//   question: string;
//   type: string;
// };

// export type QuestionState = Question & { answers: string[] };

// export enum Difficulty {
//   EASY = "easy",
//   MEDIUM = "medium",
//   HARD = "hard",
// }

// export const fetchQuizQuestions = async (
//   amount: number,
//   Difficulty: Difficulty
// ) => {
//   const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${Difficulty}&type=multiple`;
//   const data = await (await fetch(endpoint)).json();
//  console.log(data.results);
 
//   return data.results.map((question: Question) => ({
//     ...question,
//     answers: shuffleArray([
//       ...question.incorrect_answers,
//       question.correct_answer,
//     ]),
//   }));
// };



import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

/**
 * Fetches quiz questions from the Open Trivia Database API.
 * 
 * @param amount - The number of questions to fetch.
 * @param difficulty - The difficulty level of the questions.
 * @returns A promise that resolves to an array of QuestionState objects.
 */
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);

    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if results exist in the response
    if (!data.results || data.results.length === 0) {
      console.error("No results found in API response.");
      return [];
    }

    console.log(`Fetched ${data.results.length} questions successfully.`);

    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return []; // Return an empty array on error
  }
};


