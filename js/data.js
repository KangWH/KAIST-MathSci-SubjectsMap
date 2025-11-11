const 대수 = mainData.addCategory('대수');
const 기하위상 = mainData.addCategory('기하·위상');
const 해석 = mainData.addCategory('해석');
const 확률통계 = mainData.addCategory('확률·통계');
const 응용 = mainData.addCategory('응용');
const 이산 = mainData.addCategory('이산');

// 기초
const mas10001 = new Subject('MAS.10001', '기초필수', '미적분학 I', 'Calculus I', '3:0:3');
mainData.addSubject(mas10001);

const mas10002 = new Subject('MAS.10002', '기초필수', '미적분학 II', 'Calculus II', '3:0:3');
mas10002.addPrerequisite('MAS.10001');
mainData.addSubject(mas10002);

const mas10009 = new Subject('MAS.10009', '기초선택', '선형대수학개론', 'Introduction to Linear Algebra', '3:0:3');
mainData.addSubject(mas10009);

const mas10010 = new Subject('MAS.10010', '기초선택', '데이터과학을 위한 선형대수학', 'Linear Algebra for Data Science', '3:0:3');
mainData.addSubject(mas10010);

const mas20001 = new Subject('MAS.20001', '기초선택', '응용미분방정식', 'Differential Equations and Applications', '3:0:3');
mainData.addSubject(mas20001);

const mas20002 = new Subject('MAS.20002', '기초선택', '응용해석학', 'Applied Mathematical Analysis', '3:0:3');
mas20002.addPrerequisite('MAS.20001');
mas20002.setSemester(0, false);
mainData.addSubject(mas20002);

const mas20050 = new Subject('MAS.20050', '기초선택', '확률및통계', 'Probability and Statistics', '3:0:3');
mas20050.addPrerequisite('MAS.10002');
mainData.addSubject(mas20050);

// 2학년 전공선택
const mas20010 = new Subject('MAS.20010', '전공선택', '정수론 개론', 'Introduction to Number Theory', '3:0:3');
mas20010.setCategory(대수);
mas20010.setSemester(2, false);
mainData.addSubject(mas20010);

const mas20012 = new Subject('MAS.20012', '전공선택', '선형대수학', 'Linear Algebra', '3:0:3');
mas20012.setCategory(대수);
mas20012.addStyle('important');
mainData.addSubject(mas20012);

const mas20041 = new Subject('MAS.20041', '전공선택', '해석학 I', 'Analysis I', '3:2:4');
mas20041.setCategory(해석);
mas20041.addStyle('important');
mas20041.setSemester(2, false);
mainData.addSubject(mas20041);

const mas20042 = new Subject('MAS.20042', '전공선택', '해석학 II', 'Analysis II', '3:2:4');
mas20042.setCategory(해석);
mas20042.addPrerequisite('MAS.20041');
mas20042.setSemester(0, false);
mainData.addSubject(mas20042);

const mas20070 = new Subject('MAS.20070', '전공선택', '논리및집합', 'Logic and Set Theory', '3:0:3');
mas20070.setSemester(0, false);
mainData.addSubject(mas20070);

const mas20075 = new Subject('MAS.20075', '전공선택', '이산수학', 'Discrete Mathematics', '3:0:3');
mas20075.setCategory(이산);
mas20075.setSemester(2, false);
mainData.addSubject(mas20075);

// 3학년 전공선택
const mas30011 = new Subject('MAS.30011', '전공선택', '현대대수학 I', 'Modern Algebra I', '3:2:4');
mas30011.setCategory(대수);
mas30011.addStyle('important');
mas30011.setSemester(2, false);
mainData.addSubject(mas30011);

const mas30012 = new Subject('MAS.30012', '전공선택', '현대대수학 II', 'Modern Algebra II', '3:0:3');
mas30012.setCategory(대수);
mas30012.addPrerequisite('MAS.20012');
mas30012.addPrerequisite('MAS.30011');
mas30012.setSemester(0, false);
mainData.addSubject(mas30012);

