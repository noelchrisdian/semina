import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="footer bg-navy">
            <div className="container">
                <Link href={'/'}>
                    <Image src={'/images/Logo.svg'} alt="semina" width={130} height={50}/>
                </Link>
                <div className="mt-3 d-flex flex-row flex-wrap footer-content align-items-baseline">
                    <p className="paragraph">
                        Semina is a place where
                        <br className="d-md-block d-none" />
                        you can find events that match 
                        <br className="d-md-block d-none" />
                        your interests and are nearby
                    </p>
                    <div className="d-flex flex-column footer-links">
                        <div className="title-links mb-3">Features</div>
                        <Link href={'#'}>Virtual</Link>
                        <Link href={'#'}>Pricing</Link>
                        <Link href={'#'}>Merchant</Link>
                        <Link href={'#'}>Tickets</Link>
                    </div>
                    <div className="d-flex flex-column footer-links">
                        <div className="title-links mb-3">Company</div>
                        <Link href={'#'}>Jobs</Link>
                        <Link href={'#'}>API</Link>
                        <Link href={'#'}>Press</Link>
                        <Link href={'#'}>Sitemap</Link>
                    </div>
                    <div className="d-flex flex-column footer-links">
                        <div className="title-links mb-3">Learn</div>
                        <Link href={'#'}>Guidebook</Link>
                        <Link href={'#'}>Inspiration</Link>
                        <Link href={'#'}>Community</Link>
                        <Link href={'#'}>Tools</Link>
                    </div>
                </div>
                <div className="d-flex justify-content-center paragraph all-rights">
                    All Rights Reserved.
                    Semina Angga 2022.
                </div>
            </div>
        </footer>
    )
}

export { Footer };