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
    date: "2024-11-25",
    time: "09:00",
    type: "Medical",
    provider: "Dr. Smith",
    location: "Main Street Medical Center",
    notes: "Bring medical history"
  },
  {
    id: "2",
    title: "Dental Cleaning",
    date: "2024-11-26",
    time: "14:30",
    type: "Dental",
    provider: "Dr. Johnson",
    location: "Smile Dental Care"
  },
  {
    id: "3",
    title: "Eye Exam",
    date: "2024-11-27",
    time: "11:00",
    type: "Vision",
    provider: "Dr. Williams",
    location: "Clear Vision Center"
  },
  {
    id: "4",
    title: "Blood Test",
    date: "2024-11-28",
    time: "08:30",
    type: "Lab Test",
    provider: "City Lab Services",
    location: "Downtown Medical Lab",
    notes: "Fasting required"
  },
  {
    id: "5",
    title: "Follow-up Visit",
    date: "2024-11-29",
    time: "15:00",
    type: "Follow-up",
    provider: "Dr. Smith",
    location: "Main Street Medical Center"
  }
];
