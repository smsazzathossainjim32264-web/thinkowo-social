'use client';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

export default function WalletPage() {
  const [wallet, setWallet] = useState<{ balance: number; transactions: any[] }>({ balance: 0, transactions: [] });
  useEffect(() => { void api('/wallet/me').then(setWallet); }, []);
  return <div className="space-y-4"><div className="card"><h2 className="font-semibold">OwO Balance: {wallet.balance}</h2></div><div className="card"><h3 className="font-semibold mb-2">Transactions</h3>{wallet.transactions.map((tx) => <p key={tx.id} className="text-sm">{tx.type} {tx.amount}</p>)}</div></div>;
}
