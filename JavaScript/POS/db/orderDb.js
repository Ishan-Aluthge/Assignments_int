const order = 'ORDER';


export function saveOrder(order_detail) {
    let pre_order = localStorage.getItem(order);
    let order_arr = JSON.parse(pre_order) || [];
    if (order_detail) {
        order_arr.push(order_detail);
        localStorage.setItem(order, JSON.stringify(order_arr))
        return true;
    }
}

export function getNewOrderID() {
    let pre_order = localStorage.getItem(order);
    let order_arr = JSON.parse(pre_order) || [];
    if (order_arr.length > -1) {
        let lastOrder = order_arr[order_arr.length - 1];
        let lastOrderId = lastOrder._order_detail_list[0]._order_id;
        console.log(lastOrder)
        let orderIdNumber = parseInt(lastOrderId.slice(1));
        let newOrderIdNumber = orderIdNumber + 1;
        return 'O' + newOrderIdNumber.toString().padStart(3, '0');
    }
    return 'O001';
}
export function getOrders() {
    let pre_order = localStorage.getItem(order);
    return JSON.parse(pre_order)||[];

}