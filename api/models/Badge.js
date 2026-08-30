const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Badge name is required'], unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, default: '' },
    icon: { type: String, trim: true, default: '' },
    tier: { type: String, trim: true, default: '' },
    rarity: { type: String, trim: true, default: '' },
    category: { type: String, trim: true, default: '' }
  },
  {
    timestamps: true,
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

badgeSchema.pre('validate', function createSlug(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Badge', badgeSchema);
