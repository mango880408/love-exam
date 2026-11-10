/**
 * 연애능력평가 - 여친/남친 고사 (Love Exam)
 * [필수] 기본 탐구영역 & [선택] 성적취향 탐구영역(19+) 지원 버전
 */

const CIRCLE_NUMS = ['①', '②', '③', '④', '⑤'];

// 1. [필수 과목] 기본 탐구영역 추천 문제 자판기
const BASIC_PRESET_QUESTIONS = [
  {
    label: '☕ 최애 카페 메뉴',
    clusterId: 'basic_cafe',
    keywords: ['카페', '커피', '음료', '스타벅스', '아메리카노', '라떼', '메뉴', '마시는'],
    pickCount: 1428,
    attemptCount: 3120,
    wrongCount: 1092,
    variants: [
      '내가 카페 가면 맨날 시키는 고정 음료는?',
      '스타벅스에서 내가 무조건 먹는 최애 메뉴는?',
      '다음 중 내가 카페에 갔을 때 가장 자주 시키는 소울 음료는?'
    ],
    category: 'basic',
    type: 'mc',
    stem: '다음 중 내가 카페에 갔을 때 가장 자주 시키는 소울 음료는?',
    options: ['아이스 아메리카노', '바닐라 라떼', '자몽 허니 블랙티', '초코/말차 스무디'],
    answer: 0,
    points: 20,
    comment: '카페 갈 때마다 시키는 내 고정 메뉴야!'
  },
  {
    label: '📅 첫 만남 계절/장소',
    clusterId: 'basic_first_meet',
    keywords: ['처음', '만났던', '첫만남', '첫데이트', '장소', '먹었던', '계절'],
    pickCount: 1195,
    attemptCount: 2840,
    wrongCount: 1363,
    variants: [
      '우리가 처음 만났던 날 먹었던 메뉴는?',
      '우리 첫 데이트 장소 기억나?',
      '우리가 처음 만났던 날, 함께 먹었던 음식이나 장소로 올바른 것은?'
    ],
    category: 'basic',
    type: 'mc',
    stem: '우리가 처음 만났던 날, 함께 먹었던 음식이나 장소로 올바른 것은?',
    options: ['분위기 좋은 파스타집', '고깃집에 소주 한 잔', '조용한 카페', '영화관 팝콘 세트'],
    answer: 0,
    points: 20,
    comment: '그날의 설렘을 잊으면 안 되지!'
  },
  {
    label: '😡 화났을 때 대처법',
    clusterId: 'basic_angry_cope',
    keywords: ['삐졌', '서운', '화났', '싸웠', '기분', '풀어', '대처', '괜찮아'],
    pickCount: 1680,
    attemptCount: 3890,
    wrongCount: 2489,
    variants: [
      '내가 삐졌을 때 기분 풀어주는 최고 방법은?',
      '내가 카톡으로 "괜찮아"라고 했을 때 진짜 속마음은?',
      '내가 삐졌거나 서운할 때 기분을 풀어주는 가장 올바른 행동은?'
    ],
    category: 'basic',
    type: 'mc',
    stem: '내가 삐졌거나 서운할 때 기분을 풀어주는 가장 올바른 행동은?',
    options: ['맛있는 거 사주면서 애교부리기', '혼자 생각할 시간 충분히 주기', '장문의 진심 어린 카톡 남기기', '일단 무조건 잘못했다고 안아주기'],
    answer: 0,
    points: 20,
    comment: '이것만 알아도 우리 싸울 일 절반은 줄어듦!'
  },
  {
    label: '🍲 소울푸드 (주관식)',
    clusterId: 'basic_soul_food',
    keywords: ['소울푸드', '스트레스', '최애음식', '야식', '떡볶이', '마라탕', '먹고싶은'],
    pickCount: 1310,
    attemptCount: 2950,
    wrongCount: 1210,
    variants: [
      '나 힘들 때 사주면 바로 풀리는 최애 야식은?',
      '내가 일주일에 세 번도 먹을 수 있는 소울푸드는?',
      '[서술형] 스트레스 받았을 때 내가 무조건 찾게 되는 최애 음식(소울푸드)을 적으시오.'
    ],
    category: 'basic',
    type: 'subj',
    stem: '[서술형] 스트레스 받았을 때 내가 무조건 찾게 되는 최애 음식(소울푸드)을 적으시오.',
    options: ['', '', '', ''],
    answerText: '떡볶이, 마라탕',
    points: 20,
    comment: '힘든 날 이거 사 들고 오면 평생 충성함!'
  },
  {
    label: '🎂 내 생일/기념일 (주관식)',
    clusterId: 'basic_anniversary',
    keywords: ['생일', '기념일', '사귀기', '날짜', '1일', '몇월', '며칠'],
    pickCount: 980,
    attemptCount: 2410,
    wrongCount: 675,
    variants: [
      '우리가 처음 사귀기로 한 1일 날짜는?',
      '내 생일 4자리 숫자 적어봐!',
      '[단답형] 내 생일(월/일) 또는 우리가 처음 사귀기로 한 날짜를 정확히 적으시오. (예: 0524)'
    ],
    category: 'basic',
    type: 'subj',
    stem: '[단답형] 내 생일(월/일) 또는 우리가 처음 사귀기로 한 날짜를 정확히 적으시오. (예: 0524)',
    options: ['', '', '', ''],
    answerText: '1004',
    points: 20,
    comment: '설마 이 문제를 틀리진 않겠지...?'
  },
  {
    label: '🚫 절대 못 먹는 음식',
    clusterId: 'basic_hate_food',
    keywords: ['싫어하는', '못먹는', '편식', '오이', '고수', '민트초코', '음식'],
    pickCount: 890,
    attemptCount: 2100,
    wrongCount: 945,
    variants: [
      '내가 절대 입에도 안 대는 극혐 음식은?',
      '식당 가서 내 거에서 꼭 빼줘야 하는 재료는?',
      '다음 음식 중 내가 가장 싫어하거나 못 먹는 음식은?'
    ],
    category: 'basic',
    type: 'mc',
    stem: '다음 음식 중 내가 가장 싫어하거나 못 먹는 음식은?',
    options: ['오이 / 고수', '민트초코', '생선회 / 해산물', '매운 음식 (불닭 등)'],
    answer: 0,
    points: 20,
    comment: '내 편식 취향까지 기억해 주면 감동이야.'
  },
  {
    label: '🎁 갖고 싶은 선물',
    clusterId: 'basic_gift_wish',
    keywords: ['선물', '기념일', '받고싶은', '생일선물', '갖고싶은', '위시리스트'],
    pickCount: 1120,
    attemptCount: 2600,
    wrongCount: 1508,
    variants: [
      '이번 기념일에 내가 은근히 바라는 선물은?',
      '내가 요즘 제일 갖고 싶다고 노래 부른 아이템은?',
      '다가오는 기념일에 내가 가장 받고 싶어 하는 선물에 가까운 것은?'
    ],
    category: 'basic',
    type: 'mc',
    stem: '다가오는 기념일에 내가 가장 받고 싶어 하는 선물에 가까운 것은?',
    options: ['손편지와 커플 아이템', '평소 눈여겨보던 옷/가방/신발', '맛있는 오마카세/호캉스 데이트', '실용적인 전자기기/상품권'],
    answer: 0,
    points: 20,
    comment: '힌트 여기 다 적어놨다!'
  }
];

// 2. [선택 과목] 성적취향 탐구영역 (심야/19+ 스킨십·밤 취향) 추천 문제 자판기
const SPICY_PRESET_QUESTIONS = [
  {
    label: '🔥 선호하는 리드 스타일',
    clusterId: 'spicy_lead_style',
    keywords: ['침대', '리드', '분위기', '거칠', '다정', '박력', '스타일', '스킨십'],
    pickCount: 1840,
    attemptCount: 4120,
    wrongCount: 2554,
    variants: [
      '침대에서 내가 더 좋아하는 리드 방식은?',
      '밤에 분위기 잡을 때 내가 설레는 스타일은?',
      '[성적취향] 침대 위에서 내가 가장 설레고 좋아하는 분위기/리드 스타일은?'
    ],
    category: 'spicy',
    type: 'mc',
    stem: '[성적취향] 침대 위에서 내가 가장 설레고 좋아하는 분위기/리드 스타일은?',
    options: [
      '다정하게 눈 맞추며 천천히 분위기 잡기',
      '조금 거칠고 박력 있게 확 리드당하기(또는 리드하기)',
      '장난치듯 자연스럽게 스킨십 시작하기',
      '은은한 조명과 음악 틀어놓고 와인 한잔 후 시작하기'
    ],
    answer: 1,
    points: 20,
    comment: '평소 말 못 했던 내 진짜 밤 취향 힌트야!'
  },
  {
    label: '💋 가장 약한 스킨십 부위',
    clusterId: 'spicy_sensitive_spot',
    keywords: ['약한', '민감', '부위', '터치', '키스', '목선', '귀', '허리', '골반'],
    pickCount: 1620,
    attemptCount: 3650,
    wrongCount: 2372,
    variants: [
      '상대방이 만져줄 때 내가 제일 약해지는 성감대는?',
      '뽀뽀하거나 터치할 때 내가 제일 좋아하는 부위는?',
      '[성적취향] 다음 중 상대방이 터치하거나 키스해 줄 때 내가 가장 약해지는(민감한) 부위는?'
    ],
    category: 'spicy',
    type: 'mc',
    stem: '[성적취향] 다음 중 상대방이 터치하거나 키스해 줄 때 내가 가장 약해지는(민감한) 부위는?',
    options: ['목선과 귀 뒤쪽 속삭임', '허리와 골반 라인 쓰다듬기', '깊은 입맞춤과 쇄골 라인', '손깍지 끼고 품에 꽉 안기기'],
    answer: 0,
    points: 20,
    comment: '여기 건드리면 바로 무장해제됨...'
  },
  {
    label: '🌙 이상적인 스킨십 타이밍',
    clusterId: 'spicy_timing',
    keywords: ['타이밍', '호캉스', '여행', '체크인', '아침', '모닝', '샤워', '밤'],
    pickCount: 1290,
    attemptCount: 2890,
    wrongCount: 1473,
    variants: [
      '여행이나 호캉스 갔을 때 내가 제일 원할 때는 언제?',
      '밤 vs 아침 모닝 스킨십 중 내 취향은?',
      '[성적취향] 호캉스나 여행 갔을 때 내가 가장 선호하는 뜨거운 타이밍은?'
    ],
    category: 'spicy',
    type: 'mc',
    stem: '[성적취향] 호캉스나 여행 갔을 때 내가 가장 선호하는 뜨거운 타이밍은?',
    options: [
      '숙소 체크인하자마자 짐 풀기도 전에 낮부터!',
      '맛있는 저녁 먹고 샤워 마친 뒤 밤에 진하게',
      '아침에 눈 뜨자마자 나른한 상태에서 모닝 스킨십',
      '밤에도 하고 아침에도 하고 체력 닿을 때까지'
    ],
    answer: 1,
    points: 20,
    comment: '이번 여행 때 이대로 실천해 보자!'
  },
  {
    label: '🗣️ 흥분되는 말/칭찬',
    clusterId: 'spicy_dirty_talk',
    keywords: ['흥분', '칭찬', '멘트', '속삭', '말', '야한', '눈빛', '소리'],
    pickCount: 1410,
    attemptCount: 3100,
    wrongCount: 1891,
    variants: [
      '침대에서 들으면 텐션 확 올라가는 멘트는?',
      '할 때 내가 제일 듣고 싶어 하는 말은?',
      '[성적취향] 분위기 무르익었을 때 들으면 기분이 제일 좋아지는 상대방의 말은?'
    ],
    category: 'spicy',
    type: 'mc',
    stem: '[성적취향] 분위기 무르익었을 때 들으면 기분이 제일 좋아지는 상대방의 말은?',
    options: [
      '"오늘 왜 이렇게 예뻐/멋있어? 미치겠네"',
      '이름 부르면서 "사랑해, 너무 좋아"라고 속삭이기',
      '조금 야하고 솔직한 멘트로 기분 물어봐 주기',
      '말보다는 숨소리와 깊은 눈빛 교환'
    ],
    answer: 0,
    points: 20,
    comment: '표현 많이 해줄수록 텐션이 확 올라가!'
  },
  {
    label: '🎀 해보고 싶은 로망 (주관식)',
    clusterId: 'spicy_fantasy',
    keywords: ['로망', '판타지', '컨셉', '스파', '잠옷', '이벤트', '해보고싶은'],
    pickCount: 1150,
    attemptCount: 2540,
    wrongCount: 1625,
    variants: [
      '우리 둘만 있을 때 꼭 해보고 싶은 19+ 로망은?',
      '기념일 밤에 같이 입거나 해보고 싶은 컨셉은?',
      '[성적취향·단답형] 우리 둘만 있을 때 은근히 해보고 싶은 스킨십 로망이나 장소/컨셉을 적으시오.'
    ],
    category: 'spicy',
    type: 'subj',
    stem: '[성적취향·단답형] 우리 둘만 있을 때 은근히 해보고 싶은 스킨십 로망이나 장소/컨셉을 적으시오.',
    options: ['', '', '', ''],
    answerText: '호캉스, 스파, 커플잠옷',
    points: 20,
    comment: '성적표 확인하고 다음 데이트 때 바로 실행하기!'
  },
  {
    label: '💞 끝난 후 애프터케어',
    clusterId: 'spicy_aftercare',
    keywords: ['끝난', '애프터케어', '직후', '안고', '샤워', '팔베개', '마무리'],
    pickCount: 1080,
    attemptCount: 2300,
    wrongCount: 966,
    variants: [
      '끝나고 나서 내가 제일 바라는 스킨십은?',
      '사랑 나눈 직후에 해줬으면 하는 행동 1순위는?',
      '[성적취향] 뜨거운 시간이 끝난 직후(애프터케어), 내가 가장 바라는 행동은?'
    ],
    category: 'spicy',
    type: 'mc',
    stem: '[성적취향] 뜨거운 시간이 끝난 직후(애프터케어), 내가 가장 바라는 행동은?',
    options: [
      '바로 등 돌리고 자지 않고 꼭 껴안고 도란도란 얘기하기',
      '물 가져다주거나 이불 덮어주며 다정하게 챙겨주기',
      '같이 따뜻하게 샤워하면서 장난치기',
      '이마/볼에 뽀뽀해 주며 팔베개해 주기'
    ],
    answer: 0,
    points: 20,
    comment: '끝나고 나서 더 다정하게 안아주는 게 제일 중요해!'
  }
];

