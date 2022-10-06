class Drinks {
    constructor(id, drinkName, price) {
        this.id = id;
        this.drinkName = drinkName;
        this.price = price;
    }
}
let listDrinks = [
    {
        id: 1,
        drinkName: "Black Coffee",
        price: 15000
    },
    {
        id: 2,
        drinkName: "Milk Coffee",
        price: 20000
    },
    {
        id: 3,
        drinkName: "Cappuccino",
        price: 75000
    },
    {
        id: 4,
        drinkName: "Orange Juice",
        price: 50000
    },
    {
        id: 5,
        drinkName: "Huda Beer",
        price: 20000
    },
]
let orderList = [];
class OrderedDrink {
    constructor(id, price, quantity) {
        this.id = id;
        this.price = price;
        this.quantity = quantity;
    }
}

class Table {
    constructor(id, name, listOrderedDrinks) {
        this.is = id;
        this.name = name;
        this.listOrderedDrinks = listOrderedDrinks;
    }
}
let listTables = [
    {
        id: 1,
        name: "Bàn 1",
        listOrderedDrinks: [],
    },
    {
        id: 2,
        name: "Bàn 2",
        listOrderedDrinks: [],
    },
    {
        id: 3,
        name: "Bàn 3",
        listOrderedDrinks: [],
    },
    {
        id: 4,
        name: "Bàn 4",
        listOrderedDrinks: [],
    },
    {
        id: 5,
        name: "Bàn 5",
        listOrderedDrinks: [],
    },
    {
        id: 6,
        name: "Bàn 6",
        listOrderedDrinks: [],
    },
    {
        id: 7,
        name: "Bàn 7",
        listOrderedDrinks: [],
    },
    {
        id: 8,
        name: "Bàn 8",
        listOrderedDrinks: [],
    },
    {
        id: 9,
        name: "Bàn 9",
        listOrderedDrinks: [],
    },
    {
        id: 10,
        name: "Bàn 10",
        listOrderedDrinks: [],
    },
    {
        id: 11,
        name: "Bàn 11",
        listOrderedDrinks: [],
    },
    {
        id: 12,
        name: "Bàn 12",
        listOrderedDrinks: [],
    }
]

function exportTables() {
    let table = listTables.map((function (table) {
        return `
        <div id="tb${table.id - 1}" class="table tbSelected" onclick="orderedTable(${table.id - 1})">Bàn ${table.id}</div>
        `
    }))
    document.getElementById("listTables").innerHTML = table.join("");
}


// const billingAppKey = "billingApp";
// function init() {
//     if (window.localStorage.getItem(billingAppKey) == null) {
//         window.localStorage.setItem(billingAppKey, JSON.stringify(orderList));
//     }
//     else {
//         orderList = JSON.parse(window.localStorage.getItem(billingAppKey));
//     }
// }

function exportDrink() {
    let details = listDrinks.map(function (drink) {
        return `<Option value="${drink.id}" >${drink.drinkName} - ${drink.price}</Option>`;
    });
    document.getElementById("drinks").innerHTML = `<option selected disabled value="none">Chọn món</option> + ${details.join("")}`;


}

function order() {
    let quantity = Number(document.getElementById("quantity").value);
    let orderedDrinkId = document.getElementById("drinks").value;
    let drinkSelected = listDrinks.find(function (drink) {
        return drink.id == orderedDrinkId;
    });
    if (drinkSelected == undefined || quantity <= 0)
        return alert("Vui lòng nhập đúng thông tin!");
    let orderedDrink = new OrderedDrink(orderedDrinkId, drinkSelected.price, quantity);
    let orderedDetailsElement = document.getElementById("orderedDetails");
    let sumOrdered = 0;
    let total = 0;
    let html = ` 
        <tr>
            <td class="money-td">${orderedDetailsElement.children.length + 1}</td>
            <td class="money-td">${drinkSelected.drinkName}</td>
            <td class="money-td">${orderedDrink.quantity}</td>
            <td class="money-td">${orderedDrink.price}</td>
            <td class="money-td">${orderedDrink.price * quantity}</td>
            <td><span class="time" onclick="deleteRow('${orderedDrink.id}')">&times;</span></td>
        </tr>
        `;
    orderedDetailsElement.innerHTML += html;
    orderList.push(orderedDrink);
    orderList.map((order) => {
        sumOrdered += order.price * order.quantity;
        total += order.quantity;
    })
    document.getElementById("amount").innerHTML = sumOrdered;
    document.getElementById("sumDrinks").innerHTML = total;
    let infoDish = {
        drinkName: drinkSelected.drinkName,
        quantity: orderedDrink.quantity,
        price: orderedDrink.price,
        total: orderedDrink.price * quantity
    }
    let id = document.getElementById('indexTable').value;
    listTables[id].listOrderedDrinks.push(infoDish);
}

