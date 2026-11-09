/**
 * ============================================================================
 * 💰 [쿠팡 파트너스 공식 배너 위젯 & Open API 설정] love_exam/ad-config.js
 * ============================================================================
 * [방법 A - 가장 간편] 쿠팡 파트너스 > '링크 생성' > '다이나믹 배너' 또는 '카테고리 배너'에서
 *   발급받은 배너 ID(숫자 6자리)와 내 트래킹 코드(AFXXXXXXX)만 아래에 넣으면
 *   양쪽 사이드바에 쿠팡 공식 이미지 캐러셀 배너(widgets.html)가 바로 뜹니다!
 *
 * [방법 B - 출제자 정답 기반 자동 상품 추천]
 *   쿠팡 Open API (Access Key / Secret Key)를 넣거나 아래 카탈로그를 통해
 *   출제자가 적은 정답 단어에 맞는 실제 상품 이미지 + 가격 + 로켓배송 배너를 띄웁니다.
 * ============================================================================
 */

window.LOVE_EXAM_AD_CONFIG = {

  // --------------------------------------------------------------------------
  // 1. 쿠팡 파트너스 공식 '배너 위젯' 설정 (partners.coupang.com > 다이나믹/카테고리 배너)
  // --------------------------------------------------------------------------
  coupangBannerWidget: {
    // 쿠팡 파트너스 우측 상단 내 아이디 (예: 'AF1234567')
    trackingCode: '',
    subId: 'love_exam',

    // 쿠팡 파트너스에서 배너 생성 시 나오는 6자리 숫자 ID (예: '789012')
    // ※ 아래 ID를 입력하면 양쪽 사이드바가 즉시 쿠팡 공식 iframe 배너로 전환됩니다!
    leftBannerId: '',       // 좌측 160x600 배너 ID
    rightBannerId: '',      // 우측 160x600 배너 ID
    spicyLeftBannerId: '',  // [19+ 성적취향용] 좌측 160x600 배너 ID (비워두면 출제자 정답 이미지 배너 표시)
    spicyRightBannerId: '', // [19+ 성적취향용] 우측 160x600 배너 ID

    // 또는 쿠팡 파트너스에서 복사한 <iframe src="..."> 태그 전체를 그대로 붙여넣어도 됩니다!
    rawLeftIframeHtml: '',
    rawRightIframeHtml: ''
  },

  // --------------------------------------------------------------------------
  // 2. 쿠팡 파트너스 Open API 설정 (https://partners.coupang.com/#help/open-api)
  //    coupang_api_server.py 실행 시 출제자 정답 키워드로 실시간 쿠팡 상품 이미지/가격/링크를 가져옵니다.
  // --------------------------------------------------------------------------
  coupangOpenApi: {
    enabled: false, // coupang_api_server.py 에 키 설정 후 true 로 변경
    proxyEndpoint: '/api/coupang/search'
  },

  // 공정위 필수 대가성 문구 표시
  enableDisclosureText: true,

  // --------------------------------------------------------------------------
  // 3. [출제자 정답 기반 리치 이미지 상품 카탈로그]
  //    출제자가 낸 정답에 맞춰 실제 상품 썸네일 사진, 가격, 로켓배송 배지, 별점을 표시합니다.
  // --------------------------------------------------------------------------
  answerKeywordCatalog: [
    {
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
      matchKeywords: ['선물', '커플링', '반지', '목걸이', '지갑', '가방', '신발', '옷', '향수', '손편지', '꽃'],
      category: 'basic',
      badge: '출제자 위시리스트',
      productTitle: '연인 기념일 시그니처 오드퍼퓸 향수 & 기프트 박스',
      priceText: '48,500원',
      ratingText: '★★★★★ (2,640)',
      isRocket: true,
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80',
      searchQuery: '연인 기념일 향수 선물세트',
      directLinkUrl: ''
    },
    {
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
      matchKeywords: ['리드', '박력', '스킨십', '목선', '귀', '허리', '골반', '쇄골', '터치', '키스', '민감', '예뻐', '멋있어'],
      category: 'spicy',
      badge: '출제자 스킨십 취향',
      productTitle: '센슈얼 일랑일랑 커플 아로마 바디 마사지 오일 & 시크릿 키트',
      priceText: '21,500원',
      ratingText: '★★★★★ (3,490)',
      isRocket: true,
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
      searchQuery: '커플 아로마 바디 마사지 오일',
      directLinkUrl: ''
    },
    {
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
    }
  ],

  // --------------------------------------------------------------------------
  // 4. 구글 애드센스 설정 (선택)
  // --------------------------------------------------------------------------
  googleAdSense: {
    enabled: false,
    clientId: '',
    leftSlotId: '',
    rightSlotId: '',
    mobileTopSlotId: ''
  }
};
