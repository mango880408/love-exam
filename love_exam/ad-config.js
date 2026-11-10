/**
 * ============================================================================
 * 💰 [통합 광고 & 1020 파트너스 수익화 설정] love_exam/ad-config.js
 * ============================================================================
 * 지원 광고/제휴 네트워크:
 *   1. 구글 애드센스 (Google AdSense - CPC 클릭형 배너)
 *   2. 카카오 애드핏 (Kakao AdFit - 한국 웹사이트 빠른 승인 & 19+ 페이지 호환 CPC)
 *   3. 쿠팡 파트너스 (Coupang Partners - 공식 배너 위젯 / Open API / 로켓선물)
 *   4. 1020 패션·여성복·뷰티 파트너스:
 *      - 무신사 큐레이터 (MUSINSA - 남녀 커플룩/스트릿/스니커즈/향수)
 *      - 지그재그 & 에이블리 (ZIGZAG / ABLY - 1020 여성 데이트룩/원피스/코디 1위)
 *      - 올리브영 어필리에이트 (OLIVE YOUNG - 뷰티/향수/입욕제/19+ 시크릿 케어)
 *      - 29CM & W컨셉 (감성 커플 기프트/디자이너 브랜드/파자마)
 * ============================================================================
 */

window.LOVE_EXAM_AD_CONFIG = {

  // --------------------------------------------------------------------------
  // 0. 위치별 광고 플랫폼 배정 (원하는 조합으로 자유롭게 변경 가능)
  //    사용 가능 값:
  //      'coupang'        : 쿠팡 파트너스 (공식 위젯 또는 정답 맞춤 로켓배송 상품)
  //      'fashion_beauty' : 무신사·지그재그·에이블리·올리브영·29CM 1020 맞춤 큐레이션
  //      'adsense'        : 구글 애드센스 (아래 googleAdSense 키 입력 시 실제 광고, 미입력 시 프리뷰)
  //      'adfit'          : 카카오 애드핏 (아래 kakaoAdFit DAN 코드 입력 시 실제 광고, 미입력 시 프리뷰)
  // --------------------------------------------------------------------------
  slotAllocation: {
    leftSidebar: 'coupang',          // 좌측 PC 배너 (기본: 쿠팡 파트너스)
    rightSidebar: 'fashion_beauty',  // 우측 PC 배너 (기본: 무신사·지그재그·올리브영 1020 파트너스)
    mobileTop: 'coupang',            // 모바일 상단 띠배너
    mobileBottom: 'fashion_beauty',  // 모바일 하단 띠배너
    resultAppendCpcBanner: true      // 채점 결과창 하단에 파트너스 상품 + 구글/카카오 배너 함께 표시 여부
  },

  // --------------------------------------------------------------------------
  // 1. 구글 애드센스 (Google AdSense) 설정
  //    발급처: https://www.google.com/adsense
  // --------------------------------------------------------------------------
  googleAdSense: {
    enabled: false,                  // 승인 후 true 로 변경하거나 slotAllocation에서 'adsense' 지정
    clientId: '',                    // 예: 'ca-pub-1234567890123456'
    leftSlotId: '',                  // 좌측 160x600 슬롯 ID (숫자 10자리)
    rightSlotId: '',                 // 우측 160x600 슬롯 ID
    mobileTopSlotId: '',             // 모바일 상단 320x100 슬롯 ID
    mobileBottomSlotId: '',          // 모바일 하단 320x100 슬롯 ID
    resultInfeedSlotId: ''           // 채점 결과창 하단 반응형 슬롯 ID
  },

  // --------------------------------------------------------------------------
  // 2. 카카오 애드핏 (Kakao AdFit) 설정
  //    발급처: https://adfit.kakao.com (심사가 빠르고 10~20대 한국 모바일 트래픽에 유리)
  // --------------------------------------------------------------------------
  kakaoAdFit: {
    enabled: false,                  // 단위 ID 발급 후 true 로 변경하거나 slotAllocation에서 'adfit' 지정
    leftUnitId: '',                  // 좌측 160x600 광고단위 ID (예: 'DAN-xxxxxxxxxxxx')
    rightUnitId: '',                 // 우측 160x600 광고단위 ID
    mobileTopUnitId: '',             // 모바일 상단 320x100 (또는 320x50) 광고단위 ID
    mobileBottomUnitId: '',          // 모바일 하단 320x100 (또는 320x50) 광고단위 ID
    resultUnitId: '',                // 채점 결과창 하단 300x250 (또는 320x100) 광고단위 ID
    mobileBannerHeight: 100          // 100 (320x100) 또는 50 (320x50)
  },

  // --------------------------------------------------------------------------
  // 3. 쿠팡 파트너스 공식 '배너 위젯' & Open API 설정
  //    발급처: https://partners.coupang.com
  // --------------------------------------------------------------------------
  coupangBannerWidget: {
    trackingCode: 'AF3621090', // 내 쿠팡 파트너스 ID (적용 완료)
    subId: 'love_exam',
    leftBannerId: '',       // 좌측 160x600 공식 배너 ID (6자리 숫자)
    rightBannerId: '',      // 우측 160x600 공식 배너 ID
    spicyLeftBannerId: '',  // [19+ 성적취향용] 좌측 배너 ID
    spicyRightBannerId: '', // [19+ 성적취향용] 우측 배너 ID
    rawLeftIframeHtml: '',
    rawRightIframeHtml: ''
  },

  coupangOpenApi: {
    enabled: false, // coupang_api_server.py 에 키 설정 후 true 로 변경
    proxyEndpoint: '/api/coupang/search'
  },

  // --------------------------------------------------------------------------
  // 4. 1020 특화 파트너스 설정 (무신사 큐레이터 / 지그재그 / 에이블리 / 올리브영 / 29CM)
  //    ※ 각 플랫폼에서 발급받은 큐레이터/어필리에이트 코드나 단축 링크를 넣으면 자동 연결됩니다.
  // --------------------------------------------------------------------------
  fashionBeautyPartners: {
    musinsa: {
      enabled: true,
      curatorId: '', // 무신사 큐레이터 ID 또는 utm_source 코드
      defaultSearchBase: 'https://www.musinsa.com/search/goods?keyword='
    },
    zigzag: {
      enabled: true,
      affiliateCode: '', // 지그재그(또는 링크프라이스/애드픽) 제휴 파라미터
      defaultSearchBase: 'https://zigzag.kr/search?keyword='
    },
    ably: {
      enabled: true,
      affiliateCode: '', // 에이블리 파트너스 제휴 파라미터
      defaultSearchBase: 'https://m.a-bly.com/search?keyword='
    },
    oliveyoung: {
      enabled: true,
      affiliateCode: '', // 올리브영 어필리에이트(큐레이터) 파라미터
      defaultSearchBase: 'https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query='
    },
    cm29: {
      enabled: true,
      affiliateCode: '', // 29CM / W컨셉 제휴 파라미터
      defaultSearchBase: 'https://shop.29cm.co.kr/search?keyword='
    }
  },

  // 공정위 필수 대가성 문구 표시
  enableDisclosureText: true,

  // --------------------------------------------------------------------------
  // 5. [출제자 정답 기반 멀티 파트너스 상품 카탈로그]
  //    쿠팡(coupang) + 무신사(musinsa) + 지그재그(zigzag) + 에이블리(ably)
  //    + 올리브영(oliveyoung) + 29CM(29cm) 상품을 정답 키워드로 자동 매칭합니다.
  // --------------------------------------------------------------------------
  answerKeywordCatalog: [
    // ==================== [쿠팡 파트너스 매칭 카탈로그] ====================
    {
      platform: 'coupang',
      matchKeywords: ['아메리카노', '아아', '커피', '카페', '라떼', '바닐라', '음료', '스무디', '자몽'],
      category: 'basic',
      badge: '출제자 최애 음료',
      productTitle: '스타벅스 홈카페 캡슐/드립커피 & 디저트 선물세트',
      priceText: '24,900원',
      ratingText: '★★★★★ (4,820)',
      isRocket: true,
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
      searchQuery: '스타벅스 커피 선물세트',
      directLinkUrl: ''
    },
    {
      platform: 'coupang',
      matchKeywords: ['떡볶이', '엽떡', '마라탕', '치킨', '야식', '매운', '불닭', '소울푸드'],
      category: 'basic',
      badge: '출제자 소울푸드',
      productTitle: '추억의 국물 떡볶이 & 마라탕 밀키트 베스트 세트',
      priceText: '13,800원',
      ratingText: '★★★★★ (9,412)',
      isRocket: true,
      imageUrl: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?auto=format&fit=crop&w=400&q=80',
      searchQuery: '국물 떡볶이 밀키트',
      directLinkUrl: ''
    },
    {
      platform: 'coupang',
      matchKeywords: ['파스타', '스테이크', '오마카세', '맛집', '고기', '삼겹살', '소주', '와인'],
      category: 'basic',
      badge: '출제자 데이트 취향',
      productTitle: '부채살 스테이크 & 쉬림프 로제 파스타 홈파티 세트',
      priceText: '29,800원',
      ratingText: '★★★★★ (3,150)',
      isRocket: true,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      searchQuery: '홈파티 스테이크 파스타 밀키트',
      directLinkUrl: ''
    },
    {
      platform: 'coupang',
      matchKeywords: ['애교', '맛있는', '달달', '초콜릿', '케이크', '마카롱', '편지', '안아주기', '공감'],
      category: 'basic',
      badge: '기분 풀어주는 특효약',
      productTitle: '벨기에 수제 생초콜릿 & 마카롱 기프트 세트',
      priceText: '19,900원',
      ratingText: '★★★★★ (5,120)',
      isRocket: true,
      imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80',
      searchQuery: '수제 생초콜릿 선물세트',
      directLinkUrl: ''
    },
    {
      platform: 'coupang',
      matchKeywords: ['잠옷', '파자마', '슬립', '로망', '컨셉', '분위기', '조명'],
      category: 'spicy',
      badge: '출제자 밤 로망',
      productTitle: '프리미엄 실크 새틴 커플 파자마 & 로맨틱 슬립 세트',
      priceText: '32,900원',
      ratingText: '★★★★★ (1,980)',
      isRocket: true,
      imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80',
      searchQuery: '커플 실크 파자마 잠옷 세트',
      directLinkUrl: ''
    },
    {
      platform: 'coupang',
      matchKeywords: ['호캉스', '스파', '샤워', '여행', '숙소', '체크인', '모닝', '껴안고', '애프터케어'],
      category: 'spicy',
      badge: '출제자 호캉스 취향',
      productTitle: '호텔 스파 자쿠지 거품 입욕제 배스밤 6종 기프트 세트',
      priceText: '26,400원',
      ratingText: '★★★★★ (4,110)',
      isRocket: true,
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
      searchQuery: '커플 거품 입욕제 배스밤 세트',
      directLinkUrl: ''
    },

    // ==================== [무신사 / 지그재그 / 에이블리 / 올리브영 / 29CM 1020 카탈로그] ====================
    {
      platform: 'musinsa',
      matchKeywords: ['옷', '신발', '운동화', '후드', '맨투맨', '커플룩', '코디', '패션', '가방', '모자', '시밀러룩', '선물'],
      category: 'basic',
      badge: '무신사 커플 시밀러룩 1위',
      productTitle: '[무신사 스탠다드/큐레이터] 1020 인기 커플 시밀러룩 니트 & 스니커즈',
      priceText: '39,900원',
      ratingText: '★ 4.9 (12,480)',
      deliveryBadge: 'MUSINSA 무료배송',
      imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80',
      searchQuery: '커플 시밀러룩 니트 맨투맨',
      directLinkUrl: ''
    },
    {
      platform: 'zigzag',
      matchKeywords: ['데이트', '첫만남', '원피스', '가디건', '블라우스', '치마', '코트', '예쁜', '스타일', '여친', '썸녀'],
      category: 'basic',
      badge: '지그재그 데이트룩 베스트',
      productTitle: '[지그재그 직진배송] 설렘주의 여친룩 크롭 가디건 & 플리츠 원피스 코디',
      priceText: '27,800원',
      ratingText: '★ 4.9 (8,920)',
      deliveryBadge: '⚡ 직진배송',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
      searchQuery: '데이트룩 원피스 가디건',
      directLinkUrl: ''
    },
    {
      platform: 'oliveyoung',
      matchKeywords: ['향수', '화장품', '립', '틴트', '핸드크림', '뷰티', '냄새', '살냄새', '선물', '꽃'],
      category: 'basic',
      badge: '올리브영 선물 랭킹 1위',
      productTitle: '[올리브영 단독기획] 살냄새 코튼 머스크 오드퍼퓸 향수 & 립 글로우 세트',
      priceText: '34,000원',
      ratingText: '★ 4.9 (6,740)',
      deliveryBadge: '🛵 오늘드림',
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80',
      searchQuery: '향수 선물세트',
      directLinkUrl: ''
    },
    {
      platform: 'ably',
      matchKeywords: ['가방', '반지', '목걸이', '커플링', '케이스', '키링', '귀여운', '애교', '악세사리'],
      category: 'basic',
      badge: '에이블리 1020 인기템',
      productTitle: '[에이블리 샥출발] 하이틴 감성 실버 하트 각인 커플링 & 미니 호보백',
      priceText: '21,900원',
      ratingText: '★ 4.8 (11,300)',
      deliveryBadge: '⚡ 샥출발 무료배송',
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
      searchQuery: '실버 커플링 하트 목걸이',
      directLinkUrl: ''
    },
    {
      platform: 'oliveyoung',
      matchKeywords: ['리드', '박력', '스킨십', '목선', '귀', '허리', '골반', '쇄골', '터치', '키스', '민감', '향기'],
      category: 'spicy',
      badge: '올리브영 시크릿 케어 1위',
      productTitle: '[올리브영 시크릿] 일랑일랑 센슈얼 바디 마사지 오일 & 퍼퓸 바디미스트',
      priceText: '23,800원',
      ratingText: '★ 4.9 (5,410)',
      deliveryBadge: '🛵 오늘드림 안심포장',
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
      searchQuery: '바디오일 마사지',
      directLinkUrl: ''
    },
    {
      platform: '29cm',
      matchKeywords: ['잠옷', '파자마', '슬립', '로망', '컨셉', '분위기', '조명', '호캉스', '와인', '기념일'],
      category: 'spicy',
      badge: '29CM 감성 커플 기프트',
      productTitle: '[29CM 선물하기] 프렌치 새틴 로브 파자마 세트 & 우드 아로마 인센스',
      priceText: '46,000원',
      ratingText: '★ 4.9 (2,190)',
      deliveryBadge: '29CM 선물포장',
      imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80',
      searchQuery: '커플 새틴 파자마 잠옷',
      directLinkUrl: ''
    }
  ]
};
