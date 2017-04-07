import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { get } from '../../utils/api';
import Icon from '../Icon';

const parseID = url => Number(url.split('/').pop());

export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      isLoading: true,
      selected: [],
    };

    this.setSelected = this.setSelected.bind(this);
  }

  async componentWillMount() {
    const { id } = this.props;
    try {
      const { teams } = await get(`competitions/${id}/teams`);
      this.setState({
        teams,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
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

  render(props, state) {
    const { teams, selected } = state;
    console.log(`transfom: scale(${selected.length > 1 ? 1 : 0})`);
    return (
      <div class="Competitions List">
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
        <Link
          class={`fab ${selected.length > 1 ? '' : 'fab--hide'}`}
          href={`/compare?teams=${selected.join(':')}`}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
          </svg>
        </Link>
      </div>
    );
  }
}
