'use client';
import { useState } from 'react';

export default function MessagesPage() {
  const [typing, setTyping] = useState(false);
  return <div className="card"><h2 className="font-semibold mb-2">Realtime Messaging</h2><p>Typing indicator: {typing ? 'active' : 'idle'}</p><input onChange={() => setTyping(true)} className="mt-2 border rounded-xl p-2 w-full text-black" placeholder="Type a message" /></div>;
}
