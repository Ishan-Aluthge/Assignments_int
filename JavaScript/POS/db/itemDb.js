import {Item} from "../modules/item.js";

const item='ITEM';

export function saveItem(new_item) {
    let pre_data = localStorage.getItem(item);
    let item_arr = JSON.parse(pre_data)||[];
    if (item_arr) {
        item_arr.push(new_item)
        localStorage.setItem(item, JSON.stringify(item_arr));
        return true
    }

}
export function getItems(){
    let pre_data = localStorage.getItem(item);
    return  JSON.parse(pre_data)||[];

}
export function updateItem(update_item) {
    let pre_data = localStorage.getItem(item);
    let item_arr = JSON.parse(pre_data)||[];
    let pre_item = item_arr.find(i=>i._i_id===update_item._i_id);
    pre_item._qty=update_item._qty;
    pre_item._price=update_item._price;
    pre_item._i_name=update_item._i_name;
    localStorage.setItem(item,JSON.stringify(item_arr));
    if (pre_item)return true;
}
export function deleteItem(delete_item) {
    let pre_data = localStorage.getItem(item);
    let item_arr = JSON.parse(pre_data)||[];
    let item_index = item_arr.findIndex(i=>i._i_id===delete_item._i_id);
    if (item_index!==-1){
        item_arr.splice(item_index,1)
        localStorage.setItem(item,JSON.stringify(item_arr))
        return true;
    }

}
new Item();