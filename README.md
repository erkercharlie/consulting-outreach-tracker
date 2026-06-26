# consulting-outreach-tracker

Local iteration copy: this version is meant for previewing and editing before publishing. It does not include the GitHub Pages workflow and uses Vite's normal local development path.

A lightweight personal CRM for consulting recruiting. The app is organized firm-first so each target firm behaves like an account with application status, deadlines, contacts, outreach history, meetings, notes, follow-ups, and next actions.

## Features

- Dashboard with total firms, contacts, outreach volume, response rate, open follow-ups, overdue follow-ups, upcoming deadlines, and next actions
- Firm list with filters for practice focus, firm type, application stage, priority, and overdue follow-ups
- Sort firms by deadline, priority, application stage, recent activity, or number of contacts
- Firm detail view for application stage, deadline, target role, location preference, notes, contacts, interactions, and tasks
- Contact add, edit, delete, and detail modal
- Interaction logging from the contact modal
- Global outreach log with filters for firm, response status, outreach method, and interaction type
- Calendar tab for application deadlines, scheduled networking calls, follow-ups, and contact dates
- Follow-up queue with default cadence rules for overdue actions, no response after 7 days, meeting thank-you notes, and deadlines within 7 days
- Analytics for response rates, response rate by method/source, contacts by firm, firms by stage, and meeting conversion
- Browser local storage persistence
- Reset demo data, export JSON, and import JSON

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Local storage
- lucide-react icons

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## Prototype Limitations

This is intentionally a 1-hour working prototype. It uses local storage only, simple forms, lightweight table filtering, and simple analytics. There is no authentication, backend, Google Sheets integration, Gmail integration, LinkedIn integration, calendar integration, AI drafting, push notifications, or complex charting.

## Future Roadmap

- Google Sheets backend
- Gmail integration
- LinkedIn integration
- Calendar integration
- AI-generated outreach drafts
- Automated email reminders
- Push notifications
- Multi-device sync
- Authentication
- Cloud database
- File attachments
- Resume/application document tracking
- More advanced charts and recruiting funnel reports
- Saved views and custom cadence rules

## Getting Caught Up

This local version starts empty so you can enter only real recruiting data. The fastest catch-up flow is:

1. Add every firm you are actively considering.
2. Set each firm's application stage, deadline, target role, practice focus, and priority.
3. Add only real contacts you have contacted or plan to contact soon, including the date of contact.
4. Log past meaningful interactions, such as coffee chats, emails, webinars, referrals, or interviews.
5. Set a next action and next action date for each active contact or firm.
6. Use Follow-Ups as the daily working queue.

If you already have the information in a spreadsheet, export it as JSON in the app's shape and use Settings -> Import JSON.

## Deadline Sourcing Notes

The local seed data now includes only your actual target firms. BCG is marked as First Round, Bain as Applied, and the remaining firms as Not Started.

Verified posted dates added:

- BCG: July 7, 2026 for US Full Time Associate candidates graduating December 2026-August 2027, from BCG Careers.
- Bain: July 19, 2026 for undergraduate full-time Associate Consultant, from Yale Office of Career Strategy's MBB deadline summary.

For Accenture, Accenture Strategy, EY, EY-Parthenon, Strategy&, PwC, Deloitte, RSM D360, and Grant Thornton, no single universal public deadline was visible from the accessible official pages. These should be confirmed through the firm's job portal, your school career portal, or Handshake when the relevant role opens.
