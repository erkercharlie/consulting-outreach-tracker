import type { ReactNode } from 'react';
const colors: Record<string,string> = {
  High:'bg-rose-100 text-rose-800',
  Medium:'bg-amber-100 text-amber-800',
  Low:'bg-slate-100 text-slate-700',
  'Strategy Consulting':'bg-indigo-100 text-indigo-800',
  'Operations Consulting':'bg-teal-100 text-teal-800',
  'Not Started':'bg-slate-100 text-slate-700',
  Applied:'bg-blue-100 text-blue-800',
  'Digital Case':'bg-fuchsia-100 text-fuchsia-800',
  'First Round':'bg-cyan-100 text-cyan-800',
  'Second Round':'bg-violet-100 text-violet-800',
  Offer:'bg-emerald-100 text-emerald-800',
  'Not Yet Reached Out':'bg-stone-100 text-stone-700',
  Standing:'bg-lime-100 text-lime-800',
  'No Response':'bg-slate-100 text-slate-700',
  Responded:'bg-emerald-100 text-emerald-800',
  'Meeting Scheduled':'bg-sky-100 text-sky-800',
  Met:'bg-pine/10 text-pine',
  'Follow-Up Needed':'bg-coral/10 text-red-700',
  Deadline:'bg-red-100 text-red-800', 'Applications Open':'bg-emerald-100 text-emerald-800', 'Applications Due':'bg-red-100 text-red-800',
  'Networking Call':'bg-sky-100 text-sky-800',
  'First Contact':'bg-violet-100 text-violet-800',
  'Follow-Up':'bg-amber-100 text-amber-800',
  Overdue:'bg-red-100 text-red-800',
  Upcoming:'bg-blue-100 text-blue-800'
};
export default function StatusBadge({ children }: { children: ReactNode }) { const key = String(children); return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colors[key] || 'bg-slate-100 text-slate-700'}`}>{children}</span>; }
