require('dotenv').config();
const mongoose = require('mongoose');
const connectDatabase = require('../config/db');
const Artist = require('../models/Artist');
const Badge = require('../models/Badge');

const badges = [
  { name: 'Storyteller', slug: 'storyteller', description: 'Exceptional narrative songwriting.', tier: 'gold' },
  { name: 'Wordsmith', slug: 'wordsmith', description: 'Elite command of rhyme and language.', tier: 'gold' },
  { name: 'Cultural Icon', slug: 'cultural-icon', description: 'Lasting cultural influence beyond music.', tier: 'platinum' }
];

const artists = [
  {
    name: 'Nas', hometown: 'Queens, NY', region: 'East Coast', debutYear: 1991,
    overallTier: 'S', lyricism: 'A+', flow: 'A', storytelling: 'A+', impact: 'A+', longevity: 'A+',
    badges: ['Storyteller', 'Wordsmith'],
    stats: { lyricism: 98, flow: 92, storytelling: 98, influence: 96, longevity: 95, culturalImpact: 96 }
  },
  {
    name: 'Kendrick Lamar', hometown: 'Compton, CA', region: 'West Coast', debutYear: 2003,
    overallTier: 'S', lyricism: 'A+', flow: 'A+', storytelling: 'A+', impact: 'A+', longevity: 'A',
    badges: ['Storyteller', 'Cultural Icon'],
    stats: { lyricism: 98, flow: 96, storytelling: 99, influence: 96, longevity: 89, culturalImpact: 98 }
  },
  {
    name: 'Missy Elliott', hometown: 'Portsmouth, VA', region: 'South', debutYear: 1991,
    overallTier: 'S', lyricism: 'A', flow: 'A+', creativity: 'A+', impact: 'A+', longevity: 'A',
    badges: ['Cultural Icon'],
    stats: { lyricism: 89, flow: 95, production: 96, influence: 98, longevity: 92, culturalImpact: 98 }
  }
];

async function seed() {
  await connectDatabase();
  await Badge.bulkWrite(badges.map((badge) => ({
    updateOne: { filter: { name: badge.name }, update: { $set: badge }, upsert: true }
  })));
  await Artist.bulkWrite(artists.map((artist) => ({
    updateOne: { filter: { name: artist.name }, update: { $set: artist }, upsert: true }
  })));
  console.log(`Seeded ${artists.length} artists and ${badges.length} badges.`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(`Seed failed: ${error.message}`);
  await mongoose.disconnect();
  process.exit(1);
});
