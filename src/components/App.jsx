import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainComponent from "./MainComponent";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "quizStarted":
      return { ...state, status: "active" };
    default:
      throw new Error("Action is unknown");
  }
}
const initialState = {
  questions: [],
  // loading error ready active finished
  status: "loading",
  index: 0,
};
function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestion = questions.length;
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
        {status === "active" && <Question question={questions[index]} />}
      </MainComponent>
    </div>
  );
}

export default App;
