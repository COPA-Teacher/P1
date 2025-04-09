# Express TypeScript Application

A modern Node.js application built with Express and TypeScript, featuring a comprehensive logging system.

## Features

- TypeScript support
- Winston-based logging system
- Daily log rotation with 30-day retention
- HTTP request logging
- Environment-specific logging (development/production)
- Error handling and uncaught exception logging

## Logging System Documentation

### Overview

The application uses a Winston-based logging system with:
- Console output in development
- File output in production
- Automatic log rotation and cleanup
- Type-safe logging interface

### Log Levels

| Level    | When to use |
|----------|-------------|
| error    | Critical failures |
| warn     | Unexpected but non-critical issues |
| info     | Important runtime events |
| http     | HTTP requests (auto-logged) |
| verbose  | Detailed debug information |
| debug    | Debug-level messages |
| silly    | Extremely verbose tracing |

### Usage

#### Basic Logging

```typescript
import logger from './services/logger';

// Simple log
logger.info('Application started');

// With metadata
logger.warn('Deprecated API called', { endpoint: '/old-api', user: '123' });

// Error logging
try {
  // risky operation
} catch (error) {
  logger.error('Operation failed', { error });
}
