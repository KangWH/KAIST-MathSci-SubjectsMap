mainData.drawMap();

document.querySelectorAll('dialog').forEach((dialog) => {
  const closeButton = dialog.querySelector('button.dialog-header-close-button');
  if (closeButton)
    closeButton.addEventListener('click', (e) => {dialog.close()});
});

document.getElementById('subject-details-form').gotoOTL.addEventListener('click', (e) => {
  e.preventDefault();
  const code = e.currentTarget.form.code.value;
  const url = 'https://otl.kaist.ac.kr/dictionary?startSearchKeyword=' + code;
  window.open(url, '_blank', 'noopener,noreferrer');
});

document.getElementById('suggestion-button').addEventListener('click', (e) => {
  document.getElementById('suggestion-dialog').showModal();
});

window.addEventListener('resize', (e) => {
  mainData.drawMap();
});