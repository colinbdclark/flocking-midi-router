#! /usr/bin/env node
// A "launcher" to start the (Node version of the) router from the command line.
"use strict";
var fluid = require("infusion");
var flock = fluid.registerNamespace("flock");

fluid.require("%gpii-launcher");
fluid.require("%flocking-midi-router");

fluid.registerNamespace("flock.midi.router.launcher");

flock.midi.router.launcher.checkOptions = function (parseArgv) {
    if (parseArgv.l || (parseArgv.inputs && parseArgv.outputs)) {
        return true;
    }
    else {
        throw "You must either specify inputs and outputs, or list ports.";
    }
};

fluid.defaults("flock.midi.router.launcher", {
    gradeNames: ["gpii.launcher"],
    filterKeys: false,
    yargsOptions: {
        usage: "node . [options]",
        describe: {
            "inputs":     "A space-delimited array of inputs.",
            "outputs":    "A space-delimited array of outputs.",
            "list-ports": "List the available MIDI inputs and outputs.",
            "logLevel":   "The Fluid log level to use (false by default)."
        },
        defaults: {
            optionsFile: "%flocking-midi-router/configs/base.json"
        },
        coerce: {
            "logLevel": JSON.parse
        },
        array: ["inputs", "outputs"],
        boolean: "list",
        alias: {
            "list-ports": "l",
            "inputs":     "i",
            "outputs":    "o"
        },
        check: flock.midi.router.launcher.checkOptions,
        help: true
    }
});

flock.midi.router.launcher();
