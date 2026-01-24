# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-20

### Added
- Initial release of CarFleet Logging Server
- Winston logger integration with multiple transports
- Morgan HTTP request logging middleware
- Custom response logging middleware with sensitive data redaction
- Daily rotating log files (error, combined, requests)
- TypeScript support with strict type checking
- Automatic log directory setup
- Environment variable configuration
- Comprehensive error logging with stack traces
- Multiple log levels (error, warn, info, http, debug)
- Colorized console output for development
- Production-ready configuration
- Example API endpoints for demonstration
- Complete documentation (README, CONTRIBUTING)
- MIT License
- GitHub Actions CI workflow

### Features
- **Request Logging**: Comprehensive HTTP request logging with Morgan
- **Response Logging**: Custom middleware for response tracking
- **Error Tracking**: Detailed error logs with stack traces
- **Log Rotation**: Automated daily log rotation with 14-day retention
- **Security**: Automatic redaction of sensitive fields (passwords, tokens, API keys)
- **Structured Logging**: JSON-formatted logs for easy parsing
- **Custom Tokens**: Real IP, request body, query params, user ID tracking
- **Environment Support**: Development and production configurations

### Documentation
- Comprehensive README with usage examples
- Contributing guidelines
- Environment configuration template (.env.example)
- Project structure documentation
- API endpoint documentation

[1.0.0]: https://github.com/imanali2237/CarFleet/releases/tag/v1.0.0