// 샘플 1: 기본 탐구영역 데모 시험 데이터
const SAMPLE_BASIC_EXAM = {
  creatorName: '김슬기',
  partnerRole: '여자친구',
  examTerm: '2026학년도 제1학기 중간고사',
  examCode: '홀수형',
  includeSpicy: false,
  spicyModeType: 'basic_only', // 'basic_only' | 'mixed' | 'spicy_only'
  cutoffScore: 80,
  promiseReward: '80점 이상 시 소원권 1회 증정 (미달 시 설거지 및 야간자율학습)',
  questions: [
    {
      category: 'basic',
      type: 'mc',
      stem: '다음 중 출제자(김슬기)가 주말 데이트에서 가장 선호하는 코스로 가장 적절한 것은?',
      options: [
        '핫플 맛집 웨이팅 후 인생네컷 찍기',
        '조용하고 뷰 좋은 카페에서 커피 마시며 수다 떨기',
        '집에서 배달 시켜 먹고 넷플릭스 정주행하기',
        '한강 공원에서 라면 먹고 산책하기'
      ],
      answer: 1,
      points: 20,
      comment: '사람 너무 많은 곳보단 둘이 도란도란 이야기 나누는 게 최고!'
    },
    {
      category: 'basic',
      type: 'mc',
      stem: '출제자가 카톡으로 "응 그래~" 또는 "괜찮아 신경 쓰지 마"라고 보냈을 때, 수험생이 취해야 할 올바른 태도는?',
      options: [
        '"웅 알겠어!" 하고 하던 게임을 계속한다',
        '진짜 괜찮은 줄 알고 내일 연락한다',
        '즉시 전화하거나 달려가서 서운한 점을 물어보고 풀어준다',
        '"너 또 왜 그러는데"라고 따진다'
      ],
      answer: 2,
      points: 20,
      comment: '"괜찮아"는 절대 괜찮다는 뜻이 아닙니다. (수능 단골 출제 유형)'
    },
    {
      category: 'basic',
      type: 'subj',
      stem: '[단답형] 출제자가 카페에 가면 10번 중 8번은 주문하는 최애 음료 이름을 쓰시오. (줄임말 가능)',
      options: ['', '', '', ''],
      answerText: '아아, 아이스 아메리카노, 아메리카노',
      points: 20,
      comment: '얼죽아(얼어 죽어도 아이스 아메리카노) 필수 암기!'
    },
    {
      category: 'basic',
      type: 'mc',
      stem: '출제자가 퇴근(하교) 후 "오늘 너무 힘들었어 ㅠㅠ"라고 말했을 때 가장 바람직한 첫마디는?',
      options: [
        '"왜? 오늘 무슨 일 있었어? 많이 힘들었겠다 ㅠㅠ"',
        '"원래 회사/학교가 다 그렇지 뭐~ 참아!"',
        '"내가 더 힘들었어 들어봐"',
        '"그래서 해결은 했어? 네가 실수한 거 아냐?"'
      ],
      answer: 0,
      points: 20,
      comment: '해결책보다 따뜻한 공감 한마디가 정답입니다.'
    },
    {
      category: 'basic',
      type: 'subj',
      stem: '[서술형] 스트레스가 극에 달했을 때 출제자의 기분을 단번에 풀어줄 수 있는 최애 야식 메뉴를 쓰시오.',
      options: ['', '', '', ''],
      answerText: '떡볶이, 엽떡, 마라탕, 치킨',
      points: 20,
      comment: '매콤한 떡볶이나 치킨이면 모든 화가 사르르 녹습니다.'
    }
  ]
};

// 샘플 2: 성적취향 탐구영역(선택 과목) 포함 데모 시험 데이터
const SAMPLE_SPICY_EXAM = {
  creatorName: '김슬기',
  partnerRole: '여자친구',
  examTerm: '2026학년도 심야 특별 모의평가',
  examCode: '19+ 심야형',
  includeSpicy: true,
  spicyModeType: 'spicy_only',
  cutoffScore: 80,
  promiseReward: '80점 이상 시 오늘 밤 원하는 로망 100% 들어주기!',
  questions: [
    JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[0])),
    JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[1])),
    JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[2])),
    JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[3])),
    JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[5]))
  ]
};

// 애플리케이션 전역 상태
const state = {
  view: 'home', // 'home' | 'create' | 'take' | 'result'
  onboarding: {
    relationType: 'couple', // 'couple' (연인) | 'some' (썸)
    targetRecipient: '남자친구', // 연인: '남자친구'|'여자친구', 썸: '썸남'|'썸녀'
    subjectChoice: 'basic', // 'basic' (공통필수) | 'spicy' (심화선택) | 'both' (둘 다)
    creatorName: ''
  },
  examData: JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM)),
  examineeName: '',
  examineeNumber: '2026-1004',
  userAnswers: {},
  gradeResult: null,
  generatedShareUrl: '',
  resultShareUrl: '',
  isTeacherInspectMode: false,
  spicyGateConfirmed: false
};

// URL 인코딩 / 디코딩 유틸리티
function encodeExamToParam(examObj) {
  const jsonStr = JSON.stringify(examObj);
  const utf8Bytes = new TextEncoder().encode(jsonStr);
  let binary = '';
  utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function decodeExamFromParam(paramStr) {
  try {
    let base64 = paramStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('시험지 링크 복원 실패:', e);
    return null;
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

// 현재 시험지에 성적취향 문항이 포함되어 있는지 확인
function hasSpicyQuestions() {
  if (state.examData.includeSpicy) return true;
  return (state.examData.questions || []).some((q) => q.category === 'spicy');
}

// =========================================================
// 뷰 전환 함수들
// =========================================================
function goHome() {
  state.view = 'home';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startCreateExam(modePreset) {
  state.view = 'create';
  state.generatedShareUrl = '';

  if (modePreset === 'spicy') {
    // 성적취향 탐구영역 선택 출제 시작
    state.examData = {
      creatorName: '나(출제자)',
      partnerRole: '여자친구',
      examTerm: '2026학년도 심야 특별 모의평가',
      examCode: '19+ 심야형',
      includeSpicy: true,
      spicyModeType: 'spicy_only',
      cutoffScore: 80,
      promiseReward: '80점 이상 시 오늘 밤 소원권 / 미달 시 심야 보충수업 확정',
      questions: JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS.slice(0, 5)))
    };
  } else if (modePreset === 'mixed') {
    // 기본 + 성적취향 통합 출제 시작
    state.examData = {
      creatorName: '나(출제자)',
      partnerRole: '여자친구',
      examTerm: '2026학년도 제2학기 기말고사 (심화)',
      examCode: '통합형(19+포함)',
      includeSpicy: true,
      spicyModeType: 'mixed',
      cutoffScore: 80,
      promiseReward: '80점 이상 시 소원권 1장 / 탈락 시 데이트 풀코스 쏘기',
      questions: [
        JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions[0])),
        JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions[1])),
        JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions[2])),
        JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[0])),
        JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[1]))
      ]
    };
  } else {
    // 기본 탐구영역 단독 출제 시작 (기본값)
    state.examData = {
      creatorName: '나(출제자)',
      partnerRole: '여자친구',
      examTerm: '2026학년도 제1학기 중간고사',
      examCode: '홀수형',
      includeSpicy: false,
      spicyModeType: 'basic_only',
      cutoffScore: 80,
      promiseReward: '통과 시 소원권 1장 / 탈락 시 데이트 비용 전액 부담',
      questions: JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions.slice(0, 5)))
    };
  }

  balanceQuestionPoints();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startSampleExam(type) {
  if (type === 'spicy') {
    state.examData = JSON.parse(JSON.stringify(SAMPLE_SPICY_EXAM));
    state.spicyGateConfirmed = false;
  } else {
    state.examData = JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM));
    state.spicyGateConfirmed = true;
  }
  state.userAnswers = {};
  state.gradeResult = null;
  state.view = 'take';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function confirmSpicyGate() {
  state.spicyGateConfirmed = true;
  renderApp();
}

function balanceQuestionPoints() {
  const qs = state.examData.questions;
  if (!qs.length) return;
  const basePoint = Math.floor(100 / qs.length);
  let remainder = 100 - basePoint * qs.length;
  qs.forEach((q, idx) => {
    q.points = basePoint + (idx < remainder ? 1 : 0);
  });
}

// =========================================================
// 리얼한 빨간 색연필(채점용 색연필) 손그림 SVG 생성기
// =========================================================
function renderRedPencilCircle(qIdx) {
  // 문항마다 미묘하게 다른 손그림 궤적 3종 (시작점과 끝점이 자연스럽게 교차하며 삐져나오는 곡선)
  const variants = [
    {
      main: 'M 52 14 C 24 10, 10 30, 14 52 C 17 70, 44 74, 60 60 C 74 47, 68 20, 44 12 C 36 10, 29 13, 25 18',
      sub: 'M 49 15 C 23 12, 12 31, 15 51 C 18 68, 43 72, 58 59 C 71 46, 66 21, 41 14',
      rot: -6
    },
    {
      main: 'M 46 11 C 20 14, 11 36, 16 56 C 22 73, 50 72, 63 55 C 74 40, 64 16, 40 13 C 31 12, 24 16, 20 23',
      sub: 'M 45 12 C 22 15, 13 36, 18 55 C 24 71, 49 70, 61 54 C 71 40, 62 18, 38 14',
      rot: 4
    },
    {
      main: 'M 55 17 C 30 9, 11 26, 13 49 C 15 69, 41 75, 59 62 C 74 50, 70 22, 48 13 C 39 9, 31 11, 26 15',
      sub: 'M 53 18 C 29 11, 13 27, 15 48 C 17 67, 41 73, 57 60 C 71 49, 68 23, 46 14',
      rot: -11
    }
  ];
  const v = variants[qIdx % variants.length];
  return `
    <div class="red-grade-mark" style="transform: rotate(${v.rot}deg);">
      <svg class="red-pencil-svg" viewBox="0 0 84 84" aria-label="정답 동그라미">
        <!-- 색연필 넓은 면이 종이에 스치는 연한 베이스 결 -->
        <path d="${v.main}" fill="none" stroke="#e02b20" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.42" />
        <!-- 색연필 중심 심이 지나가는 진한 메인 스트로크 -->
        <path d="${v.main}" fill="none" stroke="#c91c12" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.88" />
        <!-- 종이 결 때문에 끊기듯 그어지는 거친 세컨드 스트로크 -->
        <path d="${v.sub}" fill="none" stroke="#a8120a" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="14 2 9 1.5 18 2" opacity="0.72" />
      </svg>
    </div>
  `;
}

function renderRedPencilWrong(qIdx) {
  // 체크(V) 모양 없이 순수하게 대각선 짝대기(/)로만 그어지는 리얼한 빨간 색연필 스트로크 3종
  const variants = [
    {
      main: 'M 14 64 C 29 47, 48 28, 70 10',
      sub: 'M 16 65 C 31 48, 50 29, 68 12',
      tail: 'M 12 62 C 28 45, 47 26, 72 8',
      rot: -2
    },
    {
      main: 'M 16 62 C 32 45, 49 27, 69 11',
      sub: 'M 18 63 C 34 46, 51 28, 67 13',
      tail: 'M 14 60 C 30 43, 48 25, 71 9',
      rot: 3
    },
    {
      main: 'M 13 65 C 28 49, 47 29, 71 9',
      sub: 'M 15 66 C 30 50, 49 30, 69 11',
      tail: 'M 12 63 C 27 47, 46 27, 73 7',
      rot: -5
    }
  ];
  const v = variants[qIdx % variants.length];
  return `
    <div class="red-grade-mark" style="transform: rotate(${v.rot}deg);">
      <svg class="red-pencil-svg" viewBox="0 0 84 84" aria-label="오답 짝대기">
        <!-- 색연필 뭉툭한 심 자국 -->
        <path d="${v.main}" fill="none" stroke="#e02b20" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.45" />
        <!-- 진한 중심 필압 스트로크 -->
        <path d="${v.main}" fill="none" stroke="#c91c12" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.92" />
        <!-- 끝부분 갈라지는 색연필 결 -->
        <path d="${v.sub}" fill="none" stroke="#9e1108" stroke-width="2.0" stroke-linecap="round" stroke-dasharray="16 2 10 2" opacity="0.75" />
        <path d="${v.tail}" fill="none" stroke="#d9251d" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="12 3 8 2" opacity="0.6" />
      </svg>
    </div>
  `;
}

function renderScoreUnderlineSvg() {
  return `
    <svg class="score-underline-svg" viewBox="0 0 160 22" preserveAspectRatio="none" aria-hidden="true">
      <path d="M 4 7 C 48 4, 108 6, 156 4" fill="none" stroke="#c91c12" stroke-width="3.4" stroke-linecap="round" opacity="0.9" />
      <path d="M 8 15 C 54 12, 112 14, 152 11" fill="none" stroke="#c91c12" stroke-width="3.0" stroke-linecap="round" opacity="0.82" />
      <path d="M 6 7.5 C 50 5, 106 6.5, 154 4.5" fill="none" stroke="#e02b20" stroke-width="5.2" stroke-linecap="round" opacity="0.35" />
    </svg>
  `;
}

