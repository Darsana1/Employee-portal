import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allUser:any[],searchKey:string): any[] {
    const result :any= []
    if(!allUser || searchKey==""){
      return allUser
    }
      allUser.forEach((item:any)=>{
       if(item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
          result.push(item)
          
          
       }
       
      })
      return result;
    
  }

}
