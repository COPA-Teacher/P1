import { Router, Request, Response } from "express";
import {
    PageRouteTemplateData,
    DashboardTemplateData,
} from "../types/templates.js";

const pagesRouter = Router();

/* Unauthenticated Routes */
pagesRouter.get("/", (req: Request, res: Response) => {
    const templateData: PageRouteTemplateData = {
        pageTitle: "Home",
        isAuthenticated: false,
        currentPage: "home",
    };

    res.status(200).render("pages/index", templateData);
});

pagesRouter.get("/health", (req: Request, res: Response) => {
    const templateData: PageRouteTemplateData = {
        pageTitle: "Health Check",
        isAuthenticated: false,
        currentPage: "health",
    };

    res.status(200).render("health", templateData);
});

pagesRouter.get("/register", (req: Request, res: Response) => {
    const templateData: PageRouteTemplateData = {
        pageTitle: "Register",
        isAuthenticated: false,
        currentPage: "register",
    };

    res.status(200).render("pages/register", templateData);
});

pagesRouter.get("/login", (req: Request, res: Response) => {
    const templateData: PageRouteTemplateData = {
        pageTitle: "Login",
        isAuthenticated: false,
        currentPage: "login",
    };

    res.status(200).render("pages/login", templateData);
});

pagesRouter.get("/forgot-password", (req: Request, res: Response) => {
    res.status(200).render("pages/forgot-password", {
        pageTitle: "Forgot Password",
        isAuthenticated: false,
        currentPage: "forgot-password",
    });
});

pagesRouter.get("/reset-password", (req: Request, res: Response) => {
    res.status(200).render("pages/reset-password", {
        pageTitle: "Reset Password",
        isAuthenticated: false,
        currentPage: "reset-password",
    });
});

pagesRouter.get("/about-us", (req: Request, res: Response) => {
    res.status(200).render("pages/about-us", {
        pageTitle: "About",
        isAuthenticated: false,
        currentPage: "about",
    });
});

pagesRouter.get("/contact-us", (req: Request, res: Response) => {
    res.status(200).render("pages/contact-us", {
        pageTitle: "Contact",
        isAuthenticated: false,
        currentPage: "contact",
    });
});

pagesRouter.get("/privacy-policy", (req: Request, res: Response) => {
    res.status(200).render("pages/privacy-policy", {
        pageTitle: "Privacy Policy",
        isAuthenticated: false,
        currentPage: "privacy-policy",
    });
});

pagesRouter.get("/terms-and-conditions", (req: Request, res: Response) => {
    res.status(200).render("pages/terms-and-conditions", {
        pageTitle: "Terms and Conditions",
        isAuthenticated: false,
        currentPage: "terms-and-conditions",
    });
});

pagesRouter.get("/faq", (req: Request, res: Response) => {
    res.status(200).render("pages/faq", {
        pageTitle: "FAQ",
        isAuthenticated: false,
        currentPage: "faq",
    });
});

pagesRouter.get("/help", (req: Request, res: Response) => {
    res.status(200).render("pages/help", {
        pageTitle: "Help",
        isAuthenticated: false,
        currentPage: "help",
    });
});

///* Authenticated Routes */
import { mockDashboardData } from "../mock/dashboardData.js";

pagesRouter.get("/dashboard", (req: Request, res: Response) => {
    res.status(200).render("protected/dashboard", mockDashboardData);
});
pagesRouter.get("/profile", (req: Request, res: Response) => {
    res.status(200).render("protected/profile", {
        pageTitle: "Profile",
        isAuthenticated: true,
        currentPage: "profile",
    });
});

pagesRouter.get("/settings", (req: Request, res: Response) => {
    res.status(200).render("protected/settings", {
        pageTitle: "Settings",
        isAuthenticated: true,
        currentPage: "settings",
    });
});

export default pagesRouter;
