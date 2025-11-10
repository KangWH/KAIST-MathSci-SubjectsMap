const SUBJECT_TYPES = ['기초필수', '기초선택', '전공필수', '전공선택', '교양필수', '인문사회선택', '공통필수', '선택(석/박사)', '자유선택', '개별연구', '졸업연구', '논문연구', '인턴십', '기타'];

class Subject {
  constructor (code, type, nameKR, nameEN, credit) {
    this.code = code;
    this.type = type;
    this.nameKR = nameKR;
    this.nameEN = nameEN;
    this.credit = credit;
    this.category = 0;

    this.prerequisites = new Set();
    this.history = [];
  }

  addPrerequisite = (code) => {
    this.prerequisites.add(code);
    return this;
  }

  setCategory = (id) => {
    this.category = id;
  }

  showDetails = () => {
    const form = document.getElementById('subject-details-form');
    form.subjectTitle.textContent = this.nameKR;
    form.code.value = this.code;
    form.type.value = this.type;
    form.credit.value = this.credit;

    document.getElementById('subject-details-dialog').showModal();
  }
}

class MainData {
  constructor () {
    this.subjects = {};
    this.categories = ['기타'];
  }

  drawMap = () => {
    const BOX_WIDTH = 12;
    const BOX_HEIGHT = 3;
    const BOX_SEPARATION = 1;
    const UNIT = 'rem';
    const COMP_UNIT_VAL = parseFloat(getComputedStyle(document.documentElement).fontSize);

    const BLOCK_WIDTH = 2 * BOX_SEPARATION + BOX_WIDTH;
    const BLOCK_HEIGHT = 2 * BOX_SEPARATION + BOX_HEIGHT;

    const container = document.getElementById('map-container');
    const svgns = "http://www.w3.org/2000/svg";

    /* 내용 초기화 */
    container.innerHTML = '';

    /* 화살표 marker 정의 */
    const defs = document.createElementNS(svgns, "defs");
    const marker = document.createElementNS(svgns, "marker");
    marker.setAttribute("id", "arrow");
    marker.setAttribute("markerWidth", "8");
    marker.setAttribute("markerHeight", "6");
    marker.setAttribute("refX", "10");
    marker.setAttribute("refY", "3");
    marker.setAttribute("orient", "auto");
    const polygon = document.createElementNS(svgns, "polygon");
    polygon.setAttribute("points", "0 0, 8 3, 0 6");
    polygon.setAttribute("fill", "black ");
    marker.append(polygon);
    defs.append(marker);
    container.append(defs);

    /* 임시 변수 */
    const codes = Object.keys(this.subjects).sort();
    const columnData = {};
    const mapData = {};

    const arrowGroup = document.createElementNS(svgns, 'g');
    container.append(arrowGroup);

    for (let code of codes) {
      // 현재 과목 정보
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
      mapData[code] = {row: row, column: column};

      // 컨테이너 그룹
      const g = document.createElementNS(svgns, 'g');
      g.classList.add('subject-container');
      g.id = code;

      const rect = document.createElementNS(svgns, "rect");
      rect.classList.add('subject-box');
      rect.classList.add(`category${subject.category}`);
      rect.setAttribute("x", (BLOCK_WIDTH * column + BOX_SEPARATION) + UNIT);
      rect.setAttribute("y", (BLOCK_HEIGHT * row + BOX_SEPARATION) + UNIT);
      g.appendChild(rect);

      const codeText = document.createElementNS(svgns, "text");
      codeText.classList.add('subject-text');
      codeText.classList.add('subject-text-code');
      codeText.setAttribute("x", (BLOCK_WIDTH * column + (BLOCK_WIDTH / 2)) + UNIT); // 텍스트의 x 위치
      codeText.setAttribute("y", (BLOCK_HEIGHT * row + (BLOCK_HEIGHT / 2) - .5) + UNIT);  // 텍스트의 y 위치
      codeText.textContent = code + ' | ' + subject.credit;
      g.appendChild(codeText);

      const nameKRText = document.createElementNS(svgns, "text");
      nameKRText.classList.add('subject-text');
      nameKRText.classList.add('subject-text-name');
      nameKRText.setAttribute("x", (BLOCK_WIDTH * column + (BLOCK_WIDTH / 2)) + UNIT); // 텍스트의 x 위치
      nameKRText.setAttribute("y", (BLOCK_HEIGHT * row + (BLOCK_HEIGHT / 2) + .5) + UNIT);  // 텍스트의 y 위치
      nameKRText.textContent = subject.nameKR;
      g.appendChild(nameKRText);

      // const supplementaryText = document.createElementNS(svgns, "text");
      // supplementaryText.classList.add('subject-text');
      // supplementaryText.classList.add('subject-text-supplementary');
      // supplementaryText.setAttribute("x", (BLOCK_WIDTH * column + (BLOCK_WIDTH / 2)) + UNIT); // 텍스트의 x 위치
      // supplementaryText.setAttribute("y", (BLOCK_HEIGHT * row + (BLOCK_HEIGHT / 2) + 1) + UNIT);  // 텍스트의 y 위치
      // supplementaryText.textContent = `${subject.type} | ${subject.credit}`;
      // g.appendChild(supplementaryText);

      container.appendChild(g);
      g.addEventListener('click', subject.showDetails);
      g.addEventListener('mouseenter', () => {this.showPrerequisites(code)});
      g.addEventListener('mouseleave', this.hidePrerequisites);

      /* 연결선 그리기 */
      if (subject.prerequisites.size) {
        for (let sourceSubject of subject.prerequisites) {
          const line = document.createElementNS(svgns, "line");
          line.classList.add('subject-arrow');
          line.id = sourceSubject + ':' + code;
          const sourceRow = mapData[sourceSubject].row;
          const sourceColumn = mapData[sourceSubject].column;
          line.setAttribute("x1", (BLOCK_WIDTH * (sourceColumn + 0.5)) + UNIT);
          line.setAttribute("y1", (BLOCK_HEIGHT * (sourceRow + 0.5)) + UNIT);
          line.setAttribute("x2", (BLOCK_WIDTH * (column + 0.5)) + UNIT);
          line.setAttribute("y2", (BLOCK_HEIGHT * (row + 0.5)) + UNIT);
          line.setAttribute("marker-end", "url(#arrow)");

          /* 상하로 이웃한 경우 */
          if (sourceColumn === column && sourceRow - row === -1) {
            line.setAttribute("y1", (BLOCK_HEIGHT * (sourceRow + 1) - BOX_SEPARATION) + UNIT);
            line.setAttribute("y2", (BLOCK_HEIGHT * (row) + BOX_SEPARATION) + UNIT);
            arrowGroup.appendChild(line);
          } else if (sourceColumn === column && sourceRow - row === 1) {
            line.setAttribute("y1", (BLOCK_HEIGHT * (sourceColumn) - BOX_SEPARATION) + UNIT);
            line.setAttribute("y2", (BLOCK_HEIGHT * (column + 1) + BOX_SEPARATION) + UNIT);
            arrowGroup.appendChild(line);
          }
          /* 같은 열이지만 이웃하진 않은 경우 */
          else if (sourceColumn === column) {
            const polyLine = document.createElementNS(svgns, 'polyline');
            polyLine.classList.add('subject-arrow');
            polyLine.id = sourceSubject + ':' + code;
            const points = [];
            points.push([BLOCK_WIDTH * column + BOX_SEPARATION, BLOCK_HEIGHT * (sourceRow + .5)]);
            points.push([BLOCK_WIDTH * column, BLOCK_HEIGHT * (sourceRow + .5)]);
            points.push([BLOCK_WIDTH * column, BLOCK_HEIGHT * (row + .5)]);
            points.push([BLOCK_WIDTH * column + BOX_SEPARATION, BLOCK_HEIGHT * (row + .5)]);
            polyLine.setAttribute('points', points.map((x) => x.map((x) => x * COMP_UNIT_VAL).join(',')).join(' '));
            polyLine.setAttribute("marker-end", "url(#arrow)");
            arrowGroup.appendChild(polyLine);
          }
          /* 왼쪽 행 -> 오른쪽 행 */
          else if (sourceColumn < column) {
            const polyLine = document.createElementNS(svgns, 'polyline');
            polyLine.classList.add('subject-arrow');
            polyLine.id = sourceSubject + ':' + code;
            const points = [];
            points.push([BLOCK_WIDTH * (sourceColumn + 1) - BOX_SEPARATION, BLOCK_HEIGHT * (sourceRow + .5)]);
            points.push([BLOCK_WIDTH * column, BLOCK_HEIGHT * (sourceRow + .5)]);
            points.push([BLOCK_WIDTH * column, BLOCK_HEIGHT * (row + .5)]);
            points.push([BLOCK_WIDTH * (column) + BOX_SEPARATION, BLOCK_HEIGHT * (row + .5)]);
            polyLine.setAttribute('points', points.map((x) => x.map((x) => x * COMP_UNIT_VAL).join(',')).join(' '));
            polyLine.setAttribute("marker-end", "url(#arrow)");
            arrowGroup.appendChild(polyLine);
          }
          /* 그 외: 일단은 사선으로 그림 */
          else if (sourceColumn < column) {
            line.setAttribute("x1", (BLOCK_WIDTH * (sourceColumn + 1) - BOX_SEPARATION) + UNIT);
            line.setAttribute("x2", (BLOCK_WIDTH * (column) + BOX_SEPARATION) + UNIT);
            arrowGroup.appendChild(line);
          }
        }
      }
    }

    // 크기 재설정
    var  bbox = container.getBBox();
    container.setAttribute("width", bbox.x + bbox.width + bbox.x);
    container.setAttribute("height", bbox.y + bbox.height + bbox.y);

    return;
  };

  showPrerequisites = (code, recursive = false) => {
    const svg = document.getElementById('map-container');
    if (!recursive) {
      const subjects = svg.querySelectorAll('g.subject-container');
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

  hidePrerequisites = () => {
    /* 다이얼로그가 열려 있으면 유지 */
    if (document.getElementById('subject-details-dialog').getAttribute('open') !== null)
      return;

    const svg = document.getElementById('map-container');
    const subjects = svg.querySelectorAll('g.subject-container');
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

  addSubject = (subject) => {
    this.subjects[subject.code] = subject;
    return this;
  }

  addCategory = (name) => {
    if (this.categories.includes(name))
      return this.categories.indexOf(name);
    else {
      this.categories.push(name);
      return this.categories.length - 1;
    }
  }
}

const mainData = new MainData();