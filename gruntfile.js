/**
 * Gruntfile.js
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Clean stuff up
    clean: {
      // Clean any pre-commit hooks in .git/hooks directory
      hooks: ['.git/hooks/pre-commit']
    },
    // Run shell commands
    shell: {
      hooks: {
        // Copy the project's pre-commit hook into .git/hooks
        command: 'cp git-hooks/pre-commit .git/hooks/'
      }
    },
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  // Clean the .git/hooks/pre-commit file then copy in the latest version
  grunt.registerTask('hookmeup', ['clean:hooks', 'shell:hooks']);
  grunt.registerTask('default', ['phplint:all', 'phpcs', 'phpunit:unit']);
  grunt.registerTask('server', ['php']);
};