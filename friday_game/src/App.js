import React from 'react';
import axios from 'axios';
import './App.css';
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

  showListScreen = async (key) => {
    if (await this.getDataByKey(key) === true) {
      this.setState({
        showFirstScreen: false, 
        showListScreen: true,
        showPuzzleScreen: false});
    }
  };

  showPuzzleScreen = async (key) => {
    if (await this.getDataByKey(key) === true) {
      this.setState({
        showFirstScreen: false, 
        showListScreen: false,
        showPuzzleScreen: true});
    }
  };

  getDataByKey = async (key) => {
    if (key === 'foo') {
      const response = await axios.get(process.env.REACT_APP_API + "/GetSymbols");
      
      this.setState({
        CorrectOrders: response.data.CorrectOrders,
        Lists: response.data.Lists
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
