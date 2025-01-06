function Progress({ index, numQuestion, score, totalScore, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong> {score} </strong>/ {totalScore} points
      </p>
    </header>
  );
}

export default Progress;
