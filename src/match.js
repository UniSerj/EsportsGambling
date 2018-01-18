import React, { Component } from 'react';
import ContractAPI from './contract'
import './App.css';

const Match = (props) => (
  <div className="App">
    <h1>Esports Gambling</h1>
    <h2>Match Reference # {props.match.params.index}</h2>
    <ContractAPI index={props.match.params.index} />
  </div>
);


export default Match;