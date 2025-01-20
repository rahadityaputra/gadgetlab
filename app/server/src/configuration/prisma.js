import { PrismaClient } from '@prisma/client'
import { logger } from '../logging.js'
const prisma = new PrismaClient({
    log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
})


prisma.$on("query", (e) => {
    logger.info(e);
})

prisma.$on("error", (e) => {
    logger.error(e);
})

prisma.$on("warn", (e) => {
    logger.warn(e);
})

prisma.$on("info", (e) => {
    logger.info(e);
})


process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await prisma.$disconnect();
  console.log('Database connection closed.');
  process.exit(0);
});

export {
  prisma
}