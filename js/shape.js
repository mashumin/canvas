function shape(canvas,cope,cobj,dataobj,x,y){
    this.canvas=canvas;
    this.cobj=cobj;
    this.cope=cope;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.fillStyle="#000"; //填充
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.type="line";
    this.style="stroke";
    this.arr=[];
    this.biannum="5";
    this.jiaonum=5;
    this.isback=true;
    this.xpsize=20;
    this.isxp=true;
    var img=[];
    this.dataobj=dataobj;
    this.x=x;
    this.y=y;
}
    shape.prototype={
        init:function(){
            this.cobj.strokeStyle=this.strokeStyle;
            this.cobj.fillStyle=this.fillStyle;
            this.cobj.lineWidth=this.lineWidth;
        },
        draw:function(){
            var that=this;
            this.cope.onmousedown=function(e){
                
                var starex=e.offsetX;
                var starey=e.offsetY;
                that.cope.onmousemove=function(e){
                    that.isback=true;
                    that.init();
                    var endx=e.offsetX;
                    var endy=e.offsetY;

                    that.cobj.clearRect(0,0,that.width,that.height);
                    if(that.arr.length>0){
                        that.cobj.putImageData(that.arr[that.arr.length-1],0,0);
                    }
                   
                    
                    that[that.type](starex,starey,endx,endy);
                }
                that.cope.onmouseup=function(){
                    that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                    that.cope.onmousemove=null;
                    that.cope.onmouseup=null;
                }
            }
        },
        line:function(x,y,x1,y1){
            this.cobj.beginPath();
            this.cobj.moveTo(x,y);
            this.cobj.lineTo(x1,y1);
            this.cobj.stroke();
        },
        rect:function(x,y,x1,y1){
            this.cobj.beginPath();
            this.cobj.rect(x,y,x1-x,y1-y);
            this.cobj[this.style]();
        },
        arc:function(x,y,x1,y1){
            this.cobj.beginPath();
            var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            this.cobj.arc(x,y,r,0,Math.PI * 2);
            this.cobj[this.style]();
        },
        bian:function(x,y,x1,y1){
            var angle=360/this.biannum*Math.PI/180;
            var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            this.cobj.beginPath();
            for(var i=0;i<this.biannum;i++){
                this.cobj.lineTo(Math.cos(angle*i)*r+x,Math.sin(angle*i)*r+y);
            }
            this.cobj.closePath();
            this.cobj[this.style]();
        },
        jiao:function(x,y,x1,y1){
            var angle=360/(2*this.jiaonum)*Math.PI/180;
            var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            var r1=r/3;
            this.cobj.beginPath();
            for(var i=0;i<this.jiaonum*2;i++) {
                if (i % 2 == 0) {
                    this.cobj.lineTo(Math.cos(angle * i) * r + x, Math.sin(angle * i) * r + y);
                }else{
                    this.cobj.lineTo(Math.cos(angle * i) * r1 + x, Math.sin(angle * i) * r1 + y);
                }
            }
            this.cobj.closePath();
            this.cobj[this.style]();
        },
        pan:function(){
            var that=this;
            this.cope.onmousedown=function(e){
                that.isback=true;
                var starex=e.offsetX;
                var starey=e.offsetY;
                that.cobj.beginPath();
                that.cobj.moveTo(starex,starey);
                that.cope.onmousemove=function(e){
                    that.init();
                    that.cobj.clearRect(0,0,that.width,that.height);
                    if(that.arr.length>0){
                        that.cobj.putImageData(that.arr[that.arr.length-1],0,0);
                    }
                    var endx=e.offsetX;
                    var endy=e.offsetY;

                    that.cobj.lineTo(endx,endy);
                    that.cobj.stroke();
                }
                that.cope.onmouseup=function(){

                    that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                    that.cope.onmousemove=null;
                    that.cope.onmouseup=null;
                }
            }
        },
        ca:function(xp){
            var that=this;
            that.cope.onmousemove=function(e){
                if(!that.isxp){
                    return false;
                }
                var movex=e.offsetX;
                var movey=e.offsetY;
                var lefts=movex-(that.xpsize/2);
                var tops=movey-(that.xpsize/2);
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-that.xpsize/2){
                    lefts=that.width-that.xpsize/2
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-that.xpsize/2){
                    tops=that.height-that.xpsize/2
                }
                $(".ca").css({
                    "display":"block",
                    "left":lefts,
                    "top":tops,
                    "width":that.xpsize+"px",
                    "height":that.xpsize+"px",
                })
            },
            that.cope.onmousedown=function(){
                that.cope.onmousemove=function(e){
                    var movex=e.offsetX;
                    var movey=e.offsetY;
                    var lefts=movex-(that.xpsize/2);
                    var tops=movey-(that.xpsize/2);

                    if(lefts<0){
                        lefts=0;
                    }
                    if(lefts>that.width-that.xpsize/2){
                        lefts=that.width-that.xpsize/2
                    }
                    if(tops<0){
                        tops=0;
                    }
                    if(tops>that.height-that.xpsize/2){
                        tops=that.height-that.xpsize/2
                    }
                    $(".ca").css({
                        "display":"block",
                        "left":lefts,
                        "top":tops,
                    })
                    that.cobj.clearRect(movex,movey,that.xpsize,that.xpsize);
                }
                that.cope.onmouseup=function(){
                    that.cope.onmousemove=null;
                    that.cope.onmouseup=null;
                    that.ca(xp);
                    that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                }
            }
        },
        select:function(){
            var that=this;
            this.cope.onmousedown=function(e){
                var dx=e.offsetX;
                var dy=e.offsetY;
                that.cope.onmousemove=function(e){
                    var movex=e.offsetX;
                    var movey=e.offsetY;
                    that.cobj.beginPath();
                    that.obj.moveTo(dx,dy)
                    that.cobj.lineTo(movex-dx,movey-dy)
console.log(movex-dx)
                    that.cobj.closePath();
                    that.cobj.getImageData(dx,dy,movex-dx,movey-dy);
                }
                that.cope.onmousemove=function(){
                    that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                    that.cope.onmousemove=null;
                    that.cope.onmouseup=null;
                }
            }
        },
        
    }
       

