import express from 'express';
import path from 'path';

// init
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

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
