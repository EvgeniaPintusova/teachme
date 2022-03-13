import * as React from "react";
import { connect } from "react-redux";
import "./Tests.css";

import { getTests } from "../../../actions/tests";
import PreviewTest from "../../PreviewTest/PreviewTest";
import Loader from "../../Loading/Loading";
import Back from "../../Back/Back";
import teoriya from "../../../assets/teoriya.png";

class Tests extends React.PureComponent {
  componentDidMount() {
    this.props.getTests();
    document.title = "TeachMe - Обучение";
  }

  render() {
    const { tests, isLoad } = this.props;
    return (
      <section className="test">
        {isLoad && <Loader />}
        <Back link="/" />
        <h1 className="learn_system">Учебный материал</h1>
        <div className="testview showTest">
          <figure>
            <img src={teoriya} alt="test" />
          </figure>
          <span className="testview-title">English Grammar Practice</span>
          <span className="testview-description">Учебно-методическое пособие по практической грамматике для
студентов 1 курса специальности «Современные иностранные языки»</span>
          <a
            className="nav_button"
            target="block"
            href="https://fsc.bsu.by/wp-content/uploads/2015/12/Prakticheskaya-grammatika-1-kurs-English-Grammar-Practice-uchebno-metodicheskoe-posobie.pdf"
          >
            Перейти
          </a>
        </div>

        <h1 className="learn_system">Уроки</h1>
        <ul className="test-container">
          {tests.map(test => (
            <PreviewTest test={test} key={test._id} />
          ))}
        </ul>
      </section>
    );
  }
}

export default connect(
  state => ({
    tests: state.tests.tests,
    isLoad: state.tests.isLoad
  }),
  {
    getTests
  }
)(Tests);
