import React from "react";
import { SignUp } from "@clerk/react";
import { useLocation } from "react-router-dom";
import "../css/SignUpPage.css";
import { easeIn, motion } from "motion/react";

export default function SignUpPage() {

    const location = useLocation();

    
    const from = location.state?.from || "/";

    return (<>
    
                
                <motion.div className="auth-page" initial={{opacity:0, y:-10}} whileInView={{opacity:1, y:0}} transition={{duration:0.5, ease:"easeIn"}}>

            <SignUp
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
                        card: "signup-card",

                        headerTitle: "signup-title",

                        headerSubtitle: "signup-subtitle",

                        formFieldLabel: "signup-label",

                        formFieldInput: "signup-input",

                        formButtonPrimary: "signup-button",

                        footerActionLink: "signup-link"
                    }
                }}
            />

        </motion.div>
            </>
        
    );
}