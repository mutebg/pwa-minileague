import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { get } from '../../utils/api';
import Icon from '../Icon';
import Header from '../Header';

export default class Competitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitions: [],
      isLoading: true,
    };
  }

  async componentWillMount() {
    try {
      const competitions = await get('competitions/');
      this.setState({
        competitions,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render(props, state) {
    const { competitions } = state;
    return (
      <div class="Competitions">
        <Header>Select competition</Header>
        <div class="page List">
          {competitions.map(({ id, caption }) => (
            <Link href={`/teams?id=${id}`} class="List__item" key={id}>
              <Icon label={caption} />
              {caption}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
