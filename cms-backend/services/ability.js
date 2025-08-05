const { AbilityBuilder, Ability } = require('@casl/ability');


function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'ADMIN') {
    can('manage', 'all');
  }

  if (user.role === 'AUTHOR') {
    can('read', 'Article');
    can('create', 'Article');
    can('update', 'Article', { authorId: user.id });
    can('delete', 'Article', { authorId: user.id });
    can('read', 'Comment');
  }

  if (user.role === 'READER') {
    can('read', 'Article', { status: 'PUBLISHED', isDeleted: false });
    can('create', 'Comment');
    can('create', 'Like');
  }

  return build();
}

module.exports = { defineAbilitiesFor };
