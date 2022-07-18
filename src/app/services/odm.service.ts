import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { polygon } from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { Scan } from '../models/scan.model';
import { Pipeline } from '../models/pipeline.model';
import { Results } from '../models/results.model';
import { DrawState } from '../models/draw-state';
import { GeoJsonObject } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class OdmService {
  createPipeline(new_pipeline: any,model:String="",geoJSONs:GeoJsonObject[]=[]) {
    console.log(geoJSONs);
    new_pipeline.area = new_pipeline.area[0]
    if (new_pipeline.detection_type != 'Custom'){
      console.log("new pipeline: ",new_pipeline);
    return this.http.post('http://localhost:5000/pipeline', {"pipeline":new_pipeline}, { responseType: 'json' });
  }
  else{
    return this.http.post('http://localhost:5000/pipeline', {"pipeline":new_pipeline,"model_name":model,"uploaded_geojsons":geoJSONs}, { responseType: 'json' });
}}

  getPipelines(i: any): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/pipelines', { responseType: 'json', params: { 'project_id': i.project_id, 'task_id': i.task_id } });
  }
  getPipelineDetails(pipelineid: string): Observable<Pipeline> {
    return this.http.get<Pipeline>('http://localhost:5000/pipeline', { responseType: 'json', params: { 'pipeline_id': pipelineid } });
  }
  data: any[] = []

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string) {
    return this.http.post('http://stgrog.ddns.net:8000/api/token-auth/', { username, password }, { responseType: 'json' });
  }
  //   getUserData(){

  // return polygon([[13.090866,77.448569],
  //   [13.090853,77.448709],
  //   [13.090783,77.448698 ],
  //   [13.090796,77.448567],
  //   [13.090866,77.448569]]).bindPopup("<b><h2>Property of user 1001</h2></b><br><b>Tax</b> : Rs 13089.197362222223 <br><b>Built up Area</b>: 115.50375106209862 sq meters <br> <b>Volume</b>: 667.16 sq meters <br> <b>Area</b>: 115.50375106209862").openPopup();
  // }
  getScans(): Observable<Scan[]> {
    return this.http.get<Scan[]>('http://localhost:5000/tasks-list', { responseType: 'json' });
  }
  getResults(pipeline: any): Observable<Results[]> {
    return this.http.get<Results[]>('http://localhost:5000/results', { responseType: 'json', params: { 'pipeline_id': pipeline.pipeline_id } });

  }

  private scan_topic = new Subject<any>(); //need to create a subject
  private pipeline_topic = new Subject<any>();
  private results_topic = new Subject<any>();
  private new_pipeline_topic = new Subject<any>();
  private drawState_topic = new Subject<any>();
  private annotation_topic = new Subject<any>();

  sendDrawState(drawState: DrawState) { //the component that wants to update something, calls this fn
    this.drawState_topic.next(drawState); //next() will feed the value in Subject
  }
  getDrawState(): Observable<DrawState> { //the receiver component calls this function
    return this.drawState_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }



  sendNewPipeline(pipeline: Pipeline) { //the component that wants to update something, calls this fn
    this.new_pipeline_topic.next(pipeline); //next() will feed the value in Subject
  }
  getNewPipeline(): Observable<Pipeline> { //the receiver component calls this function
    return this.new_pipeline_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
  sendResultsList(results: any[]) { //the component that wants to update something, calls this fn
    this.results_topic.next(results); //next() will feed the value in Subject
  }

  getResultsList(): Observable<Results[]> { //the receiver component calls this function 
    return this.results_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  sendScan(scan: Scan) { //the component that wants to update something, calls this fn
    this.scan_topic.next(scan); //next() will feed the value in Subject
  }

  getScan(): Observable<Scan> { //the receiver component calls this function 
    return this.scan_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
  sendPipeline(pipeline: Pipeline) { //the component that wants to update something, calls this fn
    this.pipeline_topic.next(pipeline); //next() will feed the value in Subject
  }
  getPipeline(): Observable<Pipeline> { //the receiver component calls this function
    return this.pipeline_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
  sendAnnotation(geoJSON:GeoJsonObject[]) { //the component that wants to update something, calls this fn
    this.annotation_topic.next(geoJSON); //next() will feed the value in Subject
  }
  getAnnotation(): Observable<GeoJsonObject[]> { //the receiver component calls this function
    return this.annotation_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
}