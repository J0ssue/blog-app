const bodyParser = require('body-parser'),// Parser.
       mongoose   = require('mongoose'),// DB.
       express    = require('express'),// Node Lib.
       PORT       = 3000,
       app        = express();// starts express.

//  setup
// mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now},
});
// title
// image
// body
// created

app.listen(PORT, () => {
  console.log('Server is running in localhost:3000');
});