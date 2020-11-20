import { Component, OnInit } from '@angular/core';
import { studentEventGrid } from "../core/models/student-events-info.model";
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../services';
import { Fellow } from '../models';
import { Students } from '../models/students';
import { Events } from '../models/events';

@Component({
  selector: 'app-student-event-grid',
  templateUrl: './student-event-grid.component.html',
  styleUrls: ['./student-event-grid.component.css']
})
export class StudentEventGridComponent implements OnInit {

  fellow: Fellow;
  events: Events[];
  students: Students[];

  constructor(private accountService: AccountService) {
    this.filteredEvents = this.events;
    this.fellow = this.accountService.fellowValue;
    this.students =  this.fellow.students;
    this.events = this.fellow.events;
    this.selectedMode = "1";
    this.selectedWeek = "1";
    this.filteredEvents = this.getEventsFilter();//this.events.filter(t=>t ==this.selectedMode);
    console.log(this.filteredEvents);
  }
  // getFilterByMode(){
  // var index= Number(this.selectedMode) -1;
  // return this.events.filter((event) => event["mode"] === this.modes[index].value);
  // }
  getEventsFilter(){
    return this.events.filter((event) => {
      switch (Number(this.selectedWeek)) {
        case 1:
            console.log("Week 1");
            var tempDay = String(event["event_date"]).substr(0,2);
            var index= Number(this.selectedMode) -1;
            return Number(tempDay) == 28 && event["mode"] === this.modes[index].value;
            break;
        case 2:
            console.log("Week 2");
            var tempDay = String(event["event_date"]).substr(0,2);
            var index= Number(this.selectedMode) -1;
            return Number(tempDay) == 5 && event["mode"] === this.modes[index].value;
            break;
        case 3:
            console.log("Week 3");
            var tempDay = String(event["event_date"]).substr(0,2);
            var index= Number(this.selectedMode) -1;
            return Number(tempDay) == 12 && event["mode"] === this.modes[index].value;
            break;
        case 4:
            console.log("Week 4");
            var tempDay = String(event["event_date"]).substr(0,2);
            var index= Number(this.selectedMode) -1;
            return Number(tempDay) == 19 && event["mode"] === this.modes[index].value;
            break;
      }
      // var index= Number(this.selectedMode) -1;
      // if(event["event_date"] == this.modes[index].value){
      //   return event;
      // }
  })
  }

  ngOnInit(): void {
  }

  faCloudUploadAlt = faCloudUploadAlt;
  selectedWeek: any;
  selectedMode: any;
  filteredWeek: any;
  filteredEvents: any;
  updationDetails: studentEventGrid[] = [];

  weeks = [
    { value: "Week 1", id: "1" },
    { value: "Week 2", id:"2" },
    { value: "Week 3",id:"3" },
    { value: "Week 4" ,id:"4"}
  ];

  modes = [
    { value: "ONLINE", id: "1" },
    { value: "CONFERENCE CALL", id:"2" },
    { value: "OFFLINE",id:"3" }
  ];

  // events = [
  //   { value: "Marathon", id: "1" },
  //   { value: "Dancing", id:"2" },
  //   { value: "Singing",id:"3" },
  //   { value: "Painting" ,id:"4"},
  //   { value: "Fancy Dress",id:"5" },
  //   ];

  // students = [
  //   { value: "Akash", id: "1" },
  //   { value: "Bindhu", id:"2" },
  //   { value: "Catherine",id:"3" },
  //   { value: "David" ,id:"4"},
  //   { value: "Eliza",id:"5" },
  //   ];

  onWeekSelected(){
    console.log(this.selectedWeek);
    this.filteredWeek = this.weeks.filter(t=>t==this.selectedWeek);
    this.filteredEvents = this.getEventsFilter();
    console.log(this.filteredEvents);
  }

  onModeSelected(){
    console.log(this.selectedMode);
    this.filteredEvents = this.getEventsFilter();
    console.log(this.filteredEvents);
  }

  onCheckboxChange(studentId: number, eventId: number, event: any){

    // Find index of student when there is a change in checkbox
    var stuIndex = this.updationDetails.findIndex(obj => obj.id == studentId);

    if(event.target.checked){
      //Logic to add entry from student event grid checkbox
      if(stuIndex!=-1){
        if(this.updationDetails[stuIndex].events.length>=3){
          event.target.checked = false;
        }
        else{
          this.updationDetails[stuIndex].events.push(eventId);
        }
      }
      else{
        this.updationDetails.push({ id: studentId, events:[eventId] });
      }
    }
    else{
      // Remove event array element while unchecked
      var eveIndex = this.updationDetails[stuIndex].events.findIndex((obj => obj == eventId));
      this.updationDetails[stuIndex].events.splice(eveIndex,1); // Remove one element from the index
    }
    console.dir(this.updationDetails);

  }

}
