import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

const Header = () => {
    return (
        <header className="header bg-navy">
            <Navbar />
            <Hero />
        </header>
    )
}

export { Header };