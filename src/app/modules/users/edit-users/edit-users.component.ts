import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserapiService } from '../userapi.service';
import { UserSchema } from '../users.model';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit{
user:UserSchema={}

constructor(private route:ActivatedRoute,private api:UserapiService,private router:Router,private toaster:ToasterService){}
ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
 console.log(res);
 const {id} = res
 this.getExistingUser(id)
  })
}
getExistingUser(id:any){
 this.api.viewUserAPI(id).subscribe((res:any)=>{
  //console.log(res);
  this.user =res
  
 })
}
edituser(id:any){
  this.api.updateUserAPI(id,this.user).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.toaster.showSuccess("user updated successfully")
      this.router.navigateByUrl('/users')
      
    },
    error:(err:any)=>{
      this.toaster.showError(err.error)
    }
  })
}
cancel(id:any){
  this.getExistingUser(id)
}
}
