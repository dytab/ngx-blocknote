---
applyTo: '*.ts'
description: 'This document outlines the clean code principles and best practices for the codebase.'
---

## Clean Code Principles (Based on Robert C. Martin)

### 1. Single Responsibility Principle (SRP)

- Each class/module should have one and only one reason to change
- Keep functions focused and small
- Separate concerns appropriately

### 2. Naming Conventions

- Use intention-revealing names
- Choose meaningful and pronounceable variable names
- Use consistent verbs for method names (get/set/is/has/update)
- Avoid abbreviations unless they're widely accepted

### 3. Function Rules

- Functions should do one thing
- Keep functions small (preferably under 20 lines)
- Minimize the number of arguments (3 or fewer is ideal)
- Avoid flag arguments
- Don't repeat yourself (DRY principle)

### 4. Comments and Documentation

- Code should be self-documenting
- Comments should explain WHY, not WHAT
- Keep comments up to date and relevant
- Use JSDoc for public APIs and interfaces

### 5. Error Handling

- Use strong typing to prevent errors
- Handle errors gracefully
- Don't ignore caught errors
- Prefer early returns
- Use meaningful error messages

### 6. Code Organization

- Keep related code together
- Organize code by feature/module
- Maintain a clear and consistent project structure
- Follow the established Nx workspace organization

### 7. Testing

- Write tests first (TDD)
  - Write a failing test that defines the desired behavior
  - Write the minimum code needed to make the test pass
  - Refactor while keeping tests green
  - No new code without corresponding tests
- Make tests readable
  - Use descriptive test names that explain the behavior being tested
  - Follow the AAA pattern (Arrange, Act, Assert)
  - Keep test setup focused and minimal
- One assert per test
  - Each test should verify one specific behavior
  - Use separate tests for different conditions
  - Avoid testing multiple things in one test case
- Keep tests fast and independent
  - No dependencies between tests
  - Clean up test data after each test
  - Mock external dependencies appropriately
  - Tests should be able to run in any order
- Test Coverage
  - Aim for high test coverage in business logic
  - Unit test all public APIs
  - Include edge cases and error conditions
  - Write integration tests for critical paths
