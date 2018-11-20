export class StockTransferOrdersService {

  constructor() { }

  private StockTransferOrderList = [
    {
      status: "2001",
      message: "Success",
      data: [
                {
                stock_issue_id: "IT-0001",
                company_id: 1,
                user_id: 1,
                username: "Agent1",
                delivery_van_id: "2",
                delivery_date: "2018-06-19",
                digital_signature: "",
                items: [
                          {
                            stock_issue_item_id: 1,
                            requested_product: "Premier Coffee 3+1 18GM",
                            item_id: 2,
                            UOM: "PKT",
                            quantity_requested: 100,
                            quantity_received: 95,
                            quantity_on_hand: 0,
                            quantity_returned: 0,
                            estimated_sales: 150,
                          },
                          {
                            stock_issue_item_id: 2,
                            requested_product: "Premier Coffee 3+1 32GM Instant Win Promo",
                            item_id: 3,
                            UOM: "CTN",
                            quantity_requested: 200,
                            quantity_received: 200,
                            quantity_on_hand: 0,
                            quantity_returned: 0,
                            estimated_sales: 150,
                          },
                          {
                            stock_issue_item_id: 3,
                            requested_product: "Premier Sugar 3+1 18GM",
                            item_id: 2,
                            UOM: "SKT",
                            quantity_requested: 100,
                            quantity_received: "",
                            quantity_on_hand: 0,
                            quantity_returned: 0,
                            estimated_sales: 150,
                          },
                          {
                            stock_issue_item_id: 4,
                            requested_product: "Premier Sugar 3+1 18GM Instant Win Promo",
                            item_id: 2,
                            UOM: "PKT",
                            quantity_requested: 100,
                            quantity_received: "",
                            quantity_on_hand: 0,
                            quantity_returned: 0,
                            estimated_sales: 150,
                          },
                      ]
                },
                {
                stock_issue_id: "IT-0002",
                company_id: 1,
                user_id: 1,
                username: "Agent2",
                delivery_van_id: "2",
                delivery_date: "2018-06-20",
                digital_signature: "",
                items: [
                            {
                              stock_issue_item_id: 4,
                              requested_product: "Premier Milk 3+1 18GM",
                              item_id: 2,
                              UOM: "PMT",
                              quantity_requested: 100,
                              quantity_received: 95,
                              quantity_on_hand: 0,
                              quantity_returned: 0,
                              estimated_sales: 150,
                            },
                            {
                              stock_issue_item_id: 5,
                              requested_product: "Premier Milk 3+1 32GM Instant Win Promo",
                              item_id: 4,
                              UOM: "PMIWP",
                              quantity_requested: 200,
                              quantity_received: 150,
                              quantity_on_hand: 0,
                              quantity_returned: 0,
                              estimated_sales: 150,
                            }
                         ]
                }
      ],//data array
      pagination: {
                      offset: 20,
                      limit: 10,
                      total: 1,
                    },
      }
  ];


  getStockTransferOrderList() {
     return this.StockTransferOrderList.slice();
  }
}
