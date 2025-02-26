import { useState } from "react";

import {
  useAccountStatus,
  useContractsCustomer,
} from "presentation/hooks/contract";
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
  const [isOpenPDf, setIsOpenPDf] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );
  const { queryContractsCustomer } = useContractsCustomer({
    customerId: customer.id,
  });

  const { accountStatus } = useAccountStatus({
    contractId: selectedContractId!,
  });

  const handlePrint = (contractId: string) => {
    setSelectedContractId(contractId);
    setIsOpenPDf(true);
  };

  const data = {
    logo: "./logo.jpg",
    title: "Numa S.A.S",
    subtitle: "Estado de cuenta",
    date: new Date().toLocaleDateString(),
    contractsCustomerColumns: ["Producto", "Cantidad", "Precio"],
    info: [
      { key: "fecha del corte", value: DateAdapter.formatDate(new Date()) },
      { key: "proyecto", value: accountStatus?.contract.project! },
      { key: "cliente", value: customer.name },
      { key: "modelo", value: accountStatus?.contract.location! },
      { key: "urbanizacion", value: accountStatus?.contract.project! },
      {
        key: "fecha cont",
        value: accountStatus?.contract.closingDate! ?? "N/A",
      },
      {
        key: "tipo del bien",
        value: accountStatus?.contract.typeOfGood! ?? "N/A",
      },
      { key: "estado cont", value: accountStatus?.contract.status! ?? "N/A" },
      { key: "Nro. contrato", value: accountStatus?.contract.id! },
      {
        key: "asesor de crédito",
        value: accountStatus?.contract.creditAdvisor! ?? "N/A",
      },
      {
        key: "vendedor",
        value: accountStatus?.contract.sellerCustomer! ?? "N/A",
      },
      { key: "moneda", value: accountStatus?.contract.currency! ?? "N/A" },
      {
        key: "precio de venta",
        value: accountStatus?.contract.salePrice! ?? "N/A",
      },
    ],
    paymentInfo: [
      {
        key: "cuota de entrada",
        value: accountStatus?.contract.entranceValue! ?? "N/A",
      },
      {
        key: "pago inicial",
        value: accountStatus?.contract.reserveValue! ?? "N/A",
      },
      {
        key: "saldo cuota de entrada",
        value: accountStatus?.contract.entryFeeBalance! ?? "N/A",
      },
      {
        key: "credito institucion financiera",
        value: accountStatus?.contract.balanceValue! ?? "N/A",
      },
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
        <Button className="mr-2 bg-slate-700 text-white" size="icon">
          <ReceiptText className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[90%] min-h-11/12 bg-white border-none m-3">
        <DialogHeader>
          <DialogTitle className="flex gap-3 mx-2 uppercase text-gray-700 text-md">
            <span className="font-bold text-slate-950">
              Contratos de cliente:
            </span>{" "}
            {customer.identification} - {customer.name}
          </DialogTitle>

          <DataTable
            columns={contractsCustomerColumns}
            data={queryContractsCustomer?.data ?? []}
            isLoading={queryContractsCustomer.isLoading}
            metaData={{ handlePrint }}
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
