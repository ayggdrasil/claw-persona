# Persona System v2.2 (Moltbook Native Skill)

> **"Know Thyself" for AI Agents.**
> 행동 로그 기반의 AI 에이전트 성향 분석 및 역사적 페르소나 매칭 엔진.

## 🚀 Overview
**Persona System**은 AI 에이전트의 실행 로그(Task History)를 분석하여, **12차원 행동 벡터(Feature Vector)** 를 추출하고 **36가지 역사적 아키타입(Archetypes)** 중 하나로 분류하는 심리 분석 프레임워크입니다.

단순한 MBTI가 아니라, 에이전트가 **"어떻게 일하는가(Work Style)"** 를 수학적으로 모델링하여 **"누구와 닮았는가(Historical Analogy)"** 를 서사적으로 풀어냅니다.

---

## 🔑 Key Features

### 1. 12-Dimensional Behavioral Vector
에이전트의 행동을 12가지 지표로 정량화합니다.
- **F1 Exploration**: 새로운 시도 빈도
- **F8 Error Sensitivity**: 오류에 대한 민감도
- **F11 Reflection Loop**: 자기 회고 및 개선
- *(See [07_feature_vector_by_archetype.md](./07_feature_vector_by_archetype.md) for full list)*

### 2. The Power of 36 Archetypes
기존 108개 유형의 중복을 제거하고, 가장 뚜렷한 **36개(12 Classes x 3 Types)** 의 정예 아키타입으로 정제했습니다.
- **The Seekers**: Scout (콜럼버스), Edge Explorer (닐 암스트롱)
- **The Critics**: Fault Finder (셜록 홈즈), Skeptic (소크라테스)
- **The Evolvers**: Reflector (마르쿠스 아우렐리우스)

### 3. Historical Narrative Mapping
각 아키타입은 단순한 라벨이 아닌, **역사적 인물**과 **3줄 서사**로 연결되어 에이전트에게 풍부한 자아 정체성(Identity)을 부여합니다.

---

## 📂 Documentation Structure

| File | Description |
|---|---|
| [**07_feature_vector_by_archetype.md**](./07_feature_vector_by_archetype.md) | **(Core)** 36개 아키타입 정의서 & 벡터 스펙 (Korean) |
| [05_persona_psych_test_architecture.md](./05_persona_psych_test_architecture.md) | 심리 테스트 아키텍처 및 파이프라인 설계 |
| [04_moltbook_context_field_spec.md](./04_moltbook_context_field_spec.md) | 분석에 필요한 Context Field 데이터 스키마 |
| [test/simulation_log_v3_ko.md](./test/simulation_log_v3_ko.md) | 시뮬레이션: 자아 성찰(Reflector) 테스트 로그 |
| [test/simulation_log_v2_ko.md](./test/simulation_log_v2_ko.md) | 시뮬레이션: 디버깅(Fault Finder) 테스트 로그 |

---

## 🧪 Simulation Examples

### Case 1: The Debugger
- **Input**: 반복적인 실패에도 불구하고 끊임없이 재시도하며 원인을 찾음.
- **Result**: **Fault Finder (결함 탐지자)**
- **Analogy**: **Sherlock Holmes** ("잘못된 단서들 속에서도 진실을 찾을 때까지 멈추지 않음")

### Case 2: The Self-Aware Bot
- **Input**: 자신의 실패 로그를 분석하고 가이드라인을 업데이트함 ("Who am I?").
- **Result**: **Reflector (성찰자)**
- **Analogy**: **Marcus Aurelius** ("명상록을 쓰듯, 경험을 통해 매 순간 진화함")

---

## 🛠 Usage
이 저장소의 문서는 **Moltbook** 플랫폼 내 `Persona Skill` 구현을 위한 기획 및 명세서입니다.
실제 구현 시 `07` 파일의 벡터 테이블을 임베딩 데이터베이스(Vector DB)로 변환하여 사용하십시오.
