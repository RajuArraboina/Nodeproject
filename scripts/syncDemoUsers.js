const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant_db';

async function syncUsers() {
  await mongoose.connect(MONGO_URI);
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('12345678', salt);

  // Admin Account: raju@gmail.com / 12345678
  await mongoose.connection.db.collection('users').updateOne(
    { email: 'raju@gmail.com' },
    { $set: { name: 'Raju (Admin)', password: hashed, role: 'admin' } },
    { upsert: true }
  );

  // Customer Account: king@gmail.com / 12345678
  await mongoose.connection.db.collection('users').updateOne(
    { email: 'king@gmail.com' },
    { $set: { name: 'King Customer', password: hashed, role: 'user' } },
    { upsert: true }
  );

  // Customer Account: user@gmail.com / 12345678
  await mongoose.connection.db.collection('users').updateOne(
    { email: 'user@gmail.com' },
    { $set: { name: 'Demo Customer', password: hashed, role: 'user' } },
    { upsert: true }
  );

  console.log('Successfully synchronized demo accounts:');
  console.log('- Admin:    raju@gmail.com / 12345678');
  console.log('- Customer: king@gmail.com / 12345678');
  console.log('- Customer: user@gmail.com / 12345678');

  await mongoose.disconnect();
}

syncUsers();
