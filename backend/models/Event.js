const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required']
  },
  intId: {
    type: Number,
    required: [true, 'Event ID is required'],
    unique: true,
    index: true
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: [true, 'Destination is required']
  },
  start: {
    type: Date,
    required: [true, 'Start date is required']
  },
  end: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value >= this.start;
      },
      message: 'End date must be after or equal to start date'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for better query performance
eventSchema.index({ start: 1, end: 1 });

// Virtual for event duration
eventSchema.virtual('duration').get(function() {
  return Math.ceil((this.end - this.start) / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Event', eventSchema);