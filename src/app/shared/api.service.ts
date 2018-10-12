import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";


@Injectable()
export class ApiService {
    private apiURL = environment.apiURL;
    private token = '';

    constructor (public http: HttpClient) {}


    // ###############################################
    // # PUBLIC
    // ###############################################

    public get(reqUrl, params = null, authType = null, authParam = null) {
        let options = this.getOptions(params, authType, authParam);
        return this.http.get(this.apiURL + reqUrl, options);
    }

    public post(reqUrl, payLoad, params = null, authType = null, authParam = null) {
        let options = this.getOptions(params, authType, authParam);
        options['observe'] = 'response';
        return this.http.post(this.apiURL + reqUrl, payLoad, options);
    }

    public put(reqUrl, payLoad, params = null, authType = null, authParam = null) {
        let options = this.getOptions(params, authType, authParam);
        return this.http.put(this.apiURL + reqUrl, payLoad, options);
    }

    public patch(reqUrl, payLoad, params = null, authType = null, authParam = null) {
        let options = this.getOptions(params, authType, authParam);
        return this.http.patch(this.apiURL + reqUrl, payLoad, options);
    }

    public delete(reqUrl, params = null, authType = null, authParam = null) {
        let options = this.getOptions(params, authType, authParam);
        return this.http.delete(this.apiURL + reqUrl, options);
    }


    // ###############################################
    // # PRIVATE
    // ###############################################

    private getOptions(params = null, authType = null, authParam = null) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Token fad0d2b333c5ccb28b4b744d71abe3464cf9be7d"
            }),
        };

        if (authType && authParam )
            options.headers.append('Authorization', authType + ' ' + authParam);

        if (params) {
            options['params'] = new HttpParams({ fromObject: params });
        }
        return options;
    }
}
