# GitHub Copilot Configuration for ngx-blocknote

This configuration file customizes GitHub Copilot's behavior for the ngx-blocknote project, ensuring consistent code generation and suggestions aligned with the project's standards.

## Usage

The agent configuration is automatically loaded by GitHub Copilot when working in this repository. No additional setup is required.

## Configuration Details

### Project Structure
- Component prefix: `bna-` (BlockNote Angular)
- Standalone components preferred
- Signals for state management
- Tailwind CSS for styling

### Code Organization
- Smart/Presentational component pattern
- Constructor-based dependency injection
- Proper cleanup in ngOnDestroy
- Strict TypeScript mode

### Testing Requirements
- Vitest as testing framework
- NgxBlockNoteTestingModule for component tests
- Coverage required for components
- Test both success and error scenarios

### Documentation
- Clear and descriptive comments for public APIs
- Inline documentation for complex logic
- CHANGELOG.md entries for all changes

## Best Practices

1. **Clean Code Principles**
   - Functions should be small and do one thing
   - Maximum 3 parameters per function
   - Clear, intention-revealing names
   - Classes follow Single Responsibility Principle
   - Methods should be 20 lines or less
   - Maximum nesting depth of 2
   - Comments explain why, not what

2. **SOLID Principles**
   - Single Responsibility Principle
   - Open/Closed Principle
   - Liskov Substitution Principle
   - Interface Segregation Principle
   - Dependency Inversion Principle

3. **Components**
   - Use standalone components
   - Implement proper cleanup
   - Follow OnPush change detection strategy

4. **State Management**
   - Prefer signals over observables
   - Use reactive patterns
   - Clean up subscriptions

5. **Error Handling**
   - Validate inputs
   - Handle edge cases
   - Provide meaningful error messages
   - Clean up resources in error scenarios

## Code Structure Guidelines

### Functions
- Keep functions small and focused
- Parameters:
  - Maximum: 3 parameters
  - Ideal: 2 parameters or fewer
  - For 4+ parameters: Use parameter object pattern
  - For 3 parameters: Consider parameter object if parameters are related
  - Avoid boolean flags, split into separate functions instead
  - Group optional parameters into configuration objects
  - Order: Required parameters first, then optional
- Use descriptive verb-noun pairs for names
- Maintain single level of abstraction

### Methods
- Constructor parameters:
  - Prefer 0-2 parameters
  - Use builder or factory pattern for more complex initialization
- Service injection: No strict limit but consider splitting service responsibilities
- Maintain 20 lines or less per method
- Follow single responsibility principle

### Classes
- Follow Single Responsibility Principle
- Keep classes small and focused
- Maintain high cohesion
- Minimize dependencies

### Naming
- Use meaningful and pronounceable names
- Classes should be nouns
- Methods should be verbs
- Constants in uppercase with underscores

## Contributing

When contributing code, ensure GitHub Copilot suggestions follow these patterns and Clean Code principles. The configuration helps maintain consistency and high quality across the codebase.