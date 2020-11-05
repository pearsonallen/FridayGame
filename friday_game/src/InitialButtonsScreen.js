import React from 'react';

class InitialButtonsScreen extends React.Component {
  state = {
    SpecialKey: ''
  };

  handlePersonAStart = () => {
    this.props.personAStart(this.state.PersonAScreenKey);
  };

  handlePersonBStart = () => {
    this.props.personBStart(this.state.PersonBScreenKey);
  }

  getSpecialKey = () => {
    this.setState({
      SpecialKey: 'foo'
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