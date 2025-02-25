import { useState } from "react";

import { useAccountStatus, useContractsCustomer } from "presentation/hooks/contract";
import { DataTable, VisorPdf } from "../shared";
import { AccountStatusPdf } from "./AccountStatusPdf";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";

import { contractsCustomerColumns } from "routes/customer/contracts-customer-columns";
import { DateAdapter } from "config/adapters";
import type { Customer } from "domain/entities";

import { ReceiptText } from "lucide-react";

interface CustomerContractsProps {
  customer: Customer;
}

export const CustomerContracts = ({ customer }: CustomerContractsProps) => {
  const { queryContractsCustomer } = useContractsCustomer({
    customerId: customer.id,
  });

  const { contractId, isOpenPDf } = useAccountStatus();
  console.log({contractId});
  const data = {
    logo: "./logo.jpg",
    title: "Numa S.A.S",
    subtitle: "Estado de cuenta",
    date: new Date().toLocaleDateString(),
    contractsCustomerColumns: ["Producto", "Cantidad", "Precio"],
    info: [
      { key: "fecha del corte", value: DateAdapter.formatDate(new Date()) },
      { key: "proyecto", value: customer.project },
      { key: "cliente", value: customer.name },
      { key: "modelo", value: "??" },
      { key: "urbanizacion", value: customer.project },
      { key: "fecha cont", value: "??" },
      { key: "tipo del bien", value: "??" },
      { key: "estado cont", value: "??" },
      { key: "Nro. contrato", value: "??" },
      { key: "asesor de crédito", value: "??" },
      { key: "vendedor", value: "??" },
      { key: "moneda", value: "??" },
      { key: "precio de venta", value: "??" },
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
        >
          <ReceiptText className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[90%] min-h-11/12 bg-white border-none m-3">
        <DialogHeader>
          <DialogTitle className="flex gap-3 mx-2 mb-2 uppercase text-gray-700 text-md">
            <span className="font-bold text-slate-950">
              Contratos de cliente:
            </span>{" "}
            {customer.identification} - {customer.name}
          </DialogTitle>

          <DataTable
            columns={contractsCustomerColumns}
            data={queryContractsCustomer?.data ?? []}
            isLoading={queryContractsCustomer.isLoading}
            noDataMessage="No hay contratos de cliente"
            classNameTableHeader="bg-gray-800 border-gray-800"
          />

          {isOpenPDf && (
            <VisorPdf pdfDocument={<AccountStatusPdf data={data} />} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
