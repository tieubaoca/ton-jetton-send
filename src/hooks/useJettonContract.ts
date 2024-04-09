import { useEffect, useState } from 'react';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, Cell } from '@ton/core';
import { JettonMaster } from '@ton/ton';

export function useJettonContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | {
    totalSupply: bigint;
    mintable: boolean;
    adminAddress: Address;
    content: Cell;
    walletCode: Cell;
  }>();

  const jettonContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new JettonMaster(
      Address.parse('EQAEEl0w0CHKOWA0GUNwt69G-Jf8sG614gOUz0sfyidclDuP') // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<JettonMaster>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!jettonContract) return;
      setVal(null);
      const val = await jettonContract.getJettonData();
      setVal(val);
    }
    getValue();
  }, [jettonContract]);

  return {
    value: val,
    contract: jettonContract,
  };
}
