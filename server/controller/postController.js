const ResHelper = require("../helpers/ResHelper");
const Review = require("../models/Review");
const Comment = require("../models/Comment");
const Favorite = require("../models/Favorite");
const Followed = require("../models/Followed");
const violent = require("../../violent.json");
const User = require("../models/User");
const Report = require("../models/Report");
module.exports = {
  // for review
  postReview: (req, res) => {
    const {
      reviewTitle,
      reviewDescription,
      reviewContent,
      category,
      imageLink,
    } = req.body;
    if (!reviewTitle) {
      return ResHelper.fail(res, "review title is required!");
    }
    if (!reviewContent) {
      return ResHelper.fail(res, "review content is required!");
    }
    if (!category) {
      return ResHelper.fail(res, "category is required!");
    }

    console.log(req.user);
    const newReview = Review({
      userId: req.user._id,
      reviewTitle,
      reviewDescription,
      reviewContent,
      category,
      imageLink,
    });

    newReview
      .save()
      .then((review) => {
        ResHelper.success(res, {
          message: "Post successful!",
          review,
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getReviewsCount: async (req, res) => {
    Review.countDocuments()
      .then((reviews) => ResHelper.success(res, reviews))
      .catch((err) => ResHelper.error(res, err));
  },
  getReviews: (req, res) => {
    const { filter, word, category, sortBy, direction, offset } = req.query;
    //console.log(filter);

    //no category
    if (filter === "") {
      // All review
      if (word === "") {
        Review.find()
          .sort({ reviewDatetime: 1 })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) => {
            ResHelper.success(res, { review: reviews, count: reviews.length });
          })
          .catch((err) => ResHelper.error(res, err));
      }
      // search review & no category
      else {
        if (!sortBy.localeCompare("reviewDatetime"))
          Review.find({ reviewTitle: { $regex: new RegExp("^" + word, "i") } })
            .sort({ reviewDatetime: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        else if (!sortBy.localeCompare("view")) {
          Review.find({ reviewTitle: { $regex: new RegExp("^" + word, "i") } })
            .sort({ view: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        }
      }
    }
    //category
    else if (filter === "category") {
      if (word === "") {
        if (!sortBy.localeCompare("reviewDatetime"))
          Review.find({ category: category })
            .sort({ reviewDatetime: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        else if (!sortBy.localeCompare("view")) {
          Review.find({ category: category })
            .sort({ view: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        }
      } else {
        if (!sortBy.localeCompare("reviewDatetime"))
          Review.find({
            category: category,
            reviewTitle: { $regex: new RegExp("^" + word, "i") },
          })
            .sort({ reviewDatetime: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        else if (!sortBy.localeCompare("view")) {
          Review.find({
            category: category,
            reviewTitle: { $regex: new RegExp("^" + word, "i") },
          })
            .sort({ view: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        }
      }
    }
  },
  getReviewInfo: (req, res) => {
    const reviewId = req.query.reviewId;
    // console.log(reviewId);
    Review.findOne({ _id: reviewId })
      .then((reviews) => {
        console.log(reviews);
        ResHelper.success(res, { reviewInfo: reviews });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  deleteReview: (req, res) => {
    const reviewId = req.query.reviewId;
    Review.deleteOne({ _id: reviewId })
      .then((reviews) => ResHelper.success(res, { review: reviews }))
      .catch((err) => ResHelper.error(res, err));
  },
  // ---------- //
  postComment: (req, res) => {
    const { reviewId, commentContent } = req.body;
    if (!reviewId) {
      return ResHelper.fail(res, "review ID is required!");
    }
    if (!commentContent) {
      return ResHelper.fail(res, "comment content is required!");
    }

    const newComment = Comment({
      userId: req.user._id,
      reviewId,
      commentContent,
    });
    newComment
      .save()
      .then(() => {
        ResHelper.success(res, {
          message: "Post successful!",
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getComments: (req, res) => {
    const reviewId = req.query.reviewId;
    console.log("HERE", reviewId);
    Comment.find({ reviewId: reviewId })
      .then((comments) =>
        ResHelper.success(res, { comment: comments, count: comments.length })
      )
      .catch((err) => ResHelper.error(res, err));
  },
  // favorite
  postFavorite: (req, res) => {
    const { reviewId, score } = req.body;
    if (!reviewId) {
      return ResHelper.fail(res, "review ID is required!");
    }
    if (!score) {
      return ResHelper.fail(res, "score is required!");
    }
    const newFavorite = Favorite({
      userId: req.user._id,
      reviewId,
<<<<<<< HEAD
    });
    newFavorite
      .save()
=======
      score,
    })
    newFavorite.save()
>>>>>>> f865f21b4eb2ac06adb27d464b037c1cb70a18c5
      .then(() => {
        ResHelper.success(res, {
          message: "Post successful!",
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getFavorite: (req, res) => {
    const reviewId = req.query.reviewId;
    Favorite.find({ _id: reviewId })
      .then((favorites) =>
        ResHelper.success(res, { favorite: favorites, count: favorites.length })
      )
      .catch((err) => ResHelper.error(res, err));
  },
  getFavoriteScore: (req, res) => {
    const { userId, reviewId } = req.query;
    Favorite.findOne({ "userId": userId, "reviewId": reviewId }, { _id: 0, score: 1 })
    .then((favorites) => ResHelper.success(res, { favoriteScore: favorites })
    ).catch((err) => ResHelper.error(res, err));
  },
  // --------- //
  getFolloweds: (req, res) => {
    Followed.find({ userId: req.user._id })
      .then((followeds) =>
        ResHelper.success(res, { followed: followeds, count: followeds.length })
      )
      .catch((err) => ResHelper.error(res, err));
  },
  postReport: (req, res) => {
    const { reviewId, reportReason } = req.body;
    console.log(reportReason);
    if (!reviewId) {
      return ResHelper.fail(res, "review ID is required!");
    }
    if (!reportReason) {
      return ResHelper.fail(res, "report reason is required!");
    }
    const newReport = Report({
      reviewId,
      reportReason,
    });
    newReport
      .save()
      .then(() => {
        ResHelper.success(res, {
          message: "Post successful!",
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  // for manager
  getReport: (req, res) => {
    Report.find()
      .sort({ reportDatetime: -1 })
      .then((reports) => ResHelper.success(res, { report: reports }))
      .catch((err) => ResHelper.error(res, err));
  },
  // -------- //
  // for admin
  getReviwer: (req, res) => {
    const { name } = req.query;
    var allUser = User.find({
      firstName: { $regex: new RegExp("^" + name, "i") },
    });
    console.log(allUser + res);
  },
  // ------- //
  violentRegconition: (req, res) => {
    const { reviewTitle, reviewDescription, reviewContent } = req.query;
    var i;
    var thaiTitleReplace, thaiDescriptionReplace, thaiContentReplace;
    // var engTitleReplace, engDescriptionReplace, engContentReplace;
    for (i = 0; i < (violent.Thai.word).length; i++){
      thaiTitleReplace = reviewTitle.replace(violent.Thai.word[i], ";;");
      thaiDescriptionReplace = reviewDescription.replace(violent.Thai.word[i], ";;");
      thaiContentReplace = reviewContent.replace(violent.Thai.word[i], ";;");
    }
    console.log(thaiTitleReplace);
    console.log(thaiDescriptionReplace);
    console.log(thaiContentReplace);
    console.log(res);
    // for (i = 0; i < 10; i++){
    //   engTitleReplace = reviewTitle.replace("", "[]");
    //   engDescriptionReplace = reviewDescription.replace("", "[]");
    //   engContentReplace = reviewContent.replace("", "[]");
    // }
  },
};
