import { create3DEmoji } from 'https://esm.town/v/iamseeley/threedEmoji';

window.addEventListener('DOMContentLoaded', () => {
  const emojiElement = document.getElementById('emoji');
  const emoji = emojiElement.getAttribute('data-emoji');
  const container = document.getElementById('3d-emoji-container');
  create3DEmoji(emoji, 100, 100);
});
