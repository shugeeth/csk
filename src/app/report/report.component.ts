import { Component, OnInit } from '@angular/core';
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
  filterStudentName: string;
  filterEventName: string;
  filterRemoveNoEvents: boolean;

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

  }

  updateFilteredStudents(){

    console.log(this.filterStudentName)
    console.log(this.filterEventName)
    console.log(this.filterRemoveNoEvents)

    if(!this.filterRemoveNoEvents){
      this.studentFilteredReports = this.studentReports.filter( record => {
        return !(record.events.length == 0)
      })
    }
    else{
      this.studentFilteredReports = this.studentReports;
    }

  }

}
