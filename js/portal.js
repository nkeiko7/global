$(window).on("load resize", function(){
  var w = $(window).width();
  if (w > 768) {
  $(function(){
  	$("#hGlobalNav .wrapper").show();
		FastClick.attach(document.body);

		$("#hAccount .avater").on("click", function(){
			$("#hAccount .wrapper").slideDown();
		});
		$("#hAccount .cancel").on("click", function(e){
			$("#hAccount .wrapper").slideUp();
		});
		
		$(window).scroll(function(){
			var y = $(this).scrollTop();
			$('.mainCampaignBack').css('background-position', 'center ' + parseInt( y / 2 ) + 'px');
			
			if($(window).scrollTop() > 440){
				$("#globalHeader").addClass("back");
				} else {
				$("#globalHeader").removeClass("back");
			};
		});
		});
		
		} else {
			$("#hGlobalNav .wrapper").hide();
			
			$("#main").removeClass("blur");
			$("#hAccount .avater").on("click", function(){
				$("#hAccount .wrapper").slideDown();
				$("#main").addClass("blur");
			});
			$("#hAccount .cancel").on("click", function(e){
				$("#hAccount .wrapper").slideUp();
				$("#main").removeClass("blur");
			});
			$("#hGlobalNav h1").on("click", function(){
				$("#hGlobalNav .wrapper").slideDown();
				$("#main").addClass("blur");
			});
			$("#hGlobalNav .cancel").on("click", function(e){
				$("#hGlobalNav .wrapper").slideUp();
				$("#main").removeClass("blur");
			});
	
			$("#hSearch h1").on("click", function(){
				$("#hSearch .wrapper").slideDown("slow",function(){
					$("#hSearch input[type='search']").focus();
				});
				$("#main").addClass("blur");
			});
			$("#hSearch .cancel").on("click", function(e){
				$("#hSearch .wrapper").slideUp();
				$("#main").removeClass("blur");
			});
    }	

	//});
	
	$(function(){
    var _window = $(window);
    var _title = $(".titleContainer");
    var _winHeight;
    var _scroll;
 
    function scrollFade() {
        _winHeight = _window.height();        
        _window.scroll(function(){
            _scroll = _window.scrollTop()*2;             
            if ( _scroll < 0 ) {
                _title.css({ "opacity" : 1 });
            }
            else if ( 0 <= _scroll && _scroll <= _winHeight ) {
                _title.css({ "opacity" : 1 - (_scroll / _winHeight) });
            }
            else {
                _title.css({ "opacity" : 0 });
            }
        }); 
    }
    _window.on("load resize", function(){
    scrollFade();
    });
    
	  $(function(){
		  $("#mapMask").on('click',function(){
				$("#mapMask").addClass("draggable");
		      return false;
		    });
		});
	
	});

});	


//flipsnap
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
		}, false);
	}

});