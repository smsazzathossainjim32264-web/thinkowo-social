'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('alice@thinkowo.dev');
  const [password, setPassword] = useState('Password123!');
  const router = useRouter();

  const submit = async () => {
    const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    localStorage.setItem('token', data.token);
    router.push('/feed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md space-y-3">
        <h1 className="text-2xl font-bold text-brand">Think OwO</h1>
        <input className="w-full rounded-xl border p-2 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-xl border p-2 text-black" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded-xl bg-brand text-white p-2" onClick={submit}>Login</button>
      </div>
    </div>
  );
}
