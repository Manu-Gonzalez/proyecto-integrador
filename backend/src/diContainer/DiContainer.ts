interface InjectableService<T> {
  implementation: new (...args: any[]) => T;
  dependencies: string[];
  singleton: boolean;
}

type SingletonService = any;

export class DiContainer {
  private services: Map<string, InjectableService<any>>;
  private singletons: Map<string, SingletonService>;

  constructor() {
    this.services = new Map();
    this.singletons = new Map();
  }

  register<T>(
    name: string,
    implementation: new (...args: any[]) => T,
    dependencies: string[] = []
  ) {
    this.services.set(name, {
      implementation,
      dependencies,
      singleton: false,
    });
  }

  registerSingleton<T>(
    name: string,
    implementation: new (...args: any[]) => T,
    dependencies: string[] = []
  ) {
    this.services.set(name, {
      implementation,
      dependencies,
      singleton: true,
    });
  }

  registerInstance<T>(name: string, instance: T) {
    this.singletons.set(name, instance);
  }

  resolve<T>(name: string): T {
    if (this.singletons.has(name)) {
      return this.singletons.get(name);
    }

    const service = this.services.get(name);

    if (!service) {
      throw new Error(
        `El servicio "${name}" es requerido pero no se ha registrado.`
      );
    }

    const dependencies = service.dependencies.map((dep) => this.resolve(dep));
    const instance = new service.implementation(...dependencies);

    if (service.singleton && !this.singletons.has(name)) {
      this.singletons.set(name, instance);
    }

    return instance;
  }
}
