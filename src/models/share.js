module.exports = (mongoose) => {
  const shareSchema = new mongoose.Schema({
    amount: {
      type: Number,
    },
    averageBuyPrice: {
      type: Number,
    },
    securityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Security',
    },
  }, {
    timestamps: true
  });
  return mongoose.model('Share', shareSchema);
};