const mas30021 = new Subject('MAS.30021', '전공선택', '미분기하학개론', 'Introduction to Differential Geometry', '3:2:4');
mas30021.setCategory(기하위상);
mas30021.addStyle('important');
mas30021.addPrerequisite('MAS.10009');
mas30021.addPrerequisite('MAS.20041');
mas30021.setSemester(0, false);
mainData.addSubject(mas30021);

const mas30031 = new Subject('MAS.30031', '전공선택', '위상수학', 'Topology', '3:2:4');
mas30031.setCategory(기하위상);
mas30031.addStyle('important');
mas30031.setSemester(2, false);
mainData.addSubject(mas30031);

const mas30041 = new Subject('MAS.30041', '전공선택', '복소변수함수론', 'Complex Variables I', '3:0:3');
mas30041.setCategory(해석);
mas30041.addStyle('important');
mas30041.addPrerequisite('MAS.20041');
mas30041.setSemester(2, false);
mainData.addSubject(mas30041);

const mas30050 = new Subject('MAS.30050', '전공선택', '기초확률론', 'Elementary Probability Theory', '3:0:3');
mas30050.setCategory(확률통계);
mas30050.addPrerequisite('MAS.20050');
mas30050.setSemester(2, false);
mainData.addSubject(mas30050);

const mas30055 = new Subject('MAS.30055', '전공선택', '수리통계학', 'Mathematical Statistics', '3:0:3');
mas30055.setCategory(확률통계);
mas30055.addStyle('important');
mas30055.addPrerequisite('MAS.20050');
mas30055.addPrerequisite('MAS.20041');
mas30055.setSemester(0, false);
mainData.addSubject(mas30055);

const mas30064 = new Subject('MAS.30064', '전공선택', '행렬계산과 응용', 'Matrix Computation and Application', '3:0:3');
mas30064.setCategory(응용);
mas30064.addPrerequisite('MAS.10009');
mas30064.setFrequency(2);
mas30064.setSemester(2, false);
mainData.addSubject(mas30064);

const mas30065 = new Subject('MAS.30065', '전공선택', '수치해석학개론', 'Introduction to Numerical Analysis', '3:0:3');
mas30065.setCategory(응용);
mas30065.addPrerequisite('MAS.10009');
mas30065.setSemester(2, false);
mainData.addSubject(mas30065);

const mas30074 = new Subject('MAS.30074', '전공선택', '최적화이론', 'Optimization Theory', '3:0:3');
mas30074.setCategory(응용);
mas30074.addPrerequisite('MAS.10001');
mas30074.addPrerequisite('MAS.10009');
mas30074.setFrequency(0);
mainData.addSubject(mas30074);

// 4학년 전공선택
const mas40011 = new Subject('MAS.40011', '전공선택', '대수기하학개론', 'Introduction to Algebraic Geometry', '3:0:3');
mas40011.setCategory(대수);
mas40011.addPrerequisite('MAS.30012');
mas40011.setFrequency(2);
mas40011.setSemester(0, false);
mainData.addSubject(mas40011);

const mas40012 = new Subject('MAS.40012', '전공선택', '가환대수학 입문', 'Introduction to Commutative Algebra', '3:0:3');
mas40012.setCategory(대수);
mas40012.addPrerequisite('MAS.30012');
mas40012.setFrequency(2);
mas40012.setSemester(2, false);
mainData.addSubject(mas40012);

const mas40020 = new Subject('MAS.40020', '전공선택', '다양체해석학', 'Analysis on Manifolds', '3:0:3');
mas40020.setCategory(기하위상);
mas40020.addPrerequisite('MAS.20012');
mas40020.addPrerequisite('MAS.30021');
mas40020.setSemester(2, false);
mainData.addSubject(mas40020);

const mas40030 = new Subject('MAS.40030', '전공선택', '조합적 위상수학', 'Combinatorial Topology', '3:0:3');
mas40030.setCategory(기하위상);
mas40030.addPrerequisite('MAS.30011');
mas40030.addPrerequisite('MAS.30031');
mas40030.setSemester(0, false);
mainData.addSubject(mas40030);

