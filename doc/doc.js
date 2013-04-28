angular.module('doc.codeMirror', ['ui.codemirror'])
  .controller('DocCtrl', ['$scope', function($scope){
    $scope.codeMirrorModel = "Hello";
  }])
;