// =========================================================
// 시험지 공통 헤더 렌더링 (한국 정기고사/수능 양식)
// =========================================================
function renderKoreanExamHeader() {
  const { creatorName, partnerRole, targetRecipient, relationType, examTerm, examCode } = state.examData;
  const isSpicy = hasSpicyQuestions();
  const isResult = state.view === 'result';

  let stampHtml = '';
  if (isResult && state.gradeResult) {
    const { totalScore, gradeRank, stampText } = state.gradeResult;
    stampHtml = `
      <div class="score-stamp-area">
        <div class="score-handwriting">
          ${totalScore}점
          ${renderScoreUnderlineSvg()}
        </div>
        <div>
          <span class="score-grade-stamp">제 ${gradeRank} 등급 · ${stampText}</span>
        </div>
      </div>
    `;
  }

  const periodLabel = isSpicy ? '제 2 교시 (선택)' : '제 1 교시 (공통)';
  const displayCreator = creatorName || '출제자';
  const recipientLabel = targetRecipient ? `${targetRecipient} 응시용` : `${partnerRole || '연인'} 탐구`;
  const subjectSuffix = `${escapeHtml(displayCreator)} 탐구 영역`;

  const spicyHeaderBadge = isSpicy
    ? `<span class="spicy-badge-stamp">🔞 심화선택: 성적취향 탐구 포함</span>`
    : `<span class="exam-type-pill">${escapeHtml(examCode || '홀수형')}</span>`;

  const homeBackBtnHtml =
    state.view !== 'home'
      ? `<button type="button" class="delete-q-btn" style="border-color:#222; color:#222; font-weight:700;" onclick="goHome()">← 시험지 표지(처음으로)</button>`
      : `<span class="exam-year-title">${escapeHtml(examTerm)} 연애능력평가 문제지</span>`;

  return `
    <div class="exam-header">
      ${stampHtml}
      <div class="exam-top-meta">
        ${homeBackBtnHtml}
        ${spicyHeaderBadge}
      </div>

      <div class="exam-main-title-row">
        <div class="exam-period-box" style="${isSpicy ? 'border-color:#9e1b32; color:#9e1b32;' : ''}">${periodLabel}</div>
        <h1 class="exam-subject-title">${subjectSuffix}</h1>
        <div class="exam-page-num-box">1</div>
      </div>

      <table class="examinee-info-table">
        <tbody>
          <tr>
            <th>응시대상</th>
            <td style="font-weight:800;">
              ${escapeHtml(recipientLabel)} (${relationType === 'some' ? '썸 전형' : '연인 전형'})
            </td>
            <th>수험생 성명</th>
            <td>
              <input type="text" id="examineeNameInput" value="${escapeHtml(state.examineeName)}" 
                placeholder="응시자 이름 입력" 
                ${state.view === 'result' ? 'readonly' : ''}
                oninput="state.examineeName = this.value" />
            </td>
            <th>선택과목</th>
            <td style="font-weight:800; color:${isSpicy ? '#9e1b32' : '#1a1a1a'};">
              ${
                state.examData.spicyModeType === 'spicy_only'
                  ? '심화선택 (성적취향)'
                  : isSpicy
                  ? '공통필수 + 심화선택'
                  : '공통필수 (기본탐구)'
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// =========================================================
// 1. 랜딩 페이지 (표지 - 3단계 관계 / 대상 / 과목 선택)
// =========================================================
function selectOnboardingRelation(relType) {
  state.onboarding.relationType = relType;
  if (relType === 'couple') {
    state.onboarding.targetRecipient = '남자친구';
  } else {
    state.onboarding.targetRecipient = '썸남';
  }
  renderApp();
}

function selectOnboardingRecipient(target) {
  state.onboarding.targetRecipient = target;
  renderApp();
}

function selectOnboardingSubject(subjChoice) {
  state.onboarding.subjectChoice = subjChoice;
  renderApp();
}

function startExamCreationFromLanding() {
  const { relationType, targetRecipient, subjectChoice, creatorName } = state.onboarding;
  const finalCreatorName = (creatorName || '').trim() || '나(출제자)';

  let myRole = '여자친구';
  if (targetRecipient === '남자친구') myRole = '여자친구';
  else if (targetRecipient === '여자친구') myRole = '남자친구';
  else if (targetRecipient === '썸남') myRole = '썸녀';
  else if (targetRecipient === '썸녀') myRole = '썸남';

  const isSome = relationType === 'some';
  const baseTerm = isSome ? '2026학년도 썸 모의평가' : '2026학년도 제1학기 중간고사';

  let initialQuestions = [];
  let includeSpicy = false;
  let spicyModeType = 'basic_only';

  if (subjectChoice === 'spicy') {
    includeSpicy = true;
    spicyModeType = 'spicy_only';
    initialQuestions = JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS.slice(0, 5)));
  } else if (subjectChoice === 'both') {
    includeSpicy = true;
    spicyModeType = 'mixed';
    initialQuestions = [
      JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions[0])),
      JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions[1])),
      JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions[2])),
      JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[0])),
      JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[1]))
    ];
  } else {
    includeSpicy = false;
    spicyModeType = 'basic_only';
    initialQuestions = JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions.slice(0, 5)));
  }

  state.examData = {
    examId: 'LOVE-' + Math.floor(1000 + Math.random() * 9000),
    relationType,
    targetRecipient,
    creatorName: finalCreatorName,
    partnerRole: myRole,
    examTerm: baseTerm,
    examCode: includeSpicy ? '19+ 선택형' : '홀수형',
    includeSpicy,
    spicyModeType,
    cutoffScore: 80,
    promiseReward: isSome
      ? '80점 이상 시 다음 데이트 때 소원 들어주기!'
      : '80점 이상 시 소원권 1장 / 미달 시 데이트 풀코스 쏘기!',
    questions: initialQuestions
  };

  state.generatedShareUrl = '';
  state.isTeacherInspectMode = false;
  balanceQuestionPoints();
  state.view = 'create';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHomeView() {
  const { relationType, targetRecipient, subjectChoice, creatorName } = state.onboarding;
  const isCouple = relationType === 'couple';

  const recipientOptions = isCouple
    ? [
        { key: '남자친구', icon: '👦', title: '남자친구에게 보내기', desc: '남자친구가 나에 대한 문제를 풀게 됩니다' },
        { key: '여자친구', icon: '👧', title: '여자친구에게 보내기', desc: '여자친구가 나에 대한 문제를 풀게 됩니다' }
      ]
    : [
        { key: '썸남', icon: '👦', title: '썸남에게 보내기', desc: '썸남이 나에 대한 문제를 풀게 됩니다' },
        { key: '썸녀', icon: '👧', title: '썸녀에게 보내기', desc: '썸녀가 나에 대한 문제를 풀게 됩니다' }
      ];

  const recipientBtnsHtml = recipientOptions
    .map((opt) => {
      const sel = targetRecipient === opt.key;
      return `
        <button type="button" class="landing-choice-btn ${sel ? 'selected' : ''}"
          onclick="selectOnboardingRecipient('${opt.key}')">
          <div class="landing-choice-title">
            <span>${opt.icon} ${opt.title}</span>
            <span class="landing-check-mark">${sel ? '✔' : ''}</span>
          </div>
          <div class="landing-choice-desc">${opt.desc}</div>
        </button>
      `;
    })
    .join('');

  return `
    <div class="exam-header">
      <div class="exam-top-meta">
        <span class="exam-year-title">2026학년도 연애능력평가 출제원서</span>
        <span class="exam-type-pill">${isCouple ? '연인 전형' : '썸 전형'}</span>
      </div>

      <div class="exam-main-title-row">
        <div class="exam-period-box">출제표지</div>
        <h1 class="exam-subject-title">${escapeHtml(targetRecipient)} 고사 출제 원서</h1>
        <div class="exam-page-num-box">1</div>
      </div>
    </div>

    <div class="landing-form-sheet">
      <!-- (1) 관계 선택 -->
      <div class="landing-step-block">
        <div class="landing-step-label">
          <span class="step-num-badge">1단계</span>
          <span>현재 두 분의 관계를 선택해 주세요</span>
        </div>
        <div class="choice-grid-2">
          <button type="button" class="landing-choice-btn ${isCouple ? 'selected' : ''}"
            onclick="selectOnboardingRelation('couple')">
            <div class="landing-choice-title">
              <span>❤️ 연인</span>
              <span class="landing-check-mark">${isCouple ? '✔' : ''}</span>
            </div>
            <div class="landing-choice-desc">사귀고 있는 남자친구 · 여자친구</div>
          </button>

          <button type="button" class="landing-choice-btn ${!isCouple ? 'selected' : ''}"
            onclick="selectOnboardingRelation('some')">
            <div class="landing-choice-title">
              <span>💓 썸</span>
              <span class="landing-check-mark">${!isCouple ? '✔' : ''}</span>
            </div>
            <div class="landing-choice-desc">알아가는 중인 썸남 · 썸녀</div>
          </button>
        </div>
      </div>

      <!-- (2) 누구에게 보내는지 선택 -->
      <div class="landing-step-block">
        <div class="landing-step-label">
          <span class="step-num-badge">2단계</span>
          <span>누구에게 보내는 시험지인가요?</span>
        </div>
        <div class="choice-grid-2">
          ${recipientBtnsHtml}
        </div>
      </div>

      <!-- (3) 과목 선택 -->
      <div class="landing-step-block">
        <div class="landing-step-label">
          <span class="step-num-badge">3단계</span>
          <span>출제할 과목(영역)을 선택해 주세요</span>
        </div>
        <div class="choice-grid-3">
          <button type="button" class="landing-choice-btn ${subjectChoice === 'basic' ? 'selected' : ''}"
            onclick="selectOnboardingSubject('basic')">
            <div class="landing-choice-title">
              <span>📗 공통 필수과목</span>
              <span class="landing-check-mark">${subjectChoice === 'basic' ? '✔' : ''}</span>
            </div>
            <div class="landing-choice-desc">
              <strong>[기본 탐구 영역]</strong><br/>
              일상 취향 · 음식 · 추억 · 대처법
            </div>
          </button>

          <button type="button" class="landing-choice-btn ${subjectChoice === 'spicy' ? 'selected spicy-sel' : ''}"
            onclick="selectOnboardingSubject('spicy')">
            <div class="landing-choice-title" style="color:#9e1b32;">
              <span>🔞 심화 선택과목</span>
              <span class="landing-check-mark">${subjectChoice === 'spicy' ? '✔' : ''}</span>
            </div>
            <div class="landing-choice-desc">
              <strong>[성적취향 탐구 영역]</strong><br/>
              스킨십 선호도 · 리드 · 밤 로망
            </div>
          </button>

          <button type="button" class="landing-choice-btn ${subjectChoice === 'both' ? 'selected spicy-sel' : ''}"
            onclick="selectOnboardingSubject('both')">
            <div class="landing-choice-title">
              <span>🔥 둘 다 선택</span>
              <span class="landing-check-mark">${subjectChoice === 'both' ? '✔' : ''}</span>
            </div>
            <div class="landing-choice-desc">
              <strong>[공통 필수 + 심화 선택]</strong><br/>
              일상 기본기부터 밤 취향까지 모두 출제
            </div>
          </button>
        </div>
      </div>

      <!-- 출제자 이름 입력 & 시작 버튼 -->
      <div style="margin-top:18px; padding-top:16px; border-top:2px double #222; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
        <div style="flex:1; min-width:200px;">
          <input type="text" class="paper-input" style="width:100%; background:#fff;"
            value="${escapeHtml(creatorName)}"
            placeholder="내 이름 또는 애칭 입력 (예: 슬기)"
            oninput="state.onboarding.creatorName = this.value" />
        </div>
        <button type="button" class="paper-btn primary" style="font-size:15.5px; padding:12px 28px;"
          onclick="startExamCreationFromLanding()">
          ✏️ ${escapeHtml(targetRecipient)}에게 보낼 시험지 만들기 →
        </button>
      </div>
    </div>

    <div class="exam-footer-bar">
      <span>※ 시험이 시작되기 전까지 표지를 넘기지 마시오.</span>
      <span>1 / 1</span>
      <span>한국연애과정평가원</span>
    </div>
  `;
}

// =========================================================
// 2. 출제자 모드 (문제 만들기 화면 - 실시간 유사질문 빅데이터 족보 포함)
// =========================================================
function renderTrendBankCards(category) {
  const clusters = getTrendClustersByCategory(category);
  return clusters
    .map((c, idx) => {
      const wrongRate = c.attemptCount > 0 ? Math.round((c.wrongCount / c.attemptCount) * 100) : 50;
      const latestVariant =
        c.variants && c.variants.length > 0 ? c.variants[c.variants.length - 1] : c.stem;
      const isSpicy = category === 'spicy';
      return `
        <div class="trend-item-card ${isSpicy ? 'spicy' : ''}">
          <div>
            <div class="trend-top-badges">
              <span class="trend-rank-badge ${isSpicy ? 'spicy' : ''}">
                🔥 빈출 ${idx + 1}위 · ${c.pickCount.toLocaleString()}회 출제
              </span>
              <span class="trend-wrong-rate">오답률 ${wrongRate}%</span>
            </div>
            <div class="trend-stem-preview" style="margin-top:5px;">
              ${escapeHtml(c.label)}
            </div>
            <div class="trend-variants-note" style="margin-top:4px;">
              💬 최근 유사 출제: "${escapeHtml(latestVariant)}"
              <span style="color:#888;">(유사변형 ${(c.variants || []).length}건 통합됨)</span>
            </div>
          </div>
          <div style="display:flex; gap:6px; margin-top:6px;">
            <button type="button" class="preset-chip ${isSpicy ? 'spicy-chip' : ''}" style="flex:1; font-weight:700;"
              onclick="addClusterQuestionToExam('${escapeHtml(c.clusterId)}', false)">
              + 기본형으로 추가
            </button>
            <button type="button" class="preset-chip" style="font-size:11px;"
              onclick="addClusterQuestionToExam('${escapeHtml(c.clusterId)}', true)"
              title="다른 출제자들이 최근에 변형해서 낸 질문 문구로 추가합니다">
              + 최근 유행 문구로 추가
            </button>
          </div>
        </div>
      `;
    })
    .join('');
}

function renderCreateView() {
  const { creatorName, partnerRole, examTerm, includeSpicy, cutoffScore, promiseReward, questions } = state.examData;

  const basicTrendCardsHtml = renderTrendBankCards('basic');
  const spicyTrendCardsHtml = renderTrendBankCards('spicy');

  const spicyBankSectionHtml = includeSpicy
    ? `
      <div class="preset-bank-bar" style="border-color:#9e1b32; background:#fff5f5;">
        <div class="preset-bank-header" style="color:#9e1b32;">
          <span>🔞 [선택과목: 성적취향 탐구] 커플 빈출 기출 족보 (유사 질문 실시간 취합 순위)</span>
          <span class="spicy-badge-stamp">선택과목 ON</span>
        </div>
        <div class="trend-grid">
          ${spicyTrendCardsHtml}
        </div>
      </div>
    `
    : '';

  const questionsEditorHtml = questions
    .map((q, qIdx) => {
      const isMc = q.type === 'mc';
      const isSpicyQ = q.category === 'spicy';
      let answerBodyHtml = '';

      if (isMc) {
        const optsHtml = q.options
          .map(
            (optText, optIdx) => `
            <div class="editor-option-row">
              <button type="button" 
                class="circle-num-btn ${q.answer === optIdx ? 'is-correct' : ''}" 
                title="클릭하여 정답으로 지정"
                onclick="setMcCorrectAnswer(${qIdx}, ${optIdx})">
                ${CIRCLE_NUMS[optIdx]}
              </button>
              <input type="text" class="paper-input" style="flex:1;"
                value="${escapeHtml(optText)}"
                placeholder="선지 ${optIdx + 1}번 내용 입력"
                oninput="updateMcOptionText(${qIdx}, ${optIdx}, this.value)" />
            </div>
          `
          )
          .join('');

        answerBodyHtml = `
          <div style="font-size:12px; color:#b81d16; font-weight:700; margin-top:8px;">
            * 정답으로 지정할 원문자(①~④)를 클릭해 빨간색으로 표시하세요. (현재 정답: ${CIRCLE_NUMS[q.answer || 0]})
          </div>
          <div class="editor-options-list">
            ${optsHtml}
          </div>
        `;
      } else {
        answerBodyHtml = `
          <div class="field-group" style="margin-top:10px;">
            <label style="color:#b81d16;">✔ 주관식 정답 설정 (쉼표로 복수 정답 인정 가능, 예: 호캉스, 커플잠옷)</label>
            <input type="text" class="paper-input" 
              value="${escapeHtml(q.answerText || '')}"
              placeholder="정답 단어를 입력하세요"
              oninput="updateSubjAnswer(${qIdx}, this.value)" />
          </div>
        `;
      }

      return `
        <div class="editor-question-card" style="${isSpicyQ ? 'border-color:#9e1b32; background:#fffafa;' : ''}">
          <div class="editor-q-top">
            <div class="editor-q-num">
              <span class="q-category-badge ${isSpicyQ ? 'spicy' : 'basic'}">
                ${isSpicyQ ? '🔞 성적취향' : '📗 기본탐구'}
              </span>
              문항 ${qIdx + 1}번 <span style="font-size:12px; font-weight:500; color:#555;">[${q.points}점]</span>
            </div>
            <div class="editor-q-controls">
              <button type="button" class="delete-q-btn" style="border-color:#555; color:#222;" 
                onclick="toggleQuestionCategory(${qIdx})" title="클릭하여 기본탐구/성적취향 과목 태그 전환">
                과목변경 (${isSpicyQ ? '성적취향→기본' : '기본→성적취향'})
              </button>
              <div class="type-toggle-group">
                <button type="button" class="type-toggle-btn ${isMc ? 'active' : ''}" onclick="changeQuestionType(${qIdx}, 'mc')">객관식</button>
                <button type="button" class="type-toggle-btn ${!isMc ? 'active' : ''}" onclick="changeQuestionType(${qIdx}, 'subj')">주관식</button>
              </div>
              <button type="button" class="delete-q-btn" onclick="removeQuestion(${qIdx})">삭제 ✕</button>
            </div>
          </div>

          <div class="field-group">
            <label>문제 지문</label>
            <input type="text" class="paper-input" 
              value="${escapeHtml(q.stem)}"
              placeholder="문제 내용을 입력하세요"
              oninput="updateQuestionStem(${qIdx}, this.value)" />
          </div>

          ${answerBodyHtml}

          <div class="field-group" style="margin-top:10px;">
            <label>출제자 한마디 / 채점 해설 (선택)</label>
            <input type="text" class="paper-input" style="font-size:13px;"
              value="${escapeHtml(q.comment || '')}"
              placeholder="채점 결과지에 표시될 코멘트"
              oninput="updateQuestionComment(${qIdx}, this.value)" />
          </div>
        </div>
      `;
    })
    .join('');

  const currentExamId = state.examData.examId || '미발급';
  const matchingSubmissions = getSubmissionsForExam(currentExamId);
  const liveSubmissionsHtml = matchingSubmissions.length
    ? matchingSubmissions
        .map(
          (sub, idx) => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1.5px solid #222; padding:8px 12px; margin-top:6px;">
            <div style="text-align:left; font-size:13px;">
              <strong>🔔 #${idx + 1}. ${escapeHtml(sub.examineeName || '익명 수험생')}</strong> 
              <span style="color:#d9251d; font-weight:900; margin-left:6px;">${sub.totalScore}점 (${sub.gradeRank}등급)</span>
              <span style="font-size:11px; color:#666; margin-left:6px;">${escapeHtml(sub.submittedAt)}</span>
            </div>
            <button type="button" class="paper-btn sm primary" onclick="openSubmittedPaper('${escapeHtml(sub.submissionId)}')">
              채점된 답안지 열람 →
            </button>
          </div>
        `
        )
        .join('')
    : `
      <div style="font-size:12.5px; color:#555; padding:10px; background:rgba(255,255,255,0.7); border:1px dashed #888; margin-top:6px;">
        ⏳ 상대방이 문제를 풀고 제출하면 이곳에서 채점된 답안지를 바로 확인할 수 있습니다.
      </div>
    `;

  const shareBoxHtml = state.generatedShareUrl
    ? `
      <div class="share-box" id="shareBoxSection">
        <div style="font-weight:900; font-size:17px; color:#b81d16; margin-bottom:6px;">
          🎉 시험지 생성이 완료되었습니다!
        </div>
        <p style="font-size:13.5px; color:#444;">
          아래 링크를 복사해 카카오톡이나 메시지로 <strong>${escapeHtml(state.examData.targetRecipient || '상대방')}</strong>에게 보내보세요.
        </p>
        <div class="share-url-row">
          <input type="text" class="share-url-input" id="generatedUrlInput" readonly value="${escapeHtml(state.generatedShareUrl)}" />
          <button type="button" class="paper-btn primary" onclick="copyShareUrl()">시험지 링크 복사</button>
        </div>

        <!-- 실시간 답안지 도착 현황판 -->
        <div style="margin-top:16px; padding:14px; border:2px solid #222; background:#f4f1ea; text-align:left;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <span style="font-weight:900; font-size:14px;">
              📬 도착한 채점 답안지 (${matchingSubmissions.length}건)
            </span>
            <span style="font-size:11.5px; color:#b81d16; font-weight:700;">● 자동 수신 대기 중</span>
          </div>
          ${liveSubmissionsHtml}
        </div>

        <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-top:14px;">
          <button type="button" class="paper-btn dark" onclick="previewCreatedExam()">
            내가 만든 시험지 미리 풀어보기 →
          </button>
        </div>
      </div>
    `
    : '';

  return `
    ${renderKoreanExamHeader()}

    <!-- 1단계: 탐구 영역(과목) 선택 탭 -->
    <div style="font-family:var(--font-sans); font-weight:900; font-size:14px; margin-bottom:8px;">
      1️⃣ 출제할 탐구 영역 선택 (성적취향 탐구영역은 선택 시 활성화됩니다)
    </div>
    <div class="subject-selector-tabs">
      <div class="subject-tab-card ${!includeSpicy ? 'active-basic' : ''}" onclick="toggleSpicySubjectMode(false)">
        <div class="subject-tab-title">
          <span>📗 제1교시: 기본 탐구 영역만 출제</span>
          <span>${!includeSpicy ? '✔ 선택됨' : ''}</span>
        </div>
        <div class="subject-tab-desc">
          일상 취향, 데이트, 기념일, 말뜻 통역 등 순한맛 공통 문항으로만 시험지를 구성합니다.
        </div>
      </div>

      <div class="subject-tab-card ${includeSpicy ? 'active-spicy' : ''}" onclick="toggleSpicySubjectMode(true)">
        <div class="subject-tab-title" style="color:#9e1b32;">
          <span>🔞 제2교시: 성적취향 탐구 영역 포함 (선택)</span>
          <span>${includeSpicy ? '✔ 활성화됨' : '클릭하여 켜기'}</span>
        </div>
        <div class="subject-tab-desc">
          스킨십 선호도, 민감한 부위, 밤 분위기/로망 등 연인 간의 은밀한 19+ 취향 문항을 함께 또는 단독 출제합니다.
        </div>
      </div>
    </div>

    <!-- 2단계: 시험지 기본 설정 -->
    <div class="creator-config-box">
      <div style="font-weight:900; font-size:15px; margin-bottom:12px; border-bottom:1.5px solid #222; padding-bottom:6px;">
        📋 시험지 기본 정보 설정 (출제위원 설정란)
      </div>
      <div class="creator-config-grid">
        <div class="field-group">
          <label>출제자 이름 (탐구 대상)</label>
          <input type="text" class="paper-input" value="${escapeHtml(creatorName)}" 
            placeholder="예: 김슬기"
            oninput="state.examData.creatorName = this.value; updateHeaderTitleLive();" />
        </div>
        <div class="field-group">
          <label>출제자 구분</label>
          <select class="paper-select" onchange="state.examData.partnerRole = this.value; renderApp();">
            <option value="여자친구" ${partnerRole === '여자친구' ? 'selected' : ''}>여자친구 영역</option>
            <option value="남자친구" ${partnerRole === '남자친구' ? 'selected' : ''}>남자친구 영역</option>
            <option value="애인/짝꿍" ${partnerRole === '애인/짝꿍' ? 'selected' : ''}>애인/짝꿍 영역</option>
          </select>
        </div>
        <div class="field-group">
          <label>시험 종류</label>
          <select class="paper-select" onchange="state.examData.examTerm = this.value; renderApp();">
            <option value="2026학년도 제1학기 중간고사" ${examTerm.includes('중간') ? 'selected' : ''}>제1학기 중간고사</option>
            <option value="2026학년도 제2학기 기말고사" ${examTerm.includes('기말') ? 'selected' : ''}>제2학기 기말고사</option>
            <option value="2026학년도 심야 특별 모의평가" ${examTerm.includes('심야') ? 'selected' : ''}>심야 특별 모의평가 (19+)</option>
          </select>
        </div>
        <div class="field-group">
          <label>목표 합격 커트라인 (점)</label>
          <input type="number" class="paper-input" min="10" max="100" step="5" value="${cutoffScore}"
            oninput="state.examData.cutoffScore = Number(this.value) || 80" />
        </div>
      </div>

      <div class="field-group" style="margin-top:12px;">
        <label>🎁 성적 공약 / 벌칙 문구 (성적표에 출력됩니다)</label>
        <input type="text" class="paper-input" value="${escapeHtml(promiseReward)}"
          placeholder="예: 80점 이상 시 오늘 밤 원하는 소원 100% 들어주기!"
          oninput="state.examData.promiseReward = this.value" />
      </div>
    </div>

    <!-- 실시간 유사질문 취합 기출 족보: 기본 탐구 -->
    <div class="preset-bank-bar">
      <div class="preset-bank-header">
        <span>📊 [기본 탐구영역] 실시간 커플 빈출 기출 족보 (유사 질문 자동 취합 순위)</span>
        <span style="font-size:12px; color:#555;">출제 시 유사 문항이 자동 합산됩니다 · 총 ${questions.length}문항</span>
      </div>
      <div class="trend-grid">
        ${basicTrendCardsHtml}
      </div>
    </div>

    <!-- 추천 질문 자판기: 성적취향 탐구 (선택 시 노출) -->
    ${spicyBankSectionHtml}

    <div id="questionsEditorContainer">
      ${questionsEditorHtml}
    </div>

    <div style="display:flex; gap:10px; justify-content:space-between; flex-wrap:wrap; margin-top:18px;">
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="paper-btn" onclick="addBlankQuestion('mc', 'basic')">+ 기본 객관식 추가</button>
        <button type="button" class="paper-btn" onclick="addBlankQuestion('subj', 'basic')">+ 기본 주관식 추가</button>
        ${
          includeSpicy
            ? `<button type="button" class="paper-btn" style="border-color:#9e1b32; color:#9e1b32;" onclick="addBlankQuestion('mc', 'spicy')">+ 🔞 성적취향 문항 추가</button>`
            : ''
        }
      </div>
      <div style="display:flex; gap:8px;">
        <button type="button" class="paper-btn primary" onclick="generateExamShareLink()">
          🖨️ 출제 완료 및 연인 공유 링크 만들기
        </button>
      </div>
    </div>

    ${shareBoxHtml}

    <div class="exam-footer-bar">
      <span>출제위원: ${escapeHtml(creatorName)}</span>
      <span>총 ${questions.length}문항 (100점 만점)</span>
      <span>한국연애과정평가원 출제본부</span>
    </div>
  `;
}

