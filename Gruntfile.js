module.exports = function(grunt) {
  grunt.initConfig({

    clean: {
      dist: ['dist'],
      init: ['src/*/vendor']
    },

    useminPrepare: {
      options: {
        dest: 'dist'
      },
      html: ['src/*.html']
    },

    cssmin: {
    },

    copy: {
      main: {
        files: [
          {expand: true,
           flatten: true,
           src: ['src/*'],
           dest: 'dist/',
           filter: 'isFile'} // flattens results to a single level
        ]
      },
      init: {
        files: [
          {expand: true, flatten: true, cwd: 'bower_components/', src: ['bootstrap/dist/js/bootstrap.js', 'jquery/jquery.js'], dest: 'src/js/vendor', filter: 'isFile'},
          {expand: true, flatten: true, cwd: 'bower_components/', src: ['bootstrap/dist/css/bootstrap.css', 'bootstrap/dist/css/bootstrap-theme.css'], dest: 'src/css/vendor', filter: 'isFile'}
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: '{,*/}*.html',
          dest: 'dist'
        }]
      }
    },

    rev: {
      files: {
        src: ['dist/**/*.{js,css,png,jpg}']
      }
    },

    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/{,*/}*.css'],
      options: {
        dirs: ['dist']
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,                 // Enable dynamic expansion
          cwd: 'src/',                  // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],  // Actual patterns to match
          dest: 'dist/'                 // Destination path prefix
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['clean:dist',
                                 'copy:main',
                                 'useminPrepare',
                                 'concat',
                                 'cssmin',
                                 'uglify',
                                 'rev',
                                 'usemin',
                                 'imagemin']);
  grunt.registerTask('init', ['clean:init', 'copy:init']);
};

