import React, { Component } from 'react';
import './App.css';
import LoginPage from './Components/LoginPage';
import HomeContainer from './Components/HomeContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwtToken: null,
      jwtExpirationDate: null, 
    }

    this.setAuthInfos = this.setAuthInfos.bind(this);
  }

  setAuthInfos(token) {
    this.setState({
      jwtToken: token,
    });
  }

  componentDidMount() {
      if(sessionStorage.getItem('alphapar.token') !== null && this.state.jwtToken === null) {
        this.setState({
          jwtToken: sessionStorage.getItem('alphapar.token')
        });
      }
  }

  render() {
    return (this.state.jwtToken != null ? <HomeContainer /> : <LoginPage loginCb={this.setAuthInfos} />)
  }
}

export default App;
