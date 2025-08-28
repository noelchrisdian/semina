import Image from "next/image";
import Link from "next/link";

const Stories = () => {
    return (
        <section className="stories">
            <div className="d-flex flex-row justify-content-center align-items-center container">
                <Image
                    src={'/images/Story.png'}
                    alt="semina"
                    className="d-none d-lg-block"
                    width={515}
                    height={580}
                />

                <div className="d-flex flex-column">
                    <div className="">
                        <div className="sub-title">
                            <span className="text-gradient-pink">Story</span>
                        </div>
                        <div className="title">
                            One Great Event <br className="d-none d-lg-block" />
                            For The Better World
                        </div>
                    </div>
                    <p className="paragraph">
                        Read the story of how Shayna built{' '}
                        <br className="d-none d-lg-block" />
                        a startup that helps people{' '}
                        <br className="d-none d-lg-block" />
                        get support during the pandemic
                    </p>
                    <Link href={'#'} className="btn-navy">
                        Read
                    </Link>
                </div>
            </div>
        </section>
    )
}

export { Stories };