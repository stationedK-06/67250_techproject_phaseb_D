/*
 * External libraries
 *  jQuery v3.7.1  https://jquery.com/
 *  Leaflet https://leafletjs.com
 *  OpenStreetMap https://www.openstreetmap.org
 */

// Active navigation state
function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (window.location.href === link.href) {
            link.classList.add('active');
        }
    });
}
ActiveNav();

// Copyright year
function addYear() {
    const el = document.getElementById("copyYear");
    if (el) {
        el.innerHTML = new Date().getFullYear() + " MonoMuse. All rights reserved.";
    }
}
addYear();

// Time greeting (home page)
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


//jQuery v3.7.1

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

        $(".accordion-btn").click(function () {
            var panel = $("#" + $(this).attr("aria-controls"));
            var isOpen = $(this).attr("aria-expanded") === "true";


            $(".accordion-panel").slideUp(200);
            $(".accordion-btn").attr("aria-expanded", "false").removeClass("accordion-btn--open");

            if (!isOpen) {
                panel.slideDown(200);
                $(this).attr("aria-expanded", "true").addClass("accordion-btn--open");
            }
        });
    });
}

// Leaflet / OpenStreetMap
// Initializes the map on explore.html
function initMap() {
    var map = L.map('map').setView([40.4432, -79.9428], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([40.4432, -79.9428]).addTo(map)
        .bindPopup('MonoMuse Museum<br>4800 Forbes Ave, Pittsburgh, PA 15213')
        .openPopup();
}

// resp hamburger nav 
function toggleNav() {
    document.querySelector('.nav_bar').classList.toggle('responsive');
}

// Ticket checkout show purchase form 

// Autofill 
function showForm(isoDate) {
    document.getElementById("purchaseForm").style.display = "block";
    var dateField = document.getElementById("visitDate");
    if (dateField && isoDate) {
        dateField.value = isoDate;
        updatePrice();
    }
    document.getElementById("purchaseForm").scrollIntoView({ behavior: "smooth" });
}

// Ticket checkout: price calculation 

var TICKET_PRICE = 18;

// Dates available
var AVAILABLE_DATES = [
    '2026-04-05',
    '2026-04-12',
    '2026-04-19',
    '2026-04-26',
    '2026-05-03'
];

// Updates the displayed total 
function updatePrice() {
    var qty = parseInt(document.getElementById('quantity') && document.getElementById('quantity').value) || 0;
    var total = qty * TICKET_PRICE;
    var el = document.getElementById('totalPrice');
    if (el) el.textContent = '$' + total.toFixed(2);
}

// Ticket checkout: form validation 

// Returns true if all fields valid else false
function validateCheckout() {
    var valid = true;

    // Visit date — must be selected and must be one of the available dates
    var visitDate = document.getElementById('visitDate');
    var visitDateError = document.getElementById('visitDateError');
    if (visitDate && !visitDate.value) {
        visitDateError.textContent = 'Please select a visit date.';
        valid = false;
    } else if (visitDate && AVAILABLE_DATES.indexOf(visitDate.value) === -1) {
        visitDateError.textContent = 'Please choose from the dates listed above.';
        valid = false;
    } else if (visitDateError) {
        visitDateError.textContent = '';
    }

    // Ticket type — required dropdown
    var ticketType = document.getElementById('ticketType');
    var ticketTypeError = document.getElementById('ticketTypeError');
    if (ticketType && !ticketType.value) {
        ticketTypeError.textContent = 'Please select a ticket type.';
        valid = false;
    } else if (ticketTypeError) {
        ticketTypeError.textContent = '';
    }

    // Quantity — required, numeric, 1–10
    var quantityEl = document.getElementById('quantity');
    var quantityError = document.getElementById('quantityError');
    if (quantityEl) {
        var qty = parseInt(quantityEl.value);
        if (!quantityEl.value || isNaN(qty)) {
            quantityError.textContent = 'Please enter the number of tickets.';
            valid = false;
        } else if (qty < 1 || qty > 10) {
            quantityError.textContent = 'Quantity must be between 1 and 10.';
            valid = false;
        } else {
            quantityError.textContent = '';
        }
    }

    // Email — required, regex should match else reject
    var emailEl = document.getElementById('email');
    var emailError = document.getElementById('emailError');
    if (emailEl) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailEl.value) {
            emailError.textContent = 'Email is required.';
            valid = false;
        } else if (!emailRegex.test(emailEl.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            valid = false;
        } else {
            emailError.textContent = '';
        }
    }

    // Zip code — opt requires: len == 5
    var zipEl = document.getElementById('zipCode');
    var zipError = document.getElementById('zipCodeError');
    if (zipEl && zipEl.value) {
        if (!/^\d{5}$/.test(zipEl.value)) {
            zipError.textContent = 'Zip code must be exactly 5 digits.';
            valid = false;
        } else {
            zipError.textContent = '';
        }
    } else if (zipError) {
        zipError.textContent = '';
    }

    return valid;
}

