import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainComponent from "./MainComponent";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import Finished from "./Finished";
import { NextComponent } from "./NextComponent";
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "quizStarted":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        score: 0,
        highscore: 0,
      };
    default:
      throw new Error("Action is unknown");
  }
}
const initialState = {
  questions: [],
  // loading error ready active finished
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highscore: 0,
};
function App() {
  const [{ questions, status, index, answer, score, highscore }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestion = questions.length;
  const totalScore = questions.reduce(
    (acc, currVal) => acc + currVal.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "dataFailed" });
      });
  }, []);
  return (
    <div className="app">
      <Header />
      <MainComponent>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestion}
              score={score}
              totalScore={totalScore}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextComponent
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestion={numQuestion}
            />
          </>
        )}
        {status === "finish" && (
          <Finished
            score={score}
            totalScore={totalScore}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </MainComponent>
    </div>
  );
}

export default App;
