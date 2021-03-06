import { Events } from './events';
import { Students } from './students';
import { StudentsEventsMap } from './students_events_map';

export class Fellow {
  fellow_id: number;
  cohort: number;
  ttf_flag: boolean;
  first_name: string;
  last_name: string;
  school_name: string;
  token: string;
  students:Students[];
  events:Events[];
  students_events_map: StudentsEventsMap[];
}
