import { h, render, Component } from 'preact';
import Router from 'preact-router';
import Competitions from './components/Competitions';
import Teams from './components/Teams';
import Compare from './components/Compare';

import './scss/reset.scss';
import './scss/index.scss';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOffline: false,
    };

    this.onRouteChange = this.onRouteChange.bind(this);
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
  }

  onRouteChange() {
    const pageElement = document.querySelector('.page');
    if (pageElement) {
      pageElement.scrollTop = 0;
    }
  }

  updateOnlineStatus() {
    const isOffline = !navigator.onLine;
    this.setState({
      isOffline,
    });
  }

  render() {
    return (
      <div class="main">
        <Router onChange={this.onRouteChange}>
          <Competitions path="/" />
          <Teams path="/teams" />
          <Compare path="/compare" />
        </Router>
      </div>
    );
  }
}

const container = document.getElementById('app');
container.innerHTML = '';
render(<Main />, container);

require('./manifest.json');
