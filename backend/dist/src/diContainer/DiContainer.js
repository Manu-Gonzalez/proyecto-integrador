"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiContainer = void 0;
class DiContainer {
    constructor() {
        this.services = new Map();
        this.singletons = new Map();
    }
    register(name, implementation, dependencies = []) {
        this.services.set(name, {
            implementation,
            dependencies,
            singleton: false,
        });
    }
    registerSingleton(name, implementation, dependencies = []) {
        this.services.set(name, {
            implementation,
            dependencies,
            singleton: true,
        });
    }
    registerInstance(name, instance) {
        this.singletons.set(name, instance);
    }
    resolve(name) {
        if (this.singletons.has(name)) {
            return this.singletons.get(name);
        }
        const service = this.services.get(name);
        if (!service) {
            throw new Error(`El servicio "${name}" es requerido pero no se ha registrado.`);
        }
        const dependencies = service.dependencies.map((dep) => this.resolve(dep));
        const instance = new service.implementation(...dependencies);
        if (service.singleton && !this.singletons.has(name)) {
            this.singletons.set(name, instance);
        }
        return instance;
    }
}
exports.DiContainer = DiContainer;
