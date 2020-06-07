import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import SongsPage from "./pages/songs/index";
import SongPage from "./pages/song/index";
import React from "react";
import Container from "@material-ui/core/Container";
import { trackController } from "./pages/song/track_controller";

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
        <Route path="/songs" exact component={SongsPage} />
        <Route
          path="/songs/:songId"
          render={props => <SongPage {...props} trackController={trackController}/> }
        />
        <Redirect from="/" to="/songs" exact/>
      </Switch>
    </Container>
  </Router>
);