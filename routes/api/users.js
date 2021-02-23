const express = require('express');
 const router = express.Router();
 const {check, validationResult} = require('express-validator');
 const User = require('../../models/user');
 const gravatar = require('gravatar');
 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken');
 const config = require('config');
 const auth = require('../../middleware/auth');
 const Video = require('../../models/video');

 router.post('/', [
     check('name', 'Name is required').not().isEmpty(),
     check('email', 'Please include a valid email').isEmail(),
     check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
     check('description', 'A little description is required').not().isEmpty(),
 ], async(req, res) => {
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, description} = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            res.status(400).json({errors: [{msg: 'User already exits'}]});
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email, 
            avatar,
            password,
            description
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) =>{
                if(err) throw err;
                res.json({token});
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

router.get('/me', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -date');
        res.json(user);
    } catch (err) {
        console.log(err.message); 
        res.status(500).send('Server Error');
    }
});

router.put('/like/:id', auth, async(req,res) => {
    try {
        id=req.params.id;
        const videolike = await Video.find({IdVideo: id});
        //Check if the post has already been liked
        if(videolike.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Post already like'});
        }

        post.likes.unshift();

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports=router;

 