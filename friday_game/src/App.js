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
      const response = await axios.get(process.env.REACT_APP_API + "/GetSymbols?rowkey=" + key);
      if (response.data.CorrectOrders != null && response.data.Lists != null) {
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
      <>
      <div>
      {(this.state.showFirstScreen && <InitialButtonsScreen personAStart={this.showListScreen} personBStart={this.showPuzzleScreen} />)}
      {(this.state.showListScreen && <ListScreen lists={this.state.Lists} />)}
      {(this.state.showPuzzleScreen && <PuzzleScreen correctOrders={this.state.CorrectOrders} />)}
      </div>
      <div class="container2">
        <h5>Game Objective</h5>
        <ul>
        <li>Person A and Person B talk through solving Person B's puzzle.</li>
        </ul>
        <h5>Rules</h5>
        <ul>
          <li>Both parties cannot look at what each other sees</li>
        </ul>
        <h5>Instructions</h5>
        <ul>
          <li>Click a difficulty button to generate a game id</li>
          <li>Game id will ensure everyone experiences the same game</li>
          <li>Person A must pay attention to: 1) Which list the symbols are in. 2) The order of the symbols</li>
          <li>Person B clicks the buttons in the correct order</li>
        </ul>
      </div>
      </>
    );
  }
}

export default App;
