import PostModel from "../models/Post.js";

export const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get tags",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").sort({createdAt: -1}).exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get all posts",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    ).populate('user')
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Can not find post",
          });
        }
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed to get post",
        });
      })
      
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get post",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({ _id: postId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Can not find post",
          });
        }
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Failed to remove post",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to remove post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can not edit post",
    });
  }
};
