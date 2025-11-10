mainData.drawMap();

document.querySelectorAll('dialog').forEach((dialog) => {
  const closeButton = dialog.querySelector('button.dialog-header-close-button');
  if (closeButton)
    closeButton.addEventListener('click', (e) => {dialog.close()});
});

document.getElementById('suggestion-button').addEventListener('click', (e) => {
  document.getElementById('suggestion-dialog').showModal();
});

window.addEventListener('resize', (e) => {
  mainData.drawMap();
});