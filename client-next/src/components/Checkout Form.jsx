import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { getData, postData } from "../utils/fetch";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const CheckoutForm = ({ tickets }) => {
    const router = useRouter();
    const { ticketID, organizer } = router.query;

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        payment: '',
        event: router.query.id
    })
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const getPayments = async () => {
            try {
                const response = await getData(
                    `${process.env.NEXT_PUBLIC_API_URL}/participants/payments/${organizer}`,
                    {},
                    Cookies.get('token')
                )
                response.data.forEach((data) => {
                    data.isChecked = false;
                })

                setPayments(response.data);   
            } catch (error) {
                
            }
        }

        getPayments()
    }, [])

    useEffect(() => {
        let paymentID = '';
        payments.filter((payment) => {
            if (payment.isChecked) {
                paymentID = payment._id;
            }
        })

        setForm((prev) => {
            return {
                ...prev,
                payment: paymentID
            }
        })
    }, [payments])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const temp = [];
            tickets.forEach((ticket) => {
                if (ticket._id === ticketID) {
                    temp.push({
                        ticketCategories: {
                            type: ticket.type,
                            price: ticket.price
                        },
                        sumTicket: 1
                    })
                }
            })

            const payload = {
                event: form.event,
                tickets: temp,
                payment: form.payment,
                personalDetails: {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    role: form.role
                }
            }

            const response = await postData(
                `${process.env.NEXT_PUBLIC_API_URL}/participants/checkout`,
                payload,
                Cookies.get('token')
            )

            if (response.data) {
                toast.success('Checkout success, thank you!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                router.push('/dashboard');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangePayment = (e, i) => {
        const temp = [...payments];
        temp[i].isChecked = e.target.checked;
        temp.forEach((data) => {
            if (data._id !== e.target.value) {
                data.isChecked = false;
            }
        })

        setPayments(temp);
    }

	return (
		<form action="" className="container form-semina">
			<div className="personal-details">
				<div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
					<div className="form-title col-lg-8">
						<span>01</span>
						<div>Personal Details</div>
					</div>
				</div>

				<div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center">
					<div className="mb-4 col-lg-4">
						<label htmlFor="first_name" className="form-label">
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							id="first_name"
							className="form-control"
							value={form.firstName}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4 col-lg-4">
						<label htmlFor="last_name" className="form-label">
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							id="last_name"
							className="form-control"
							value={form.lastName}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="row row-cols-lg-8 row-cols-md-2 row-cols-12 justify-content-center">
					<div className="mb-4 col-lg-4">
						<label htmlFor="email_address" className="form-label">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email_address"
							className="form-control"
							value={form.email}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4 col-lg-4">
						<label htmlFor="role" className="form-label">
							Role
						</label>
						<input
							type="text"
							name="role"
							id="role"
							className="form-control"
							value={form.role}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>

			<div className="payment-method mt-4">
				<div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
					<div className="form-title col-lg-8">
						<span>02</span>
						<div>Payment Method</div>
					</div>
				</div>
			</div>

			<div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center gy-4 gy-md-0">
				{payments.map((payment, index) => (
					<div className="col-lg-4" key={payment._id}>
						<label className="payment-radio h-100 d-flex justify-content-between align-items-center">
							<div className="d-flex align-items-center gap-4">
								<Image
									src={`${process.env.NEXT_PUBLIC_API_URL}/${payment?.image?.name}`}
									alt=""
									width={50}
                                    height={50}
                                    style={{objectFit: 'cover'}}
								/>
								<div>{payment.type}</div>
							</div>
							<input
								type="radio"
								name="isChecked"
								checked={payment.isChecked}
								value={payment._id}
								onChange={(e) => handleChangePayment(e, index)}
							/>
							<span className="checkmark" />
						</label>
					</div>
				))}
			</div>

			<div className="d-flex flex-column align-items-center footer-payment gap-4">
				<Button variant="btn-green" action={() => handleSubmit()}>
					Pay Now
				</Button>
				<div>
					<Image src="/images/Secure.svg" alt="" width={25} height={25} />
					<span>Your payment is secure and encrypted</span>
				</div>
			</div>
		</form>
	)
}

export { CheckoutForm };