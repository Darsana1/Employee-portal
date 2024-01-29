import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit{
  profileImage:string = "./assets/images/user-icon.png"
editAdminStatus:boolean = false
adminDetails:any ={}
@Output() onAdminChange = new EventEmitter()
constructor(private api:AdminapiService ,private toaster:ToasterService){}
ngOnInit(): void {
  this.api.authenticate().subscribe((res:any)=>{
 this.adminDetails=res
 if(res.picture){
  this.profileImage = res.picture
 }
  })
}
editAdminClick(){
  this.editAdminStatus =true
  //get Admin Status

}
getFile(event:any){
  let file = event.target.files[0]
  let fr = new FileReader()
  fr.readAsDataURL(file)
  fr.onload =(event:any)=>{
    console.log(event.target.result);
    this.profileImage = event.target.result
    this.adminDetails.picture = this.profileImage
    
  }
  
}
updateAdmin()
{
  this.api.updateAdmin(this.adminDetails).subscribe({
    next:(res:any)=>{
      this.toaster.showSuccess("Admin details updated successfully!")
      localStorage.setItem("admin_name",res.name)
      localStorage.setItem("admin_pass",res.password)
      this.editAdminStatus=false
      this.onAdminChange.emit(res.name)
        },
    error:(err:any)=>{
this.toaster.showError("Updattion failed!!")
    }
  })
}
cancel(){
  this.editAdminStatus =false
}
}
