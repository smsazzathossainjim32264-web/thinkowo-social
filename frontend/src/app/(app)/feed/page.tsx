'use client';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState('');

  const load = async () => setPosts(await api('/posts'));
  useEffect(() => { void load(); }, []);

  return (
    <div className="space-y-4">
      <div className="card space-y-2">
        <h2 className="font-semibold">Create Post</h2>
        <textarea className="w-full border rounded-xl p-2 text-black" value={content} onChange={(e) => setContent(e.target.value)} />
        <button className="rounded-xl bg-brand text-white px-4 py-2" onClick={async () => { await api('/posts', { method: 'POST', body: JSON.stringify({ content }) }); setContent(''); await load(); }}>Post + Earn 2 OwO</button>
      </div>
      {posts.map((post) => <article key={post.id} className="card"><p>{post.content}</p><p className="text-xs mt-2 opacity-70">@{post.author?.username}</p></article>)}
    </div>
  );
}
