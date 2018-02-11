import React, { Component } from 'react';
import lottery from './lottery.js';
import './App.css';
import web3 from './web3';
class App extends Component {

  constructor(props){
    super(props)
    this.state = { manager : '',players : [], balance : '',message : '',winner : ''};
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.entryPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    console.log(players);
    this.setState({manager,players,balance});
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const Account = await web3.eth.getAccounts();
    this.setState({message : 'Waiting for Your Transaction...'});
    // console.log(Account);
    await lottery.methods.enter().send({
      from : Account[0],
      value : web3.utils.toWei('0.01','ether')
    });
    this.setState({message : 'Your Transaction is Done successfully!!!'});
  }

  pickWinner = async (event) => {
    event.preventDefault();

    const Account = await web3.eth.getAccounts();

    this.setState({message : 'Waiting for Your Transaction...'});
    await lottery.methods.pickWinner().send({
      from : Account[0]
    });

    this.setState({message : 'Winner is picked!!!'});
    const winner = await lottery.methods.winner().call();
    this.setState({winner})
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <div className="HeaderTitle"><h2>Lottery Contract Game</h2></div>
        </div>
        <div style={{padding : '15px'}}>
          <h3>Want a Big Money??</h3>
          <p>this Contract is managed by <span className="Address">{this.state.manager}</span>.</p>
          <p>there are currently <span className="Address">{this.state.players.length}</span> people entered ,
           compenting to win <span className="Address">{web3.utils.fromWei(this.state.balance)}</span> ether</p>
          <h3>Rules???</h3>
          <ol>
            <li><span className="Address">Nothing just put your money in and Get The Real Prize!!!</span></li>
            <li>You Must Give a Amount Of <span className="Address">0.01</span> Ether</li>
          </ol>
          <h3>Lets Play</h3>
          <p>When Ever You are Ready Only Press <a href="#" onClick={this.onSubmit} className="buttonFace">Enter</a>.</p>
          <h5 className="messgae">{this.state.message}</h5>
          <div style={{width : '20%'}}>
            {this.state.players.map((player)=>{
              if(this.state.players.length > 0){
                return(
                  <div>
                    <h4>List of The Players</h4>
                    <hr/>
                    <ol>
                      <li>{player}</li>
                    </ol>
                    <hr/>
                  </div>
                )
              }
              else{
                return(
                  <div></div>
                )
              }
            })}
          </div>
          <div>
            <h3>Want to Pick Winner ???</h3>
            <a href="#" onClick={this.pickWinner} className="buttonFace">Pick Winner</a>
            <h5 className="winner-message">the winner is {this.state.winner}</h5>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
