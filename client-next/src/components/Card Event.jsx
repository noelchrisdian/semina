import Image from "next/image";
import Link from "next/link";
import { CardTitle } from "./Card Title";
import { handlerFormatCurrency } from "../utils/currency";
import { handlerFormatDate } from "../utils/date format";

const CardEvent = ({ data, title, subTitle }) => {
    return (
        <section className="grow-today">
            <div className="container">
                <CardTitle title={title} subTitle={subTitle} />
                <div className="mt-5 row gap">
                    {data.map((data, index) => (
                        <div className="col-lg-3 col-md-6 col-12" key={index}>
                            <div className="card-grow h-100">
                                <span className="badge-pricing">
                                    {data.tickets.map((ticket, index) => (
                                        index === 0 && ticket.statusTicketCategory
                                            ?
                                            (<span key={index || ticket._id}>{ticket.price === 0 ? 'Free' : handlerFormatCurrency(ticket.price)}</span>
                                            ) :
                                            ('')
                                    ))}
                                </span>
                                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${data.image.name}`} alt="semina" width={800} height={600} style={{objectFit: 'cover'}} />

                                <div className="card-content">
                                    <div className="card-title">{data.title}</div>
                                    <div className="card-subtitle">{data.category.name}</div>
                                    <div className="description">
                                        {data.venueName}, {handlerFormatDate(data.date)}
                                    </div>
                                    <Link href={`/detail/${data._id}`} className="stretched-link" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export { CardEvent };