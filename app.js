const bodyParser = require('body-parser'),// Parser.
       mongoose   = require('mongoose'),// DB.
       express    = require('express'),// Node Lib.
       PORT       = 3000,
       app        = express();// starts express.

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log('Server is running in localhost:3000');
});