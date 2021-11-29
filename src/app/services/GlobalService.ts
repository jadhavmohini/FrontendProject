import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class GlobalService {
    base_path: string;
    constructor(private http: HttpClient, public router: Router) {
        this.base_path = 'http://localhost:8000/';
    }
    public base_path_api() {
        return this.base_path ;
    }
}
