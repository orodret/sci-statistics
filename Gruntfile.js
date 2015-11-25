module.exports = function (grunt) {

    grunt.initConfig({
        jasmine_node: {
            test: {
                options: {
                    coverage: {},
                    forceExit: true,
                    match: '.',
                    matchAll: false,
                    specFolders: ['test'],
                    extensions: 'js',
                    specNameMatcher: 'spec',
                    captureExceptions: true,
                    junitreport: {
                        report: false,
                        savePath: './build/reports/jasmine',
                        useDotNotation: true,
                        consolidate: true
                    }
                },
                src: ['**/*.js']
            }
        },
        watch: {
            test: {
                files: ['index.js', 'lib/**/*.js', 'test/**/*.js'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'jasmine_node');
};