module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma']);

  grunt.registerTask('build-doc', ['uglify', 'copy']);

  var testConfig = function(configFile, customOptions) {
    var options = { configFile: configFile };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: ['dots'] };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    karma: {
      unit: testConfig('test/karma.conf.js')
    },
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n'),
      view : {
        humaName : "UI CodeMirror",
        repoName : "ui-codemirror"
      }
    },
    jshint:{
      all:['ui-codemirror.js', 'gruntFile.js','test/**/*.js'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    },
    uglify: {
      options: {banner: '<%= meta.banner %>'},
      build: {
        files: {
          'out/build/<%= meta.view.repoName %>.min.js': ['<%= meta.view.repoName %>.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['demo/demo.html'], dest: 'out/demos.html', filter: 'isFile'}
        ]
      },
      template : {
        options : {processContent : function(content){
          return grunt.template.process(content);
        }},
        files: [
          {src: ['out/.tmpl/index.tmpl'], dest: 'out/index.html'}
        ]
      }
    }
  });

};