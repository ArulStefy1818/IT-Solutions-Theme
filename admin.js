/* =========================================================
   STACKLY IT SOLUTIONS - ADMIN DASHBOARD JAVASCRIPT
   Complete Dashboard JS
   ---------------------------------------------------------
   IMPORTANT:
   Login email is read from localStorage:

   stacklyCurrentUser
   {
       name: "Stackly Administrator",
       email: "user@example.com",
       role: "admin"
   }

   Backup:
   stacklyCurrentEmail
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       GET CURRENT LOGGED-IN USER
    ====================================================== */

    function getCurrentUser() {

        try {

            const storedUser =
                localStorage.getItem(
                    "stacklyCurrentUser"
                );


            if (storedUser) {

                const user =
                    JSON.parse(storedUser);


                if (
                    user &&
                    typeof user === "object"
                ) {

                    return user;

                }

            }

        }
        catch (error) {

            console.error(
                "Stackly: Unable to read current user.",
                error
            );

        }


        return null;
    }



    /* =====================================================
       GET LOGGED-IN EMAIL
    ====================================================== */

    function getLoggedInEmail() {

        const currentUser =
            getCurrentUser();


        /* ---------------------------------------------
           PRIMARY SOURCE
        ---------------------------------------------- */

        if (
            currentUser &&
            typeof currentUser.email === "string" &&
            currentUser.email.trim() !== ""
        ) {

            return currentUser.email
                .trim()
                .toLowerCase();

        }


        /* ---------------------------------------------
           BACKUP SOURCE
        ---------------------------------------------- */

        const savedEmail =
            localStorage.getItem(
                "stacklyCurrentEmail"
            );


        if (
            savedEmail &&
            savedEmail.trim() !== ""
        ) {

            return savedEmail
                .trim()
                .toLowerCase();

        }


        /* ---------------------------------------------
           NO EMAIL FOUND
        ---------------------------------------------- */

        return "";
    }



    /* =====================================================
       DISPLAY LOGIN EMAIL
    ====================================================== */

    function setAdminEmail() {

        const loggedInEmail =
            getLoggedInEmail();


        const emailElements =
            document.querySelectorAll(
                ".stackly-admin-email-content strong"
            );


        emailElements.forEach(function (element) {

            if (loggedInEmail) {

                element.textContent =
                    loggedInEmail;

            }
            else {

                element.textContent =
                    "No email found";

            }


            element.style.display =
                "block";

            element.style.visibility =
                "visible";

            element.style.opacity =
                "1";

            element.style.whiteSpace =
                "nowrap";

            element.style.overflow =
                "visible";

        });



        /* =================================================
           FALLBACK IF <strong> DOES NOT EXIST
        ================================================== */

        const emailContents =
            document.querySelectorAll(
                ".stackly-admin-email-content"
            );


        emailContents.forEach(function (content) {

            let strongElement =
                content.querySelector("strong");


            if (!strongElement) {

                strongElement =
                    document.createElement(
                        "strong"
                    );

                content.appendChild(
                    strongElement
                );

            }


            strongElement.textContent =
                loggedInEmail || "No email found";


            strongElement.style.display =
                "block";

            strongElement.style.visibility =
                "visible";

            strongElement.style.opacity =
                "1";

        });

    }



    /* =====================================================
       SET EMAIL IMMEDIATELY
    ====================================================== */

    setAdminEmail();



    /* =====================================================
       SET EMAIL AFTER RENDER
    ====================================================== */

    requestAnimationFrame(function () {

        setAdminEmail();

    });



    /* =====================================================
       ELEMENTS
    ====================================================== */

    const menuToggle =
        document.getElementById(
            "stacklyAdminMenuToggle"
        );


    const menuClose =
        document.getElementById(
            "stacklyAdminMenuClose"
        );


    const sidebar =
        document.getElementById(
            "stacklyAdminSidebar"
        );


    const overlay =
        document.getElementById(
            "stacklyAdminOverlay"
        );


    const body =
        document.body;



    /* =====================================================
       MOBILE SIDEBAR
    ====================================================== */

    function openAdminMenu() {

        if (!sidebar || !overlay) {
            return;
        }


        sidebar.classList.add(
            "active"
        );


        overlay.classList.add(
            "active"
        );


        body.classList.add(
            "menu-open"
        );


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }

    }



    function closeAdminMenu() {

        if (!sidebar || !overlay) {
            return;
        }


        sidebar.classList.remove(
            "active"
        );


        overlay.classList.remove(
            "active"
        );


        body.classList.remove(
            "menu-open"
        );


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    }



    function toggleAdminMenu() {

        if (!sidebar) {
            return;
        }


        if (
            sidebar.classList.contains(
                "active"
            )
        ) {

            closeAdminMenu();

        }
        else {

            openAdminMenu();

        }

    }



    /* =====================================================
       HAMBURGER BUTTON
    ====================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                toggleAdminMenu();

            }
        );

    }



    /* =====================================================
       CLOSE BUTTON
    ====================================================== */

    if (menuClose) {

        menuClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeAdminMenu();

            }
        );

    }



    /* =====================================================
       OVERLAY CLICK
    ====================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeAdminMenu();

            }
        );

    }



    /* =====================================================
       CLOSE MENU WHEN NAV LINK IS CLICKED
    ====================================================== */

    const navigationLinks =
        document.querySelectorAll(
            ".stackly-admin-nav-link"
        );


    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 991
                ) {

                    closeAdminMenu();

                }

            }
        );

    });



    /* =====================================================
       ESC KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeAdminMenu();

            }

        }
    );



    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >= 992
            ) {

                closeAdminMenu();

            }


            /* Keep actual login email visible */

            setAdminEmail();

        }
    );



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    navigationLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute(
                "href"
            );


        if (!linkPage) {
            return;
        }


        const cleanLink =
            linkPage
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        link.classList.remove(
            "active"
        );


        if (
            cleanLink === currentPage ||
            (
                currentPage === "" &&
                cleanLink === "admin.html"
            )
        ) {

            link.classList.add(
                "active"
            );

        }

    });



    /* =====================================================
       NOTIFICATION
    ====================================================== */

    const notification =
        document.querySelector(
            ".stackly-admin-notification"
        );


    if (notification) {

        notification.addEventListener(
            "click",
            function () {

                notification.classList.toggle(
                    "active"
                );

            }
        );

    }



    /* =====================================================
       EMAIL BOX CLICK
    ====================================================== */

    const emailBox =
        document.querySelector(
            ".stackly-admin-email-box"
        );


    if (emailBox) {

        emailBox.addEventListener(
            "click",
            function () {

                emailBox.classList.toggle(
                    "active"
                );

            }
        );

    }



    /* =====================================================
       AOS INITIALIZATION
    ====================================================== */

    if (
        typeof AOS !== "undefined"
    ) {

        AOS.init({

            duration: 900,

            easing:
                "ease-out-cubic",

            once: true,

            mirror: false,

            offset: 80,

            anchorPlacement:
                "top-bottom"

        });

    }



    /* =====================================================
       REFRESH AOS AFTER PAGE LOAD
    ====================================================== */

    window.addEventListener(
        "load",
        function () {

            /* Display actual login email */

            setAdminEmail();


            if (
                typeof AOS !== "undefined"
            ) {

                AOS.refresh();

            }

        }
    );



    /* =====================================================
       PROGRESS BAR ANIMATION
    ====================================================== */

    const progressBars =
        document.querySelectorAll(
            ".stackly-admin-progress-bar span"
        );


    progressBars.forEach(function (bar) {

        const targetWidth =
            bar.style.width;


        bar.style.width =
            "0";


        setTimeout(
            function () {

                bar.style.width =
                    targetWidth;

            },
            500
        );

    });



    /* =====================================================
       STAT NUMBER ANIMATION
    ====================================================== */

    const statNumbers =
        document.querySelectorAll(
            ".stackly-admin-stat-card h3"
        );


    statNumbers.forEach(function (element) {

        const originalText =
            element.textContent.trim();


        /*
           Only animate pure numbers.
           Values such as ₹8.42L remain unchanged.
        */

        const numberMatch =
            originalText.match(
                /^[\d,]+$/
            );


        if (!numberMatch) {
            return;
        }


        const target =
            parseInt(
                originalText.replace(
                    /,/g,
                    ""
                ),
                10
            );


        if (isNaN(target)) {
            return;
        }


        let current = 0;

        const duration = 1200;

        const startTime =
            performance.now();


        function animateNumber(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const ease =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            current =
                Math.floor(
                    target * ease
                );


            element.textContent =
                current.toLocaleString(
                    "en-IN"
                );


            if (progress < 1) {

                requestAnimationFrame(
                    animateNumber
                );

            }
            else {

                element.textContent =
                    target.toLocaleString(
                        "en-IN"
                    );

            }

        }


        requestAnimationFrame(
            animateNumber
        );

    });



    /* =====================================================
       QUICK CARD TOUCH / HOVER SUPPORT
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".stackly-admin-stat-card, " +
            ".stackly-admin-quick-card, " +
            ".stackly-admin-project-item"
        );


    cards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                card.classList.add(
                    "is-hovered"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.classList.remove(
                    "is-hovered"
                );

            }
        );

    });



    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }
        );

    });



    /* =====================================================
       LOGOUT CONFIRMATION
    ====================================================== */

    const logout =
        document.getElementById(
            "stacklyAdminLogout"
        );


    if (logout) {

        logout.addEventListener(
            "click",
            function (event) {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmed) {

                    event.preventDefault();

                    return;

                }


                /*
                   Clear current login information
                   when the administrator logs out.
                */

                localStorage.removeItem(
                    "stacklyCurrentUser"
                );


                localStorage.removeItem(
                    "stacklyCurrentEmail"
                );

            }
        );

    }



    /* =====================================================
       BODY READY STATE
    ====================================================== */

    body.classList.add(
        "stackly-admin-ready"
    );



    /* =====================================================
       FINAL EMAIL CHECK
       Uses LOCALSTORAGE email.
       NEVER hardcodes admin@stackly.com.
    ====================================================== */

    setTimeout(
        function () {

            setAdminEmail();

        },
        300
    );


    setTimeout(
        function () {

            setAdminEmail();

        },
        1000
    );



    /* =====================================================
       OPTIONAL DEBUG INFORMATION
       Check browser console after login.
    ====================================================== */

    const currentUser =
        getCurrentUser();


    console.log(
        "Stackly Current User:",
        currentUser
    );


    console.log(
        "Stackly Current Email:",
        getLoggedInEmail()
    );

});

const currentUser =
    JSON.parse(
        localStorage.getItem("stacklyCurrentUser")
    );

if (currentUser && currentUser.name) {

    document.getElementById(
        "stacklyAdminUserName"
    ).textContent =
        currentUser.name;

}