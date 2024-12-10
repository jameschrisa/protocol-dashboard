import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { appointmentsData, Appointment } from "../data/appointments-data";
import { CalendarIcon, Clock, MapPin, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import UpcomingAppointments from "../components/health/upcoming-appointments";

interface NewAppointment {
  title: string;
  date: string;
  time: string;
  type: "Medical" | "Dental" | "Vision" | "Follow-up" | "Lab Test" | "Coaching" | "Therapy Session" | "Other";
  provider: string;
  location?: string;
  notes?: string;
}

const getAppointmentStyles = (type: string) => {
  const styles = {
    Medical: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Dental: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Vision: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Lab Test': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'Follow-up': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Coaching': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    'Therapy Session': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    Other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  };
  return styles[type as keyof typeof styles] || styles.Other;
};

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "09:00",
    type: "Medical",
    provider: "",
    location: "",
    notes: ""
  });

  useEffect(() => {
    // Check if we should open the dialog
    const shouldOpenDialog = localStorage.getItem("openNewAppointmentDialog") === "true";
    if (shouldOpenDialog) {
      setIsDialogOpen(true);
      // Clear the flag
      localStorage.removeItem("openNewAppointmentDialog");
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle appointment type selection
  const handleTypeChange = (value: NewAppointment["type"]) => {
    setNewAppointment(prev => ({
      ...prev,
      type: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (appointments.length + 1).toString();
    setAppointments(prev => [...prev, { id: newId, ...newAppointment }]);
    setIsDialogOpen(false);
    setNewAppointment({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "09:00",
      type: "Medical",
      provider: "",
      location: "",
      notes: ""
    });
  };

  // Get appointments for selected date
  const selectedDateAppointments = appointments
    .filter(appointment => {
      const matchesDate = appointment.date === format(selectedDate, 'yyyy-MM-dd');
      if (!searchTerm) return matchesDate;
      
      const searchLower = searchTerm.toLowerCase();
      return matchesDate && (
        appointment.title.toLowerCase().includes(searchLower) ||
        appointment.type.toLowerCase().includes(searchLower) ||
        appointment.provider.toLowerCase().includes(searchLower) ||
        (appointment.location?.toLowerCase().includes(searchLower) || false)
      );
    })
    .sort((a, b) => a.time.localeCompare(b.time));

  // Format time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days = [];
    const startDay = firstDay.getDay();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-28 border border-border/50" />);
    }

    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
      const dayAppointments = appointments.filter(
        appointment => appointment.date === format(date, 'yyyy-MM-dd')
      );

      days.push(
        <button
          key={i}
          onClick={() => setSelectedDate(date)}
          className={`h-28 p-2 border border-border/50 flex flex-col items-start text-left relative
            ${isSelected ? 'bg-primary/10' : 'hover:bg-accent/50'}
            ${isToday ? 'border-primary' : ''}
          `}
        >
          <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm absolute top-1 left-1
            ${isSelected ? 'bg-primary text-primary-foreground' : ''}
            ${isToday ? 'border-2 border-primary' : ''}
          `}>
            {i}
          </span>
          <div className="mt-8 space-y-1 w-full">
            {dayAppointments.slice(0, 2).map((apt, index) => (
              <div
                key={apt.id}
                className={`text-xs truncate px-1.5 py-0.5 rounded ${getAppointmentStyles(apt.type)}`}
              >
                {apt.title}
              </div>
            ))}
            {dayAppointments.length > 2 && (
              <div className="text-xs text-muted-foreground px-1.5">
                +{dayAppointments.length - 2} more
              </div>
            )}
          </div>
        </button>
      );
    }

    return days;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Appointment</DialogTitle>
                <DialogDescription>
                  Add a new appointment to your calendar
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-4">
                    <Input
                      id="title"
                      name="title"
                      placeholder="Appointment Title"
                      value={newAppointment.title}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Select
                      value={newAppointment.type}
                      onValueChange={handleTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select appointment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Medical">Medical</SelectItem>
                        <SelectItem value="Dental">Dental</SelectItem>
                        <SelectItem value="Vision">Vision</SelectItem>
                        <SelectItem value="Follow-up">Follow-up</SelectItem>
                        <SelectItem value="Lab Test">Lab Test</SelectItem>
                        <SelectItem value="Coaching">Coaching</SelectItem>
                        <SelectItem value="Therapy Session">Therapy Session</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="provider"
                      name="provider"
                      placeholder="Provider Name"
                      value={newAppointment.provider}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Location"
                      value={newAppointment.location}
                      onChange={handleInputChange}
                    />
                    <Input
                      id="notes"
                      name="notes"
                      placeholder="Notes"
                      value={newAppointment.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Appointment</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Upcoming Appointments Carousel */}
        <UpcomingAppointments />

        {/* Search and Selected Date */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Appointments List */}
        <Card className="p-4">
          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
            {selectedDateAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{appointment.title}</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {formatTime(appointment.time)}
                      </div>
                      {appointment.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {appointment.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getAppointmentStyles(appointment.type)}`}>
                    {appointment.type}
                  </span>
                </div>
                {appointment.notes && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {appointment.notes}
                  </p>
                )}
              </div>
            ))}
            {selectedDateAppointments.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No appointments scheduled for this date
              </p>
            )}
          </div>
        </Card>

        {/* Calendar Section */}
        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="h-10 flex items-center justify-center font-medium">
                {day}
              </div>
            ))}
            {generateCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
