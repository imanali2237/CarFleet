# CarFleet Logging Server 🚗📊

[![CI](https://github.com/imanali2237/CarFleet/actions/workflows/ci.yml/badge.svg)](https://github.com/imanali2237/CarFleet/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-green.svg)](https://nodejs.org/)

A production-ready Express.js logging system built with TypeScript, Winston, and Morgan. Features comprehensive request/response logging, error tracking, and automated daily log rotation.

## ✨ Features

- **🔍 Comprehensive Logging**: Request/response logging with Morgan and Winston
- **📁 Automatic Log Rotation**: Daily rotating log files with configurable retention
- **🎯 Multiple Log Levels**: Error, warn, info, http, and debug levels
- **🔒 Sensitive Data Protection**: Automatic redaction of passwords, tokens, and API keys
- **📊 Structured Logging**: JSON-formatted logs for easy parsing and analysis
- **🎨 Colorized Console Output**: Enhanced readability during development
- **⚡ TypeScript**: Fully typed for better development experience
- **🛡️ Error Tracking**: Comprehensive error logging with stack traces

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/imanali2237/CarFleet.git
cd CarFleet
npm install
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug
LOG_MAX_SIZE=20m
LOG_MAX_FILES=14d
```

## 🎯 Usage

### Development Mode

Run the server in development mode with hot reload:

```bash
npm run dev
```

### Production Build

Build the TypeScript code to JavaScript:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

### Other Commands

```bash
npm run clean        # Remove build artifacts
npm run typecheck    # Run TypeScript type checking
```

## 📁 Project Structure

```
CarFleet/
├── src/
│   ├── config/
│   │   └── logger.config.ts       # Winston logger configuration
│   ├── middlewares/
│   │   ├── requestLogger.ts       # Morgan request logging middleware
│   │   └── responseLogger.ts      # Custom response logging middleware
│   ├── utils/
│   │   └── setupLogs.ts          # Log directory setup utility
│   └── index.ts                   # Main application entry point
├── logs/                          # Generated log files (gitignored)
│   ├── error-YYYY-MM-DD.log      # Error logs
│   ├── combined-YYYY-MM-DD.log   # All logs
│   └── requests-YYYY-MM-DD.log   # HTTP request logs
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 📝 Log Files

The system generates three types of rotating log files:

- **error-[DATE].log**: Error-level logs only
- **combined-[DATE].log**: All log levels
- **requests-[DATE].log**: HTTP request/response logs

Logs are automatically rotated daily and retained for 14 days by default.

## 🔧 API Endpoints

### GET /
Returns a welcome message

```json
{
  "message": "Hello World!"
}
```

### POST /api/users
Create a new user (example endpoint)

```json
{
  "id": 1,
  "username": "johndoe",
  "message": "User created successfully"
}
```

### GET /api/error
Test endpoint that triggers an error for logging demonstration

## 🛠️ Technologies

- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Winston](https://github.com/winstonjs/winston)** - Versatile logging library
- **[Morgan](https://github.com/expressjs/morgan)** - HTTP request logger
- **[winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file)** - Log rotation transport

## 📊 Logging Features

### Automatic Sensitive Data Redaction

The logger automatically redacts sensitive fields:
- passwords
- tokens
- apiKey
- secret
- authorization
- creditCard
- ssn

### Custom Morgan Tokens

- `real-ip`: Client's real IP (handles proxies)
- `request-body`: Sanitized request body
- `query-params`: URL query parameters
- `user-id`: Authenticated user ID

### Log Levels

- `error`: Error conditions
- `warn`: Warning messages
- `info`: Informational messages
- `http`: HTTP request/response logs
- `debug`: Debug-level messages (development only)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**imanali2237**

- GitHub: [@imanali2237](https://github.com/imanali2237)

## 🙏 Acknowledgments

- Winston team for the excellent logging library
- Express.js team for the web framework
- Morgan team for HTTP logging middleware

## 📞 Support

If you have any questions or issues, please open an issue on the [GitHub repository](https://github.com/imanali2237/CarFleet/issues).

---

Made with ❤️ for efficient logging and monitoring
