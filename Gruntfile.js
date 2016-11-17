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
                "src/**/*.js",
                "!**/node_modules/**"
            ]
        }
    });

    grunt.loadNpmTasks("fluid-grunt-eslint");

    grunt.registerTask("default", ["eslint"]);
};
