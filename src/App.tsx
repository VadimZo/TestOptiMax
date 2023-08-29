import React from "react";
import "./scss/App.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
      </Switch>
    </div>
  );
}

export default App;
