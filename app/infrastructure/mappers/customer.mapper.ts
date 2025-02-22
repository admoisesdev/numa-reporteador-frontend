import type { Customer } from "domain/entities";
import type { CustomerResponse } from "infrastructure/interfaces";

export class CustomerMapper{
  static fromResponseCustomerToEntity(response: CustomerResponse): Customer{
    return {
      id: response.id,
      identification: response.identificacion,
      project: response.proyecto,
      name: response.nombre,
      phone: response.telefono,
      email: response.email,
    }
  }
}