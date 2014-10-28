$(window).on("load resize", function(){
  var w = $(window).width();
  if (w > 768) {
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



	var flipsnapProduct = Flipsnap('#product .flipsnap', {distance:distance("#product"), maxPoint:maxPoint("#product")});
	var flipsnapCampaign = Flipsnap('#campaign .flipsnap', {distance:distance("#campaign"), maxPoint:maxPoint("#campaign")});
	var flipsnapLab = Flipsnap('#lab .flipsnap', {distance:distance("#campaign"), maxPoint:maxPoint("#lab")});
	var flipsnapEvent = Flipsnap('#event .flipsnap', {distance:distance("#campaign"), maxPoint:maxPoint("#event")});
	var flipsnapInfo = Flipsnap('#information .flipsnap', {distance:distance("#campaign"), maxPoint:maxPoint("#information")});
	var flipsnapHouseVision = Flipsnap('#houseVision .flipsnap', {distance:distance("#houseVision"), maxPoint:maxPoint("#houseVision")});
	var flipsnapOther = Flipsnap('#other .flipsnap', {distance:distance("#other"), maxPoint:maxPoint("#other")});
	
	if($("#product").length){
		var $next = $('#product .next').click(function() {
	  	flipsnapProduct.toNext();
		});
		var $prev = $('#product .prev').click(function() {
			flipsnapProduct.toPrev();
		});	
		flipsnapProduct.element.addEventListener('fspointmove', function() {
		    $next.attr('disabled', !flipsnapProduct.hasNext());
		    $prev.attr('disabled', !flipsnapProduct.hasPrev());
		}, false);
	}
	
	if($("#campaign").length){
		var $next2 = $('#campaign .next').click(function() {
	    flipsnapCampaign.toNext();
		});
		var $prev2 = $('#campaign .prev').click(function() {
			flipsnapCampaign.toPrev();
		});	
		flipsnapCampaign.element.addEventListener('fspointmove', function() {
		    $next2.attr('disabled', !flipsnapCampaign.hasNext());
		    $prev2.attr('disabled', !flipsnapCampaign.hasPrev());
		}, false);
	}
	
	if($("#event").length){
		var $next3 = $('#event .next').click(function() {
	    flipsnapEvent.toNext();
		});
		var $prev3 = $('#event .prev').click(function() {
			flipsnapEvent.toPrev();
		});	
		flipsnapEvent.element.addEventListener('fspointmove', function() {
		    $next3.attr('disabled', !flipsnapEvent.hasNext());
		    $prev3.attr('disabled', !flipsnapEvent.hasPrev());
		}, false);
	}
	
	if($("#lab").length){
		var $next4 = $('#lab .next').click(function() {
	    flipsnapLab.toNext();
		});
		var $prev4 = $('#lab .prev').click(function() {
			flipsnapLab.toPrev();
		});	
		flipsnapLab.element.addEventListener('fspointmove', function() {
		    $next4.attr('disabled', !flipsnapLab.hasNext());
		    $prev4.attr('disabled', !flipsnapLab.hasPrev());
		}, false);
	}
	
	if($("#information").length){
		var $next5 = $('#information .next').click(function() {
	    flipsnapInfo.toNext();
		});
		var $prev5 = $('#information .prev').click(function() {
			flipsnapInfo.toPrev();
		});	
		flipsnapInfo.element.addEventListener('fspointmove', function() {
		    $next5.attr('disabled', !flipsnapInfo.hasNext());
		    $prev5.attr('disabled', !flipsnapInfo.hasPrev());
		}, false);alert("aaa")
	}
	
	if($("#houseVision").length){
		var $next6 = $('#houseVision .next').click(function() {
	    flipsnapHouseVision.toNext();
		});
		var $prev6 = $('#houseVision .prev').click(function() {
			flipsnapHouseVision.toPrev();
		});	
		flipsnapHouseVision.element.addEventListener('fspointmove', function() {
		    $next6.attr('disabled', !flipsnapHouseVision.hasNext());
		    $prev6.attr('disabled', !flipsnapHouseVision.hasPrev());
		}, false);
	}
	
	if($("#otherActivity").length){
		var $next7 = $('#otherActivity .next').click(function() {
	    flipsnapOther.toNext();
		});
		var $prev7 = $('#otherActivity .prev').click(function() {
			flipsnapOther.toPrev();
		});	
		flipsnapOther.element.addEventListener('fspointmove', function() {
		    $next7.attr('disabled', !flipsnapOther.hasNext());
		    $prev7.attr('disabled', !flipsnapOther.hasPrev());
		}, false);
		
	}

});
}