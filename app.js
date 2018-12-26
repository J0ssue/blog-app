//      RESTFUL API ROUTING APP      //
const bodyParser   = require('body-parser'),// Parser.
methodOverride     = require('method-override');
mongoose           = require('mongoose'),// DB.
express            = require('express'),// Node Lib.
PORT               = 3000, //Port
app                = express();// starts express.

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now},
});
const Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// INDEX ROUTE:
app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { blogs });
    }
  });
});

// NEW ROUTE:
app.get('/blogs/new', (req, res) => {
  res.render('new');
});

// CREATE ROUTE:
app.post('/blogs', (req, res) => {
  // Create Blog
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render('new');
    } else {
      // then, redirect
      res.redirect('/blogs');
    }
  });
});

// SHOW ROUTE:
app.get('/blogs/:id', (req, res) => {
  // find blog by id and render it:
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', { blog });
    }
  });
});

// EDIT ROUTE:
app.get('/blogs/:id/edit', (req, res) => {
  //find id of the blog to be edited
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', { blog });
    }
  });
});

// UPDATE ROUTE:
app.put('/blogs/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

// DESTROY ROUTE:
app.delete('/blogs/:id', (req, res) => {
  // destroy blog
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      // redirect somewhere
      res.redirect('/blogs');
    }
  });
});

app.listen(PORT, () => {
  console.log('Server is running in localhost:3000');
});
