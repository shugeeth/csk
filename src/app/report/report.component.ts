import { Component, OnInit } from '@angular/core';
import { Events } from '../models/events';
import { Fellow } from '../models/fellow';
import { FellowStudentsReport } from '../models/student_report';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  fellow: Fellow;
  studentReports: FellowStudentsReport[] = [];
  studentFilteredReports: FellowStudentsReport[] = [];
  filterStudentName: string = '';
  filterEventName: string = '';
  filterRemoveNoEvents: boolean = false;

  constructor(private accountService: AccountService) {
    this.fellow = JSON.parse(localStorage.getItem("fellow"));
    this.initializeData();
    this.copyReportData();
   }

  ngOnInit(): void {
  }

  initializeData(){
    this.fellow.students.forEach( student => {
      // Create empty events array and
      var localSEMap = new Array();
      var localEventsDetails = new Array();

      //Assign student event map to local variable
      this.fellow.students_events_map.forEach(x => {
        localSEMap.push(
          Object.assign({}, x)
        )
      })

      // Filter events to current student alone
      localSEMap = localSEMap.filter((x_map)=>{
        return x_map.student_id == student.student_id;
      })

      // Push event details of the current student's events into the array
      localSEMap.forEach(stueve => {
        var eveIndex = this.fellow.events.findIndex(eve => {
          return eve.event_id == stueve.event_id
        })
        localEventsDetails.push(
          Object.assign({}, this.fellow.events[eveIndex])
        )
      })

      // Prepare the student report object
      this.studentReports.push({
        student_id: student.student_id,
        student_name: student.student_name,
        events: localEventsDetails
      })
    });
  }

  copyReportData(){
    this.studentFilteredReports = this.studentReports;
  }

  onControlsRemoveNoEventsChange(event: boolean){
    this.filterRemoveNoEvents = event;
    this.updateFilteredStudents();
  }

  updateFilteredStudents(){

    //Filter events by removeNoEvents Checkbox
    if(this.filterRemoveNoEvents){
      this.studentFilteredReports = this.studentReports.filter( record => {
        return !(record.events.length == 0)
      })
    }
    else{
      this.studentFilteredReports = this.studentReports;
    }

    //Filter for Student Name and Event Name
    this.studentFilteredReports = this.studentFilteredReports.filter( record => {

      var lowercaseStudentName = record.student_name.toLowerCase();

      //Check whether the given string is the event_name in any object in the array
      var elementExists = function(arr: Events[], value: string){

        var eveIndex = arr.findIndex( (x) => {
          var lowercaseEventName = x.event_name.toLowerCase();
          return lowercaseEventName.includes(value)
        });

        if(eveIndex === -1){
          return 0;
        }
        else{
          return 1;
        }

      };

      //Check for empty strings in student and event name and send results accordingly
      if(this.filterEventName == '' && this.filterStudentName == ''){
        return 1 //Send all records
      }
      else if(!(this.filterEventName == '' || this.filterStudentName == '')){
        //Check for both student and event name
        return lowercaseStudentName.includes(this.filterStudentName.toLowerCase()) ||
             elementExists(record.events, this.filterEventName.toLowerCase())
      }
      else if(this.filterEventName == ''){
        //Check only for student name
        return lowercaseStudentName.includes(this.filterStudentName.toLowerCase())
      }
      else if(this.filterStudentName == ''){
        //Check only for event name
        return elementExists(record.events, this.filterEventName.toLowerCase())
      }

    })

  }

}
