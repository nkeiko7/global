
$.get('archive.csv',function(data){
	var html ='';
	var csv = $.csv()(data);
	$(csv).each(function(i){
		html += '<li><a href="'+$(csv)[i][3]+'"><img src="'+$(csv)[i][2]+'" alt=""><time datetime="'+$(csv)[i][0]+'" pubdate="">'+$(csv)[i][0].replace(/-/g,".")+'</time><span>'+$(csv)[i][1]+'</span></a></li>';
	})
	$('#archive ul').append(html);
});
