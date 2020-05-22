import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { SongsPage } from "./pages/songs_page";
import React from "react";
import Container from "@material-ui/core/Container";

export const App = () => (
  <Router>
    <Container>
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
    </Container>
  </Router>
);