// ===============================
// PAGE NAVIGATION
// ===============================

const pages = document.querySelectorAll(".page");

let currentPage = 0;

function showPage(index) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    pages[index].classList.add("active");

    currentPage = index;

}

// ===============================
// PAGE 4 - FIRST IMPRESSION
// ===============================

let firstImpression = "";

const answerCards = document.querySelectorAll(".answer-card");

answerCards.forEach(card => {

    card.addEventListener("click", () => {

        answerCards.forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        firstImpression = card.dataset.value;

    });

});

// ===============================
// PAGE 5 - LIKE REASON
// ===============================

let likeReason = "";

const reasonCards = document.querySelectorAll(".reason-card");

reasonCards.forEach(card => {

    card.addEventListener("click", () => {

        reasonCards.forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        likeReason = card.dataset.value;

    });

});

// ===============================
// PAGE 6 - FAVORITE PART
// ===============================

let favoritePart = "";

const favoriteCards = document.querySelectorAll(".favorite-card");

favoriteCards.forEach(card => {

    card.addEventListener("click", () => {

        favoriteCards.forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        favoritePart = card.dataset.value;

    });

});

// ===============================
// NEXT BUTTONS
// ===============================

document.querySelectorAll(".nextBtn").forEach(button => {

    button.addEventListener("click", function () {

        const nextPage = Number(this.dataset.next);

        // ===============================
        // PAGE 4 VALIDATION
        // ===============================

        if (currentPage === 3 && firstImpression === "") {

            alert("Please choose your first impression ❤️");

            return;

        }

        // ===============================
        // PAGE 5 VALIDATION
        // ===============================

        if (currentPage === 4 && likeReason === "") {

            alert("Please choose what made you like me ❤️");

            return;

        }

        // ===============================
        // PAGE 6 VALIDATION
        // ===============================

        if (currentPage === 5 && favoritePart === "") {

            alert("Please choose your favorite part ❤️");

            return;

        }

        // ===============================
        // PAGE 7 VALIDATION
        // ===============================

        if(currentPage===6 && dreamDate===""){

        alert("Choose our first date ❤️");

        return;

        }

        showPage(nextPage);

    });

});

// ===============================
// START WEBSITE
// ===============================

showPage(0);

// ===============================
// PAGE 7
// ===============================

let dreamDate = "";

const dateCards = document.querySelectorAll(".date-card");

dateCards.forEach(card=>{

card.addEventListener("click",()=>{

dateCards.forEach(c=>c.classList.remove("selected"));

card.classList.add("selected");

dreamDate=card.dataset.value;

});

});

// ===============================
// PAGE 8 - YES / NO + EMAILJS
// ===============================

const yesBtn = document.querySelector(".yesBtn");
const noBtn = document.querySelector(".noBtn");

if (yesBtn) {

    yesBtn.addEventListener("click", function () {

        const templateParams = {

            first_impression: firstImpression,
            like_reason: likeReason,
            favorite_part: favoritePart,
            dream_date: dreamDate,
            final_answer: "YES ❤️"

        };

        yesBtn.innerHTML = "Sending...";
        yesBtn.disabled = true;

        emailjs.send(
            "service_hxcx4vz",
            "template_dwkf20c",
            templateParams
        )

        .then(function () {

            // Go to last page
            showPage(8);

        })

        .catch(function (error) {

            console.log(error);

            alert("Email failed to send.");

            yesBtn.innerHTML = "YES ❤️";
            yesBtn.disabled = false;

        });

    });

}

if (noBtn) {

    noBtn.addEventListener("click", function () {

        alert("That's okay ❤️\nTake all the time you need.");

    });

}
// ===============================
// PAGE 9
// ===============================

// ===============================
// FINAL BUTTON
// ===============================

const finishBtn = document.getElementById("finishBtn");

if (finishBtn) {

    finishBtn.addEventListener("click", () => {

        // Hide Button
        finishBtn.style.display = "none";

        // Change Title
        document.querySelector("#page9 h1").innerHTML =
            "❤️ Forever Starts Here ❤️";

        document.querySelector("#page9 h2").innerHTML =
            "This Is The Beginning Of Our Love Story";

        document.querySelector(".ending-text").innerHTML = `

            Thank you for saying <b>YES</b>. ❤️
            <br><br>

            I promise to always respect you,
            support you,
            and never stop making you smile.

            <br><br>

            I don't know where life will take us...

            But I hope we'll walk that journey together.

            <br><br>

            I Love You ❤️

        `;

        createConfetti();

    });

}
// ===============================
// CONFETTI
// ===============================

function createConfetti() {

    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.animationDelay = Math.random() * 3 + "s";

        confetti.style.background =
            ["#ff4d8d", "#ffb3d1", "#ffd700", "#ffffff"][
                Math.floor(Math.random() * 4)
            ];

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.remove();

        }, 6000);

    }

}