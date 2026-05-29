import type { Locale } from "@/lib/i18n";

export type ResumeEntry = {
  project: string;
  period: string;
  outcome: string;
  role: string[];
  tools: string;
};

export type ResumeDocumentCopy = {
  title: string;
  subtitle: string;
  totalExperience: string;
  focusLabel: string;
  focusValue: string;
  scopeLabel: string;
  scopeValue: string;
  sourceNote: string;
  projectLabel: string;
  periodLabel: string;
  outcomeLabel: string;
  roleLabel: string;
  toolsLabel: string;
  entries: ResumeEntry[];
};

export const resumeDocuments: Record<Locale, ResumeDocumentCopy> = {
  en: {
    title: "Career Description",
    subtitle:
      "Project-based career record focused on operational ownership, PL/PM execution, process standardization, automation, and measurable outcomes.",
    totalExperience: "7 years 3 months+",
    focusLabel: "Target roles",
    focusValue: "Growth PM / Operations PM / Data PM",
    scopeLabel: "Operating range",
    scopeValue:
      "Travel-tech SaaS operations, growth analysis, automation, data build, robotics service, public-sector project, hospitality operations, military leadership",
    sourceNote: "Rebuilt from the reference career description PDF and current Eoding work archive.",
    projectLabel: "Project / Work",
    periodLabel: "Period",
    outcomeLabel: "Outcome",
    roleLabel: "Role",
    toolsLabel: "Tools",
    entries: [
      {
        project: "Eoding / B2B SaaS channeling service / Operations, Growth PM",
        period: "Apr 2026 - Present",
        outcome:
          "Analyzed a channeling growth funnel by separating views, paid orders, payment amount, and CVR; identified KRW 6.68M in payment volume from channeling-driven purchases, reduced recurring reporting work by 21h/month, and increased manual QA throughput by 4.21x.",
        role: [
          "Separated traffic lift from conversion quality in a growth program and reframed the customer-facing story around channeling-driven payment volume, product views, and CVR.",
          "Redesigned a 17-step recurring performance report workflow into a human-reviewable automation pipeline, reducing monthly operating effort from 24h to 3h.",
          "Structured QA error history into reusable cases, response templates, and a single HTML recommendation tool so non-developer operators could respond consistently.",
          "Built a Notion-centered task operating model and Slack-to-Notion input flow, connecting requests, owners, files, sheets, and dashboard visibility.",
          "Converted sensitive operating data into public-safe KPI cards, anonymized visuals, and practical narratives for sales, operations, and customer-facing communication.",
        ],
        tools: "CSV/JSON analysis, Notion, Slack, Google Apps Script, single-file HTML, AI agent usage",
      },
      {
        project: "Ministry of National Defense AI training data build / Data build PL, business operations support",
        period: "Oct 2024 - Sep 2025 (12 months)",
        outcome:
          "Improved data collection volume by 15% and maintained 100% milestone compliance through process redesign and standardization.",
        role: [
          "Prepared audit response materials, WBS documents, and project operating deliverables.",
          "Established Google Drive-based document sharing and weekly/monthly operating status reporting.",
          "Created object-distance flight guidelines and pilot checklists to control random shooting patterns.",
          "Unified file naming and metadata fields by shooting sequence to prevent downstream labeling bottlenecks.",
          "Standardized collection-stage rules so the full pipeline could meet delivery dates more reliably.",
        ],
        tools: "Jira, Confluence, WBS schedule and production management, data metric reporting, generative AI model usage",
      },
      {
        project: "Data voucher project / Travel app data build",
        period: "Jun 2024 - Sep 2024 (3 months)",
        outcome:
          "Reduced labor cost by 14.8% (approximately KRW 3.27M) against the data build budget by replacing repetitive manual work with technical workflows.",
        role: [
          "Separated 9 objective fields from 47 total fields and built a two-track workflow with Selenium crawling and selective API calls.",
          "Preprocessed collection results and preloaded 19.1% of 350K records to reduce manual input volume.",
          "Distributed clear guidelines and examples for 38 qualitative indicators so 40 workers applied consistent judgment.",
          "Used weekly productivity and error-rate dashboards to surface low-progress workers and defend schedule risk.",
          "Handled worker recruitment, selection, guideline training, and operating management.",
        ],
        tools: "Python-based crawling, data cleaning and formatting, Google Sheets, generative AI model usage",
      },
      {
        project: "Woowahan Brothers (Baemin) / Incheon Airport robot delivery service",
        period: "Nov 2022 - Dec 2023 (13 months)",
        outcome: "Increased average daily orders by 7% through targeted marketing and always-on simulation driving.",
        role: [
          "Used demographic analysis to define family passengers as the core target and executed seasonal visual branding.",
          "Operated idle robots around gates through dashboard controls without adding headcount.",
          "Analyzed dispatch logs, identified overloaded nodes, and planned a randomized dispatch logic improvement.",
          "Coordinated closely with development and facilities stakeholders on implementation schedules.",
          "Analyzed service VOC and wrote operating guidelines for repeated field issues.",
        ],
        tools: "Jira, Confluence, operating data collection and analysis, manual and operating standard documentation, NPS-based CX improvement",
      },
      {
        project: "Shakespeare Hophouse / Bar business operations in Dublin, Ireland",
        period: "Aug 2018 - Oct 2020 (27 months)",
        outcome: "Increased monthly sales by 8% after restructuring service zones around customer and staff movement.",
        role: [
          "Diagnosed peak-time congestion and order bottlenecks, then benchmarked bar layout and flow across 10 nearby high-performing venues.",
          "Reorganized beer taps by type and consolidated cocktail tool zones so staff could complete more work from one position.",
          "Reduced average service time from 3-4 minutes to under 2 minutes 30 seconds through remodeling and flow changes.",
          "As operations manager, communicated closely with multinational customers and partners to resolve field requirements.",
        ],
        tools: "Google Drive, Google Sheets, Google Maps, field operations, service flow improvement",
      },
      {
        project: "Military officer service / Platoon post commander, logistics officer",
        period: "Mar 2015 - Jun 2017 (28 months)",
        outcome:
          "Completed training with zero complaints through detailed pre-research and multi-step communication with local residents.",
        role: [
          "Analyzed complaint causes from previous training and shared schedules and details with nearby public offices in advance.",
          "Visited villages three times starting three weeks before training to explain expected noise and light exposure.",
          "Combined village broadcasts with direct communication to reach residents who were absent during daytime visits.",
          "Prepared for command inspection by conducting a full item review and resolving mismatches between inventory and records.",
        ],
        tools: "Civil communication, air-defense operations, schedule management, inventory management, report writing",
      },
    ],
  },
  ko: {
    title: "경력기술서",
    subtitle:
      "운영 오너십, PL/PM 실행, 프로세스 표준화, 자동화 이해, 정량 성과를 프로젝트 단위로 정리한 경력기술서입니다.",
    totalExperience: "총 7년 3개월+",
    focusLabel: "희망 역할",
    focusValue: "Growth PM / Operations PM / Data PM",
    scopeLabel: "경험 범위",
    scopeValue: "트래블테크 SaaS 운영, 성장 분석, 자동화, 데이터 구축, 로봇배달 서비스, 공공사업 운영, 서비스 운영, 장교 리더십",
    sourceNote: "참고자료 폴더의 경력기술서 PDF와 현재 어딩 업무 아카이브를 기준으로 웹 화면에 맞게 재구성했습니다.",
    projectLabel: "프로젝트명 / 업무명",
    periodLabel: "기간",
    outcomeLabel: "성과",
    roleLabel: "역할",
    toolsLabel: "기술",
    entries: [
      {
        project: "어딩 / B2B SaaS 채널링 서비스 / 운영, Growth PM",
        period: "2026.04 ~ 현재",
        outcome:
          "채널링 성장 프로그램의 조회수, 결제수량, 결제금액, CVR을 분리 분석해 채널링 유입 구매에서 6,677,950원 규모의 결제액을 확인하고, 반복 리포트 월 21시간 절감 및 수동 검수 처리량 4.21배 증가",
        role: [
          "성장 프로그램의 조회수 증가와 구매 전환 품질을 분리해 채널링 유입 결제액, 조회수, CVR 중심의 고객 설명 구조로 재정의",
          "17단계 반복 성과 리포트 흐름을 사람이 검수 가능한 자동화 파이프라인으로 바꿔 월 24시간 업무를 3시간으로 축소",
          "검수 오류 이력을 표준 케이스, 답변 템플릿, 단일 HTML 추천 도구로 구조화해 비개발 운영자의 반려 응답 일관성 강화",
          "Notion을 업무 원장으로 두고 Slack 입력, Drive 파일, Sheets 데이터, 대시보드를 연결하는 업무 운영 체계 구축",
          "민감한 운영 데이터를 비식별 KPI 카드와 시각화 자료로 바꿔 세일즈, 운영, 고객 커뮤니케이션에서 활용 가능한 설명 자산으로 정리",
        ],
        tools: "CSV/JSON 분석, Notion, Slack, Google Apps Script, 단일 HTML, AI 에이전트 활용",
      },
      {
        project: "국방부 AI 학습용 데이터 구축 / 데이터 구축 PL, 사업운영보조",
        period: "2024.10 ~ 2025.09 (12개월)",
        outcome: "프로세스 개편 및 표준화로 데이터 수집량 15% 향상 및 마일스톤 100% 준수",
        role: [
          "감리대응, WBS 등 사업산출물 작성",
          "구글 드라이브 기반 문서 공유 체계 정립 및 주/월간 운영 현황 지표화 리포팅 수행",
          "객체 거리 기준 비행 가이드라인 작성 및 조종사 체크리스트 배포로 무작위 촬영 방식 통제",
          "촬영 순서에 맞춘 파일명 규칙과 부가정보 기입 항목을 통일하여 후속 라벨링 공정 병목 차단",
          "데이터 수집 단계의 규칙을 표준화하여 전체 파이프라인이 안정적으로 납기를 지키는 흐름 구축",
        ],
        tools: "Jira, Confluence, WBS/일정·산출량 관리, 데이터 지표화 및 리포팅, 생성형 AI 모델 활용",
      },
      {
        project: "데이터 바우처 사업 / 여행 앱 데이터 구축",
        period: "2024.06 ~ 2024.09 (3개월)",
        outcome: "단순 반복 수작업을 기술로 대체하여 데이터 구축 예산 대비 인건비 14.8%(약 327만 원) 절감",
        role: [
          "47개 항목 중 9개 정량 항목을 선별해 Selenium 크롤링과 API 선별 호출로 투트랙 적재 실행",
          "크롤링 결과 전처리 후 전체 35만 건 중 19.1%를 자동 선적재하여 작업자 입력 범위 축소",
          "38개 정성 지표에 대한 명확한 가이드라인 배포 및 예시 교육으로 40명 작업자의 판단 기준 통일",
          "주간 생산성 및 오류율 대시보드 실시간 집계와 하위 작업자 경고 알림으로 일정 리스크 방어",
          "작업자 채용 선발, 가이드라인 교육, 운영 관리",
        ],
        tools: "Python 기반 크롤링, 데이터 정제 및 포맷팅, Google Sheets, 생성형 AI 모델 활용",
      },
      {
        project: "우아한형제들(배달의민족) / 인천공항 로봇배달서비스",
        period: "2022.11 ~ 2023.12 (13개월)",
        outcome: "타겟 마케팅 및 시뮬레이션 주행 상시 운영으로 일일 평균 주문 건수 7% 증대",
        role: [
          "데모그래픽 분석으로 가족 단위 승객을 핵심 타겟으로 정의하고 시즌별 소품 활용 시각적 브랜딩 실행",
          "추가 인력 없이 대시보드 조작만으로 유휴 로봇의 게이트 주변 시뮬레이션 주행을 상시 운영",
          "배차 로그 분석으로 특정 노드 과부하 현상 파악 및 랜덤 배차 로직 기획 도입",
          "개발 및 시설 담당자와의 긴밀한 협업과 일정 조율 수행",
          "서비스 운영 중 발생하는 다수 VOC 분석 및 가이드라인 작성",
        ],
        tools: "Jira, Confluence, 운영 데이터 수집·분석, 매뉴얼/운영 기준 문서화, 고객경험 지표(NPS) 기반 개선",
      },
      {
        project: "Shakespeare hophouse / bar business (아일랜드 더블린)",
        period: "2018.08 ~ 2020.10 (27개월)",
        outcome: "고객 및 근무 동선을 고려한 서비스존 구조 개선으로 월 매출 8% 증가",
        role: [
          "피크 타임 혼잡도 및 주문 병목 현상 파악 후 인근 유명 매장 10곳의 바 동선 및 배열 벤치마킹",
          "맥주 탭 종류별 재배치 및 칵테일 기물 구역 통합으로 담당자가 한 자리에서 업무를 처리하도록 개편",
          "리모델링을 통해 주문당 평균 서비스 시간을 3~4분에서 2분 30초 이내로 단축하여 회전율 상승",
          "운영 매니저로서 다국적 고객 및 협력사와 밀접하게 소통하며 현장 요구사항 주도적 해결",
        ],
        tools: "Google Drive, Google Sheets, Google Maps",
      },
      {
        project: "직업군인(장교) 복무 / 소초장, 군수과장",
        period: "2015.03 ~ 2017.06 (28개월)",
        outcome: "치밀한 사전 조사와 다단계 대민 커뮤니케이션으로 민원 접수 0건 달성 및 성공적인 훈련 완수",
        role: [
          "과거 훈련의 민원 발생 원인을 분석하고 인근 관공서에 일정 및 내용을 사전 공유해 오인 신고 방지",
          "훈련 3주 전부터 총 3회에 걸쳐 마을을 직접 방문해 소음 및 빛 발생 정보를 주민들에게 상세히 안내",
          "낮 시간대 부재중인 주민 비율을 고려해 마을 방송과 구두 전파를 병행하며 지역 사회 공감대 형성",
          "지휘검열을 대비해 품목을 전수조사하고 실물과 장부의 오차를 해결해 재고 정확도를 극대화한 경험",
        ],
        tools: "대민업무, 대공업무, 일정관리, 재고관리, 보고서작성",
      },
    ],
  },
};
