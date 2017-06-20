/*
 * Flocking MIDI Gruntfile
 * http://github.com/colinbdclark/flocking-midi
 *
 * Copyright 2016, OCAD University
 * Licensed under the MIT license.
 */
"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        eslint: {
            all: [
                "./*.js",
                "src/**/*.js",
                "!**/node_modules/**"
            ]
        },
        jsonlint: {
            src: ["src/**/*.json", "./*.json"]
        }
    });

    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-jsonlint");

    grunt.registerTask("default", ["lint"]);
    grunt.registerTask("lint", "Apply jshint and jsonlint", ["eslint", "jsonlint"]);
};
