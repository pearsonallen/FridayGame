import React from 'react';
import axios from 'axios';

class InitialButtonsScreen extends React.Component {
  state = {
    SpecialKey: '',
    PersonAScreenKey: '',
    PersonBScreenKey: ''
  };

  handlePersonAStart = () => {
    this.props.personAStart(this.state.PersonAScreenKey);
  };

  handlePersonBStart = () => {
    this.props.personBStart(this.state.PersonBScreenKey);
  }

  getSpecialKey = async () => {
    const response = await axios.get(process.env.REACT_APP_API + "/CreateSymbols");
    debugger;
    this.setState({
      SpecialKey: response.data
    })
  }

  render() {
    return (
      <React.Fragment className="screen1">
        <button onClick={this.getSpecialKey}>Start Game</button>
        <div>{this.state.SpecialKey}</div>

        <button onClick={this.handlePersonAStart}>Start Person A Screen</button> <br />
        <input type="text" value={this.state.PersonAScreenKey} onChange={event => this.setState({PersonAScreenKey: event.target.value})} placeholder="Person A Key" />
        <br />
        <button onClick={this.handlePersonBStart}>Start Person B Screen</button> <br />
        <input type="text" value={this.state.PersonBScreenKey} onChange={event => this.setState({PersonBScreenKey: event.target.value})} placeholder="Person B Key" />
        
      </React.Fragment>
    )
  }
}

export default InitialButtonsScreen;