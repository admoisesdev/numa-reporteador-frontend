import { Button } from "../ui";

import { Printer } from "lucide-react";

interface CustomerAccountStatusProps {
  contractId: string;
}

export const CustomerAccountStatus = ({contractId }: CustomerAccountStatusProps) => {
  return (
    <Button
      className="mr-2 bg-gray-700 text-white"
      size="icon"
      onClick={() => {}}
    >
      <Printer className="size-5" />
    </Button>
  );
};
