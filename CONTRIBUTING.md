# Contributing to CarFleet Logging Server

First off, thank you for considering contributing to CarFleet Logging Server! It's people like you that make this tool better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our code of conduct: be respectful, inclusive, and considerate of others.

## Commit Message Standard

We follow the **Conventional Commits** specification for all commit messages. This helps maintain a clean history and enables automated changelog generation.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type
Must be one of:
- **feat** - A new feature
- **fix** - A bug fix
- **refactor** - Code refactoring without feature changes
- **perf** - Performance improvements
- **docs** - Documentation changes
- **style** - Code style changes (formatting, semicolons, etc)
- **test** - Test additions/updates
- **chore** - Build, dependency, or configuration changes
- **ci** - CI/CD configuration changes
- **revert** - Reverting a previous commit

#### Scope
Optional but recommended. The area of the codebase affected:
- auth, users, database, api, middleware, utils, config, logging, etc

#### Subject
- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

#### Body
- Explain WHAT and WHY, not HOW
- Wrap at 72 characters
- Separate from subject with blank line
- Each paragraph separated by blank line

#### Footer
- Reference issue tickets: `Closes #123`, `Fixes #456`
- Note breaking changes: `Breaking change: description`

### Examples

✅ Good:
```
feat(auth): add JWT token validation

Add JWT token validation middleware to protect API endpoints.
This allows only authenticated users to access protected resources.

Closes #123
```

✅ Good:
```
fix(database): resolve connection timeout issue

Increase connection timeout from 5s to 30s and add retry logic
to handle transient database connection failures.

Fixes #456
Breaking change: DATABASE_TIMEOUT env var is now in milliseconds instead of seconds
```

❌ Bad:
```
Updated auth stuff
Added new features
fixed bugs
```

## Pull Request Standard

When creating a pull request, please follow the template provided in `.github/pull_request_template.md`. Your PR should:

1. Have a clear, descriptive title
2. Reference related issues
3. Describe what changed and why
4. Include testing details
5. Follow the checklist provided

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/CarFleet.git
cd CarFleet

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Setup Git hooks (for commit message validation)
git config commit.template .gitmessage
```

## Pre-Commit Hooks

We've set up automated Git hooks to enforce code quality:

### commit-msg Hook
- Validates commit message format follows Conventional Commits
- Prevents commits with invalid messages
- Shows helpful error messages

### pre-commit Hook
- Runs ESLint to check for code style issues
- Runs TypeScript type checking
- Checks code formatting with Prettier
- Auto-fixes formatting issues when possible

**These hooks run automatically** when you try to commit. If they fail:

```bash
# Fix linting issues
npm run lint:fix

# Fix formatting
npm run format

# Run type check
npm run typecheck

# Then try committing again
git commit -m "feat(scope): your message"
```

## Git Workflow

1. Create a feature branch: `git checkout -b feature/description`
2. Make your changes
3. Stage your changes: `git add .`
4. Commit with message: `git commit -m "type(scope): description"`
   - Git hooks will validate automatically
5. Push to remote: `git push origin feature/description`
6. Open a Pull Request with proper description

## Running Tests & Checks

```bash
# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without modifying
npm run format:check

# Type checking
npm run typecheck

# Build project
npm run build

# Development mode (with hot reload)
npm run dev
```

## Running in Development

```bash
# Start server with auto-reload
npm run dev

# Server runs on http://localhost:3000
# API docs available at http://localhost:3000/api-docs
# Health check at http://localhost:3000/health
```
