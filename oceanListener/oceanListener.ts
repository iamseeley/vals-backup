import { generateBubbles } from 'https://esm.town/v/iamseeley/generateBubbles';
import { generateFish } from 'https://esm.town/v/iamseeley/generateFish';

document.addEventListener('DOMContentLoaded', (isOceanTheme) => {
      if (isOceanTheme) {
          const fishContainer = document.querySelector('.fish-container');
          const bubbleContainer = document.querySelector('.bubble-container');

          if (fishContainer) {
            fishContainer.innerHTML = generateFish();
          }

          if (bubbleContainer) {
            bubbleContainer.innerHTML = generateBubbles();
          }
      }
});