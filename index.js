document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =========================================================
       AOS
    ========================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 850,
            once: true,
            offset: 80,
            easing: "ease-out-cubic"
        });

    }


    /* =========================================================
       HEADER SCROLL EFFECT
    ========================================================= */

    const stacklyITHeader =
        document.getElementById("stacklyITHeader");


    function stacklyITHeaderScroll() {

        if (!stacklyITHeader) return;


        if (window.scrollY > 50) {

            stacklyITHeader.classList.add(
                "stackly-it-header-scrolled"
            );

        } else {

            stacklyITHeader.classList.remove(
                "stackly-it-header-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        stacklyITHeaderScroll,
        { passive: true }
    );


    stacklyITHeaderScroll();



    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const stacklyITMenuToggle =
        document.getElementById(
            "stacklyITMenuToggle"
        );

    const stacklyITMenuClose =
        document.getElementById(
            "stacklyITMenuClose"
        );

    const stacklyITMobileMenu =
        document.getElementById(
            "stacklyITMobileMenu"
        );

    const stacklyITMobileOverlay =
        document.getElementById(
            "stacklyITMobileOverlay"
        );


    function stacklyITOpenMenu() {

        if (!stacklyITMobileMenu) return;


        stacklyITMobileMenu.classList.add(
            "stackly-it-mobile-menu-open"
        );


        if (stacklyITMobileOverlay) {

            stacklyITMobileOverlay.classList.add(
                "stackly-it-mobile-overlay-active"
            );

        }


        document.body.classList.add(
            "stackly-it-menu-is-open"
        );


        if (stacklyITMenuToggle) {

            stacklyITMenuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        stacklyITMobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function stacklyITCloseMenu() {

        if (!stacklyITMobileMenu) return;


        stacklyITMobileMenu.classList.remove(
            "stackly-it-mobile-menu-open"
        );


        if (stacklyITMobileOverlay) {

            stacklyITMobileOverlay.classList.remove(
                "stackly-it-mobile-overlay-active"
            );

        }


        document.body.classList.remove(
            "stackly-it-menu-is-open"
        );


        if (stacklyITMenuToggle) {

            stacklyITMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        stacklyITMobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (stacklyITMenuToggle) {

        stacklyITMenuToggle.addEventListener(
            "click",
            stacklyITOpenMenu
        );

    }


    if (stacklyITMenuClose) {

        stacklyITMenuClose.addEventListener(
            "click",
            stacklyITCloseMenu
        );

    }


    if (stacklyITMobileOverlay) {

        stacklyITMobileOverlay.addEventListener(
            "click",
            stacklyITCloseMenu
        );

    }


    const stacklyITMobileLinks =
        document.querySelectorAll(
            ".stackly-it-mobile-nav a"
        );


    stacklyITMobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                stacklyITCloseMenu
            );

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                stacklyITMobileMenu &&
                stacklyITMobileMenu.classList.contains(
                    "stackly-it-mobile-menu-open"
                )
            ) {

                stacklyITCloseMenu();

            }

        }
    );



    /* =========================================================
       HERO VIDEO SLIDER
    ========================================================= */

    const stacklyITVideos = [

        document.getElementById(
            "stacklyITVideoOne"
        ),

        document.getElementById(
            "stacklyITVideoTwo"
        ),

        document.getElementById(
            "stacklyITVideoThree"
        )

    ];


    const validVideos =
        stacklyITVideos.filter(Boolean);


    const stacklyITHeroLabel =
        document.getElementById(
            "stacklyITHeroLabel"
        );


    const stacklyITHeroTitle =
        document.getElementById(
            "stacklyITHeroTitle"
        );


    const stacklyITHeroDescription =
        document.getElementById(
            "stacklyITHeroDescription"
        );


    const stacklyITHeroCardTitle =
        document.getElementById(
            "stacklyITHeroCardTitle"
        );


    const stacklyITHeroCardText =
        document.getElementById(
            "stacklyITHeroCardText"
        );


    const stacklyITSlideDots =
        document.querySelectorAll(
            ".stackly-it-slide-dot"
        );


    const stacklyITHeroData = [

        {
            label:
                "NEXT-GENERATION TECHNOLOGY",

            title:
                'Intelligent IT <span>Solutions</span>',

            description:
                "We build powerful digital solutions that help businesses transform, scale and move confidently into the future.",

            cardTitle:
                "Technology That Moves You Forward",

            cardText:
                "Smart technology, thoughtful strategy and measurable results."
        },


        {
            label:
                "DIGITAL TRANSFORMATION",

            title:
                'Build. <span>Transform. Scale.</span>',

            description:
                "Modernize your business with cloud, automation and intelligent digital experiences designed for growth.",

            cardTitle:
                "Transform Your Business",

            cardText:
                "Connect people, processes and technology through smarter digital systems."
        },


        {
            label:
                "SMARTER BUSINESS TECHNOLOGY",

            title:
                'Innovation <span>Without Limits</span>',

            description:
                "From software development to cybersecurity, Stackly delivers technology that keeps your business ready for what comes next.",

            cardTitle:
                "Innovation With Purpose",

            cardText:
                "Secure, scalable and future-ready solutions built around your business goals."
        }

    ];


    let stacklyITCurrentSlide = 0;
    let stacklyITSliderTimer = null;


    function stacklyITShowSlide(index) {

        if (!validVideos.length) return;


        if (index < 0) {
            index =
                stacklyITHeroData.length - 1;
        }


        if (
            index >=
            stacklyITHeroData.length
        ) {

            index = 0;

        }


        stacklyITCurrentSlide = index;


        validVideos.forEach(
            function (video, videoIndex) {

                video.classList.remove(
                    "stackly-it-video-active"
                );


                video.pause();


                if (videoIndex === index) {

                    video.classList.add(
                        "stackly-it-video-active"
                    );


                    try {
                        video.currentTime = 0;
                    } catch (error) {}


                    const playPromise =
                        video.play();


                    if (
                        playPromise &&
                        typeof playPromise.catch ===
                        "function"
                    ) {

                        playPromise.catch(
                            function () {}
                        );

                    }

                }

            }
        );


        const data =
            stacklyITHeroData[index];


        if (data) {


            if (stacklyITHeroLabel) {

                stacklyITHeroLabel.textContent =
                    data.label;

            }


            if (stacklyITHeroTitle) {

                stacklyITHeroTitle.innerHTML =
                    data.title;

            }


            if (stacklyITHeroDescription) {

                stacklyITHeroDescription.textContent =
                    data.description;

            }


            if (stacklyITHeroCardTitle) {

                stacklyITHeroCardTitle.textContent =
                    data.cardTitle;

            }


            if (stacklyITHeroCardText) {

                stacklyITHeroCardText.textContent =
                    data.cardText;

            }

        }


        stacklyITSlideDots.forEach(
            function (dot, dotIndex) {

                dot.classList.toggle(
                    "stackly-it-dot-active",
                    dotIndex === index
                );

            }
        );

    }


    function stacklyITNextSlide() {

        if (!validVideos.length) return;


        const nextSlide =
            (
                stacklyITCurrentSlide + 1
            ) %
            validVideos.length;


        stacklyITShowSlide(nextSlide);

    }


    function stacklyITStartSlider() {

        if (validVideos.length <= 1) {
            return;
        }


        clearInterval(
            stacklyITSliderTimer
        );


        stacklyITSliderTimer =
            setInterval(
                stacklyITNextSlide,
                7000
            );

    }


    stacklyITSlideDots.forEach(
        function (dot) {

            dot.addEventListener(
                "click",
                function () {

                    const slideIndex =
                        Number(
                            this.dataset.slide
                        );


                    if (
                        Number.isNaN(
                            slideIndex
                        )
                    ) {
                        return;
                    }


                    stacklyITShowSlide(
                        slideIndex
                    );


                    stacklyITStartSlider();

                }
            );

        }
    );


    const stacklyITReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    stacklyITShowSlide(0);


    if (
        !stacklyITReducedMotion.matches
    ) {

        stacklyITStartSlider();

    }



    /* =========================================================
       PAUSE HERO WHEN MOBILE MENU OPENS
    ========================================================= */

    if (stacklyITMobileMenu) {

        const stacklyITMenuObserver =
            new MutationObserver(
                function () {

                    const menuOpen =
                        stacklyITMobileMenu.classList.contains(
                            "stackly-it-mobile-menu-open"
                        );


                    if (menuOpen) {

                        validVideos.forEach(
                            function (video) {

                                video.pause();

                            }
                        );

                    } else {

                        const activeVideo =
                            validVideos[
                                stacklyITCurrentSlide
                            ];


                        if (activeVideo) {

                            activeVideo.play().catch(
                                function () {}
                            );

                        }

                    }

                }
            );


        stacklyITMenuObserver.observe(
            stacklyITMobileMenu,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );

    }



    /* =========================================================
       SERVICES SLIDER
    ========================================================= */

    const servicesGrid =
        document.getElementById(
            "servicesGrid"
        );


    const serviceDots =
        document.getElementById(
            "serviceDots"
        );


    const servicesWrapper =
        document.querySelector(
            ".services-slider-wrapper"
        );


    if (
        servicesGrid &&
        serviceDots &&
        servicesWrapper
    ) {

        const serviceCards =
            Array.from(
                servicesGrid.querySelectorAll(
                    ".service-card"
                )
            );


        if (serviceCards.length) {

            const AUTO_SLIDE_TIME = 4000;

            let currentServiceSlide = 0;

            let serviceTimer = null;

            let serviceResizeTimer = null;


            function getServicesPerView() {

                if (
                    window.innerWidth <= 600
                ) {

                    return 1;

                }


                if (
                    window.innerWidth <= 900
                ) {

                    return 2;

                }


                return 3;

            }


            function getTotalServiceSlides() {

                return Math.ceil(
                    serviceCards.length /
                    getServicesPerView()
                );

            }


            function updateServiceDots() {

                const dots =
                    serviceDots.querySelectorAll(
                        ".service-dot"
                    );


                dots.forEach(
                    function (dot, index) {

                        const active =
                            index ===
                            currentServiceSlide;


                        dot.classList.toggle(
                            "active",
                            active
                        );


                        dot.setAttribute(
                            "aria-current",
                            active
                                ? "true"
                                : "false"
                        );

                    }
                );

            }


            function createServiceDots() {

                serviceDots.innerHTML = "";


                const totalSlides =
                    getTotalServiceSlides();


                for (
                    let i = 0;
                    i < totalSlides;
                    i++
                ) {

                    const dot =
                        document.createElement(
                            "button"
                        );


                    dot.type = "button";

                    dot.className =
                        "service-dot";

                    dot.dataset.slide = i;


                    dot.setAttribute(
                        "aria-label",
                        "Show services slide " +
                        (i + 1)
                    );


                    dot.addEventListener(
                        "click",
                        function () {

                            goToServiceSlide(i);

                            restartServiceSlider();

                        }
                    );


                    serviceDots.appendChild(
                        dot
                    );

                }


                updateServiceDots();

            }


            function goToServiceSlide(
                slideIndex
            ) {

                const totalSlides =
                    getTotalServiceSlides();


                if (!totalSlides) return;


                if (
                    slideIndex >=
                    totalSlides
                ) {

                    slideIndex = 0;

                }


                if (
                    slideIndex < 0
                ) {

                    slideIndex =
                        totalSlides - 1;

                }


                currentServiceSlide =
                    slideIndex;


                const firstCard =
                    serviceCards[0];


                if (!firstCard) return;


                const cardWidth =
                    firstCard.getBoundingClientRect()
                        .width;


                const styles =
                    window.getComputedStyle(
                        servicesGrid
                    );


                const gap =
                    parseFloat(
                        styles.columnGap
                    ) ||
                    parseFloat(
                        styles.gap
                    ) ||
                    0;


                const cardsPerView =
                    getServicesPerView();


                let movement =
                    (
                        cardWidth + gap
                    ) *
                    cardsPerView *
                    currentServiceSlide;


                const maxScroll =
                    Math.max(
                        0,
                        servicesGrid.scrollWidth -
                        servicesWrapper.clientWidth
                    );


                movement =
                    Math.min(
                        movement,
                        maxScroll
                    );


                servicesGrid.style.transform =
                    "translate3d(-" +
                    movement +
                    "px, 0, 0)";


                updateServiceDots();

            }


            function nextServiceSlide() {

                const totalSlides =
                    getTotalServiceSlides();


                if (totalSlides <= 1) {
                    return;
                }


                goToServiceSlide(
                    currentServiceSlide + 1
                );

            }


            function stopServiceSlider() {

                if (serviceTimer) {

                    clearInterval(
                        serviceTimer
                    );

                    serviceTimer = null;

                }

            }


            function startServiceSlider() {

                stopServiceSlider();


                if (
                    getTotalServiceSlides() <= 1
                ) {

                    return;

                }


                serviceTimer =
                    setInterval(
                        nextServiceSlide,
                        AUTO_SLIDE_TIME
                    );

            }


            function restartServiceSlider() {

                stopServiceSlider();

                startServiceSlider();

            }


            servicesWrapper.addEventListener(
                "mouseenter",
                stopServiceSlider
            );


            servicesWrapper.addEventListener(
                "mouseleave",
                startServiceSlider
            );


            let serviceTouchStartX = 0;

            let serviceTouchEndX = 0;


            servicesWrapper.addEventListener(
                "touchstart",
                function (event) {

                    serviceTouchStartX =
                        event.changedTouches[0]
                            .screenX;

                    stopServiceSlider();

                },
                {
                    passive: true
                }
            );


            servicesWrapper.addEventListener(
                "touchend",
                function (event) {

                    serviceTouchEndX =
                        event.changedTouches[0]
                            .screenX;


                    const distance =
                        serviceTouchStartX -
                        serviceTouchEndX;


                    if (distance > 50) {

                        nextServiceSlide();

                    } else if (
                        distance < -50
                    ) {

                        goToServiceSlide(
                            currentServiceSlide - 1
                        );

                    }


                    startServiceSlider();

                },
                {
                    passive: true
                }
            );


            window.addEventListener(
                "resize",
                function () {

                    clearTimeout(
                        serviceResizeTimer
                    );


                    serviceResizeTimer =
                        setTimeout(
                            function () {

                                createServiceDots();

                                goToServiceSlide(
                                    currentServiceSlide
                                );

                                restartServiceSlider();

                            },
                            200
                        );

                }
            );


            createServiceDots();

            goToServiceSlide(0);

            startServiceSlider();

        }

    }



    /* =========================================================
       TEAM SECTION
    ========================================================= */

    const teamSection =
        document.querySelector(
            ".team-section"
        );


    const teamSlider =
        document.querySelector(
            ".team-section .team-slider"
        );


    const teamCards =
        document.querySelectorAll(
            ".team-section .team-card"
        );


    if (
        teamSection &&
        teamSlider &&
        teamCards.length
    ) {


        /* -----------------------------------------------------
           SET ACTIVE CARD
        ----------------------------------------------------- */

        function setTeamActiveCard(card) {

            teamCards.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            card.classList.add(
                "active"
            );

        }


        /* -----------------------------------------------------
           INITIAL CARD
        ----------------------------------------------------- */

        let initialTeamCard =
            teamSection.querySelector(
                ".team-card.active"
            );


        if (!initialTeamCard) {

            initialTeamCard =
                teamCards[0];

        }


        if (initialTeamCard) {

            setTeamActiveCard(
                initialTeamCard
            );

        }


        /* -----------------------------------------------------
           MOUSE HOVER
        ----------------------------------------------------- */

        teamCards.forEach(
            function (card) {

                card.addEventListener(
                    "mouseenter",
                    function () {

                        setTeamActiveCard(
                            card
                        );

                    }
                );


                /*
                 * Mobile touch
                 */

                card.addEventListener(
                    "touchstart",
                    function () {

                        setTeamActiveCard(
                            card
                        );

                    },
                    {
                        passive: true
                    }
                );

            }
        );


        /* -----------------------------------------------------
           SOCIAL LINKS
        ----------------------------------------------------- */

        const teamSocialLinks =
            teamSection.querySelectorAll(
                ".social-icons a"
            );


        teamSocialLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        /*
                         * Allow the 404.html link
                         * to work normally.
                         */

                        event.stopPropagation();

                    }
                );

            }
        );


        /* -----------------------------------------------------
           PLUS LINKS / BUTTONS
        ----------------------------------------------------- */

        const teamActionLinks =
            teamSection.querySelectorAll(
                ".team-info a"
            );


        teamActionLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        /*
                         * Allow navigation to 404.html.
                         */

                        event.stopPropagation();

                    }
                );

            }
        );


        /* -----------------------------------------------------
           MOUSE WHEEL HORIZONTAL SCROLL
        ----------------------------------------------------- */

        teamSlider.addEventListener(
            "wheel",
            function (event) {

                /*
                 * Only convert vertical wheel
                 * movement into horizontal movement.
                 */

                if (
                    Math.abs(event.deltaY) >
                    Math.abs(event.deltaX)
                ) {

                    event.preventDefault();

                    teamSlider.scrollLeft +=
                        event.deltaY;

                }

            },
            {
                passive: false
            }
        );


        /* -----------------------------------------------------
           KEYBOARD NAVIGATION
        ----------------------------------------------------- */

        teamCards.forEach(
            function (card, index) {

                card.setAttribute(
                    "tabindex",
                    "0"
                );


                card.addEventListener(
                    "keydown",
                    function (event) {


                        /* ENTER */

                        if (
                            event.key ===
                            "Enter"
                        ) {

                            event.preventDefault();

                            setTeamActiveCard(
                                card
                            );

                        }


                        /* SPACE */

                        if (
                            event.key ===
                            " "
                        ) {

                            event.preventDefault();

                            setTeamActiveCard(
                                card
                            );

                        }


                        /* RIGHT */

                        if (
                            event.key ===
                            "ArrowRight"
                        ) {

                            event.preventDefault();


                            const nextCard =
                                teamCards[
                                    index + 1
                                ];


                            if (nextCard) {

                                setTeamActiveCard(
                                    nextCard
                                );


                                nextCard.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",

                                        block:
                                            "nearest",

                                        inline:
                                            "center"
                                    }
                                );


                                nextCard.focus();

                            }

                        }


                        /* LEFT */

                        if (
                            event.key ===
                            "ArrowLeft"
                        ) {

                            event.preventDefault();


                            const previousCard =
                                teamCards[
                                    index - 1
                                ];


                            if (previousCard) {

                                setTeamActiveCard(
                                    previousCard
                                );


                                previousCard.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",

                                        block:
                                            "nearest",

                                        inline:
                                            "center"
                                    }
                                );


                                previousCard.focus();

                            }

                        }

                    }
                );

            }
        );


        /* -----------------------------------------------------
           MOBILE SWIPE
        ----------------------------------------------------- */

        let teamTouchStartX = 0;

        let teamTouchEndX = 0;


        teamSlider.addEventListener(
            "touchstart",
            function (event) {

                teamTouchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        teamSlider.addEventListener(
            "touchend",
            function (event) {

                teamTouchEndX =
                    event.changedTouches[0]
                        .screenX;


                const swipeDistance =
                    teamTouchStartX -
                    teamTouchEndX;


                if (
                    Math.abs(
                        swipeDistance
                    ) < 50
                ) {

                    return;

                }


                const activeCard =
                    teamSection.querySelector(
                        ".team-card.active"
                    );


                let currentIndex =
                    activeCard
                        ? Array.from(
                            teamCards
                        ).indexOf(
                            activeCard
                        )
                        : 0;


                /* SWIPE LEFT */

                if (
                    swipeDistance > 50
                ) {

                    currentIndex++;

                }


                /* SWIPE RIGHT */

                if (
                    swipeDistance < -50
                ) {

                    currentIndex--;

                }


                /*
                 * Keep index inside range
                 */

                if (
                    currentIndex < 0
                ) {

                    currentIndex =
                        teamCards.length - 1;

                }


                if (
                    currentIndex >=
                    teamCards.length
                ) {

                    currentIndex = 0;

                }


                const targetCard =
                    teamCards[
                        currentIndex
                    ];


                if (targetCard) {

                    setTeamActiveCard(
                        targetCard
                    );


                    targetCard.scrollIntoView(
                        {
                            behavior:
                                "smooth",

                            block:
                                "nearest",

                            inline:
                                "center"
                        }
                    );

                }

            },
            {
                passive: true
            }
        );


        /* -----------------------------------------------------
           TEAM IMAGE LOAD
        ----------------------------------------------------- */

        const teamImages =
            teamSection.querySelectorAll(
                ".team-image img"
            );


        teamImages.forEach(
            function (image) {

                image.addEventListener(
                    "load",
                    function () {

                        if (
                            typeof AOS !==
                            "undefined"
                        ) {

                            AOS.refresh();

                        }

                    }
                );

            }
        );


        /* -----------------------------------------------------
           AOS REFRESH
        ----------------------------------------------------- */

        if (
            typeof AOS !==
            "undefined"
        ) {

            AOS.refresh();

        }

    }



    /* =========================================================
       FINAL AOS REFRESH
    ========================================================= */

    window.addEventListener(
        "load",
        function () {

            if (
                typeof AOS !==
                "undefined"
            ) {

                AOS.refresh();

            }

        }
    );

});



