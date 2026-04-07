function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (window.location.href === link.href) {
            link.classList.add('active');
        }
    });
}
ActiveNav();

function addYear() {
    const el = document.getElementById("copyYear");
    if (el) {
        el.innerHTML = new Date().getFullYear() + " MonoMuse. All rights reserved.";
    }
}
addYear();

var date = new Date();
var hour = date.getHours();
function greeting(x) {
    const el = document.getElementById("greeting");
    if (!el) return;
    if (x < 12) {
        el.innerHTML = "Good morning — Welcome to the MonoMuse Museum";
    } else if (x < 18) {
        el.innerHTML = "Good afternoon — Welcome to the MonoMuse Museum";
    } else if (x < 20) {
        el.innerHTML = "Good evening — Welcome to the MonoMuse Museum";
    } else {
        el.innerHTML = "Good night — Welcome to the MonoMuse Museum";
    }
}
greeting(hour);


if (typeof $ !== 'undefined') {
    $(document).ready(function () {
        $("#readMore").click(function () {
            $("#longIntro").show();
            $("#readLess").show();
            $("#readMore").hide();
        });

        $("#readLess").click(function () {
            $("#longIntro").hide();
            $("#readLess").hide();
            $("#readMore").show();
        });
    });
}

function showForm(date) {
    document.getElementById("purchaseForm").style.display = "block";
    var dateField = document.getElementById("selectedDate");
    if (dateField) {
        dateField.value = date;
    }
    document.getElementById("purchaseForm").scrollIntoView({ behavior: "smooth" });
}
