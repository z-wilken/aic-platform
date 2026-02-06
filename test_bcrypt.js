const bcrypt = require('bcryptjs');

async function test() {
    const password = 'AICAdmin2026!';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Hash:', hash);
    
    const isValid = await bcrypt.compare(password, hash);
    console.log('Is valid:', isValid);
}

test();
