import {Customer} from "../modules/customer.js";

const data='DATA';

export function saveCustomer(new_customer) {
    let pre_data = localStorage.getItem(data);
    let customer_arr = JSON.parse(pre_data)||[];
    if (customer_arr) {
        customer_arr.push(new_customer)
        localStorage.setItem(data, JSON.stringify(customer_arr));
        return true
    }

}
export function getCustomers(){
    let pre_data = localStorage.getItem(data);
    return  JSON.parse(pre_data)||[];

}
export function updateCustomer(update_customer) {
    let pre_data = localStorage.getItem(data);
    let customer_arr = JSON.parse(pre_data)||[];
    let pre_customer = customer_arr.find(c=>c._c_id===update_customer._c_id);
    pre_customer._fname=update_customer._fname;
    pre_customer._lname=update_customer._lname;
    pre_customer._address=update_customer._address;
    localStorage.setItem(data,JSON.stringify(customer_arr));
    if (pre_customer)return true;
}
export function deleteCustomer(delete_customer) {
    let pre_data = localStorage.getItem(data);
    let customer_arr = JSON.parse(pre_data)||[];
    let customer_index = customer_arr.findIndex(c=>c._c_id===delete_customer._c_id);
    if (customer_index!==-1){
        customer_arr.splice(customer_index,1)
        localStorage.setItem(data,JSON.stringify(customer_arr))
        return true;
    }

}
new Customer()