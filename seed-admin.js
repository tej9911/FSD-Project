require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/eventDB');
        console.log('Connected to MongoDB');

        const username = 'tp3869@srmist.edu.in';
        const password = 'Tej@1234';

        const exists = await Admin.findOne({ username });
        if (exists) {
            console.log('Admin already exists. Updating password...');
            const salt = await bcrypt.genSalt(10);
            exists.password = await bcrypt.hash(password, salt);
            await exists.save();
        } else {
            console.log('Creating new admin...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newAdmin = new Admin({ username, password: hashedPassword });
            await newAdmin.save();
        }

        console.log('Admin seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
