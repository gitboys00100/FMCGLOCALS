import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";


@Injectable()
export class ApiService {
    private apiURL = environment.apiURL;
    private token = '';

    constructor (public http: HttpClient, private authService: AuthService) {}


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

    public callAPI(api, method, params?, array?) {
        var url = this.apiURL + api;
        let httpParams: any;
        let httpHeaders = new HttpHeaders();
        
        if (params) {
            if (array) {
                httpParams = params;
                httpHeaders = httpHeaders.append('Content-Type', 'application/json')
            } else {
                httpParams = new HttpParams({fromObject: params});
            }
        }
        if (method == 'get') {
            return this.http.get(url, {observe: 'response', params: httpParams, headers: httpHeaders});
        } else if (method == 'post') {
            return this.http.post(url, httpParams, {headers: httpHeaders, observe: 'response'});
        } else if (method == 'patch') {
            return this.http.patch(url, httpParams, {headers: httpHeaders, observe: 'response'});
        }
    }



    // ###############################################
    // # PRIVATE
    // ###############################################

    private getOptions(params = null, authType = null, authParam = null) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": 'Token ' + this.authService.getToken()
            }),

            
        };

        if (authType && authParam )
            options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    "Authorization": authType + ' ' + authParam
                }),
            };

        if (params) {
            options['params'] = new HttpParams({ fromObject: params });
        }
        return options;
    }
}
