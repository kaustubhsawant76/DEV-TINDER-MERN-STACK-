const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { replaceOne } = require("../models/user");
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      //    }).populate("fromUserId",["firstName","lastName"]);
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data Fetched Successfully",
      data: connectionRequests,
    });
  } catch (error) {
    req.statusCode(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //Kaustubh ==> Elon ==> accepted
    //Elon ==> Dhoni ==> accepted
    //toUserId and fromUserId should be accepted

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }

      return row.fromUserId;
    });

    res.json({ data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //User should see all the user cards except
    //0-his own card
    //1-his connections
    //2-ignored people
    //3-already sent the connection request

    //Example:Rahul=[Mark,Donald,MS Dhoni,Virat]
    //R->Kaustubh->rejected  R->Elon->Accepted
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //Find all connectionn Requests(sent + received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    // .populate("fromUserId","firstName").populate("toUserId","firstName");

    const hiddenUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hiddenUsersFromFeed.add(req.fromUserId.toString());
      hiddenUsersFromFeed.add(req.toUserId.toString());
    });

    // console.log(hiddenUsersFromFeed);

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;

//Pagination logic

// /feed?page=1&limit=10 -> 1-10 => .skip(0).limit(10)

// /feed?page=2&limit=10 -> 11-20 => .skip(10).limit(10)

// /feed?page=3&limit=10 -> 21-30 => .skip(20).limit(10)

//skip =(page-1)*limit;
