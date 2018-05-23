const express=require("express")
const multer=require("multer")
const fs = require("fs")
const path =require("path")


const port=8464
const app=express()
const upload = multer({ dest: 'upload/'});

app.set("views","./views")
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine","jade")
app.listen(port)

console.log("the server has started at port "+port)

app.get('/',function(req,res){
	res.render('index',{
		info:null
	})
})

app.post('/',upload.single('logo'),function(req,res){
	var file = req.file;

    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    var initData=fs.readFileSync(file.path)
    var data = new Buffer(initData).toString('base64');       
    var base64 = 'data:' + file.mimetype + ';base64,' + data;
	    
	res.render('index',{
		info:base64
	})
})

app.get('/simple',function(req,res){
	res.render('simple')
})