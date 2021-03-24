import { modifier } from 'ember-modifier';

export default modifier((element, [callback, outsideElementSelector], options) => {
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

    outsideElement.addEventListener('click', handleClick, options);

    return () => {
      outsideElement.removeEventListener('click', handleClick, options);
    };
  }
);
