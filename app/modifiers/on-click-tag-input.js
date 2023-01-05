import { modifier } from "ember-modifier";

export default modifier((element) => {
  function handleEvent() {
    document.querySelector('#tags-input').focus();
  }

  element.addEventListener('click', handleEvent);
  return () => {
    element.removeEventListener('', handleEvent);
  };
}, { eager: false });
