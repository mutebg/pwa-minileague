import { h, Component } from 'preact';

export default function Header({ back, children }) {
  return (
    <div class="Header">
      {children}
    </div>
  );
}
