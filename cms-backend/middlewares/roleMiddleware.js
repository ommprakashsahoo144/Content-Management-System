const { defineAbilitiesFor } = require('../services/ability');
const { ForbiddenError } = require('@casl/ability');

const checkPermission = (action, subject) => {
  return (req, res, next) => {
    const ability = defineAbilitiesFor(req.user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Access denied' });
    }
  };
};

module.exports = checkPermission;
