document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       AOS INITIALIZATION
    ====================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 900,

            easing: "ease-out-cubic",

            once: true,

            offset: 70

        });

    }



    /* =====================================================
       ELEMENTS
    ====================================================== */

    const loginTab =
        document.getElementById("stacklyLoginTab");

    const signupTab =
        document.getElementById("stacklySignupTab");

    const loginForm =
        document.getElementById("stacklyLoginForm");

    const signupForm =
        document.getElementById("stacklySignupForm");

    const slider =
        document.getElementById("stacklyAuthSlider");

    const authTitle =
        document.getElementById("stacklyAuthTitle");

    const authSubtitle =
        document.getElementById("stacklyAuthSubtitle");



    /* =====================================================
       STATUS ELEMENTS
    ====================================================== */

    const loginStatus =
        document.getElementById("stacklyLoginStatus");

    const signupStatus =
        document.getElementById("stacklySignupStatus");



    /* =====================================================
       STATUS HELPERS
    ====================================================== */

    function showError(statusElement, message) {

        if (!statusElement) return;

        statusElement.className =
            "stackly-auth-status error";

        statusElement.textContent =
            message;

    }



    function showSuccess(statusElement, message) {

        if (!statusElement) return;

        statusElement.className =
            "stackly-auth-status success";

        statusElement.textContent =
            message;

    }



    function clearStatus(statusElement) {

        if (!statusElement) return;

        statusElement.className =
            "stackly-auth-status";

        statusElement.textContent =
            "";

    }



    /* =====================================================
       SHOW LOGIN
    ====================================================== */

    function showLogin() {

        if (
            !loginTab ||
            !signupTab ||
            !loginForm ||
            !signupForm ||
            !slider
        ) {

            return;

        }


        loginTab.classList.add("active");

        signupTab.classList.remove("active");

        loginForm.classList.add("active");

        signupForm.classList.remove("active");

        slider.classList.remove("signup");


        if (authTitle) {

            authTitle.textContent =
                "Welcome Back";

        }


        if (authSubtitle) {

            authSubtitle.textContent =
                "Sign in to continue to your account.";

        }


        clearStatus(loginStatus);

        clearStatus(signupStatus);

    }



    /* =====================================================
       SHOW SIGNUP
    ====================================================== */

    function showSignup() {

        if (
            !loginTab ||
            !signupTab ||
            !loginForm ||
            !signupForm ||
            !slider
        ) {

            return;

        }


        signupTab.classList.add("active");

        loginTab.classList.remove("active");

        signupForm.classList.add("active");

        loginForm.classList.remove("active");

        slider.classList.add("signup");


        if (authTitle) {

            authTitle.textContent =
                "Create Your Account";

        }


        if (authSubtitle) {

            authSubtitle.textContent =
                "Join Stackly and start building something great.";

        }


        clearStatus(loginStatus);

        clearStatus(signupStatus);

    }



    /* =====================================================
       LOGIN TAB
    ====================================================== */

    if (loginTab) {

        loginTab.addEventListener(
            "click",
            function () {

                showLogin();

            }
        );

    }



    /* =====================================================
       SIGNUP TAB
    ====================================================== */

    if (signupTab) {

        signupTab.addEventListener(
            "click",
            function () {

                showSignup();

            }
        );

    }



    /* =====================================================
       LOGIN → SIGNUP
    ====================================================== */

    const loginToSignup =
        document.getElementById(
            "stacklyLoginToSignup"
        );


    if (loginToSignup) {

        loginToSignup.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showSignup();

            }
        );

    }



    /* =====================================================
       SIGNUP → LOGIN
    ====================================================== */

    const signupToLogin =
        document.getElementById(
            "stacklySignupToLogin"
        );


    if (signupToLogin) {

        signupToLogin.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showLogin();

            }
        );

    }



    /* =====================================================
       NAME INPUT
       ONLY ALPHABETS + SPACES
    ====================================================== */

    const signupName =
        document.getElementById(
            "stacklySignupName"
        );


    if (signupName) {

        signupName.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^A-Za-z\s]/g,
                        ""
                    );

            }
        );

    }



    /* =====================================================
       EMAIL VALIDATION
    ====================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        return emailPattern.test(email);

    }



    /* =====================================================
       PASSWORD VALIDATION
       MINIMUM 6 CHARACTERS
    ====================================================== */

    function isValidPassword(password) {

        return password.length >= 6;

    }



    /* =====================================================
       CREATE USER NAME FROM EMAIL
       
       john@gmail.com
       → John

       john.doe@gmail.com
       → John

       john-doe@gmail.com
       → John

       john_doe@gmail.com
       → John
    ====================================================== */

    function createUserNameFromEmail(email) {

        if (
            !email ||
            typeof email !== "string"
        ) {

            return "Stackly Admin";

        }


        let emailUsername =
            email
                .split("@")[0]
                .trim();


        if (!emailUsername) {

            return "Stackly Admin";

        }


        /*
           Take the first part before:
           .
           _
           -
           space
        */

        emailUsername =
            emailUsername
                .split(/[._\-\s]+/)[0]
                .trim();


        if (!emailUsername) {

            return "Stackly Admin";

        }


        /*
           Capitalize first letter
        */

        return (
            emailUsername.charAt(0).toUpperCase() +
            emailUsername.slice(1)
        );

    }



    /* =====================================================
       CUSTOM DROPDOWN
    ====================================================== */

    function setupDropdown(
        dropdownId,
        buttonId,
        selectedId,
        menuId,
        hiddenId
    ) {

        const dropdown =
            document.getElementById(dropdownId);

        const button =
            document.getElementById(buttonId);

        const selected =
            document.getElementById(selectedId);

        const menu =
            document.getElementById(menuId);

        const hidden =
            document.getElementById(hiddenId);


        if (
            !dropdown ||
            !button ||
            !selected ||
            !menu ||
            !hidden
        ) {

            return;

        }



        /* ---------------------------------------------
           OPEN / CLOSE
        ---------------------------------------------- */

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                document
                    .querySelectorAll(
                        ".stackly-auth-dropdown.open"
                    )
                    .forEach(
                        function (item) {

                            if (item !== dropdown) {

                                item.classList.remove(
                                    "open"
                                );

                            }

                        }
                    );


                dropdown.classList.toggle(
                    "open"
                );

            }
        );



        /* ---------------------------------------------
           OPTIONS
        ---------------------------------------------- */

        menu
            .querySelectorAll(
                ".stackly-auth-role-option"
            )
            .forEach(
                function (option) {

                    option.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();


                            const value =
                                option.dataset.value;


                            const strong =
                                option.querySelector(
                                    "strong"
                                );


                            hidden.value =
                                value;


                            selected.textContent =
                                strong
                                    ? strong.textContent
                                    : value;


                            dropdown.classList.remove(
                                "open"
                            );


                            clearStatus(
                                loginStatus
                            );


                            clearStatus(
                                signupStatus
                            );

                        }
                    );

                }
            );

    }



    /* =====================================================
       LOGIN ROLE DROPDOWN
    ====================================================== */

    setupDropdown(
        "stacklyLoginRoleDropdown",
        "stacklyLoginRoleButton",
        "stacklyLoginRoleSelected",
        "stacklyLoginRoleMenu",
        "stacklyLoginRole"
    );



    /* =====================================================
       SIGNUP ROLE DROPDOWN
    ====================================================== */

    setupDropdown(
        "stacklySignupRoleDropdown",
        "stacklySignupRoleButton",
        "stacklySignupRoleSelected",
        "stacklySignupRoleMenu",
        "stacklySignupRole"
    );



    /* =====================================================
       CLOSE DROPDOWN OUTSIDE CLICK
    ====================================================== */

    document.addEventListener(
        "click",
        function () {

            document
                .querySelectorAll(
                    ".stackly-auth-dropdown.open"
                )
                .forEach(
                    function (dropdown) {

                        dropdown.classList.remove(
                            "open"
                        );

                    }
                );

        }
    );



    /* =====================================================
       PASSWORD SHOW / HIDE
    ====================================================== */

    document
        .querySelectorAll(
            ".stackly-auth-eye"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const targetId =
                            button.dataset.target;


                        const input =
                            document.getElementById(
                                targetId
                            );


                        const icon =
                            button.querySelector(
                                "i"
                            );


                        if (!input) return;


                        if (
                            input.type ===
                            "password"
                        ) {

                            input.type =
                                "text";


                            if (icon) {

                                icon.classList.remove(
                                    "fa-eye"
                                );

                                icon.classList.add(
                                    "fa-eye-slash"
                                );

                            }


                            button.setAttribute(
                                "aria-label",
                                "Hide password"
                            );

                        }
                        else {

                            input.type =
                                "password";


                            if (icon) {

                                icon.classList.remove(
                                    "fa-eye-slash"
                                );

                                icon.classList.add(
                                    "fa-eye"
                                );

                            }


                            button.setAttribute(
                                "aria-label",
                                "Show password"
                            );

                        }

                    }
                );

            }
        );



    /* =====================================================
       LOGIN ELEMENTS
    ====================================================== */

    const loginEmail =
        document.getElementById(
            "stacklyLoginEmail"
        );

    const loginPassword =
        document.getElementById(
            "stacklyLoginPassword"
        );

    const loginRole =
        document.getElementById(
            "stacklyLoginRole"
        );

    const loginRoleSelected =
        document.getElementById(
            "stacklyLoginRoleSelected"
        );

    const rememberMe =
        document.getElementById(
            "stacklyRememberMe"
        );



    /* =====================================================
       LOAD REMEMBERED LOGIN
    ====================================================== */

    const rememberedEmail =
        localStorage.getItem(
            "stacklyRememberedEmail"
        );

    const rememberedRole =
        localStorage.getItem(
            "stacklyRememberedRole"
        );


    if (
        rememberedEmail &&
        loginEmail
    ) {

        loginEmail.value =
            rememberedEmail;

    }


    if (
        rememberedRole &&
        loginRole &&
        loginRoleSelected
    ) {

        loginRole.value =
            rememberedRole;


        loginRoleSelected.textContent =
            rememberedRole === "admin"
                ? "Admin"
                : "Client";

    }



    /* =====================================================
       SIGNUP FORM
       NOTE:
       Signup does NOT create login credentials.
       Signup data is not saved as an account.
    ====================================================== */

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();



                /* -----------------------------------------
                   GET SIGNUP ELEMENTS
                ------------------------------------------ */

                const roleElement =
                    document.getElementById(
                        "stacklySignupRole"
                    );

                const nameElement =
                    document.getElementById(
                        "stacklySignupName"
                    );

                const emailElement =
                    document.getElementById(
                        "stacklySignupEmail"
                    );

                const passwordElement =
                    document.getElementById(
                        "stacklySignupPassword"
                    );

                const confirmPasswordElement =
                    document.getElementById(
                        "stacklySignupConfirmPassword"
                    );

                const termsElement =
                    document.getElementById(
                        "stacklyTerms"
                    );



                /* -----------------------------------------
                   GET VALUES
                ------------------------------------------ */

                const role =
                    roleElement
                        ? roleElement.value
                        : "";


                const name =
                    nameElement
                        ? nameElement.value.trim()
                        : "";


                const email =
                    emailElement
                        ? emailElement.value
                            .trim()
                            .toLowerCase()
                        : "";


                const password =
                    passwordElement
                        ? passwordElement.value
                        : "";


                const confirmPassword =
                    confirmPasswordElement
                        ? confirmPasswordElement.value
                        : "";


                const terms =
                    termsElement
                        ? termsElement.checked
                        : false;


                clearStatus(
                    signupStatus
                );



                /* -----------------------------------------
                   ROLE
                ------------------------------------------ */

                if (!role) {

                    showError(
                        signupStatus,
                        "Please select Admin or Client."
                    );

                    return;

                }



                /* -----------------------------------------
                   NAME
                ------------------------------------------ */

                if (!name) {

                    showError(
                        signupStatus,
                        "Please enter your full name."
                    );

                    return;

                }


                const namePattern =
                    /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;


                if (
                    !namePattern.test(name)
                ) {

                    showError(
                        signupStatus,
                        "Name must contain alphabets and spaces only."
                    );

                    return;

                }



                /* -----------------------------------------
                   EMAIL
                ------------------------------------------ */

                if (!email) {

                    showError(
                        signupStatus,
                        "Please enter your email address."
                    );

                    return;

                }


                if (
                    !isValidEmail(email)
                ) {

                    showError(
                        signupStatus,
                        "Please enter a valid email address."
                    );

                    return;

                }



                /* -----------------------------------------
                   PASSWORD
                ------------------------------------------ */

                if (!password) {

                    showError(
                        signupStatus,
                        "Please create a password."
                    );

                    return;

                }


                if (
                    !isValidPassword(password)
                ) {

                    showError(
                        signupStatus,
                        "Password must contain at least 6 characters."
                    );

                    return;

                }



                /* -----------------------------------------
                   CONFIRM PASSWORD
                ------------------------------------------ */

                if (!confirmPassword) {

                    showError(
                        signupStatus,
                        "Please confirm your password."
                    );

                    return;

                }


                if (
                    password !==
                    confirmPassword
                ) {

                    showError(
                        signupStatus,
                        "Passwords do not match."
                    );

                    return;

                }



                /* -----------------------------------------
                   TERMS
                ------------------------------------------ */

                if (!terms) {

                    showError(
                        signupStatus,
                        "Please accept the Terms & Conditions and Privacy Policy."
                    );

                    return;

                }



                /* =================================================
                   SIGNUP SUCCESS
                ================================================== */

                showSuccess(
                    signupStatus,
                    "Signup completed successfully."
                );



                /* -----------------------------------------
                   MOVE TO LOGIN
                ------------------------------------------ */

                setTimeout(
                    function () {

                        showLogin();



                        /* -----------------------------
                           AUTO-FILL EMAIL
                        ------------------------------ */

                        if (loginEmail) {

                            loginEmail.value =
                                email;

                        }



                        /* -----------------------------
                           AUTO-SELECT ROLE
                        ------------------------------ */

                        if (loginRole) {

                            loginRole.value =
                                role;

                        }


                        if (loginRoleSelected) {

                            loginRoleSelected.textContent =
                                role === "admin"
                                    ? "Admin"
                                    : "Client";

                        }



                        /* -----------------------------
                           CLEAR LOGIN PASSWORD
                        ------------------------------ */

                        if (loginPassword) {

                            loginPassword.value =
                                "";

                            loginPassword.focus();

                        }



                        /* -----------------------------
                           CLEAR SIGNUP FORM
                        ------------------------------ */

                        if (nameElement) {

                            nameElement.value =
                                "";

                        }


                        if (emailElement) {

                            emailElement.value =
                                "";

                        }


                        if (passwordElement) {

                            passwordElement.value =
                                "";

                        }


                        if (confirmPasswordElement) {

                            confirmPasswordElement.value =
                                "";

                        }


                        if (termsElement) {

                            termsElement.checked =
                                false;

                        }



                        /* -----------------------------
                           LOGIN MESSAGE
                        ------------------------------ */

                        showSuccess(
                            loginStatus,
                            "Please enter your password to continue."
                        );

                    },
                    1000
                );

            }
        );

    }



    /* =====================================================
       LOGIN FORM
       DIRECT ROLE LOGIN
    ====================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearStatus(
                    loginStatus
                );



                /* -----------------------------------------
                   GET LOGIN VALUES
                ------------------------------------------ */

                const role =
                    loginRole
                        ? loginRole.value
                        : "";


                const email =
                    loginEmail
                        ? loginEmail.value
                            .trim()
                            .toLowerCase()
                        : "";


                const password =
                    loginPassword
                        ? loginPassword.value
                        : "";


                const isRemembered =
                    rememberMe
                        ? rememberMe.checked
                        : false;



                /* -----------------------------------------
                   ROLE REQUIRED
                ------------------------------------------ */

                if (!role) {

                    showError(
                        loginStatus,
                        "Please select your role."
                    );

                    return;

                }



                /* -----------------------------------------
                   EMAIL REQUIRED
                ------------------------------------------ */

                if (!email) {

                    showError(
                        loginStatus,
                        "Please enter your email address."
                    );

                    return;

                }



                /* -----------------------------------------
                   EMAIL FORMAT
                ------------------------------------------ */

                if (
                    !isValidEmail(email)
                ) {

                    showError(
                        loginStatus,
                        "Please enter a valid email address."
                    );

                    return;

                }



                /* -----------------------------------------
                   PASSWORD REQUIRED
                ------------------------------------------ */

                if (!password) {

                    showError(
                        loginStatus,
                        "Please enter your password."
                    );

                    return;

                }



                /* -----------------------------------------
                   PASSWORD FORMAT
                ------------------------------------------ */

                if (
                    !isValidPassword(password)
                ) {

                    showError(
                        loginStatus,
                        "Password must contain at least 6 characters."
                    );

                    return;

                }



                /* =================================================
                   ROLE BASED REDIRECT
                ================================================== */

                let redirectPage = "";


                if (role === "admin") {

                    redirectPage =
                        "admin.html";

                }
                else if (role === "client") {

                    redirectPage =
                        "client.html";

                }
                else {

                    showError(
                        loginStatus,
                        "Invalid login role."
                    );

                    return;

                }



                /* =================================================
                   CREATE USER NAME FROM EMAIL

                   john@gmail.com
                   → John

                   john.doe@gmail.com
                   → John
                ================================================== */

                const userName =
                    createUserNameFromEmail(
                        email
                    );



                /* =================================================
                   SAVE CURRENT USER
                ================================================== */

                const currentUser = {

                    name:
                        userName,

                    email:
                        email,

                    role:
                        role

                };


                localStorage.setItem(
                    "stacklyCurrentUser",
                    JSON.stringify(currentUser)
                );


                localStorage.setItem(
                    "stacklyCurrentEmail",
                    email
                );



                /* =================================================
                   REMEMBER ME
                ================================================== */

                if (isRemembered) {

                    localStorage.setItem(
                        "stacklyRememberedEmail",
                        email
                    );


                    localStorage.setItem(
                        "stacklyRememberedRole",
                        role
                    );

                }
                else {

                    localStorage.removeItem(
                        "stacklyRememberedEmail"
                    );


                    localStorage.removeItem(
                        "stacklyRememberedRole"
                    );

                }



                /* =================================================
                   SUCCESS MESSAGE
                ================================================== */

                showSuccess(
                    loginStatus,
                    "Login successful. Redirecting..."
                );



                /* =================================================
                   DISABLE LOGIN BUTTON
                ================================================== */

                const submitButton =
                    loginForm.querySelector(
                        ".stackly-auth-submit"
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.style.opacity =
                        "0.7";

                    submitButton.style.cursor =
                        "not-allowed";

                }



                /* =================================================
                   REDIRECT
                ================================================== */

                setTimeout(
                    function () {

                        window.location.href =
                            redirectPage;

                    },
                    500
                );

            }
        );

    }



    /* =====================================================
       INITIAL LOGIN VIEW
    ====================================================== */

    showLogin();



    /* =====================================================
       DEBUG / CHECK STORED LOGIN
    ====================================================== */

    console.log(
        "Stackly Login System Ready"
    );



    /* =====================================================
       DEBUG CURRENT USER
    ====================================================== */

    const storedCurrentUser =
        localStorage.getItem(
            "stacklyCurrentUser"
        );


    if (storedCurrentUser) {

        try {

            console.log(
                "Stackly Current User:",
                JSON.parse(storedCurrentUser)
            );

        }
        catch (error) {

            console.error(
                "Invalid Stackly Current User data.",
                error
            );

        }

    }


});