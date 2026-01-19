# Contributing to CarFleet Logging Server

First off, thank you for considering contributing to CarFleet Logging Server! It's people like you that make this tool better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our code of conduct: be respectful, inclusive, and considerate of others.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include logs and error messages**
- **Specify your environment** (OS, Node.js version, npm version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Make your changes
4. Ensure your code follows the existing style
5. Run type checking: `npm run typecheck`
6. Build the project: `npm run build`
7. Test your changes thoroughly
8. Commit your changes: `git commit -m 'Add some AmazingFeature'`
9. Push to the branch: `git push origin feature/AmazingFeature`
10. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/CarFleet.git
cd CarFleet

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run in development mode
npm run dev
```

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Style Guide

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use meaningful variable names
- Add JSDoc comments for functions and complex logic
- Ensure no TypeScript errors (`npm run typecheck`)

### Code Quality

- Write clean, readable code
- Keep functions small and focused
- Avoid code duplication
- Add comments for complex logic
- Maintain consistent formatting

## Testing

While we currently don't have automated tests, please manually test your changes:

1. Test in development mode
2. Build and test in production mode
3. Verify logs are created correctly
4. Test error scenarios
5. Verify sensitive data redaction

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments for new functions
- Update .env.example if you add new environment variables

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉
