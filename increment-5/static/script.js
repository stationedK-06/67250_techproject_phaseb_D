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

function initMap() {
    const location = { lat: 40.4432, lng: -79.9428 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        mapId: '67250 ahahahahah',
    });
    const label = document.createElement('div');
    label.textContent = 'MonoMuse Museum';
    label.style.cssText = 'background:#636B2F;color:#fff;padding:4px 8px;border-radius:4px;font-size:13px;font-weight:500;';

    new google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: map,
        content: label,
        title: 'MonoMuse Museum',
    });
}

function toggleNav() {
    document.querySelector('.nav_bar').classList.toggle('responsive');
}

function showForm(date) {
    document.getElementById("purchaseForm").style.display = "block";
    var dateField = document.getElementById("selectedDate");
    if (dateField) {
        dateField.value = date;
    }
    document.getElementById("purchaseForm").scrollIntoView({ behavior: "smooth" });
}
