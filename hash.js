const bcrypt = require('bcrypt');

async function getSalt(params) {
  const salt = await bcrypt.genSalt(10);
  const password = '12345';
  const passwordHash = await bcrypt.hash(password, salt);
  console.log(passwordHash);
}

getSalt();
