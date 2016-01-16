var ftureApp = angular.module('ftureApp', [
  'ngRoute',
  'ftureControllers'
]);

ftureApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);