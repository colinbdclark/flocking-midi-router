/*
 * Flocking MIDI Router
 * http://github.com/colinbdclark/flocking-midi-router
 *
 * Copyright 2016, Colin Clark
 * Licensed under the MIT license.
 */

"use strict";

var fluid = require("infusion");

fluid.require("flocking");

fluid.defaults("flock.midi.router", {
    gradeNames: "fluid.component",

    inputs: [],
    ouputs: [],

    components: {
        inputConnection: {
            type: "flock.midi.router.inputConnection"
        },

        outputConnection: {
            type: "flock.midi.router.outputConnection"
        }
    }
});

fluid.defaults("flock.midi.router.connection", {
    gradeNames: "flock.midi.connection",

    sysex: true,
    openImmediately: false
});

fluid.defaults("flock.midi.router.inputConnection", {
    gradeNames: "flock.midi.router.connection",

    ports: {
        input: "{router}.options.inputs"
    },

    listeners: {
        raw: "{router}.outputConnection.sendRaw({arguments}.0.data)"
    }
});


fluid.defaults("flock.midi.router.outputConnection", {
    gradeNames: "flock.midi.router.connection",

    sysex: true,

    ports: {
        output: "{router}.options.outputs"
    }
});
