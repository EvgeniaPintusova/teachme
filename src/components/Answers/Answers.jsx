import React from "react";


export default ({
  number,
  submit,
  inputs,
  question,
  onChange,
  previewQuestion
}) => (
  <div className="test-container">
    <div className="question" dangerouslySetInnerHTML={{__html: question.question}}/>
    {question && (
      <ul className="answers">
        {question.answers.map((answer, id) => (
          <li key={answer.id + id + question.question} className="answer">
            <label>
              <input
                onChange={onChange}
                type="checkbox"
                ref={input => (inputs[id] = input)}
                value={answer.id}
              />
              <span>{answer.answer}</span>
            </label>
          </li>
        ))}
      </ul>
    )}
    <div className="navigation">
      <div className="answer_button">
        <button className="submit" type="submit" onClick={submit}>Submit</button>
      </div>
      {number > 0 && (
        <div className="answer_button prew">
          <button onClick={previewQuestion}>Back</button>
        </div>
      )}
    </div>
  </div>
);
