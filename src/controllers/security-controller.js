class SecurityController {
  constructor(wagner) {
    this.wagner = wagner;
    this.securityManager = this.wagner.get('SecurityManager');
    this.shareManager = this.wagner.get('ShareManager');
    this.activityManager = this.wagner.get('ActivityManager');
  }

  async getTrade() {
    try {
      const securityDetails = this.security;
      const shareDetails = await this.shareManager.getBySecurity(securityDetails.id);
      const activityDetials = await this.activityManager.getByShare(shareDetails.id);
      const securityTrade = {
        companyName: securityDetails.name,
        companyShortName: securityDetails.symbol,
      };
      const details = [];
      activityDetials.forEach((activity) => {
        const activityData = JSON.parse(activity.value);
        const activityResponse = {};
        if (activity.type == 'create') {
          activityResponse.state = 'Created';
          activityResponse.buyPrice = activityData.price;
        } else if (activity.type == 'trade') {
          activityResponse.state = 'Trading Data';
          activityResponse.amount = activityData.amount;
          activityResponse.price = activityData.price;
        } else {
          activityResponse.state = 'Updated';
          activityResponse.amount = activityData.amount;
          activityResponse.averageBuyPrice = activityData.averageBuyPrice;
        }
        details.push(activityResponse);
      });
      securityTrade.details = details;
      return { code: 200, data: securityTrade };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async addTrade(params) {
    try {
      const createParams = params;
      if(!createParams.price) {
        createParams.price = 100;
      }
      const result = await this.securityManager.create(params);
      const shareDetails = await this.shareManager.create(result.id, 1);
      const activityDetails = {
        type: 'create',
        result: JSON.stringify(result),
      }
      this.activityManager.create(activityDetails, shareDetails.id);
      const response = {
        id: result.id
      }
      return { code: 201, data: response };
    } catch(error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async updateTrade(params) {
    try{
      const updateParams = params;
      updateParams.amount = parseInt(updateParams.amount);
      updateParams.price = parseFloat(updateParams.price);
      const securityDetails = this.security;
      const shareDetails = await this.shareManager.getBySecurity(securityDetails.id);
      const oldActivityDetails = {
        type: 'trade',
        result: JSON.stringify({ amount: updateParams.amount, price: updateParams.price}),
      };
      this.activityManager.create(oldActivityDetails, shareDetails.id);
      const averagePrice = ((shareDetails.averageBuyPrice * shareDetails.amount + updateParams.amount * updateParams.price)) / (updateParams.amount + shareDetails.amount);
      const detailsToUpdate = {
        amount: shareDetails.amount + updateParams.amount,
        averageBuyPrice: averagePrice.toFixed(2)
      };
      await this.shareManager.update(detailsToUpdate, shareDetails.id);
      const result = await this.shareManager.getById(shareDetails.id);
      const activityDetails = {
        type: 'update',
        result: JSON.stringify(result),
      }
      this.activityManager.create(activityDetails, shareDetails.id);
      return { code: 202, data: {} };
    } catch(error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async getTrades() {
    try {
      const trades = await this.shareManager.getShares();
      const allTrade = [];
      trades.forEach( (trade) => {
        const detail = {};
        detail.companyName = trade.securityId.name;
        detail.companyShortName = trade.securityId.symbol;
        detail.currentShares = trade.amount;
        detail.averageBuyPrice = trade.averageBuyPrice;
        allTrade.push(detail);
      });
      return { code: 200, data: allTrade };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async getCumulativeReturn() {
    try {
      const trades = await this.shareManager.getShares();
      let cumulativePrice = 0;
      trades.forEach( (trade) => {
        cumulativePrice = cumulativePrice + ((trade.securityId.price - trade.averageBuyPrice) * trade.amount);
      });
      const responseDetails = {
        cumulativePrice
      }
      return { code: 200, data: responseDetails };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }

  async deleteTrade() {
    try {
      const securityDetails = this.security;
      const result = this.securityManager.delete(securityDetails.id);
      return { code: 200, data: {} };
    } catch (error) {
      error.status = error.status || 400;
      return { code: error.status, data: { message: error.message } };
    }
  }
}

module.exports = SecurityController;