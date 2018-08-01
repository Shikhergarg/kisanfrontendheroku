    var app = angular.module('myApp', ['ngAnimate', 'ngSanitize','ui.bootstrap','ngRoute']);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "FirstPage.htm",
            controller : "firstCtrl"
        })
        .when("/SecondPage", {
            templateUrl : "SecondPage.htm",
            controller : "secondCtrl"
        });
    });
    

app.controller('firstCtrl',function ($uibModal, $log,$scope) {

    $scope.api2=[{
        "id": 1,
        "first_name": "Jeanette",
        "last_name": "Penddreth",
        "email": "jpenddreth0@census.gov",
        "gender": "Female",
        "ip_address": "26.58.193.2",
        "contact":"9079045284"
      }, {
        "id": 2,
        "first_name": "Giavani",
        "last_name": "Frediani",
        "email": "gfrediani1@senate.gov",
        "gender": "Male",
        "ip_address": "229.179.4.212",
        "contact":"9079045284"
      }, {
        "id": 3,
        "first_name": "Noell",
        "last_name": "Bea",
        "email": "nbea2@imageshack.us",
        "gender": "Female",
        "ip_address": "180.66.162.255",
        "contact":"9079045284"
      }, {
        "id": 4,
        "first_name": "Willard",
        "last_name": "Valek",
        "email": "wvalek3@vk.com",
        "gender": "Male",
        "ip_address": "67.76.188.26",
        "contact":"9079045284"
      }];
      $scope.open = function (user) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: 'pc',
          resolve: {
            data: function () {
              return user;
            }
          }
        }).result.then(function(){}, function(res){});
      };



});

app.controller('secondCtrl',function ($scope,$http) {
  
  $http.get("https://boiling-plains-94128.herokuapp.com/api/twilio/").then(function (response) {
    $scope.api2 = response.data;
});

});

app.controller('ModalInstanceCtrl', function ($uibModal,$uibModalInstance,$scope, data) {
    var pc = this;
    $scope.data = data;
    $scope.send_message = function (data) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'secondModal.html',
          controller: 'secondModalCtrl',
          controllerAs: 'sc',
          resolve: {
            data: function () {
              return data;
            }
          }
        }).result.then(function(){}, function(res){});
      };
    $scope.ok = function () {
      //{...}
      //alert("You clicked the ok button."); 
      $uibModalInstance.close();
    };
  
    $scope.cancel = function () {
      //{...}
      //alert("You clicked the cancel button."); 
      $uibModalInstance.dismiss('cancel');
    };
  });
  app.controller('secondModalCtrl', function ($uibModalInstance,$scope,$http, data) {
    var pc = this;
    $scope.text = "";
    $scope.data = data;
    $scope.ok = function (user) {
      var obj=new Object();
      obj.Name=user.first_name+' '+user.last_name;
      obj.email=user.email;
      obj.Contact=user.contact;
      obj.text=$scope.text;
      obj.Time=new Date();
      obj.OTP=Math.floor(Math.random() * (9999 - 1000) ) + 1000;

      $http.post("https://boiling-plains-94128.herokuapp.com/api/twilio/",obj).then(function (response) {
      });
      $uibModalInstance.close();
    };
  
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });