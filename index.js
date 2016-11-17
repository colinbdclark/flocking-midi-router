var fluid = require("infusion"),
    flock = fluid.require("flocking");

fluid.require("%flocking-midi-router/src/node-router.js");

flock.midi.router.node();
