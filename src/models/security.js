module.exports = (mongoose) => {
  const securitySchema = new mongoose.Schema({
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
    price: {
      type: String,
    },
  }, {
    timestamps,
  });
  return mongoose.model('Security', securitySchema);
};
