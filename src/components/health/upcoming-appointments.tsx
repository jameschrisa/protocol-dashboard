import React, { useState } from 'react';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { format, isAfter } from "date-fns";
import { appointmentsData, Appointment } from "../../data/appointments-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const getAppointmentStyles = (type: string) => {
  const styles = {
    Medical: 'bg-blue-50/50 dark:bg-blue-950/50 hover:bg-blue-100/50 dark:hover:bg-blue-900/50 border-blue-200/50 dark:border-blue-800/50',
    Dental: 'bg-green-50/50 dark:bg-green-950/50 hover:bg-green-100/50 dark:hover:bg-green-900/50 border-green-200/50 dark:border-green-800/50',
    Vision: 'bg-purple-50/50 dark:bg-purple-950/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/50 border-purple-200/50 dark:border-purple-800/50',
    'Lab Test': 'bg-orange-50/50 dark:bg-orange-950/50 hover:bg-orange-100/50 dark:hover:bg-orange-900/50 border-orange-200/50 dark:border-orange-800/50',
    'Follow-up': 'bg-yellow-50/50 dark:bg-yellow-950/50 hover:bg-yellow-100/50 dark:hover:bg-yellow-900/50 border-yellow-200/50 dark:border-yellow-800/50',
    Other: 'bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50'
  };
  return styles[type as keyof typeof styles] || styles.Other;
};

const UpcomingAppointments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notificationTime, setNotificationTime] = useState("15");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Get future appointments
  const futureAppointments = appointmentsData
    .filter(appointment => {
      const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
      return isAfter(appointmentDate, new Date());
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

  const visibleAppointments = futureAppointments.slice(currentIndex, currentIndex + 3);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 3 < futureAppointments.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSetNotification = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleSaveNotification = () => {
    if (selectedAppointment) {
      // Here you would typically integrate with a notification system
      console.log(`Notification set for ${selectedAppointment.title} ${notificationTime} minutes before`);
      setIsDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex + 3 >= futureAppointments.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {visibleAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`p-4 rounded-lg border transition-colors ${getAppointmentStyles(appointment.type)}`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium truncate">{appointment.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(`${appointment.date}T${appointment.time}`), "MMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(`${appointment.date}T${appointment.time}`), "h:mm a")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSetNotification(appointment)}
                  className="flex-shrink-0 ml-2"
                >
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              {appointment.location && (
                <p className="text-sm text-muted-foreground mt-auto truncate">
                  {appointment.location}
                </p>
              )}
            </div>
          </div>
        ))}
        {visibleAppointments.length === 0 && (
          <div className="col-span-3 text-center py-4 text-muted-foreground text-sm">
            No upcoming appointments
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Appointment Reminder</DialogTitle>
            <DialogDescription>
              Choose when you'd like to be reminded about this appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select
              value={notificationTime}
              onValueChange={setNotificationTime}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reminder time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
                <SelectItem value="120">2 hours before</SelectItem>
                <SelectItem value="1440">1 day before</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveNotification}>Save Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UpcomingAppointments;
