import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from 'src/app/user-api.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userList$!: Observable<any[]>;

  form: FormGroup = new FormGroup({
    userID: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    jobPosition: new FormControl(''),
    email: new FormControl(''),
    userRole: new FormControl('')
  });
  submitted = false;

  constructor(private service: UserApiService, private formBuilder: FormBuilder) { }

  @Input() user: any;
  id: number = 0;
  userID: string = "";
  firstName: string = "";
  lastName: string = "";
  jobPosition: string = "";
  email: string = "";
  userRole: string = "";

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      userID: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10)
        ]
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      jobPosition: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userRole: ['', [Validators.required]]
    }
    );

    this.id = this.user.id;
    this.userID = this.user.userID;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.jobPosition = this.user.jobPosition;
    this.email = this.user.email;
    this.userRole = this.user.userRole;
    this.userList$ = this.service.getUserList();

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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

    this.submitted = true;
    if (this.form.invalid) {
      return;
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

    console.log(JSON.stringify(this.form.value, null, 2));
  }

}
