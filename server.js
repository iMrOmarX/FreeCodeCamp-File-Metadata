var express = require('express');
var cors = require('cors');

const body_parser = require("body-parser")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

require('dotenv').config()

var app = express();

app.use(body_parser.urlencoded({extended: false}))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

let getMetadata = async (file) => {
    return file;
}
app.post("/api/fileanalyse" , upload.single('upfile'), async (req,res) => {
  let metadata = await getMetadata(req.file)
  res.send({
    name: metadata.originalname,
    size: metadata.size,
    type: metadata.mimetype
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
