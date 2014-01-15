/**
 * Gruntfile.js
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    php: {
        dist: {
            options: {
                port: 8080,
                base: 'web',
                open: true,
                keepalive: true
            }
        }
    },
    phpcs: {
        application: {
            dir: 'app'
        },
        options: {
            bin: 'phpcs',
            standard: 'PSR2',
            reportFile: 'phpcs.log',
            ignore: 'views/*,tests/*'
        }
    },
    phplint: {
        options: {
            swapPath: '/tmp'
        },
        all: ['app/config/*.php', 'app/controllers/*.php', 'app/models/*.php', 'app/*.php']
    },
    phpunit: {
        unit: {
            dir: 'app/tests/'
        },
        options: {
            bin: 'phpunit',
            // bootstrap: 'tests/Bootstrap.php',
            colors: true,
            testdox: true
        }
    },
    php_analyzer: {
        application: {
            dir: 'app'
        }
    }
  });

  grunt.loadNpmTasks('grunt-phpcs');
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-phplint');
  grunt.loadNpmTasks('grunt-phpunit');
  grunt.loadNpmTasks('grunt-php-analyzer');
  grunt.registerTask('precommit', ['phplint:all', 'phpunit:unit']);
  grunt.registerTask('default', ['phplint:all', 'phpcs', 'phpunit:unit']);
  grunt.registerTask('server', ['php']);
};