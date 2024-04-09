import React, { useState } from 'react';

interface TransferFormProps {
  onTransfer: (to: string, amount: number) => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onTransfer }) => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTransfer(to, amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:
        <input type="text" value={to} onChange={e => setTo(e.target.value)} required />
      </label>
      <label>
        Amount:
        <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value))} required />
      </label>
      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferForm;