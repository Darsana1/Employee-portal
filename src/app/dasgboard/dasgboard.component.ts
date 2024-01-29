import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../modules/users/userapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasgboard',
  templateUrl: './dasgboard.component.html',
  styleUrls: ['./dasgboard.component.css']
})
export class DasgboardComponent implements OnInit{
  selected: Date | null=new Date();
  showSidebar:boolean =true
  admin_name:string = ""
  employeeCount:number =0
  constructor(private api:UserapiService,private router:Router){}
  ngOnInit(): void {
    if(localStorage.getItem("admin_name")){
      this.admin_name = localStorage.getItem("admin_name") || ""
    }
    this.getTotalEmployee()
  }
  menuBtnClick(){
    this.showSidebar =!this.showSidebar
  }
  getTotalEmployee(){
    this.api.getAllUserAPI().subscribe((res:any)=>{
      this.employeeCount = res.length
    })
  }
  logout(){
    localStorage.removeItem("admin_name")
    localStorage.removeItem("admin_pass")
    this.router.navigateByUrl('/')
  }
  getUpdateAdmin(event:any){
    this.admin_name =event
  }
}
