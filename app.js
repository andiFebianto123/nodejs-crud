const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const path = require('path');
const viewData = require('./modules-view');

// mongodb
const dbURI = "mongodb+srv://nodeandi:membelakebenaran***@node-test.yn2cmdc.mongodb.net/node-tuts?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(dbURI)
.then((result) => app.listen(8080))
.catch((err) => console.log(err));

// models
const Blog = require('./models/blog');

// register view enggine
app.set('view engine', 'ejs');
// register static folder
app.use(express.static(__dirname + '/public'));
// url encode
app.use(express.urlencoded({extended: true}));
// register middleware dengan morgan
var accessLogStream = fs.createWriteStream(path.join('access.log'), {flags: 'a'});
app.use(morgan('combined', {stream:accessLogStream}));


app.get('/', (req, res) => {
    res.render(
        'index',  // view template
    {
        ...viewData.data,
        title: 'Node :: HOME',
        active_menu: 'home',
    });    
});

app.get('/about', (req, res) => {
    res.render('about', {
        ...viewData.data,
        active_menu: 'about',
        title: 'Node :: About Us',
    });
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// url:/blog/create
app.get('/blog/create', (req, res) => {
    res.render('create-blog', {
        ...viewData.data,
        active_menu: 'blog',
        title: 'Node :: create blog',
    });
});
// post request
app.post('/blog/create', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blog');
    }).catch((err) => {
        console.log(err);
    })
});

app.get('/blog/:id/edit', (req, res) => {
    Blog.findById(req.params.id || '')
    .then((result) => {
        res.render('create-blog', {
            ...viewData.data,
            active_menu: 'blog',
            title: 'Node :: edit blog',
            data: result,
        });
    }).catch((err) => console.log(err));
});

app.post('/blog/:id/update', async (req, res) => {
    Blog.findById(req.params.id)
    .then((blog) => {
        blog.title = req.body.title;
        blog.snippet = req.body.snippet;
        blog.body = req.body.body;
        // save return
        return blog.save();
    })
    .then((r) => {
        console.log('waiting...');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(r);
            }, 9000);
        });
    })
    .then((result) => {
        res.redirect('/blog');
    })
    .catch(err => {
        console.log('error message : ', err)
        res.redirect('/blog');
    });
});

app.get('/blog/:id/delete', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.redirect('/blog');
    }).catch(err => console.log(err));
});

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'Hello world 2',
        snippet: 'why is hello world',
        body: 'hello world is first statement to write in progammer learning',
    });
    blog.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/blog', (req, res) => {
    Blog.find()
    .then((result) => {
        res.render('blog', {
            ...viewData.data,
            active_menu: 'blog',
            title: 'Node :: blogs',
            data: result,
        })
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('63b3ed9b292aead8dd49b924')
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});



app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})