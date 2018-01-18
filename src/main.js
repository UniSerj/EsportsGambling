import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Match from './match';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/match/:index' component={Match}/>
    </Switch>
  </main>
);

export default Main;