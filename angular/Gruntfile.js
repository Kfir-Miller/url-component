'use strict';
module.exports = function (grunt) {
    
var appSourceFiles = ['js/component/**/*.js'];
var appDestination = 'js/app.min.js';

    grunt.initConfig({
        watch: {
            app: {
                files: appSourceFiles,
                tasks: [
                    'clean:app',
                    'concat:app'
                ]
            },
        },
        clean: {
            app: [
                appDestination
            ],

        },
        concat: {
            options: {
                seperator: "\n"
            },
            vendor: {
                src: ['js/vendor/*.js'],
                dest: 'js/vendor.min.js'
            },
            app:{
                src: appSourceFiles,
                dest: appDestination
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'concat'
    ]);
    grunt.registerTask('dev', [
        'clean',
        'concat'
    ]);

};
