export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "Medical" | "Dental" | "Vision" | "Follow-up" | "Lab Test" | "Other";
  provider: string;
  location?: string;
  notes?: string;
}

export const appointmentsData: Appointment[] = [
  {
    id: "1",
    title: "Annual Physical",
    date: "2025-01-15",
    time: "09:00",
    type: "Medical",
    provider: "Dr. Smith",
    location: "Main Street Medical Center",
    notes: "Bring medical history"
  },
  {
    id: "2",
    title: "Dental Cleaning",
    date: "2025-02-20",
    time: "14:30",
    type: "Dental",
    provider: "Dr. Johnson",
    location: "Smile Dental Care"
  },
  {
    id: "3",
    title: "Eye Exam",
    date: "2025-03-27",
    time: "11:00",
    type: "Vision",
    provider: "Dr. Williams",
    location: "Clear Vision Center"
  },
  {
    id: "4",
    title: "Blood Test",
    date: "2025-04-18",
    time: "08:30",
    type: "Lab Test",
    provider: "City Lab Services",
    location: "Downtown Medical Lab",
    notes: "Fasting required"
  },
  {
    id: "5",
    title: "Follow-up Visit",
    date: "2025-05-22",
    time: "15:00",
    type: "Follow-up",
    provider: "Dr. Smith",
    location: "Main Street Medical Center"
  },
  {
    id: "6",
    title: "Nutrition Consultation",
    date: "2025-06-14",
    time: "10:00",
    type: "Other",
    provider: "Emma Rodriguez, RD",
    location: "Wellness Nutrition Center",
    notes: "Bring food diary"
  },
  {
    id: "7",
    title: "Fitness Assessment",
    date: "2025-07-08",
    time: "13:00",
    type: "Other",
    provider: "Justin Powell",
    location: "Elite Fitness Center",
    notes: "Wear comfortable clothing"
  },
  {
    id: "8",
    title: "Sleep Study Follow-up",
    date: "2025-08-19",
    time: "14:00",
    type: "Follow-up",
    provider: "Dr. Patterson",
    location: "Sleep Recovery Center",
    notes: "Bring sleep log"
  },
  {
    id: "9",
    title: "Mental Health Check-in",
    date: "2025-09-25",
    time: "11:30",
    type: "Medical",
    provider: "Dr. Torres",
    location: "Mental Health Wellness Center"
  },
  {
    id: "10",
    title: "Dental Check-up",
    date: "2025-10-15",
    time: "09:30",
    type: "Dental",
    provider: "Dr. Johnson",
    location: "Smile Dental Care"
  },
  {
    id: "11",
    title: "Annual Physical",
    date: "2025-11-20",
    time: "10:00",
    type: "Medical",
    provider: "Dr. Smith",
    location: "Main Street Medical Center",
    notes: "Annual wellness check"
  },
  {
    id: "12",
    title: "Vision Follow-up",
    date: "2025-12-12",
    time: "15:30",
    type: "Vision",
    provider: "Dr. Williams",
    location: "Clear Vision Center",
    notes: "Bring current glasses"
  }
];
