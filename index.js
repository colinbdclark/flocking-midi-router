"use strict";
var fluid = require("infusion");

fluid.module.register("flocking-midi-router", __dirname, require);
fluid.require("%flocking-midi-router/src/node-router.js");
