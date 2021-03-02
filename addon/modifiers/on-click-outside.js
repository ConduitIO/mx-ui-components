import { modifier } from 'ember-modifier';

export default modifier((element, [callback, outsideElementSelector]) => {
  function handleClick(event) {
    if (!element.contains(event.target)) {
      callback(event);
    }
  }

  let outsideElement;

  if (outsideElementSelector === 'document') {
    outsideElement = document;
  } else {
    outsideElement = document.querySelector(outsideElementSelector);
  }

  outsideElement.addEventListener('click', handleClick);

  return () => {
    outsideElement.removeEventListener('click', handleClick);
  };
});
