'use client';
import { api } from '../../../lib/api';

export default function SubscriptionPage() {
  const choose = async (tier: string) => { await api('/subscriptions/change-tier', { method: 'POST', body: JSON.stringify({ tier, payWithCoins: true }) }); alert(`Subscribed: ${tier}`); };
  return <div className="grid md:grid-cols-3 gap-4">{['FREE','PREMIUM','CREATOR_PRO'].map((tier) => <button key={tier} className="card text-left" onClick={() => choose(tier)}><h3 className="font-bold">{tier}</h3><p>Monthly/yearly options supported via backend billing integration.</p></button>)}</div>;
}
