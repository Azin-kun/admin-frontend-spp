import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Student from "./pages/Student"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Class from "./pages/Class"
import Officer from "./pages/Officer"
import Tuition from "./pages/Tuition"
import Payment from "./pages/Payment"

export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/student" component={Student} />
        <Route path="/admin" component={Admin} />
        <Route path="/class" component={Class} />
        <Route path="/officer" component={Officer} />
        <Route path="/tuition" component={Tuition} />
        <Route path="/Payment" component={Payment} />
      </Switch>
    )
  }
}

