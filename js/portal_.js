$(window).on("load resize", function(){
  var w = $(window).width();
  if (w > 1200) {
  $(function(){
		FastClick.attach(document.body);

			$("#hAccount .avater").on("click", function(){
				$("#hAccount .wrapper").slideDown();
			});
			$("#hAccount .cancel").on("click", function(e){
				$("#hAccount .wrapper").slideUp();
			});
		
		
		});
		
		} else {			
			$("#main, #hGlobalNav h1, #siteName img, #hSearch h1").removeClass("blur");
			$("#hAccount .avater").on("click", function(){
				$("#hAccount .wrapper").show();
				$("#main").addClass("blur");
			});
			$("#hAccount .cancel").on("click", function(e){
				$("#hAccount .wrapper").hide();
				$("#main").removeClass("blur");
			});
			$("#hGlobalNav h1").on("click", function(){
				$("#hGlobalNav .wrapper").show();
				$("#main, #hGlobalNav h1, #siteName img, #hSearch h1").addClass("blur");
			});
			$("#hGlobalNav .cancel").on("click", function(e){
				$("#hGlobalNav .wrapper").hide();
				$("#main, #hGlobalNav h1, #siteName img, #hSearch h1").removeClass("blur");
			});
	
			$("#hSearch h1").on("click", function(){
				$("#hSearch .wrapper").show();
				$("#hSearch input[type='search']").focus();
				$("#main, #hGlobalNav h1, #siteName img, #hSearch h1").addClass("blur");
			});
			$("#hSearch .cancel").on("click", function(e){
				$("#hSearch .wrapper").hide();
				$("#main, #hGlobalNav h1, #siteName img, #hSearch h1").removeClass("blur");
			});
    }	
	  
		
	  $(function(){
		  $("#mapMask").on('click',function(){
				$("#mapMask").addClass("draggable");
		      return false;
		    });
		});


});	


$(function(){

    var imageWidth, wrapperWidth, overlap, $container = $('#mainCampaign figure'); 
  
    function centerImage() {

        imageWidth = $container.find('img').width();
        wrapperWidth = $container.width();
            if(imageWidth>wrapperWidth){
        overlap =  (wrapperWidth - imageWidth) / 2;
        $container.find('img').css('margin-left', overlap + "px");
            }
    }
      
    $(window).on("load resize", centerImage);   
    var el = $container.get(0);
    if (el.addEventListener) { 
        el.addEventListener("webkitTransitionEnd", centerImage, false); // Webkit event
        el.addEventListener("transitionend", centerImage, false); // FF event
        el.addEventListener("oTransitionEnd", centerImage, false); // Opera event
    }


});
		

//flipsnap
if (cssua.ua.ie == undefined || cssua.ua.ie > 8.0) {
$(window).on("load resize", function(){
	$("#product .next").removeClass("desabled");

	var w = $(window).width();

	var distance = function(e) {
		var viewport = $(".viewport").width(),
		itemWidth = $(e).find("li").width(),
		itemMargin = parseInt($(e).find("li").css("margin-right")),
		itemsPerSingleView = Math.floor(viewport/(itemWidth + itemMargin));
		return (itemWidth + itemMargin) * itemsPerSingleView;
	}

	var maxPoint = function(e) {
		var viewport = $(".viewport").width(),
		itemWidth = $(e).find("li").width(),
		itemMargin = parseInt($(e).find("li").css("margin-right")),
		itemsPerSingleView = Math.floor(viewport/(itemWidth + itemMargin)),
		endMargin = w > 767 ? itemMargin : - itemMargin,
		remainder = ((($(e).find("li").length % itemsPerSingleView)-1) * (itemWidth + itemMargin) - endMargin) + ((itemsPerSingleView + 1) * (itemWidth + itemMargin) - viewport);
		return (Math.floor($(e).find("li").length / itemsPerSingleView)-1) + (remainder / ((itemWidth + itemMargin) * itemsPerSingleView));
	}


	var flipsnapElements = [];

	$(".flipsnap").each(function(i,e){

		flipsnapElements[i] = Flipsnap(e, {distance:distance(e), maxPoint:maxPoint(e)});

		var $next = $(this).parent().parent().find(".next").click(function() {
	  		flipsnapElements[i].toNext();
		});
		var $prev = $(this).parent().parent().find(".prev").click(function() {
			flipsnapElements[i].toPrev();
		});	
		flipsnapElements[i].element.addEventListener('fspointmove', function() {
		    $next.attr('disabled', !flipsnapElements[i].hasNext());
		    $prev.attr('disabled', !flipsnapElements[i].hasPrev());
		}, false);

	});


});
}