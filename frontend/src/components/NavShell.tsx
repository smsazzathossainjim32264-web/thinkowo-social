'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const nav = [
  ['Feed', '/feed'],
  ['Messages', '/messages'],
  ['Wallet', '/wallet'],
  ['Subscriptions', '/subscriptions'],
  ['Admin', '/admin'],
  ['Profile', '/profile'],
] as const;

export function NavShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="hidden md:block border-r border-slate-200 dark:border-slate-800 p-4">
        <h1 className="text-xl font-bold text-brand mb-6">Think OwO</h1>
        <nav className="space-y-2">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={clsx('block rounded-xl px-3 py-2', path.startsWith(href) && 'bg-brand text-white')}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-4 pb-20 md:pb-4">{children}</main>
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 grid grid-cols-6 text-xs">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className={clsx('p-3 text-center', path.startsWith(href) && 'text-brand font-bold')}>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
