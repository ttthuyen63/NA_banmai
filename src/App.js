import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
