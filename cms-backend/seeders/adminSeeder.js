const { User } = require('../models');
const bcrypt = require('bcrypt');

async function createAdmin() {
  const admin = await User.findOne({ where: { email: 'admin@cms.com' } });
  if (admin) return console.log('✅ Admin already exists');

  const password = await bcrypt.hash('admin123', 10);

  await User.create({
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@cms.com',
    password,
    mobileNumber: '9999999999',
    role: 'ADMIN'
  });

  console.log('✅ Admin seeded');
}

createAdmin();