// Ticket checkout: place order 

// Validates form -> saves order to sessionStorage -> redirects to confirmation page
function placeOrder() {
    if (!validateCheckout()) return;

    var qty = parseInt(document.getElementById('quantity').value);
    var total = qty * TICKET_PRICE;

    // "YYYY-MM-DD" to  "Month D, YYYY"
    var rawDate = document.getElementById('visitDate').value;
    var dateParts = rawDate.split('-');
    var displayDate = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2])
    ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    var order = {
        visitDate: displayDate,
        ticketType: document.getElementById('ticketType').value,
        quantity: qty,
        total: total.toFixed(2),
        email: document.getElementById('email').value,
        mailingList: document.getElementById('mailingList').checked
    };

    sessionStorage.setItem('monoMuseOrder', JSON.stringify(order));
    window.location.href = 'confirmation.html';
}

//Confirmation page
// Reads order from sessionStorage and redirent + display
function loadConfirmation() {
    var raw = sessionStorage.getItem('monoMuseOrder');
    if (!raw) {
        window.location.href = 'buytickets.html';
        return;
    }

    var order = JSON.parse(raw);
    var detailsEl = document.getElementById('orderDetails');
    if (!detailsEl) return;

    var mailingRow = order.mailingList
        ? '<tr><th scope="row">Mailing List</th><td>Subscribed</td></tr>'
        : '';

    detailsEl.innerHTML =
        '<table class="order-summary-table">' +
            '<tbody>' +
                '<tr><th scope="row">Visit Date</th><td>' + order.visitDate + '</td></tr>' +
                '<tr><th scope="row">Ticket Type</th><td>' + order.ticketType + '</td></tr>' +
                '<tr><th scope="row">Quantity</th><td>' + order.quantity + '</td></tr>' +
                '<tr><th scope="row">Price per Ticket</th><td>$18.00</td></tr>' +
                '<tr><th scope="row">Total</th><td><strong>$' + order.total + '</strong></td></tr>' +
                '<tr><th scope="row">Email</th><td>' + order.email + '</td></tr>' +
                mailingRow +
            '</tbody>' +
        '</table>';

    sessionStorage.removeItem('monoMuseOrder');
}

// DOM prep slideshow  checkout event listeners
document.addEventListener('DOMContentLoaded', function () {

    // Slideshow
    var slides = document.querySelectorAll('.slide');
    if (slides.length) {
        var current = 0;

        function showSlide(index) {
            slides[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            document.getElementById('slideCounter').textContent = (current + 1) + ' / ' + slides.length;
        }

        document.getElementById('prevSlide').addEventListener('click', function () { showSlide(current - 1); });
        document.getElementById('nextSlide').addEventListener('click', function () { showSlide(current + 1); });
    }

    var qtyEl = document.getElementById('quantity');
    if (qtyEl) qtyEl.addEventListener('input', updatePrice);

    var placeOrderBtn = document.getElementById('placeOrder');
    if (placeOrderBtn) placeOrderBtn.addEventListener('click', placeOrder);
});
