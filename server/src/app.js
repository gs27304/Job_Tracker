import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import env from './config/env.js';

const app = express();

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false });

app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanClientUrl = env.clientUrl ? env.clientUrl.replace(/\/+$/, '') : '';
    const allowed = [cleanClientUrl, 'http://localhost:5173', 'http://localhost:3000'].filter(Boolean);
    if (allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: env.nodeEnv });
});

console.log(
  'AUTH ROUTES:',
  authRoutes.stack?.map(route => ({
    path: route.route?.path,
    methods: route.route?.methods
  }))
);

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorMiddleware);

export default app;
