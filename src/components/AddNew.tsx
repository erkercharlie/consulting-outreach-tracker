import { useState } from 'react';
import type { Contact, CRMData, Firm, Interaction, Task } from '../types';

const today = () => new Date().toISOString().slice(0, 10);
const stages = ['Not Started','Applied','Digital Case','First Round','Second Round','Offer'] as const;
const priorities = ['High','Medium','Low'] as const;
const focuses = ['Strategy Consulting','Operations Consulting'] as const;
const sources = ['LinkedIn','Referral','Webinar','Alumni','Case Competition','Career Fair','Friend','Other'] as const;
const methods = ['LinkedIn','Email','Referral','In Person','Webinar','Career Fair','Other'] as const;
const statuses = ['Not Yet Reached Out','Standing','No Response','Responded','Meeting Scheduled','Met','Follow-Up Needed','Closed'] as const;
const interactionTypes = ['LinkedIn Message','Email','Coffee Chat','Webinar','Info Session','Career Fair','Referral Ask','Follow-Up','Interview','Thank You','Other'] as const;
const taskTypes = ['Follow-Up','Apply','Prepare','Send Thank You','Schedule Meeting','Research Firm'] as const;

type Mode = 'firm' | 'contact' | 'interaction' | 'task';

export default function AddNew({ data, onSaveFirm, onSaveContact, onAddInteraction, onSaveTask, openFirm }: { data: CRMData; onSaveFirm: (firm: Firm) => void; onSaveContact: (contact: Contact) => void; onAddInteraction: (interaction: Interaction) => void; onSaveTask: (task: Task) => void; openFirm: (firm: Firm) => void; }) {
  const [mode, setMode] = useState<Mode>('contact');
  const [message, setMessage] = useState('');
  const firstFirmId = data.firms[0]?.id || '';
  const firstContactId = data.contacts[0]?.id || '';
  const [firmForm, setFirmForm] = useState({ firmName: '', shortName: '', firmType: '', practiceFocus: 'Operations Consulting', targetRole: '', applicationStage: 'Not Started', priority: 'Medium', applicationOpenDate: '', applicationDeadline: '', applicationLink: '', locationPreference: '', notes: '' });
  const [contactForm, setContactForm] = useState({ firmId: firstFirmId, name: '', role: '', email: '', linkedInUrl: '', source: 'Other', relationshipStrength: 3, dateFirstContacted: '', outreachMethod: 'Other', responseStatus: 'Not Yet Reached Out', dateOfResponse: '', notes: '', nextAction: '', nextActionDate: '' });
  const [interactionForm, setInteractionForm] = useState({ firmId: firstFirmId, contactId: firstContactId, interactionType: 'Coffee Chat', interactionDate: today(), summary: '', meetingNotes: '', keyTakeaways: '', followUpRequired: false, nextAction: '', nextActionDate: '' });
  const [taskForm, setTaskForm] = useState({ firmId: firstFirmId, contactId: '', title: '', dueDate: today(), status: 'Open', taskType: 'Follow-Up', notes: '' });

  const firmContacts = data.contacts.filter(contact => contact.firmId === interactionForm.firmId);
  const taskContacts = data.contacts.filter(contact => contact.firmId === taskForm.firmId);

  const confirm = (text: string) => { setMessage(text); window.setTimeout(() => setMessage(''), 2500); };

  const addFirm = () => {
    if (!firmForm.firmName.trim()) return confirm('Add a firm name first.');
    const firm: Firm = { id: crypto.randomUUID(), firmName: firmForm.firmName.trim(), shortName: firmForm.shortName.trim() || firmForm.firmName.trim(), firmType: firmForm.firmType.trim() || 'Consulting', practiceFocus: firmForm.practiceFocus as Firm['practiceFocus'], targetRole: firmForm.targetRole, applicationStage: firmForm.applicationStage as Firm['applicationStage'], priority: firmForm.priority as Firm['priority'], applicationOpenDate: firmForm.applicationOpenDate, applicationDeadline: firmForm.applicationDeadline, applicationLink: firmForm.applicationLink, locationPreference: firmForm.locationPreference, notes: firmForm.notes, createdAt: today(), updatedAt: today() };
    onSaveFirm(firm);
    setFirmForm({ firmName: '', shortName: '', firmType: '', practiceFocus: 'Operations Consulting', targetRole: '', applicationStage: 'Not Started', priority: 'Medium', applicationOpenDate: '', applicationDeadline: '', applicationLink: '', locationPreference: '', notes: '' });
    confirm('Firm added.');
    openFirm(firm);
  };

  const addContact = () => {
    if (!contactForm.firmId) return confirm('Choose a firm first.');
    if (!contactForm.name.trim()) return confirm('Add a contact name first.');
    const contact: Contact = { id: crypto.randomUUID(), firmId: contactForm.firmId, name: contactForm.name.trim(), role: contactForm.role, email: contactForm.email, linkedInUrl: contactForm.linkedInUrl, source: contactForm.source as Contact['source'], relationshipStrength: Number(contactForm.relationshipStrength), dateFirstContacted: contactForm.dateFirstContacted, outreachMethod: contactForm.outreachMethod as Contact['outreachMethod'], responseStatus: contactForm.responseStatus as Contact['responseStatus'], dateOfResponse: contactForm.dateOfResponse, notes: contactForm.notes, nextAction: contactForm.nextAction, nextActionDate: contactForm.nextActionDate, createdAt: today(), updatedAt: today() };
    onSaveContact(contact);
    setContactForm({ ...contactForm, name: '', role: '', email: '', linkedInUrl: '', dateFirstContacted: '', dateOfResponse: '', notes: '', nextAction: '', nextActionDate: '' });
    confirm('Contact added.');
  };

  const addInteraction = () => {
    if (!interactionForm.firmId) return confirm('Choose a firm first.');
    if (!interactionForm.summary.trim()) return confirm('Add a short summary first.');
    const interaction: Interaction = { id: crypto.randomUUID(), firmId: interactionForm.firmId, contactId: interactionForm.contactId, interactionType: interactionForm.interactionType as Interaction['interactionType'], interactionDate: interactionForm.interactionDate, summary: interactionForm.summary, meetingNotes: interactionForm.meetingNotes, keyTakeaways: interactionForm.keyTakeaways, followUpRequired: interactionForm.followUpRequired, nextAction: interactionForm.nextAction, nextActionDate: interactionForm.nextActionDate, createdAt: today(), updatedAt: today() };
    onAddInteraction(interaction);
    setInteractionForm({ ...interactionForm, summary: '', meetingNotes: '', keyTakeaways: '', followUpRequired: false, nextAction: '', nextActionDate: '' });
    confirm('Interaction logged.');
  };

  const addTask = () => {
    if (!taskForm.firmId) return confirm('Choose a firm first.');
    if (!taskForm.title.trim()) return confirm('Add a task title first.');
    const task: Task = { id: crypto.randomUUID(), firmId: taskForm.firmId, contactId: taskForm.contactId, title: taskForm.title, dueDate: taskForm.dueDate, status: taskForm.status as Task['status'], taskType: taskForm.taskType as Task['taskType'], notes: taskForm.notes, createdAt: today(), updatedAt: today() };
    onSaveTask(task);
    setTaskForm({ ...taskForm, title: '', notes: '' });
    confirm('Task added.');
  };

  return <div className="space-y-5">
    <div>
      <h2 className="text-2xl font-bold">Add New</h2>
      <p className="text-slate-500">Create firms, contacts, interactions, and tasks directly in the tracker.</p>
    </div>
    <div className="panel flex flex-wrap gap-2 p-3">
      {(['firm','contact','interaction','task'] as Mode[]).map(option => <button key={option} className={mode === option ? 'btn btn-primary' : 'btn'} onClick={() => setMode(option)}>{option[0].toUpperCase() + option.slice(1)}</button>)}
    </div>
    {message && <div className="rounded-md border border-pine/20 bg-emerald-50 px-4 py-3 text-sm font-semibold text-pine">{message}</div>}

    {mode === 'firm' && <section className="panel grid gap-3 p-5 md:grid-cols-2">
      <input className="field" placeholder="Firm name" value={firmForm.firmName} onChange={e => setFirmForm({ ...firmForm, firmName: e.target.value })} />
      <input className="field" placeholder="Short name" value={firmForm.shortName} onChange={e => setFirmForm({ ...firmForm, shortName: e.target.value })} />
      <input className="field" placeholder="Firm type" value={firmForm.firmType} onChange={e => setFirmForm({ ...firmForm, firmType: e.target.value })} />
      <input className="field" placeholder="Target role" value={firmForm.targetRole} onChange={e => setFirmForm({ ...firmForm, targetRole: e.target.value })} />
      <select className="field" value={firmForm.practiceFocus} onChange={e => setFirmForm({ ...firmForm, practiceFocus: e.target.value })}>{focuses.map(x => <option key={x}>{x}</option>)}</select>
      <select className="field" value={firmForm.applicationStage} onChange={e => setFirmForm({ ...firmForm, applicationStage: e.target.value })}>{stages.map(x => <option key={x}>{x}</option>)}</select>
      <select className="field" value={firmForm.priority} onChange={e => setFirmForm({ ...firmForm, priority: e.target.value })}>{priorities.map(x => <option key={x}>{x}</option>)}</select>
      <input className="field" placeholder="Application link" value={firmForm.applicationLink} onChange={e => setFirmForm({ ...firmForm, applicationLink: e.target.value })} />
      <label><span className="label mb-1 block">Applications open</span><input className="field" type="date" value={firmForm.applicationOpenDate} onChange={e => setFirmForm({ ...firmForm, applicationOpenDate: e.target.value })} /></label>
      <label><span className="label mb-1 block">Applications due</span><input className="field" type="date" value={firmForm.applicationDeadline} onChange={e => setFirmForm({ ...firmForm, applicationDeadline: e.target.value })} /></label>
      <input className="field md:col-span-2" placeholder="Location preference" value={firmForm.locationPreference} onChange={e => setFirmForm({ ...firmForm, locationPreference: e.target.value })} />
      <textarea className="field min-h-24 md:col-span-2" placeholder="Notes" value={firmForm.notes} onChange={e => setFirmForm({ ...firmForm, notes: e.target.value })} />
      <button className="btn btn-primary md:col-span-2" onClick={addFirm}>Add firm</button>
    </section>}

    {mode === 'contact' && <section className="panel grid gap-3 p-5 md:grid-cols-2">
      <select className="field md:col-span-2" value={contactForm.firmId} onChange={e => setContactForm({ ...contactForm, firmId: e.target.value })}>{data.firms.map(firm => <option value={firm.id} key={firm.id}>{firm.firmName}</option>)}</select>
      <input className="field" placeholder="Name" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} />
      <input className="field" placeholder="Role" value={contactForm.role} onChange={e => setContactForm({ ...contactForm, role: e.target.value })} />
      <input className="field" placeholder="Email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
      <input className="field" placeholder="LinkedIn URL" value={contactForm.linkedInUrl} onChange={e => setContactForm({ ...contactForm, linkedInUrl: e.target.value })} />
      <select className="field" value={contactForm.source} onChange={e => setContactForm({ ...contactForm, source: e.target.value })}>{sources.map(x => <option key={x}>{x}</option>)}</select>
      <select className="field" value={contactForm.outreachMethod} onChange={e => setContactForm({ ...contactForm, outreachMethod: e.target.value })}>{methods.map(x => <option key={x}>{x}</option>)}</select>
      <select className="field" value={contactForm.responseStatus} onChange={e => setContactForm({ ...contactForm, responseStatus: e.target.value })}>{statuses.map(x => <option key={x}>{x}</option>)}</select>
      <label><span className="label mb-1 block">Date of contact</span><input className="field" type="date" value={contactForm.dateFirstContacted} onChange={e => setContactForm({ ...contactForm, dateFirstContacted: e.target.value })} /></label>
      <input className="field" placeholder="Next action" value={contactForm.nextAction} onChange={e => setContactForm({ ...contactForm, nextAction: e.target.value })} />
      <input className="field" type="date" value={contactForm.nextActionDate} onChange={e => setContactForm({ ...contactForm, nextActionDate: e.target.value })} />
      <textarea className="field min-h-24 md:col-span-2" placeholder="Notes" value={contactForm.notes} onChange={e => setContactForm({ ...contactForm, notes: e.target.value })} />
      <button className="btn btn-primary md:col-span-2" onClick={addContact}>Add contact</button>
    </section>}

    {mode === 'interaction' && <section className="panel grid gap-3 p-5 md:grid-cols-2">
      <select className="field" value={interactionForm.firmId} onChange={e => setInteractionForm({ ...interactionForm, firmId: e.target.value, contactId: data.contacts.find(c => c.firmId === e.target.value)?.id || '' })}>{data.firms.map(firm => <option value={firm.id} key={firm.id}>{firm.firmName}</option>)}</select>
      <select className="field" value={interactionForm.contactId} onChange={e => setInteractionForm({ ...interactionForm, contactId: e.target.value })}><option value="">No contact / firm-level</option>{firmContacts.map(contact => <option value={contact.id} key={contact.id}>{contact.name}</option>)}</select>
      <select className="field" value={interactionForm.interactionType} onChange={e => setInteractionForm({ ...interactionForm, interactionType: e.target.value })}>{interactionTypes.map(x => <option key={x}>{x}</option>)}</select>
      <input className="field" type="date" value={interactionForm.interactionDate} onChange={e => setInteractionForm({ ...interactionForm, interactionDate: e.target.value })} />
      <input className="field md:col-span-2" placeholder="Summary" value={interactionForm.summary} onChange={e => setInteractionForm({ ...interactionForm, summary: e.target.value })} />
      <textarea className="field min-h-24 md:col-span-2" placeholder="Meeting notes" value={interactionForm.meetingNotes} onChange={e => setInteractionForm({ ...interactionForm, meetingNotes: e.target.value })} />
      <input className="field" placeholder="Next action" value={interactionForm.nextAction} onChange={e => setInteractionForm({ ...interactionForm, nextAction: e.target.value })} />
      <input className="field" type="date" value={interactionForm.nextActionDate} onChange={e => setInteractionForm({ ...interactionForm, nextActionDate: e.target.value })} />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={interactionForm.followUpRequired} onChange={e => setInteractionForm({ ...interactionForm, followUpRequired: e.target.checked })} /> Follow-up required</label>
      <button className="btn btn-primary md:col-span-2" onClick={addInteraction}>Log interaction</button>
    </section>}

    {mode === 'task' && <section className="panel grid gap-3 p-5 md:grid-cols-2">
      <select className="field" value={taskForm.firmId} onChange={e => setTaskForm({ ...taskForm, firmId: e.target.value, contactId: '' })}>{data.firms.map(firm => <option value={firm.id} key={firm.id}>{firm.firmName}</option>)}</select>
      <select className="field" value={taskForm.contactId} onChange={e => setTaskForm({ ...taskForm, contactId: e.target.value })}><option value="">No contact / firm-level</option>{taskContacts.map(contact => <option value={contact.id} key={contact.id}>{contact.name}</option>)}</select>
      <input className="field md:col-span-2" placeholder="Task title" value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} />
      <select className="field" value={taskForm.taskType} onChange={e => setTaskForm({ ...taskForm, taskType: e.target.value })}>{taskTypes.map(x => <option key={x}>{x}</option>)}</select>
      <input className="field" type="date" value={taskForm.dueDate} onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })} />
      <textarea className="field min-h-24 md:col-span-2" placeholder="Notes" value={taskForm.notes} onChange={e => setTaskForm({ ...taskForm, notes: e.target.value })} />
      <button className="btn btn-primary md:col-span-2" onClick={addTask}>Add task</button>
    </section>}
  </div>;
}
