module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Register "delegate" :
  // - doc-building
  // - doc-publishing
  // - bower-publishing
  grunt.loadTasks('./bower_components/angular-ui-docs/delegated_tasks');



  // Default task.
  grunt.registerTask('default', ['jshint', 'karma:unit']);
  grunt.registerTask('serve', ['connect:continuous', 'karma:continuous', 'watch']);
  grunt.registerTask('build-doc', ['uglify', 'delegate:doc-building']);

  grunt.registerTask('publish', ['delegate:doc-publishing', 'delegate:bower-publishing']);

  var testConfig = function (configFile, customOptions) {
    var options = { configFile: configFile, singleRun: true };
    var travisOptions = process.env.TRAVIS && { browsers: [ 'Firefox', 'PhantomJS'], reporters: ['dots'] };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    bower: 'bower_components',
    dist : '<%= bower %>/angular-ui-docs',
    mainFile : 'ui-codemirror',
    pkg: grunt.file.readJSON('package.json'),

    // WATCHER
    // =======
    watch: {
      test: {
        files: ['<%= mainFile %>.js', 'test/*.js'],
        tasks: ['jshint', 'karma:unit:run']
      },
      demo: {
        files: ['demo/*', '<%= mainFile %>.js'],
        tasks: ['uglify', 'delegate:doc-building']
      }
    },

    // TESTER
    // =======
    karma: {
      unit: testConfig('test/karma.conf.js'),
      server: {configFile: 'test/karma.conf.js'},
      continuous: {configFile: 'test/karma.conf.js',  background: true }
    },

    // LOCAL SERVER
    // ============
    connect: {
      options: {
        base : '<%= dist %>',
        port: grunt.option('port') || '8000',
        hostname: grunt.option('host') || 'localhost',
        open : true
      },
      server: { options: { keepalive: true } },
      continuous: { options: { keepalive: false } }
    },

    // CODE QUALITY
    // ============
    jshint:{
      all:['<%= mainFile %>.js', 'gruntFile.js','test/*.js', 'demo/*.js'],
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

    // MINIFIER
    // ========
    uglify: {
      //options: {banner: '<%= meta.banner %>'},
      build: {
        files: {
          '<%= dist %>/dist/js/<%= mainFile %>.min.js': ['<%= mainFile %>.js']
        }
      }
    }

  });

};