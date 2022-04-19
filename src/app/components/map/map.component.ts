import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { circle, LatLng, latLng, Polygon, polygon, tileLayer } from 'leaflet';
import { OdmService } from 'src/app/services/odm.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  accessToken="pk.eyJ1IjoiYW5hbnQ5IiwiYSI6ImNrenV5dW91dTNnZzMyb3FvemRrd3N6Y2EifQ.FoqZJnlaw1Dkrq3npDyVfQ"
  id="mapbox/satellite-v9"
  showLayer=true
  layers:Polygon[]=[]
  options:any;
  tokenLoaded: boolean=false;

  layersControl = {
    baseLayers: {
      'DeapthMap': {}
    },
    overlays: {
      'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }
  

  constructor(private odmService: OdmService) {

    odmService.getToken('paperless', 'paperless').subscribe( (data: any) => {
      console.log(data.token);
      var odmlayer=tileLayer("http://localhost:8000/api/projects/1/tasks/91266c8d-0d01-4caf-8ad0-848399d17d32/orthophoto/tiles/{z}/{x}/{y}.png?jwt="+data.token, { maxZoom: 22});
      this.tokenLoaded=true;
      var properties= this.odmService.getUserData()
      properties.forEach(element => {
        console.log(element.geometry.coordinates);
        this.fixcoordinates(element)
        this.layers.push(this.createLayerWithPopup(element))
        this.options= {
          layers: [
            tileLayer('https://api.mapbox.com/styles/v1/'+this.id+'/tiles/{z}/{x}/{y}?access_token='+this.accessToken, { maxZoom: 22})
            ,odmlayer
          ],
          zoom: 21,
          center: latLng(element.geometry.coordinates[0][0][0],element.geometry.coordinates[0][0][1])
        }; 
      });
      this.showLayer=true
      console.log(this.layers);
      
    }
    )
   }
   fixcoordinates(data:any){
    data.geometry.coordinates.forEach((element: any[]) => {
      element=element.map(e=>e.reverse())
     });
    console.log(data)
    
   }
   createLayerWithPopup(data:any)
   {
     var layer=polygon(data.geometry.coordinates).bindPopup("<b><h2>Property of user "+data.user+"</h2></b><br><b>Tax</b> : Rs "+data.properties.Tax+" <br><b>Built up Area</b>: "+data.properties.Area+ " sq meters <br> <b>Volume</b>: "+ data.properties.Volume+" sq meters <br>").openPopup();
      return layer;
   }
  ngOnInit(): void {
  }

}