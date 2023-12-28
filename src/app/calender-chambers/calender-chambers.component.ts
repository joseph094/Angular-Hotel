import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/core';
import { DatePipe } from '@angular/common';
import { addDays, format, parse } from 'date-fns';
import { ChambersService } from '../services/chambers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calender-chambers',
  templateUrl: './calender-chambers.component.html',
  styleUrls: ['./calender-chambers.component.scss']
})
export class CalenderChambersComponent implements OnInit {

  chamberId = this.router.url.split("/")[3];
  reservations: any;
  constructor(private datepipe: DatePipe, private chamberService: ChambersService, private router: Router) { }


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: []
  }

  ngOnInit(): void {
    console.log(this.formatDate("28/12/2023"));
    const originalDate = "28/12/2023";
    const formattedDate = this.formatDate(originalDate);
    console.log("formdated", formattedDate);
    this.Getreservations(this.chamberId)


  }

  formatDate(originalDate: string): string {
    // Parse the date in the "DD/MM/YYYY" format
    const parsedDate = parse(originalDate, 'dd/MM/yyyy', new Date());

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date:', originalDate);
      return 'Invalid Date';
    }

    // Format the date in the desired format ("YYYY-MM-DD")
    return format(parsedDate, 'yyyy-MM-dd');
  }
  formatEndDate(originalDate: string) {
    // Parse the date in the "DD/MM/YYYY" format
    const parsedDate = parse(originalDate, 'dd/MM/yyyy', new Date());

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date:', originalDate);
      return 'Invalid Date';
    }

    // Add a day to the parsed date
    const modifiedDate = addDays(parsedDate, 1);

    // Format the modified date in the desired format ("YYYY-MM-DD")
    return format(modifiedDate, 'yyyy-MM-dd');
  }
  async Getreservations(chamberId: any) {
    const result = await this.chamberService.GetReservationsByChamber(chamberId);
    this.reservations = result;
    this.updateCalendarEvents();

  }
  updateCalendarEvents() {
    // Map reservations to calendar events
    const calendarEvents = this.reservations.map((reservation: any) => ({
      title: 'Reserved',
      start: this.formatDate(reservation.Begin_Date),
      end: this.formatEndDate(reservation.End_Date),
    }));

    // Update the calendar events
    this.calendarOptions.events = calendarEvents;
  }



}



