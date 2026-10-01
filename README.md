# ⚡ Flash Wallet Buy Airtime — Data-Driven Test Suite

An automated, data-driven end-to-end test suite built with **Playwright** and **TypeScript** for the Flash Wallet Airtime application (`/airtime`).

This project dynamically parameterizes browser tests from an external JSON dataset and includes a dedicated, non-browser **data-integrity test suite** that validates test data prior to test execution.

---

## 🛠️ Technical Stack

- **Test Framework:** [Playwright](https://playwright.dev/)
- **Language:** TypeScript
- **Runtime Environment:** Node.js (v20+)
- **Browser Engine:** Chromium
- **Application Target:** Local Flash Wallet Airtime App (`http://localhost:3001/airtime`)

---

## 📁 Project Structure

```text
flash-airtime-activity/
├── airtime-app/               # Local application & backend server
│   ├── public/                # Web application static assets
│   ├── server.js              # Express/Node server (Port 3001)
│   └── package.json
├── testdata/                  # Test data directory
│   └── airtime-activity.json  # 8 Data-driven test cases (AIR-01 to AIR-08)
├── tests/                     # Playwright test specifications
│   ├── airtime.spec.ts        # Dynamic UI test suite
│   ├── data-integrity.spec.ts # Non-browser data validation suite
│   └── types.ts               # TypeScript interfaces & types
├── .gitignore
├── playwright.config.ts       # Global Playwright configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

---

## 🚀 Setup & Installation

### 1. Prerequisites
Ensure you have the following installed locally:
- **Node.js**: `v20.0.0` or higher
- **npm**: Included with Node.js

### 2. Installation
Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate into the project directory
cd flash-airtime-activity

# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install chromium

#To run all tests 
npm run test 

```

---

## ⚙️ Configuration (`playwright.config.ts`)

- **Base URL:** `http://localhost:3001`
- **Web Server:** Automatically launches `node airtime-app/server.js` on port `3001` prior to executing tests.
- **Browser Engine:** Configured exclusively for **Chromium**.

---

## 🎯 Locator Strategy & UI Elements

| UI Element | Locator Strategy | Selection Rationale |
| :--- | :--- | :--- |
| **Network Dropdown** | `page.locator('#network')` / `getByLabel('Network')` | Uniquely identifies the network selection input. |
| **Cellphone Input** | `page.locator('#cellphone')` / `getByLabel('Cellphone')` | Target text field for South African mobile numbers. |
| **Amount Input** | `page.locator('#amount')` / `getByLabel('Amount')` | Target input field for Rand amounts. |
| **Buy Airtime Button** | `page.getByRole('button', { name: 'Buy airtime' })` | Accessible role-based locator targeting submission. |
| **Result Message** | `page.locator('#message')` / `getByTestId('result-message')` | Text container displaying success/error output. |
| **Wallet Balance** | `page.locator('#balance')` / `getByTestId('wallet-balance')` | Displays remaining wallet balance (Starts at `R200.00`). |

---

## 📊 TypeScript Data Schema (`tests/types.ts`)

```typescript
export interface AirtimeCase {
  caseId: string;
  scenario: string;
  purchase: {
    network: string;
    cellphone: string;
    amount: string;
  };
  expect: {
    outcome: 'success' | 'error';
    message: string;
    walletBalance: string;
  };
} 
```

---

## 🧪 Test Execution Guide

### 1. List All Discovered Tests
List all dynamically created UI and data-integrity test cases without running them:
```bash
npx playwright test --list
```

### 2. Run the Complete Test Suite
Executes both UI and Data Integrity tests:
```bash
npx playwright test
```

### 3. Run a Specific Test Case
Execute test case `AIR-05` only:
```bash
npx playwright test -g "AIR-05"
```

### 4. Run All Success Scenarios
Run cases `AIR-01`, `AIR-02`, and `AIR-03` using regex filtering:
```bash
npx playwright test -g "AIR-0[1-3]"
```

### 5. Run Data Integrity Tests Only
Executes dataset structure validation checks instantly without opening a browser:
```bash
npx playwright test tests/data-integrity.spec.ts
```

### 6. View Test Execution Report
View the HTML execution report:
```bash
npx playwright show-report
```

---

## 🔍 Task Analysis & Observations

### Failure Verification Analysis
> **Observation:** When modifying the expected wallet balance of `AIR-02` to an incorrect value (`R999.00`), the assertion failed because the actual UI wallet balance (`R150.00`) did not match the JSON target.
> **Attribution:** The **data** was faulty, as the core application correctly calculated the transaction while the test data contained an invalid expected value.

### Data Integrity & Duplicate Detection
> **Observation:** Running `npx playwright test --list` does not natively raise errors for duplicate `caseId` values (such as duplicating `AIR-01`), as Playwright dynamically generates test titles as plain strings. 
> **Solution:** The dedicated `data-integrity.spec.ts` suite explicitly validates key uniqueness and structural schema across the dataset prior to browser execution, catching duplicated or invalid test cases immediately.

---

## ✅ Deliverables Checklist

- [x] Application hosted locally and integrated with Playwright `webServer`.
- [x] Parameterized UI tests driven purely from `airtime-activity.json`.
- [x] Test names prepended with `caseId` formatting (e.g., `AIR-01: ...`).
- [x] Complete assertions covering message response and updated wallet balance.
- [x] Lightweight, browserless `data-integrity.spec.ts` validation suite.
- [x] Zero hardcoded values or test inputs inside test scripts.
