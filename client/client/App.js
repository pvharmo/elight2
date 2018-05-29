import React, {Component} from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export default class App extends Component {
  
  constructor() {
    super();
    
    this.state = {
      timestamp: 'no timestamp yet'
    }
    
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
  }
  
  render() {
    return <p>{this.state.timestamp}</p>
  }
}