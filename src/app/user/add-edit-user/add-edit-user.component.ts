import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from 'src/app/user-api.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  userList$!: Observable<any[]>;

  constructor(private service: UserApiService) { }

  @Input() user: any;
  id: number = 0;
  userID: string = "";
  firstName: string = "";
  lastName: string = "";
  jobPosition: string = "";
  email: string = "";
  userRole: string = "";

  ngOnInit(): void {
    this.id = this.user.id;
    this.userID = this.user.userID;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.jobPosition = this.user.jobPosition;
    this.email = this.user.email;
    this.userRole = this.user.userRole;
    this.userList$ = this.service.getUserList();
  }

  addUser() {
    var user = {
      userID: this.userID,
      firstName: this.firstName,
      lastName: this.lastName,
      jobPosition: this.jobPosition,
      email: this.email,
      userRole: this.userRole
    }
    this.service.addUser(user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  updateUser() {
    var user = {
      id: this.id,
      userID: this.userID,
      firstName: this.firstName,
      lastName: this.lastName,
      jobPosition: this.jobPosition,
      email: this.email,
      userRole: this.userRole
    }
    var id: number = this.id;
    this.service.updateUser(id, user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function () {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

}
