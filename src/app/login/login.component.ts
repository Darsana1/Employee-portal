import { Component } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 email:string=""
 password:string=""
 constructor(private api:AdminapiService,private router:Router,private toaster:ToasterService){}
 login(){
  if (this.email && this.password) {
    this.api.authenticate().subscribe({
      next:(res:any)=>{
        const {email,password}=res
        if (email===this.email && password===this.password) {
          localStorage.setItem("admin_name",res.name)
          localStorage.setItem("admin_pass",res.password)
          this.toaster.showSuccess("Login successfullly")
          
          this.router.navigateByUrl("dashboard")
        } else {
 
          this.toaster.showError("Invalid email/password");
        }
    },
    error:(res:any)=>{
      this.toaster.showError(res.message);
    }
  })
    
  } else {
    this.toaster.showSuccess("Please fill the form completely");
  }
 }
}
