const 언어 = mainData.addCategory('언어');
const 시스템 = mainData.addCategory('시스템');
const 네트워크 = mainData.addCategory('네트워크');
const 데이터베이스 = mainData.addCategory('데이터베이스');
const 인공지능 = mainData.addCategory('인공지능');
const 그래픽 = mainData.addCategory('그래픽');

// 기초
const cs10001 = new Subject('CS.10001', 기필, '프로그래밍기초', 'Introduction to Programming', '2:3:3');
mainData.addSubject(cs10001);

const cs10009 = new Subject('CS.10009', 기선, '프로그래밍 실습', 'Programming Practice', '2:3:3');
cs10009.setSemester(0, false);
mainData.addSubject(cs10009);

// 2학년 전공
const cs20002 = new Subject('CS.20002', 전선, '문제해결기법', 'Problem Solving', '2:3:3');
cs20002.setSemester(0, false);
mainData.addSubject(cs20002);

const cs20004 = new Subject('CS.20004', 전필, '이산구조', 'Discrete Mathematics', '3:0:3');
cs20004.addStyle('important');
mainData.addSubject(cs20004);

const cs20006 = new Subject('CS.20006', 전필, '데이타구조', 'Data Structure', '3:0:3');
cs20006.addStyle('important');
mainData.addSubject(cs20006);

const cs20101 = new Subject('CS.20101', 전선, '디지탈시스템 및 실험', 'Digital System and Lab', '3:3:4');
cs20101.setSemester(2, false);
mainData.addSubject(cs20101);

const cs20200 = new Subject('CS.20200', 전선, '프로그래밍의 이해', 'Programming Principles', '3:0:3');
cs20200.setCategory(언어);
cs20200.setSemester(0, false);
cs20200.setSemester(2, false);
mainData.addSubject(cs20200);

const cs20300 = new Subject('CS.20300', 전선, '시스템프로그래밍', 'System Programming', '3:0:3');
cs20300.setCategory(시스템);
mainData.addSubject(cs20300);

const cs20700 = new Subject('CS.20700', 전선, '지능 로봇 설계 및 프로그래밍', 'Intelligent robot design and programming', '2:3:3');
cs20700.setSemester(2, false);
mainData.addSubject(cs20700);

// 3학년 전공
const cs30000 = new Subject('CS.30000', 전필, '알고리즘 개론', 'Introduction to Algorithms', '3:0:3');
cs30000.addStyle('important');
mainData.addSubject(cs30000);

const cs30101 = new Subject('CS.30101', 전필, '전산기조직', 'Computer Organization', '3:0:3');
cs30101.addStyle('important');
mainData.addSubject(cs30101);

const cs30200 = new Subject('CS.30200', 전필, '프로그래밍언어', 'Programming Language', '3:0:3');
cs30200.addStyle('important');
cs30200.setCategory(언어);
mainData.addSubject(cs30200);

const cs30202 = new Subject('CS.30202', 전선, '형식언어및오토마타', 'Formal Languages and Automata', '3:0:3');
cs30202.setCategory(언어);
cs30202.setSemester(0, false);
mainData.addSubject(cs30202);

const cs30300 = new Subject('CS.30300', 전필, '운영체제 및 실험', 'Operating Systems and Lab', '3:3:4');
cs30300.addStyle('important');
cs30300.setCategory(시스템);
mainData.addSubject(cs30300);

const cs30401 = new Subject('CS.30401', 전선, '전산망개론', 'Introduction to Computer Networks', '3:3:4');
cs30401.setCategory(네트워크);
mainData.addSubject(cs30401);

const cs30408 = new Subject('CS.30408', 전선, '정보보호개론', 'Introduction to Information Security', '3:0:3');
cs30408.setCategory(네트워크);
cs30408.setSemester(2, false);
mainData.addSubject(cs30408);

const cs30500 = new Subject('CS.30500', 전선, '소프트웨어 공학 개론', 'Introduction to Software Engineering', '3:0:3');
mainData.addSubject(cs30500);

