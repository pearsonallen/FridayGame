import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetValue from './GetValue';
import PuzzleScreen from './PuzzleScreen';
import InitialButtonsScreen from './InitialButtonsScreen';
import ListScreen from './ListScreen';

class App extends React.Component {
  state = {
    showFirstScreen: true,
    showListScreen: false,
    showPuzzleScreen: false,
    CorrectOrders: [],
    Lists: []
  };

  showListScreen = (key) => {
    if (this.getDataByKey(key) === true) {
      this.setState({
        showFirstScreen: false, 
        showListScreen: true,
        showPuzzleScreen: false});
    }
  };

  showPuzzleScreen = (key) => {
    if (this.getDataByKey(key) === true) {
      this.setState({
        showFirstScreen: false, 
        showListScreen: false,
        showPuzzleScreen: true});
    }
  };

  getDataByKey = (key) => {
    if (key === 'foo') {
      this.setState({
        CorrectOrders: [
          {
            Stuff: [
              {Id: 1,
              Char: '!'},
              {Id: 2,
              Char: '@'},
              {Id: 3,
              Char: '#'},
              {Id: 4,
              Char: '$'}
            ],
            CorrectOrder: [2,1,3,4]
          },
          {
            Stuff: [
              {Id: 1,
              Char: '!'},
              {Id: 2,
              Char: '@'},
              {Id: 3,
              Char: '#'},
              {Id: 4,
              Char: '$'}
            ],
            CorrectOrder: [1,2,3,4]
          }
        ],
        Lists: [
          ['!','@','#','$'],
          ['%','^','*','(']
        ]
      });
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div>
      {(this.state.showFirstScreen && <InitialButtonsScreen personAStart={this.showListScreen} personBStart={this.showPuzzleScreen} />)}
      {(this.state.showListScreen && <ListScreen lists={this.state.Lists} />)}
      {(this.state.showPuzzleScreen && <PuzzleScreen correctOrders={this.state.CorrectOrders} />)}
      </div>
    );
  }
}

export default App;
