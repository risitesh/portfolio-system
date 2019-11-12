const mongoose_delete = require('mongoose-delete');

module.exports = (mongoose) => {
  const securitySchema = new mongoose.Schema({
    name: {
      type: String,
    },
    symbol: {
      type: String,
      unique: true,
      index: true,
    },
    price: {
      type: Number,
    },
  }, {
    timestamps: true
  });
  securitySchema.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true });
  return mongoose.model('Security', securitySchema);
};
