document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ROYAL ENVELOPE OPENING
    ===================================================== */

    const intro = document.getElementById("intro");
    const envelope = document.getElementById("envelope");
    const tapText = document.getElementById("tapText");
    const website = document.getElementById("website");

    let opened = false;


    function createSparkle(x, y) {

        const sparkle = document.createElement("span");

        sparkle.textContent =
            Math.random() > 0.5 ? "✦" : "✧";

        sparkle.style.position = "fixed";
        sparkle.style.left = x + "px";
        sparkle.style.top = y + "px";
        sparkle.style.color = "#f2d58b";
        sparkle.style.fontSize =
            (8 + Math.random() * 12) + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "100000";

        sparkle.style.transition =
            "all .9s ease";

        document.body.appendChild(sparkle);

        requestAnimationFrame(function () {

            sparkle.style.transform =
                `translate(
                    ${(Math.random() * 100) - 50}px,
                    ${-(30 + Math.random() * 80)}px
                ) scale(0)`;

            sparkle.style.opacity = "0";

        });

        setTimeout(function () {
            sparkle.remove();
        }, 1000);
    }


    function createOpeningSparkles() {

        const rect =
            envelope.getBoundingClientRect();

        for (let i = 0; i < 30; i++) {

            setTimeout(function () {

                const x =
                    rect.left +
                    Math.random() * rect.width;

                const y =
                    rect.top +
                    Math.random() * rect.height;

                createSparkle(x, y);

            }, i * 45);

        }
    }


    function openEnvelope() {

        if (opened) return;

        opened = true;

        /* Prevent another click */

        envelope.style.pointerEvents = "none";

        /* Change instruction */

        tapText.textContent =
            "✦ YOUR INVITATION IS OPENING ✦";


        /* Golden sparkle burst */

        createOpeningSparkles();


        /* Open envelope */

        envelope.classList.add("open");


        /*
            Give the card time to slide
            out of the envelope.
        */

        setTimeout(function () {

            website.classList.add("show");

        }, 2100);


        /*
            Fade away the intro
            after the complete animation.
        */

        setTimeout(function () {

            intro.classList.add("hide");

            document.body.style.overflowY = "auto";
            document.body.style.overflowX = "hidden";

        }, 3500);


        /*
            Remove intro from layout.
        */

        setTimeout(function () {

            intro.style.display = "none";

        }, 4800);

    }


    envelope.addEventListener(
        "click",
        openEnvelope
    );


    /* Keyboard support */

    envelope.setAttribute(
        "tabindex",
        "0"
    );

    envelope.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openEnvelope();

            }

        }
    );


    /* Lock scrolling before opening */

    document.body.style.overflow = "hidden";



    /* =====================================================
       SMOOTH SECTION SCROLL
    ===================================================== */

    window.scrollToSection = function (id) {

        const section =
            document.getElementById(id);

        if (!section) return;

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    };



    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const weddingDate =
        new Date(
            "2026-11-07T13:00:00+05:30"
        );


    function updateCountdown() {

        const now = new Date();

        const difference =
            weddingDate.getTime() -
            now.getTime();


        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if (
            !days ||
            !hours ||
            !minutes ||
            !seconds
        ) {
            return;
        }


        if (difference <= 0) {

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            return;
        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const d =
            Math.floor(
                totalSeconds / 86400
            );


        const h =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const m =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const s =
            totalSeconds % 60;


        days.textContent =
            String(d).padStart(2, "0");

        hours.textContent =
            String(h).padStart(2, "0");

        minutes.textContent =
            String(m).padStart(2, "0");

        seconds.textContent =
            String(s).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "section:not(.hero), .detail-card, .family-card, .venue-card"
        );


    revealElements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(45px)";

        element.style.transition =
            "opacity 1s ease, transform 1s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });



    /* =====================================================
       GOLD FLOATING PARTICLES
    ===================================================== */

    function createGoldParticle() {

        if (!opened) return;

        const particle =
            document.createElement("span");

        particle.textContent =
            Math.random() > .5
                ? "✦"
                : "✧";

        particle.style.position = "fixed";

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.bottom = "-20px";

        particle.style.color =
            "#d6b15d";

        particle.style.fontSize =
            (6 + Math.random() * 10) + "px";

        particle.style.pointerEvents =
            "none";

        particle.style.zIndex = "5";

        particle.style.opacity =
            .25 + Math.random() * .6;

        particle.style.transition =
            "transform 5s linear, opacity 5s linear";

        document.body.appendChild(
            particle
        );


        requestAnimationFrame(function () {

            particle.style.transform =
                `translateY(
                    -${window.innerHeight + 100}px
                ) rotate(360deg)`;

            particle.style.opacity = "0";

        });


        setTimeout(function () {

            particle.remove();

        }, 5200);

    }


    setInterval(
        createGoldParticle,
        700
    );



    /* =====================================================
       CLICK GOLD SPARKLES
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!opened) return;

            for (let i = 0; i < 5; i++) {

                setTimeout(function () {

                    createSparkle(
                        event.clientX +
                        (Math.random() * 30 - 15),

                        event.clientY +
                        (Math.random() * 30 - 15)
                    );

                }, i * 45);

            }

        }
    );



    /* =====================================================
       DATE CARD GOLD GLOW
    ===================================================== */

    const dateCard =
        document.querySelector(".date-card");


    if (dateCard) {

        setInterval(function () {

            dateCard.classList.toggle(
                "glowing"
            );

        }, 1800);

    }



    /* =====================================================
       MOUSE GOLD TRAIL
    ===================================================== */

    let lastTrail = 0;


    document.addEventListener(
        "mousemove",
        function (event) {

            if (!opened) return;

            const now =
                Date.now();


            if (
                now - lastTrail < 150
            ) {
                return;
            }


            lastTrail = now;


            createSparkle(
                event.clientX,
                event.clientY
            );

        }
    );



    /* =====================================================
       MOBILE TOUCH EFFECT
    ===================================================== */

    document.addEventListener(
        "touchstart",
        function (event) {

            if (!opened) return;

            const touch =
                event.touches[0];

            if (!touch) return;

            createSparkle(
                touch.clientX,
                touch.clientY
            );

        },
        {
            passive: true
        }
    );



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.createElement("button");


    backTop.innerHTML = "↑";

    backTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backTop.style.position = "fixed";

    backTop.style.right = "20px";

    backTop.style.bottom = "20px";

    backTop.style.width = "42px";

    backTop.style.height = "42px";

    backTop.style.border =
        "1px solid rgba(214,177,93,.6)";

    backTop.style.borderRadius = "50%";

    backTop.style.background =
        "rgba(4,17,13,.9)";

    backTop.style.color =
        "#f2d58b";

    backTop.style.fontSize = "18px";

    backTop.style.cursor = "pointer";

    backTop.style.opacity = "0";

    backTop.style.visibility =
        "hidden";

    backTop.style.transform =
        "translateY(15px)";

    backTop.style.transition =
        ".4s ease";

    backTop.style.zIndex = "1000";

    document.body.appendChild(
        backTop
    );


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                backTop.style.opacity = "1";

                backTop.style.visibility =
                    "visible";

                backTop.style.transform =
                    "translateY(0)";

            } else {

                backTop.style.opacity = "0";

                backTop.style.visibility =
                    "hidden";

                backTop.style.transform =
                    "translateY(15px)";

            }

        }
    );


    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =====================================================
       PREVENT IMAGE/ENVELOPE DRAG
    ===================================================== */

    envelope.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();

        }
    );



    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "🌙 Shaiba & Faruq Azam — Royal Nikah Invitation"
    );

});
