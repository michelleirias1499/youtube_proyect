const { json } = require('express');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Comment = require('../../models/comment');
const User = require('../../models/user');

router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Comment({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', auth, async(req,res) => {
    try {
        const posts = await Comment.find().sort({date: -1});
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', auth, async(req,res) => {
    try {
        const post = await Comment.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: 'Comment not found'});
        }
        res.json(post);
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Comment not found'});
        }
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async(req,res) => {
    try {
        const post = await Comment.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: 'Comment not found'});
        }

        //Check on user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
        await post.remove();
        res.json({msg: 'Comment removed'});
    } catch (error) {
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Comment not found'});
        }
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.put('/like/:id', auth, async(req,res) => {
    try {
        const post = await Comment.findById(req.params.id);
        //Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Comment already like'});
        }

        post.likes.unshift({user: req.user.id});

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.put('/unlike/:id', auth, async(req,res) => {
    try {
        const post = await Comment.findById(req.params.id);
        //Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: 'Comment has not yet been liked'});
        }

        //Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Comment.findById(req.params.id);
        const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try {
        const post = await Comment.findById(req.params.id);

        //Pull out comment

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Make sure comment exist
        if(!comment){
            return res.status(404).json({msg: 'Comment does not exits'});
        }

        //Check user
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports=router;