const options = {
  grouping: 'onlygrades',
  showgraduate: false,
};

const getColumn = {
  'onlygrades': (subject) => Number(subject.code.charAt(4)) - 1,
  'groupbasics': (subject) => subject.type.includes('기초') ? 0 : Number(subject.code.charAt(4)) - 1,
  'separatebasics': (subject) => subject.type === '기초필수' ? 0 : subject.type === '기초선택' ? 1 : Number(subject.code.charAt(4)),
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
    1: '20000번대 전공',
    2: '30000번대 전공',
    3: '40000번대 전공',
    4: '50000번대 전공',
  },
  'separatebasics': {
    0: '기초필수',
    1: '기초선택',
    2: '20000번대 전공',
    3: '30000번대 전공',
    4: '40000번대 전공',
    5: '50000번대 전공',
  },
}

document.getElementById('options-form').addEventListener('change', (e) => {
  const form = e.currentTarget;

  options.grouping = form.grouping.value;
  options.showgraduate = form.showgraduate.checked;

  mainData.drawMap(options);
});