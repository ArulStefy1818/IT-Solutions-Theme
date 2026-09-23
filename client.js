/* =========================================================
   STACKLY CLIENT DASHBOARD JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       AOS INITIALIZATION
    ====================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 1000,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            mirror: false,
            anchorPlacement: "top-bottom"
        });

    }


    /* =====================================================
       LOAD LOGGED-IN USER
    ====================================================== */

    const storedUser =
        localStorage.getItem("stacklyCurrentUser");

    const storedEmail =
        localStorage.getItem("stacklyCurrentEmail");


    let currentUser = null;

    let clientName =
        "Client Account";

    let clientEmail =
        "No email available";


    /* =====================================================
       READ CURRENT USER
    ====================================================== */

    if (storedUser) {

        try {

            currentUser =
                JSON.parse(storedUser);

            if (
                currentUser &&
                currentUser.name
            ) {

                clientName =
                    currentUser.name;
            }

            if (
                currentUser &&
                currentUser.email
            ) {

                clientEmail =
                    currentUser.email;
            }

        }
        catch (error) {

            console.error(
                "Stackly: Unable to read current user.",
                error
            );

            currentUser = null;
        }

    }


    /* =====================================================
       EMAIL FALLBACK
    ====================================================== */

    if (
        clientEmail === "No email available" &&
        storedEmail
    ) {

        clientEmail =
            storedEmail;
    }


    /* =====================================================
       CREATE USER NAME FROM EMAIL
    ====================================================== */

    function createUserNameFromEmail(email) {

        if (
            !email ||
            typeof email !== "string"
        ) {

            return "Client Account";
        }


        let emailUsername =
            email
                .split("@")[0]
                .trim();


        if (!emailUsername) {

            return "Client Account";
        }


        /*
         * Only take the first word.
         *
         * john@gmail.com
         * → John
         *
         * john.doe@gmail.com
         * → John
         *
         * john-doe@gmail.com
         * → John
         *
         * john_doe@gmail.com
         * → John
         */

        emailUsername =
            emailUsername
                .split(/[._\-\s]+/)[0]
                .trim();


        if (!emailUsername) {

            return "Client Account";
        }


        return (
            emailUsername.charAt(0).toUpperCase() +
            emailUsername.slice(1)
        );
    }


    /* =====================================================
       USERNAME FALLBACK
    ====================================================== */

    if (
        clientName === "Client Account" &&
        clientEmail !== "No email available"
    ) {

        clientName =
            createUserNameFromEmail(
                clientEmail
            );
    }


    /* =====================================================
       HEADER CLIENT NAME
    ====================================================== */

    const headerClientName =
        document.getElementById(
            "stacklyClientName"
        );

    if (headerClientName) {

        headerClientName.textContent =
            clientName;
    }


    /* =====================================================
       HEADER CLIENT EMAIL
    ====================================================== */

    const headerClientEmail =
        document.getElementById(
            "stacklyClientEmail"
        );

    if (headerClientEmail) {

        headerClientEmail.textContent =
            clientEmail;
    }


    /* =====================================================
       ACCOUNT CLIENT NAME
    ====================================================== */

    const accountClientName =
        document.getElementById(
            "stacklyAccountName"
        );

    if (accountClientName) {

        accountClientName.textContent =
            clientName;
    }


    /* =====================================================
       ACCOUNT CLIENT EMAIL
    ====================================================== */

    const accountClientEmail =
        document.getElementById(
            "stacklyAccountEmail"
        );

    if (accountClientEmail) {

        accountClientEmail.textContent =
            clientEmail;
    }


    /* =====================================================
       DEBUG LOGIN INFORMATION
    ====================================================== */

    console.log(
        "Stackly Client Name:",
        clientName
    );

    console.log(
        "Stackly Client Email:",
        clientEmail
    );


    /* =====================================================
       MOBILE SIDEBAR ELEMENTS
    ====================================================== */

    const sidebar =
        document.getElementById(
            "stacklyAdminSidebar"
        );

    const overlay =
        document.getElementById(
            "stacklyAdminOverlay"
        );

    const openButton =
        document.getElementById(
            "stacklyAdminOpen"
        );

    const closeButton =
        document.getElementById(
            "stacklyAdminClose"
        );


    /* =====================================================
       OPEN SIDEBAR
    ====================================================== */

    function openSidebar() {

        if (sidebar) {

            sidebar.classList.add(
                "active"
            );
        }

        if (overlay) {

            overlay.classList.add(
                "active"
            );
        }

        document.body.classList.add(
            "stackly-menu-open"
        );
    }


    /* =====================================================
       CLOSE SIDEBAR
    ====================================================== */

    function closeSidebar() {

        if (sidebar) {

            sidebar.classList.remove(
                "active"
            );
        }

        if (overlay) {

            overlay.classList.remove(
                "active"
            );
        }

        document.body.classList.remove(
            "stackly-menu-open"
        );
    }


    /* =====================================================
       OPEN BUTTON
    ====================================================== */

    if (openButton) {

        openButton.addEventListener(
            "click",
            openSidebar
        );
    }


    /* =====================================================
       CLOSE BUTTON
    ====================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeSidebar
        );
    }


    /* =====================================================
       OVERLAY CLICK
    ====================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );
    }


    /* =====================================================
       MOBILE NAV LINKS
    ====================================================== */

    document
        .querySelectorAll(
            ".stackly-admin-nav-link"
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeSidebar
            );

        });


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeSidebar();
            }

        }
    );


    /* =========================================================
       STACKLY CLIENT INVOICE FILTER
       ALL / PAID / PENDING
    ========================================================= */

    const invoiceBoard =
        document.getElementById(
            "stacklyInvoiceList"
        );


    if (invoiceBoard) {

        const filterButtons =
            invoiceBoard.querySelectorAll(
                ".stackly-invoice-filter button"
            );

        const invoiceRows =
            invoiceBoard.querySelectorAll(
                ".stackly-invoice-row"
            );


        /* =================================================
           FILTER INVOICES
        ================================================== */

        filterButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const selectedFilter =
                            button.textContent
                                .trim()
                                .toLowerCase();


                        /* Remove active */

                        filterButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "stackly-invoice-filter-active"
                                );

                            }
                        );


                        /* Add active */

                        button.classList.add(
                            "stackly-invoice-filter-active"
                        );


                        /* Filter rows */

                        invoiceRows.forEach(
                            function (row, index) {

                                const statusElement =
                                    row.querySelector(
                                        ".stackly-invoice-status"
                                    );


                                if (!statusElement) {
                                    return;
                                }


                                const invoiceStatus =
                                    statusElement.textContent
                                        .trim()
                                        .toLowerCase();


                                let shouldShow =
                                    true;


                                /* ALL */

                                if (
                                    selectedFilter ===
                                    "all"
                                ) {

                                    shouldShow =
                                        true;
                                }


                                /* PAID */

                                else if (
                                    selectedFilter ===
                                    "paid"
                                ) {

                                    shouldShow =
                                        invoiceStatus ===
                                        "paid";
                                }


                                /* PENDING */

                                else if (
                                    selectedFilter ===
                                    "pending"
                                ) {

                                    shouldShow =
                                        invoiceStatus ===
                                        "pending";
                                }


                                /* SHOW */

                                if (shouldShow) {

                                    row.style.display =
                                        "grid";

                                    row.style.opacity =
                                        "0";

                                    row.style.transform =
                                        "translateY(12px)";


                                    setTimeout(
                                        function () {

                                            row.style.transition =
                                                "opacity .35s ease, transform .35s ease";

                                            row.style.opacity =
                                                "1";

                                            row.style.transform =
                                                "translateY(0)";

                                        },
                                        index * 45
                                    );

                                }


                                /* HIDE */

                                else {

                                    row.style.transition =
                                        "opacity .25s ease, transform .25s ease";

                                    row.style.opacity =
                                        "0";

                                    row.style.transform =
                                        "translateY(-8px)";


                                    setTimeout(
                                        function () {

                                            row.style.display =
                                                "none";

                                        },
                                        250
                                    );
                                }

                            }
                        );

                    }
                );

            }
        );


        /* =================================================
           INVOICE VIEW BUTTON EFFECT
        ================================================== */

        const viewButtons =
            invoiceBoard.querySelectorAll(
                ".stackly-invoice-view"
            );


        viewButtons.forEach(
            function (button) {

                button.addEventListener(
                    "mouseenter",
                    function () {

                        const icon =
                            button.querySelector("i");


                        if (icon) {

                            icon.style.transform =
                                "translateX(5px)";
                        }

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    function () {

                        const icon =
                            button.querySelector("i");


                        if (icon) {

                            icon.style.transform =
                                "translateX(0)";
                        }

                    }
                );

            }
        );


        /* =================================================
           INVOICE ROW CLICK HIGHLIGHT
        ================================================== */

        invoiceRows.forEach(
            function (row) {

                row.addEventListener(
                    "click",
                    function (event) {

                        if (
                            event.target.closest(
                                ".stackly-invoice-view"
                            )
                        ) {

                            return;
                        }


                        invoiceRows.forEach(
                            function (item) {

                                item.classList.remove(
                                    "stackly-invoice-row-selected"
                                );

                            }
                        );


                        row.classList.add(
                            "stackly-invoice-row-selected"
                        );

                    }
                );

            }
        );


        /* =================================================
           INVOICE TABLE ENTRANCE ANIMATION
        ================================================== */

        invoiceRows.forEach(
            function (row, index) {

                row.style.opacity =
                    "0";

                row.style.transform =
                    "translateY(15px)";


                setTimeout(
                    function () {

                        row.style.transition =
                            "opacity .5s ease, transform .5s ease";

                        row.style.opacity =
                            "1";

                        row.style.transform =
                            "translateY(0)";

                    },
                    150 + (index * 100)
                );

            }
        );

    }


    /* =========================================================
       STACKLY CLIENT PROFILE SETTINGS
    ========================================================= */


    const displayNameInput =
        document.getElementById(
            "stacklySettingsDisplayName"
        );

    const emailInput =
        document.getElementById(
            "stacklySettingsEmail"
        );

    const companyInput =
        document.getElementById(
            "stacklySettingsCompany"
        );

    const userNameHeading =
        document.getElementById(
            "stacklySettingsUserName"
        );

    const saveButton =
        document.querySelector(
            ".stackly-settings-save-btn"
        );

    const cancelButton =
        document.querySelector(
            ".stackly-settings-reset-btn"
        );


    /* =====================================================
       LOAD PROFILE DATA
    ====================================================== */

    if (
        displayNameInput ||
        emailInput ||
        companyInput ||
        userNameHeading
    ) {


        /* =================================================
           GET CURRENT USER
        ================================================== */

        let profileUser =
            null;


        const profileStoredUser =
            localStorage.getItem(
                "stacklyCurrentUser"
            );


        const profileStoredEmail =
            localStorage.getItem(
                "stacklyCurrentEmail"
            );


        if (profileStoredUser) {

            try {

                profileUser =
                    JSON.parse(
                        profileStoredUser
                    );

            }
            catch (error) {

                console.error(
                    "Stackly: Profile user data could not be loaded.",
                    error
                );

                profileUser =
                    null;
            }
        }


        /* =================================================
           DETERMINE EMAIL
        ================================================== */

        let profileEmail =
            "";


        if (
            profileUser &&
            profileUser.email
        ) {

            profileEmail =
                profileUser.email;

        }
        else if (
            profileStoredEmail
        ) {

            profileEmail =
                profileStoredEmail;
        }


        /* =================================================
           DETERMINE NAME
        ================================================== */

        let profileName =
            "";


        if (
            profileUser &&
            profileUser.name
        ) {

            profileName =
                profileUser.name;

        }
        else if (profileEmail) {

            profileName =
                createUserNameFromEmail(
                    profileEmail
                );

        }
        else {

            profileName =
                "Client Account";
        }


        /* =================================================
           DISPLAY NAME
        ================================================== */

        if (displayNameInput) {

            displayNameInput.value =
                profileName;
        }


        /* =================================================
           DISPLAY EMAIL
        ================================================== */

        if (emailInput) {

            emailInput.value =
                profileEmail;
        }


        /* =================================================
           PROFILE CARD NAME
        ================================================== */

        if (userNameHeading) {

            userNameHeading.textContent =
                profileName;
        }


        /* =================================================
           LOAD SAVED COMPANY
        ================================================== */

        const savedCompany =
            localStorage.getItem(
                "stacklyClientCompany"
            );


        if (
            companyInput &&
            savedCompany
        ) {

            companyInput.value =
                savedCompany;
        }


        /* =================================================
           AVATAR
        ================================================== */

        const profileAvatar =
            document.querySelector(
                ".stackly-profile-avatar"
            );


        if (
            profileAvatar &&
            profileName
        ) {

            const oldUserIcon =
                profileAvatar.querySelector(
                    ".fa-user"
                );


            if (oldUserIcon) {

                oldUserIcon.style.display =
                    "none";
            }


            let avatarInitial =
                profileAvatar.querySelector(
                    ".stackly-profile-user-initial"
                );


            if (!avatarInitial) {

                avatarInitial =
                    document.createElement(
                        "span"
                    );


                avatarInitial.className =
                    "stackly-profile-user-initial";


                profileAvatar.insertBefore(
                    avatarInitial,
                    profileAvatar.firstChild
                );
            }


            avatarInitial.textContent =
                profileName
                    .charAt(0)
                    .toUpperCase();
        }


        /* =================================================
           ORIGINAL VALUES
        ================================================== */

        let originalName =
            displayNameInput
                ? displayNameInput.value
                : profileName;


        let originalEmail =
            emailInput
                ? emailInput.value
                : profileEmail;


        let originalCompany =
            companyInput
                ? companyInput.value
                : "";


        /* =================================================
           SAVE PROFILE
        ================================================== */

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                function () {


                    const newName =
                        displayNameInput
                            ? displayNameInput.value.trim()
                            : "";


                    const newEmail =
                        emailInput
                            ? emailInput.value.trim()
                            : "";


                    const newCompany =
                        companyInput
                            ? companyInput.value.trim()
                            : "";


                    /* =====================================
                       NAME VALIDATION
                    ====================================== */

                    if (!newName) {

                        showProfileMessage(
                            "Please enter your display name.",
                            "error"
                        );


                        if (displayNameInput) {

                            displayNameInput.focus();
                        }


                        return;
                    }


                    if (
                        newName.length <
                        2
                    ) {

                        showProfileMessage(
                            "Display name must contain at least 2 characters.",
                            "error"
                        );


                        if (displayNameInput) {

                            displayNameInput.focus();
                        }


                        return;
                    }


                    /* =====================================
                       EMAIL VALIDATION
                    ====================================== */

                    if (!newEmail) {

                        showProfileMessage(
                            "Please enter your email address.",
                            "error"
                        );


                        if (emailInput) {

                            emailInput.focus();
                        }


                        return;
                    }


                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailPattern.test(
                            newEmail
                        )
                    ) {

                        showProfileMessage(
                            "Please enter a valid email address.",
                            "error"
                        );


                        if (emailInput) {

                            emailInput.focus();
                        }


                        return;
                    }


                    /* =====================================
                       CREATE UPDATED USER
                    ====================================== */

                    const updatedUser = {

                        name:
                            newName,

                        email:
                            newEmail,

                        role:
                            profileUser &&
                            profileUser.role
                                ? profileUser.role
                                : "Client"

                    };


                    /* =====================================
                       SAVE USER OBJECT
                    ====================================== */

                    localStorage.setItem(
                        "stacklyCurrentUser",
                        JSON.stringify(
                            updatedUser
                        )
                    );


                    /* =====================================
                       SAVE EMAIL
                    ====================================== */

                    localStorage.setItem(
                        "stacklyCurrentEmail",
                        newEmail
                    );


                    /* =====================================
                       SAVE COMPANY
                    ====================================== */

                    if (newCompany) {

                        localStorage.setItem(
                            "stacklyClientCompany",
                            newCompany
                        );

                    }
                    else {

                        localStorage.removeItem(
                            "stacklyClientCompany"
                        );
                    }


                    /* =====================================
                       UPDATE HEADER NAME
                    ====================================== */

                    const updatedHeaderName =
                        document.getElementById(
                            "stacklyClientName"
                        );


                    if (updatedHeaderName) {

                        updatedHeaderName.textContent =
                            newName;
                    }


                    /* =====================================
                       UPDATE HEADER EMAIL
                    ====================================== */

                    const updatedHeaderEmail =
                        document.getElementById(
                            "stacklyClientEmail"
                        );


                    if (updatedHeaderEmail) {

                        updatedHeaderEmail.textContent =
                            newEmail;
                    }


                    /* =====================================
                       UPDATE ACCOUNT NAME
                    ====================================== */

                    const updatedAccountName =
                        document.getElementById(
                            "stacklyAccountName"
                        );


                    if (updatedAccountName) {

                        updatedAccountName.textContent =
                            newName;
                    }


                    /* =====================================
                       UPDATE ACCOUNT EMAIL
                    ====================================== */

                    const updatedAccountEmail =
                        document.getElementById(
                            "stacklyAccountEmail"
                        );


                    if (updatedAccountEmail) {

                        updatedAccountEmail.textContent =
                            newEmail;
                    }


                    /* =====================================
                       UPDATE PROFILE CARD
                    ====================================== */

                    if (userNameHeading) {

                        userNameHeading.textContent =
                            newName;
                    }


                    /* =====================================
                       UPDATE AVATAR
                    ====================================== */

                    const avatarInitial =
                        document.querySelector(
                            ".stackly-profile-user-initial"
                        );


                    if (avatarInitial) {

                        avatarInitial.textContent =
                            newName
                                .charAt(0)
                                .toUpperCase();
                    }


                    /* =====================================
                       UPDATE ORIGINAL VALUES
                    ====================================== */

                    originalName =
                        newName;

                    originalEmail =
                        newEmail;

                    originalCompany =
                        newCompany;

                    profileUser =
                        updatedUser;


                    /* =====================================
                       SAVE BUTTON ANIMATION
                    ====================================== */

                    const oldButtonHTML =
                        saveButton.innerHTML;


                    saveButton.innerHTML = `
                        <i class="fa-solid fa-circle-check"></i>
                        Profile Saved
                    `;


                    saveButton.classList.add(
                        "stackly-profile-saved"
                    );


                    saveButton.disabled =
                        true;


                    /* =====================================
                       SUCCESS MESSAGE
                    ====================================== */

                    showProfileMessage(
                        "Profile updated successfully.",
                        "success"
                    );


                    /* =====================================
                       RESTORE BUTTON
                    ====================================== */

                    setTimeout(
                        function () {

                            saveButton.innerHTML =
                                oldButtonHTML;

                            saveButton.classList.remove(
                                "stackly-profile-saved"
                            );

                            saveButton.disabled =
                                false;

                        },
                        2200
                    );

                }
            );

        }


        /* =================================================
           CANCEL / RESET
        ================================================== */

        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                function () {


                    if (displayNameInput) {

                        displayNameInput.value =
                            originalName;
                    }


                    if (emailInput) {

                        emailInput.value =
                            originalEmail;
                    }


                    if (companyInput) {

                        companyInput.value =
                            originalCompany;
                    }


                    if (userNameHeading) {

                        userNameHeading.textContent =
                            originalName;
                    }


                    /* Update avatar */

                    const avatarInitial =
                        document.querySelector(
                            ".stackly-profile-user-initial"
                        );


                    if (avatarInitial) {

                        avatarInitial.textContent =
                            originalName
                                .charAt(0)
                                .toUpperCase();
                    }


                    showProfileMessage(
                        "Your changes have been cancelled.",
                        "info"
                    );

                }
            );

        }

    }


    /* =========================================================
       PROFILE MESSAGE FUNCTION
    ========================================================= */

    function showProfileMessage(
        message,
        type
    ) {


        let messageBox =
            document.getElementById(
                "stacklyProfileMessage"
            );


        /* =================================================
           CREATE MESSAGE BOX
        ================================================== */

        if (!messageBox) {

            messageBox =
                document.createElement(
                    "div"
                );


            messageBox.id =
                "stacklyProfileMessage";


            messageBox.className =
                "stackly-profile-message";


            const actions =
                document.querySelector(
                    ".stackly-settings-form-actions"
                );


            if (actions) {

                actions.insertAdjacentElement(
                    "afterend",
                    messageBox
                );
            }

        }


        /* =================================================
           ICON
        ================================================== */

        let icon =
            "fa-circle-info";


        if (
            type === "success"
        ) {

            icon =
                "fa-circle-check";

        }
        else if (
            type === "error"
        ) {

            icon =
                "fa-circle-exclamation";
        }


        /* =================================================
           RESET CLASSES
        ================================================== */

        messageBox.className =
            "stackly-profile-message";


        messageBox.classList.add(
            "stackly-profile-message-" +
            type
        );


        /* =================================================
           MESSAGE HTML
        ================================================== */

        messageBox.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;


        /* =================================================
           SHOW
        ================================================== */

        requestAnimationFrame(
            function () {

                messageBox.classList.add(
                    "stackly-profile-message-show"
                );

            }
        );


        /* =================================================
           AUTO HIDE
        ================================================== */

        clearTimeout(
            messageBox.hideTimer
        );


        messageBox.hideTimer =
            setTimeout(
                function () {

                    messageBox.classList.remove(
                        "stackly-profile-message-show"
                    );

                },
                3500
            );

    }


});