var express = require('express');
var router = express.Router();
const path = require('path');
const admzip = require('adm-zip')
const fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
  const dirpath = path.resolve('./uploads/');

  // fs.readdir(dirpath, (err, files) => {
  //   files.forEach( file => {
  //     if (path.extname(file).toLowerCase() === '.png') fs.unlink( `${dirpath}/${file}`, () => {} );
  //   });
  // });

  res.render('index', { title: 'DEPT' });
});

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
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
    { name: 'txt_1' },
    { name: 'txt_2' },
    { name: 'cta' }
  ]), 
  function (req, res, next) {

    return res.send(true)
    // res.render('index');

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


