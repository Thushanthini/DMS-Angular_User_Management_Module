import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from 'src/app/user-api.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  userList$!:Observable<any[]>;

  constructor(private service: UserApiService) { }

  ngOnInit(): void {
    this.userList$ = this.service.getUserList();
  }

  // Variables (properties)
  modalTitle:string = '';
  activateAddEditUserComponent:boolean = false;
  user:any;

  modalAdd() {
    this.user = {
      id:0,
      userID:null,
      firstName:null,
      lastName:null,
      jobPosition:null,
      email:null,
      userRole:null
    }
    this.modalTitle = "Add User";
    this.activateAddEditUserComponent = true;
  }

  modalEdit(item:any) {
    this.user = item;
    this.modalTitle = "Edit Inspection";
    this.activateAddEditUserComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete User ${item.id}`)) {
      this.service.deleteUser(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.userList$ = this.service.getUserList();
      })
    }
  }

  modalClose() {
    this.activateAddEditUserComponent = false;
    this.userList$ = this.service.getUserList();
  }

}
