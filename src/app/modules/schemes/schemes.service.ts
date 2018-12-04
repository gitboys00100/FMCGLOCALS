import { poData } from './po.data';

export class PurchaseOrderService {
    private poReport = poData;

    getDSCRReport() {
        return this.poReport.slice();
    }
}
