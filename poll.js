const updateHistory = require('./functions/updateHistory');
const User = require('./models/User');

module.exports = async () => {
  try {
    const users = await User.find({
      doNotTrack: false,
      inactiveAt: { $gte: Date.now() }
    });
    if (users.length > 0) {
      const result = await Promise.allSettled(
        users.map(userE => updateHistory(null, userE.spID))
      );
      const report = `Update conducted at ${new Date()} yielded ${
        result.filter(resultE => resultE.status === 'rejected').length > 0
          ? result.filter(resultE => resultE.status === 'rejected').length
          : 'no'
      } errors`;
      console.log(report);
    }
  } catch (err) {
    console.error(err);
  }
};
