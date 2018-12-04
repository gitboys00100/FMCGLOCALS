import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/api.service";

@Injectable()
export class UsersService {

    constructor(private api: ApiService) {}

    public getAgents() {
        return this.api.get('users/', { role_id: 1});
    }

    public getProjectedSalesByAgent(agentId) {
        return this.api.get('projected_sales/', { agent_id: agentId });
    }

    public createProjectedSales(userId, target, month) {
        return this.api.post('projected_sales/', {
            user_id: userId,
            target: target,
            month: month
        });
    }

    public updateProjectedSales(target, projectedSales) {
        return this.api.patch('projected_sales/' + projectedSales.id + '/', {
            target: target
        });
    }

    public getAssignedRetailers(agent) {
        return new Promise((resolve, reject) => {
            this.api.get('retailers/', { assigned_agent_id: agent.id })
                .map((res: any) => res.data)
                .subscribe((data: any[]) => {
                    let assignedRetailers = [];

                    if (data) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].assigned_agents.length > 0 && data[i].status === 1) {
                                data[i]['isChecked'] = false;
                                assignedRetailers.push(data[i]);
                            }
                        }
                    }

                    resolve(assignedRetailers);
                },
                (err) => reject(err));
        });
    }

    public getUnassignedRetailers() {
        return new Promise((resolve, reject) => {
            this.api.get('retailers/')
                .map((res: any) => res.data)
                .subscribe((data: any[]) => {
                    let unassignedRetaiilers = [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].assigned_agents.length <= 0 && data[i].status === 1) {
                            data[i]['isChecked'] = false;
                            unassignedRetaiilers.push(data[i]);
                        }
                    }
                    resolve(unassignedRetaiilers);
                },
                (err) => reject(err));
        });
    }

    public getUserRetailers(agent) {
        return new Promise(async (resolve, reject) => {
            this.api.get('users/retailers/', { agent_id: agent.id })
                .map((res: any) => res.data)
                .subscribe((data: any[]) => resolve(data),
                (err) => reject(err));
        })
    }

    public assignRetailers(agent, retailers) {
        return new Promise(async (resolve, reject) => {
            let assignedRetailers = [];

            await retailers.forEach(retailer => {
                assignedRetailers.push(this.api.post('users/retailers/', {
                    user_id: agent.id,
                    retailer_id: retailer.id
                }).toPromise());
            }) 

            Promise.all(assignedRetailers).then(res => resolve(res)).catch(err => reject(err));
        })
    }

    public removeRetailers(agent, retailers, uRetailers) {
        return new Promise(async (resolve, reject) => {
            let removedRetailers = [];

            await retailers.forEach(async (retailer: any) => {
                let uRetailerIndex = uRetailers.findIndex((ur : any) => {
                    return ur.retailer.id === retailer.id
                });

                removedRetailers.push(this.api.delete('users/retailers/' + uRetailers[uRetailerIndex].id).toPromise());                    
            });

            Promise.all(removedRetailers).then(res => resolve(res)).catch(err => reject(err));
        })
    }

    public getAgentItineraries(agent) {
        return new Promise(async (resolve, reject) => {
            this.api.get('itineraries/agents/', { agent_id: 3 })
                .map((res: any) => res.data)
                .subscribe((data: any[]) => {
                    let itineraryAgents = [[],[],[],[],[],[],[]];
                    
                    for (let i = 0; i < itineraryAgents.length; i++) {
                        for (let j = 0; j < data.length; j++) {
                            if (data[j].days[i] === "1") {
                                for (let k = 0; k < data[j].itinerary.retailers.length; k++) {
                                    itineraryAgents[i].push(data[j].itinerary.retailers[k]);
                                }
                            }
                                
                        }
                    }

                    resolve(itineraryAgents);
                },
                (err) => reject(err));
        })
    }
}