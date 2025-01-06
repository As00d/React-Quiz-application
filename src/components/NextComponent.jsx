import React from "react";
export function NextComponent({ dispatch, answer, index, numQuestion }) {
  console.log(answer);
  console.log(index);
  console.log(numQuestion);

  if (answer === null) return null;
  if (index < numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "nextQuestion",
          })
        }
      >
        Next
      </button>
    );
  if (index === numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "finish",
          })
        }
      >
        Finish
      </button>
    );
}
