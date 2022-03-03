var express = require('express');
var router = express.Router();
const path = require('path');
const admzip = require('adm-zip')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var multer = require('multer');

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



router.post('/profile-upload-single',

  
  upload.fields([
    { name: 'bg' },
    { name: 'cta' },
    // { name: 'txt_2' },
    // { name: 'cta' }
  ]), 
  function (req, res, next) {

    // console.log(req.body.bg);
    // console.log(JSON.stringify(req.file))
    console.log('bum')

    res.render('index');

    // res.append('bumm bummelum');
    // var response = '<a href="/">Home</a><br>'
    // response += "Files uploaded successfully.<br>"
    // response += `<img src="${req.file.path}" /><br>`
    // return res.send(response)
  })

router.post("/compress", (req, res) => {
  const zip = new admzip();

  zip.addLocalFolder(path.resolve('uploads'));
  zip.writeZip("files.zip");
  res.download('files.zip');
});

module.exports = router;


