const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    //    const cookies=req.cookies;

    // const {token}=cookies;
    // if(!token){
    //   throw new Error("Invalid Token")
    // }
    // //Validate my token
    // const decodedMessage= await jwt.verify(token,"DEV@Tinder$798")
    // // console.log(decodedMessage);
    // const {_id}=decodedMessage;
    // console.log("Logged In User is : " + _id);

    // const user= await User.findById(_id);
    // if(!user){
    //   throw new Error("User does not exist")
    // }
    const user = req.user;

    // console.log(cookies);
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log(loggedInUser);
    await loggedInUser.save();
    // res.send(`${loggedInUser.firstName} , your profile updated Succesfully`)
    res.json({
      message: `${loggedInUser.firstName} , your profile updated Succesfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

module.exports = profileRouter;
