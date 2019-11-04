import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MoviesDetails from "./components/moviesDetails";
import NavBar from "./components/nabvar";
import Customers from "./components/customers";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <main className="container mt-3">
          {/* <h1> Hello World</h1> */}
          {/* <Movies /> */}
          <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/moviesDetails/:id" component={MoviesDetails}></Route>
            <Route path="/not-found" component={NotFound} />
            <Route path="/movies" component={Movies}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
