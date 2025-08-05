const { Like } = require('../models');

exports.likeArticle = async (req, res) => {
  try {
    const existing = await Like.findOne({
      where: { articleId: req.body.articleId, userId: req.user.id },
    });
    if (existing) return res.status(400).json({ message: 'Already liked' });

    const like = await Like.create({
      articleId: req.body.articleId,
      userId: req.user.id,
    });
    res.status(201).json({ like });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unlikeArticle = async (req, res) => {
  try {
    const like = await Like.findOne({
      where: { articleId: req.body.articleId, userId: req.user.id },
    });
    if (!like) return res.status(404).json({ message: 'Like not found' });

    await like.destroy();
    res.json({ message: 'Unliked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
