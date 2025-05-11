export interface ScheduledBy {
  id: number;
  first_name: string;
  last_name: string;
}

export interface HearingSchedule {
  id: number;
  scheduled_date: string;
  schedule_status: string;
  reschedule_reason: string | null;
  scheduled_by: ScheduledBy;
  case_title: string;
  case_number: string | null;
  hearing_status: string;
  hearing_type_name: string;
}

export interface ScheduleResponse {
  status: string;
  message: string | null;
  data: HearingSchedule[];
}