// =========================================================
// 3. 수험생 응시 화면 & 4. 채점 결과 화면 렌더링
// =========================================================
function renderTakeOrResultView() {
  const isResult = state.view === 'result';
  const isSpicy = hasSpicyQuestions();
  const { creatorName, partnerRole, cutoffScore, promiseReward, questions } = state.examData;

  // 성적취향 탐구영역이 포함된 시험인데 아직 응시 확인을 안 눌렀다면 심야/19+ 안내 게이트 표시
  if (!isResult && isSpicy && !state.spicyGateConfirmed) {
    return `
      ${renderKoreanExamHeader()}
      <div class="spicy-gate-box">
        <div class="spicy-gate-stamp">🔞 제2교시 선택과목 : 성적취향 탐구 영역 포함 시험지</div>
        <h2 style="font-size:22px; font-weight:900; margin-bottom:10px; color:#1a1a1a;">
          잠깐! 본 시험지에는 연인 간의 은밀한 취향(19+) 문항이 포함되어 있습니다.
        </h2>
        <p style="font-size:14px; color:#444; max-width:560px; margin:0 auto 22px; line-height:1.6;">
          출제위원(<strong>${escapeHtml(creatorName)}</strong>)님께서 <strong>[성적취향 탐구 영역]</strong>을 선택 과목으로 지정하여 출제한 시험지입니다.<br/>
          주변에 다른 사람이 없는지 확인하신 후 아래 버튼을 눌러 시험지를 펼치십시오.
        </p>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
          <button type="button" class="paper-btn primary" style="background:#9e1b32; font-size:15px; padding:12px 28px;" onclick="confirmSpicyGate()">
            🔞 확인했습니다 (시험지 펼치기)
          </button>
          <button type="button" class="paper-btn" onclick="goHome()">
            표지로 돌아가기
          </button>
        </div>
      </div>
    `;
  }

  let reportSummaryHtml = '';
  if (isResult && state.gradeResult) {
    const { totalScore, correctCount, gradeRank, stampText, passed, basicStat, spicyStat } = state.gradeResult;
    const examineeDisplay = state.examineeName.trim() || '익명 수험생';

    const breakdownRowHtml =
      spicyStat.total > 0
        ? `
        <div style="display:flex; gap:10px; margin-bottom:12px; font-family:var(--font-sans); font-size:12.5px;">
          <div style="flex:1; border:1px solid #222; padding:8px 10px; background:#fafafa;">
            <strong>📗 기본 탐구 영역:</strong> ${basicStat.correct} / ${basicStat.total}문항 정답
          </div>
          <div style="flex:1; border:1px solid #9e1b32; padding:8px 10px; background:#fff5f5; color:#9e1b32;">
            <strong>🔞 성적취향 탐구 영역:</strong> ${spicyStat.correct} / ${spicyStat.total}문항 정답
          </div>
        </div>
      `
        : '';

    const teacherInspectBannerHtml = state.isTeacherInspectMode
      ? `
        <div style="background:#1a1a1a; color:#fff; padding:10px 14px; margin-bottom:14px; font-family:var(--font-sans); font-size:13px; display:flex; justify-content:space-between; align-items:center;">
          <span>📬 <strong>${escapeHtml(examineeDisplay)}</strong>님이 제출한 실제 채점 답안지입니다.</span>
          <button type="button" class="util-btn" onclick="state.view='create'; renderApp();">← 출제 화면으로</button>
        </div>
      `
      : `
        <div style="border:2px solid #d9251d; background:#fff5f5; padding:14px 16px; margin-bottom:14px; font-family:var(--font-sans); text-align:center;">
          <div style="font-size:14px; font-weight:900; color:#b81d16; margin-bottom:4px;">
            💌 출제자(${escapeHtml(creatorName)})에게 내 성적표 & 채점된 답안지 보내기
          </div>
          <div style="font-size:12px; color:#444; margin-bottom:10px;">
            아래 버튼을 눌러 복사한 결과 링크를 카카오톡으로 보내면, 출제자가 내가 선택한 답과 채점된 시험지를 바로 볼 수 있습니다!
          </div>
          <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
            <button type="button" class="paper-btn primary" onclick="copyGradedResultLinkForCreator()">
              📋 채점된 성적표 답안지 링크 복사하기
            </button>
          </div>
        </div>
      `;

    reportSummaryHtml = `
      <div class="report-card-summary">
        ${teacherInspectBannerHtml}
        <div class="report-card-title">
          📜 [공식 성적 통지표] ${escapeHtml(examineeDisplay)} 수험생 채점 결과
        </div>
        <table class="report-table">
          <thead>
            <tr>
              <th>응시 영역</th>
              <th>수험생 성명</th>
              <th>정답 문항</th>
              <th>원점수 (만점)</th>
              <th>연애 등급</th>
              <th>합격 여부 (커트라인 ${cutoffScore}점)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${escapeHtml(creatorName)} (${escapeHtml(partnerRole)}) 탐구</strong></td>
              <td>${escapeHtml(examineeDisplay)}</td>
              <td>${correctCount} / ${questions.length}문항</td>
              <td style="font-weight:900; color:#d9251d; font-size:16px;">${totalScore}점 / 100점</td>
              <td><strong>${gradeRank}등급</strong> (${stampText})</td>
              <td style="font-weight:800; color:${passed ? '#15803d' : '#d9251d'};">
                ${passed ? '🎉 합격 (우수 연인)' : '⚠️ 재수강/심야보충 대상'}
              </td>
            </tr>
          </tbody>
        </table>
        ${breakdownRowHtml}
        <div style="font-family:var(--font-sans); font-size:13px; background:#f8f6f0; padding:10px 12px; border:1px dashed #333;">
          <strong>📌 출제위원 공약 및 당부사항:</strong> ${escapeHtml(promiseReward || '수고하셨습니다!')}
        </div>
        ${renderResultNativeAd(isSpicy, gradeRank)}
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:16px;">
          <button type="button" class="paper-btn" onclick="retakeCurrentExam()">🔄 다시 풀기 (재시험)</button>
          <button type="button" class="paper-btn" onclick="shareCurrentExamLink()">🔗 이 시험지 링크 공유하기</button>
          <button type="button" class="paper-btn primary" onclick="startCreateExam('${isSpicy ? 'spicy' : 'basic'}')">
            ✏️ 나도 문제 내서 복수하기 (내 시험지 만들기)
          </button>
        </div>
      </div>
    `;
  } else {
    reportSummaryHtml = `
      <div class="exam-notice-box" style="margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <span><strong>※ 수험생 안내:</strong> 상단에 <strong>성명</strong>을 기입한 후 아래 총 <strong>${questions.length}문항(100점 만점)</strong>의 답안을 마킹하시오.</span>
          <span style="font-family:var(--font-sans); font-size:12px; font-weight:800; color:#d9251d;">
            합격 커트라인: ${cutoffScore}점 이상
          </span>
        </div>
      </div>
    `;
  }

  const questionsHtml = questions
    .map((q, qIdx) => {
      const userAns = state.userAnswers[qIdx];
      const isSpicyQ = q.category === 'spicy';
      let gradeMarkHtml = '';
      let reviewNoteHtml = '';

      if (isResult && state.gradeResult) {
        const itemRes = state.gradeResult.itemResults[qIdx];
        if (itemRes.isCorrect) {
          gradeMarkHtml = renderRedPencilCircle(qIdx);
        } else {
          gradeMarkHtml = renderRedPencilWrong(qIdx);
        }

        const correctDisplay =
          q.type === 'mc'
            ? `${CIRCLE_NUMS[q.answer]} ${q.options[q.answer]}`
            : q.answerText;

        const qRec = getRecommendationForSingleQuestion(q, qIdx, !itemRes.isCorrect);
        const recBtnHtml = qRec
          ? `
            <div style="margin-top:6px; padding-top:6px; border-top:1px dashed rgba(217,37,29,0.3); display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="font-size:11.5px; color:#7f1d1d;">
                ${qRec.icon} <strong>${escapeHtml(qRec.badge)}:</strong> ${escapeHtml(qRec.productTitle)}
              </span>
              <a href="${escapeHtml(qRec.url)}" target="_blank" rel="noopener sponsored"
                 style="background:${escapeHtml(qRec.accentColor || '#d9251d')}; color:#fff; font-size:11px; font-weight:800; padding:3px 8px; border-radius:3px; text-decoration:none; white-space:nowrap;">
                ${escapeHtml(qRec.ctaLabel || '상품 보기 →')}
              </a>
            </div>
          `
          : '';

        reviewNoteHtml = `
          <div class="answer-review-note">
            <div><strong>${itemRes.isCorrect ? '⭕ 정답' : '❌ 오답'}</strong> · 정답: <strong>${escapeHtml(correctDisplay)}</strong></div>
            ${q.comment ? `<div style="margin-top:3px;">💬 출제자 해설: ${escapeHtml(q.comment)}</div>` : ''}
            ${recBtnHtml}
          </div>
        `;
      }

      let bodyHtml = '';
      if (q.type === 'mc') {
        const choicesHtml = q.options
          .map((optText, optIdx) => {
            const isSelected = userAns === optIdx;
            const isCorrectChoice = isResult && q.answer === optIdx;
            const highlightStyle =
              isResult && isCorrectChoice
                ? 'color:#d9251d; font-weight:900; text-decoration:underline;'
                : '';

            return `
              <li class="mc-choice-item ${isSelected ? 'selected' : ''}" 
                  style="${highlightStyle}"
                  onclick="${isResult ? '' : `selectMcAnswer(${qIdx}, ${optIdx})`}">
                <span class="mc-circle">${CIRCLE_NUMS[optIdx]}</span>
                <span>${escapeHtml(optText)}</span>
              </li>
            `;
          })
          .join('');

        bodyHtml = `<ul class="mc-choice-list">${choicesHtml}</ul>`;
      } else {
        bodyHtml = `
          <div class="subj-answer-box">
            <span class="subj-answer-label">답안</span>
            <input type="text" class="subj-answer-input"
              placeholder="정답 단어를 기입하시오"
              value="${escapeHtml(userAns || '')}"
              ${isResult ? 'readonly' : ''}
              oninput="inputSubjAnswer(${qIdx}, this.value)" />
          </div>
        `;
      }

      return `
        <div class="question-item">
          ${gradeMarkHtml}
          <div class="q-stem">
            <span class="q-number">${qIdx + 1}.</span>
            <span class="q-category-badge ${isSpicyQ ? 'spicy' : 'basic'}">
              ${isSpicyQ ? '🔞 성적취향' : '기본탐구'}
            </span>
            ${q.type === 'subj' ? '<span class="q-subj-badge">주관식</span>' : ''}
            <span>${escapeHtml(q.stem)}</span>
            <span class="q-points">[${q.points}점]</span>
          </div>
          ${bodyHtml}
          ${reviewNoteHtml}
        </div>
      `;
    })
    .join('');

  const submitBarHtml = !isResult
    ? `
      <div style="margin-top:32px; text-align:center; padding-top:20px; border-top:2px double #222;">
        <p style="font-size:13.5px; margin-bottom:12px; color:#444;">
          답안 작성을 모두 마쳤으면 아래 버튼을 눌러 답안지를 제출하고 즉시 채점 결과를 확인하시오.
        </p>
        <button type="button" class="paper-btn primary" style="font-size:16px; padding:14px 36px;" onclick="submitAndGradeExam()">
          💯 답안지 제출 및 빨간펜 채점하기
        </button>
      </div>
    `
    : '';

  return `
    ${renderKoreanExamHeader()}
    ${reportSummaryHtml}

    <div class="questions-container">
      ${questionsHtml}
    </div>

    ${submitBarHtml}

    <div class="exam-footer-bar">
      <span>※ 시험이 끝날 때까지 최선을 다해 주십시오.</span>
      <span>1 / 1</span>
      <span>${escapeHtml(creatorName)} 탐구영역 평가원</span>
    </div>
  `;
}

