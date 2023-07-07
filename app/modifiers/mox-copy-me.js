import { modifier } from 'ember-modifier';

export default modifier(
  async (el, [id]) => {
    function copyToClipboard(id) {
      const code = document.getElementById(id);
      navigator.clipboard.writeText(code.innerText);
    }

    async function isCopyEnabled() {
      const { state } = await navigator.permissions.query({
        name: 'clipboard-write',
      });
      return state === 'granted';
    }

    const isCopy = await isCopyEnabled();

    if (!isCopy) {
      return;
    }

    el.classList.remove('hidden');

    el.addEventListener('click', copyToClipboard.bind(null, id), false);

    return () => {
      el.removeEventListener('click', copyToClipboard.bind(null, id), false);
    };
  },
  { eager: false }
);