document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TESTIMONIAL CAROUSEL
    ====================================================== */

    const carousel = document.querySelector(".testimonial-wrapper");

    if (!carousel) return;


    const cards = Array.from(
        carousel.querySelectorAll(".testimonial-card")
    );

    const dots = Array.from(
        carousel.querySelectorAll(".testimonial-dot")
    );

    const prevButton = carousel.querySelector(
        ".testimonial-prev"
    );

    const nextButton = carousel.querySelector(
        ".testimonial-next"
    );


    if (!cards.length) return;


    /* =====================================================
       SETTINGS
    ====================================================== */

    const AUTO_PLAY_TIME = 5000;

    let currentIndex = 0;

    let autoPlayTimer = null;

    let isPaused = false;


    /* =====================================================
       SHOW TESTIMONIAL
    ====================================================== */

    function showTestimonial(index, direction = "next") {

        if (index < 0) {
            index = cards.length - 1;
        }

        if (index >= cards.length) {
            index = 0;
        }


        /* Remove active classes */

        cards.forEach((card) => {
            card.classList.remove("active");

            card.setAttribute(
                "aria-hidden",
                "true"
            );
        });


        dots.forEach((dot) => {
            dot.classList.remove("active");

            dot.setAttribute(
                "aria-selected",
                "false"
            );
        });


        /* Current card */

        cards[index].classList.add("active");

        cards[index].setAttribute(
            "aria-hidden",
            "false"
        );


        /* Current dot */

        if (dots[index]) {

            dots[index].classList.add("active");

            dots[index].setAttribute(
                "aria-selected",
                "true"
            );
        }


        currentIndex = index;
    }


    /* =====================================================
       NEXT
    ====================================================== */

    function nextTestimonial() {

        const nextIndex =
            (currentIndex + 1) % cards.length;

        showTestimonial(
            nextIndex,
            "next"
        );
    }


    /* =====================================================
       PREVIOUS
    ====================================================== */

    function previousTestimonial() {

        const previousIndex =
            (currentIndex - 1 + cards.length)
            % cards.length;

        showTestimonial(
            previousIndex,
            "previous"
        );
    }


    /* =====================================================
       AUTO PLAY
    ====================================================== */

    function startAutoPlay() {

        stopAutoPlay();

        if (isPaused) return;

        autoPlayTimer = setInterval(() => {

            nextTestimonial();

        }, AUTO_PLAY_TIME);
    }


    function stopAutoPlay() {

        if (autoPlayTimer) {

            clearInterval(autoPlayTimer);

            autoPlayTimer = null;
        }
    }


    /* =====================================================
       RESET AUTO PLAY
    ====================================================== */

    function resetAutoPlay() {

        stopAutoPlay();

        if (!isPaused) {
            startAutoPlay();
        }
    }


    /* =====================================================
       NEXT BUTTON
    ====================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                nextTestimonial();

                resetAutoPlay();

            }
        );
    }


    /* =====================================================
       PREVIOUS BUTTON
    ====================================================== */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                previousTestimonial();

                resetAutoPlay();

            }
        );
    }


    /* =====================================================
       DOT NAVIGATION
    ====================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                if (index === currentIndex) {
                    resetAutoPlay();
                    return;
                }

                showTestimonial(
                    index,
                    index > currentIndex
                        ? "next"
                        : "previous"
                );

                resetAutoPlay();

            }
        );

    });


    /* =====================================================
       PAUSE ON HOVER
    ====================================================== */

    carousel.addEventListener(
        "mouseenter",
        () => {

            isPaused = true;

            stopAutoPlay();

        }
    );


    /* =====================================================
       RESUME AFTER HOVER
    ====================================================== */

    carousel.addEventListener(
        "mouseleave",
        () => {

            isPaused = false;

            startAutoPlay();

        }
    );


    /* =====================================================
       TOUCH / SWIPE SUPPORT
    ====================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    const SWIPE_THRESHOLD = 50;


    carousel.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

            stopAutoPlay();

        },
        { passive: true }
    );


    carousel.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

            startAutoPlay();

        },
        { passive: true }
    );


    function handleSwipe() {

        const distance =
            touchEndX - touchStartX;


        if (Math.abs(distance) < SWIPE_THRESHOLD) {
            return;
        }


        if (distance < 0) {

            // Swipe left
            nextTestimonial();

        } else {

            // Swipe right
            previousTestimonial();

        }

    }


    /* =====================================================
       KEYBOARD NAVIGATION
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            // Don't interfere while typing
            const activeElement =
                document.activeElement;

            const isTyping =
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.isContentEditable
                );

            if (isTyping) return;


            if (event.key === "ArrowRight") {

                nextTestimonial();

                resetAutoPlay();

            }


            if (event.key === "ArrowLeft") {

                previousTestimonial();

                resetAutoPlay();

            }

        }
    );


    /* =====================================================
       PAUSE WHEN BROWSER TAB IS HIDDEN
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopAutoPlay();

            } else if (!isPaused) {

                startAutoPlay();

            }

        }
    );


    /* =====================================================
       ACCESSIBILITY
    ====================================================== */

    cards.forEach((card, index) => {

        card.setAttribute(
            "role",
            "group"
        );

        card.setAttribute(
            "aria-roledescription",
            "testimonial"
        );

        card.setAttribute(
            "aria-label",
            `Testimonial ${index + 1} of ${cards.length}`
        );

        card.setAttribute(
            "aria-hidden",
            index === 0
                ? "false"
                : "true"
        );

    });


    dots.forEach((dot) => {

        dot.setAttribute(
            "role",
            "tab"
        );

    });


    /* =====================================================
       INITIALIZE
    ====================================================== */

    showTestimonial(0);

    startAutoPlay();


    /* =====================================================
       CLEANUP WHEN PAGE IS UNLOADED
    ====================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            stopAutoPlay();

        }
    );

});


const aosScript = document.createElement("script");
    aosScript.src = "https://unpkg.com/aos@2.3.4/dist/aos.js";
    aosScript.onload = () => {
      AOS.init({
        once: true,
        offset: 80,
        easing: "ease-out-cubic"
      });
    };
    document.head.appendChild(aosScript);

    const aosStyle = document.createElement("link");
    aosStyle.rel = "stylesheet";
    aosStyle.href = "https://unpkg.com/aos@2.3.4/dist/aos.css";
    document.head.appendChild(aosStyle);

/* =========================================================
   STACKLY IT - ACTIVE NAVIGATION
   Automatically highlights current page
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    /* =====================================================
       DESKTOP NAVIGATION
    ====================================================== */

    const desktopLinks =
        document.querySelectorAll(
            ".stackly-it-desktop-nav a"
        );


    desktopLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .toLowerCase();


        if (linkPage === currentPage) {

            link.classList.add(
                "stackly-it-nav-active"
            );

        }

    });


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const mobileLinks =
        document.querySelectorAll(
            ".stackly-it-mobile-nav a"
        );


    mobileLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .toLowerCase();


        if (linkPage === currentPage) {

            link.classList.add(
                "stackly-it-nav-active"
            );

        }

    });

});


