import { h, render, Component } from 'preact';
import Router from 'preact-router';
import Competitions from './components/Competitions';
import Teams from './components/Teams';
import Compare from './components/Compare';
import Header from './components/Header';

import './scss/reset.scss';
import './scss/index.scss';

const headerContent = (url) => {
  switch (url) {
    case '/teams':
      return { children: 'Select teams', back: true };
    case '/compare':
      return { children: 'Mini League', back: true };
    default:
      return { children: 'Select competition', back: false };
  }
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOffline: false,
      url: '/',
    };

    this.onRouteChange = this.onRouteChange.bind(this);
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  onRouteChange(param) {
    const pageElement = document.querySelector('.page');
    if (pageElement) {
      pageElement.scrollTop = 0;
    }
    this.setState({
      url: param.current.attributes.path,
    });
  }

  updateOnlineStatus() {
    const isOffline = !navigator.onLine;
    this.setState({
      isOffline,
    });
  }

  render() {
    const headerData = headerContent(this.state.url);
    return (
      <div class="main">
        <Header {...headerData} />
        <div class="page">
          <Router onChange={this.onRouteChange}>
            <Competitions path="/" />
            <Teams path="/teams" />
            <Compare path="/compare" />
          </Router>
        </div>
      </div>
    );
  }
}

const container = document.getElementById('app');
container.innerHTML = '';
render(<Main />, container);

require('./manifest.json');