// =========================================================
// 출제자 편집 액션 핸들러
// =========================================================
function toggleSpicySubjectMode(enableSpicy) {
  state.examData.includeSpicy = enableSpicy;
  if (enableSpicy) {
    // 성적취향 모드를 켰을 때 성적취향 문항이 하나도 없으면 대표 문항 2개를 자동 추가해 줌
    const alreadyHasSpicy = state.examData.questions.some((q) => q.category === 'spicy');
    if (!alreadyHasSpicy) {
      state.examData.questions.push(JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[0])));
      state.examData.questions.push(JSON.parse(JSON.stringify(SPICY_PRESET_QUESTIONS[1])));
      balanceQuestionPoints();
      showToast('🔞 성적취향 탐구영역이 활성화되어 대표 문항 2개가 추가되었습니다!');
    } else {
      showToast('🔞 성적취향 탐구영역(선택과목)이 활성화되었습니다.');
    }
  } else {
    // 기본 탐구 전용으로 변경 시 기존 성적취향 문항 제거 여부 처리 (최소 1문항 유지)
    const basicOnly = state.examData.questions.filter((q) => q.category !== 'spicy');
    if (basicOnly.length > 0) {
      state.examData.questions = basicOnly;
    } else {
      state.examData.questions = JSON.parse(JSON.stringify(SAMPLE_BASIC_EXAM.questions.slice(0, 3)));
    }
    balanceQuestionPoints();
    showToast('📗 기본 탐구 영역 전용 모드로 전환되었습니다.');
  }
  renderApp();
}

function toggleQuestionCategory(qIdx) {
  const q = state.examData.questions[qIdx];
  q.category = q.category === 'spicy' ? 'basic' : 'spicy';
  if (q.category === 'spicy') {
    state.examData.includeSpicy = true;
  }
  renderApp();
}

function updateHeaderTitleLive() {
  const titleEl = document.querySelector('.exam-subject-title');
  if (titleEl) {
    const suffix = hasSpicyQuestions() ? '성적취향·심화 탐구 영역' : '기본 탐구 영역';
    titleEl.textContent = `${state.examData.creatorName} (${state.examData.partnerRole}) ${suffix}`;
  }
}

function updateQuestionStem(qIdx, val) {
  state.examData.questions[qIdx].stem = val;
}

function updateQuestionComment(qIdx, val) {
  state.examData.questions[qIdx].comment = val;
}

function updateMcOptionText(qIdx, optIdx, val) {
  state.examData.questions[qIdx].options[optIdx] = val;
}

function setMcCorrectAnswer(qIdx, optIdx) {
  state.examData.questions[qIdx].answer = optIdx;
  renderApp();
}

function updateSubjAnswer(qIdx, val) {
  state.examData.questions[qIdx].answerText = val;
}

function changeQuestionType(qIdx, newType) {
  const q = state.examData.questions[qIdx];
  q.type = newType;
  if (newType === 'mc' && (!q.options || q.options.length < 4)) {
    q.options = ['선지 1', '선지 2', '선지 3', '선지 4'];
    q.answer = 0;
  }
  if (newType === 'subj' && !q.answerText) {
    q.answerText = '';
  }
  renderApp();
}

function addBlankQuestion(type, category = 'basic') {
  if (category === 'spicy') {
    state.examData.includeSpicy = true;
  }
  state.examData.questions.push({
    category,
    type,
    stem:
      category === 'spicy'
        ? '[성적취향] 나와의 스킨십/밤 분위기에서 가장 중요하게 생각하는 것은?'
        : type === 'mc'
        ? '나에 대한 새로운 객관식 문제를 입력하시오.'
        : '[단답형] 나에 대한 주관식 문제를 입력하시오.',
    options: ['보기 1', '보기 2', '보기 3', '보기 4'],
    answer: 0,
    answerText: '',
    points: 20,
    comment: ''
  });
  balanceQuestionPoints();
  renderApp();
  showToast(category === 'spicy' ? '🔞 성적취향 문항이 추가되었습니다.' : '📗 기본 탐구 문항이 추가되었습니다.');
}

function addPresetQuestion(category, presetIdx) {
  const sourceList = category === 'spicy' ? SPICY_PRESET_QUESTIONS : BASIC_PRESET_QUESTIONS;
  const preset = JSON.parse(JSON.stringify(sourceList[presetIdx]));
  delete preset.label;
  if (category === 'spicy') {
    state.examData.includeSpicy = true;
  }
  state.examData.questions.push(preset);
  balanceQuestionPoints();
  renderApp();
  showToast(category === 'spicy' ? '🔞 성적취향 추천 문항이 추가되었습니다!' : '📗 기본 탐구 추천 문항이 추가되었습니다!');
}

function removeQuestion(qIdx) {
  if (state.examData.questions.length <= 1) {
    showToast('최소 1개 이상의 문항이 필요합니다.');
    return;
  }
  state.examData.questions.splice(qIdx, 1);
  balanceQuestionPoints();
  renderApp();
}

