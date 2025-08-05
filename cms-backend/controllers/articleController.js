// ✅ Declare imports ONCE at the top
const { Article, User, Comment, Like } = require('../models');

// ✅ Author creates article
exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.create({
      title,
      content,
      authorId: req.user.id,
    });
    res.status(201).json({ article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Author updates own article
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article || article.authorId !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized or not found' });

    article.title = req.body.title;
    article.content = req.body.content;
    await article.save();

    res.json({ message: 'Article updated', article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Author soft-deletes own article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article || article.authorId !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized or not found' });

    article.isDeleted = true;
    await article.save();

    res.json({ message: 'Article soft-deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Author submits article
exports.submitArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article || article.authorId !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized or not found' });

    article.status = 'SUBMITTED';
    await article.save();

    res.json({ message: 'Article submitted for review' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin approves/rejects article
exports.reviewArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    article.status = req.body.status === 'APPROVED' ? 'PUBLISHED' : 'REJECTED';
    article.approvedBy = req.user.id;
    await article.save();

    res.json({ message: `Article ${article.status.toLowerCase()}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Reader sees published articles + comments + replies
exports.getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { status: 'PUBLISHED', isDeleted: false },
      include: [
        { model: User, as: 'author', attributes: ['firstName', 'lastName'] },
        {
          model: Comment,
          where: { parentId: null }, // root comments only
          required: false,
          include: [
            { model: User, attributes: ['firstName'] },
            {
              model: Comment,
              as: 'Replies',
              required: false,
              include: [{ model: User, attributes: ['firstName'] }]
            }
          ]
        },
        { model: Like }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get current author's own articles
exports.getAuthorArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: {
        authorId: req.user.id,
        isDeleted: false
      }
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
