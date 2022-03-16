var express = require('express');
var router = express.Router();
const path = require('path');
const admzip = require('adm-zip')
const fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
  const dirpath = path.resolve('./uploads/');
  res.render('index', { title: 'DEPT' });
});

var multer = require('multer');
let size = 'bum';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('org. size', size);
    size = req.params.size;
    console.log('new size',  size);
    cb(null, `./uploads/${size}`);
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    console.log(extension);
    cb(null, `${file.fieldname}.${extension}`);
  }
})
var upload = multer({ storage: storage })

router.post('/profile-upload-single/size/:size',
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
  console.log('zip folder size', size);

  zip.addLocalFolder(path.resolve(`uploads/${size}`));
  const name = `${size}.zip`;
  zip.writeZip(name);
  res.download(name);
});

module.exports = router;


