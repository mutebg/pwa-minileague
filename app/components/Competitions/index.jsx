import { h, Component } from 'preact';
import { route } from 'preact-router';
import { get } from '../../utils/api';
import Icon from '../Icon';

export default class Competitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitions: [],
      isLoading: true,
      inTransition: false,
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

  handleClick(id, selectedIndex) {
    const listItems = document.querySelectorAll('.List__item');
    const selectedItem = listItems[selectedIndex];
    const { top, bottom } = selectedItem.getBoundingClientRect();
    this.setState({
      inTransition: {
        selectedIndex,
        top: top * -1,
        bottom: window.innerHeight - bottom,
      },
    });

    setTimeout(
      () => {
        route(`/teams?id=${id}`);
      },
      300,
    );
  }

  render(props, state) {
    const { competitions, inTransition } = state;
    return (
      <div class="Competitions List">
        {competitions.map(({ id, caption }, index) => {
          const itemStyle = inTransition ? getStyle(index, inTransition) : {};
          return (
            <div
              id={`list-${id}`}
              onClick={this.handleClick.bind(this, id, index)}
              class="List__item"
              style={itemStyle}
              key={id}
            >
              <Icon label={caption} />
              {caption}
            </div>
          );
        })}
      </div>
    );
  }
}

const getStyle = (index, { selectedIndex, top, bottom }) => {
  const move = index <= selectedIndex ? top : bottom;
  return {
    transform: `translateY(${move}px)`,
    transition: '0.2s linear transform',
  };
};
