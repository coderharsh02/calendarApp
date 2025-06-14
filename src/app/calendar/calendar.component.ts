import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})


export class CalendarComponent {


  public readonly months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  public readonly days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];


  public selectedYear: number = 1996; // Any Default number
  public selectedMonth: number = 0;

  public monthBlockData: Array<Array<number | null>> = [];
  public dateBlockData: Array<Array<number | null>> = [];

  public constructor() {
    let today = new Date();
    this.setYear(today.getFullYear());
    this.setMonth(today.getMonth());
  }

  public setYear(year: number) {

    if(year < 0) {
      alert("Invalid Year!!");
      return;
    }

    this.selectedYear = year;

    this.monthBlockData = [];
    for (let i = 0; i < 7; i++) {
      let emptyArray: Array<number> = []
      this.monthBlockData.push(emptyArray);
    }

    // start creating dates for each month
    for (let i = 0; i < 12; i++) {
      let firstDateOfMonth = new Date(year, i, 1);
      let day = firstDateOfMonth.getDay() - 1;
      day = day == -1 ? 6 : day;
      this.monthBlockData[day].push(i);
    }

    // find max in all
    let dataBlockLen = this.monthBlockData.length;
    let max = 1;
    for (let i = 0; i < dataBlockLen; i++) {
      let len = this.monthBlockData[i].length;
      if(len > max) max = len;
    }

    for (let i = 0; i < dataBlockLen; i++) {
      let len = this.monthBlockData[i].length;
      if(len < max) 
      {
        for(let j = 0; j < (max - len); j++)
        {
          this.monthBlockData[i].push(null);
        }
      }
    }

    this.setMonth(0);
  }

  public setMonth(month: number) {
    this.selectedMonth = month;
    let firstDateOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
    
    let firstDay = firstDateOfMonth.getDay();
    firstDay = firstDay == 0 ? 7 : firstDay;
    let lastDay = this.getLastDateOfMonth(this.selectedYear, this.selectedMonth);

    this.dateBlockData = [[]];

    for (let day = 1; day < firstDay; day++) {
      this.dateBlockData[0].push(null);
    }

    for(let day = 1; day <= lastDay; day++)
    {
      let idx = this.dateBlockData.length - 1;
      if(this.dateBlockData[idx].length == 7) {
        this.dateBlockData.push([]);
        idx++;
      }
      this.dateBlockData[idx].push(day);
    }

    // fill the last till 7
    let idx = this.dateBlockData.length - 1;
    while(this.dateBlockData[idx].length < 7) this.dateBlockData[idx].push(null);
  }

  public getLastDateOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }
}
