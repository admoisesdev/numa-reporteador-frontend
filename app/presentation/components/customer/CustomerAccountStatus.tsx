import { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";

import { VisorPdf } from "../shared";
import { AccountStatementPdf } from "./AccountStatementPdf";

import { ReceiptText } from "lucide-react";
import type { Customer } from "domain/entities";

interface CustomerAccountStatementsProps {
  // customerId: number;
  customer: Customer;
}

export const CustomerAccountStatus = ({
  customer,
}: CustomerAccountStatementsProps) => {
  const [isOpenPDf, setisOpenPDf] = useState(false);

  const data = {
    logo: "./logo.jpg",
    title: "Numa S.A.S",
    subtitle: "Estado de cuenta",
    date: new Date().toLocaleDateString(),
    columns: ["Producto", "Cantidad", "Precio"],
    info: [
      { key: "fecha del corte", value: "??" },
      { key: "cliente", value: customer.name },
      { key: "urbanizacion", value: "??" },
      { key: "tipo del bien", value: "??" },
      { key: "Nro. contrato", value: "??" },
      { key: "vendedor", value: "??" },
      { key: "precio de venta", value: "??" },
      { key: "Proyecto", value: customer.project },
      { key: "Modelo", value: "??" },
      { key: "Fecha Cont", value: "??" },
      { key: "Estado Cont", value: "??" },
      { key: "Asesor de crédito", value: "??" },
      { key: "Moneda", value: "??" },
    ],
    paymentInfo: [
      { key: "cuota de entrada", value: "??" },
      { key: "pago inicial", value: "??" },
      { key: "saldo cuota de entrada", value: "??" },
      { key: "credito institucion financiera", value: "??" },
    ],
    annulmentColumns: [
      {
        title: "Documento por cobrar",
        subcolumns: ["Nro.", "Documento", "Vcto.", "Valor"],
      },
    ],
    annulmentRows: [
      [["001", "Factura", "01/01/2025", "$1000"]],
      [["002", "Recibo", "01/02/2025", "$500"]],
    ],
    cancelationColumns: [
      {
        title: "Documento por cobrar",
        subcolumns: ["Nro.", "Documento", "Vcto.", "Valor"],
      },
      {
        title: "Cancelaciones",
        subcolumns: ["Mora", "Rec. #", "Fecha", "Valor"],
      },
      {
        title: "Saldo doct.",
        subcolumns: ["Int. Mora", "Valor"],
      },
    ],
    cancelationRows: [
      [
        ["001", "Factura", "01/01/2025", "$1000"],
        ["No", "123", "01/01/2025", "$500"],
        ["$10", "$490"],
      ],
      [
        ["002", "Recibo", "01/02/2025", "$500"],
        ["Yes", "124", "01/02/2025", "$250"],
        ["$5", "$245"],
      ],
    ],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="mr-2 bg-slate-700 text-white"
          size="icon"
          onClick={() => {
            console.log("Imprimir", customer);
            setisOpenPDf(true);
          }}
        >
          <ReceiptText className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-5/6 min-h-11/12 bg-white border-none m-3 px-1 py-2">
        <DialogHeader>
          <DialogTitle className="mx-2 mb-2">
            Contratos de cliente
          </DialogTitle>

          {isOpenPDf && (
            <VisorPdf pdfDocument={<AccountStatementPdf data={data} />} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
