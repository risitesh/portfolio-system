class SecurityManager {
  constructor(wagner) {
    this.wagner = wagner;
    this.security = this.wagner.get('Security');
  }

  async create(createData) {
    try {
      const tagSymbol = await this.getByTag(createData.symbol);
      if(!tagSymbol) {
        const result = await this.security.create(createData);
        return result;
      } else {
        throw new Error('Already exists');
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    const security = await this.security.findById(id);
    return security;
  }

  async getByTag(tagName) {
    const tag = await this.security.findOne({symbol: tagName});
    return tag;
  }

  async delete(id) {
    const trade = await this.security.delete({}, id);
    return trade;
  }
}

module.exports = SecurityManager;