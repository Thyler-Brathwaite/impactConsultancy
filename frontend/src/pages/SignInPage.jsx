import React from "react";
import { SignIn } from "@clerk/react";
import { useLocation } from "react-router-dom";
import "../css/SignInPage.css";
import { easeIn, motion } from "motion/react";

export default function SignInPage() {

    const location = useLocation();

    const from = location.state?.from || "/";

    return (
        <motion.div className="auth-page" initial={{opacity:0, y:-10}} whileInView={{opacity:1, y:0}} transition={{duration:0.5, ease:"easeIn"}}>

            <SignIn
                fallbackRedirectUrl={from}

                appearance={{
                    variables: {
                        colorPrimary: "#5b3a91",
                        colorBackground: "#ffffff",
                        colorText: "#333333",
                        colorTextSecondary: "#666666",
                        borderRadius: "10px",
                        fontFamily: "Arial, sans-serif"
                    },

                    elements: {
                        card: "signin-card",

                        headerTitle: "signin-title",

                        headerSubtitle: "signin-subtitle",

                        formFieldLabel: "signin-label",

                        formFieldInput: "signin-input",

                        formButtonPrimary: "signin-button",

                        footerActionLink: "signin-link"
                    }
                }}
            />

        </motion.div>
    );
}