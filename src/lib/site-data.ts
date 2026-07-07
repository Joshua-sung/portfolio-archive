import {
  BarChart3,
  Bot,
  ClipboardCheck,
  GitBranch,
  LayoutDashboard,
  MessageSquare,
  Route,
  Workflow,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home", shortLabel: "Home" },
  { href: "/case-studies", label: "Case Studies", shortLabel: "Cases" },
  { href: "/companies", label: "Companies", shortLabel: "Companies" },
  { href: "/resume", label: "Resume", shortLabel: "Resume" },
];

export const capabilityMap = [
  {
    title: "Operational ownership",
    description:
      "Owns ambiguous field and data operations from problem diagnosis through execution, reporting, and iteration.",
    icon: ClipboardCheck,
  },
  {
    title: "Automation literacy",
    description:
      "Separates human judgment from repeatable work, then ships pragmatic automations — scripts, API workflows, and AI-agent pipelines built and operated hands-on.",
    icon: Bot,
  },
  {
    title: "Dashboarding and reporting",
    description:
      "Turns progress, quality, throughput, and risk signals into weekly operating views that support faster decisions.",
    icon: LayoutDashboard,
  },
  {
    title: "Developer collaboration",
    description:
      "Translates field constraints and VOC into reproducible requirements, test cases, and implementation context.",
    icon: GitBranch,
  },
  {
    title: "Process optimization",
    description:
      "Improves handoffs, naming rules, routes, QA standards, and operating cadence to remove bottlenecks.",
    icon: Workflow,
  },
  {
    title: "Data-oriented decisions",
    description:
      "Uses real operating data, customer behavior, benchmarks, and constraints to make practical tradeoffs.",
    icon: BarChart3,
  },
];

export const capabilityMapKo = [
  {
    title: "운영 오너십",
    description: "모호한 현장/데이터 운영 문제를 진단, 실행, 리포팅, 개선까지 책임지고 끝까지 끌고 갑니다.",
    icon: ClipboardCheck,
  },
  {
    title: "자동화 이해",
    description: "사람이 판단할 일과 반복 업무를 분리하고, 스크립트·API 워크플로우·AI 에이전트 파이프라인을 직접 만들어 운영합니다.",
    icon: Bot,
  },
  {
    title: "대시보드와 리포팅",
    description: "진척, 품질, 처리량, 리스크 신호를 주간 운영 뷰로 바꿔 더 빠른 의사결정을 돕습니다.",
    icon: LayoutDashboard,
  },
  {
    title: "개발 협업",
    description: "현장 제약과 VOC를 재현 가능한 요구사항, 테스트 맥락, 제품 개선 근거로 번역합니다.",
    icon: GitBranch,
  },
  {
    title: "프로세스 최적화",
    description: "인수인계, 명명 규칙, 동선, QA 기준, 운영 리듬을 개선해 병목을 제거합니다.",
    icon: Workflow,
  },
  {
    title: "데이터 기반 판단",
    description: "운영 데이터, 고객 행동, 벤치마크, 제약조건을 바탕으로 실행 가능한 트레이드오프를 정합니다.",
    icon: BarChart3,
  },
];

export const systemsBuilt = [
  {
    name: "Automation-assisted data intake",
    type: "Automation / API workflow",
    description:
      "Split subjective and objective fields, used scraping and selective API calls, and reduced manual work without letting API cost erase savings.",
  },
  {
    name: "Field collection operating standard",
    type: "Process system",
    description:
      "Created flight order, battery rotation, file naming, and metadata rules so downstream labeling could move without repeated file inspection.",
  },
  {
    name: "VOC-to-product feedback loop",
    type: "PM collaboration loop",
    description:
      "Converted pickup friction into measured spatial constraints, POI changes, test runs, and operating manual updates.",
  },
  {
    name: "Progress and risk reporting cadence",
    type: "Dashboard / reporting",
    description:
      "Tracked production, quality, error patterns, and low-progress contributors so schedule risk surfaced before deadlines.",
  },
];

export const systemsBuiltKo = [
  {
    name: "자동화 보조 데이터 수집 흐름",
    type: "Automation / API workflow",
    description:
      "주관 판단 필드와 객관 수집 필드를 분리하고, 스크래핑과 선택적 API 호출을 조합해 비용 대비 효과가 있는 자동화 범위를 만들었습니다.",
  },
  {
    name: "현장 수집 운영 표준",
    type: "Process system",
    description:
      "촬영 순서, 배터리 로테이션, 파일명, 메타데이터 규칙을 정리해 라벨링 단계에서 반복 확인이 줄어들도록 했습니다.",
  },
  {
    name: "VOC 기반 제품 피드백 루프",
    type: "PM collaboration loop",
    description:
      "픽업 불편을 공간 제약, POI 변경, 테스트 주행, 운영 매뉴얼 업데이트로 연결해 개발팀이 검토 가능한 개선안으로 만들었습니다.",
  },
  {
    name: "진척과 리스크 리포팅 리듬",
    type: "Dashboard / reporting",
    description:
      "생산량, 품질, 오류 패턴, 저진척 작업자를 추적해 일정 리스크가 마감 직전에 드러나지 않도록 운영했습니다.",
  },
];

export const collaborationPractices = [
  {
    title: "Problem packets for engineers",
    description:
      "Frame issues with current behavior, target behavior, constraints, reproduction steps, sample data, and success metrics.",
    icon: MessageSquare,
  },
  {
    title: "Operating evidence before escalation",
    description:
      "Collect logs, measurements, screenshots, route details, and user impact before requesting product or engineering changes.",
    icon: BarChart3,
  },
  {
    title: "Workflow-friendly documentation",
    description:
      "Keep decisions, owners, next actions, and review cycles in tools like Notion, Jira, GitHub, or structured docs.",
    icon: Route,
  },
];

export const collaborationPracticesKo = [
  {
    title: "개발자를 위한 문제 패킷",
    description:
      "현재 동작, 목표 동작, 제약, 재현 조건, 샘플 데이터, 성공 기준을 함께 정리해 개발 검토 비용을 줄입니다.",
    icon: MessageSquare,
  },
  {
    title: "에스컬레이션 전 운영 근거 확보",
    description:
      "로그, 측정값, 스크린샷, 동선, 사용자 영향을 먼저 모아 제품/개발 변경 요청의 맥락을 명확히 합니다.",
    icon: BarChart3,
  },
  {
    title: "업무 흐름에 맞는 문서화",
    description:
      "Notion, Jira, GitHub, 구조화 문서에서 결정사항, 담당자, 다음 액션, 검토 주기를 관리합니다.",
    icon: Route,
  },
];

export const resumeHighlights = [
  "Growth PM / Operations PM / Data PM profile focused on measurable business impact.",
  "Experience operating cross-functional data, field, robotics, and public-sector proposal work.",
  "Strength in translating operational constraints into systems, workflows, dashboards, and technical requirements.",
  "Comfortable collaborating with developers, operators, freelancers, vendors, stakeholders, and field teams.",
];

export const resumeHighlightsKo = [
  "측정 가능한 비즈니스 임팩트를 중심으로 한 Growth PM / Operations PM / Data PM 프로필.",
  "데이터 구축, 현장 운영, 로봇 서비스, 공공 제안 업무에서 cross-functional 실행 경험 보유.",
  "운영 제약을 시스템, 워크플로우, 대시보드, 기술 요구사항으로 번역하는 데 강점.",
  "개발자, 운영자, 작업자, 파트너사, 이해관계자와 함께 실행 가능한 합의를 만드는 협업 경험.",
];
