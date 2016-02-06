module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*']
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            'cssSrcDir': 'src/sass',
            'cssTargetDir': 'css',
            'jsSrcDir': 'src/js',
            'jsTargetDir': 'js',
            'jsDependencies': [
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/history.js/scripts/bundled/html4+html5/jquery.history.js',
                'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
                'bower_components/masonry/dist/masonry.pkgd.min.js',
                'bower_components/fitvids/jquery.fitvids.js',
                'bower_components/nprogress/nprogress.js',
                'src/vendor-js/prism.js',
                'src/vendor-js/readtime.js'
            ],
            'cssDependencies': [
                'bower_components/normalize.css/normalize.css',
                'bower_components/nprogress/nprogress.css',
                'src/vendor-css/icomoon.css',
                'src/vendor-css/prism.css'
            ]
        },
        copy: {
            dev: {
                files: [{
                    dest: 'assets/fonts/',
                    src: '*',
                    cwd: 'src/fonts/',
                    expand: true
                }]
            },
            dist: {
                files: [{
                    dest: 'assets/fonts/',
                    src: '*',
                    cwd: 'src/fonts/',
                    expand: true
                }]
            }
        },
        clean: {
            dist: ['assets']
        },
        sass: {
            dev: {
                options: {
                    sourceMaps: true
                },
                files: {
                    'assets/<%=  config.cssTargetDir %>/style.css': '<%=  config.cssSrcDir %>/style.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMaps: false
                },
                files: {
                    'assets/<%=  config.cssTargetDir %>/style.css': '<%=  config.cssSrcDir %>/style.scss'
                }
            }
        },
        cssmin: {
            dev: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1,
                    sourceMap: true
                },
                files: {
                    'assets/<%=  config.cssTargetDir %>/dependencies.css': [
                        '<%=	config.cssDependencies %>'
                    ]
                }
            },
            dist: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1,
                    sourceMap: false
                },
                files: {
                    'assets/<%= config.cssTargetDir %>/dependencies.css': [
                        '<%= config.cssDependencies %>'
                    ]
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({ browsers: ['last 2 versions'] })
                ]
            },
            files: {
                src: 'assets/<%=  config.cssTargetDir %>/*.css'
            }
        },
        uglify: {
            dev: {
                files: {
                    'assets/<%= config.jsTargetDir %>/script.js': [
                        '<%= config.jsSrcDir %>/**/*.js'
                    ],
                    'assets/<%= config.jsTargetDir %>/dependencies.js': [
                        '<%= config.jsDependencies %>'
                    ]
                }
            },
            devlight: {
                files: {
                    'assets/<%= config.jsTargetDir %>/script.js': [
                        '<%= config.jsSrcDir %>/**/*.js'
                    ]
                }
            },
            dist: {
                files: {
                    'assets/<%= config.jsTargetDir %>/script.js': [
                        '<%= config.jsSrcDir %>/**/*.js'
                    ],
                    'assets/<%= config.jsTargetDir %>/dependencies.js': [
                        '<%= config.jsDependencies %>'
                    ]
                }
            }
        },
        watch: {
            css: {
                files: '<%=  config.cssSrcDir %>/**/*.scss',
                tasks: ['sass:dev', 'copy:dev', 'postcss']
            },
            js: {
                files: '<%=  config.jsSrcDir %>/**/*.js',
                tasks: ['uglify:devlight']
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'bleak-mr.zip'
                },
                files: [
                    {
                        src: [
                            '*.hbs',
                            'package.json'
                        ]
                    },
                    {
                        expand: true,
                        src: ['assets/**/*']
                    },
                    {
                        expand: true,
                        src: ['partials/**/*']
                    }
                ]
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'sass:dist',
        'cssmin:dist',
        'postcss',
        'copy:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('default', [
        'sass:dev',
        'cssmin:dev',
        'postcss',
        'copy:dev',
        'uglify:dev',
        'watch'
    ]);

    grunt.registerTask('zip', [
        'clean:dist',
        'sass:dist',
        'cssmin:dist',
        'postcss',
        'copy:dist',
        'uglify:dist',
        'compress:main'
    ]);
};
