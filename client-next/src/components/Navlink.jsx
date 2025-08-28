import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({ href, children }) => {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={`nav-link ${pathname === href ? 'active' : ''}`} aria-current='page'
        >
            {children}
        </Link>
    )
}

export { Navlink };