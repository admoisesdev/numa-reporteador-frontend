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
  Spinner,
} from "../ui";

import { contractsCustomerColumns } from "routes/customer/contracts-customer-columns";

import type { Customer } from "domain/entities";

import { ReceiptText } from "lucide-react";
import { PdfMapper } from "infrastructure/mappers";

interface CustomerContractsProps {
  customer: Customer;
}

export const CustomerContracts = ({ customer }: CustomerContractsProps) => {
  const [isOpenPDf, setIsOpenPDf] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );
  const [pdfKey, setPdfKey] = useState(0);

  const { queryContractsCustomer } = useContractsCustomer({
    customerId: customer.id,
  });

  const { accountStatus, queryAccountStatus } = useAccountStatus({
    contractId: selectedContractId!,
  });

  const handlePrint = (contractId: string) => {
    setSelectedContractId(contractId);
    setPdfKey((prevKey) => prevKey + 1);
    setIsOpenPDf(true);
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

          {queryAccountStatus.isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Spinner className="text-slate-500" size="large">
                <span className="text-slate-500 text-xl">
                  Cargando estado de cuenta...
                </span>
              </Spinner>
            </div>
          ) : (
            isOpenPDf &&
            queryAccountStatus.data && (
              <VisorPdf
                key={pdfKey}
                pdfDocument={
                  <AccountStatusPdf
                    data={PdfMapper.fromAccountStatusToPdfData(
                      accountStatus!,
                      customer.name
                    )}
                  />
                }
              />
            )
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
