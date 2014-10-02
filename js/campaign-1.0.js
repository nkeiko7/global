$(window).on("load resize", function(){
  var w = $(window).width();
  if (w < 769) {
  
  	$(function(){				
			$("#main, #hGlobalNav h1, #siteName img").removeClass("blur");
			$("#hGlobalNav h1").on("click", function(){
				$("#hGlobalNav .wrapper").show();
				$("#main, #hGlobalNav h1, #siteName img").addClass("blur");
			});
			$("#hGlobalNav .cancel").on("click", function(e){
				$("#hGlobalNav .wrapper").hide();
				$("#main, #hGlobalNav h1, #siteName img").removeClass("blur");
			});

    });	
		
	}

});	
