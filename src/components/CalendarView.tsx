import { useMemo, useState } from 'react';
import type { CRMData } from '../types';
import StatusBadge from './StatusBadge';

type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  type: 'Applications Open' | 'Applications Due' | 'Networking Call' | 'First Contact' | 'Follow-Up';
  firmName: string;
  contactName?: string;
  detail?: string;
};

const monthLabel = (month: string) => new Date(month + '-02T00:00:00').toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

export default function CalendarView({ data }: { data: CRMData }) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [month, setMonth] = useState(currentMonth);
  const [filter, setFilter] = useState('All');

  const events = useMemo(() => {
    const all: CalendarEvent[] = [];
    data.firms.forEach(firm => {
      if (firm.applicationOpenDate) {
        all.push({ id: 'open-' + firm.id, date: firm.applicationOpenDate, title: 'Applications open', type: 'Applications Open', firmName: firm.firmName, detail: firm.targetRole });
      }
      if (firm.applicationDeadline) {
        all.push({ id: 'deadline-' + firm.id, date: firm.applicationDeadline, title: 'Applications due', type: 'Applications Due', firmName: firm.firmName, detail: firm.targetRole });
      }
    });
    data.contacts.forEach(contact => {
      const firm = data.firms.find(f => f.id === contact.firmId);
      if (!firm) return;
      if (contact.dateFirstContacted) {
        all.push({ id: 'first-contact-' + contact.id, date: contact.dateFirstContacted, title: 'Date of contact', type: 'First Contact', firmName: firm.firmName, contactName: contact.name, detail: contact.outreachMethod });
      }
      if (contact.nextActionDate) {
        const isCall = /call|chat|meeting|coffee|schedule/i.test(contact.nextAction);
        all.push({ id: 'next-action-' + contact.id, date: contact.nextActionDate, title: isCall ? 'Scheduled networking call' : 'Follow-up due', type: isCall ? 'Networking Call' : 'Follow-Up', firmName: firm.firmName, contactName: contact.name, detail: contact.nextAction });
      }
    });
    data.interactions.forEach(interaction => {
      const firm = data.firms.find(f => f.id === interaction.firmId);
      const contact = data.contacts.find(c => c.id === interaction.contactId);
      if (!firm || !interaction.nextActionDate) return;
      const isCall = /call|chat|meeting|coffee|schedule/i.test(interaction.nextAction) || ['Coffee Chat', 'Info Session', 'Interview'].includes(interaction.interactionType);
      all.push({ id: 'interaction-next-' + interaction.id, date: interaction.nextActionDate, title: isCall ? 'Scheduled networking call' : 'Interaction follow-up', type: isCall ? 'Networking Call' : 'Follow-Up', firmName: firm.firmName, contactName: contact?.name, detail: interaction.nextAction || interaction.summary });
    });
    return all.sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  const visibleEvents = events.filter(event => event.date.startsWith(month) && (filter === 'All' || event.type === filter));
  const grouped = visibleEvents.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    acc[event.date] = acc[event.date] || [];
    acc[event.date].push(event);
    return acc;
  }, {});
  const year = Number(month.slice(0, 4));
  const monthIndex = Number(month.slice(5, 7)) - 1;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => month + '-' + String(i + 1).padStart(2, '0'));
  const trailingBlanks = (7 - ((firstWeekday + daysInMonth) % 7)) % 7;
  const calendarCells = [
    ...Array.from({ length: firstWeekday }, () => ''),
    ...monthDays,
    ...Array.from({ length: trailingBlanks }, () => ''),
  ];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return <div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold">Calendar</h2>
        <p className="text-slate-500">Application open dates, due dates, scheduled networking calls, follow-ups, and dates of first contact.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <input className="field w-44" type="month" value={month} onChange={e => setMonth(e.target.value)} />
        <select className="field w-48" value={filter} onChange={e => setFilter(e.target.value)}>
          {['All', 'Applications Open', 'Applications Due', 'Networking Call', 'First Contact', 'Follow-Up'].map(option => <option key={option}>{option}</option>)}
        </select>
      </div>
    </div>
    <section className="panel p-5">
      <h3 className="mb-4 text-lg font-bold">{monthLabel(month)}</h3>
      <div className="grid grid-cols-7 overflow-hidden rounded-md border border-slate-200">
        {weekdays.map(dayName => <div key={dayName} className="border-b border-slate-200 bg-slate-100 px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">{dayName}</div>)}
        {calendarCells.map((day, index) => <div key={day || 'blank-' + index} className={day ? "min-h-36 border-b border-r border-slate-200 bg-white p-2" : "min-h-36 border-b border-r border-slate-200 bg-slate-50 p-2"}>
          {day && <><div className="mb-2 text-sm font-semibold text-slate-500">{Number(day.slice(-2))}</div>
          <div className="space-y-2">
            {(grouped[day] || []).map(event => <div key={event.id} className="rounded-md bg-slate-50 p-2 text-xs">
              <div className="mb-1"><StatusBadge>{event.type}</StatusBadge></div>
              <p className="font-semibold text-ink">{event.title}</p>
              <p className="text-slate-600">{event.firmName}</p>
              {event.contactName && <p className="text-slate-500">{event.contactName}</p>}
              {event.detail && <p className="mt-1 text-slate-500">{event.detail}</p>}
            </div>)}
          </div></>}
        </div>)}
      </div>
    </section>
    <section className="panel overflow-hidden">
      <div className="border-b border-slate-200 p-4"><h3 className="font-semibold">Agenda</h3></div>
      <div className="divide-y divide-slate-100">
        {visibleEvents.map(event => <div key={event.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="font-semibold">{event.date} - {event.title}</p>
            <p className="text-sm text-slate-500">{event.firmName}{event.contactName ? ' - ' + event.contactName : ''}{event.detail ? ' - ' + event.detail : ''}</p>
          </div>
          <StatusBadge>{event.type}</StatusBadge>
        </div>)}
        {!visibleEvents.length && <p className="p-5 text-sm text-slate-500">No calendar items for this month.</p>}
      </div>
    </section>
  </div>;
}