document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       STACKLY CONTACT FORM
    ========================================================= */

    const stacklyForm =
        document.getElementById("stacklyContactForm");

    const stacklyStatus =
        document.getElementById("stacklyContactFormStatus");


    /* =========================================================
       CUSTOM SERVICE DROPDOWN
    ========================================================= */

    const stacklyServiceDropdown =
        document.getElementById("stacklyServiceDropdown");

    const stacklyServiceButton =
        document.getElementById("stacklyServiceButton");

    const stacklyServiceSelected =
        document.getElementById("stacklyServiceSelected");

    const stacklyServiceMenu =
        document.getElementById("stacklyServiceMenu");

    const stacklyServiceValue =
        document.getElementById("stacklyServiceValue");


    /* =========================================================
       CUSTOM BUDGET DROPDOWN
    ========================================================= */

    const stacklyBudgetDropdown =
        document.getElementById("stacklyBudgetDropdown");

    const stacklyBudgetButton =
        document.getElementById("stacklyBudgetButton");

    const stacklyBudgetSelected =
        document.getElementById("stacklyBudgetSelected");

    const stacklyBudgetMenu =
        document.getElementById("stacklyBudgetMenu");

    const stacklyBudgetValue =
        document.getElementById("stacklyBudgetValue");


    /* =========================================================
       SAFETY CHECK
    ========================================================= */

    if (!stacklyForm) {
        return;
    }


    /* =========================================================
       CLOSE ALL DROPDOWNS
    ========================================================= */

    function closeAllStacklyDropdowns() {

        document
            .querySelectorAll(
                ".stackly-js-dropdown.is-open"
            )
            .forEach(function (dropdown) {

                dropdown.classList.remove(
                    "is-open"
                );


                const button =
                    dropdown.querySelector(
                        ".stackly-js-dropdown-button"
                    );


                if (button) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

    }


    /* =========================================================
       TOGGLE DROPDOWN
    ========================================================= */

    function toggleStacklyDropdown(
        dropdown,
        button
    ) {

        if (!dropdown || !button) {
            return;
        }


        const isOpen =
            dropdown.classList.contains(
                "is-open"
            );


        closeAllStacklyDropdowns();


        if (!isOpen) {

            dropdown.classList.add(
                "is-open"
            );


            button.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }


    /* =========================================================
       SERVICE DROPDOWN BUTTON
    ========================================================= */

    if (stacklyServiceButton) {

        stacklyServiceButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                toggleStacklyDropdown(
                    stacklyServiceDropdown,
                    stacklyServiceButton
                );

            }
        );

    }


    /* =========================================================
       SERVICE OPTIONS
    ========================================================= */

    if (stacklyServiceMenu) {

        const serviceOptions =
            stacklyServiceMenu.querySelectorAll(
                ".stackly-js-dropdown-option"
            );


        serviceOptions.forEach(function (option) {

            option.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const value =
                        option.getAttribute(
                            "data-value"
                        );


                    const text =
                        option
                            .querySelector("span")
                            .textContent
                            .trim();


                    /* Update selected text */

                    stacklyServiceSelected.textContent =
                        text;


                    /* Update hidden input */

                    stacklyServiceValue.value =
                        value;


                    /* Add selected class */

                    stacklyServiceDropdown.classList.add(
                        "has-value"
                    );


                    /* Remove old selected option */

                    serviceOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "is-selected"
                            );


                            item.setAttribute(
                                "aria-selected",
                                "false"
                            );

                        }
                    );


                    /* Mark selected option */

                    option.classList.add(
                        "is-selected"
                    );


                    option.setAttribute(
                        "aria-selected",
                        "true"
                    );


                    /* Remove error */

                    stacklyServiceDropdown.classList.remove(
                        "stackly-dropdown-error"
                    );


                    const serviceField =
                        stacklyServiceDropdown.closest(
                            ".stackly-contact-field"
                        );


                    if (serviceField) {

                        serviceField.classList.remove(
                            "stackly-field-error"
                        );


                        const error =
                            serviceField.querySelector(
                                ".stackly-field-error-message"
                            );


                        if (error) {
                            error.remove();
                        }

                    }


                    /* Close dropdown */

                    stacklyServiceDropdown.classList.remove(
                        "is-open"
                    );


                    stacklyServiceButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =========================================================
       BUDGET DROPDOWN BUTTON
    ========================================================= */

    if (stacklyBudgetButton) {

        stacklyBudgetButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                toggleStacklyDropdown(
                    stacklyBudgetDropdown,
                    stacklyBudgetButton
                );

            }
        );

    }


    /* =========================================================
       BUDGET OPTIONS
    ========================================================= */

    if (stacklyBudgetMenu) {

        const budgetOptions =
            stacklyBudgetMenu.querySelectorAll(
                ".stackly-js-dropdown-option"
            );


        budgetOptions.forEach(function (option) {

            option.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const value =
                        option.getAttribute(
                            "data-value"
                        );


                    const text =
                        option
                            .querySelector("span")
                            .textContent
                            .trim();


                    /* Update selected text */

                    stacklyBudgetSelected.textContent =
                        text;


                    /* Update hidden input */

                    stacklyBudgetValue.value =
                        value;


                    /* Add selected class */

                    stacklyBudgetDropdown.classList.add(
                        "has-value"
                    );


                    /* Remove old selected option */

                    budgetOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "is-selected"
                            );


                            item.setAttribute(
                                "aria-selected",
                                "false"
                            );

                        }
                    );


                    /* Mark selected option */

                    option.classList.add(
                        "is-selected"
                    );


                    option.setAttribute(
                        "aria-selected",
                        "true"
                    );


                    /* Remove error */

                    stacklyBudgetDropdown.classList.remove(
                        "stackly-dropdown-error"
                    );


                    const budgetField =
                        stacklyBudgetDropdown.closest(
                            ".stackly-contact-field"
                        );


                    if (budgetField) {

                        budgetField.classList.remove(
                            "stackly-field-error"
                        );


                        const error =
                            budgetField.querySelector(
                                ".stackly-field-error-message"
                            );


                        if (error) {
                            error.remove();
                        }

                    }


                    /* Close dropdown */

                    stacklyBudgetDropdown.classList.remove(
                        "is-open"
                    );


                    stacklyBudgetButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =========================================================
       CLICK OUTSIDE DROPDOWN
    ========================================================= */

    document.addEventListener(
        "click",
        function () {

            closeAllStacklyDropdowns();

        }
    );


    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeAllStacklyDropdowns();

            }

        }
    );


    /* =========================================================
       REMOVE ERROR WHEN USER TYPES
    ========================================================= */

    const stacklyInputs =
        stacklyForm.querySelectorAll(
            "input:not([type='hidden']), textarea"
        );


    stacklyInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                removeStacklyFieldError(
                    input
                );

            }
        );

    });


    /* =========================================================
       REMOVE FIELD ERROR
    ========================================================= */

    function removeStacklyFieldError(field) {

        if (!field) {
            return;
        }


        field.classList.remove(
            "stackly-input-error"
        );


        const fieldContainer =
            field.closest(
                ".stackly-contact-field"
            );


        if (fieldContainer) {

            fieldContainer.classList.remove(
                "stackly-field-error"
            );


            const error =
                fieldContainer.querySelector(
                    ".stackly-field-error-message"
                );


            if (error) {

                error.remove();

            }

        }

    }


    /* =========================================================
       SHOW FIELD ERROR
    ========================================================= */

    function showStacklyFieldError(
        field,
        message
    ) {

        if (!field) {
            return;
        }


        const fieldContainer =
            field.closest(
                ".stackly-contact-field"
            );


        field.classList.add(
            "stackly-input-error"
        );


        if (!fieldContainer) {
            return;
        }


        fieldContainer.classList.add(
            "stackly-field-error"
        );


        const oldError =
            fieldContainer.querySelector(
                ".stackly-field-error-message"
            );


        if (oldError) {

            oldError.remove();

        }


        const error =
            document.createElement("div");


        error.className =
            "stackly-field-error-message";


        error.innerHTML =
            '<i class="fa-solid fa-circle-exclamation"></i>' +
            "<span>" +
            message +
            "</span>";


        fieldContainer.appendChild(
            error
        );

    }


    /* =========================================================
       SHOW DROPDOWN ERROR
    ========================================================= */

    function showStacklyDropdownError(
        dropdown,
        message
    ) {

        if (!dropdown) {
            return;
        }


        dropdown.classList.add(
            "stackly-dropdown-error"
        );


        const fieldContainer =
            dropdown.closest(
                ".stackly-contact-field"
            );


        if (!fieldContainer) {
            return;
        }


        fieldContainer.classList.add(
            "stackly-field-error"
        );


        const oldError =
            fieldContainer.querySelector(
                ".stackly-field-error-message"
            );


        if (oldError) {

            oldError.remove();

        }


        const error =
            document.createElement("div");


        error.className =
            "stackly-field-error-message";


        error.innerHTML =
            '<i class="fa-solid fa-circle-exclamation"></i>' +
            "<span>" +
            message +
            "</span>";


        fieldContainer.appendChild(
            error
        );

    }


    /* =========================================================
       NAME VALIDATION
       ONLY ALPHABETIC CHARACTERS + SPACES
    ========================================================= */

    function validateStacklyName() {

        const name =
            document.getElementById(
                "stacklyName"
            );


        const value =
            name.value.trim();


        /* Empty */

        if (value === "") {

            showStacklyFieldError(
                name,
                "Please enter your name."
            );

            return false;

        }


        /* Alphabetic only */

        const namePattern =
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;


        if (!namePattern.test(value)) {

            showStacklyFieldError(
                name,
                "Name should contain alphabetic characters only."
            );

            return false;

        }


        /* Minimum length */

        if (value.length < 2) {

            showStacklyFieldError(
                name,
                "Please enter a valid name."
            );

            return false;

        }


        return true;

    }


    /* =========================================================
       EMAIL VALIDATION
    ========================================================= */

    function validateStacklyEmail() {

        const email =
            document.getElementById(
                "stacklyEmail"
            );


        const value =
            email.value.trim();


        /* Empty */

        if (value === "") {

            showStacklyFieldError(
                email,
                "Please enter your email address."
            );

            return false;

        }


        /* Email format */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (!emailPattern.test(value)) {

            showStacklyFieldError(
                email,
                "Please enter a valid email address."
            );

            return false;

        }


        return true;

    }


    /* =========================================================
       PHONE VALIDATION
       EXACTLY 10 DIGITS
    ========================================================= */

    function validateStacklyPhone() {

        const phone =
            document.getElementById(
                "stacklyPhone"
            );


        const value =
            phone.value.trim();


        /* Phone is optional */

        if (value === "") {

            return true;

        }


        /* Allow spaces, +, -, brackets visually */

        const cleanPhone =
            value.replace(
                /[\s\-+()]/g,
                ""
            );


        /* Exactly 10 digits */

        if (!/^\d{10}$/.test(cleanPhone)) {

            showStacklyFieldError(
                phone,
                "Phone number must contain exactly 10 digits."
            );

            return false;

        }


        return true;

    }


    /* =========================================================
       SERVICE VALIDATION
    ========================================================= */

    function validateStacklyService() {

        if (
            !stacklyServiceValue ||
            stacklyServiceValue.value.trim() === ""
        ) {

            showStacklyDropdownError(
                stacklyServiceDropdown,
                "Please select a service."
            );

            return false;

        }


        return true;

    }


    /* =========================================================
       SUBJECT VALIDATION
       SUBJECT MUST CONTAIN CHARACTERS
    ========================================================= */

    function validateStacklySubject() {

        const subject =
            document.getElementById(
                "stacklySubject"
            );


        const value =
            subject.value.trim();


        /* Empty */

        if (value === "") {

            showStacklyFieldError(
                subject,
                "Please enter a subject."
            );

            return false;

        }


        /* Subject must contain at least one letter */

        const subjectCharacterPattern =
            /[A-Za-zÀ-ÖØ-öø-ÿ]/;


        if (
            !subjectCharacterPattern.test(
                value
            )
        ) {

            showStacklyFieldError(
                subject,
                "Subject should contain characters."
            );

            return false;

        }


        /* Minimum 3 characters */

        if (value.length < 3) {

            showStacklyFieldError(
                subject,
                "Subject must contain at least 3 characters."
            );

            return false;

        }


        return true;

    }


    /* =========================================================
       MESSAGE VALIDATION
    ========================================================= */

    function validateStacklyMessage() {

        const message =
            document.getElementById(
                "stacklyMessage"
            );


        const value =
            message.value.trim();


        /* Empty */

        if (value === "") {

            showStacklyFieldError(
                message,
                "Please tell us about your project."
            );

            return false;

        }


        /* Minimum message */

        if (value.length < 10) {

            showStacklyFieldError(
                message,
                "Please provide at least 10 characters."
            );

            return false;

        }


        return true;

    }


    /* =========================================================
       CONSENT VALIDATION
    ========================================================= */

    function validateStacklyConsent() {

        const consent =
            stacklyForm.querySelector(
                "input[name='consent']"
            );


        const consentContainer =
            document.querySelector(
                ".stackly-contact-consent"
            );


        if (!consent.checked) {

            consentContainer.classList.add(
                "stackly-consent-error"
            );


            let error =
                consentContainer.querySelector(
                    ".stackly-consent-error-message"
                );


            if (!error) {

                error =
                    document.createElement("div");


                error.className =
                    "stackly-consent-error-message";


                error.innerHTML =
                    '<i class="fa-solid fa-circle-exclamation"></i>' +
                    "<span>Please agree to be contacted.</span>";


                consentContainer.appendChild(
                    error
                );

            }


            return false;

        }


        consentContainer.classList.remove(
            "stackly-consent-error"
        );


        const error =
            consentContainer.querySelector(
                ".stackly-consent-error-message"
            );


        if (error) {

            error.remove();

        }


        return true;

    }


    /* =========================================================
       CLEAR ALL ERRORS
    ========================================================= */

    function clearStacklyErrors() {

        stacklyForm
            .querySelectorAll(
                ".stackly-input-error"
            )
            .forEach(function (field) {

                field.classList.remove(
                    "stackly-input-error"
                );

            });


        stacklyForm
            .querySelectorAll(
                ".stackly-field-error"
            )
            .forEach(function (field) {

                field.classList.remove(
                    "stackly-field-error"
                );

            });


        stacklyForm
            .querySelectorAll(
                ".stackly-field-error-message"
            )
            .forEach(function (error) {

                error.remove();

            });


        stacklyForm
            .querySelectorAll(
                ".stackly-dropdown-error"
            )
            .forEach(function (dropdown) {

                dropdown.classList.remove(
                    "stackly-dropdown-error"
                );

            });


        const consentContainer =
            document.querySelector(
                ".stackly-contact-consent"
            );


        if (consentContainer) {

            consentContainer.classList.remove(
                "stackly-consent-error"
            );

        }


        stacklyForm
            .querySelectorAll(
                ".stackly-consent-error-message"
            )
            .forEach(function (error) {

                error.remove();

            });

    }


    /* =========================================================
       RESET SERVICE DROPDOWN
    ========================================================= */

    function resetStacklyServiceDropdown() {

        if (
            !stacklyServiceDropdown ||
            !stacklyServiceSelected ||
            !stacklyServiceValue
        ) {
            return;
        }


        stacklyServiceSelected.textContent =
            "Select a service";


        stacklyServiceValue.value =
            "";


        stacklyServiceDropdown.classList.remove(
            "has-value"
        );


        stacklyServiceDropdown.classList.remove(
            "is-open"
        );


        stacklyServiceDropdown.classList.remove(
            "stackly-dropdown-error"
        );


        if (stacklyServiceButton) {

            stacklyServiceButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (stacklyServiceMenu) {

            stacklyServiceMenu
                .querySelectorAll(
                    ".stackly-js-dropdown-option"
                )
                .forEach(function (option) {

                    option.classList.remove(
                        "is-selected"
                    );


                    option.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });

        }

    }


    /* =========================================================
       RESET BUDGET DROPDOWN
    ========================================================= */

    function resetStacklyBudgetDropdown() {

        if (
            !stacklyBudgetDropdown ||
            !stacklyBudgetSelected ||
            !stacklyBudgetValue
        ) {
            return;
        }


        stacklyBudgetSelected.textContent =
            "Select budget";


        stacklyBudgetValue.value =
            "";


        stacklyBudgetDropdown.classList.remove(
            "has-value"
        );


        stacklyBudgetDropdown.classList.remove(
            "is-open"
        );


        stacklyBudgetDropdown.classList.remove(
            "stackly-dropdown-error"
        );


        if (stacklyBudgetButton) {

            stacklyBudgetButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (stacklyBudgetMenu) {

            stacklyBudgetMenu
                .querySelectorAll(
                    ".stackly-js-dropdown-option"
                )
                .forEach(function (option) {

                    option.classList.remove(
                        "is-selected"
                    );


                    option.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });

        }

    }


    /* =========================================================
       RESET COMPLETE FORM
    ========================================================= */

    function resetStacklyForm() {

        stacklyForm.reset();


        resetStacklyServiceDropdown();


        resetStacklyBudgetDropdown();


        clearStacklyErrors();


        closeAllStacklyDropdowns();

    }


    /* =========================================================
       CLEAR SUCCESS MESSAGE
    ========================================================= */

    function clearStacklySuccessMessage() {

        stacklyStatus.innerHTML = "";


        stacklyStatus.className =
            "stackly-contact-form-status";

    }


    /* =========================================================
       FORM SUBMIT
    ========================================================= */

    stacklyForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Clear previous status */

            clearStacklySuccessMessage();


            /* Clear old validation errors */

            clearStacklyErrors();


            /* =================================================
               VALIDATE ALL FIELDS
            ================================================= */

            const nameValid =
                validateStacklyName();


            const emailValid =
                validateStacklyEmail();


            const phoneValid =
                validateStacklyPhone();


            const serviceValid =
                validateStacklyService();


            const subjectValid =
                validateStacklySubject();


            const messageValid =
                validateStacklyMessage();


            const consentValid =
                validateStacklyConsent();


            /* =================================================
               FORM INVALID
            ================================================= */

            if (
                !nameValid ||
                !emailValid ||
                !phoneValid ||
                !serviceValid ||
                !subjectValid ||
                !messageValid ||
                !consentValid
            ) {

                stacklyStatus.innerHTML =
                    '<i class="fa-solid fa-circle-exclamation"></i>' +
                    "<span>" +
                    "Please correct the highlighted fields." +
                    "</span>";


                stacklyStatus.classList.add(
                    "stackly-status-error"
                );


                /* Find first error */

                const firstError =
                    stacklyForm.querySelector(
                        ".stackly-input-error, " +
                        ".stackly-dropdown-error, " +
                        ".stackly-consent-error"
                    );


                if (firstError) {

                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }


                return;

            }


            /* =================================================
               FORM IS VALID
            ================================================= */

            const submitButton =
                stacklyForm.querySelector(
                    ".stackly-contact-submit"
                );


            const submitButtonText =
                submitButton
                    ? submitButton.querySelector("span")
                    : null;


            const originalButtonText =
                submitButtonText
                    ? submitButtonText.textContent.trim()
                    : "Send Message";


            /* =================================================
               SHOW SUCCESS MESSAGE
            ================================================= */

            stacklyStatus.innerHTML =
                '<i class="fa-solid fa-circle-check"></i>' +
                "<span>" +
                "Thank you! Your message has been sent successfully." +
                "</span>";


            stacklyStatus.classList.add(
                "stackly-status-success"
            );


            /* =================================================
               DISABLE BUTTON
            ================================================= */

            if (submitButton) {

                submitButton.disabled =
                    true;

            }


            if (submitButtonText) {

                submitButtonText.textContent =
                    "Message Sent";

            }


            /* =================================================
               CLEAR FORM AFTER 1.5 SECONDS
            ================================================= */

            setTimeout(
                function () {

                    resetStacklyForm();


                    /* Restore button */

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                    }


                    if (submitButtonText) {

                        submitButtonText.textContent =
                            originalButtonText;

                    }


                    /* Show success message again
                       after form reset */

                    stacklyStatus.innerHTML =
                        '<i class="fa-solid fa-circle-check"></i>' +
                        "<span>" +
                        "Thank you! Your message has been sent successfully." +
                        "</span>";


                    stacklyStatus.className =
                        "stackly-contact-form-status";


                    stacklyStatus.classList.add(
                        "stackly-status-success"
                    );


                    /* =================================================
                       DISAPPEAR SUCCESS MESSAGE AFTER 2 SECONDS
                    ================================================= */

                    setTimeout(
                        function () {

                            clearStacklySuccessMessage();

                        },
                        2000
                    );


                },
                1500
            );

        }
    );


    /* =========================================================
       EXTRA: CLEAR CONSENT ERROR WHEN CHECKED
    ========================================================= */

    const stacklyConsent =
        stacklyForm.querySelector(
            "input[name='consent']"
        );


    if (stacklyConsent) {

        stacklyConsent.addEventListener(
            "change",
            function () {

                if (stacklyConsent.checked) {

                    const consentContainer =
                        document.querySelector(
                            ".stackly-contact-consent"
                        );


                    if (consentContainer) {

                        consentContainer.classList.remove(
                            "stackly-consent-error"
                        );


                        const error =
                            consentContainer.querySelector(
                                ".stackly-consent-error-message"
                            );


                        if (error) {

                            error.remove();

                        }

                    }

                }

            }
        );

    }


    /* =========================================================
       PHONE INPUT - DIGITS ONLY
       Maximum 10 digits
    ========================================================= */

    const stacklyPhone =
        document.getElementById(
            "stacklyPhone"
        );


    if (stacklyPhone) {

        stacklyPhone.addEventListener(
            "input",
            function () {

                /* Keep only digits */

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .slice(0, 10);


                removeStacklyFieldError(
                    this
                );

            }
        );

    }


    /* =========================================================
       NAME INPUT - ALPHABETIC ONLY
    ========================================================= */

    const stacklyName =
        document.getElementById(
            "stacklyName"
        );


    if (stacklyName) {

        stacklyName.addEventListener(
            "input",
            function () {

                /* Allow letters and spaces */

                this.value =
                    this.value.replace(
                        /[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g,
                        ""
                    );


                removeStacklyFieldError(
                    this
                );

            }
        );

    }


    /* =========================================================
       PREVENT MULTIPLE RAPID SUBMISSIONS
    ========================================================= */

    let stacklySubmitting =
        false;


    stacklyForm.addEventListener(
        "submit",
        function () {

            if (stacklySubmitting) {
                return;
            }


            stacklySubmitting =
                true;


            setTimeout(
                function () {

                    stacklySubmitting =
                        false;

                },
                4000
            );

        },
        true
    );

});


