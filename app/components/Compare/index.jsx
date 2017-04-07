import { h, Component } from 'preact';
import { get } from '../../utils/api';
import Header from '../Header';

const parseID = url => Number(url.split('/').pop());

export default class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangList: [],
      isLoading: true,
    };
  }

  async componentWillMount() {
    const teamIDS = this.props.teams.split(':').map(Number);
    const teamFixtures = await Promise.all(
      teamIDS.map(async id => await get(`teams/${id}/fixtures/`)),
    );
    const teams = teamFixtures.map(team =>
      team.fixtures.filter((game) => {
        const awayID = parseID(game._links.awayTeam.href);
        const homeID = parseID(game._links.homeTeam.href);
        return game.status === 'FINISHED' &&
          teamIDS.indexOf(awayID) >= 0 &&
          teamIDS.indexOf(homeID) >= 0;
      }));

    // merge all games in single list
    const games = teams.reduce((prev, next) => prev.concat(next), []);
    // take uniq games
    const uniqGames = Object.values(
      games.reduce(
        (prev, next) => {
          const gameID = parseID(next._links.self.href);
          prev[gameID] = next;
          return prev;
        },
        {},
      ),
    );

    const rangList = Object.values(
      uniqGames.reduce(
        (prev, game) => {
          const awayID = parseID(game._links.awayTeam.href);
          const homeID = parseID(game._links.homeTeam.href);

          if (!prev[awayID]) {
            prev[awayID] = emptyRang();
          }
          if (!prev[homeID]) {
            prev[homeID] = emptyRang();
          }

          const { goalsAwayTeam, goalsHomeTeam } = game.result;

          prev[homeID].id = homeID;
          prev[homeID].name = game.homeTeamName;
          prev[homeID].plus += goalsHomeTeam;
          prev[homeID].minus += goalsAwayTeam;
          prev[homeID].games += 1;
          prev[awayID].id = awayID;
          prev[awayID].name = game.awayTeamName;
          prev[awayID].plus += goalsAwayTeam;
          prev[awayID].minus += goalsHomeTeam;
          prev[awayID].games += 1;

          if (goalsAwayTeam === goalsHomeTeam) {
            prev[homeID].points += 1;
            prev[awayID].points += 1;
          } else if (goalsAwayTeam > goalsHomeTeam) {
            prev[awayID].points += 3;
          } else if (goalsAwayTeam < goalsHomeTeam) {
            prev[homeID].points += 3;
          }
          return prev;
        },
        {},
      ),
    ).sort((a, b) => a.points < b.points);

    this.setState({ rangList });
  }

  render(props, state) {
    const { rangList } = state;
    return (
      <div class="Compare">
        <Header>Mini League</Header>
        <table class="RangList page">
          <tr>
            <th>#</th>
            <th />
            <th>G</th>
            <th>GD</th>
            <th>P</th>
          </tr>
          {rangList.map(({ name, points, plus, minus, games }, index) => (
            <tr>
              <td>{index + 1}</td>
              <td class="name">{name}</td>
              <td>{games}</td>
              <td>{plus - minus}</td>
              <td>{points}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const emptyRang = () => ({
  id: 0,
  name: '',
  points: 0,
  plus: 0,
  minus: 0,
  games: 0,
});
