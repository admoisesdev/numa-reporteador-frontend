export interface FinancingResponse {
  id: number;
  cabecera_factura: number;
  cabecera_id: number;
  estado_dividendo: string;
  estado: string;
  fecha_creacion: string;
  fecha_pago_div: string;
  fecha_refinanciamiento: null;
  fecha_vencimiento: string;
  mostrar_reporte: boolean;
  numero_dividendo: number;
  tipo_dividendo: string;
  total_dividendo: number;
  valor_dividendos: string;
  valor_interes_div: null;
  valor_mora: null;
  valor_pagado_div: string;
  valor_saldo_div: string;
  id_contrato: string;
}