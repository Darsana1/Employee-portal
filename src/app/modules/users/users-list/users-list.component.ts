import { Component,OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';
import { UserSchema } from '../users.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  p:number = 1;
searchKey:string=""
allUser:UserSchema[]=[]
constructor(private api:UserapiService,private toaster:ToasterService){}
//
ngOnInit(): void {
  this.getAllUsers()
}
getAllUsers(){
  console.log("Inside all users");
  
  this.api.getAllUserAPI().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.allUser = res
      
    },
    error:(err:any)=>{
      this.toaster.showError(err.message)
    }
  })
}
removeUser(id:any){
  this.api.deleteUserAPI(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.toaster.showSuccess("user removed successfully")
      this.getAllUsers()
      
    },
    error:(err:any)=>{
     this.toaster.showError(err.message)
    }
  })
}
sortById(){
  this.allUser.sort((a:any,b:any)=>a.id-b.id)
}
sortByName(){
  this.allUser.sort((a:any,b:any)=>a.name.localeCompare(b.name))
}
generatepdf(){
  let pdf= new jspdf()
  let head =[['UserId','Username','Email','Status']]
  let body:any =[]
  this.allUser.forEach((item:any)=>{
    body.push([item.id,item.name,item.email,item.active])
  })
  pdf.setFontSize(16)
  pdf.text("All User List",10,10)
  autoTable(pdf,{head,body})
  pdf.output('dataurlnewwindow')
  pdf.save('allUsersList')
}
}