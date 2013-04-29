define(['module', 'root', 'requireCss'], function (module, root, requireCss) {

  var _, dfd, e$;

  _ = root[module.id] || "";
  // Hide jquery dependence...
  dfd = new $.Deferred();


  requireCss("http://codemirror.net/lib/codemirror.css");
  requireCss("http://codemirror.net/theme/rubyblue.css");

  requirejs(
    {
      paths: {
        'ui.codemirror': _ + 'ui-codemirror'
      },
      shim: {
        'ui.codemirror': { deps: ['http://codemirror.net/lib/codemirror.js'] }
      }
    },
    ['ui.codemirror'],
    function () {

      angular.module('doc.ui-codeMirror', ['ui.codemirror', 'prettifyDirective' ])
        .controller('DocCtrl', ['$scope', function ($scope) {
          $scope.codeMirrorModel = "CodeMirror Hello World";
          $scope.codeMirrorRefresh = false;

          // Fix codeMirror display
          // When loading codeMirror is hidden so it width is initialize at ~0...
          $scope.$root.$watch('isLoading', function (val) {
            // Let the time to display all the page.
            setTimeout(function () {
              $scope.codeMirrorRefresh = true;
              $scope.$apply();
            }, 2000);
          });
        }])
      ;

      e$ = $("#directives-ui-codemirror");
      e$.removeAttr("ng-non-bindable");

      angular.bootstrap(e$[0], ['doc.ui-codeMirror']);

      dfd.resolve();

    }
  );

  return dfd.promise();

});