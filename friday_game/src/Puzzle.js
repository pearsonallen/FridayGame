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

      let validNextOrdinalValue = this.props.correctOrder[buttonsClicks.length];
  
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
        if (buttonsClicks.length === this.props.correctOrder.length &&
            buttonsClicks.every((val, index) => val ===this.props.correctOrder[index])) {
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
  
    handleClick = (btn) => {
      if (btn === 1) {
        if (this.handleAddButton(1) == true) {
          this.setState({button1Clicked: true});
        }
      } else if (btn === 2) {
        if (this.handleAddButton(2) == true) {
          this.setState({button2Clicked: true});
        } 
      } else if (btn === 3) {
        if (this.handleAddButton(3) == true) {
          this.setState({button3Clicked: true});
        }
      } else if (btn === 4) {
        if (this.handleAddButton(4) == true) {
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
              <button className={`puzzleButton ${this.state.button1Clicked === true ? "btnClicked" : ""}`} onClick={() => !this.state.button1Clicked && this.handleClick(1)}>!</button>
            </td>
            <td>
              <button className={`puzzleButton ${this.state.button2Clicked === true ? "btnClicked" : ""}`} onClick={() => !this.state.button2Clicked && this.handleClick(2)}>@</button>
            </td>
          </tr>
          <tr>
            <td>
              <button className={`puzzleButton ${this.state.button3Clicked === true ? "btnClicked" : ""}`} onClick={() => !this.state.button3Clicked && this.handleClick(3)}>#</button>
            </td>
            <td>
              <button className={`puzzleButton ${this.state.button4Clicked === true ? "btnClicked" : ""}`} onClick={() => !this.state.button4Clicked && this.handleClick(4)}>$</button>
            </td>
          </tr>
        </table>
        </React.Fragment>
      );
    }
  }
  
  export default Puzzle;