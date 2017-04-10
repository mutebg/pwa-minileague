import { h, Component } from 'preact';
import { route } from 'preact-router';
import { get } from '../../utils/api';
import Store from '../../utils/store';
import Icon from '../Icon';

const parseID = url => Number(url.split('/').pop());

export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      isLoading: true,
      selected: [],
      riple: false,
    };

    this.setSelected = this.setSelected.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  async componentWillMount() {
    const { id } = this.props;
    // load data from db
    Store.get(`team/${id}`).then(teams => this.setState({ teams }));
    // fetch data from web
    const { teams } = await get(`competitions/${id}/teams`);
    this.setState({
      teams,
      isLoading: false,
    });
    // save data to db
    Store.set(`team/${id}`, teams);
  }

  setSelected(id) {
    let { selected } = this.state;
    const indexOf = selected.indexOf(id);
    if (indexOf >= 0) {
      selected.splice(indexOf, 1);
    } else {
      selected = [id, ...selected];
    }
    this.setState({ selected });
  }

  handleNext() {
    this.setState({
      riple: true,
    });

    setTimeout(
      () => {
        route(`/compare?teams=${this.state.selected.join(':')}`);
      },
      300,
    );
  }

  render(props, state) {
    const { teams, selected, riple } = state;
    if (!teams) return null;
    return (
      <div class="Teams List">
        {teams.map(({ crestUrl, name, _links: { self } }) => {
          const id = parseID(self.href);
          const checked = selected.indexOf(id) >= 0;
          const classes = `List__item ${checked ? 'List__item--selected' : ''}`;

          return (
            <div class={classes} key={name} onClick={() => this.setSelected(id)}>
              <Icon label={name} src={crestUrl} checked={checked} />
              {name}
            </div>
          );
        })}
        <button
          onClick={this.handleNext}
          class={`fab ${selected.length > 1 && !riple ? 'fab--show' : ''}`}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
          </svg>
        </button>
        <div class={`fab-ripple ${riple ? 'fab-ripple--show' : ''}`} />
      </div>
    );
  }
}