const cs30600 = new Subject('CS.30600', 전선, '데이타베이스 개론', 'Introduction to Database', '3:0:3');
cs30600.setCategory(데이터베이스);
mainData.addSubject(cs30600);

const cs30701 = new Subject('CS.30701', 전선, '딥러닝 개론', 'Introduction to Deep Learning', '3:0:3');
cs30701.setCategory(인공지능);
mainData.addSubject(cs30701);

const cs30702 = new Subject('CS.30702', 전선, '파이썬을 통한 자연언어처리', 'Natural Language Processing with Python', '3:0:3');
cs30702.setCategory(인공지능);
cs30702.setSemester(2, false);
mainData.addSubject(cs30702);

const cs30704 = new Subject('CS.30704', 전선, '인간-컴퓨터 상호작용 개론', 'Introduction to Human-Computer Interaction', '3:0:3');
cs30704.setCategory(인공지능);
mainData.addSubject(cs30704);

const cs30706 = new Subject('CS.30706', 전선, '기계학습', 'Machine Learning', '3:0:3');
cs30706.setCategory(인공지능);
mainData.addSubject(cs30706);

// 2025년 봄에 한 번 개설됨
const cs30707 = new Subject('CS.30707', 전선, '강화학습 개론', 'Introduction to Reinforcement Learning', '3:0:3');
cs30707.setCategory(인공지능);
cs30707.setFrequency(0);
cs30707.setSemester(0, false);
cs30707.setSemester(2, false);
mainData.addSubject(cs30707);

const cs30800 = new Subject('CS.30800', 전선, '컴퓨터 그래픽스 개론', 'Introduction to Computer Graphics', '3:0:3');
cs30800.setCategory(그래픽);
cs30800.setSemester(2, false);
mainData.addSubject(cs30800);

// 4학년 전공
const cs40002 = new Subject('CS.40002', 전선, '전산논리학개론', 'Introduction to Logic for Computer Science', '3:0:3');
cs40002.setSemester(2, false);
mainData.addSubject(cs40002);

// 이건 뭐 어떻게 해야 함?
// const cs40008 = new Subject('CS.40008', 전선, '전산학 프로젝트', 'Computer Science Project', '3:0:3');
// mainData.addSubject(cs40008);

// 얘도?
// const cs40009 = new Subject('CS.40009', 전선, '산학협업 소프트웨어 프로젝트', 'Software Projects for Industrial Collaboration', '3:0:3');
// mainData.addSubject(cs40009);

// 2023년에 한 번 개설됨
// const cs40101 = new Subject('CS.40101', 전선, '인공지능을 위한 시스템', 'System for Artificial Intelligence', '3:0:3');
// cs40101.setCategory(인공지능);
// mainData.addSubject(cs40101);

const cs40200 = new Subject('CS.40200', 전선, '컴파일러설계', 'Compiler Design', '3:0:3');
cs40200.setCategory(언어);
cs40200.setSemester(0, false);
cs40200.setSemester(2, false);
mainData.addSubject(cs40200);

const cs40805 = new Subject('CS.40805', 전선, '컴퓨터비전을 위한 기계학습', 'Machine Learning for Computer Vision', '3:0:3');
cs40805.setCategory(그래픽);
cs40805.setSemester(0, false);
mainData.addSubject(cs40805);

// 2024년에 한 번 개설됨
const cs40806 = new Subject('CS.40806', 전선, '웨어러블 사용자 인터페이스', 'Wearable User Interface', '3:0:3');
mainData.addSubject(cs40806);

// 2023, 2024년 가을에만 개설됨
const cs40809 = new Subject('CS.40809', 전선, '컴퓨터윤리와사회문제', 'Computer Ethics & Social issues', '3:0:3');
cs40809.setFrequency(0);
cs40809.setSemester(0, false);
mainData.addSubject(cs40809);