function clearData() {
    orderList = [];
    document.querySelectorAll("#drinks > option").forEach((option) => {
        option.selected = "";
    })
    document.querySelectorAll("#drinks > option")[0].selected = "selected";
    document.querySelector("#quantity").value = null;
    document.querySelector("#orderedDetails").innerHTML = "";
    document.getElementById("sumDrinks").innerHTML = "";
    document.querySelector("#amount").innerHTML = "";
    document.getElementById("tbNumber").innerHTML = '';
    

}
function deleteRow(orderedId) {
    let confirm = window.confirm("Bạn muốn xóa dòng này???");
    if (confirm) {
        let indexDelete = orderList.findIndex((deleteDrink) =>
            deleteDrink.id == orderedId
        )
        orderList.splice(indexDelete, 1);
        let orderedDetailsElement = document.getElementById("orderedDetails");
        orderedDetailsElement.innerHTML = ""
        let sumOrdered = 0;
        let total = 0;
        orderList.map((orderedDrink) => {
            let drinkSelected = listDrinks.find(function (drink) {
                return drink.id == orderedDrink.id
            });
            let html = ` 
        <tr>
            <td class="money-td">${orderedDetailsElement.children.length + 1}</td>
            <td class="money-td">${drinkSelected.drinkName}</td>
            <td class="money-td">${orderedDrink.quantity}</td>
            <td class="money-td">${orderedDrink.price}</td>
            <td class="money-td">${orderedDrink.price * orderedDrink.quantity}</td>
            <td><span class="time" onclick="deleteRow('${orderedDrink.id}')">&times;</span></td>
        </tr>
        `;
            orderedDetailsElement.innerHTML += html;
            sumOrdered += orderedDrink.price * orderedDrink.quantity;
            total += orderedDrink.quantity;
        })
        document.getElementById("amount").innerHTML = sumOrdered;
        document.getElementById("sumDrinks").innerHTML = total;
    }
}

function orderedTable(id) {
    document.querySelectorAll(".tbSelected").forEach((item) => {
        item.style.backgroundColor = "";
    })
    document.getElementById(`tb${id}`).style.backgroundColor = "bisque";
    tbSelected = id;
    document.getElementById("tbNumber").innerHTML = listTables[id].name;


    // let drink = listTables[id].listOrderedDrinks;
    // document.getElementById("orderedDetails").innerHTML = '';
    // document.getElementById("sumDrinks").innerHTML = 0;
    // document.getElementById("amount").innerHTML = 0;
    // document.getElementById('indexTable').value = id;
    // let sumOrdered = 0;
    // let total = 0;
    // if (drink.length > 0) {
    //     for (let i in drink) {
    //         let html = ` 
    //         <tr>
    //             <td class="money-td">${parseInt(i) + 1}</td>
    //             <td class="money-td">${drink[i].drinkName}</td>
    //             <td class="money-td">${drink[i].quantity}</td>
    //             <td class="money-td">${drink[i].price}</td>
    //             <td class="money-td">${drink[i].quantity * drink[i].price}</td>
    //             <td><span class="time" onclick="deleteRow('${drink[i]}')">&times;</span></td>
    //         </tr>
    //         `;
    //         sumOrdered += drink[i].quantity;
    //         total += drink[i].quantity * drink[i].price;
    //         document.getElementById("orderedDetails").insertAdjacentHTML('beforeend', html)
    //     };
    //     document.getElementById("sumDrinks").innerHTML = sumOrdered;
    //     document.getElementById("amount").innerHTML = total;
    // }
    

}

function runAll() {
    exportDrink();
    exportTables();
    // init();
}
runAll();



