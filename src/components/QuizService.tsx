import axios from "axios";

const API_URL = "https://opentdb.com/api.php?amount=10";

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answer: string[];
}

export async function fetchQuestion(
  category: number,
  amount: number
): Promise<Question[]> {
  try {
    const response = await axios.get(API_URL, {
      params: {
        amount,
        category,
        type: "multiple",
      },
    });

    return response.data.results.map((result: any) => {
      return {
        question: result.question,
        correct_answer: result.correct_answer,
        incorrect_answer: result.incorrect_answer,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch");
  }
}
