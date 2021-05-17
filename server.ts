import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes';
import { initDb } from './config/database';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Init dotenv
dotenv.config();

// init
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// Init cors
app.use(cors({ origin: [process.env.ROOT_DOMAIN], credentials: true }));

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
