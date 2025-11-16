mainData.drawMap(options);
mainData.generateSidebar();
document.getElementById('mobile-search-toolbar').style.display = 'none';
document.getElementById('mobile-selected-toolbar').style.display = 'none';

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

/* 사이드바 관련 */
document.getElementById('open-sidebar-button').addEventListener('click', (e) => {
  document.body.classList.add('aside-opened');
});
document.getElementById('close-sidebar-button').addEventListener('click', (e) => {
  document.body.classList.remove('aside-opened');
});
document.getElementById('close-filter-button').addEventListener('click', (e) => {
  document.body.classList.remove('aside-opened');
});
document.getElementById('clear-filter-item').addEventListener('click', filterClearHandler);

/* 데스크탑 좌상단 버튼 */
document.getElementById('suggestion-button').addEventListener('click', (e) => {
  document.getElementById('suggestion-dialog').showModal();
});
document.getElementById('options-button').addEventListener('click', (e) => {
  document.getElementById('options-dialog').showModal();
});

/* 확대 축소 */
document.getElementById('zoom-in-button').addEventListener('click', (e) => {
  const currentValue = Number(document.getElementById('map-wrapper').getAttribute('font-size')) || 1;
  const newValue = currentValue + 0.1;

  document.getElementById('map-wrapper').setAttribute('font-size', newValue);
  document.getElementById('map-wrapper').style.fontSize = newValue + 'rem';

  COMP_UNIT_VAL = parseFloat(getComputedStyle(document.getElementById('map-container')).fontSize);

  mainData.drawMap(options);
});
document.getElementById('zoom-reset-button').addEventListener('click', (e) => {
  document.getElementById('map-wrapper').setAttribute('font-size', 1);
  document.getElementById('map-wrapper').style.fontSize = '1rem';

  COMP_UNIT_VAL = parseFloat(getComputedStyle(document.getElementById('map-container')).fontSize);

  mainData.drawMap(options);
});
document.getElementById('zoom-out-button').addEventListener('click', (e) => {
  const currentValue = Number(document.getElementById('map-wrapper').getAttribute('font-size')) || 1;
  const newValue = Math.max(currentValue - 0.1, 0.2);

  document.getElementById('map-wrapper').setAttribute('font-size', newValue);
  document.getElementById('map-wrapper').style.fontSize = newValue + 'rem';

  COMP_UNIT_VAL = parseFloat(getComputedStyle(document.getElementById('map-container')).fontSize);

  mainData.drawMap(options);
});

/* 검색 */
document.getElementById('mobile-fake-search-field').addEventListener('click', (e) => {
  document.getElementById('mobile-ordinary-toolbar').style.display = 'none';
  document.getElementById('mobile-search-toolbar').style.display = '';
  document.getElementById('mobile-search-field').focus();
});
document.getElementById('mobile-search-button').addEventListener('click', (e) => {
  // 노드 선택 해제
  mainData.activeNode = null;
  mainData.hidePrerequisites();

  document.getElementById('mobile-selected-toolbar').style.display = 'none';
  document.getElementById('mobile-search-toolbar').style.display = '';
  document.getElementById('mobile-search-field').focus();
});
document.getElementById('mobile-search-field').addEventListener('change', (e) => {
  if (e.isComposing)
    return;

  mainData.setQuery(e.currentTarget.value.trim() || null);
  mainData.applyFilter();
});
document.getElementById('mobile-search-clear-button').addEventListener('click', (e) => {
  document.getElementById('mobile-search-field').value = '';
  mainData.clearFilter();
  mainData.applyFilter();

  document.getElementById('mobile-search-toolbar').style.display = 'none';
  document.getElementById('mobile-ordinary-toolbar').style.display = '';
});
document.getElementById('mobile-search-field').addEventListener('blur', (e) => {
  if (e.currentTarget.value)
    return;

  document.getElementById('mobile-search-clear-button').click();
})

/* 모바일 툴바 */
document.getElementById('mobile-filter-button-1').addEventListener('click', (e) => {
  document.body.classList.add('aside-opened');
});
document.getElementById('mobile-filter-button-2').addEventListener('click', (e) => {
  document.body.classList.add('aside-opened');
});
document.getElementById('deselect-node-button').addEventListener('click', (e) => {
  mainData.activeNode = null;
  mainData.hidePrerequisites();

  document.getElementById('mobile-selected-toolbar').style.display = 'none';
  document.getElementById('mobile-ordinary-toolbar').style.display = '';
});
document.getElementById('node-details-button').addEventListener('click', (e) => {
  const subject = mainData.subjects[mainData.activeNode];
  subject.showDetails(e);
});

/* 노드 고정 해제 */
window.addEventListener('click', (e) => {
  if (window.innerWidth <= 640)
    return;

  if (e.target.nodeName === 'DIV' && ['subject-box', 'subject-text', 'subject-text-code', 'subject-text-name', 'subject-text-supplementary'].includes(Array.from(e.target.classList)[0]))
    return;

  mainData.activeNode = null;
  mainData.hidePrerequisites();
});

/* 화면 크기 조정 */
window.addEventListener('resize', (e) => {
  BOX_WIDTH = window.innerWidth > 640 ? 12 : 6;
  BOX_SEPARATION = window.innerWidth > 640 ? 1 : .7;
  BLOCK_WIDTH = 2 * BOX_SEPARATION + BOX_WIDTH;
  BLOCK_HEIGHT = 2 * BOX_SEPARATION + BOX_HEIGHT;

  if (window.innerWidth <= 640) {
    document.body.classList.remove('aside-opened');
    // mainData.clearFilter();
  } else {
    document.getElementById('mobile-search-field').value = '';
    mainData.filter.query = null;
  }

  mainData.drawMap(options);
  mainData.applyFilter();

  /* 모바일 하단 툴바 */
  document.getElementById('mobile-ordinary-toolbar').style.display = '';
  document.getElementById('mobile-search-toolbar').style.display = 'none';
  document.getElementById('mobile-selected-toolbar').style.display = 'none';
});