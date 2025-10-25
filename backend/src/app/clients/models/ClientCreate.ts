import { Client } from "./Client";

/* 
    Debido a que Client es una clase y posee metodos es mas conveniente usar Pick para 
  agarrar solo las propiedades.
*/

export type ClientCreate = Pick<
  Client,
  "firstName" | "lastName" | "email" | "dni" | "cityId" | "address"
>;
