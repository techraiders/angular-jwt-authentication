(function() {
  'use strict';
  var app = angular.module('app', []);

  app.constant('API_URL', 'http://localhost:3000');

  app.controller('MainCtrl', function(RandomUserFactory, UserFactory) {
    var vm = this;
    vm.getRandomUser = getRandomUser;
    vm.login = login;

    function getRandomUser() {
      RandomUserFactory.getUser().then(function(response) {
        vm.randomUser = response.data;
      });
    }

    function login(username, password) {
      UserFactory.login(username, password).then(onSuccess, onError);

      function onSuccess(response) {
        vm.user = response.data;
      }

      function onError(reason) {
        alert('Error: ' + reason.data);
      }
    }
  });

  app.factory('RandomUserFactory', function($http, API_URL) {
    function getUser() {
      return $http.get(API_URL + '/random-user');
    }
    return {
      getUser: getUser
    };
  });
  app.factory('UserFactory', function($http, API_URL) {
    function login(username, password) {
      return $http.post(API_URL + '/login', {
        username: username,
        password: password
      });
    }
    return {
      login: login
    };
  });
})();
