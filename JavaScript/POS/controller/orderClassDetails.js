import {getOrders} from "../DB/orderDb.js";

export class OrderClassDetails {

    constructor() {

        $('#order_table_body').click(this.handleTbl.bind(this));

        this.loadOrderList()
    }

    loadOrderList() {
        let orders = getOrders();
        orders.forEach(order => {
            $('#order_table_body').append(
                `<tr>
                    <td>${order._order_detail_list[0]._order_id}</td>
                    <td>${order._order_detail_list[0]._cus_id}</td>
                    <td>${order._total}</td>
                </tr>`
            )
        })
    }

    handleTbl(e) {
        let orderId = $(e.target).closest('tr').find('td').eq(0).text();
        console.log(orderId);
        $('#selected_order_body').empty();
        let orders = getOrders();
        let findOrder = orders.find(order => order._order_detail_list[0]._order_id === orderId);

        if (findOrder) {
            let orderDetailList = findOrder._order_detail_list;

            orderDetailList.forEach(order => {

                console.log(order._order_id);
                $('#selected_order_body').append(

                    `<tr>
                      <td>${order._item_id}</td>
                      <td>${order._quantity}</td>
                      <td>${order._price}</td>
                      <td>${order._total}</td>
                    </tr>`

                );
            });
        }
    }


}

new OrderClassDetails()