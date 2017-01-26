/*
 * Flocking MIDI Router for Node.js
 * http://github.com/colinbdclark/flocking-midi-router
 *
 * Copyright 2016, Colin Clark
 * Licensed under the MIT license.
 */

"use strict";

var fluid = require("infusion"),
    flock = fluid.require("flocking");

fluid.require("%flocking-midi-router/src/midi-router.js");

fluid.registerNamespace("flock.midi.router.node");

flock.midi.router.node.startup = function (that) {
    if (that.options.listPorts) {
        flock.midi.logPorts();
        process.exit(0);
    }
};

fluid.defaults("flock.midi.router.node", {
    gradeNames: ["flock.midi.router"],
    setLogging: fluid.logLevel.FAIL,
    listeners: {
        "onCreate.setLogging": {
            priority: "first",
            funcName: "fluid.setLogging",
            args:     ["{that}.options.setLogging"]
        },
        "onCreate.startup": {
            funcName: "flock.midi.router.node.startup",
            args:     ["{that}"]
        }
    }
});
