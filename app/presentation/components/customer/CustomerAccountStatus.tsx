import { Button } from "../ui";

import { Printer } from "lucide-react";

interface CustomerAccountStatusProps {
  contractId: string;
  handlePrint?: (contractId: string) => void;
}

export const CustomerAccountStatus = ({contractId, handlePrint }: CustomerAccountStatusProps) => {
  return (
    <Button
      className="mr-2 bg-gray-700 text-white"
      size="icon"
      onClick={() => handlePrint && handlePrint(contractId)}
    >
      <Printer className="size-5" />
    </Button>
  );
};
