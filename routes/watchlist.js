import express from 'express';
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from '../utils/db.js';
import { authorizeModification } from '../middleware/authorize.js';

const router = express.Router();

router.get('/:userId', (req, res) => {
  const watchlist = getWatchlist(Number(req.params.userId));

  if (watchlist === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(watchlist);
});

router.post('/:userId/movies', authorizeModification, (req, res) => {
  const movie = addMovie(Number(req.params.userId), req.body);

  if (!movie) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(201).json(movie);
});

router.put('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const updated = updateMovie(
    Number(req.params.userId),
    Number(req.params.movieId),
    req.body
  );

  if (!updated) {
    return res.status(404).json({ error: 'User or movie not found' });
  }

  res.status(200).json(updated);
});

router.delete('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const deleted = deleteMovie(
    Number(req.params.userId),
    Number(req.params.movieId)
  );

  if (!deleted) {
    return res.status(404).json({ error: 'User or movie not found' });
  }

  res.status(200).json({ message: 'Movie deleted' });
});

export default router;