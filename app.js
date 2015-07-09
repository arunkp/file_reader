$(document).ready(function(){
	PDFJS.disableStream = true;
	var DELAY = 700;
	var clicks = 0;
	var timer = null;
	var min = 1;
	var max = 5;
	var i = 2;
	var drive = {
		init: function(file){
			this.render(file);
		},
		render: function(file){
			var thats = this;
			PDFJS.getDocument(file).then(function(pdfFile) {
				var numPage = 1;
		    	pdfFile.getPage(1).then(function(page) {
			        var scale = 1;
	        		var viewport = page.getViewport(scale);
	        		var canvas = $("<canvas id='canvas'></canvas>");
	        		$("body").append(canvas);
	        		canvas = document.getElementById('canvas');
	        		canvas.width = viewport.width;
	        		canvas.height = viewport.height;
					var context = canvas.getContext('2d');
					var renderContext = {
					    canvasContext: context,
					    viewport: viewport
					};
					page.render(renderContext).promise.then(function(){
						function url(canvas) {
					        return canvas.toDataURL("image/jpg");
					    }
					    var src = url(document.getElementById("canvas"))
					   	var html = '<div class="pdf_file"><div class="img_holder"><div class="img_content"><img class="pre_img" src='+ src +' alt=""></div></div><div class="file_details"><div class="file_details_holder"><div class="icon_holder"><img src="pdf_icon.png" alt=""></div><div class="file_name"><span>File Name</span></div></div></div></div>';
					   	$(".preview_container").append(html);
					    $( "#canvas" ).remove();
					    return thats.callback()
					})
				});
			});
		},
		callback: function(){
			if($(".pdf_file").length < 15){
				setTimeout(function(){
					looper();
				}, 1)
			}else{
				$(".pdf_file").click(function(e){
				    clicks++;
				    var that = $(this);
				    if(clicks === 1) {
				        timer = setTimeout(function() {
				        	if(that.hasClass("active")){
				        		that.removeClass("active");
				        		console.log("File Unselected");
				        	}else{
				        		that.addClass("active");
				        		console.log("File Selected");
				        	}
				            clicks = 0;
				        }, DELAY);
				    } else {
				        clearTimeout(timer);
				        alert("Double Click");
				        clicks = 0;
				    }
				}).on("dblclick", function(e){
				    e.preventDefault();
				});
				$(".cta_btn").click(function(e){
					e.preventDefault()
					alert("action will be performed");
				})
				$(".loader").addClass("hidden");
			}
		}
	}

	function looper(){
		var randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return drive.init("files/"+ randomnumber +".pdf");
	}

	drive.init("files/1.pdf");
})








