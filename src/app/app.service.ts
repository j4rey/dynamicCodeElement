import { HttpClient } from "../../node_modules/@angular/common/http";
import { Injectable } from "../../node_modules/@angular/core";

@Injectable()
export class DataService {
    constructor(private http:HttpClient) {
        
    }

    GetData(key: string){
        return this.http.get('http://localhost:4040/api/CodeElement/GetPosts/'+key);
    }
}