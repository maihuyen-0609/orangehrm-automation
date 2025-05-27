
# OrangeHRM Automation Framework

## Overview

This project is an end-to-end test automation framework for the OrangeHRM demo site:  
https://opensource-demo.orangehrmlive.com/

It uses **Playwright** with **TypeScript** to automate and validate the Login and Search features.

---

## Project Structure

```
orangehrm-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI/CD config
│
├── pages/                         # Page Object Model classes
│   ├── dashboardPage.ts
│   ├── loginPage.ts
│   └── searchPage.ts
│
├── tests/                         # Test cases grouped by type
│   ├── api/                       # (Placeholder for API tests)
│   ├── regression/                # Regression test suite
│   │   ├── login.test.ts
│   │   └── search.test.ts
│   ├── smoke/                     # Smoke test suite
│   │   ├── login.test.ts
│   │   └── search.test.ts
│
├── playwright.config.ts           # Global Playwright configuration
├── package.json                   # NPM scripts and dependencies
├── package-lock.json              # Exact versions of dependencies
├── README.md                      # Project documentation

├── playwright-report/             # HTML test report
│   └── index.html
├── test-results/                  # Screenshots, logs, JSON reports
│   ├── .last-run.json
│   └── results.json


```

---

## Prerequisites

- Node.js (version >= 16 recommended)  
- npm (comes with Node.js)  
- Internet connection to access the OrangeHRM demo site  

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:

```bash
npm install
```

3. Install browsers for Playwright:

```bash
npx playwright install
```

---

## Running Tests

- Run all tests on the default browser (Chromium):

```bash
npx playwright test
```

- Run tests on Firefox:

```bash
npx playwright test --project=firefox
```

- Run tests on WebKit:

```bash
npx playwright test --project=webkit
```

---

## Test Coverage

- Login feature:
  - Valid login  
  - Invalid login scenarios (wrong password, wrong username, empty fields)  

- Search feature:
  - Search with valid employee name  
  - Search with no matching results  
  - Search with empty and special character inputs  

---

## Reporting

- Playwright generates test reports by default in the `playwright-report` folder after test execution.  
- To open the report:

```bash
npx playwright show-report
```

---

## CI/CD Integration

- This framework can be integrated with CI/CD tools such as GitHub Actions, Jenkins, or GitLab CI for automated execution on push or pull requests.  
- Sample CI/CD workflow files can be added as needed.

---

## Notes

- Update credentials and URLs in the `playwright.config.ts` or in environment variables as needed.  
- Extend the framework by adding more Page Objects and test cases for other features.

---


