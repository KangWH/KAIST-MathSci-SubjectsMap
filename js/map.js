const SVGNS = 'http://www.w3.org/2000/svg';

/* 도형 관련 상수 --- map.css를 수정하면 여기에도 업데이트 */
const CATEGORY_HEIGHT = 1;
let BOX_WIDTH = window.innerWidth > 640 ? 12 : 6;
let BOX_HEIGHT = 3;
let BOX_SEPARATION = window.innerWidth > 640 ? 1 : .7;
const UNIT = 'em';
// 단위를 사용할 수 없는 경우 COMP_UNIT_VAL을 배율 값에 곱하여 사용
let COMP_UNIT_VAL = parseFloat(getComputedStyle(document.getElementById('map-container')).fontSize);
let BLOCK_WIDTH = 2 * BOX_SEPARATION + BOX_WIDTH;
let BLOCK_HEIGHT = 2 * BOX_SEPARATION + BOX_HEIGHT;
let CATEGORY_BLOCK_HEIGHT = BOX_SEPARATION + CATEGORY_HEIGHT;

/* 현재 과목의 정보를 그리는 함수 */
Subject.prototype.drawNode = function () {
  const foreignObject = document.createElementNS(SVGNS, 'foreignObject');

  const title = document.createElementNS(SVGNS, 'title');
  title.textContent = this.code + ' ' + this.nameKR;
  foreignObject.append(title);

  const div = document.createElement('div');
  div.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  div.classList.add('subject-box');
  for (let style of this.styles)
    div.classList.add(style);
  div.classList.add(`category${this.category}`);
  if (this.frequency !== 1)
    div.classList.add('infrequent');

  const firstRowNode = document.createElement('div');
  firstRowNode.classList.add('subject-text');
  firstRowNode.style.display = 'flex';
  firstRowNode.style.justifyContent = 'space-between';

  // 과목 코드
  const codeNode = document.createElement('div');
  codeNode.classList.add('subject-text-code');
  codeNode.textContent = this.code;
  firstRowNode.append(codeNode);

  // 부가 정보
  const creditNode = document.createElement('div');
  creditNode.classList.add('subject-text-supplementary');
  creditNode.textContent = this.credit;
  if (this.semesters[0] && !this.semesters[1] && !this.semesters[2] && !this.semesters[3])
    creditNode.textContent = '봄 | ' + creditNode.textContent;
  else if (!this.semesters[0] && !this.semesters[1] && this.semesters[2] && !this.semesters[3])
    creditNode.textContent = '가을 | ' + creditNode.textContent;
  if (this.frequency === 2)
    creditNode.textContent = '격년 ' + creditNode.textContent;
  firstRowNode.append(creditNode);

  div.append(firstRowNode);

  const nameNode = document.createElement('div');
  nameNode.classList.add('subject-text');
  nameNode.classList.add('subject-text-name');
  nameNode.textContent = this.nameKR;
  div.append(nameNode);

  foreignObject.append(div);

  return foreignObject;
}

