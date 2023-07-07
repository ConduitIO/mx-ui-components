import { modifier } from 'ember-modifier';

export default modifier(
  (element, [callback]) => {
    function runCallback() {
      const tagsTextInput = document.querySelector('#tags-input');
      tagsTextInput.value = '';
      callback();
    }

    element.addEventListener('click', runCallback);
    return () => {
      element.removeEventListener('', runCallback);
    };
  },
  { eager: false }
);
