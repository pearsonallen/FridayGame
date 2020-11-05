import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetValue from './GetValue';
import PuzzleScreen from './PuzzleScreen';

class InitialButtonsScreen extends React.Component {
  state = {};

  handlePersonAStart = () => {
    this.props.personAStart();
  };

  handlePersonBStart = () => {
    this.props.personBStart();
  }

  render() {
    return (
      <React.Fragment className="screen1">
        <button>Start Game</button>
        <button onClick={this.handlePersonAStart}>Start Person A Screen</button>
        <button onClick={this.handlePersonBStart}>Start Person B Screen</button>
      </React.Fragment>
    )
  }
}

class ListScreen extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <ul><li>Some List</li></ul>
      </React.Fragment>
    )
  }
}

class App extends React.Component {
  state = {
    showFirstScreen: true,
    showListScreen: false,
    showPuzzleScreen: false
  };

  showListScreen = () => {
    debugger;
    this.setState({
      showFirstScreen: false, 
      showListScreen: true,
      showPuzzleScreen: false});
  };

  showPuzzleScreen = () => {
    this.setState({
      showFirstScreen: false, 
      showListScreen: false,
      showPuzzleScreen: true});
  };

  correctOrders = () => {
    return [
      [1,3,2,4],
      //[1,2,3,4],
      //[2,3,4,1]
    ]
  };

  render() {
    return (
      <div>
      {(this.state.showFirstScreen && <InitialButtonsScreen personAStart={this.showListScreen} personBStart={this.showPuzzleScreen} />)}
      {(this.state.showListScreen && <ListScreen />)}
      {(this.state.showPuzzleScreen && <PuzzleScreen correctOrders={this.correctOrders} />)}
      </div>
    );
  }
}

export default App;
