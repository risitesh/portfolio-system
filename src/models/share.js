module.exports = (mongoose) => {
  const shareSchema = new mongoose.Schema({
    amount: {
      type: String,
    },
    securityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Security',
    },
  }, {
    timestamps,
  });
  return mongoose.model('Security', shareSchema);
};
