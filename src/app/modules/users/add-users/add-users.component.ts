import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../users.model';
import { UserapiService } from '../userapi.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent  {
user:UserSchema ={}
constructor(private api:UserapiService,private router:Router,private toaster:ToasterService){}

addUser(){
this.api.addUserAPI(this.user).subscribe({
  next:(res:UserSchema)=>{
    console.log(res);
    this.toaster.showSuccess("New user added successfully!!")
    this.router.navigateByUrl('/users')
    
  },
  error:(err:any)=>{
    this.toaster.showError(err.message)
  }
})
}
cancel(){
  this.user={}
}
}
