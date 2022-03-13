import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Pages/Home/Home.js";
import Tests from "../components/Pages/Tests/Tests";
import Questions from "../components/Pages/Questions/Questions";
import Spinner from "../components/Loading/Loading";
import { Header } from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Congrats from "../components/Congrats/Congrats";
import authGuard from './AuthGuard'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

const HeaderHOC = authGuard(Header, true)

export class ResRouters extends React.Component {
  render() {
    return (
      <>
        <HeaderHOC />
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={authGuard(Home, true)} />
            <Route exact path="/learn" component={authGuard(Tests)} />
            <Route
              path="/learn/:id"
              component={authGuard(Questions)}
            />
            <Route
              path="/congrats"
              component={authGuard(Congrats)}
            />
            <Route
              path='/signin'
              component={Login}
            />
            <Route
              path='/signup'
              component={Register}
            />
          </Switch>
        </React.Suspense>
        <Footer />
      </>
    );
  }
}
