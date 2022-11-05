/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import PrivateRoute from 'Components/private-route/private-route';
import Login from 'Components/login/login';
import ChannelsPage from 'Components/channels-page/channels-page';
import ChannelDetailsPage from 'Components/channel-details-page/channel-details-page';
import Root from 'Components/root/root';
import withMenu from 'Components/HOCs/withMenu';
import useTheme from '../../hooks/useTheme';
import './app.css';

function App() {
  const { theme } = useTheme();
  return (
    <Router>
      <div className="app" data-theme={theme}>
        <div className="version-info">
          <span>v: {tag}</span>
        </div>
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

export default observer(App);
