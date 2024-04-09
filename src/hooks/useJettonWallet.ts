import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, toNano } from '@ton/core';
import { useTonConnect } from './useTonConnect';
import { useJettonContract } from './useJettonContract';
import { transfer } from '../contract/JettonWalletContract';
import { useTonAddress } from '@tonconnect/ui-react';

export function useJettonWalletContract() {
  const { tonConnectUI } = useTonConnect();
  const clientAddress = useTonAddress();
  console.log('Client address:', clientAddress);
  const { contract } = useJettonContract();

  const walletAddress = useAsyncInitialize(
    async () => await contract?.getWalletAddress(Address.parse(clientAddress))
  );

  console.log('Wallet address:', walletAddress?.toRawString());

  const _transfer = async (to: Address, amount: bigint) => {
    if (!walletAddress) return;
    const body = transfer(to, Address.parse(clientAddress), amount);
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 360,

      messages: [
        {
          address: walletAddress.toRawString(),
          amount: toNano(0.05).toString(),
          payload: body.toBoc().toString('base64'),
        },
      ],
    });
  };

  return {
    transfer: _transfer,
  };
}
