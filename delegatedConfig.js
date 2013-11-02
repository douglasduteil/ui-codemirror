module.exports = function(grunt){ 

  return {
    view : {
      humaName : "UI CodeMirror",
      repoName : "ui-codemirror",
      demoHTML : grunt.file.read("demo/demo.html"),
      demoJS   : grunt.file.read("demo/demo.js"),
    },
    js_dependencies : [
    '<%= bower %>/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
    '<%= bower %>/codemirror/lib/codemirror.js',
    '<%= bower %>/codemirror/mode/scheme/scheme.js',
    '<%= bower %>/codemirror/mode/javascript/javascript.js',
    '<%= bower %>/codemirror/mode/xml/xml.js',
    'dist/js/ui-codemirror.min.js'
    ],
    css_dependencies : [
    '<%= bower %>/codemirror/lib/codemirror.css',
    '<%= bower %>/codemirror/theme/twilight.css',
    'assets/css/demo.css'
    ]
  };
};