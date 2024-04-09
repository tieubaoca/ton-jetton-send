import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useJettonContract } from './hooks/useJettonContract';
import JettonMetadataDisplay from './Components/JettonMetadata';
import TransferForm from './Components/JettonTransfer';
import { useJettonWalletContract } from './hooks/useJettonWallet';
import { Address } from '@ton/core';

function App() {
  const { value, contract } = useJettonContract();
  const {transfer} = useJettonWalletContract();

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />

        <div className='Card'>
          <b>Jetton Address</b>
          <div className='Hint'>{contract?.address.toString()?.slice(0, 30) + '...'}</div>
        </div>

        <div className='Card'>
          <b>Jetton metadata</b>
          <JettonMetadataDisplay value={value} />
        </div>
      </div>
      <div className='Container'>
        <div className='Card'>
          <b>Transfer Jetton</b>
          <TransferForm onTransfer={
            async (to, amount) => {
              console.log(`Transfering ${amount} jettons to ${to}`);
              transfer(Address.parse(to), BigInt(amount) * BigInt('1000000000'));
            }
          } />
        </div>
      </div>
    </div>
  );
}

export default App
