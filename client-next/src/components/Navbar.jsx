import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navlink } from "./Navlink";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(Cookies.get('token'));
    }, [])

    const handleLogout = () => {
        Cookies.remove('token');
        setToken('');
        router.push('/');
    }

    return (
        <nav className="container navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link href={'/'} className="navbar-brand">
                    <Image src="/images/Logo.svg" alt="semina" width={130} height={50} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNavAltMarkup'
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded='false'
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className={`navbar-nav ${pathname === '/signin' ? 'ms-auto' : 'mx-auto'} my-3 my-lg-0`}>
                        <Navlink href={'/'}>Home</Navlink>
                        <Navlink href={'/browse'}>Browse</Navlink>
                        <Navlink href={'/stories'}>Stories</Navlink>
                        <Navlink href={'/about'}>About</Navlink>
                    </div>

                    {pathname !== '/signin' && (
                        <>
                            {token ? (
                                <div className="navbar-nav ms-auto">
                                    <div className="nav-item dropdown d-flex flex-column flex-lg-row align-items-lg-center authenticated gap-3">
                                        <span className="text-light d-none d-lg-block">
                                            Hello, Shayna
                                        </span>

                                        <a
                                            href="#"
                                            className="nav-link dropdown-toggle mx-0 d-none d-lg-block"
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            <Image src="/images/Avatar.png" alt="semina" width={56} height={54} />
                                        </a>
                                        <a
                                            href="#collapseExample"
                                            className="d-block d-lg-none dropdown-toggle text-light text-decoration-none"
                                            role="button"
                                            data-bs-toggle='collapse'
                                            aria-expanded='false'
                                            aria-controls="collapseExample"
                                        >
                                            <Image src="/images/Avatar.png" alt="semina" width={56} height={54}/>    
                                        </a>

                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li>
                                                <Link href={'/dashboard'} className="dropdown-item">
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="#" className="dropdown-item">Settings</a>
                                            </li>
                                            <li>
                                                <a href="#" className="dropdown-item">Rewards</a>
                                            </li>
                                            <li onClick={() => handleLogout()}>
                                                <a className="dropdown-item">Sign Out</a>
                                            </li>
                                        </ul>

                                        <div className="collapse" id="collapseExample">
                                            <ul className="list-group">
                                                <li>
                                                    <a href="#" className="list-group-item">Dashboard</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="list-group-item">Settings</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="list-group-item">Rewards</a>
                                                </li>
                                                <li onClick={() => handleLogout()}>
                                                    <a className="list-group-item">Sign Out</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-grid">
                                    <Link href={'/signin'} className="btn-navy">
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export { Navbar };