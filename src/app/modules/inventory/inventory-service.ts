import { Inventory } from './inventory.model';
import { testInventoryList } from './test-data';

import { InventoryReturns } from './inventory.model';
import { testInventoryReturnedList } from './test-datareturns';

export class InventoryService {
    private inventory_list: Inventory[] = testInventoryList;

    getInventoryList() {
        return this.inventory_list.slice();
    }
}

export class InventoryServiceReturns {
    private inventory_returns: InventoryReturns[] = testInventoryReturnedList;

    getInventoryReturns() {
        return this.inventory_returns.slice();
    }
}