// 2022년 이후 개설된 적 없음
// const mas40035 = new Subject('MAS.40035', '전공선택', '행렬군론', 'Matrix Groups', '3:0:3');
// mas40035.setCategory(기하위상);
// mas40035.setFrequency(0);
// mainData.addSubject(mas40035);

const mas40040 = new Subject('MAS.40040', '전공선택', '편미분방정식개론', 'Introduction to Partial Differential Equations', '3:0:3');
mas40040.setCategory(해석);
mas40040.addPrerequisite('MAS.20001');
mas40040.setSemester(2, false);
mainData.addSubject(mas40040);

const mas40041 = new Subject('MAS.40041', '전공선택', '르베그적분론', 'Lebesgue Integral Theory', '3:0:3');
mas40041.setCategory(해석);
mas40041.addPrerequisite('MAS.20041');
mas40041.setSemester(0, false);
mainData.addSubject(mas40041);

const mas40042 = new Subject('MAS.40042', '전공선택', '푸리에 해석과 응용', 'Fourier Analysis and Applications', '3:0:3');
mas40042.setCategory(해석);
mas40042.addPrerequisite('MAS.20042');
mas40042.setFrequency(0);
mas40042.setSemester(0, false);
mas40042.setSemester(2, true);
mainData.addSubject(mas40042);

const mas40043 = new Subject('MAS.40043', '전공선택', '상미분방정식과 동역학계', 'Ordinary Differential Equations and Dynamical Systems', '3:0:3');
mas40043.setCategory(해석);
mas40043.addPrerequisite('MAS.20001');
mas40043.addPrerequisite('MAS.20041');
mas40043.setFrequency(0);
mainData.addSubject(mas40043);

const mas40055 = new Subject('MAS.40055', '전공선택', '선형모형', 'Linear Model', '3:0:3');
mas40055.setCategory(확률통계);
mas40055.addPrerequisite('MAS.10009');
mas40055.addPrerequisite('MAS.20050');
mas40055.setSemester(2, false);
mainData.addSubject(mas40055);

const mas40056 = new Subject('MAS.40056', '전공선택', '컴퓨터 통계방법론', 'Statistical Methods with Computer', '3:0:3');
mas40056.setCategory(확률통계);
mas40056.addPrerequisite('MAS.20050');
mas40056.setFrequency(0);
mas40056.setSemester(2, true);
mainData.addSubject(mas40056);

const mas40067 = new Subject('MAS.40067', '전공선택', '수리생물학개론', 'Introduction to Mathematical Biology', '3:0:3');
mas40067.setCategory(응용);
mas40067.addPrerequisite('MAS.10009');
mas40067.addPrerequisite('MAS.20001');
mas40067.addPrerequisite('MAS.20050');
mas40067.setFrequency(2);
mas40067.setSemester(0, false);
mainData.addSubject(mas40067);

const mas40073 = new Subject('MAS.40073', '전공선택', '수학과 인공지능개론', 'Introduction to Artificial Intelligence with Mathematics', '3:0:3');
mas40073.setCategory(응용);
mas40073.addPrerequisite('MAS.10009');
mas40073.addPrerequisite('MAS.20050');
mas40073.addPrerequisite('MAS.20041');
mas40073.setSemester(2, false);
mainData.addSubject(mas40073);

const mas40077 = new Subject('MAS.40077', '전공선택', '그래프이론개론', 'Introduction to Graph Theory', '3:0:3');
mas40077.setCategory(이산);
mas40077.addPrerequisite('MAS.20075');
mas40077.setSemester(0, false);
mainData.addSubject(mas40077);

// 2022년 이후 개설된 적 없음
// const mas40078 = new Subject('MAS.40078', '전공선택', '이산기하', 'Discrete Geometry', '3:0:3');
// mas40078.setCategory(이산);
// mas40078.setFrequency(0);
// mainData.addSubject(mas40078);

// 석사 1학년
const mas50001 = new Subject('MAS.50001', '선택', '공학자를 위한 응용해석과 확률', 'Applied Analysis and Probability for Engineers', '3:0:3');
mas50001.setFrequency(0);
mainData.addSubject(mas50001);