/* 화살표 그리는 함수 */
const drawArrow = (nodeData, source, target) => {
  const line = document.createElementNS(SVGNS, "line");
  line.classList.add('subject-arrow');
  line.id = source + ':' + target;
  const sourceRow = nodeData[source].row;
  const sourceColumn = nodeData[source].column;
  const targetRow = nodeData[target].row;
  const targetColumn = nodeData[target].column;
  line.setAttribute("x1", (BLOCK_WIDTH * (sourceColumn + 0.5)) + UNIT);
  line.setAttribute("y1", (BLOCK_HEIGHT * (sourceRow + 0.5) + CATEGORY_BLOCK_HEIGHT) + UNIT);
  line.setAttribute("x2", (BLOCK_WIDTH * (targetColumn + 0.5)) + UNIT);
  line.setAttribute("y2", (BLOCK_HEIGHT * (targetRow + 0.5) + CATEGORY_BLOCK_HEIGHT) + UNIT);

  /* 상하로 이웃한 경우 */
  if (sourceColumn === targetColumn && sourceRow - targetRow === -1) {
    line.setAttribute("y1", (BLOCK_HEIGHT * (sourceRow + 1) - BOX_SEPARATION + CATEGORY_BLOCK_HEIGHT) + UNIT);
    line.setAttribute("y2", (BLOCK_HEIGHT * (targetRow) + BOX_SEPARATION + CATEGORY_BLOCK_HEIGHT) + UNIT);
    return line;
  } else if (sourceColumn === targetColumn && sourceRow - targetRow === 1) {
    line.setAttribute("y1", (BLOCK_HEIGHT * (sourceColumn) - BOX_SEPARATION + CATEGORY_BLOCK_HEIGHT) + UNIT);
    line.setAttribute("y2", (BLOCK_HEIGHT * (targetColumn + 1) + BOX_SEPARATION + CATEGORY_BLOCK_HEIGHT) + UNIT);
    return line;
  }
  /* 같은 열이지만 이웃하진 않은 경우 */
  else if (sourceColumn === targetColumn) {
    const polyLine = document.createElementNS(SVGNS, 'polyline');
    polyLine.classList.add('subject-arrow');
    polyLine.id = source + ':' + target;
    const points = [];
    points.push([BLOCK_WIDTH * targetColumn + BOX_SEPARATION, BLOCK_HEIGHT * (sourceRow + .5) + CATEGORY_BLOCK_HEIGHT]);
    points.push([BLOCK_WIDTH * targetColumn, BLOCK_HEIGHT * (sourceRow + .5) + CATEGORY_BLOCK_HEIGHT]);
    points.push([BLOCK_WIDTH * targetColumn, BLOCK_HEIGHT * (targetRow + .5) + CATEGORY_BLOCK_HEIGHT]);
    points.push([BLOCK_WIDTH * targetColumn + BOX_SEPARATION, BLOCK_HEIGHT * (targetRow + .5) + CATEGORY_BLOCK_HEIGHT]);
    polyLine.setAttribute('points', points.map((x) => x.map((x) => x * COMP_UNIT_VAL).join(',')).join(' '));
    return polyLine;
  }
  /* 왼쪽 행 -> 오른쪽 행 */
  else if (sourceColumn < targetColumn) {
    const polyLine = document.createElementNS(SVGNS, 'polyline');
    polyLine.classList.add('subject-arrow');
    polyLine.id = source + ':' + target;
    const points = [];
    points.push([BLOCK_WIDTH * (sourceColumn + 1) - BOX_SEPARATION, BLOCK_HEIGHT * (sourceRow + .5) + CATEGORY_BLOCK_HEIGHT]);
    points.push([BLOCK_WIDTH * targetColumn, BLOCK_HEIGHT * (sourceRow + .5) + CATEGORY_BLOCK_HEIGHT]);
    points.push([BLOCK_WIDTH * targetColumn, BLOCK_HEIGHT * (targetRow + .5) + CATEGORY_BLOCK_HEIGHT]);
    points.push([BLOCK_WIDTH * (targetColumn) + BOX_SEPARATION, BLOCK_HEIGHT * (targetRow + .5) + CATEGORY_BLOCK_HEIGHT]);
    polyLine.setAttribute('points', points.map((x) => x.map((x) => x * COMP_UNIT_VAL).join(',')).join(' '));
    return polyLine;
  }
  /* 그 외: 일단은 사선으로 그림 */
  else if (sourceColumn < targetColumn) {
    line.setAttribute("x1", (BLOCK_WIDTH * (sourceColumn + 1) - BOX_SEPARATION) + UNIT);
    line.setAttribute("x2", (BLOCK_WIDTH * (targetColumn) + BOX_SEPARATION) + UNIT);
    return line;
  }
};

