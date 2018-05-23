(function(){
    var canvas = document.querySelector("#canvas"), 
        image = new Image(), 
        context = canvas.getContext("2d"),
        bgColors = ["#fff","#000","#f12345","#337ab7","#5cb85c","#d9534f"],
        bgColorIndex = 0;
    var imgReader = function( item ){
        var blob = item.getAsFile(),
            reader = new FileReader();
        // 读取文件后将其显示在网页中
        reader.onload = function( e ){
            insertImg(e.target.result)
        };
        // 读取文件
        reader.readAsDataURL( blob );
    };
    document.getElementById( 'pasteInput' ).addEventListener( 'paste', function( e ){
         // 添加到事件对象中的访问系统剪贴板的接口
        var clipboardData = e.clipboardData,
            i = 0,
            items, item, types;

        if( clipboardData ){
            items = clipboardData.items;
            if( !items ){
                return;
            }
            item = items[0];
            // 保存在剪贴板中的数据类型
            types = clipboardData.types || [];
            for( ; i < types.length; i++ ){
                if( types[i] === 'Files' ){
                    item = items[i];
                    break;
                }
            }
            // 判断是否为图片数据
            if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
                imgReader( item );
            }
        }
    });

    //点击设置圆角按钮，获取原尺寸图片，设置其圆角值。自用，所以设置第一个原尺寸图片。
    document.getElementById( 'setBd' ).addEventListener( 'click', function( e ){
        var img = document.querySelector(".real_size");
            
        if(img){
            context.clearRect(0, 0, canvas.width, canvas.height);
            /*img.style.borderTopLeftRadius = (bdrlt == "" ? 0 : bdrlt) +"px"
            img.style.borderTopRightRadius = (bdrrt == "" ? 0 : bdrrt) +"px"
            img.style.borderBottomRightRadius = (bdrrb == "" ? 0 : bdrrb) +"px"
            img.style.borderBottomLeftRadius = (bdrlb == "" ? 0 : bdrlb) +"px"*/
            canvas.width = img.width
            canvas.height = img.height
            image.src = img.getAttribute("src");
            draw(image);
            insertImg(canvas.toDataURL('image/png'))
        }
    })

    document.querySelector("#toPaste").onclick=function(){
        window.location.href='/'
    }

    //清除图片按钮点击，清除操作台的图片
    document.getElementById( 'clearContent' ).addEventListener( 'click', function( e ){
        var content = document.querySelector(".content"),
            imgs = content.querySelectorAll(".content img"),
            imgsArr = Array.prototype.slice.apply(imgs);
        imgsArr.forEach(function(i){
            content.removeChild(i)
        })
        setInfo()
    })

    window.onload=function(){
        document.getElementById( 'pasteInput' ).focus()
    }

    function insertImg(url){
        var img = new Image();

        img.src = url;
        img.setAttribute("class","thumb")
        document.getElementsByClassName("content")[0].insertBefore(img ,canvas);
        img.onclick=function(){
            this.className=this.className=="thumb"?"real_size":"thumb"
            setInfo()
        }
    }

    //显示信息
    function setInfo(){
        var imgArrs = Array.prototype.slice.apply(document.querySelectorAll(".real_size")),info="0*0"
        if(imgArrs.length != 0){
            var lastRealSize = imgArrs.pop();
            info = lastRealSize.width + "*" + lastRealSize.height
        }
        document.querySelector("#info").innerHTML = info
    }

    //圆角矩形
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        var min_size = Math.min(w, h);
        //if (r > min_size / 2) r = min_size / 2;
        // 开始绘制
        this.beginPath();
        this.moveTo(x + r[0], y);
        this.arcTo(x + w , y, x + w , y + h, r[1]);
        this.arcTo(x + w, y + h, x, y + h, r[2]);
        this.arcTo(x, y + h, x, y, r[3]);
        this.arcTo(x, y, x + w, y, r[0]);
        //this.stroke();
        this.closePath();
        return this;
    }
    function draw(obj) {
        // 创建图片纹理
        var pattern = context.createPattern(obj, "no-repeat");
        // 如果要绘制一个圆，使用下面代码
        //context.arc(obj.width / 2, obj.height / 2, Math.max(obj.width, obj.height) / 2, 0, 2 * Math.PI);
        // 这里使用圆角矩形
        var vallt = document.querySelector("#leftTop").value
        var valrt = document.querySelector("#rightTop").value
        var valrb = document.querySelector("#rightBottom").value
        var vallb = document.querySelector("#leftBottom").value
        var bdc = document.querySelector("#bdColor").value
        var bdw = document.querySelector("#bdWidth").value
        var bdrlt = parseInt(0+vallt),
            bdrrt = parseInt(0+valrt),
            bdrrb = parseInt(0+valrb),
            bdrlb = parseInt(0+vallb);
        context.roundRect(0, 0, obj.width, obj.height,[bdrlt,bdrrt,bdrrb,bdrlb] /*input.value * 1 || 0*/);
        
        // 填充绘制的圆
        context.fillStyle = pattern;
        context.fill();
        if(bdw!=""){
            context.lineWidth=bdw;
            context.strokeStyle=bdc==""?"red":bdc;
            context.stroke();
        }
    }
    document.querySelector("#changeBg").onclick=function(){
        if(bgColorIndex==bgColors.length-1){
            bgColorIndex=-1
        }
        document.querySelector("body").style.backgroundColor = bgColors[++bgColorIndex]
    }
})(); 