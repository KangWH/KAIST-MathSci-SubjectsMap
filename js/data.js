// 기초
const mas10001 = new Subject('MAS.10001', '기초필수', '미적분학 I', 'Calculus I', '3:0:3');
mainData.addSubject(mas10001);

const mas10002 = new Subject('MAS.10002', '기초필수', '미적분학 II', 'Calculus II', '3:0:3');
mas10002.addPrerequisite('MAS.10001');
mainData.addSubject(mas10002);

const mas10009 = new Subject('MAS.10009', '기초선택', '선형대수학개론', 'Introduction to Linear Algebra', '3:0:3');
mainData.addSubject(mas10009);

const mas10010 = new Subject('MAS.10010', '기초선택', '데이터과학을 위한 선형대수학', 'Data Science Linear Algebra?', '3:0:3');
mainData.addSubject(mas10010);

const mas20001 = new Subject('MAS.20001', '기초선택', '응용미분방정식', 'Application of Differential Equations', '3:0:3');
mainData.addSubject(mas20001);

const mas20002 = new Subject('MAS.20002', '기초선택', '응용해석학', 'AppAny?', '3:0:3');
mas20002.addPrerequisite('MAS.20001');
mainData.addSubject(mas20002);

const mas20050 = new Subject('MAS.20050', '기초선택', '확률및통계', 'Prob&Stat?', '3:0:3');
mainData.addSubject(mas20050);

// 2학년 전공선택
const mas20010 = new Subject('MAS.20010', '전공선택', '정수론 개론', 'Introduction to Number Theory', '3:0:3');
mainData.addSubject(mas20010);

const mas20012 = new Subject('MAS.20012', '전공선택', '선형대수학', 'Linear Algebra', '3:0:3');
mainData.addSubject(mas20012);

const mas20041 = new Subject('MAS.20041', '전공선택', '해석학 I', 'Analysis I', '3:2:4');
mainData.addSubject(mas20041);

const mas20042 = new Subject('MAS.20042', '전공선택', '해석학 II', 'Analysis II', '3:2:4');
mas20042.addPrerequisite('MAS.20041');
mainData.addSubject(mas20042);

const mas20070 = new Subject('MAS.20070', '전공선택', '논리및집합', 'Logic and Set Theory', '3:0:3');
mainData.addSubject(mas20070);

const mas20075 = new Subject('MAS.20075', '전공선택', '이산수학', 'Discrete Mathematics', '3:0:3');
mainData.addSubject(mas20075);

// 3학년 전공선택
const mas30011 = new Subject('MAS.30011', '전공선택', '현대대수학 I', 'Modern Algebra I', '3:2:4');
mainData.addSubject(mas30011);

const mas30012 = new Subject('MAS.30012', '전공선택', '현대대수학 II', 'Modern Algebra II', '3:0:3');
mas30012.addPrerequisite('MAS.20012');
mas30012.addPrerequisite('MAS.30011');
mainData.addSubject(mas30012);

const mas30021 = new Subject('MAS.30021', '전공선택', '미분기하학개론', 'Introduction to Differential Algebra', '3:2:4');
mas30021.addPrerequisite('MAS.20041');
mainData.addSubject(mas30021);

const mas30031 = new Subject('MAS.30031', '전공선택', '위상수학', 'Topology', '3:2:4');
mainData.addSubject(mas30031);

const mas30041 = new Subject('MAS.30041', '전공선택', '복소변수함수론', 'Complex?', '3:0:3');
mas30041.addPrerequisite('MAS.20041');
mainData.addSubject(mas30041);

const mas30050 = new Subject('MAS.30050', '전공선택', '기초확률론', 'Stat?', '3:0:3');
mas30050.addPrerequisite('MAS.20050');
mainData.addSubject(mas30050);

const mas30055 = new Subject('MAS.30055', '전공선택', '수리통계학', 'Prob?', '3:0:3');
mas30055.addPrerequisite('MAS.20050');
mainData.addSubject(mas30055);

const mas30064 = new Subject('MAS.30064', '전공선택', '행렬계산과 응용', 'Mat?', '3:0:3');
mas30064.addPrerequisite('MAS.10009');
mainData.addSubject(mas30064);

