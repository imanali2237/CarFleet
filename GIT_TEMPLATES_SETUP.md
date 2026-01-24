# Git Templates & Hooks Setup

This document explains the Git templates and hooks configured for this repository.

## What's Configured

### 1. Pull Request Template (`.github/pull_request_template.md`)
- Appears automatically when creating a new Pull Request
- Enforces consistent PR descriptions
- Includes sections for: description, type, related issues, testing, checklist, screenshots, deployment notes

### 2. Commit Message Template (`.gitmessage`)
- Configured globally for this repository
- Provides a template when you run `git commit`
- Enforces Conventional Commits format
- Includes helpful comments explaining the format

### 3. Git Hooks (`.git/hooks/`)

#### commit-msg Hook
**File:** `.git/hooks/commit-msg`
**What it does:**
- Validates commit messages follow Conventional Commits format
- Checks format: `type(scope): subject`
- Validates subject line length (max 50 chars)
- Checks blank line between subject and body
- Shows helpful error messages if validation fails

**When it runs:**
- Automatically when you try to commit: `git commit -m "..."`

**If it fails:**
```
❌ Commit message must follow the format: <type>(<scope>): <subject>

Valid types: feat, fix, refactor, perf, docs, style, test, chore, ci, revert

Example:
  feat(auth): add JWT authentication
  fix(database): resolve connection timeout issue
```

#### pre-commit Hook
**File:** `.git/hooks/pre-commit`
**What it does:**
- Runs ESLint to check code quality
- Runs TypeScript type checking
- Checks code formatting with Prettier
- Auto-fixes formatting when possible

**When it runs:**
- Automatically before every commit (before commit-msg hook)

**If it fails:**
```
❌ ESLint failed. Fix the errors and try again:
   npm run lint:fix
```

## How to Use

### Committing Code

```bash
# Stage your changes
git add .

# Commit (this triggers hooks automatically)
git commit

# A template will appear in your editor
# Follow the format:
# feat(scope): short description
#
# Longer explanation...
#
# Closes #123
```

### If Pre-Commit Hook Fails

```bash
# Fix linting issues
npm run lint:fix

# Fix formatting
npm run format

# Try committing again
git commit -m "feat(scope): description"
```

### If Commit-Msg Hook Fails

**Make sure your message follows the format:**
```
feat(auth): add JWT token validation

Add JWT token validation middleware to protect API endpoints.

Closes #123
```

### Creating a Pull Request

1. Push your branch: `git push origin feature/name`
2. Go to GitHub and click "New Pull Request"
3. Template will auto-populate with required sections
4. Fill in all sections and submit

## Conventional Commits Types

| Type | Purpose | Example |
|------|---------|---------|
| feat | New feature | `feat(auth): add JWT validation` |
| fix | Bug fix | `fix(database): resolve timeout` |
| refactor | Code refactoring | `refactor(api): simplify middleware` |
| perf | Performance | `perf(redis): optimize cache` |
| docs | Documentation | `docs: update README` |
| style | Code style | `style: format imports` |
| test | Tests | `test: add user auth tests` |
| chore | Build/deps | `chore: update dependencies` |
| ci | CI/CD | `ci: add GitHub Actions` |
| revert | Revert commit | `revert: remove feature X` |

## Scopes (Examples)

- auth
- users
- database
- api
- middleware
- utils
- config
- logging
- redis
- prisma
- swagger
- docker

## Requirements for Commits

✅ Must have:
- Proper type and scope
- Subject line ≤ 50 characters
- Imperative mood (add, not added)
- No period at end of subject
- Blank line before body (if body exists)

❌ Must not have:
- Vague messages like "fixed stuff"
- Multiple unrelated changes
- Capital letters in subject
- Period at end of subject line

## Requirements for Pull Requests

✅ Must include:
- Clear description of changes
- Type of change (bug fix, feature, etc.)
- Related issue numbers
- Testing details
- Completion of checklist
- Screenshots/logs if applicable

## Disabling Hooks (Not Recommended!)

If you need to bypass hooks temporarily:

```bash
# Skip pre-commit hook
git commit --no-verify -m "feat(scope): message"

# Skip commit-msg hook
git commit --no-verify -m "feat(scope): message"

# Both hooks skipped
git commit --no-verify
```

⚠️ **Use only in emergencies!** Bypassing checks defeats the purpose.

## Troubleshooting

### Hook not running?
```bash
# Check if hook exists and is executable
ls -la .git/hooks/commit-msg
ls -la .git/hooks/pre-commit

# Make executable
chmod +x .git/hooks/commit-msg
chmod +x .git/hooks/pre-commit
```

### Template not showing?
```bash
# Verify template configuration
git config commit.template

# Should output: .gitmessage

# Reconfigure if needed
git config commit.template .gitmessage
```

### Hooks not enforcing?
- Ensure you're using `git commit` (not `git commit -m` for full template)
- Check that ESLint, TypeScript, and Prettier are installed
- Run `npm install` to ensure dependencies are available

## See Also

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Full contribution guidelines
- [.gitmessage](./.gitmessage) - Commit message template
- [.github/pull_request_template.md](./.github/pull_request_template.md) - PR template
