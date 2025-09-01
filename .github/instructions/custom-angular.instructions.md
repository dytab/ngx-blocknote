---
applyTo: '**/frontend/**/*.ts'
description: 'This document outlines the meddevo Angular configuration and best practices for the codebase.'
---

## Angular-Specific Guidelines

### 1. Component Architecture

- Use smart/dumb component pattern
- Keep components small and focused
- Use OnPush change detection when possible
- Implement proper lifecycle hooks

### 2. State Management

- Use services for shared state
- Implement proper dependency injection
- Follow unidirectional data flow
- Use observables responsibly

### 3. Performance

- Lazy load modules
- Implement trackBy in ngFor
- Avoid memory leaks by unsubscribing
- Use async pipe when possible
