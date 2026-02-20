const bcrypt = require('bcryptjs');
const hash = '$2b$10$ivXZMq8TiUNdzFqHmwJbwOXumqVfuxa57/cKitC5XOapfKlxOP2Xu';
const password = 'AICAdmin2026!';

async function test() {
    const isValid = await bcrypt.compare(password, hash);
    console.log('Is password "AICAdmin2026!" valid?', isValid);
}

test();
