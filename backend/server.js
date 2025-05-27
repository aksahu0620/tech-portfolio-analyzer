import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import githubRoutes from './routes/github.js';
import leetcodeRoutes from './routes/leetcode.js';
import codeforcesRoutes from './routes/codeforces.js';
import mediumRoutes from './routes/medium.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/github', githubRoutes);
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/codeforces', codeforcesRoutes);
app.use('/api/medium', mediumRoutes);


app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
