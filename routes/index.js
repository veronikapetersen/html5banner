var express = require('express');
var router = express.Router();
const path = require('path');
const admzip = require('adm-zip')
const fs = require('fs');
const glob = require("glob");
const parse = require('node-html-parser').parse;


router.get('/', function (req, res, next) {
  const dirpath = path.resolve('./uploads/');
  res.render('index', { title: 'DEPT' });
});

var multer = require('multer');
let size = null;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('req.params.size', req.params.size);
    size = req.params.size;
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
  }
)

router.post("/compress", (req, res) => {
  const zip = new admzip();
  console.log('zip folder size', size);

  zip.addLocalFolder(path.resolve(`uploads/${size}`));
  const name = `${size}.zip`;
  zip.writeZip(name);
  res.download(name);
});



router.get("/delete-files", (req, res) => {
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



router.get('/animations/:animation', (req, res) => {
  animation = req.params.animation;

  //get the animation JS
  const bufferJS = fs.readFileSync(`animations/${animation}.js`);
  const fileContentJS = bufferJS.toString();

  // get the animation CSS
  const cssFile = `animations/${animation}.css`;
  let fileContentCss;

  if (fs.existsSync(cssFile)) {
    const bufferCss = fs.readFileSync(cssFile);
    fileContentCss = bufferCss.toString();
  } else {
    console.log("no css file found");
    fileContentCss = "";
  }

  createFile(fileContentJS, fileContentCss);
  return res.send(true)
})

function createFile(fileContentJS, fileContentCss) {
  // fs.readFile('templates/tem_300x600.html', 'utf8', (err,html)=>{
  fs.readFile(`templates/tem_${size}.html`, 'utf8', (err, html) => {
    if (err) {
      throw err;
    }

    console.log(size);
    const root = parse(html);
    const script = root.querySelector('#animation');
    script.innerHTML = fileContentJS;

    const ctaAnim = root.querySelector("#animationCss");
    ctaAnim.innerHTML = fileContentCss;
    const newFile = root.toString();
    fs.writeFile(`uploads/${size}/${size}.html`, newFile, (err) => {
      if (err) throw err;
    })
  })
}



router.get("/noanim", (req, res) => {
  fs.readFile(`uploads/${size}/${size}.html`, 'utf8', (err, html) => {
    console.log("success");
    const root = parse(html);
    const script = root.querySelector('#animation');
    script.innerHTML = '';
    const ctaAnim = root.querySelector("#animationCss");
    ctaAnim.innerHTML = '';
    const newFile = root.toString();

    if (err) {
      throw err;
    }

    fs.writeFile(`uploads/${size}/${size}.html`, newFile, (err) => {
      if (err) throw err;
    })
  })
  return res.send(true)
})

module.exports = router;