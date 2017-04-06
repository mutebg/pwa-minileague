import { h, Component } from 'preact';

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: true,
    };
  }

  async componentWillMount() {
    const { src } = this.props;
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.addEventListener('load', () => {
        this.setState({ fail: false });
      });
    }
  }

  render({ src, label, checked = false }, { fail }) {
    return (
      <span class={`Icon ${checked ? 'Icon--checked' : ''}`}>
        {fail ? <span>{label[0]}</span> : <img src={src} alt={label} />}
        <svg class="mark" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
        </svg>
      </span>
    );
  }
}
