import React from 'react';
import Puzzle from './Puzzle';

class PuzzleScreen extends React.Component {
    state = {
      Errors: 0,
      Wins: 0,
      YouLose: false,
      YouWin: false,
      ShowPuzzle: true,
      CorrectOrder: this.props.correctOrders()[0]
    };
  
    handleError = () => {
      if (this.state.Errors >= 3) {
        this.setState({
          YouLose: true,
          ShowPuzzle: false
        });
      } else {
        this.setState({
          Errors: this.state.Errors + 1
        });
      }
    }
  
    handleWin = () => {
      let orders = this.props.correctOrders().length;
      
      if (this.state.Wins + 1 === orders) {
        this.setState({
          Wins: this.state.Wins + 1,
          YouWin: true,
          ShowPuzzle: false
        })
      } else {
        this.setState({
          Wins: this.state.Wins + 1,
          CorrectOrder: this.props.correctOrders()[this.state.Wins + 1]
        });
      }
    }
    
    render() {
      return (
        <React.Fragment>
          <div>Errors: {this.state.Errors}</div>
          <div>Wins: {this.state.Wins}</div>
          {this.state.YouWin === true && <p>You Win</p>}
          {this.state.ShowPuzzle === true && <Puzzle onError={this.handleError} onWin={this.handleWin} correctOrder={this.state.CorrectOrder} />}
          {this.state.YouLose === true && <p>You Lose</p>}
        </React.Fragment>
      );
    }
  }
  
  export default PuzzleScreen;