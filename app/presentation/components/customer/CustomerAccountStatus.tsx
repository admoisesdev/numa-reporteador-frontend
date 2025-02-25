import { useAccountStatus } from "presentation/hooks/contract";
import { Button } from "../ui";

import { Printer } from "lucide-react";

interface CustomerAccountStatusProps {
  contractId: string;
}

export const CustomerAccountStatus = ({
  contractId,
}: CustomerAccountStatusProps) => {
  const { handleContractId } = useAccountStatus();
  return (
    <Button
      className="mr-2 bg-gray-700 text-white"
      size="icon"
      onClick={() => {
        handleContractId(contractId);
      }}
    >
      <Printer className="size-5" />
    </Button>
  );
};
