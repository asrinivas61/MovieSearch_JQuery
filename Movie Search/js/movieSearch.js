var imgNotFound;

$.getJSON( "js/home.json", function( data ) {
  	$.each(data.new_upcoming, function(key, value) {
  		$('.upcoming').append('<div class="col-lg-3">' +
									'<div class="thumbnail thumbnail_def">' +
										'<img src='+value.img_url+' alt="title image"/>' +
										'<div class="caption">' +
											'<h3>'+value.title+'</h3>' +
											'<p class="cap">'+value.caption+'</p>'+
											'<p>'+value.type+'</p>'+
											'<p class="dir">'+value.Director+'</p>'+
										'</div>' +
									'</div>' +
							   '</div>');
  	});
  	$.each(data.weekend_box_office, function (key, value) {
  		$('.box-office').append('<div class="box-office-single">' +
	  								'<div class="col-lg-4">' +
	  									'<img src="'+value.img_url+'" alt="box office img">' +
	  								'</div>' +
	  								'<div class="col-lg-8">' +
	  									'<div class="caption">' +
	  										'<h5>'+value.title+'</h5>' +
	  										'<p>'+value.type+'</p>' +
	  										'<p class="collection">'+value.collection+'</p>' +
	  										'<span class="rating_img" style="background-position: 0px "'+value.rating+'"></span>' +
	  									'</div>' +
	  								'</div>' +
	  							'</div>');
  		$('.rating_img').css('background-position', '0 '+value.rating);
  	});
});

function searchMovie() {
	var input = $('#input_search').val().trim();
	if(input) $('.frontPage').fadeOut('slow');

	input != '' ?
	$.ajax({
		url: 'http://www.omdbapi.com/?s='+input,
		dataType: 'json',
		cache: false,
		success: function(data){
			if(data.Error){
				$('.error').html('<div class="alert alert-danger animated shake">' +
										'Movie <strong>'+input+'</strong> Not found' +
									'</div>');
				$('.main').css('minHeight', '768px');
			}
			$.each(data.Search, function(key, value){
				if(value.Poster == 'N/A') { imgNotFound = "Image Not Found"; }
	            var container = $('.result');
	            data.Search.sort(function(obj1, obj2){
					return obj2.Year-obj1.Year;
				});
	            var options = {
	                dataSource: data.Search,
	                pageSize:4,
	                callback: function (response, pagination) {
	                	var moviesResponse = '';
	                    $.each(response, function (index, item) {
	                        moviesResponse += '<div class="well">' +
													'<div class="row">' +
														'<div class="col-md-6">' +
															'<img class="thumbnail" src='+item.Poster+' alt="'+imgNotFound+'"/>' +
														'</div>' +
														'<div class="col-md-6">' +
															'<h4>'+item.Title+'</h4>' +
															'<ul class="list-group">' +
																'<li class="list-group-item">Year Released: '+item.Year+'</li>' +
																'<li class="list-group-item">IMDB ID: '+item.imdbID+'</li>' +
																'<li class="list-group-item">Rating: '+Math.round((Math.random() * (4.5 - 1) + 1)*100)/100+'/5.0</li>' +
															'</ul>' +
															'<a class="btn btn-primary" href=http://www.imdb.com/title/'+item.imdbID+'>View on IMDB</a>' +
														'</div>' +
													'</div>' +
												'</div>';
	                    });
	                    container.prev().html(moviesResponse);
	                }
	            };
	            container.pagination(options);
	        });
		}.bind(this),
		error: function(err){
			console.log(err);
		}.bind(this)
	}) : $('.error').html('<div class="alert alert-danger animated shake">' +
										'Enter any movie name' +
							'</div>');
		 $('.paginationjs').hide();
		 $('.frontPage').css({
		 	'position': 'relative',
		 	'top': '30px'
		 })
}