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
    const addBasket = document.querySelectorAll("button[data-order]");
    const gottobuilder = document.querySelectorAll("button[builder]");
    gottobuilder.forEach(function (button) {
        button.addEventListener("click", function (e) {
            window.location.href = "builder.html";
        })
    })
    addBasket.forEach(function (button) {

        button.addEventListener("click", function (e) {
            localStorage.setItem('lastAccessed', now);
            const button = e.currentTarget;
            const container = button.parentNode;
            if (container.querySelector("select")) {
                var select = container.querySelector("select").value.split(",");
            }
            const order = null;
            if (select) {
                const order = {
                    id: container.querySelector(".title").getAttribute("id"),
                    title: container.querySelector(".title").innerText,
                    price: select[0],
                    size: select[1],
                    desc: container.querySelector(".desc").innerText,
                    contains:button.getAttribute("data-order")
                };
                const oldorder = localStorage.getItem("order");
                if (oldorder == null) {
                    localStorage.setItem("order", JSON.stringify(order))
                } else {
                    const neworder = oldorder + "/" + JSON.stringify(order);
                    localStorage.setItem("order", neworder);
                }
            } else {
                const order = {
                    id: container.querySelector(".title").getAttribute("id"),
                    title: container.querySelector(".title").innerText,
                    price: container.querySelector(".price").id,
                    desc: container.querySelector(".desc").innerText
                };
                const oldorder = localStorage.getItem("order");
                if (oldorder == null) {
                    localStorage.setItem("order", JSON.stringify(order))
                } else {
                    const neworder = oldorder + "/" + JSON.stringify(order);
                    localStorage.setItem("order", neworder);
                }
            }


            document.getElementById('sidebasket').src = document.getElementById('sidebasket').src
        });
    });
});