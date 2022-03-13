import React from "react";

import { Link } from "react-router-dom";

import fon from "../../../assets/fon.png";
import leftSystem from "../../../assets/dosist.png";
import rightSystem from "../../../assets/sistema.png";
import fon2 from "../../../assets/fon2.png";

import { NavLink } from "../../NavigationButton/NavigationButton";

import "./Home.css";

export default ({ isAuth }) => {
  document.title = "TeachMe";
  return (
    <>
      <section className="home">
        <img className="fon" src={fon} alt="fon" />
        <div className="description">
          <h1 className="title">Добро пожаловать на TeachMe!</h1>
          <p className="about">
            TeachMe — cистема обучения английскому языку по авторской методике
            Блинковой Лидии Михайловны.
          </p>
          <p className="about">
            Обучение построено на основе теста, который имеет теоретическую
            информацию, а также тестовые задания,
          </p>
          <p className="about">
            с помощью которых система производит проверку усвоенного материала.
            Если ответ на тестовый вопрос дан не верный, система выводит
            подсказки, правила, объяснения почему ответ не верный и т.п., что
            является инновацией для систем обучения.
          </p>
        </div>
      </section>
      <section className="resources">
        <h1 className="title">Ресурсы TeachMe!</h1>
        <div className="choice">
          <Link className="system" to="/learn">
            <img src={leftSystem} alt="about System" />
            <div className="systemText">
              <h1>Система обучения</h1>
              <p className="systemabout">
                Авторская методика Блинковой Лидии Михайловны. <br /> Система
                обучения состоит из теоретической информации, <br /> разного
                типа заданий по теме и объяснений к ним.
              </p>
            </div>
            <img src={rightSystem} alt="about System" />
          </Link>
        </div>
      </section>
      {!isAuth && (
        <section className="report">
          <div className="report_text">
            <h2>Присоединяйся к TeachMe прямо сейчас!</h2>
            <NavLink link="/signup" text="Зарегестрироваться" />
            <p>
              После Регистрации на TeachMe — вам становятся доступны все его
              ресурсы, такие как: система обучения, раздел с теорией и раздел с
              тестами разбитые по темам
            </p>
          </div>
          <img src={fon2} alt="fon" />
        </section>
      )}
    </>
  );
};
