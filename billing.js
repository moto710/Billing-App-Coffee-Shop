class Product {
    constructor(id, name, price) {
        this.id = id;
        this.price = price;
        this.name = name;
    }
}

let listProduct = [
    {
        id: 1,
        name: "Black Coffee",
        price: 15000
    },
    {
        id: 2,
        name: "Milk Coffee",
        price: 20000
    },
    {
        id: 3,
        name: "Orange Juice",
        price: 50000
    },
    {
        id: 4,
        name: "Cappuccino",
        price: 75000
    },
    {
        id: 5,
        name: "Huda Beer",
        price: 15000
    },
];

class OrderItem {
    constructor(id, product, amount) {
        this.id = id,
        this.product = product,
        this.amount = amount;
    }
}
class Table {
    constructor(id, name, listOrderItems) {
        this.id = id,
            this.name = name,
            this.listOrderItems = listOrderItems;
    }
}

let listTables = [
    {
        id: 0,
        name: 'Bàn 1',
        total: 0,
        listOrderItems: []
    },
    {
        id: 1,
        name: 'Bàn 2',
        total: 0,
        listOrderItems: []
    },
    {
        id: 2,
        name: 'Bàn 3',
        total: 0,
        listOrderItems: []
    },
    {
        id: 3,
        name: 'Bàn 4',
        total: 0,
        listOrderItems: []
    },
    {
        id: 4,
        name: 'Bàn 5',
        total: 0,
        listOrderItems: []
    },
    {
        id: 5,
        name: 'Bàn 6',
        total: 0,
        listOrderItems: []
    },
    {
        id: 6,
        name: 'Bàn 7',
        total: 0,
        listOrderItems: []
    },
    {
        id: 7,
        name: 'Bàn 8',
        total: 0,
        listOrderItems: []
    },
    {
        id: 8,
        name: 'Bàn 9',
        total: 0,
        listOrderItems: []
    },
    {
        id: 9,
        name: 'Bàn 10',
        total: 0,
        listOrderItems: []
    },
    {
        id: 10,
        name: 'Bàn 11',
        total: 0,
        listOrderItems: []
    },
    {
        id: 11,
        name: 'Bàn 12',
        total: 0,
        listOrderItems: []
    },

]
// Hiển thị danh sách để chọn món
function renderProduct() {
    // listProduct.map()
    let htmls = listProduct.map((product) => {
        return `
        <option value="${product.id}">${product.name} - ${product.price}</option>
        `
    })
    document.getElementById("drinks").innerHTML = "<option selected disabled value='none'>Chọn món</option>" + htmls.join("");
}
// Đặt món vào từng bàn
function order() {
    let drinkId = document.getElementById("drinks").value;
    let p = listProduct.find((p) => p.id == drinkId);
    console.log(p)
    let quantity = Math.abs(document.getElementById("quantity").value);
    if (quantity == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    let idOrder = findMaxOrderId(tbSelected) + 1;
    let orderItem = new OrderItem(idOrder, p, quantity);
    let tableSelected = listTables.find((table) => table.id == tbSelected);
    tableSelected.listOrderItems.push(orderItem);
    renderOrderTableById(tbSelected);
}
class Drinking {
    constructor(drink, quantity, unitPrice, intoMoney) {
        this.drink = drink;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.intoMoney = quantity * unitPrice;
    }
}
let drinks = [];
function renderDrinking() {
    let details = "";
    for (i = 0; i < drinks.length; i++) {
        details += `
            <tr id="tr_${i}">
                <td>${i + 1}</td>
                <td>${drinks[i].drink}</td>
                <td>${drinks[i].quantity}</td>
                <td>${drinks[i].unitPrice}</td>
                <td>${drinks[i].intoMoney}</td>
            </tr>
        `
    }
    document.getElementById("drinkingDetail").innerHTML = details;
}

function choose() {
    let drink = document.getElementById("drinks").value;
    let quantity = Math.abs(document.getElementById("quantity").value);
    if (quantity == "" || drink == "none") {
        alert("Chưa nhập đủ thông tin!");
        return;
    }
    let unitPrice = 1;
    if (drink == "Black Coffee") {
        unitPrice = 15000;
    }
    if (drink == "Milk Coffee") {
        unitPrice = 20000;
    }
    if (drink == "Cappuccino") {
        unitPrice = 50000;
    }
    if (drink == "Orange Juice") {
        unitPrice = 60000;
    }
    if (drink == "Huda Beer") {
        unitPrice = 15000;
    }
    let newDrink = new Drinking(drink, quantity, unitPrice);
    drinks.push(newDrink);
    let sumDrinks = 0;
    for (i = 0; i < drinks.length; i++) {
        sumDrinks += drinks[i].quantity;
    }
    document.getElementById('sumDrinks').innerHTML = sumDrinks;
    let amount = 0;
    for (i = 0; i < drinks.length; i++) {
        amount += drinks[i].intoMoney;
    }
    document.getElementById('amount').innerHTML = amount;
    renderDrinking();
}

function clearData() {
    document.getElementById("quantity").value = "";
    document.getElementById("drinks").value = "none";
    document.getElementById("drinkingDetail").innerHTML = "";
    document.getElementById("sumDrinks").innerHTML = 0;
    document.getElementById("amount").innerHTML = 0;
}

function exportTbNumber(id) {
    document.querySelectorAll(".tbSelected").forEach((item) => {
        item.style.backgroundColor = "";
    })
    document.getElementById(`tb${id}`).style.backgroundColor = "bisque";
    tbSelected = id;

    renderOrderTableById(tbSelected);

}

function findMaxOrderId(idTable) {
    // Lấy ra vị trí của Bàn trong mảng theo idTable
    let indexTable = listTables.findIndex((table) => table.id == idTable);

    //     lấy ra những orderItem của bàn
    let orders = [...listTables[indexTable].listOrderItems]
    if (orders.length == 0) {
        return 0;
    }
    orders.sort((o1, o2) => {
        return o2.id - o1.id;
    })
    return orders[0].id;
}
function renderOrderTableById(idTable) {

    let indexTable = listTables.findIndex((table) => table.id == idTable);
    let htmls = listTables[indexTable].listOrderItems.map((orderItem) => {
        return `
        <tr>
        <td>${orderItem.id}</td>
        <td>${orderItem.product.name}</td>
        <td>${orderItem.amount}</td>
        <td>${orderItem.product.price}</td>
        <td>${orderItem.product.price * orderItem.amount}n</td>
        </tr>
        `;
    });

    document.getElementById("IdOrderItem").innerHTML = htmls.join("");

}
renderProduct();
renderDrinking();
let tbSelected = 0; // Mới đầu cho Bàn được chọn là bàn1
