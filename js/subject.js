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

    this.prerequisites = new Set();
    this.history = [];
  }

  addPrerequisite = (code) => {
    this.prerequisites.add(code);
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