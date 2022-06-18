var hours = 1; //(Note 0 is for testing purposes) Determines number of hours of inactivity before storage is wiped.
var now = new Date().getTime();     //Local time in milliseconds
var lastAccessed = localStorage.getItem('lastAccessed');
if (lastAccessed == null) {
    localStorage.setItem('lastAccessed', now)
    window.location.href = "starter.html";
} else if (now - lastAccessed > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem('lastAccessed', now);
    window.location.href = "starter.html";
} else {
    localStorage.setItem('lastAccessed', now);
    const address = localStorage.getItem("address")
    if (address == null){
        window.location.href = "starter.html";
    }
}

window.addEventListener("DOMContentLoaded", function (e) {
    const order = localStorage.getItem("order");
    const reset = document.querySelectorAll("button[reset]");                   //responsible for allowing user to cleaar basket without being returned to landing page
    reset.forEach(function (button) {
        button.addEventListener("click", function (e) {
            const address = localStorage.getItem("address")
            localStorage.clear();
            localStorage.setItem("address",address)
            localStorage.setItem('lastAccessed', now)
            window.location.href = "basket.html";
        })
    })
    const viewBasket = document.querySelectorAll("button[view-basket]");        //reponsible for sideBasket taking you to basket page, could've been replaced by goTo function but need more time to optimise code.
    viewBasket.forEach(function (button) {
        button.addEventListener("click", function (e) {
            top.window.location.href = "basket.html";
        })
    })
    if (order) {
        var store = order.split("/");
        var total = 0.00;
        for (i = 0; i < store.length; i++) {
            var item = JSON.parse(store[i]);
            counterlist = String(i);
            /*for (j = 0;j<i;j++) {                                 //Attempt at pizza duplicate count
                let lists = document.getElementById(String(j))
                if (item.title == lists.innerHTML){
                    total += 1000;
                }
            }*/
            update("list", item.title, counterlist);
            if (item.size) {                                        //For pizzas
                update(counterlist, item.size + "\"");
            }
            if (item.contains1) {                                   //For half-half pizzas
                update(counterlist, "Left Half: " + item.title1);
                countercontains1 = "C" + String(i);
                update(counterlist, "Contains: ", countercontains1);
                toppings = item.contains1.split("~");
                for (j = 0; j < toppings.length; j++) {
                    update(countercontains1, toppings[j]);
                }
                update(counterlist, "Right Half: " + item.title2);
                countercontains2 = "C2" + String(i);
                update(counterlist, "Contains: ", countercontains2);
                toppings = item.contains2.split("~");
                for (j = 0; j < toppings.length; j++) {
                    update(countercontains2, toppings[j]);
                }
            } 
            if (item.contains){                                     //For normal pizzas
                countercontains = "C" + String(i);
                update(counterlist, "Contains: ", countercontains);
                toppings = item.contains.split("~");
                for (j = 0; j < toppings.length; j++) {
                    update(countercontains, toppings[j]);
                }
            }

            //price's unique tag
            var ul = document.getElementById(counterlist);
            var li = document.createElement("li");
            li.setAttribute("id", "price");
            li.appendChild(document.createTextNode("£" + item.price));
            ul.appendChild(li);
            ul.appendChild(li);

            total += parseFloat(item.price);        //sums up prices for total
        }
        total = total.toFixed(2);       //makes sure total is to 2 decimal places, double things
        document.querySelector(".total").append(total);
    }


    function update(listname, entry) {
        var ul = document.getElementById(listname);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(entry));
        ul.appendChild(li);
    }
    function update(listname, entry, elementname) {
        var ul = document.getElementById(listname);
        var ul2 = document.createElement("ul");
        ul2.setAttribute("id", elementname);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(entry));
        li.appendChild(ul2);
        ul.appendChild(li);
    }
})