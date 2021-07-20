import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './templates/Home';
import Profile from './templates/Profile';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.ctx }))
      .catch(err => console.log(err));
  }
  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/api/anime');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <Header />
        {/* <p className="App-intro">{this.state.data}</p> */}
        <p>{this.state.data}</p>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;