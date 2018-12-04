import { dscrData } from './dscr.data';

export class ReportsService {
    private dscrReport = dscrData;

    getDSCRReport() {
        return this.dscrReport.slice();
    }
}