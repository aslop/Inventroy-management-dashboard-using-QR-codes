import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initDb } from './config/database';

// init
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: [process.env.ROOT_DOMAIN], credentials: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Import routes
app.use(routes);

// init db
initDb();

// Serve production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`🚀 Listering at http://localhost:${port}`);
});
