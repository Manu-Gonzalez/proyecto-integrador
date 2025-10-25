/*
    Muchas veces es mas conveniente usar clases en lugar de interfaces para modelar
  nuestros datos. Las clases nos permite tener logica asociada a ese conjunto de
  datos, ademas de que evitamos que nos pasen propiedades extra.
*/

export class Client {
  constructor(
    /*  Un id de tipo string nos puede dar mas flexibilidad y tolerancia al cambio,
      esto nos va a permitir usar IDs incrementales y UUIDs. 
        Pero ¿que pasaria si algun dia queremos migrar las IDs incrementales a UUIDs
      por que vamos a usar un sistema de base de datos distribuidas? Tendriamos que
      modificar muchas cosas si el tipo del ID de nuestros modelos es un number.
    */
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly dni: string,
    public readonly cityId: string,
    public readonly address: string,
    public readonly registeredAt: Date
  ) { }

  /*
      Un getter nos permite definir una funcion que devuelva un valor y
    poder acceder a ese valor desde la instancia como si fuese una pro-
    piedad mas de nuestro objeto.
      Es ideal para agregar "propiedades" que deben ser calculadas.
      Se puede definir ocupando la palabra clave "get" antes de un metodo.
  */

  // Ejemplo de getter para obtener el nombre completo
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Teniendo en cuenta el tiempo que lleva registrado el cliente devuelve
   * el porcentaje de descuento que le corresponde.
   */
  getLoyaltyDiscount(): number {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(new Date().getFullYear() - 1);
    if (this.registeredAt < oneYearAgo) return 10;

    const twoYearAgo = new Date();
    twoYearAgo.setFullYear(new Date().getFullYear() - 2);
    if (this.registeredAt < twoYearAgo) return 12;

    return 0;
  }
}
