/* eslint-disable import/prefer-default-export */
function processItemClick(e: MouseEvent) {
  const text = (e.target as HTMLElement).innerText;
  const link = text.match(/http(s*):\/\/[^\s]+/g);
  if (link) {
    const aEl = document.createElement('a');
    aEl.setAttribute('href', link[0]);
    aEl.setAttribute('target', '_blank');
    aEl.click();
  }
}

export {
  processItemClick,
};
