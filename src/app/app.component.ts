import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { studentEventGrid } from "./core/models/student-events-info.model";
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chennai Students Kondattam';
  faCloudUploadAlt = faCloudUploadAlt;
  isCollapsed = true;
  selectedSchool: any;
  selectedFellow: any;
  filteredSchool: any;
  updationDetails: studentEventGrid[] = [];

  schools = [
    { value: "CHSS Velachery", id: "1" },
    { value: "CHSS TH.Road", id:"2" },
    { value: "CHS Pudumanaikuppam",id:"3" },
    { value: "CPS TH.Road" ,id:"4"},
    { value: "CHSS TVSamyRoad",id:"5" },
    ];

  fellows = [
    { value: "Daniel", id: "1" },
    { value: "Rajesh", id:"2" },
    { value: "Kesava",id:"3" },
    { value: "Madhu" ,id:"4"},
    { value: "Divya",id:"5" },
    ];

  events = [
    { value: "Marathon", id: "1" },
    { value: "Dancing", id:"2" },
    { value: "Singing",id:"3" },
    { value: "Painting" ,id:"4"},
    { value: "Fancy Dress",id:"5" },
    ];

  students = [
    { value: "Akash", id: "1" },
    { value: "Bindhu", id:"2" },
    { value: "Catherine",id:"3" },
    { value: "David" ,id:"4"},
    { value: "Eliza",id:"5" },
    ];

  onSchoolSelected(){
    console.log(this.selectedSchool);
    this.filteredSchool = this.schools.filter(t=>t==this.selectedSchool);
  }

  onFellowSelected(){
    console.log(this.selectedFellow);
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

  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
