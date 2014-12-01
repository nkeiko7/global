var App = angular.module('App', []);

App.controller('TodoCtrl', function($scope, $http) {
  $http.get('/de/gift/js/todos3.json')
     .then(function(res){
        $scope.todos = res.data;        
		});
		
		//masonry start (if loop finish)
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

		$(function(){
			var $container = $('#container');
			$container.imagesLoaded(function(){
				$container.masonry({
					itemSelector: '.item',
					isFitWidth: true,
					isResizable: true,
					columnWidth: '.item'
					});
			});
			});

		});

});

App.directive('onFinishRender', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
          $timeout(function () {
						scope.$emit('ngRepeatFinished');
            //console.log("finish");
          });
      }
    }
  }

});


