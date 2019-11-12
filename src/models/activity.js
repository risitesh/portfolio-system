module.exports = (mongoose) => {
  const activitySchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['create', 'update', 'trade'],
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
    shareId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Share',
    },
  }, {
    timestamps: true
  });
  return mongoose.model('Activity', activitySchema);
};
