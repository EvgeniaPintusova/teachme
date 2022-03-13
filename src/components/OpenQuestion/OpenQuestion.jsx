import React, { useState } from "react";
import "./OpenQuestion.css";

export default ({ number, submit, inputs, question, previewQuestion }) => {
  const [inputValue, setInput] = useState("");
  return (
    <div className="test-container">
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <label className="open_question">
        <span>{question.answers[0].answer}</span>
        <input
          onChange={e => setInput(e.target.value)}
          ref={input => (inputs[0] = input)}
          value={inputValue}
        />
      </label>
      <div className="navigation">
        <div className="answer_button">
          <button
            onClick={() => {
              submit();
              setInput('')
            }}
            className="submit"
            type="submit"
          >
            Submit
          </button>
        </div>
        {number > 0 && (
          <div className="answer_button prew">
            <button onClick={previewQuestion}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
};
