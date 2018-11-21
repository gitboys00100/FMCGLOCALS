export class Inventory {

    constructor(
        public id: number,
        public code: string,
        public name: string,
        public sku: number,
        public category: string,
        public sub_category: string,
        public price: number,
        public uom: string,
        public qty: number,
        public date_added: string,
    ) {}

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
