import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { polygon } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class OdmService {
  data:any[]=[]

  constructor(private http: HttpClient) { }
  
  getToken(username: string, password: string) {
    return this.http.post('http://localhost:8000/api/token-auth/', { username, password }, {responseType: 'json' });
  }
//   getUserData(){

// return polygon([[13.090866,77.448569],
//   [13.090853,77.448709],
//   [13.090783,77.448698 ],
//   [13.090796,77.448567],
//   [13.090866,77.448569]]).bindPopup("<b><h2>Property of user 1001</h2></b><br><b>Tax</b> : Rs 13089.197362222223 <br><b>Built up Area</b>: 115.50375106209862 sq meters <br> <b>Volume</b>: 667.16 sq meters <br> <b>Area</b>: 115.50375106209862").openPopup();
// }
getUserProject(id: string){
  return this.http.get('http://localhost:5000/user/'+id,{responseType: 'json' });
}
getAllProjects(){
  return this.http.get('http://localhost:5000/users',{responseType: 'json' });
}
setUserData(data:any){
  this.data=data;
}
getUserData(){
  return this.data;
}

}