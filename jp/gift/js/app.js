var App = angular.module('App', []);

App.controller('TodoCtrl', function($scope, $http) {
  $http.get('/jp/gift/js/todos.json')
     .then(function(res){
        $scope.todos = res.data;
            
		});
});