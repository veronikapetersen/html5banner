var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log('bum', file);
    // console.log('req bg',req.body.bg);
    const extension = file.originalname.split('.').pop();
    // console.log(extension);
    cb(null, `${file.fieldname}.${extension}`);
  }
})
var upload = multer({ storage: storage })



router.post('/profile-upload-single', upload.fields([{name: 'image'}, {name: 'bg'}]), function (req, res, next) {
  
  // console.log(req.body.bg);
  // console.log(JSON.stringify(req.file))
  return;

  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})

module.exports = router;


