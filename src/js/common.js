module.exports = {
	init:function(){
	    var oH = document.getElementById("oh1");
	    setTimeout(function(){
            oH.style.color = "red";
	    },3000);
	    setTimeout(function(){
            oH.style.color = "blue" ;
	    },6000);
	}
}