import Image from "next/image";

const Hero = () => {
    return (
			<>
				<div className="hero">
					<div className="hero-headline">
						Expand Your{" "}
						<span className="text-gradient-blue">Knowledge</span>{" "}
						<br className="d-none d-lg-block" />
						by <span className="text-gradient-pink">Joining</span> Our
						Greatest Events
					</div>
					<p className="hero-paragraph">
						We provide the best events to help you improve
						<br className="d-none d-lg-block" />
						your skills in the field of technology
					</p>
					<a href="#grow-today" className="btn-green">
						Browse Now
					</a>
				</div>

				<div className="d-flex flex-row flex-nowrap justify-content-center align-items-center gap-5 header-image">
					<Image
						src="/images/1.png"
						alt="semina"
						className="img-1"
						width={662}
						height={410}
					/>
					<Image
						src="/images/2.png"
						alt="semina"
						className="img-2"
						width={838}
						height={520}
					/>
					<Image
						src="/images/1.png"
						alt="semina"
						className="img-1"
						width={662}
						height={410}
					/>
				</div>
			</>
		);
}

export { Hero };