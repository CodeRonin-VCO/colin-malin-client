import { useEffect, useRef, useState } from "react";
import LoginForm from "../../components/forms/login/login.jsx";
import RegisterForm from "../../components/forms/register/register.jsx";
import FooterLayout from "../../layouts/footer/footer.jsx";
import HomeHeaderLayout from "../../layouts/home-header/home-header.jsx";
import NET from "vanta/dist/vanta.net.min";

export default function HomeRoute() {
    const [switchForm, setSwitchForm] = useState(true);
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    useEffect(() => {
        if (!vantaRef.current) return;
        if (window.innerWidth < 960) return; // uniquement en desktop

        const timer = setTimeout(() => {
            vantaEffect.current = NET({
                el: vantaRef.current,
                THREE: window.THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1,
                scaleMobile: 1,
                color: 3538793,
                backgroundColor: 7720,
                maxDistance: 20,
                spacing: 18,
                showDots: false
            });
            console.log(vantaEffect.current);
        }, 100);

        return () => {
            clearTimeout(timer); // annule le timer
            if (vantaEffect.current) vantaEffect.current.destroy();
        };
    }, []);

    return (
        <div className="page">
            <HomeHeaderLayout />
            <main ref={vantaRef}>
                {switchForm && (
                    <LoginForm setSwitchForm={setSwitchForm} />
                )}
                {!switchForm && (
                    <RegisterForm setSwitchForm={setSwitchForm} />
                )}
            </main>
            <FooterLayout />
        </div>
    )
}