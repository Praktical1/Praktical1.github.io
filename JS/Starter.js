var hours = 1; //(Note 0 is for testing purposes) Determines number of hours of inactivity before storage is wiped.
var now = new Date().getTime();     //Local time in milliseconds
var lastAccessed = localStorage.getItem('lastAccessed');
if (lastAccessed == null) {
    localStorage.setItem('lastAccessed', now)
    window.location.href = "starter.html";
} else if (now - lastAccessed > hours * 60 * 60 * 1000) {
    localStorage.clear()
    localStorage.setItem('lastAccessed', now);
    window.location.href = "starter.html";
} else {
    localStorage.setItem('lastAccessed', now);
}

window.addEventListener("DOMContentLoaded", function (e) {
    const submits = document.querySelectorAll("button[submit]");
    submits.forEach(function (button) {
        button.addEventListener("click", function (e) {
            const button = e.currentTarget;
            if (parseInt(document.querySelector("#house-number").value) > 0) {
                document.querySelector(".error").innerHTML = ""
                if (document.querySelector("#postcode").value == "") {
                    document.querySelector(".error").append("Please enter a postcode");

                } else {
                    const address = {
                        houseNum: document.querySelector("#house-number").value,
                        postalCode: document.querySelector("#postcode").value
                    }
                    localStorage.setItem("address", JSON.stringify(address));
                    localStorage.setItem('lastAccessed', now)
                    window.location.href = "pizzas.html";
                }
            } else {
                document.querySelector(".error").innerHTML = ""
                document.querySelector(".error").append("Housenumber can't be less than 1");
            }
        })
    })
    const reset = document.querySelectorAll("button[reset]");
    reset.forEach(function (button) {
        button.addEventListener("click", function (e) {
            localStorage.clear()
            localStorage.setItem('lastAccessed', now)
            window.location.href = "starter.html";
        })
    })
});