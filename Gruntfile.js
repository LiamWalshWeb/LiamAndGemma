// Generated on 2014-05-07 using
// generator-humble-tributes 0.0.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['assets/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['assets/scss/{,*/}*.{scss,sass}'],
        tasks: ['compass:dist', 'autoprefixer']
      },
      uglify: {
        files: ['assets/scripts/{,*/}*.js'],
        tasks: ['uglify']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'index.html',
          'assets/css/{,*/}*.css',
          'assets/js/{,*/}*.js',
          'assets/img/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        
      },
      test: {
        options: {
          open: false,
          port: 9001
        }
      }
    },

    // Empties folders to start fresh
    clean: [
      'assets/css/*',
      'assets/js/*',
      'assets/img/*',
    ],

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'assets/scripts/{,*/}*.js',
        '!assets/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      dist: {
        options: {
          basePath: 'assets',
          httpPath: '../',
          sassDir: 'scss',
          cssDir: 'css',
          imagesDir: 'img',
          javascriptsDir: 'js',
          fontsDir: 'fonts',
          environment: 'production',
          outputStyle: 'compressed'
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/css/',
          src: '{,*/}*.css',
          dest: 'assets/css/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    bowerInstall: {
      app: {
        src: ['index.html']
      },
      sass: {
        src: ['assets/scss/{,*/}*.{scss,sass}']
      }
    },

    // // Renames files for browser caching purposes
    // rev: {
    //   dist: {
    //     files: {
    //       src: [
    //         'assets/js/{,*/}*.js',
    //         'assets/css/{,*/}*.css',
    //         // 'assets/img/{,*/}*.*',
    //         'assets/*.{ico,png}'
    //       ]
    //     }
    //   }
    // },

    // 
    uglify: {
      dist: {
        files: {
          'assets/js/global.js': ['assets/scripts/{,*/}*.js']
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: 'assets/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/images',
          src: '{,*/}*.svg',
          dest: 'assets/img'
        }]
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: 'assets/js/vendor/modernizr.js',
        files: {
          src: [
            'assets/js/{,*/}*.js',
            'assets/css/{,*/}*.css',
            '!assets/js/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      dist: [
        'compass',
        'uglify',
        'imagemin',
        'svgmin'
      ]
    }
  });
  
  grunt.registerTask('common', [
    'clean',
    'concurrent:dist',
    'autoprefixer'
    // 'rev'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'common',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
    ]);
  });

  grunt.registerTask('build', [
    'common',
    'modernizr'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};