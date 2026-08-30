const mongoose = require('mongoose');

const rating = { type: Number, min: 0, max: 100 };

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Artist name is required'], unique: true, trim: true },
    slug: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    hometown: { type: String, trim: true, default: '' },
    region: { type: String, trim: true, default: '' },
    debutYear: { type: Number, min: 1900, max: 2100 },
    imageUrl: { type: String, trim: true, default: '' },
    profileImageUrl: { type: String, trim: true, default: '' },
    bio: { type: String, trim: true, default: '', maxlength: 2000 },

    // Current frontend fields are retained while the numeric game ratings evolve.
    lyricism: { type: String, default: '' },
    flow: { type: String, default: '' },
    creativity: { type: String, default: '' },
    rhythm: { type: String, default: '' },
    longevity: { type: String, default: '' },
    impact: { type: String, default: '' },
    delivery: { type: String, default: '' },
    storytelling: { type: String, default: '' },
    overallTier: { type: String, default: 'F', trim: true },

    stats: {
      lyricism: rating,
      flow: rating,
      storytelling: rating,
      production: rating,
      influence: rating,
      longevity: rating,
      commercialSuccess: rating,
      versatility: rating,
      discography: rating,
      livePerformance: rating,
      culturalImpact: rating
    },
    badges: [{ type: String, trim: true }],
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    strict: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_document, value) => {
        delete value._id;
        return value;
      }
    }
  }
);

artistSchema.pre('validate', function createSlug(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Artist', artistSchema);
