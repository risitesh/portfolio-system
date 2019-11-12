class ShareManager {
  constructor(wagner) {
    this.wagner = wagner;
    this.share = this.wagner.get('Share');
  }

  async create(security, amount) {
    try {
      const result = this.share.create({ amount, averageBuyPrice: 100, securityId: security });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(shareDetails, shareId) {
    try {
      const result = await this.share.updateOne({ _id: shareId }, shareDetails);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getShares() {
    const result = await this.share.find().populate('securityId');
    return result;
  }

  async getById(shareId) {
    const result = await this.share.findById(shareId);
    return result;
  }

  async getBySecurity(securityId) {
    const result = await this.share.find({ securityId });
    return result[0];
  }
}

module.exports = ShareManager;