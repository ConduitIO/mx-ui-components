import { modifier } from 'ember-modifier';

export default modifier(
  function focusOnRender(element) {
    element.focus();
  },
  { eager: false }
);
