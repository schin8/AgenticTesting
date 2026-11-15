# Proposal: Agentic Tester Evolution for SDETs

## Executive Summary

An Agentic Tester is the next evolution of the Software Development Engineer in Test (SDET) role. Instead of manually creating and maintaining every test artifact, the SDET leverages AI agents to autonomously generate, execute, analyze, and maintain tests while providing strategic oversight, governance, and quality leadership.

## Traditional SDET vs. Agentic Tester

### Traditional SDET

A traditional SDET typically:

- Writes automated test scripts
- Creates test cases from requirements
- Maintains regression suites
- Investigates test failures
- Builds CI/CD test pipelines
- Performs API, UI, and performance testing

### Agentic Tester

An Agentic Tester uses AI-powered agents to:

- Analyze requirements and code changes
- Generate test scenarios automatically
- Create automation scripts
- Execute regression suites
- Investigate failures
- Recommend root causes
- File defects and produce reports

The human tester remains accountable for quality strategy, risk assessment, governance, and continuous improvement.

## Core Capabilities

### 1. AI-Driven Test Design

Agents can analyze:

- User stories
- Functional specifications
- Pull requests
- Architecture documents

And generate:

- Positive test cases
- Negative test cases
- Boundary condition tests
- Security-focused tests
- Accessibility validation scenarios

### 2. Autonomous Test Automation

Rather than writing every script manually, the SDET guides AI agents to:

- Generate Playwright, Cypress, Selenium, or API tests
- Create page objects
- Build assertions
- Generate test data

### 3. Self-Healing Automation

Agentic testing tools can:

- Detect locator changes
- Suggest selector updates
- Repair broken tests
- Reduce maintenance effort

### 4. Exploratory Testing

Agents can autonomously:

- Navigate workflows
- Try unexpected inputs
- Detect failures
- Identify usability issues

### 5. Root Cause Analysis

Instead of reporting only failures, agents can identify:

- Likely source commits
- Affected services
- Error patterns
- Dependency failures

### 6. Risk-Based Testing

Agents can assess pull requests and identify:

- High-risk changes
- Impacted components
- Recommended regression suites
- Potential release concerns

## Skills Required for Modern Agentic Testers

### Foundational Skills

- Programming (Python, C#, Java, TypeScript)
- Test automation frameworks
- API testing
- CI/CD pipelines
- Cloud technologies

### Emerging Skills

- AI prompting
- Agent workflow design
- LLM evaluation and validation
- Multi-agent orchestration
- Quality engineering leadership

## Example Workflow

```text
Azure DevOps Pull Request
            ↓
      AI Agent Review
            ↓
      Risk Assessment
            ↓
    Generate Test Cases
            ↓
     Execute Automation
            ↓
      Analyze Failures
            ↓
      Create Work Items
            ↓
      Recommend Fixes
```

## Benefits

- Faster test creation
- Increased test coverage
- Reduced maintenance effort
- Improved defect detection
- Earlier risk identification
- Enhanced productivity for SDETs

## Challenges

- AI hallucinations
- Test quality validation
- Governance and compliance
- Data privacy considerations
- Need for human oversight

## Recommendation

Organizations should begin transitioning SDETs toward Agentic Testing by introducing AI-enabled testing platforms, establishing governance standards, and training teams on prompt engineering, agent orchestration, and quality strategy. The future role of the SDET will increasingly focus on designing, supervising, and optimizing intelligent testing systems rather than manually creating every test artifact.

## Conclusion

An Agentic Tester is an SDET who collaborates with AI agents to autonomously generate, execute, maintain, and analyze tests while concentrating on quality architecture, risk management, and strategic oversight. This represents a significant shift from manual test creation to intelligent quality engineering.
