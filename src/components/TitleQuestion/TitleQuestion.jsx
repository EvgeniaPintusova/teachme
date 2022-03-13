import React from "react";

export default ({
  number,
  question,
  nextQuestion,
  previewQuestion
}) => (
  <div className="test-container">
    <div className="question" dangerouslySetInnerHTML={{__html: question.question}}/>
    <div className="navigation">
      <div onClick={nextQuestion} className="answer_button">
        <button type="submit">Next</button>
      </div>
      {number > 0 && (
        <div className="answer_button prew">
          <button onClick={previewQuestion}>Back</button>
        </div>
      )}
    </div>
  </div>
);
