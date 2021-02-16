const { json } = require('express');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Video = require('../../models/video');

router.post('/', [
],
async (req, res) => {
    try {
        console.log('este es el req.body', req.body);
        const newVideo = new Video({
            IdVideo: req.body.video
        });

        const video = await newVideo.save();
        console.log('este es el await', video);
        res.json(video);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', auth, async(req,res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async(req,res) => {
    try {
        var id = req.params.id
        const videos = await Video.find({IdVideo: id});
        
        if(!videos){
            return res.status(404).json({msg: 'Video not found'});
        }
        res.json(videos);

    } catch (error) {
        console.error(error.message);
        if(error.kind === 'IdVideo'){
            return res.status(404).json({msg: 'video not found'});
        }
        res.status(500).send('Server Error');
    }
});


router.put('/unlike/:id', auth, async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: 'Post has not yet been liked'});
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

router.post('/comment/:id',[auth,[
    check('text', 'Text is required').not().isEmpty()
]],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        var id = req.params.id;
        const user = await User.findById(req.user.id).select('-password');
        const videos = await Video.find({IdVideo: id});
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        
        videos[0].comments.push(newComment);
        await videos[0].save();
        res.json(videos);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/comment/:id', async (req, res) => {
    try {
        var id = req.params.id;
        const videos = await Video.find({IdVideo: id});
        res.json(videos[0].comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

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