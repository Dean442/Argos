import {MandateDescription} from "./MandateDescription";

export interface Mandate{
  id:	string;
  project:	string;
  employee:	string;
  startDate:	Date;
  endDate:	Date;
  description: MandateDescription;
  happiness: number;
}
