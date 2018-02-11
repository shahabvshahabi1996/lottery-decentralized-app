import React, { Component } from 'react';
import lottery from './lottery.js';

class App extends Component {

  constructor(props){
    super(props)
    this.state = { manager : ''};
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    this.setState({manager});
  }

  render() {
    return (
      <div style={{justifyContent : 'center',alignItems : 'center',flex : 1}}>
        <h2 style={{alignSelf : 'center'}}>Lottery Contract Game</h2>
        <p>this Contract is managed by {this.state.manager} address!!!</p>
      </div>
    );
  }
}

const styles =   {
  AppHeader : {
    backgroundColor : '#252525'
  }
}


export default App;
