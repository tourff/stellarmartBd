const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'turjo0424';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hash);
}

hashPassword();
