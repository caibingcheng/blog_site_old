	// window.onload=function(){
	// 	var scrollTop=0;
	// 	setInterval(function(){
	// 	scrollTop=document.body.scrollTop;
	// 	if(scrollTop>100)
	// 		document.getElementsByTagName("nav")[0].bgcolor="rgba(170,142,216,0.2)";
	// 	if(scrollTop>200)
	// 		document.getElementsByTagName("li")[0].setAttribute("class","on");
	// 	else 
	// 		document.getElementsByTagName("li")[0].setAttribute("class","");
	// 	},100); }

	function Show_tip()
	{
		tip=document.createElement("div");
		tip.setAttribute("class","tip");
		document.getElementsByClassName("tips")[0].insertBefore(tip,document.getElementById("son"));
		var tips=document.getElementsByClassName("tip")[0];
		tips.style.display="block";
		tips.innerHTML="<a href=\"#top\" onclick=\"Display_tip()\">X</a>";
	}
	function Display_tip()
	{
		var tips=document.getElementsByClassName("tip")[0];
		tips.style.display="none";
		tips.innerHTML="";
		var tips=document.getElementsByClassName("tips")[0];
		tips.innerHTML="<a href=\"#top\" id=\"show\" onclick=\"Show_tip();getContent()\"><img src=\"./images/tips.jpg\" alt=\"介绍\"></a><div id=\"son\"></div>";
	}

	function getContent()
	{
		var request=getHttpObject();
		if(request)
		{
			request.open("GET","./text/left_tip.html",true);
			request.onreadystatechange=function(){
				if(request.readyState==4)
						{
							var para=document.getElementsByClassName("tip")[0];
							para.innerHTML+=request.responseText;
						}

			};
			request.send(null);
		}else
		{
			alert("error");
		}
	}
	function getHttpObject()
	{
		return new XMLHttpRequest();
	}




	list_all=new Array;
	list_list=new Array;
	// list_essay=new Array;
	// list_tech=new Array;
	flag=0;
	function list(x,page){


		var i;
		var para=document.getElementsByClassName("blog");
		for(i=0;i<6;i++)
			{
				para[i].innerHTML="";
				para[i].style.display="none";
			}


			pages=0;
			//alert(page)
		var request=getHttpObject();
		 if(request)
		 	{
		// 	request.open("GET","./list/list_essay.html",true);
		// 	request.onreadystatechange=function(){
		// 		if(request.readyState==4)
		// 				{
		// 				alert(request.responseText);
		// 				list_essay=request.responseText.split("\n");
		// 				alert(list_essay[1]);
		// 				}

		// 		};
		// 	request.send(null);
		// 	request.open("GET","./list/list_tech.html",true);
		// 	request.onreadystatechange=function(){
		// 		if(request.readyState==4)
		// 				{
		// 				list_tech=request.responseText.split("\n");
		// 				}

		// 		};
		// 	request.send(null);
			switch(x)
			{
				case 2 :url="./blog/essay/";
						list_url="./list/list_essay.html";
						this_page=1;
						break;
				case "#handle" :url="./blog/essay/";
						list_url="./list/list_essay.html";
						break;
				case 1 :url="./blog/tech/";
						list_url="./list/list_tech.html";
						this_page=1;
						break;
				case "#home":
				case "#tech" :url="./blog/tech/";
						list_url="./list/list_tech.html"
						break;
				case 3:url="./blog/";
						list_url="./list/list_all.html"
						break;
			}
			request.open("GET",list_url,true);
			request.onreadystatechange=function(){
				if(request.readyState==4)
						{
						list_all=request.responseText.split("\n");
						var len=leng=list_all.length;
						for(leng;leng>0;)
							{
								leng=leng-6;
								pages++;
							}


			switch(page)
			{
				case 5:page=parseInt(document.getElementsByTagName("input")[0].value)-1;
				case 1:		
						if(page<=1)
							document.getElementById("prev").style.opacity="0";
						else {
							document.getElementById("prev").style.opacity="1";
						};
						if(page>=pages)
							{document.getElementById("next").style.opacity="0"}
						else {
							document.getElementById("next").style.opacity="1";
						};

						break;
				case 6:page=parseInt(document.getElementsByTagName("input")[0].value)+1;
				case 1:	if(page>=pages)
							{document.getElementById("next").style.opacity="0"}
						else {
							document.getElementById("next").style.opacity="1";
						};
						if(page<=1)
							document.getElementById("prev").style.opacity="0";
						else {
							document.getElementById("prev").style.opacity="1";
						};
						break;
				case 7:page=parseInt(document.getElementsByTagName("input")[0].value);
				case 1:	if(page>=pages)
							{document.getElementById("next").style.opacity="0"}
						else {
							document.getElementById("next").style.opacity="1";
						};
						if(page<=1)
							document.getElementById("prev").style.opacity="0";
						else {
							document.getElementById("prev").style.opacity="1";
						};
						break;
			}

						all_page=document.getElementById("all_page");
						all_page.innerHTML=pages;
						document.getElementsByTagName("input")[0].value=page;
						document.getElementsByTagName("input")[0].max=pages;
						document.getElementById("page").style.display="block";
						//SetButton(page,pages);
						//alert(pages);
						//alert(len);
						var all=6*page;
						// alert(all);
							for(n=(page-1)*6;n<all;n++)
								{
									//alert(list_all[n]);
									getArtical(list_all[n],url,n-6*(page-1));
									if(page*6>len)
										all=len;
									//alert(all);	
								}
						}
				};
			request.send(null);
			}
			else
			{
				alert("Error");
			}
		}


	function getArtical(src,url,n)
	{
		var request=getHttpObject();
		src=url+src;
		//alert(src);
		var para=document.getElementsByClassName("blog")[n];
		if(request)
		{
			request.open("GET",src,true);
			request.onreadystatechange=function(){
				if(request.readyState==4)
						{
							
							var page=request.responseText;
							para.innerHTML=MakeText(request.responseText);
							para.style.display="block";
						}

			};
			request.send(null);
		}else
		{
			alert("error");
		}
	}
	// function SetButton(n,len)
	// {	
	// 	var i;
	// 	var j;
	// 	var k;
	// 	var para=document.getElementsByClassName("blog");
	// 	for(i=0;i<6;i++)
	// 		{
	// 			para[i].innerHTML="";
	// 			para[i].style.display="none";
	// 		}
	// 	button=document.getElementsByClassName("page");
	// 	for(i=0;i<7;i++)
	// 		{button[i].innerHTML="";
	// 		button[i].style.display="none";
	// 	}
	// 	if((n+6)<=len)
	// 		k=n+6;
	// 	else k=len;

	// 	for(i=n,j=0;i<=k;i++,j++)
	// 		{
	// 			button[j].innerHTML=i;
	// 			button[j].style.display="inline";
	// 		}
	// }
	function MakeText(texts)
	{
		text=texts.split("<article>");//top
		temp=text[1].split("</article>");
		text[1]=temp[0];//body
		text[2]=temp[1];//tag
		para=text[1].split("<p>");
		temp=para[1].split("</p>")[0];
		first_para=temp;
		temp=text[2].split("<more>");
		text[3]=temp[1];
		text[3]=text[3].split("</more>")[0];
		text[2]=temp[0];
		return text[0]+"<p>"+first_para+"</p>"+text[2]+"<a class=\"more\" onclick=\"Show_this(this)\""+"id=\""+text[3]+"\">more>><a/>";
	}
	function Show_this(x)
	{
		var request=getHttpObject();
		src=x.id;
		//alert(src);
		if(request)
		{
			request.open("GET",src,true);
			request.onreadystatechange=function(){
				if(request.readyState==4)
						{
							var para=x.parentNode;
							text=request.responseText.split("<more>");
							para.innerHTML=text[0]+"<a class=\"more\" onclick=\"Pack_this(this)\""+"id=\""+src+"\">pack^<a/>"+"<hr id=\"bottom_hr\"/>";
						}

			};
			request.send(null);
		}else
		{
			alert("error");
		}
	}
		function Pack_this(x)
	{
		var request=getHttpObject();
		src=x.id;
		//alert(src);
		if(request)
		{
			request.open("GET",src,true);
			request.onreadystatechange=function(){
				if(request.readyState==4)
						{
							var para=x.parentNode;
							text=MakeText(request.responseText);
							para.innerHTML=text;
						}

			};
			request.send(null);
		}else
		{
			alert("error");
		}
	}