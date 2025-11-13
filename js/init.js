mainData.drawMap(options);
mainData.generateSidebar();

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

document.getElementById('open-sidebar-button').addEventListener('click', (e) => {
  document.body.classList.toggle('aside-opened');
});
document.getElementById('close-sidebar-button').addEventListener('click', (e) => {
  document.body.classList.toggle('aside-opened');
});
document.getElementById('clear-filter-item').addEventListener('click', filterClearHandler);

document.getElementById('suggestion-button').addEventListener('click', (e) => {
  document.getElementById('suggestion-dialog').showModal();
});

document.getElementById('options-button').addEventListener('click', (e) => {
  document.getElementById('options-dialog').showModal();
});

window.addEventListener('resize', (e) => {
  BOX_WIDTH = window.innerWidth > 640 ? 12 : 6;
  BOX_SEPARATION = window.innerWidth > 640 ? 1 : .7;
  BLOCK_WIDTH = 2 * BOX_SEPARATION + BOX_WIDTH;
  BLOCK_HEIGHT = 2 * BOX_SEPARATION + BOX_HEIGHT;

  if (window.innerWidth <= 640)
    document.body.classList.remove('aside-opened');

  mainData.drawMap(options);
});