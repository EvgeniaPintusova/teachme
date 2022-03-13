import React from "react";
import { Link } from "react-router-dom";
import congratsFon from "../../assets/fon3.png";

import "./Congrats.css";

export default () => (
  <section className="test congratsWrap">
    <div className="congrats">
      <div className="text">
        <h1 className="finish_text">
          Поздравляю!
          <br />
          Вы прошли тему!
        </h1>
        <Link className="answer_button" to="/learn">
          <button className="submit">Вернуться к темам</button>
        </Link>
      </div>
      <figure>
        <img src={congratsFon} alt="congrats" />
      </figure>
    </div>
  </section>
);
