const form=document.querySelector("#form"),
	  fileInput=document.querySelector("#fileInput"),
	  modalInput=document.querySelector("#modalInput"),
	  send=document.querySelector("#send"),
	  textarea=document.querySelector("#textarea"),
	  tip=document.querySelector("#tip"),
	  copyCode=document.querySelector("#copyCode"),
	  msg={
	  	noPic:"没上传图片",
	  	notSubmit:"没提交图片",
	  	copySuccess:"复制成功"
	  };
fileInput.onchange=function(){
	modalInput.value=this.value.split('\\').pop();
};
send.onclick=function(){
	let val=modalInput.value;
	if(!val){
		showTip(msg.noPic);
	}else{
		form.submit();
	}
};
copyCode.onclick=function(){
	let val=textarea.value;
	if(!val){
		showTip(msg.notSubmit);
	}else{
		textarea.select();
		document.execCommand("Copy");
		showTip(msg.copySuccess);
	}
};

document.querySelector("#toPaste").onclick=function(){
    window.location.href='/simple';
};

function showTip(text){
	tip.innerHTML=text;
	tip.style.top="20px";
	setTimeout(function(){
		hideTip();
	},1000);
}

function hideTip(){
	tip.innerHTML="";
	tip.style.top="-50px";
}