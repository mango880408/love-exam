#!/usr/bin/env python3
"""
===============================================================================
🚀 쿠팡 파트너스 Open API 공식 연동 서버 (love_exam/coupang_api_server.py)
===============================================================================
참고 문서: https://partners.coupang.com/#help/open-api

[활용 가능한 쿠팡 파트너스 Open API 4가지]
1. 상품 검색 API (GET /v2/providers/affiliate_open_api/apis/openapi/products/search)
   -> 출제자가 적은 정답 단어(예: '떡볶이', '향수', '커플잠옷')로 실시간 쿠팡 상품을 검색하여
      실제 상품 사진(productImage), 가격(productPrice), 로켓배송(isRocket),
      내 수익 단축링크(productUrl)를 JSON으로 즉시 받아옵니다.
2. 카테고리별 베스트 상품 API (GET .../products/bestcategories/{categoryId})
   -> 식품(1001), 뷰티(1010), 홈인테리어(1015) 등 실시간 베스트셀러 상품 목록 조회
3. 딥링크 변환 API (POST .../deeplink)
   -> 일반 쿠팡 URL을 내 수익 추적 코드가 담긴 https://link.coupang.com/... 으로 변환
4. 골드박스(오늘의 특가) API (GET .../products/goldbox)

[실행 방법]
1. 아래 COUPANG_ACCESS_KEY 와 COUPANG_SECRET_KEY 에 발급받은 키를 입력합니다.
2. 터미널에서 `python3 love_exam/coupang_api_server.py` 실행 후
   http://localhost:8080 으로 접속하면 Open API가 실시간 작동합니다!
===============================================================================
"""

import datetime
import hashlib
import hmac
import json
import os
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, HTTPServer

# 쿠팡 파트너스 > 추가기능 > 파트너스 API 에서 발급받은 키 입력 (또는 환경변수 설정)
COUPANG_ACCESS_KEY = os.environ.get("COUPANG_ACCESS_KEY", "")
COUPANG_SECRET_KEY = os.environ.get("COUPANG_SECRET_KEY", "")
COUPANG_SUB_ID = os.environ.get("COUPANG_SUB_ID", "love_exam")

DOMAIN = "https://api-gateway.coupang.com"


def generate_hmac(method: str, url_path: str, secret_key: str, access_key: str) -> str:
    """쿠팡 파트너스 Open API 규격의 HMAC-SHA256 Authorization 헤더 생성"""
    path, *query = url_path.split("?")
    dt_gmt = datetime.datetime.now(datetime.timezone.utc).strftime("%y%m%dT%H%M%SZ")
    message = dt_gmt + method + path + (query[0] if query else "")
    signature = hmac.new(
        secret_key.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return f"CEA algorithm=HmacSHA256, access-key={access_key}, signed-date={dt_gmt}, signature={signature}"


def search_coupang_products(keyword: str, limit: int = 4):
    """출제자 답안 키워드로 쿠팡 파트너스 상품 검색 Open API 호출"""
    if not COUPANG_ACCESS_KEY or not COUPANG_SECRET_KEY:
        return {"ok": False, "reason": "API_KEY_NOT_SET", "products": []}

    qs = urllib.parse.urlencode({"keyword": keyword, "limit": limit, "subId": COUPANG_SUB_ID})
    url_path = f"/v2/providers/affiliate_open_api/apis/openapi/products/search?{qs}"
    auth_header = generate_hmac("GET", url_path, COUPANG_SECRET_KEY, COUPANG_ACCESS_KEY)

    req = urllib.request.Request(DOMAIN + url_path)
    req.add_header("Authorization", auth_header)
    req.add_header("Content-Type", "application/json;charset=UTF-8")

    with urllib.request.urlopen(req, timeout=6) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        product_list = data.get("data", {}).get("productData", [])
        return {"ok": True, "products": product_list}


class LoveExamRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/coupang/search":
            params = urllib.parse.parse_qs(parsed.query)
            keyword = (params.get("q") or ["커플 선물"])[0]
            try:
                result = search_coupang_products(keyword)
            except Exception as e:
                result = {"ok": False, "error": str(e), "products": []}

            body = json.dumps(result, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(body)
            return

        return super().do_GET()


if __name__ == "__main__":
    preferred_ports = [int(os.environ.get("PORT", "8090")), 8090, 8088, 8080]
    httpd = None
    bound_port = None
    for p in preferred_ports:
        try:
            httpd = HTTPServer(("0.0.0.0", p), LoveExamRequestHandler)
            bound_port = p
            break
        except OSError:
            continue
    if httpd is None:
        httpd = HTTPServer(("0.0.0.0", 0), LoveExamRequestHandler)
        bound_port = httpd.server_port
    print(f"Love Exam + Coupang Open API Server running at http://localhost:{bound_port}", flush=True)
    httpd.serve_forever()
