import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { circle, latLng, polygon, tileLayer } from 'leaflet';
import { OdmService } from 'src/app/services/odm.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  accessToken="pk.eyJ1IjoiYW5hbnQ5IiwiYSI6ImNrenV5dW91dTNnZzMyb3FvemRrd3N6Y2EifQ.FoqZJnlaw1Dkrq3npDyVfQ"
  id="mapbox/satellite-v9"
  options = {
    layers: [
      tileLayer('https://api.mapbox.com/styles/v1/'+this.id+'/tiles/{z}/{x}/{y}?access_token='+this.accessToken, { maxZoom: 22})
    ],
    zoom: 18,
    center: latLng(12.840602671546936,77.65261166228588)
  };
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
      this.options.layers.push(tileLayer("http://localhost:8000/api/projects/1/tasks/3800c7ca-4eb5-46fc-b166-3cdb793e887e/orthophoto/tiles/{z}/{x}/{y}.png?jwt="+data.token, { maxZoom: 22}));
      this.tokenLoaded=true;
      console.log(this.options);
    }
    )
   }

  ngOnInit(): void {
  }

}
