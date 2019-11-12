class ActivityManager {
  constructor(wagner) {
    this.wagner = wagner;
    this.activity = this.wagner.get('Activity');
  }

  async create(activityDetails, shareId) {
    await this.activity.create({ type: activityDetails.type, value: activityDetails.result, shareId});
  }

  async getByShare(shareId) {
    const result = await this.activity.find({ shareId }).select(['value', 'type']).sort({ createdAt: 1 });
    return result;
  }
}

module.exports = ActivityManager;