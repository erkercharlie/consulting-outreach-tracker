import { sampleData } from '../data/sampleData';
import type { CRMData } from '../types';
const KEY = 'consulting-outreach-tracker:data';
const seedOverrides: Record<string, Partial<CRMData['contacts'][number]>> = {
  'contact-justin-stollberg': { responseStatus: 'No Response', dateOfResponse: '', notes: 'No response yet.' },
  'contact-teller-cunningham': { responseStatus: 'No Response', dateOfResponse: '', notes: 'No response yet.' },
  'contact-nash-farley': { responseStatus: 'Not Yet Reached Out', dateOfResponse: '', notes: '' },
  'contact-eric-harrison': { responseStatus: 'Not Yet Reached Out', dateOfResponse: '', notes: '' },
  'contact-nick-redmond': { responseStatus: 'Not Yet Reached Out', dateOfResponse: '', notes: '' },
  'contact-shawn-craig': { responseStatus: 'Not Yet Reached Out', dateOfResponse: '', notes: '' },
  'contact-erin-whitehurst': { responseStatus: 'Standing', dateOfResponse: '', notes: '' },
  'contact-josh-wexler': { responseStatus: 'Standing', dateOfResponse: '', notes: '' },
  'contact-dan-reinhardt': { responseStatus: 'Not Yet Reached Out', dateOfResponse: '', notes: '' },
};
const mergeSeedContacts = (data: CRMData): CRMData => {
  const contactIds = new Set(data.contacts.map(contact => contact.id));
  const interactionIds = new Set(data.interactions.map(interaction => interaction.id));
  return {
    ...data,
    contacts: [...data.contacts, ...sampleData.contacts.filter(contact => !contactIds.has(contact.id))].map(contact => seedOverrides[contact.id] ? { ...contact, ...seedOverrides[contact.id] } : contact),
    interactions: [...data.interactions, ...sampleData.interactions.filter(interaction => !interactionIds.has(interaction.id))],
  };
};
const normalize = (data: CRMData): CRMData => mergeSeedContacts({ ...data, firms: data.firms.map(firm => ({ ...firm, applicationOpenDate: firm.applicationOpenDate || '' })) });
export function loadData(): CRMData { try { const raw = localStorage.getItem(KEY); return raw ? normalize(JSON.parse(raw) as CRMData) : normalize(sampleData); } catch { return normalize(sampleData); } }
export function saveData(data: CRMData) { localStorage.setItem(KEY, JSON.stringify(data)); }
export function resetData(): CRMData { const data = normalize(sampleData); saveData(data); return data; }
export function exportData(data: CRMData) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'consulting-outreach-tracker-export.json'; a.click(); URL.revokeObjectURL(url); }
