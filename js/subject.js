const SUBJECT_TYPES = ['기초필수', '기초선택', '전공필수', '전공선택', '교양필수', '인문사회선택', '공통필수', '선택(석/박사)', '자유선택', '개별연구', '졸업연구', '논문연구', '인턴십', '기타'];

class Subject {
  constructor (code, type, nameKR, nameEN, credit) {
    this.code = code;
    this.type = type;
    this.nameKR = nameKR;
    this.nameEN = nameEN;
    this.credit = credit;

    this.category = 0;
    this.styles = new Set();
    this.frequency = 1; // 연도를 입력, 0은 불규칙 (예: 1은 매년, 2는 격년)
    this.semesters = [true, false, true, false]; // 봄, 여름, 가을, 겨울

    this.prerequisites = new Set();
    // this.history = [];
  }

  addPrerequisite = (code) => {
    this.prerequisites.add(code);
    return this;
  }

  setFrequency = (value) => {
    if (isNaN(Number(value)))
      throw new Error('wrong value for frequency');
    this.frequency = Number(value);
    if (value === 0)
      this.unsetSemester();
    return this;
  }
  setSemester = (semesterIndex, value) => {
    if (![0, 1, 2, 3].includes(semesterIndex))
      throw new Error('Semester Index is invalid');
    if (value !== true && value !== false)
      throw new Error('Value must be boolean');

    this.semesters[semesterIndex] = value;
    return this;
  }
  unsetSemester = () => {
    // 개설 학기가 불규칙한 경우
    this.semesters = [false, false, false, false];
    return this;
  }

  addStyle = (style) => {
    this.styles.add(style);
    return this;
  }
  deleteStyle = (style) => {
    this.styles.delete(style);
    return this;
  }

  setCategory = (id) => {
    if (Number(id) !== id || isNaN(Number(id)))
      throw new Error('Category ID must be an integer.');
    
    this.category = id;
    return this;
  }

  showDetails = (e) => {
    e.preventDefault();

    const form = document.getElementById('subject-details-form');
    form.subjectTitle.textContent = this.nameKR;
    form.code.value = this.code;
    form.type.value = this.type;
    form.credit.value = this.credit;

    form.frequency.value = this.frequency > 3 ? this.frequency + '년마다' : ['불규칙', '매년', '격년'][this.frequency];
    form.semesters.value = ['봄', '여름', '가을', '겨울'].filter((v, i) => this.semesters[i]).join(', ');
    if (form.semesters.value === '')
      form.semesters.value = '불규칙';

    document.getElementById('subject-details-dialog').showModal();
  }
}

class MainData {
  constructor () {
    this.subjects = {};
    this.categories = ['기타'];

    this.activeNode = null;
    this.filter = {
      query: null,
      type: null,
      category: null,
    };
  }

  addSubject = (subject) => {
    this.subjects[subject.code] = subject;
    return this;
  };

  addCategory = (name) => {
    if (this.categories.includes(name))
      return this.categories.indexOf(name);
    else {
      this.categories.push(name);
      return this.categories.length - 1;
    }
  };

  setQuery = (query) => {
    this.clearFilter();
    this.filter.query = query;
  };
  setTypeFilter = (typeId) => {
    this.clearFilter();
    this.filter.type = typeId;
  };
  setCategoryFilter = (categoryId) => {
    this.clearFilter();
    this.filter.category = categoryId;
  };
  setFilter = (key, value) => {
    this.clearFilter();
    this.filter[key] = value;
  };
  clearFilter = () => {
    this.filter = {
      query: null,
      type: null,
      category: null,
    };
  };

  checkFilter = (code) => {
    const key = this.filter.query !== null ? 'query' : this.filter.type !== null ? 'type' : this.filter.category !== null ? 'category' : null;
    if (key === null)
      return true;

    const subject = this.subjects[code];
    switch (key) {
      case 'query':
        return subject.code.includes(query) || subject.nameKR.replaceAll(' ', '').includes(query.replaceAll(' ')) || subject.nameEN.includes(query);

      case 'type':
        return subject.type === this.filter.type;
      
      case 'category':
        return subject.category === this.filter.category;
    }
  };
}

const mainData = new MainData();