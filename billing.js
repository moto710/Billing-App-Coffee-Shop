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
}
function deleteRow(orderedId) {
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

exportDrink();


