import { modifier } from 'ember-modifier';

export default modifier(
  (element) => {
    function focusInput() {
      document.querySelector('#tags-input').focus();
    }

    function handleClickEvent() {
      focusInput();
    }

    function handleKeyEvent(event) {
      if (event?.keyCode === 13) {
        focusInput();
      }
    }

    element.addEventListener('click', handleClickEvent);
    element.addEventListener('keydown', handleKeyEvent);
    return () => {
      element.removeEventListener('', handleEvent);
      element.removeEventListener('', handleKeyEvent);
    };
  },
  { eager: false }
);
