/*
 * Flocking MIDI Router for Node.js
 * http://github.com/colinbdclark/flocking-midi-router
 *
 * Copyright 2016, Colin Clark
 * Licensed under the MIT license.
 */

"use strict";

var fluid = require("infusion"),
    flock = fluid.require("flocking"),
    minimist = require("minimist");

fluid.require("%flocking-midi-router/src/midi-router.js");

fluid.defaults("flock.midi.router.node", {
    gradeNames: "flock.midi.router",

    inputs: "{argProcessor}.options.inputs",
    outputs: "{argProcessor}.options.outputs",

    components: {
        argProcessor: {
            type: "flock.midi.router.argProcessor"
        }
    }
});

fluid.defaults("flock.midi.router.argProcessor", {
    gradeNames: "fluid.component",

    args: "@expand:flock.midi.router.argProcessor.parseArgs()",

    inputs: {
        expander: {
            funcName: "flock.midi.router.argProcessor.parsePortArg",
            args: ["{that}.options.args.i"]
        }
    },

    outputs: {
        expander: {
            funcName: "flock.midi.router.argProcessor.parsePortArg",
            args: ["{that}.options.args.o"]
        }
    },

    listeners: {
        "onCreate.listPorts": {
            funcName: "flock.midi.router.argProcessor.logPorts",
            args: ["{that}.options.args"]
        },

        "onCreate.exit": {
            funcName: "flock.midi.router.argProcessor.exitIfRequired",
            args: ["{that}.options.args"]
        }
    }
});

flock.midi.router.argProcessor.parseArgs = function () {
    var args = minimist(process.argv.slice(2));
    return args;
};

flock.midi.router.argProcessor.parsePortArg = function (arg) {
    try {
        var parsed = JSON.parse(arg);
        return parsed;
    } catch (e) {
        return arg;
    }
};

flock.midi.router.argProcessor.logPorts = function (args) {
    if (args["list-ports"]) {
        flock.midi.logPorts();
    }
};

flock.midi.router.argProcessor.exitIfRequired = function (args) {
    var exit = false;

    if (args["list-ports"] && !args.i && !args.o) {
        process.exit(0);
    }

    if (!args.i) {
        console.error("Please specify an input port using the -i flag.");
        process.exit(1);
    }

    if (!args.o) {
        console.error("Please specify an output port using the -o flag.");
        process.exit(1);
    }
};
