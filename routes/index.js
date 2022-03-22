var express = require('express');
var router = express.Router();
const path = require('path');
const admzip = require('adm-zip')
const fs = require('fs');
const glob = require("glob");
const parse = require('node-html-parser').parse;



/* GET home page. */
router.get('/', function (req, res, next) {
  const dirpath = path.resolve('./uploads/');
  res.render('index', { title: 'DEPT' });
});

var multer = require('multer');
// const { createInflateRaw } = require('zlib');
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
    fs.copyFile(`templates/tem_${size}.html`, `uploads/${size}/${size}.html`, (err) => {
      console.log('copy done');
    })
    return res.send(true)
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

router.get("/delete-files", (req, res) => {
    // const dir = "uploads/**/*.!(html)";
    const dir = "uploads/**/*.*";
    const zip = "*.zip";

    function bum(files) {
      files.forEach(file => {
        fs.unlink(file, (err) => {
          if (err) throw err;
        });
      })
    }

    glob(zip, {}, function (er, files) {
      bum(files);
    })
        
    glob(dir, {}, function (er, files) {
      bum(files);
    })

    return res.send(true)
})

router.get("/modify-file", (req, res) => {
  // const animPath = 'animations/';
  const bufferAnim = fs.readFileSync('animations/opacity.js');
  const fileContentAnim = bufferAnim.toString();
  // console.log(fileContentAnim);
  const bufferCss = fs.readFileSync('animations/opacity.css');
  const fileContentCss = bufferCss.toString();
  // console.log(fileContentCss);
  createFile(fileContentAnim, fileContentCss);
  return res.send(true)
})

function createFile(fileContentAnim, fileContentCss) {
  fs.readFile('templates/tem_300x600.html', 'utf8', (err,html)=>{
    // fs.readFile(`templates/tem_${size}.html`, 'utf8', (err,html)=>{
      if(err){
        throw err;
      }
      
      console.log(size);
      const root = parse(html);
      const script = root.querySelector('#animation');
      script.innerHTML = fileContentAnim;
      
      const ctaAnim = root.querySelector("#animationCss");
      ctaAnim.innerHTML = fileContentCss;
      const newFile = root.toString();
      fs.writeFile(`uploads/${size}/${size}.html`, newFile, (err) => {
        if (err) throw err;
      })
    }) 

  }