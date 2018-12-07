import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/api.service";

@Injectable()
export class IssuesService {

    constructor(private apiService: ApiService) {}

    public getIssues() {
        return new Promise((resolve, reject) => {
            this.apiService.get('issues/')
                .subscribe((res: any) => {
                    resolve(res.data)
                },
                (err) => {
                    reject(err)
                })
        });
    }

    public getIssuesByRetailer(retailer_id) {
        return new Promise((resolve, reject) => {
            this.apiService.get('issues/', { retailer_id: retailer_id })
                .subscribe((res: any) => {
                    resolve(res.data)
                },
                (err) => {
                    reject(err)
                })
        });
    }

    public getRetailerById(id) {
        return new Promise((resolve, reject) => {
            this.apiService.get('retailers/' + id + '/')
                .subscribe((res: any) => {
                    resolve(res.data)
                },
                (err) => {
                    reject(err)
                })
        });
    }
}