/* 전체 맵을 그리는 함수 */
MainData.prototype.drawMap = function (options) {
  const container = document.getElementById('map-container');

  /* 내용 초기화 */
  const arrowsContainer = document.getElementById('arrows-container');
  const groupsContainer = document.getElementById('groups-container');
  const nodesContainer = document.getElementById('nodes-container');
  arrowsContainer.innerHTML = '';
  groupsContainer.innerHTML = '';
  nodesContainer.innerHTML = '';

  container.classList.toggle('compact', options.compact);

  /* 임시 변수 */
  const codes = Object.keys(this.subjects).sort();
  const columnData = {};
  const nodeData = {};
  const arrowData = [];

  /* 분류 */
  for (let rowId in categoryData[options.grouping]) {
    const row = Number(rowId);
    const string = categoryData[options.grouping][rowId];

    if (!options.showgraduate && string.includes('50000'))
      break;

    const indicator = document.createElementNS(SVGNS, 'rect');
    indicator.setAttribute('x', (BLOCK_WIDTH * row + BOX_SEPARATION) + UNIT);
    indicator.setAttribute('y', BOX_SEPARATION + UNIT);
    indicator.setAttribute('width', '0.2rem');
    indicator.setAttribute('height', CATEGORY_HEIGHT + UNIT);
    indicator.setAttribute('fill', 'black');
    groupsContainer.append(indicator);

    const text = document.createElementNS(SVGNS, 'text');
    text.setAttribute('x', (BLOCK_WIDTH * row + BOX_SEPARATION + 0.6) + UNIT);
    text.setAttribute('y', (BOX_SEPARATION + CATEGORY_HEIGHT / 2) + UNIT);
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-weight', '500');
    text.textContent = string;
    groupsContainer.append(text);
  }

  for (let code of codes) {
    const subject = this.subjects[code];
    if (!options.showgraduate && code.split('.')[1].charAt(0) === '5')
      continue;

    // 행과 열 구하기
    const column = getColumn[options.grouping](subject);
    if (columnData[column] === undefined)
      columnData[column] = [];
    const row = columnData[column].length;
    columnData[column].push(code);
    nodeData[code] = {row: row, column: column};

    /* 노드 추가 */
    const g = document.createElementNS(SVGNS, 'g');
    g.classList.add('subject-container');
    g.id = code;

    const foreignObject = subject.drawNode();
    foreignObject.setAttribute('x', (BLOCK_WIDTH * column + BOX_SEPARATION) + UNIT);
    foreignObject.setAttribute('y', (BLOCK_HEIGHT * row + BOX_SEPARATION + CATEGORY_BLOCK_HEIGHT) + UNIT);
    foreignObject.setAttribute('width', BOX_WIDTH + UNIT);
    foreignObject.setAttribute('height', BOX_HEIGHT + UNIT);
    g.append(foreignObject);

    nodesContainer.appendChild(g);
    g.addEventListener('contextmenu', subject.showDetails);
    g.addEventListener('click', () => {
      this.activeNode = code;

      document.getElementById('mobile-ordinary-toolbar').style.display = 'none';
      document.getElementById('mobile-selected-toolbar').style.display = '';
      document.getElementById('mobile-search-toolbar').style.display = 'none';

      this.showPrerequisites(code)
    });
    g.addEventListener('mouseenter', () => {this.showPrerequisites(code)});
    g.addEventListener('mouseleave', this.hidePrerequisites);

    /* 연결선 데이터 추가 */
    if (subject.prerequisites.size) {
      for (let sourceSubject of subject.prerequisites)
        arrowData.push({source: sourceSubject, target: code});
    }
  }

  /* 연결선 그리기 */
  for (let arrow of arrowData) {
    if (nodeData[arrow.source] === undefined) {
      console.log('Skipping', arrow.source, 'to', arrow.target, 'since', arrow.source, 'is not drawn on the map.');
      continue;
    }
    if (nodeData[arrow.target] === undefined) {
      console.log('Skipping', arrow.source, 'to', arrow.target, 'since', arrow.target, 'is not drawn on the map.');
      continue;
    }

    const arrowNode = drawArrow(nodeData, arrow.source, arrow.target);
    arrowsContainer.append(arrowNode);
  }

  /* SVG 크기 재설정 */
  const bbox = container.getBBox();
  container.setAttribute('width', bbox.x + bbox.width + bbox.x + 2);
  container.setAttribute('height', bbox.y + bbox.height + bbox.y + 2);

  /* 필터 적용 */
  this.applyFilter();

  return;
}

