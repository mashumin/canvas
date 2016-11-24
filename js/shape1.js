function shape(canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
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
}
    shape.prototype={
        init:function(){
            this.cobj.strokeStyle=this.strokeStyle;
            this.cobj.fillStyle=this.fillStyle;
            this.cobj.lineWidth=this.lineWidth;
        },
        draw:function(){
            var that=this;
            this.canvas.onmousedown=function(e){
                var starex=e.offsetX;
                var starey=e.offsetY;
                that.canvas.onmousemove=function(e){
                    that.init();
                    that.cobj.clearRect(0,0,that.width,that.height);
                    if(that.arr.length>0){
                        that.cobj.putImageData(that.arr[that.arr.length-1],0,0);
                    }
                    var endx=e.offsetX;
                    var endy=e.offsetY;
                    
                    that[that.type](starex,starey,endx,endy);
                }
                that.canvas.onmouseup=function(){
                    that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                    that.canvas.onmousemove=null;
                    that.canvas.onmouseup=null;
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
        }
    }
       

