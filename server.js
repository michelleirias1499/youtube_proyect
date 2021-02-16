const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app =  express();

connectDB();

app.use(express.json({ extended: false}));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/video', require('./routes/api/video'));

//Server static assets in production
if(process.env.NODE_ENV === 'production'){
    //SET STATIC FOLDER
    app.use(express.static('youtubeclient/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'youtubeclient', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));