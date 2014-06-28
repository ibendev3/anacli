'use strict';

/**
 * Analoc Client Grunt configuration files for task runner
 * @Author: Ben Diamant
 * @Tasks:
 * serve - compile client files, check for errors with jsHint and launch a dev server on port 8080
 * test - Copying static files to temp folder and perform karma test over them
 * build - Minifying CSS and JS files, creating app deployment-ready structure under dist folder
 *
 **/

module.exports = function (grunt) {
    var developmentPort = 8002;
    var watchFiles = {
        clientViews: ['client/scripts/**/views/*.html'],
        clientJS: ['client/scripts/app.js', 'client/scripts/**/*.js'],
        clientLESS: ['client/styles/**/*.less'],
        clientImages: ['client/images/**/*.{png,jpg,jpeg,gif,webp,svg'],
        karmaTests: ['test/**/*.js', 'test/**/*.js']
    };

    var appLocations = {
        app: 'client',
        dist: 'dist'
    }
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: watchFiles.clientJS,
                tasks: ['jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: watchFiles.karmaTests,
                tasks: ['newer:jshint:test', 'karma'],
                option: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            styles: {
                files: watchFiles.clientLESS,
                tasks: ['clean:server', 'newer:less'],
                option: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            htmls: {
                files: watchFiles.clientViews,
                tasks: ['newer:jshint:all'],
                option: {
                    livereload: '<%= connect.options.livereload %>'
                }

            },
            gruntfile: {
                files: ['Gruntfile.js']
            }

        },

        // The actual grunt server settings
        connect: {
            options: {
                port: developmentPort,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static(appLocations.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect.static(appLocations.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: appLocations.dist
                }
            }
        },

        less: {

            all: {
                files: {
                    ".tmp/styles/main.css": 'client/styles/main.less'
                }
            }

        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                ignores: [appLocations.app + ' /scripts/vendors/**/*.js', appLocations.app + '/scripts/**/vendors/*.js'],
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: watchFiles.clientJS + ['Gruntfile.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: watchFiles.karmaTests
            }
        },

// Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp/**/*',
                                appLocations.dist + '/**/*'
                        ]
                    }
                ]
            },
            server: ['.tmp']
        },

// Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                        appLocations.dist + '/scripts/**/*.js',
                        appLocations.dist + '/styles/**/*.css'
                ]
            }
        },

// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them
        useminPrepare: {
            html: 'client/index.html'
        },

        usemin: {
            html: [appLocations.dist + "/index.html"]
        },
        cssmin: {
            dist: {
                files: {
                    'dist/styles/main.css': [
                        '.tmp/styles/**/*.css'
                    ]
                }
            }
        },

// Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: appLocations.app + '/',
                        dest: appLocations.dist + '/',
                        src: [
                            'favicon.ico',
                            '.htaccess',
                            '**/*.html',
                            'fonts/*',
                            'i18n/*.js'
                        ]
                    }
                ]
            }
        },

//Minifying images files
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: appLocations.app + '/images',
                        src: '**/*.{png,jpg,jpeg,gif}',
                        dest: appLocations.dist + '/images'
                    }
                ]
            }
        },

//Task to minify html assets
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: appLocations.dist,
                        src: ['index.html', '/scripts/**/*.html'],
                        dest: appLocations.dist
                    }
                ]
            }
        },

// Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    })
    ;


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run([ 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'less',
            'connect:livereload',
            'watch'
        ]);
    });


    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'buildless',
        'connect:test',
        'karma'
    ]);

    /* Creates a production snapshot of the code under folder dist */
    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concat',
        'less',
        'cssmin',
        'uglify',
        'filerev',
        'copy:dist',
        'usemin',
       'imagemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
}
;
