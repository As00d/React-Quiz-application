function Finished({ score, totalScore, highscore, dispatch }) {
  const percentage = (score / totalScore) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of{" "}
        <strong>{totalScore} </strong> ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={dispatch({ type: "restart" })}>
        Restart
      </button>
    </>
  );
}

export default Finished;
