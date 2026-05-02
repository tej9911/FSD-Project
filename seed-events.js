require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/eventDB');
        console.log('Connected to MongoDB');

        // Clear existing events
        await Event.deleteMany({});

        const events = [
            {
                title: '24-Hour Hackathon',
                description: 'Build innovative solutions in our flagship coding competition. Collaborate with peers and win exciting prizes!',
                category: 'Technical',
                date: new Date('2025-11-15'),
                capacity: 100,
                imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1200&q=80'
            },
            {
                title: 'Dance Competition',
                description: 'Showcase your dance moves and win exciting prizes and recognition from top judges.',
                category: 'Cultural',
                date: new Date('2025-11-20'),
                capacity: 50,
                imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'
            },
            {
                title: 'Code Quest',
                description: 'Competitive programming challenge for students. Prove your logic and problem-solving skills.',
                category: 'Technical',
                date: new Date('2025-11-25'),
                capacity: 200,
                imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
            }
        ];

        await Event.insertMany(events);
        console.log('Events seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding events:', err);
        process.exit(1);
    }
};

seedEvents();
