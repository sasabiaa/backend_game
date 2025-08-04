const User = require("../model/userModel.js");

const leaderboard = async (id) => {
  try {
    const data = await User.find().sort({ point: -1 });
    let rank = 0;
    const mapping = data.map((user) => {
      rank++;
      return {
        id: user._id,
        username: user.username,
        point: user.point,
        image: user.image,
        rank: rank,
      };
    });
    const currentUserRank = mapping.find(
      (usr) => usr.id.toString() === id.toString()
    );
    const topThree = mapping.slice(0, 3);
    const topTen = mapping.slice(3, 10);
    return { topThree, topTen, currentUserRank };
  } catch (error) {
    console.log(error.message);
    return Error(error);
  }
};

const login = async (username, password) => {
  try {
    const user = await User.find({ username: username });
    if (password !== user.password) {
      throw new Error("Password Invalid");
    }
    return user;
  } catch (error) {
    console.log(error.message);
    return Error(error);
  }
};

const register = async (username, password, email) => {};

module.exports = {
  leaderboard,
};
