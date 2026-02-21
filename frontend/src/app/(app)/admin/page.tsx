'use client';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

export default function AdminPage() {
  const [stats, setStats] = useState<any>({});
  useEffect(() => { void api('/admin/stats').then(setStats); }, []);
  return <div className="card"><h2 className="font-semibold">Admin Dashboard</h2><pre className="text-sm mt-2">{JSON.stringify(stats, null, 2)}</pre></div>;
}