/* =========================================================
   STACKLY IT SOLUTIONS - FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(
        ".stackly-contact-faq-item"
    );

    if (!faqItems.length) {
        return;
    }


    faqItems.forEach(function (item) {

        const question = item.querySelector(
            ".stackly-contact-faq-question"
        );

        if (!question) {
            return;
        }


        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");


            /* CLOSE ALL FAQ ITEMS */

            faqItems.forEach(function (faqItem) {

                faqItem.classList.remove("active");

                const faqButton = faqItem.querySelector(
                    ".stackly-contact-faq-question"
                );

                if (faqButton) {
                    faqButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });


            /* OPEN SELECTED ITEM */

            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

});


/* =========================================================
   STACKLY IT SOLUTIONS - ADVANCED LOADER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       LOADER ELEMENTS
    ====================================================== */

    const stacklyLoader =
        document.getElementById("stacklyITLoader");

    const stacklyLoaderProgress =
        document.getElementById("stacklyITLoaderProgress");

    const stacklyLoaderPercent =
        document.getElementById("stacklyITLoaderPercent");

    const stacklyLoaderStatus =
        document.getElementById("stacklyITLoaderStatus");


    if (!stacklyLoader) {
        return;
    }


    /* =====================================================
       LOCK PAGE SCROLL
    ====================================================== */

    document.body.style.overflow = "hidden";


    /* =====================================================
       LOADING MESSAGES
    ====================================================== */

    const stacklyLoadingMessages = [

        {
            percent: 0,
            text: "Initializing digital experience"
        },

        {
            percent: 18,
            text: "Connecting technology systems"
        },

        {
            percent: 36,
            text: "Loading intelligent solutions"
        },

        {
            percent: 54,
            text: "Preparing digital architecture"
        },

        {
            percent: 72,
            text: "Optimizing user experience"
        },

        {
            percent: 88,
            text: "Finalizing Stackly environment"
        },

        {
            percent: 100,
            text: "Welcome to Stackly IT Solutions"
        }

    ];


    /* =====================================================
       LOADING STATE
    ====================================================== */

    let stacklyLoaderValue = 0;

    let stacklyLoaderFinished = false;


    /* =====================================================
       UPDATE LOADER
    ====================================================== */

    function updateStacklyLoader(value) {

        stacklyLoaderValue = value;

        if (stacklyLoaderProgress) {

            stacklyLoaderProgress.style.width =
                value + "%";

        }


        if (stacklyLoaderPercent) {

            stacklyLoaderPercent.textContent =
                Math.floor(value) + "%";

        }


        let currentMessage =
            stacklyLoadingMessages[0];


        stacklyLoadingMessages.forEach(
            function (item) {

                if (
                    value >= item.percent
                ) {

                    currentMessage = item;

                }

            }
        );


        if (stacklyLoaderStatus) {

            stacklyLoaderStatus.textContent =
                currentMessage.text;

        }

    }


    /* =====================================================
       LOADER ANIMATION
    ====================================================== */

    function runStacklyLoader() {

        const loadingSpeed =
            28;


        const loaderInterval =
            setInterval(
                function () {

                    /*
                     * Random progress amount
                     * creates a more natural loading feel.
                     */

                    let increment = 1;


                    if (
                        stacklyLoaderValue < 35
                    ) {

                        increment =
                            Math.random() * 2.2;

                    }
                    else if (
                        stacklyLoaderValue < 75
                    ) {

                        increment =
                            Math.random() * 1.5;

                    }
                    else {

                        increment =
                            Math.random() * .8;

                    }


                    stacklyLoaderValue +=
                        increment;


                    if (
                        stacklyLoaderValue >= 100
                    ) {

                        stacklyLoaderValue =
                            100;

                        updateStacklyLoader(100);

                        clearInterval(
                            loaderInterval
                        );


                        setTimeout(
                            finishStacklyLoader,
                            650
                        );


                        return;

                    }


                    updateStacklyLoader(
                        stacklyLoaderValue
                    );

                },
                loadingSpeed
            );

    }


    /* =====================================================
       FINISH LOADER
    ====================================================== */

    function finishStacklyLoader() {

        if (stacklyLoaderFinished) {
            return;
        }


        stacklyLoaderFinished = true;


        updateStacklyLoader(100);


        /* =================================================
           SUCCESS STATE
        ================================================== */

        stacklyLoader.classList.add(
            "stackly-it-loader-hidden"
        );


        /* =================================================
           UNLOCK PAGE
        ================================================== */

        setTimeout(
            function () {

                document.body.style.overflow = "";

                stacklyLoader.style.display =
                    "none";

            },
            1000
        );

    }


    /* =====================================================
       START LOADER
    ====================================================== */

    updateStacklyLoader(0);


    setTimeout(
        runStacklyLoader,
        200
    );


});