import { GeoJSONOptions } from "leaflet";

export class Pipeline {
    pipeline_id?: string;
    pipeline_name?: string;
    project_id?: string;
    task_id?: string;
    polygon_area: number[][][];
    status?: string;
    detection_type?:string;
}
