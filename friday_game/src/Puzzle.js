import React from 'react';

class Puzzle extends React.Component {
    state = {
      button1Clicked: false,
      button2Clicked: false,
      button3Clicked: false,
      button4Clicked: false,
      buttonsClicks: []
    };
  
    handleAddButton = (ordinalValue) => {
      let buttonsClicks = this.state.buttonsClicks;
      
      let validNextOrdinalValue = this.props.correctOrder.CorrectOrder[buttonsClicks.length];
  
      if (ordinalValue != validNextOrdinalValue) {
        this.props.onError();
        this.setState({
          button1Clicked: false,
          button2Clicked: false,
          button3Clicked: false,
          button4Clicked: false,
          buttonsClicks: []
        });
        return false;
      } else {
        buttonsClicks.push(ordinalValue);
        if (buttonsClicks.length === this.props.correctOrder.CorrectOrder.length &&
            buttonsClicks.every((val, index) => val ===this.props.correctOrder.CorrectOrder[index])) {
                this.props.onWin();
                this.setState({
                    button1Clicked: false,
                    button2Clicked: false,
                    button3Clicked: false,
                    button4Clicked: false,
                    buttonsClicks: []
                  });
                return false;
            }
        return true;
      }
    }
  
    handleClick = (btnNumber,id) => {
      if (btnNumber === 1) {
        if (this.handleAddButton(id) == true) {
          this.setState({button1Clicked: true});
        }
      } else if (btnNumber === 2) {
        if (this.handleAddButton(id) == true) {
          this.setState({button2Clicked: true});
        } 
      } else if (btnNumber === 3) {
        if (this.handleAddButton(id) == true) {
          this.setState({button3Clicked: true});
        }
      } else if (btnNumber === 4) {
        if (this.handleAddButton(id) == true) {
          this.setState({button4Clicked: true});
        }
      }
    };
  
    render () { 
      return (
        <React.Fragment>
        <table>
          <tr>
            <td>
              <button className={`puzzleButton ${this.state.button1Clicked === true ? "btnClicked" : ""}`} onClick={() => !this.state.button1Clicked && this.handleClick(1,this.props.correctOrder.Stuff[0].Id)}>{this.props.correctOrder.Stuff[0].Char}</button>
            </td>
            <td>
              <button className={`puzzleButton ${this.state.button2Clicked === true ? "btnClicked" : ""}`} onClick={() => !this.state.button2Clicked && this.handleClick(2,this.props.correctOrder.Stuff[1].Id)}>{this.props.correctOrder.Stuff[1].Char}</button>
            </td>
          </tr>
          <tr>
            <td>
              <button className={`puzzleButton ${this.state.button3Clicked === true ? "btnClicked" : ""}`} onClick={() => !this.state.button3Clicked && this.handleClick(3,this.props.correctOrder.Stuff[2].Id)}>{this.props.correctOrder.Stuff[2].Char}</button>
            </td>
            <td>
              <button className={`puzzleButton ${this.state.button4Clicked === true ? "btnClicked" : ""}`} onClick={() => !this.state.button4Clicked && this.handleClick(4,this.props.correctOrder.Stuff[3].Id)}>{this.props.correctOrder.Stuff[3].Char}</button>
            </td>
          </tr>
        </table>
        </React.Fragment>
      );
    }
  }
  
  export default Puzzle;