'use client';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

export default function ProfilePage() {
  const [me, setMe] = useState<any>(null);
  useEffect(() => { void api('/users/me').then(setMe); }, []);
  return <div className="card"><h2 className="font-semibold">Profile</h2>{me && <pre className="text-sm mt-2">{JSON.stringify(me, null, 2)}</pre>}</div>;
}
