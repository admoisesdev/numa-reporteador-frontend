import { useState } from "react"

export const useAccountStatus = () => {
  const [contractId, setContractId] = useState("");
  const [isOpenPDf, setIsOpenPDf] = useState(false);

  const handleContractId = (id: string) => {
    setContractId(id);
    setIsOpenPDf(true);
  }

  return {
    contractId,
    isOpenPDf,
    handleContractId,
  };

}