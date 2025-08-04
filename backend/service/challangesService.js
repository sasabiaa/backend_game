const Challange = require("../model/challangesModel.js");
const User = require("../model/userModel.js");

const getAllChallanges = async (id) => {
  try {
    console.log("cekkk");
    const currentUser = await User.findById(id);
    const pickedChallanges = currentUser.completedChallanges || [];
    const result = await Challange.find();
    if (pickedChallanges.length === 0) {
      console.log("back");
      return result;
    }
    const mapping = pickedChallanges.map((challange) =>
      challange.challange._id.toString()
    );
    const filterChallange = result.filter(
      (challange) => !mapping.includes(challange._id.toString())
    );

    return filterChallange;
  } catch (error) {
    console.log(error.message);
  }
};

const getProgressChallanges = async (id) => {
  try {
    const currentUser = await User.findById(id).populate({
      path: "completedChallanges.challange",
      model: "challanges",
    });
    const mapping = currentUser.completedChallanges
      .filter((clg) => clg.status == "Progress")
      .map((clg) => {
        return {
          challange: clg.challange.name,
          point: clg.challange.point,
        };
      });
    return mapping;
  } catch (error) {
    console.log(error.message);
  }
};

const startChallanges = async (idUser, idChallanges) => {
  try {
    const challange = await Challange.findById(idChallanges);
    const user = await User.findById(idUser);
    user.completedChallanges.forEach((clg) => {
      if (clg.challange.toString() === challange._id.toString()) {
        console.log("Challanges has complete");
        throw new Error("Challanges has complete");
      }
    });

    const updated = await User.findByIdAndUpdate(idUser, {
      $push: {
        completedChallanges: {
          challange: challange._id,
        },
      },
    });
    return updated;
  } catch (error) {
    return Error(error);
  }
};

const doneChallange = async (idUser, idChallanges) => {
  try {
    const user = await User.findById(idUser);
    const challange = await Challange.findById(idChallanges);

    const find = user.completedChallanges.find((clg) => {
      console.log(`compare {${clg.challange}} with {${idChallanges}}`);
      return clg.challange.toString() === idChallanges.toString();
    });
    if (!find) {
      throw new Error("Challanges not found");
    }

    find.status = "Done";
    user.point = user.point + challange.point;
    user[challange.typeChallange_count] += 1;
    user.save();

    return user;
  } catch (error) {
    console.log(error.message);
    return Error(error);
  }
};

module.exports = {
  getAllChallanges,
  getProgressChallanges,
  startChallanges,
  doneChallange,
};
