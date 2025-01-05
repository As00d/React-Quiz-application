function Options({ question, dispatch, answer }) {
  const hasAnswered = answer != null;
  return (
    <>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <button
              className={`btn btn-option ${index === answer ? "answer" : ""} ${
                hasAnswered
                  ? index === question.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              key={option}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
              disabled={hasAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div>
        {hasAnswered && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default Options;
