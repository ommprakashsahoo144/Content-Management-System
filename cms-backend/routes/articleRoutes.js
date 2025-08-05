const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authenticate = require('../middlewares/authMiddleware');


router.use(authenticate);

router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
router.put('/:id/submit', articleController.submitArticle);
router.put('/:id/review', articleController.reviewArticle); // Admin
router.get('/published/all', articleController.getPublishedArticles);
router.get('/author', articleController.getAuthorArticles);


module.exports = router;
