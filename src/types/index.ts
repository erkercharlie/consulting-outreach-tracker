export type PracticeFocus = 'Strategy Consulting' | 'Operations Consulting';
export type ApplicationStage = 'Not Started' | 'Applied' | 'Digital Case' | 'First Round' | 'Second Round' | 'Offer';
export type Priority = 'High' | 'Medium' | 'Low';
export type Source = 'LinkedIn' | 'Referral' | 'Webinar' | 'Alumni' | 'Case Competition' | 'Career Fair' | 'Friend' | 'Other';
export type OutreachMethod = 'LinkedIn' | 'Email' | 'Referral' | 'In Person' | 'Webinar' | 'Career Fair' | 'Other';
export type ResponseStatus = 'Not Yet Reached Out' | 'Standing' | 'No Response' | 'Responded' | 'Meeting Scheduled' | 'Met' | 'Follow-Up Needed' | 'Closed';
export type InteractionType = 'LinkedIn Message' | 'Email' | 'Coffee Chat' | 'Webinar' | 'Info Session' | 'Career Fair' | 'Referral Ask' | 'Follow-Up' | 'Interview' | 'Thank You' | 'Other';
export type TaskStatus = 'Open' | 'Completed' | 'Overdue';
export type TaskType = 'Follow-Up' | 'Apply' | 'Prepare' | 'Send Thank You' | 'Schedule Meeting' | 'Research Firm';
export interface Firm { id:string; firmName:string; shortName:string; firmType:string; practiceFocus:PracticeFocus; targetRole:string; applicationStage:ApplicationStage; priority:Priority; applicationOpenDate:string; applicationDeadline:string; applicationLink:string; locationPreference:string; notes:string; createdAt:string; updatedAt:string; }
export interface Contact { id:string; firmId:string; name:string; role:string; email:string; linkedInUrl:string; source:Source; relationshipStrength:number; dateFirstContacted:string; outreachMethod:OutreachMethod; responseStatus:ResponseStatus; dateOfResponse:string; notes:string; nextAction:string; nextActionDate:string; createdAt:string; updatedAt:string; }
export interface Interaction { id:string; firmId:string; contactId:string; interactionType:InteractionType; interactionDate:string; summary:string; meetingNotes:string; keyTakeaways:string; followUpRequired:boolean; nextAction:string; nextActionDate:string; createdAt:string; updatedAt:string; }
export interface Task { id:string; firmId:string; contactId:string; title:string; dueDate:string; status:TaskStatus; taskType:TaskType; notes:string; createdAt:string; updatedAt:string; }
export interface CRMData { firms: Firm[]; contacts: Contact[]; interactions: Interaction[]; tasks: Task[]; }
