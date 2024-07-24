import { Customer } from "../modules/customer.js";
import { deleteCustomer, getCustomers, saveCustomer, updateCustomer } from "../DB/customerDb.js";

export class CustomerController {
    constructor() {
        $('#deleteBtn').click(this.handleDeleteCustomer.bind(this));
        $('#updateBtn').click(this.handleUpdateCustomer.bind(this));
        $('#addBtn').click(this.handleSaveCustomer.bind(this));
        $('#table_body').click(this.handleTblCustomer.bind(this));
        $('#clearBtn').click(this.clearCustomer.bind(this));

        this.custIdPattern = /C\d/;
        this.namePattern = /^[a-zA-Z]+$/;
        this.addressPattern = /^[a-zA-Z0-9\s\.,#-]+$/;

        this.loop_data();
    }

    clearCustomer() {
        console.log('clear function called')
        $('#custID').val("");
        $('#fName').val("");
        $('#lName').val("");
        $('#address').val("");

        $('#addBtn').prop('disabled',false)
    }
    handleDeleteCustomer(e) {
        e.preventDefault();
        console.log('delete button clicked');

        const custID = $('#custID').val();
        const fName = $('#fName').val();
        const lName = $('#lName').val();
        const address = $('#address').val();

        if (confirm(`Are you sure you want to delete ${$('#customerID').val()}?`)) {
            deleteCustomer(new Customer(custID, fName, lName, address));
        }
        this.clearCustomer()
        this.loop_data();
    }

    handleSaveCustomer(e) {
        $('#custID').prop('disabled', false);
        e.preventDefault();
        console.log('add button clicked');

        const custID = $('#custID').val();
        const fName = $('#fName').val();
        const lName = $('#lName').val();
        const address = $('#address').val();

        let customers = getCustomers();
        if (customers.some(c => c._c_id === custID)) {
            console.log('Duplicate customerId');
            $('#duplicateError').text('Customer ID is duplicated.');
            return;
        }

        if (!this.custIdPattern.test(custID)) {
            console.log('Invalid customerId');
            $('#duplicateError').text('Use C001 format');
            return;
        }
        $('#duplicateError').text('');

        if (!this.namePattern.test(lName)) {
            console.log('Invalid last name');
            $('#lNameError').text('Last name is required');
            return;
        }
        $('#lNameError').text('');

        if (!this.namePattern.test(fName)) {
            console.log('Invalid first name');
            $('#fNameError').text('First name is required');
            return;
        }
        $('#fNameError').text('');

        if (!this.addressPattern.test(address)) {
            console.log('Invalid address');
            $('#addressError').text('Input a valid address');
            return;
        }
        if (!address) {
            console.log('Invalid address');
            $('#addressError').text('Address is required');
            return;
        }
        $('#addressError').text('');
        saveCustomer(new Customer(custID, fName, lName, address)) ? alert("Item saved Successfully"):alert("Error when saving");
        this.loop_data();
        this.clearCustomer()
    }

    handleUpdateCustomer(e) {
        e.preventDefault();
        console.log('update button clicked');

        const custID = $('#custID').val();
        const fName = $('#fName').val();
        const lName = $('#lName').val();
        const address = $('#address').val();



        if (!this.namePattern.test(lName)) {
            console.log('Invalid last name');
            $('#lNameError').text('Last name is required');
            return;
        }
        $('#lNameError').text('');

        if (!this.namePattern.test(fName)) {
            console.log('Invalid first name');
            $('#fNameError').text('First name is required');
            return;
        }
        $('#fNameError').text('');

        if (!this.addressPattern.test(address)) {
            console.log('Invalid address');
            $('#addressError').text('Address is required');
            return;
        }
        $('#addressError').text('');

        updateCustomer(new Customer(custID, fName, lName, address))? alert("Item updated Successfully"):alert("Error when updating");
        this.loop_data();
        this.clearCustomer()
    }


    handleTblCustomer(e) {
        $('#custID').val($(e.target).closest('tr').find('td').eq(0).text());
        $('#fName').val($(e.target).closest('tr').find('td').eq(1).text());
        $('#lName').val($(e.target).closest('tr').find('td').eq(2).text());
        $('#address').val($(e.target).closest('tr').find('td').eq(3).text());

        $('#custID').prop('disabled', true);
        $('#addBtn').prop('disabled',true)
    }

    loop_data() {
        const customers = getCustomers();
        console.log(customers);
        $('#table_body').empty();

        customers.forEach((customer) => {
            $('#table_body').append(`
        <tr>
          <td>${customer._c_id}</td>
          <td>${customer._fname}</td>
          <td>${customer._lname}</td>
          <td>${customer._address}</td>
        </tr>
      `);
        });
    }
}

new CustomerController();
