export function flashBorder(element) {
  if (!element) return;
  let flash = true;
  setInterval(() => {
    if (flash) {
      element.style.borderRightColor = 'transparent';
    } else {
      element.style.borderRightColor = '#fff';
    }
    flash = !flash;
  }, 750);
}
