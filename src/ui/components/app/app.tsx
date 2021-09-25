import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from 'Components/private-route/private-route';
import Login from 'Components/login/login';
import ChannelsPage from 'Components/channels-page/channels-page';
import ChannelDetailsPage from 'Components/channel-details-page/channel-details-page';
import Root from 'Components/root/root';
import withMenu from 'Components/HOCs/withMenu';
import './app.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" component={Root} exact />
          <Route path="/login" component={Login} />
          <Route
            path="/channels"
            exact
            render={(props) => (
              <PrivateRoute>
                { withMenu(ChannelsPage, props) }
              </PrivateRoute>
            )}
          />
          <Route
            path="/channel/:id"
            exact
            render={(props) => (
              <PrivateRoute>
                { withMenu(ChannelDetailsPage, props) }
              </PrivateRoute>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
