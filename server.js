const express = require('express');
const app = express();
const Article = require('./models/article')
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');


//Connection DB Local 
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, 
useUnifiedTopology: true})




app.set('view engine', 'ejs' )
app.use(express.urlencoded({extend:false}))

//Receive a Put Method and modify to Post in edit article 
app.use(methodOverride('_method'))



app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
        
    res.render('articles/index', {articles: articles})

})

app.use('/articles',articleRouter)

app.listen(8000)