const mas30065 = new Subject('MAS.30065', '전공선택', '수치해석학개론', 'Introduction to Numerical Analysis', '3:0:3');
mas30065.addPrerequisite('MAS.10009');
mainData.addSubject(mas30065);

const mas30074 = new Subject('MAS.30074', '전공선택', '최적화이론', 'Optimization?', '3:0:3');
mas30074.addPrerequisite('MAS.10001');
mas30074.addPrerequisite('MAS.10009');
mainData.addSubject(mas30074);

// 4학년 전공선택
const mas40011 = new Subject('MAS.40011', '전공선택', '대수기하학개론', 'Introduction to Algebraic Geometry', '3:0:3');
mas40011.addPrerequisite('MAS.30012');
mainData.addSubject(mas40011);

const mas40012 = new Subject('MAS.40012', '전공선택', '가환대수학 입문', 'Introduction to Commutative Algebra', '3:0:3');
mas40012.addPrerequisite('MAS.30012');
mainData.addSubject(mas40012);

const mas40020 = new Subject('MAS.40020', '전공선택', '다양체해석학', 'Analysis on Manifolds', '3:0:3');
mas40020.addPrerequisite('MAS.30021');
mainData.addSubject(mas40020);

const mas40030 = new Subject('MAS.40030', '전공선택', '조합적 위상수학', 'Combinatorial Topology', '3:0:3');
mas40030.addPrerequisite('MAS.30011');
mas40030.addPrerequisite('MAS.30031');
mainData.addSubject(mas40030);

const mas40035 = new Subject('MAS.40035', '전공선택', '행렬군론', 'Matrix group?', '3:0:3');
mainData.addSubject(mas40035);

const mas40040 = new Subject('MAS.40035', '전공선택', '편미분방정식개론', 'Introduction to Partial Differential Equations', '3:0:3');
mas40040.addPrerequisite('MAS.20001');
mainData.addSubject(mas40040);

const mas40041 = new Subject('MAS.40041', '전공선택', '르베그적분론', 'Lebesgue Integral Theory', '3:0:3');
mas40041.addPrerequisite('MAS.20041');
mainData.addSubject(mas40041);

const mas40042 = new Subject('MAS.40042', '전공선택', '푸리에 해석과 응용', '', '3:0:3');
mas40042.addPrerequisite('MAS.20042');
mainData.addSubject(mas40042);

const mas40043 = new Subject('MAS.40043', '전공선택', '상미분방정식과 동역학계', '', '3:0:3');
mas40043.addPrerequisite('MAS.20001');
mainData.addSubject(mas40043);

const mas40055 = new Subject('MAS.40055', '전공선택', '선형모형', '', '3:0:3');
mas40055.addPrerequisite('MAS.10009');
mainData.addSubject(mas40055);

const mas40056 = new Subject('MAS.40056', '전공선택', '컴퓨터 통계방법론', '', '3:0:3');
mas40056.addPrerequisite('MAS.20050');
mainData.addSubject(mas40056);

const mas40067 = new Subject('MAS.40067', '전공선택', '수리생물학개론', '', '3:0:3');
mas40067.addPrerequisite('MAS.10009');
mas40067.addPrerequisite('MAS.20001');
mas40067.addPrerequisite('MAS.20050');
mainData.addSubject(mas40067);

const mas40071 = new Subject('MAS.40071', '전공선택', '금융수학과 확률모형', '', '3:0:3');
mainData.addSubject(mas40071);

const mas40073 = new Subject('MAS.40073', '전공선택', '수학과 인공지능개론', '', '3:0:3');
mas40073.addPrerequisite('MAS.10009');
mainData.addSubject(mas40073);

const mas40077 = new Subject('MAS.40077', '전공선택', '그래프이론개론', '', '3:0:3');
mas40077.addPrerequisite('MAS.20075');
mainData.addSubject(mas40077);

const mas40078 = new Subject('MAS.40078', '전공선택', '이산기하', '', '3:0:3');
mainData.addSubject(mas40078);