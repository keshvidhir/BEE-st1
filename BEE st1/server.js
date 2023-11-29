const express=require('express');
const mongoose=require('mongoose');
const movieRoutes=require('./routes/movieRoutes.js');
const reviewRoutes=require('./routes/reviewRoutes.js');
const app=express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/movieDB', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
app.use('/api/movies', movieRoutes);
app.use('/api/movies/:movieId/reviews', reviewRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
}
const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');
const paginateResults = require('../middlewares/pagination');
router.get('/', paginateResults(Movie), async (req, res) => {
    res.json(res.paginatedResults);
});
module.exports = router;