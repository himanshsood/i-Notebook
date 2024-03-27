import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

import { UserProvider } from "./context/notes/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
          </Switch>
          </div>
        </div>

      </Router>
    </UserProvider>
  );
}

export default App;
