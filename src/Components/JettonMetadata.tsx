import React from 'react';
import { Address, Cell } from '@ton/core';

interface ValueProps {
  value: {
    totalSupply: bigint;
    mintable: boolean;
    adminAddress: Address;
    content: Cell;
    walletCode: Cell;
  } | null | undefined;
}

const JettonMetadataDisplay: React.FC<ValueProps> = ({ value }) => {
  if (!value) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div>Total Supply: {(value.totalSupply / BigInt('1000000000')).toString()}</div>
      <div>Mintable: {value.mintable ? 'Yes' : 'No'}</div>
      <div>Admin Address: {value.adminAddress.toString()}</div>
      {/* <div>Content: {JSON.stringify(value.content)}</div> */}
      {/* <div>Wallet Code: {JSON.stringify(value.walletCode)}</div> */}
    </div>
  );
};

export default JettonMetadataDisplay;
