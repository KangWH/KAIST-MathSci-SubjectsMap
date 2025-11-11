const SVGNS = 'http://www.w3.org/2000/svg';

/* 도형 관련 상수 --- map.css를 수정하면 여기에도 업데이트 */
const CATEGORY_HEIGHT = 1;
const BOX_WIDTH = 10;
const BOX_HEIGHT = 3;
const BOX_SEPARATION = 1;
const UNIT = 'rem';
// 단위를 사용할 수 없는 경우 COMP_UNIT_VAL을 배율 값에 곱하여 사용
const COMP_UNIT_VAL = parseFloat(getComputedStyle(document.documentElement).fontSize);
const BLOCK_WIDTH = 2 * BOX_SEPARATION + BOX_WIDTH;
const BLOCK_HEIGHT = 2 * BOX_SEPARATION + BOX_HEIGHT;
const CATEGORY_BLOCK_HEIGHT = 2 * BOX_SEPARATION + CATEGORY_HEIGHT;

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

  const firstRowNode = document.createElement('div');
  firstRowNode.classList.add('subject-text');
  firstRowNode.style.display = 'flex';
  firstRowNode.style.justifyContent = 'space-between';

  const codeNode = document.createElement('div');
  codeNode.classList.add('subject-text-code');
  codeNode.textContent = this.code;
  firstRowNode.append(codeNode);

  const creditNode = document.createElement('div');
  creditNode.classList.add('subject-text-code');
  creditNode.textContent = this.credit;
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
    line.setAttribute("y1", (BLOCK_HEIGHT * (sourceRow + 1) - BOX_SEPARATION) + UNIT);
    line.setAttribute("y2", (BLOCK_HEIGHT * (targetRow) + BOX_SEPARATION + CATEGORY_BLOCK_HEIGHT) + UNIT);
    return line;
  } else if (sourceColumn === targetColumn && sourceRow - targetRow === 1) {
    line.setAttribute("y1", (BLOCK_HEIGHT * (sourceColumn) - BOX_SEPARATION) + UNIT);
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
MainData.prototype.drawMap = function () {
  const container = document.getElementById('map-container');

  /* 내용 초기화 */
  const arrowsContainer = document.getElementById('arrows-container');
  const groupsContainer = document.getElementById('groups-container');
  const nodesContainer = document.getElementById('nodes-container');
  arrowsContainer.innerHTML = '';
  groupsContainer.innerHTML = '';
  nodesContainer.innerHTML = '';

  /* 임시 변수 */
  const codes = Object.keys(this.subjects).sort();
  const columnData = {};
  const nodeData = {};
  const arrowData = [];

  /* 분류 */
  const categoryInfo = {
    0: '10000번대',
    1: '20000번대',
    2: '30000번대',
    3: '40000번대',
  };
  for (let rowId in categoryInfo) {
    const row = Number(rowId);
    const string = categoryInfo[rowId];

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
    // text.setAttribute('text-anchor', 'left');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-weight', '700');
    text.textContent = string;
    groupsContainer.append(text);
  }

  for (let code of codes) {
    const subject = this.subjects[code];

    // 행과 열 구하기 --- 일단 테스트용으로 하드코딩
    // const column = subject.type.includes('기초') ? 0 : Number(code.charAt(4)) - 1;
    // const column = subject.type === '기초필수' ? 0 : subject.type === '기초선택' ? 1 : Number(code.charAt(4));
    const column = Number(code.charAt(4)) - 1;
    if (columnData[column] === undefined) {
      columnData[column] = [];
    }  
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
    g.addEventListener('click', subject.showDetails);
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
    const targetCode = arrow.id.split(':')[1];
    if (targetCode === code) {
      arrow.classList.remove('inactive');
      arrow.classList.add('active');
    }
  }

  for (let subtarget of target.prerequisites)
    this.showPrerequisites(subtarget, true);
}
MainData.prototype.hidePrerequisites = function () {
  /* 다이얼로그가 열려 있으면 유지 */
  if (document.getElementById('subject-details-dialog').getAttribute('open') !== null)
    return;

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
}