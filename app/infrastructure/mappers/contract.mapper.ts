import type { Contract } from "domain/entities";
import type { ContractResponse } from "infrastructure/interfaces";

export class ContractMapper{
  static fromResponseContractsCustomerToEntity(response: ContractResponse): Contract{
    return {
      id: response.id,
      location: response.ubicacion,
      sellerCustomer: response.cliente_vendedor,
      project: response.proyecto,
    }
  }
}