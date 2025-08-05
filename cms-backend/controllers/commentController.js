const { Comment, Article, User } = require('../models');

// ✅ Reader adds a comment
exports.addComment = async (req, res) => {
  try {
    const { articleId, content } = req.body;

    const comment = await Comment.create({
      articleId,
      userId: req.user.id,
      content
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin views all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { parentId: null },
      include: [
        { model: User, attributes: ['firstName'] },
        { model: Article, attributes: ['title'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin replies to comment
exports.replyToComment = async (req, res) => {
  try {
    const { content, parentId } = req.body;

    const parent = await Comment.findByPk(parentId);
    if (!parent) return res.status(404).json({ message: 'Parent comment not found' });

    const reply = await Comment.create({
      articleId: parent.articleId,
      userId: req.user.id,
      parentId,
      content
    });

    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin deletes a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