const mas50010 = new Subject('MAS.50010', '선택', '정수론', 'Number Theory', '3:0:3');
mas50010.setCategory(대수);
mas50010.addPrerequisite('MAS.40012');
mainData.addSubject(mas50010);

const mas50011 = new Subject('MAS.50011', '선택', '대수학 I', 'Algebra I', '3:0:3');
mas50011.setCategory(대수);
mas50011.addPrerequisite('MAS.30012');
mainData.addSubject(mas50011);

const mas50012 = new Subject('MAS.50012', '선택', '대수학 II', 'Algebra II', '3:0:3');
mas50012.setCategory(대수);
mas50012.addPrerequisite('MAS.50011');
mainData.addSubject(mas50012);

const mas50013 = new Subject('MAS.50013', '선택', '호몰로지 대수학', 'Homological Algebra', '3:0:3');
mas50013.setCategory(대수);
mas50013.addPrerequisite('MAS.40012');
mas50013.setFrequency(2);
mainData.addSubject(mas50013);

const mas50020 = new Subject('MAS.50020', '선택', '미분기하학', 'Differential Geometry', '3:0:3');
mas50020.setCategory(기하위상);
mas50020.addPrerequisite('MAS.20012');
mas50020.addPrerequisite('MAS.30031');
mainData.addSubject(mas50020);

const mas50031 = new Subject('MAS.50031', '선택', '대수적 위상수학 I', 'Algebraic Topology I', '3:0:3');
mas50031.setCategory(기하위상);
mas50031.addPrerequisite('MAS.40030');
mainData.addSubject(mas50031);

const mas50032 = new Subject('MAS.50032', '선택', '대수적 위상수학 II', 'Algebraic Topology II', '3:0:3');
mas50032.setCategory(기하위상);
mas50032.addPrerequisite('MAS.50031');
mainData.addSubject(mas50032);

const mas50040 = new Subject('MAS.50040', '선택', '실변수함수론', 'Real Analysis', '3:0:3');
mas50040.setCategory(해석);
mas50040.addPrerequisite('MAS.40041');
mainData.addSubject(mas50040);

const mas50041 = new Subject('MAS.50041', '선택', '복소수함수론', 'Complex Function Theory', '3:0:3');
mas50041.setCategory(해석);
mas50041.addPrerequisite('MAS.30041');
mainData.addSubject(mas50041);

const mas50050 = new Subject('MAS.50050', '선택', '확률론', 'Probability Theory', '3:0:3');
mas50050.setCategory(확률통계);
mas50050.addPrerequisite('MAS.40041');
mainData.addSubject(mas50050);

const mas50055 = new Subject('MAS.50055', '선택', '고급통계학', 'Advanced Statistics', '3:0:3');
mas50055.setCategory(확률통계);
mas50055.addPrerequisite('MAS.30055');
mainData.addSubject(mas50055);

const mas50057 = new Subject('MAS.50057', '선택', '기계학습이론및응용', 'Theory and Application of Machine Learning', '3:0:3');
mas50057.setCategory(확률통계);
mas50057.setFrequency(0);
mainData.addSubject(mas50057);

// 2023년 이후 개설된 적 없음
// const mas50060 = new Subject('MAS.50060', '선택', '응용수학의 방법', 'Methods of Applied Mathematics', '3:0:3');
// mas50060.setCategory(응용);
// mainData.addSubject(mas50060);

const mas50065 = new Subject('MAS.50065', '선택', '수치해석학', 'Numerical Analysis', '3:0:3');
mas50065.setCategory(응용);
mas50065.setFrequency(0);
mainData.addSubject(mas50065);

// 2023년 이후 개설된 적 없음
const mas50075 = new Subject('MAS.50075', '선택', '조합수학', 'Combinatorics', '3:0:3');
mas50075.setCategory(이산);
mas50075.addPrerequisite('MAS.20075');
mas50075.setFrequency(0);
mainData.addSubject(mas50075);