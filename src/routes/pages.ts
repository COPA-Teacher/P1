import Router from "express";

const pagesRouter = Router();

/* Unauthenticated Routes */
pagesRouter.get("/", (req, res) => {
    res.status(200).render("pages/index", {
        pageTitle: "Home",
        isAuthenticated: false,
        currentPage: "home",
    });
});

pagesRouter.get("/health", (req, res) => {
    res.status(200).render("health", {
        pageTitle: "Health Check",
        isAuthenticated: false,
        currentPage: "health",
    });
});

pagesRouter.get("/register", (req, res) => {
    res.status(200).render("pages/register", {
        pageTitle: "Register",
        isAuthenticated: false,
        currentPage: "register",
    });
});

pagesRouter.get("/login", (req, res) => {
    res.status(200).render("pages/login", {
        pageTitle: "Login",
        isAuthenticated: false,
        currentPage: "login",
    });
});

pagesRouter.get("/forgot-password", (req, res) => {
    res.status(200).render("pages/forgot-password", {
        pageTitle: "Forgot Password",
        isAuthenticated: false,
        currentPage: "forgot-password",
    });
});

pagesRouter.get("/reset-password", (req, res) => {
    res.status(200).render("pages/reset-password", {
        pageTitle: "Reset Password",
        isAuthenticated: false,
        currentPage: "reset-password",
    });
});

pagesRouter.get("/about-us", (req, res) => {
    res.status(200).render("pages/about-us", {
        pageTitle: "About",
        isAuthenticated: false,
        currentPage: "about",
    });
});

pagesRouter.get("/contact-us", (req, res) => {
    res.status(200).render("pages/contact-us", {
        pageTitle: "Contact",
        isAuthenticated: false,
        currentPage: "contact",
    });
});

pagesRouter.get("/privacy-policy", (req, res) => {
    res.status(200).render("pages/privacy-policy", {
        pageTitle: "Privacy Policy",
        isAuthenticated: false,
        currentPage: "privacy-policy",
    });
});

pagesRouter.get("/terms-and-conditions", (req, res) => {
    res.status(200).render("pages/terms-and-conditions", {
        pageTitle: "Terms and Conditions",
        isAuthenticated: false,
        currentPage: "terms-and-conditions",
    });
});

pagesRouter.get("/faq", (req, res) => {
    res.status(200).render("pages/faq", {
        pageTitle: "FAQ",
        isAuthenticated: false,
        currentPage: "faq",
    });
});

pagesRouter.get("/help", (req, res) => {
    res.status(200).render("pages/help", {
        pageTitle: "Help",
        isAuthenticated: false,
        currentPage: "help",
    });
});

///* Authenticated Routes */
pagesRouter.get("/dashboard", (req, res) => {
    res.status(200).render("protected/dashboard", {
        pageTitle: "Dashboard",
        isAuthenticated: true,
        currentPage: "dashboard",
    });
});

pagesRouter.get("/profile", (req, res) => {
    res.status(200).render("protected/profile", {
        pageTitle: "Profile",
        isAuthenticated: true,
        currentPage: "profile",
    });
});

pagesRouter.get("/settings", (req, res) => {
    res.status(200).render("protected/settings", {
        pageTitle: "Settings",
        isAuthenticated: true,
        currentPage: "settings",
    });
});

export default pagesRouter;
