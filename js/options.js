const options = {
  grouping: 'onlygrades',
  showgraduate: false,
  compact: false,
};

const getColumn = {
  'onlygrades': (subject) => Number(subject.code.split('.')[1].charAt(0)) - 1,
  'groupbasics': (subject) => [기필, 기선].includes(subject.type) ? 0 : Number(subject.code.split('.')[1].charAt(0)) - 1,
  'separatebasics': (subject) => subject.type === 기필 ? 0 : subject.type === 기선 ? 1 : Number(subject.code.split('.')[1].charAt(0)),
};

const categoryData = {
  'onlygrades': {
    0: '10000번대',
    1: '20000번대',
    2: '30000번대',
    3: '40000번대',
    4: '50000번대',
  },
  'groupbasics': {
    0: '기초과목',
    1: '20000번대',
    2: '30000번대',
    3: '40000번대',
    4: '50000번대',
  },
  'separatebasics': {
    0: '기초필수',
    1: '기초선택',
    2: '20000번대',
    3: '30000번대',
    4: '40000번대',
    5: '50000번대',
  },
}

document.getElementById('options-form').addEventListener('change', (e) => {
  const form = e.currentTarget;

  options.grouping = form.grouping.value;
  options.showgraduate = form.showgraduate.checked;
  options.compact = form.compact.checked;

  BOX_HEIGHT = options.compact ? 2 : 3;
  BLOCK_HEIGHT = 2 * BOX_SEPARATION + BOX_HEIGHT;

  mainData.drawMap(options);
});