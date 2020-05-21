import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { SongsPage } from "./pages/songs_page";
import React from "react";

export const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/songs">Songs</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/songs">
          <SongsPage />
        </Route>
      </Switch>
    </div>
  </Router>
);