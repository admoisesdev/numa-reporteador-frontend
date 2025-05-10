import { companyColumns } from "routes/company/company-columns";
import { DataTable } from "../shared";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";

import type { UserCompany } from "domain/entities";

import { Handshake } from "lucide-react";

interface CustomerContractsProps {
  user: UserCompany;
}

export const UserCompanies = ({ user }: CustomerContractsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-2 bg-slate-700 text-white" size="icon">
          <Handshake className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[90%] min-h-11/12 bg-white border-none m-3">
        <DialogHeader>
          <DialogTitle className="flex gap-1 mx-2 uppercase text-gray-700 text-md">
            Empresas asociadas a{" "}
            <span className="font-bold text-gray-800">
              {user.name} {user.lastName}:
            </span>
          </DialogTitle>

          <DataTable
            columns={companyColumns}
            data={user.companies ?? []}
            noDataMessage="No hay empresas de usuario"
            classNameTableHeader="bg-gray-800 border-gray-800"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
