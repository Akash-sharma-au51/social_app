const Posts = require('../models/postModal');

const createpost = async (req, res) => {
    try {
        const { title, description, likes, comments } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required",
                success: false
            });
        }

        const newpost = new Posts({
            title,
            description,
            likes: likes || 0, 
            comments: comments || [] 
        });

        const savedpost = await newpost.save(); 

        return res.status(201).json({
            message: "Post created successfully",
            success: true,
            post: savedpost
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const deletepost = async (req, res) => {
    try {
        const { id: postid } = req.params; 

        if (!postid) {
            return res.status(400).json({
                message: "Post ID is required",
                success: false
            });
        }

        const deletedpost = await Posts.findByIdAndDelete(postid);

        if (!deletedpost) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully",
            success: true,
            post: deletedpost
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find();

        if (posts.length === 0) {
            return res.status(404).json({
                message: "No posts found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Posts fetched successfully",
            success: true,
            posts
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

module.exports = { createpost, deletepost, getAllPosts };
