import { useEffect, useState } from "react";
import Header from "./components/Header";
import Question from "./components/Question";
import Timer from "./components/Timer";
import Score from "./components/Score";
import {
  fetchQuestion,
  Question as QuestionType,
} from "./components/QuizService";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    async function fetchQuizQuestion() {
      try {
        const fetchedQuestion = await fetchQuestion(9, 5);
        setQuestions(fetchedQuestion);
      } catch (error) {
        console.error("error fetching:", error);
      }
    }

    fetchQuizQuestion();
  }, []);

  const handleAnswerSelect = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct_answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("Completed");
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <Header />
      <Question
        question={currentQuestion.question}
        options={[
          ...currentQuestion.incorrect_answer,
          currentQuestion.correct_answer,
        ]}
        onSelectOptions={handleAnswerSelect}
      />
      <Timer duration={10} onTimeUp={goToNextQuestion} />
      <Score score={score} />
    </div>
  );
};

export default App;
