"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = require("./app");
const config_1 = require("./config");
(0, http_1.createServer)((0, app_1.buildApp)()).listen(config_1.PORT, () => {
    console.log(`Server is running on http://localhost:${config_1.PORT}`);
});
