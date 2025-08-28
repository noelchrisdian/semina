import Image from "next/image";

const Brand = ({ className }) => {
    return (
        <section className={`brand-partner text-center ${className}`}>
            <p>Events held by top and biggest global companies</p>
            <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
                <Image src="/images/Apple.svg" alt="semina" width={150} height={100} />
                <Image src="/images/Adobe.svg" alt="semina" width={150} height={100} />
                <Image src="/images/Slack.svg" alt="semina" width={150} height={100} />
                <Image src="/images/Spotify.svg" alt="semina" width={150} height={100} />
                <Image src="/images/Google.svg" alt="semina" width={150} height={100} />
            </div>
        </section>
    )
}

export { Brand };