function generateExamShareLink() {
  const qs = state.examData.questions;
  for (let i = 0; i < qs.length; i++) {
    if (!qs[i].stem.trim()) {
      showToast(`${i + 1}번 문항의 문제 지문을 입력해 주세요.`);
      return;
    }
    if (qs[i].type === 'subj' && !(qs[i].answerText || '').trim()) {
      showToast(`${i + 1}번 주관식 문항의 정답 단어를 입력해 주세요.`);
      return;
    }
  }

  balanceQuestionPoints();
  if (!state.examData.examId) {
    state.examData.examId = 'LOVE-' + Math.floor(1000 + Math.random() * 9000);
  }
  const ingestReport = ingestCreatedExamToTrendDB(state.examData.questions);
  const encoded = encodeExamToParam(state.examData);
  const baseUrl = window.location.origin + window.location.pathname;
  state.generatedShareUrl = `${baseUrl}?exam=${encoded}`;

  window.history.replaceState({}, '', `?exam=${encoded}`);
  renderApp();
  showToast(
    `📊 링크 생성 완료! (기출 빅데이터 취합: 유사질문 ${ingestReport.merged}건 합산, 신규주제 ${ingestReport.created}건 등록)`
  );

  setTimeout(() => {
    const shareBox = document.getElementById('shareBoxSection');
    if (shareBox) shareBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function copyShareUrl() {
  if (!state.generatedShareUrl) return;
  navigator.clipboard
    .writeText(state.generatedShareUrl)
    .then(() => showToast('📋 링크가 복사되었습니다! 카카오톡으로 연인에게 보내보세요.'))
    .catch(() => {
      const input = document.getElementById('generatedUrlInput');
      if (input) {
        input.select();
        document.execCommand('copy');
        showToast('📋 링크가 복사되었습니다!');
      }
    });
}

function previewCreatedExam() {
  state.userAnswers = {};
  state.gradeResult = null;
  state.spicyGateConfirmed = false;
  state.view = 'take';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================
// 수험생 답안 마킹 및 채점 핸들러
// =========================================================
function selectMcAnswer(qIdx, optIdx) {
  state.userAnswers[qIdx] = optIdx;
  renderApp();
}

function inputSubjAnswer(qIdx, val) {
  state.userAnswers[qIdx] = val;
}

function normalizeAnswerText(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/\s+/g, '');
}

function submitAndGradeExam() {
  const qs = state.examData.questions;

  let totalScore = 0;
  let correctCount = 0;
  const basicStat = { correct: 0, total: 0 };
  const spicyStat = { correct: 0, total: 0 };
  const itemResults = [];

  qs.forEach((q, idx) => {
    const userAns = state.userAnswers[idx];
    let isCorrect = false;

    if (q.type === 'mc') {
      isCorrect = userAns === q.answer;
    } else {
      const normalizedUser = normalizeAnswerText(userAns);
      const acceptedList = String(q.answerText || '')
        .split(',')
        .map((s) => normalizeAnswerText(s))
        .filter(Boolean);
      isCorrect = normalizedUser.length > 0 && acceptedList.includes(normalizedUser);
    }

    if (q.category === 'spicy') {
      spicyStat.total += 1;
      if (isCorrect) spicyStat.correct += 1;
    } else {
      basicStat.total += 1;
      if (isCorrect) basicStat.correct += 1;
    }

    if (isCorrect) {
      totalScore += Number(q.points) || 0;
      correctCount += 1;
    }

    itemResults.push({ isCorrect });
  });

  // 한국 수능식 1~9등급 산출
  const isSpicy = hasSpicyQuestions();
  let gradeRank = 9;
  let stampText = '야간자율학습 확정';
  if (totalScore >= 96) {
    gradeRank = 1;
    stampText = isSpicy ? '낮이밤이 1등급 장인' : '최우수 사랑꾼 인증';
  } else if (totalScore >= 89) {
    gradeRank = 2;
    stampText = isSpicy ? '환상의 밤 궁합' : '참 잘했어요';
  } else if (totalScore >= 77) {
    gradeRank = 3;
    stampText = '우수 연인 합격';
  } else if (totalScore >= 60) {
    gradeRank = 4;
    stampText = '조금 더 분발하시오';
  } else if (totalScore >= 40) {
    gradeRank = 5;
    stampText = isSpicy ? '심야 보충수업 요망' : '보충수업 요망';
  } else if (totalScore >= 20) {
    gradeRank = 7;
    stampText = '재수강 요망';
  } else {
    gradeRank = 9;
    stampText = '사랑의 매 / 재시험';
  }

  // 채점 결과를 기출 빅데이터 DB에 반영하여 실시간 오답률 갱신
  recordGradingToTrendDB(qs, itemResults);

  state.gradeResult = {
    totalScore,
    correctCount,
    gradeRank,
    stampText,
    passed: totalScore >= (state.examData.cutoffScore || 80),
    basicStat,
    spicyStat,
    itemResults
  };

  // 출제자가 로그인 없이도 결과를 바로 확인할 수 있도록 실시간 수신함 저장 & 결과 공유 링크 생성
  if (!state.isTeacherInspectMode) {
    recordSubmissionAndNotifyCreator();
  }

  state.view = 'result';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast(`채점 완료! ${totalScore}점 (제 ${gradeRank} 등급)`);
}

function retakeCurrentExam() {
  state.userAnswers = {};
  state.gradeResult = null;
  state.view = 'take';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareCurrentExamLink() {
  const encoded = encodeExamToParam(state.examData);
  const url = `${window.location.origin}${window.location.pathname}?exam=${encoded}`;
  navigator.clipboard
    .writeText(url)
    .then(() => showToast('📋 이 시험지 링크가 클립보드에 복사되었습니다!'))
    .catch(() => showToast('주소창의 URL을 복사해 전달해 주세요.'));
}

// =========================================================
// [기능 1] 유사 질문 자동 취합 & 클러스터링 빅데이터 엔진
// =========================================================
const TREND_STORAGE_KEY = 'love_exam_trend_clusters_v1';

function getDefaultTrendClusters() {
  const all = [...BASIC_PRESET_QUESTIONS, ...SPICY_PRESET_QUESTIONS];
  return JSON.parse(JSON.stringify(all));
}

function loadTrendClusters() {
  try {
    const raw = localStorage.getItem(TREND_STORAGE_KEY);
    if (!raw) {
      const defaults = getDefaultTrendClusters();
      localStorage.setItem(TREND_STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : getDefaultTrendClusters();
  } catch (e) {
    return getDefaultTrendClusters();
  }
}

function saveTrendClusters(clusters) {
  try {
    localStorage.setItem(TREND_STORAGE_KEY, JSON.stringify(clusters));
  } catch (e) {
    console.warn('트렌드 저장 실패:', e);
  }
}

// 한국어 문장에서 핵심 2글자 이상 바이그램(Bigram) 및 키워드 추출하여 유사도(0~1) 산출
function extractTokens(text) {
  const cleaned = String(text || '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/[^가-힣a-zA-Z0-9\s]/g, ' ')
    .trim();
  const words = cleaned.split(/\s+/).filter((w) => w.length >= 2);
  const bigrams = new Set();
  words.forEach((w) => {
    bigrams.add(w);
    for (let i = 0; i < w.length - 1; i++) {
      bigrams.add(w.slice(i, i + 2));
    }
  });
  return Array.from(bigrams);
}

function calculateQuestionSimilarity(stemText, cluster) {
  const tokensA = extractTokens(stemText);
  if (!tokensA.length) return 0;

  // 1) 클러스터 핵심 키워드 매칭 가산점
  let keywordHits = 0;
  (cluster.keywords || []).forEach((kw) => {
    if (stemText.includes(kw)) keywordHits += 1;
  });

  // 2) 기존 대표 질문 및 변형(variants)들과의 바이그램 Jaccard 유사도
  const referenceTexts = [cluster.stem, ...(cluster.variants || [])].join(' ');
  const tokensB = new Set(extractTokens(referenceTexts));
  let intersection = 0;
  tokensA.forEach((t) => {
    if (tokensB.has(t)) intersection += 1;
  });

  const bigramScore = intersection / Math.max(tokensA.length, 4);
  const keywordScore = Math.min(keywordHits * 0.28, 0.75);
  return Math.min(1, bigramScore * 0.55 + keywordScore);
}

function getTrendClustersByCategory(category) {
  const clusters = loadTrendClusters();
  return clusters
    .filter((c) => (c.category || 'basic') === category)
    .sort((a, b) => (b.pickCount || 0) - (a.pickCount || 0));
}

function addClusterQuestionToExam(clusterId, useLatestVariant) {
  const clusters = loadTrendClusters();
  const found = clusters.find((c) => c.clusterId === clusterId);
  if (!found) return;

  // 출제 선택 횟수 즉시 +1
  found.pickCount = (found.pickCount || 0) + 1;
  saveTrendClusters(clusters);

  const newQ = {
    category: found.category || 'basic',
    type: found.type || 'mc',
    stem:
      useLatestVariant && found.variants && found.variants.length
        ? found.variants[found.variants.length - 1]
        : found.stem,
    options: JSON.parse(JSON.stringify(found.options || ['보기 1', '보기 2', '보기 3', '보기 4'])),
    answer: found.answer || 0,
    answerText: found.answerText || '',
    points: 20,
    comment: found.comment || ''
  };

  if (newQ.category === 'spicy') {
    state.examData.includeSpicy = true;
  }
  state.examData.questions.push(newQ);
  balanceQuestionPoints();
  renderApp();
  showToast(
    `🔥 [${found.label}] 문항이 추가되었습니다! (누적 출제 ${found.pickCount.toLocaleString()}회)`
  );
}

// 출제자가 링크 생성 시 출제 문항들을 분석해 유사 클러스터에 통합하거나 신규 클러스터로 등록
function ingestCreatedExamToTrendDB(questions) {
  const clusters = loadTrendClusters();
  let merged = 0;
  let created = 0;

  questions.forEach((q) => {
    const stem = (q.stem || '').trim();
    if (!stem) return;
    const qCategory = q.category || 'basic';

    // 같은 과목 내에서 가장 유사도가 높은 클러스터 탐색
    let bestCluster = null;
    let bestScore = 0;
    clusters.forEach((c) => {
      if ((c.category || 'basic') !== qCategory) return;
      const score = calculateQuestionSimilarity(stem, c);
      if (score > bestScore) {
        bestScore = score;
        bestCluster = c;
      }
    });

    if (bestCluster && bestScore >= 0.26) {
      bestCluster.pickCount = (bestCluster.pickCount || 0) + 1;
      if (!bestCluster.variants) bestCluster.variants = [];
      if (!bestCluster.variants.includes(stem)) {
        bestCluster.variants.push(stem);
        if (bestCluster.variants.length > 6) bestCluster.variants.shift();
      }
      merged += 1;
    } else {
      // 새로운 유형의 질문이면 신규 클러스터로 등록해 다음 출제자에게도 추천!
      const shortTitle = stem.replace(/\[[^\]]*\]/g, '').trim().slice(0, 14);
      clusters.push({
        label: `✨ 신규기출: ${shortTitle}...`,
        clusterId: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        keywords: extractTokens(stem).slice(0, 6),
        pickCount: 15, // 신규 출제 기본 노출 가중치
        attemptCount: 10,
        wrongCount: 5,
        variants: [stem],
        category: qCategory,
        type: q.type || 'mc',
        stem,
        options: JSON.parse(JSON.stringify(q.options || ['보기 1', '보기 2', '보기 3', '보기 4'])),
        answer: q.answer || 0,
        answerText: q.answerText || '',
        points: 20,
        comment: q.comment || ''
      });
      created += 1;
    }
  });

  saveTrendClusters(clusters);
  return { merged, created };
}

// 수험생이 채점할 때마다 문항별 정답/오답 통계를 클러스터에 누적
function recordGradingToTrendDB(questions, itemResults) {
  const clusters = loadTrendClusters();
  questions.forEach((q, idx) => {
    const stem = (q.stem || '').trim();
    const res = itemResults[idx];
    if (!stem || !res) return;

    let bestCluster = null;
    let bestScore = 0;
    clusters.forEach((c) => {
      const score = calculateQuestionSimilarity(stem, c);
      if (score > bestScore) {
        bestScore = score;
        bestCluster = c;
      }
    });

    if (bestCluster && bestScore >= 0.25) {
      bestCluster.attemptCount = (bestCluster.attemptCount || 0) + 1;
      if (!res.isCorrect) {
        bestCluster.wrongCount = (bestCluster.wrongCount || 0) + 1;
      }
    }
  });
  saveTrendClusters(clusters);
}

// =========================================================
// [기능 2] 통합 수익화 엔진 (쿠팡 파트너스 + 1020 무신사·지그재그·에이블리·올리브영·29CM + 구글 애드센스 + 카카오 애드핏)
// =========================================================
let adSenseScriptLoaded = false;
let kakaoAdFitScriptLoaded = false;

const PARTNER_PLATFORM_META = {
  coupang: {
    key: 'coupang',
    name: '쿠팡',
    brandBadge: 'COUPANG',
    ctaLabel: '쿠팡에서 보기 →',
    buyBtnText: '쿠팡에서 구매하기',
    accentColor: '#346aff',
    badgeBg: '#ebf5ff',
    badgeColor: '#0073e9',
    defaultDeliveryBadge: '🚀 로켓배송'
  },
  musinsa: {
    key: 'musinsa',
    name: '무신사',
    brandBadge: 'MUSINSA',
    ctaLabel: '무신사에서 보기 →',
    buyBtnText: '무신사 스토어 보기',
    accentColor: '#111111',
    badgeBg: '#111111',
    badgeColor: '#ffffff',
    defaultDeliveryBadge: 'MUSINSA 무료배송'
  },
  zigzag: {
    key: 'zigzag',
    name: '지그재그',
    brandBadge: 'ZIGZAG',
    ctaLabel: '지그재그에서 보기 →',
    buyBtnText: '지그재그 직진배송 보기',
    accentColor: '#ff2f92',
    badgeBg: '#fff0f7',
    badgeColor: '#e0167b',
    defaultDeliveryBadge: '⚡ 직진배송'
  },
  ably: {
    key: 'ably',
    name: '에이블리',
    brandBadge: 'ABLY',
    ctaLabel: '에이블리에서 보기 →',
    buyBtnText: '에이블리 샥출발 보기',
    accentColor: '#ff5160',
    badgeBg: '#fff1f2',
    badgeColor: '#e11d48',
    defaultDeliveryBadge: '⚡ 샥출발 무료배송'
  },
  oliveyoung: {
    key: 'oliveyoung',
    name: '올리브영',
    brandBadge: 'OLIVE YOUNG',
    ctaLabel: '올리브영에서 보기 →',
    buyBtnText: '올리브영 오늘드림 보기',
    accentColor: '#5a9e14',
    badgeBg: '#f1fce8',
    badgeColor: '#3f7606',
    defaultDeliveryBadge: '🛵 오늘드림'
  },
  '29cm': {
    key: '29cm',
    name: '29CM',
    brandBadge: '29CM',
    ctaLabel: '29CM에서 보기 →',
    buyBtnText: '29CM 선물하기 보기',
    accentColor: '#1e293b',
    badgeBg: '#f1f5f9',
    badgeColor: '#0f172a',
    defaultDeliveryBadge: '🎁 29CM 선물포장'
  }
};

function getPlatformMeta(platformKey) {
  return PARTNER_PLATFORM_META[platformKey] || PARTNER_PLATFORM_META.coupang;
}

function ensureGoogleAdSenseScript(clientId) {
  if (adSenseScriptLoaded || !clientId) return;
  adSenseScriptLoaded = true;
  const s = document.createElement('script');
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
  s.async = true;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

function ensureKakaoAdFitScript() {
  if (kakaoAdFitScriptLoaded) return;
  kakaoAdFitScriptLoaded = true;
  const s = document.createElement('script');
  s.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
  s.async = true;
  document.head.appendChild(s);
}

// 쿠팡 파트너스 트래킹 코드(AF...) 또는 단축 URL을 결합해 실제 쿠팡 이동 링크 생성
function buildCoupangAffiliateUrl(directUrl, searchQuery) {
  if (directUrl && directUrl.trim()) {
    return directUrl.trim();
  }
  const cfg = window.LOVE_EXAM_AD_CONFIG || {};
  const bw = cfg.coupangBannerWidget || {};
  const trackingCode = (bw.trackingCode || cfg.coupangTrackingCode || 'AF3621090').trim();
  const subId = (bw.subId || cfg.coupangSubId || 'love_exam').trim();
  const q = (searchQuery || '커플 인기 선물').trim();
  let url = `https://www.coupang.com/np/search?q=${encodeURIComponent(q)}`;
  if (trackingCode) {
    url += `&lptag=${encodeURIComponent(trackingCode)}&subid=${encodeURIComponent(subId)}&channel=user`;
  }
  return url;
}

// 멀티 플랫폼(쿠팡 / 무신사 / 지그재그 / 에이블리 / 올리브영 / 29CM) 제휴 링크 빌더
function buildPartnerAffiliateUrl(platformKey, directUrl, searchQuery) {
  if (directUrl && directUrl.trim()) {
    return directUrl.trim();
  }
  const pKey = (platformKey || 'coupang').toLowerCase();
  if (pKey === 'coupang') {
    return buildCoupangAffiliateUrl(directUrl, searchQuery);
  }

  const cfg = window.LOVE_EXAM_AD_CONFIG || {};
  const fb = cfg.fashionBeautyPartners || {};
  const q = encodeURIComponent((searchQuery || '커플 선물').trim());

  if (pKey === 'musinsa') {
    const m = fb.musinsa || {};
    const base = m.defaultSearchBase || 'https://www.musinsa.com/search/goods?keyword=';
    const code = (m.curatorId || '').trim();
    return `${base}${q}${code ? `&utm_source=musinsa_curator&curator=${encodeURIComponent(code)}` : ''}`;
  }
  if (pKey === 'zigzag') {
    const z = fb.zigzag || {};
    const base = z.defaultSearchBase || 'https://zigzag.kr/search?keyword=';
    const code = (z.affiliateCode || '').trim();
    return `${base}${q}${code ? `&utm_source=affiliate&aff_id=${encodeURIComponent(code)}` : ''}`;
  }
  if (pKey === 'ably') {
    const a = fb.ably || {};
    const base = a.defaultSearchBase || 'https://m.a-bly.com/search?keyword=';
    const code = (a.affiliateCode || '').trim();
    return `${base}${q}${code ? `&utm_source=partner&ref=${encodeURIComponent(code)}` : ''}`;
  }
  if (pKey === 'oliveyoung') {
    const o = fb.oliveyoung || {};
    const base = o.defaultSearchBase || 'https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query=';
    const code = (o.affiliateCode || '').trim();
    return `${base}${q}${code ? `&utm_source=affiliate&curator=${encodeURIComponent(code)}` : ''}`;
  }
  if (pKey === '29cm' || pKey === 'cm29') {
    const c = fb.cm29 || {};
    const base = c.defaultSearchBase || 'https://shop.29cm.co.kr/search?keyword=';
    const code = (c.affiliateCode || '').trim();
    return `${base}${q}${code ? `&utm_source=partner&aff=${encodeURIComponent(code)}` : ''}`;
  }

  return buildCoupangAffiliateUrl(directUrl, searchQuery);
}

function enrichCatalogRuleToRec(rule, qIdx, isWrongAnswer, answerLabelOverride, queryOverride) {
  const platformKey = rule.platform || 'coupang';
  const meta = getPlatformMeta(platformKey);
  const finalQuery = queryOverride || rule.searchQuery || '커플 인기 선물';
  const deliveryBadge =
    rule.deliveryBadge || (rule.isRocket !== false && platformKey === 'coupang' ? '🚀 로켓배송' : meta.defaultDeliveryBadge);

  return {
    qNumber: qIdx + 1,
    platform: platformKey,
    platformName: meta.name,
    brandBadge: meta.brandBadge,
    ctaLabel: meta.ctaLabel,
    buyBtnText: meta.buyBtnText,
    accentColor: meta.accentColor,
    badgeBg: meta.badgeBg,
    badgeColor: meta.badgeColor,
    deliveryBadge,
    isWrongAnswer: Boolean(isWrongAnswer),
    answerLabel: answerLabelOverride || rule.badge,
    icon: rule.category === 'spicy' ? '🥂' : '🎁',
    badge: isWrongAnswer ? `${qIdx + 1}번 오답 만회템` : `${qIdx + 1}번 정답 취향템`,
    originalBadge: rule.badge,
    productTitle: rule.productTitle,
    priceText: rule.priceText || '19,900원',
    ratingText: rule.ratingText || '★★★★★ (1,200+)',
    isRocket: platformKey === 'coupang' ? rule.isRocket !== false : false,
    imageUrl: rule.imageUrl,
    url: buildPartnerAffiliateUrl(platformKey, rule.directLinkUrl, finalQuery)
  };
}

// 단일 문항의 '출제자 정답(객관식 정답 선지 또는 주관식 정답 단어)'을 분석해 이미지 포함 맞춤 추천 상품 생성
function getRecommendationForSingleQuestion(q, qIdx, isWrongAnswer, preferredGroup) {
  const cfg = window.LOVE_EXAM_AD_CONFIG || {};
  const allCatalog = cfg.answerKeywordCatalog || [];

  const catalog = preferredGroup === 'coupang'
    ? allCatalog.filter((c) => (c.platform || 'coupang') === 'coupang')
    : preferredGroup === 'fashion_beauty'
    ? allCatalog.filter((c) => (c.platform || 'coupang') !== 'coupang')
    : allCatalog;

  const answerTextRaw =
    q.type === 'mc'
      ? String((q.options || [])[q.answer || 0] || '').trim()
      : String((q.answerText || '').split(',')[0] || '').trim();

  if (!answerTextRaw) return null;

  const combinedText = `${answerTextRaw} ${q.stem || ''} ${q.comment || ''}`;
  let matchedRule = null;

  for (let i = 0; i < catalog.length; i++) {
    const rule = catalog[i];
    const hit = (rule.matchKeywords || []).some((kw) => combinedText.includes(kw));
    if (hit) {
      matchedRule = rule;
      break;
    }
  }

  const shortAnswerLabel =
    answerTextRaw.length > 16 ? answerTextRaw.slice(0, 16) + '...' : answerTextRaw;

  if (matchedRule) {
    const dynamicQuery =
      q.type === 'subj' && answerTextRaw.length <= 12
        ? `${answerTextRaw} ${matchedRule.searchQuery}`
        : matchedRule.searchQuery;

    return enrichCatalogRuleToRec(matchedRule, qIdx, isWrongAnswer, shortAnswerLabel, dynamicQuery);
  }

  const isSpicyQ = q.category === 'spicy';
  const fallbackPlatform =
    preferredGroup === 'fashion_beauty'
      ? isSpicyQ
        ? 'oliveyoung'
        : qIdx % 2 === 0
        ? 'musinsa'
        : 'zigzag'
      : 'coupang';
  const meta = getPlatformMeta(fallbackPlatform);
  const fallbackQuery =
    q.type === 'subj'
      ? `${answerTextRaw} 선물 세트`
      : isSpicyQ
      ? '커플 시크릿 이벤트 선물'
      : `${answerTextRaw}`;

  return {
    qNumber: qIdx + 1,
    platform: fallbackPlatform,
    platformName: meta.name,
    brandBadge: meta.brandBadge,
    ctaLabel: meta.ctaLabel,
    buyBtnText: meta.buyBtnText,
    accentColor: meta.accentColor,
    badgeBg: meta.badgeBg,
    badgeColor: meta.badgeColor,
    deliveryBadge: meta.defaultDeliveryBadge,
    isWrongAnswer: Boolean(isWrongAnswer),
    answerLabel: shortAnswerLabel,
    icon: isSpicyQ ? '🥂' : '🎁',
    badge: isWrongAnswer ? `${qIdx + 1}번 오답 만회템` : `${qIdx + 1}번 정답 맞춤템`,
    originalBadge: `${meta.name} 추천`,
    productTitle: `[${shortAnswerLabel}] ${meta.name} 베스트 추천 기프트`,
    priceText: isSpicyQ ? '24,900원' : '18,900원',
    ratingText: '★★★★★ (980+)',
    isRocket: fallbackPlatform === 'coupang',
    imageUrl: isSpicyQ
      ? 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80'
      : 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80',
    url: buildPartnerAffiliateUrl(fallbackPlatform, '', fallbackQuery)
  };
}

// 현재 시험지의 전체 문항 정답에서 추천 상품 리스트 추출 (틀린 문항 우선 정렬, 그룹별 필터 지원)
function extractRecommendationsFromExamAnswers(preferredGroup) {
  const cfg = window.LOVE_EXAM_AD_CONFIG || {};
  const allCatalog = cfg.answerKeywordCatalog || [];
  const qs = (state.examData && state.examData.questions) || [];
  const itemResults = (state.gradeResult && state.gradeResult.itemResults) || [];
  const recs = [];

  qs.forEach((q, idx) => {
    const isWrong = itemResults[idx] ? !itemResults[idx].isCorrect : false;
    const rec = getRecommendationForSingleQuestion(q, idx, isWrong, preferredGroup);
    if (rec) recs.push(rec);
  });

  const isSpicy =
    (state.view === 'home' && state.onboarding.subjectChoice !== 'basic') ||
    (state.view !== 'home' && hasSpicyQuestions());

  const filteredCatalog = allCatalog.filter((c) => {
    const catMatch = isSpicy ? c.category === 'spicy' : c.category === 'basic';
    if (!catMatch) return false;
    if (preferredGroup === 'coupang') return (c.platform || 'coupang') === 'coupang';
    if (preferredGroup === 'fashion_beauty') return (c.platform || 'coupang') !== 'coupang';
    return true;
  });

  filteredCatalog.forEach((c, idx) => {
    if (recs.length < 6) {
      const enriched = enrichCatalogRuleToRec(c, idx, false, c.badge, c.searchQuery);
      enriched.badge = c.badge;
      recs.push(enriched);
    }
  });

  recs.sort((a, b) => Number(b.isWrongAnswer) - Number(a.isWrongAnswer));
  return recs;
}

// 쿠팡 파트너스 공식 배너 위젯(iframe) 또는 쿠팡 다이나믹 이미지 배너 렌더링
function buildCoupangImageBannerWidgetHtml(items, isSpicy, headerHintText) {
  const cardsHtml = items
    .slice(0, 2)
    .map(
      (item) => `
      <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener sponsored" class="cp-item-card">
        <div class="cp-thumb-box">
          <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.productTitle)}" loading="lazy" />
        </div>
        <div class="cp-item-title">${escapeHtml(item.productTitle)}</div>
        <div class="cp-price-row">
          <span class="cp-price-text">${escapeHtml(item.priceText || '19,900원')}</span>
          <span class="cp-rocket-badge">${escapeHtml(item.deliveryBadge || '🚀로켓배송')}</span>
        </div>
        <div class="cp-rating-row">${escapeHtml(item.ratingText || '★★★★★')}</div>
        <div class="cp-buy-btn">${escapeHtml(item.buyBtnText || '쿠팡에서 구매하기')}</div>
      </a>
    `
    )
    .join('');

  return `
    <div class="coupang-widget-frame">
      <div>
        <div class="coupang-widget-header">
          <span class="cp-brand-logo">
            <span style="color:#513228;">cou</span><span style="color:#e52528;">p</span><span style="color:#f58220;">a</span><span style="color:#7fb736;">n</span><span style="color:#2ca8e0;">g</span>
          </span>
          <span class="cp-ad-tag">다이나믹배너</span>
        </div>
        <div class="cp-answer-hint-banner ${isSpicy ? 'spicy' : ''}">
          ${escapeHtml(headerHintText)}
        </div>
        <div class="cp-items-stack">
          ${cardsHtml}
        </div>
      </div>
      <div class="coupang-widget-footer">
        쿠팡 파트너스 활동의 일환으로<br/>일정액의 수수료를 제공받습니다.
      </div>
    </div>
  `;
}

// 1020 패션·뷰티·라이프스타일 파트너스 (무신사 / 지그재그 / 에이블리 / 올리브영 / 29CM) 전용 사이드바 위젯
function buildFashionBeautyWidgetHtml(items, isSpicy, headerHintText) {
  const cardsHtml = items
    .slice(0, 2)
    .map((item) => {
      const meta = getPlatformMeta(item.platform);
      return `
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener sponsored" class="cp-item-card fb-partner-card">
          <div class="cp-thumb-box">
            <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.productTitle)}" loading="lazy" />
            <span class="fb-platform-floating-pill" style="background:${escapeHtml(meta.accentColor)};">
              ${escapeHtml(meta.brandBadge)}
            </span>
          </div>
          <div class="cp-item-title">${escapeHtml(item.productTitle)}</div>
          <div class="cp-price-row">
            <span class="cp-price-text" style="color:#111;">${escapeHtml(item.priceText || '27,800원')}</span>
            <span class="cp-rocket-badge" style="background:${escapeHtml(meta.badgeBg)}; color:${escapeHtml(meta.badgeColor)};">
              ${escapeHtml(item.deliveryBadge || meta.defaultDeliveryBadge)}
            </span>
          </div>
          <div class="cp-rating-row">${escapeHtml(item.ratingText || '★ 4.9')}</div>
          <div class="cp-buy-btn" style="background:${escapeHtml(meta.accentColor)};">
            ${escapeHtml(meta.buyBtnText)}
          </div>
        </a>
      `;
    })
    .join('');

  return `
    <div class="coupang-widget-frame fb-widget-frame">
      <div>
        <div class="coupang-widget-header" style="background:#111; color:#fff; border-bottom-color:#222;">
          <span class="cp-brand-logo" style="font-size:12px; color:#fff; letter-spacing:0.2px;">
            ✨ 1020 STYLE PICK
          </span>
          <span class="cp-ad-tag" style="color:#ddd; border-color:#444;">AD · 제휴</span>
        </div>
        <div class="cp-answer-hint-banner ${isSpicy ? 'spicy' : ''}" style="background:${isSpicy ? '#9e1b32' : '#ff2f92'};">
          ${escapeHtml(headerHintText)}
        </div>
        <div class="cp-items-stack">
          ${cardsHtml}
        </div>
      </div>
      <div class="coupang-widget-footer">
        무신사·지그재그·올리브영·에이블리 등<br/>제휴 활동으로 수수료를 제공받을 수 있습니다.
      </div>
    </div>
  `;
}

function buildOfficialCoupangIframeHtml(bannerId, trackingCode, subId) {
  const src = `https://ads-partners.coupang.com/widgets.html?id=${encodeURIComponent(
    bannerId
  )}&template=carousel&trackingCode=${encodeURIComponent(
    trackingCode || ''
  )}&subId=${encodeURIComponent(subId || 'love_exam')}&width=160&height=600&tsource=`;
  return `
    <div class="coupang-widget-frame" style="align-items:center; justify-content:center; padding:6px 0;">
      <iframe src="${src}" width="160" height="600" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>
    </div>
  `;
}

// 카카오 애드핏 슬롯 렌더링 (단위 ID가 있으면 실제 광고 호출, 없으면 프리뷰/파트너스 폴백)
function renderKakaoAdFitSlot(containerEl, unitId, width, height, fallbackHtml) {
  if (!containerEl) return;
  const cleanUnit = (unitId || '').trim();
  if (cleanUnit) {
    ensureKakaoAdFitScript();
    containerEl.innerHTML = `
      <div style="display:flex; justify-content:center; align-items:center; min-height:${height}px;">
        <ins class="kakao_ad_area" style="display:none;"
          data-ad-unit="${escapeHtml(cleanUnit)}"
          data-ad-width="${width}"
          data-ad-height="${height}"></ins>
      </div>
    `;
  } else if (fallbackHtml) {
    containerEl.innerHTML = fallbackHtml;
  }
}

// 구글 애드센스 슬롯 렌더링 (19+ 모드에서는 정책 보호를 위해 자동 파트너스/애드핏 폴백)
function renderGoogleAdSenseSlot(containerEl, clientId, slotId, width, height, isSpicy, fallbackHtml) {
  if (!containerEl) return;
  const cleanClient = (clientId || '').trim();
  const cleanSlot = (slotId || '').trim();
  if (!isSpicy && cleanClient && cleanSlot) {
    ensureGoogleAdSenseScript(cleanClient);
    containerEl.innerHTML = `
      <ins class="adsbygoogle"
        style="display:inline-block;width:${width}px;height:${height}px"
        data-ad-client="${escapeHtml(cleanClient)}"
        data-ad-slot="${escapeHtml(cleanSlot)}"></ins>
    `;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  } else if (fallbackHtml) {
    containerEl.innerHTML = fallbackHtml;
  }
}

function buildMobileStripBannerHtml(rec, isSpicy) {
  if (!rec) return '';
  const meta = getPlatformMeta(rec.platform);
  return `
    <div style="display:flex; align-items:center; gap:10px;">
      <img src="${escapeHtml(rec.imageUrl)}" alt="" style="width:42px; height:42px; object-fit:cover; border-radius:4px; border:1px solid #ddd; flex-shrink:0;" />
      <div style="text-align:left;">
        <div style="font-size:10px; font-weight:800; color:${escapeHtml(meta.accentColor)};">
          [${escapeHtml(meta.brandBadge)}] ${escapeHtml(rec.deliveryBadge || meta.defaultDeliveryBadge)} · ${escapeHtml(rec.badge)}
        </div>
        <strong style="font-size:12.5px; color:#111; display:block; line-height:1.3;">
          ${escapeHtml(rec.productTitle)} (${escapeHtml(rec.priceText)})
        </strong>
      </div>
    </div>
    <a href="${escapeHtml(rec.url)}" target="_blank" rel="noopener sponsored"
       style="background:${escapeHtml(meta.accentColor)}; color:#fff; font-size:11.5px; font-weight:800; padding:6px 10px; border-radius:4px; text-decoration:none; white-space:nowrap;">
      ${escapeHtml(meta.name)} 보기
    </a>
  `;
}

function renderSmartAds() {
  const cfg = window.LOVE_EXAM_AD_CONFIG || {};
  const alloc = cfg.slotAllocation || {};
  const bw = cfg.coupangBannerWidget || {};
  const adsense = cfg.googleAdSense || {};
  const adfit = cfg.kakaoAdFit || {};

  const isSpicy =
    (state.view === 'home' && state.onboarding.subjectChoice !== 'basic') ||
    (state.view !== 'home' && hasSpicyQuestions());

  const leftEl = document.getElementById('adLeftSidebar');
  const rightEl = document.getElementById('adRightSidebar');
  const mobileTopEl = document.getElementById('adMobileTopSlot');
  const mobileBottomEl = document.getElementById('adMobileBottomSlot');

  const coupangRecs = extractRecommendationsFromExamAnswers('coupang');
  const fbRecs = extractRecommendationsFromExamAnswers('fashion_beauty');
  const allRecs = extractRecommendationsFromExamAnswers();

  const creatorDisplay =
    state.view === 'home'
      ? state.onboarding.creatorName || '커플'
      : (state.examData && state.examData.creatorName) || '출제자';

  const activeLeftBannerId = isSpicy ? bw.spicyLeftBannerId || bw.leftBannerId : bw.leftBannerId;
  const activeRightBannerId = isSpicy ? bw.spicyRightBannerId || bw.rightBannerId : bw.rightBannerId;

  // 좌측 사이드바 렌더링
  if (leftEl) {
    const leftMode = alloc.leftSidebar || (adsense.enabled ? 'adsense' : adfit.enabled ? 'adfit' : 'coupang');
    const hintLeft =
      state.view === 'home'
        ? '🎯 커플 베스트 추천 기프트'
        : `🎯 ${creatorDisplay}님 답안 맞춤 추천`;
    const coupangFallbackHtml =
      bw.rawLeftIframeHtml && bw.rawLeftIframeHtml.trim()
        ? bw.rawLeftIframeHtml
        : activeLeftBannerId && activeLeftBannerId.trim()
        ? buildOfficialCoupangIframeHtml(activeLeftBannerId.trim(), bw.trackingCode, bw.subId)
        : buildCoupangImageBannerWidgetHtml(
            (coupangRecs.length ? coupangRecs : allRecs).slice(0, 2),
            isSpicy,
            hintLeft
          );

    if (leftMode === 'adsense') {
      renderGoogleAdSenseSlot(leftEl, adsense.clientId, adsense.leftSlotId, 160, 600, isSpicy, coupangFallbackHtml);
    } else if (leftMode === 'adfit') {
      renderKakaoAdFitSlot(leftEl, adfit.leftUnitId, 160, 600, coupangFallbackHtml);
    } else if (leftMode === 'fashion_beauty') {
      leftEl.innerHTML = buildFashionBeautyWidgetHtml(
        (fbRecs.length ? fbRecs : allRecs).slice(0, 2),
        isSpicy,
        hintLeft
      );
    } else {
      leftEl.innerHTML = coupangFallbackHtml;
    }
  }

  // 우측 사이드바 렌더링
  if (rightEl) {
    const rightMode = alloc.rightSidebar || (adsense.enabled ? 'adsense' : adfit.enabled ? 'adfit' : 'fashion_beauty');
    const fbItems = fbRecs.length >= 2 ? fbRecs.slice(0, 2) : allRecs.slice(0, 2).reverse();
    const cpRightItems = coupangRecs.slice(2, 4).length >= 2 ? coupangRecs.slice(2, 4) : coupangRecs.slice(0, 2).reverse();
    const hintRight =
      state.view === 'home'
        ? '👗 무신사·지그재그·올영 픽'
        : `💡 정답 힌트: "${(fbItems[0] && fbItems[0].answerLabel) || '인기 코디'}"`;

    const fbFallbackHtml = buildFashionBeautyWidgetHtml(fbItems, isSpicy, hintRight);
    const cpRightFallbackHtml =
      bw.rawRightIframeHtml && bw.rawRightIframeHtml.trim()
        ? bw.rawRightIframeHtml
        : activeRightBannerId && activeRightBannerId.trim()
        ? buildOfficialCoupangIframeHtml(activeRightBannerId.trim(), bw.trackingCode, bw.subId)
        : buildCoupangImageBannerWidgetHtml(cpRightItems, isSpicy, hintRight);

    if (rightMode === 'adsense') {
      renderGoogleAdSenseSlot(rightEl, adsense.clientId, adsense.rightSlotId, 160, 600, isSpicy, fbFallbackHtml);
    } else if (rightMode === 'adfit') {
      renderKakaoAdFitSlot(rightEl, adfit.rightUnitId, 160, 600, fbFallbackHtml);
    } else if (rightMode === 'coupang') {
      rightEl.innerHTML = cpRightFallbackHtml;
    } else {
      rightEl.innerHTML = fbFallbackHtml;
    }
  }

  // 모바일 상단 배너 렌더링
  if (mobileTopEl) {
    const topMode = alloc.mobileTop || 'coupang';
    const topRec = topMode === 'fashion_beauty' ? fbRecs[0] || allRecs[0] : coupangRecs[0] || allRecs[0];
    mobileTopEl.style.borderColor = isSpicy ? '#9e1b32' : '#d4d7dc';
    mobileTopEl.style.background = '#ffffff';
    mobileTopEl.style.color = '#111';
    const stripFallback = buildMobileStripBannerHtml(topRec, isSpicy);

    if (topMode === 'adsense') {
      renderGoogleAdSenseSlot(mobileTopEl, adsense.clientId, adsense.mobileTopSlotId, 320, 100, isSpicy, stripFallback);
    } else if (topMode === 'adfit') {
      renderKakaoAdFitSlot(mobileTopEl, adfit.mobileTopUnitId, 320, adfit.mobileBannerHeight || 100, stripFallback);
    } else {
      mobileTopEl.innerHTML = stripFallback;
    }
  }

  // 모바일 하단 배너 렌더링
  if (mobileBottomEl) {
    const bottomMode = alloc.mobileBottom || 'fashion_beauty';
    const bottomRec =
      bottomMode === 'fashion_beauty'
        ? fbRecs[0] || fbRecs[1] || allRecs[1] || allRecs[0]
        : coupangRecs[1] || coupangRecs[0] || allRecs[0];
    mobileBottomEl.style.borderColor = isSpicy ? '#9e1b32' : '#d4d7dc';
    mobileBottomEl.style.background = '#ffffff';
    mobileBottomEl.style.color = '#111';
    const stripFallback = buildMobileStripBannerHtml(bottomRec, isSpicy);

    if (bottomMode === 'adsense') {
      renderGoogleAdSenseSlot(mobileBottomEl, adsense.clientId, adsense.mobileBottomSlotId, 320, 100, isSpicy, stripFallback);
    } else if (bottomMode === 'adfit') {
      renderKakaoAdFitSlot(mobileBottomEl, adfit.mobileBottomUnitId, 320, adfit.mobileBannerHeight || 100, stripFallback);
    } else {
      mobileBottomEl.innerHTML = stripFallback;
    }
  }
}

function renderResultNativeAd(isSpicy, gradeRank) {
  const cfg = window.LOVE_EXAM_AD_CONFIG || {};
  const alloc = cfg.slotAllocation || {};
  const adsense = cfg.googleAdSense || {};
  const adfit = cfg.kakaoAdFit || {};

  // 쿠팡 + 1020 패션/뷰티 파트너스 추천이 골고루 노출되도록 조합
  const allRecs = extractRecommendationsFromExamAnswers();
  const cpRecs = extractRecommendationsFromExamAnswers('coupang');
  const fbRecs = extractRecommendationsFromExamAnswers('fashion_beauty');

  const mixedRecs = [];
  if (allRecs[0]) mixedRecs.push(allRecs[0]);
  const secondCandidate = fbRecs.find((r) => !mixedRecs.some((m) => m.productTitle === r.productTitle)) || allRecs[1];
  if (secondCandidate) mixedRecs.push(secondCandidate);
  const thirdCandidate =
    cpRecs.find((r) => !mixedRecs.some((m) => m.productTitle === r.productTitle)) ||
    fbRecs.find((r) => !mixedRecs.some((m) => m.productTitle === r.productTitle)) ||
    allRecs[2];
  if (thirdCandidate) mixedRecs.push(thirdCandidate);

  const creatorDisplay = (state.examData && state.examData.creatorName) || '출제자';

  const cardsHtml = mixedRecs
    .slice(0, 3)
    .map((r) => {
      const meta = getPlatformMeta(r.platform);
      return `
      <a href="${escapeHtml(r.url)}" target="_blank" rel="noopener sponsored"
         style="display:flex; justify-content:space-between; align-items:center; gap:12px; background:#fff; border:1px solid ${
           isSpicy ? '#d9a3ad' : '#d4d7dc'
         }; border-radius:4px; padding:10px 12px; margin-top:8px; text-decoration:none; color:#111;">
        <div style="display:flex; align-items:center; gap:12px; text-align:left;">
          <img src="${escapeHtml(r.imageUrl)}" alt="" style="width:58px; height:58px; object-fit:cover; border-radius:4px; border:1px solid #eee; flex-shrink:0;" />
          <div>
            <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
              <span style="background:${escapeHtml(meta.badgeBg)}; color:${escapeHtml(meta.badgeColor)}; font-size:10px; font-weight:900; padding:1px 6px; border-radius:2px;">
                ${escapeHtml(meta.brandBadge)}
              </span>
              <span style="font-size:11px; font-weight:800; color:${r.isWrongAnswer ? '#d9251d' : '#15803d'};">
                ${r.isWrongAnswer ? `❌ ${r.qNumber}번 오답 만회 선물` : `⭕ ${r.qNumber}번 정답 취향 저격`} (${escapeHtml(
        r.answerLabel
      )})
              </span>
            </div>
            <div style="font-size:13.5px; font-weight:800; color:#111; margin-top:2px;">
              ${escapeHtml(r.productTitle)}
            </div>
            <div style="font-size:12px; margin-top:2px;">
              <strong style="color:#cb1400;">${escapeHtml(r.priceText || '19,900원')}</strong>
              <span style="color:${escapeHtml(meta.badgeColor)}; font-weight:800; font-size:11px; margin-left:6px;">
                ${escapeHtml(r.deliveryBadge || meta.defaultDeliveryBadge)}
              </span>
              <span style="color:#f59e0b; font-size:11px; margin-left:6px;">${escapeHtml(r.ratingText || '★★★★★')}</span>
            </div>
          </div>
        </div>
        <span style="background:${escapeHtml(meta.accentColor)}; color:#fff; font-size:12px; font-weight:800; padding:8px 14px; border-radius:4px; white-space:nowrap;">
          ${escapeHtml(meta.ctaLabel)}
        </span>
      </a>
    `;
    })
    .join('');

  let extraCpcHtml = '';
  if (alloc.resultAppendCpcBanner) {
    if (adfit.enabled && (adfit.resultUnitId || '').trim()) {
      ensureKakaoAdFitScript();
      extraCpcHtml = `
        <div style="margin-top:10px; display:flex; justify-content:center;">
          <ins class="kakao_ad_area" style="display:none;"
            data-ad-unit="${escapeHtml(adfit.resultUnitId.trim())}"
            data-ad-width="320"
            data-ad-height="100"></ins>
        </div>
      `;
    } else if (!isSpicy && adsense.enabled && (adsense.clientId || '').trim() && (adsense.resultInfeedSlotId || '').trim()) {
      ensureGoogleAdSenseScript(adsense.clientId.trim());
      extraCpcHtml = `
        <div style="margin-top:10px; display:flex; justify-content:center;">
          <ins class="adsbygoogle"
            style="display:block; width:100%; min-height:90px;"
            data-ad-client="${escapeHtml(adsense.clientId.trim())}"
            data-ad-slot="${escapeHtml(adsense.resultInfeedSlotId.trim())}"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
      `;
    }
  }

  return `
    <div class="result-native-ad-box ${isSpicy ? 'spicy' : ''}" style="flex-direction:column; align-items:stretch;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
        <div style="font-size:14px; font-weight:900; color:${isSpicy ? '#7f1d1d' : '#1a1a1a'};">
          🎁 [${escapeHtml(creatorDisplay)}님의 실제 시험 정답 기반] 취향 저격 선물 & 데이트 추천
        </div>
        <span style="font-size:10.5px; color:#777;">쿠팡·무신사·지그재그·올리브영 등 파트너스 활동으로 수수료를 제공받을 수 있습니다</span>
      </div>
      ${cardsHtml}
      ${extraCpcHtml}
    </div>
  `;
}

// =========================================================
// [기능 3] 무로그인 출제자 결과 확인 & 실시간 수신 시스템
// =========================================================
const SUBMISSIONS_STORAGE_KEY = 'love_exam_submissions_v1';
let liveChannel = null;
try {
  if (typeof BroadcastChannel !== 'undefined') {
    liveChannel = new BroadcastChannel('love_exam_live_channel');
    liveChannel.onmessage = (event) => {
      if (event.data && event.data.type === 'NEW_SUBMISSION') {
        const sub = event.data.payload;
        showToast(
          `🔔 띵동! [${sub.examineeName || '수험생'}]님이 답안지를 제출했습니다! (${sub.totalScore}점 / ${sub.gradeRank}등급)`
        );
        renderApp();
      }
    };
  }
} catch (e) {
  // BroadcastChannel 미지원 환경 무시
}

window.addEventListener('storage', (e) => {
  if (e.key === SUBMISSIONS_STORAGE_KEY) {
    renderApp();
  }
});

function loadAllSubmissions() {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveAllSubmissions(list) {
  try {
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('제출 내역 저장 실패:', e);
  }
}

function getSubmissionsForExam(examId) {
  const all = loadAllSubmissions();
  if (!examId || examId === '미발급') return all.slice().reverse();
  const filtered = all.filter((s) => s.examId === examId);
  return (filtered.length ? filtered : all).slice().reverse();
}

function recordSubmissionAndNotifyCreator() {
  if (!state.gradeResult) return;
  const now = new Date();
  const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;

  const submissionPayload = {
    submissionId: 'SUB-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    examId: state.examData.examId || 'LOVE-DEFAULT',
    examineeName: (state.examineeName || '').trim() || (state.examData.targetRecipient || '수험생'),
    examineeNumber: state.examineeNumber || '',
    submittedAt: timeStr,
    totalScore: state.gradeResult.totalScore,
    gradeRank: state.gradeResult.gradeRank,
    userAnswers: JSON.parse(JSON.stringify(state.userAnswers)),
    examData: JSON.parse(JSON.stringify(state.examData))
  };

  // 1) 로컬/브라우저 수신함에 저장
  const all = loadAllSubmissions();
  all.push(submissionPayload);
  if (all.length > 30) all.shift();
  saveAllSubmissions(all);

  // 2) 출제자 화면이 열려 있다면 실시간 알림 전송
  if (liveChannel) {
    liveChannel.postMessage({ type: 'NEW_SUBMISSION', payload: submissionPayload });
  }

  // 3) 다른 기기(카톡)에 있는 출제자에게도 로그인 없이 1초 만에 보낼 수 있는 채점 결과 링크 생성
  const resultCompact = {
    n: submissionPayload.examineeName,
    no: submissionPayload.examineeNumber,
    t: submissionPayload.submittedAt,
    a: submissionPayload.userAnswers
  };
  const encodedExam = encodeExamToParam(state.examData);
  const encodedResult = encodeExamToParam(resultCompact);
  const baseUrl = window.location.origin + window.location.pathname;
  state.resultShareUrl = `${baseUrl}?exam=${encodedExam}&result=${encodedResult}`;
}

function copyGradedResultLinkForCreator() {
  if (!state.resultShareUrl) {
    recordSubmissionAndNotifyCreator();
  }
  const examineeDisplay = (state.examineeName || '').trim() || (state.examData.targetRecipient || '수험생');
  const score = state.gradeResult ? state.gradeResult.totalScore : 0;
  const rank = state.gradeResult ? state.gradeResult.gradeRank : 9;
  const shareText = `[연애능력평가 채점 답안지 도착]\n${examineeDisplay}님의 성적: ${score}점 (제 ${rank}등급)\n아래 링크를 열면 내가 몇 번을 골라 틀렸는지 빨간펜 채점 시험지를 바로 확인할 수 있어!\n👉 ${state.resultShareUrl}`;

  navigator.clipboard
    .writeText(shareText)
    .then(() =>
      showToast('💌 채점된 성적표 답안지 링크가 복사되었습니다! 출제자에게 카톡으로 붙여넣어 보내세요.')
    )
    .catch(() => {
      window.prompt('아래 채점 결과 링크를 복사해 출제자에게 보내주세요:', state.resultShareUrl);
    });
}

function openSubmittedPaper(submissionId) {
  const all = loadAllSubmissions();
  const found = all.find((s) => s.submissionId === submissionId);
  if (!found) {
    showToast('해당 답안지를 찾을 수 없습니다.');
    return;
  }
  state.examData = JSON.parse(JSON.stringify(found.examData));
  state.examineeName = found.examineeName;
  state.examineeNumber = found.examineeNumber;
  state.userAnswers = JSON.parse(JSON.stringify(found.userAnswers));
  state.isTeacherInspectMode = true;
  state.spicyGateConfirmed = true;
  submitAndGradeExam();
}

// HTML 이스케이프
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 메인 렌더 함수
function renderApp() {
  const root = document.getElementById('examAppRoot');
  const paperEl = document.querySelector('.exam-paper');
  if (!root) return;

  if (paperEl) {
    const isSpicyNow =
      (state.view === 'home' && state.onboarding.subjectChoice !== 'basic') ||
      (state.view !== 'home' && hasSpicyQuestions());
    if (isSpicyNow) {
      paperEl.classList.add('spicy-theme');
    } else {
      paperEl.classList.remove('spicy-theme');
    }
  }

  // 현재 과목에 맞춰 양쪽 배너 자동 렌더링
  renderSmartAds();

  if (state.view === 'home') {
    root.innerHTML = renderHomeView();
  } else if (state.view === 'create') {
    root.innerHTML = renderCreateView();
  } else {
    root.innerHTML = renderTakeOrResultView();
  }
}

// 초기 실행 (URL 파라미터에 ?exam=... 또는 &result=... 가 있으면 즉시 응시/검수 모드로 진입)
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const examParam = params.get('exam');
  const resultParam = params.get('result');

  if (examParam) {
    const decodedExam = decodeExamFromParam(examParam);
    if (decodedExam && Array.isArray(decodedExam.questions)) {
      state.examData = decodedExam;

      // 수험생이 보낸 채점 결과 링크(&result=...)인 경우 출제자가 즉시 채점된 답안지를 열람!
      if (resultParam) {
        const decodedResult = decodeExamFromParam(resultParam);
        if (decodedResult && decodedResult.a) {
          state.examineeName = decodedResult.n || decodedExam.targetRecipient || '수험생';
          state.examineeNumber = decodedResult.no || '';
          state.userAnswers = decodedResult.a;
          state.isTeacherInspectMode = true;
          state.spicyGateConfirmed = true;
          submitAndGradeExam();
          showToast(`📬 ${state.examineeName}님이 제출한 채점 답안지를 열람합니다!`);
          return;
        }
      }

      state.spicyGateConfirmed = false;
      state.isTeacherInspectMode = false;
      state.view = 'take';
      showToast(`${decodedExam.creatorName} 탐구영역 시험지가 도착했습니다!`);
    }
  }
  renderApp();
});
