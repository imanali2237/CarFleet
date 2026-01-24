# Quick Setup Guide

## For First-Time Users

### 1. Clone the Repository
```bash
git clone https://github.com/imanali2237/CarFleet.git
cd CarFleet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file if needed (defaults work fine):
```env
PORT=3000
NODE_ENV=development
```

### 4. Run the Server

**Development Mode** (recommended for testing):
```bash
npm run dev
```

**Production Mode**:
```bash
npm run build
npm start
```

### 5. Test the Server

Open your browser or use curl:
```bash
# Test the main endpoint
curl http://localhost:3000/

# Test the user creation endpoint
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser"}'

# Test error logging
curl http://localhost:3000/api/error
```

### 6. Check the Logs

Logs are automatically created in the `logs/` directory:
- `error-YYYY-MM-DD.log` - Error logs only
- `combined-YYYY-MM-DD.log` - All logs
- `requests-YYYY-MM-DD.log` - HTTP requests

```bash
# View live logs
tail -f logs/combined-*.log
```

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run clean` | Remove build artifacts |
| `npm run typecheck` | Type check without building |

## Project Highlights

✅ **Auto-configured** - Works out of the box  
✅ **TypeScript** - Full type safety  
✅ **Log Rotation** - Automatic daily rotation  
✅ **Security** - Sensitive data redaction  
✅ **Production Ready** - Optimized for deployment  

## Need Help?

- Check [README.md](README.md) for detailed documentation
- See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Open an issue on GitHub for support

Happy logging! 🚀
