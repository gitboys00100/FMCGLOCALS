export interface Inputs {

        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
        role: string,
        is_superuser: boolean,
      	is_staff: boolean,
      	is_active: boolean,

}

export class InventoryReturns {

    constructor(
        public productname: string,
        public qty: number,
        public retailer: string,
        public return_type: string,
        public agent: string,
        public status: string,
        public date_returned: string,
    ) {}

}
