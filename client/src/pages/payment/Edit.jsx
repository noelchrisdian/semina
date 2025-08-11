import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CustomAlert } from "../../components/Alert";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { getData, postData, putData } from "../../utils/fetch";
import { PaymentForm } from "./Form";
import { setNotif } from "../../redux/notif/action";

const EditPayment = () => {
    const { paymentID } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        type: '',
        file: '',
        avatar: ''
    })
    const [alert, setAlert] = useState({
        status: false,
        variant: '',
        message: ''
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPayment = async () => {
            const response = await getData(`payments/${paymentID}`);
            setForm((prev) => {
                return {
                    ...prev,
                    type: response.data.data.type,
                    file: response.data.data.image._id,
                    avatar: response.data.data.image.name
                }
            })
        }

        fetchPayment();
    }, [paymentID])

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('photo', file);

        return await postData('images', formData, true);
    }

    const handleChange = async (e) => {
        if (e.target.name === 'avatar') {
            if (['image/jpeg', 'image/jpg', 'image/png'].includes(e?.target?.files[0]?.type)) {
                const size = parseFloat(e.target.files[0].size / 3_144_728).toFixed(2);

                if (size > 3) {
                    setAlert({
                        ...alert,
                        status: true,
                        variant: 'danger',
                        message: `Image size is ${size} MB, max allowed is 2 MB`
                    })

                    setForm({
                        ...form,
                        file: '',
                        [e.target.name]: ''
                    })
                } else {
                    const response = await uploadImage(e.target.files[0]);
                    setForm({
                        ...form,
                        file: response.data.data._id,
                        [e.target.name]: response.data.data.name
                    })
                }
            } else {
                setAlert({
                    ...alert,
                    status: true,
                    variant: 'danger',
                    message: 'File type is not supported'
                })

            }
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const payload = {
                type: form.type,
                image: form.file
            }
            const response = await putData(`payments/${paymentID}`, payload);
            dispatch(setNotif(
                true,
                'success',
                `Successfully updated ${response.data.data.type}`
            ))
            setLoading(false);
            navigate('/payments');
        } catch (error) {
            setLoading(false);
            setAlert({
                ...alert,
                status: true,
                variant: 'danger',
                message: error.response?.data?.message
            })
        }
    }

    return (
        <Container>
            <CustomBreadcrumb
                secondText={'Payments'}
                secondURL={'/payments'}
                thirdText={'Edit'}
            />

            {alert.status && (
                <CustomAlert
                    className={'mt-5 mb-3 mx-auto w-100'}
                    variant={alert.variant}
                    message={alert.message}
                />
            )}

            <PaymentForm
                edit
                form={form}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    )
}

export { EditPayment };