/* 선수과목 표시/숨기기 이벤트 핸들러 */
MainData.prototype.showPrerequisites = function (code, recursive = false) {
  const svg = document.getElementById('map-container');
  if (!recursive) {
    const subjects = svg.querySelectorAll('.subject-container');
    for (let subject of subjects) {
      subject.classList.add('inactive');
      subject.classList.remove('active');
    }
    const arrows = svg.querySelectorAll('.subject-arrow');
    for (let arrow of arrows) {
      arrow.classList.add('inactive');
      arrow.classList.remove('active');
    }
  }

  let target = this.subjects[code];
  const node = document.getElementById(code);
  node.classList.remove('inactive');
  node.classList.add('active');

  const arrows = svg.querySelectorAll('.subject-arrow');
  for (let arrow of arrows) {
    const [source, target] = arrow.id.split(':');
    if (target === code) {
      arrow.classList.remove('inactive');
      arrow.classList.add('active');
    } else if (source === code && !recursive)
      arrow.classList.remove('inactive');
  }

  for (let subtarget of target.prerequisites)
    this.showPrerequisites(subtarget, true);
}
MainData.prototype.hidePrerequisites = function () {
  /* 다이얼로그가 열려 있으면 유지 */
  // if (document.getElementById('subject-details-dialog').getAttribute('open') !== null)
  //   return;

  const svg = document.getElementById('map-container');
  const subjects = svg.querySelectorAll('.subject-container');
  for (let subject of subjects) {
    subject.classList.remove('inactive');
    subject.classList.remove('active');
  }
  const arrows = svg.querySelectorAll('.subject-arrow');
  for (let arrow of arrows) {
    arrow.classList.remove('inactive');
    arrow.classList.remove('active');
  }

  if (mainData.activeNode !== null)
    mainData.showPrerequisites(mainData.activeNode);
}

/* 사이드바 필터 표시 */
MainData.prototype.generateSidebar = function () {
  this.generateTypeSidebar();
  this.generateCategorySidebar();
};
MainData.prototype.generateTypeSidebar = function () {
  const container = document.getElementById('aside-types-container');
  container.innerHTML = '';

  const types = new Set();
  for (let subject of Object.values(this.subjects))
    types.add(subject.type);

  for (let type of types) {
    const li = document.createElement('li');
    li.setAttribute('tabindex', 0);
    li.setAttribute('filterType', 'type');
    li.setAttribute('filterValue', type);
    li.textContent = SUBJECT_TYPES[type];
    container.append(li);
    li.addEventListener('click', filterItemHandler);
  }
};
MainData.prototype.generateCategorySidebar = function () {
  const container = document.getElementById('aside-categories-container');
  container.innerHTML = '';

  for (let ind = 1; ind < this.categories.length; ind++) {
    const li = document.createElement('li');
    li.setAttribute('tabindex', 0);
    li.setAttribute('filterType', 'category');
    li.setAttribute('filterValue', ind);

    const iconSpan = document.createElement('span');
    iconSpan.textContent = '●';
    iconSpan.style.paddingRight = '1rem';
    iconSpan.style.color = `var(--palette-color${ind})`;
    li.append(iconSpan);

    const textSpan = document.createElement('span');
    textSpan.textContent = this.categories[ind];
    li.append(textSpan);

    container.append(li);
    li.addEventListener('click', filterItemHandler);
  }
};

const filterClearHandler = (e) => {
  const aside = document.querySelector('aside');
  const items = aside.querySelectorAll('li');
  for (let item of items)
    item.classList.remove('active');

  e.currentTarget.classList.add('active');

  mainData.clearFilter();
  mainData.applyFilter();
};
const filterItemHandler = (e) => {
  const aside = document.querySelector('aside');
  const items = aside.querySelectorAll('li');
  for (let item of items)
    item.classList.remove('active');

  e.currentTarget.classList.add('active');

  const filterType = e.currentTarget.getAttribute('filterType');
  const filterValueStr = e.currentTarget.getAttribute('filterValue');
  const filterValue = isNaN(Number(filterValueStr)) ? filterValueStr : Number(filterValueStr);
  mainData.setFilter(filterType, filterValue);
  mainData.applyFilter();
};

/* 필터를 적용하여 맵에 표시 */
MainData.prototype.applyFilter = function () {
  for (let code in this.subjects) {
    const node = document.getElementById(code);
    if (node)
      node.classList.toggle('filtered', !this.checkFilter(code));
  }
};