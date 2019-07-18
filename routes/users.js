const express = require('express');
const router = express.Router();
const _ = require('lodash');
const get = require('get-value');
const rootPath = require('app-root-path');

const controllers = require("../controllers");
const schemas = require("../schemas")
const manifest = require('../manifests/routes.json');

function routeGenerator(routes, data) {
    routes.forEach(route => {
        const { basePath='', method, path, handlers } = route;
        const interceptors = [];
        interceptors.push(`${basePath}${path}`);

        handlers.forEach(handler => {
            const { type, controller } = handler;
            let moduleObj;           

            if (!_.isUndefined(controller.module)) {
                if (!_.isUndefined(controller.path)) {
                    moduleObj = get(require(controller.module), controller.path);
                } else {
                    moduleObj = require(controller.module);
                }
            } else if (!_.isUndefined(controller.path)) {
                moduleObj = get(data, controller.path);
            }

            const params = [];
            controller.parameters.forEach(parameter => {
                if (!_.isUndefined(parameter.path)) {
                    params.push(get(data, parameter.path));
                } else if (!_.isUndefined(parameter.value)) {
                    params.push(parameter.value);
                }
            });

            if (_.isEmpty(params)) {
                interceptors.push(moduleObj);
            } else {
                interceptors.push(moduleObj(...params));
            }            
        });

        router[method.toLowerCase()](...interceptors);
    });

    return router;
};

module.exports = routeGenerator(manifest, { controllers, schemas });