export interface FinancingResponse {
  id: number;
  id_contrato: string;
  cabecera_id: number;
  cabecera_factura: number;
  estado: string;
  numero_dividendo: number;
  tipo_dividendo: string;
  valor_dividendos: string;
  valor_mora: null;
  fecha_refinanciamiento: null;
  total_dividendo: number;
  fecha_creacion: string;
  fecha_vencimiento: string;
  estado_dividendo: string;
  valor_interes_div: null;
  valor_saldo_div: string;
  mostrar_reporte: boolean;
  valor_pagado_div: string;
  fecha_pago_div: string;
}