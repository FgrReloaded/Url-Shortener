const express = require('express');
const app = express();
const mongoose = require('mongoose');
const  shortUrl = require('./models/shortlink');
const shortId = require('shortid');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
});


app.set('view engine', 'ejs');


app.use(express.static('assets'));
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res)=>{
    const shortlinks = await shortUrl.find();
    res.render('index', {shortlinks: shortlinks});
});

app.post('/shortlink', async (req, res)=>{
    const fullLink = req.body.fullLink;
    const shortcode = shortId.generate()
    const shortLink = "https://"+req.hostname+"/"+shortcode;
    const shorted = await shortUrl.create({fullLink, shortLink, shortcode});
    // res.json({data: shorted.shortLink})
    res.redirect('/');
});

app.get('/:shorten', async (req, res)=>{
    const getshortUrl = await shortUrl.findOne({
        shortcode: req.params.shorten
    });
    if(getshortUrl){
        getshortUrl.clicks++;
        await getshortUrl.save();
        res.render('redirect', {
            getshortUrl: getshortUrl
        })
    }
});







const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running at ", port);
})