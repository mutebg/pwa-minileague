import { h } from 'preact';

export default function Header({ back, children }) {
  return (
    <div class={`Header ${back ? 'Header--back' : ''}`}>
      <button class="Header__btn" onClick={() => window.history.back()}>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>
      <div class="Header__title">{children}</div>
    </div>
  );
}
