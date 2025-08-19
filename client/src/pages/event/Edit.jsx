import moment from "moment";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomAlert } from "../../components/Alert";
import { EventForm } from "./Form";
import { getData, postData, putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/action";
import { fetchListsCategories, fetchListsTalents } from "../../redux/lists/action";


const EditEvent = () => {
    const { eventID } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lists = useSelector((state) => state.lists)

    const [form, setForm] = useState({
        title: '',
        price: '',
        date: '',
        file: '',
        avatar: '',
        about: '',
        venueName: '',
        tagline: '',
        keyPoint: [''],
        tickets: [{
            type: '',
            status: '',
            stock: '',
            price: ''
        }],
        category: '',
        talent: '',
        stock: ''
    })
    const [alert, setAlert] = useState({
        status: false,
        variant: '',
        message: ''
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchListsCategories());
        dispatch(fetchListsTalents());
    }, [dispatch])

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await getData(`events/${eventID}`);
            setForm((prev) => {
                return {
                    ...prev,
                    title: response.data.data.title,
                    date: moment(response.data.data.date).format('YYYY-MM-DDTHH:SS'),
                    file: response.data.data.image._id,
                    avatar: response.data.data.image.name,
                    about: response.data.data.about,
                    venueName: response.data.data.venueName,
                    statusEvent: response.data.data.statusEvent,
                    tagline: response.data.data.tagline,
                    keyPoint: response.data.data.keyPoint,
                    category: {
                        value: response?.data?.data?.category?._id,
                        label: response?.data?.data?.data?.category?.name,
                        target: { name: 'category', value: response?.data?.data?.category?._id }
                    },
                    talent: {
                        value: response?.data?.data?.talent?._id,
                        label: response?.data?.data?.data?.talent?.name,
                        target: { name: 'talent', value: response?.data?.data?.talent?._id }
                    },
                    tickets: response.data.data.tickets
                }   
            })
        }

        fetchEvent();
    }, [eventID])

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('photo', file)

        return await postData('images', formData, true);
    }

    const handleChange = async (e) => {
        if (e.target.name === 'avatar') {
            if (['image/jpg', 'image/png', 'image/jpeg'].includes(e?.target?.files[0]?.type)) {
                const size = parseFloat(e.target.files[0].size / 3_145_728).toFixed(2);

                if (size > 2) {
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
                    status: true,
                    variant: 'danger',
                    message: 'File type is not supported'
                })
            }
        } else if (e.target.name === 'category' || e.target.name === 'talent') {
            setForm({
                ...form,
                [e.target.name]: e
            })
        } else {
            setForm({
                ...form, 
                [e.target.name]: e.target.value
            })
        }
    }

    const handleChangeKeyPoint = (e, i) => {
        const temp = [...form.keyPoint];
        temp[i] = e.target.value;

        setForm({
            ...form,
            keyPoint: temp
        })
    }

    const handleChangeTicket = (e, i) => {
        const temp = [...form.tickets];
        temp[i][e.target.name] = e.target.value;

        setForm({
            ...form,
            tickets: temp
        })
    }

    const handleMinusKeyPoint = (index) => {
        const temp = [...form.keyPoint];
        const removeIndex = temp.map((_, i) => i).indexOf(index);
        temp.splice(removeIndex, 1)

        setForm({
            ...form,
            keyPoint: temp
        })
    }

    const handlePlusKeyPoint = () => {
        const temp = [...form.keyPoint];
        temp.push('');

        setForm({
            ...form,
            keyPoint: temp
        })
    }

    const handleMinusTicket = (index) => {
        const temp = [...form.tickets];
        const removeIndex = temp.map((_, i) => i).indexOf(index);
        temp.splice(removeIndex, 1)

        setForm({
            ...form,
            tickets: temp
        })
    }

    const handlePlusTicket = () => {
        const temp = [...form.tickets];
        temp.push({
            type: '',
            status: '',
            stock: '',
            price: ''
        })

        setForm({
            ...form,
            tickets: temp
        })
    }

    const handleSubmit = async () => {
        setLoading(true);
        const payload = {
            title: form.title,
            date: form.date,
            about: form.about,
            tagline: form.tagline,
            venueName: form.venueName,
            keyPoint: form.keyPoint,
            statusEvent: form.status,
            tickets: form.tickets,
            image: form.file,
            category: form.category.value,
            talent: form.talent.value
        }
        const response = await putData(`events/${eventID}`, payload);
        if (response?.data?.data) {
            dispatch(setNotif(
                true,
                'success',
                `Successfully updated ${response.data.data.title}`
            ))
            setLoading(false);
            navigate('/events');
        }
        
        setLoading(false);
        setAlert({
            status: true,
            variant: 'danger',
            message: response?.response?.data?.message
        })
    }

    return (
        <Container>
            <CustomBreadcrumb
                secondText={'Events'}
                secondURL={'/events'}
                thirdText={'Edit'}
            />

            {alert.status && (
                <CustomAlert
                    className={'mt-5 mb-3 mx-auto w-100'}
                    variant={alert.variant}
                    message={alert.message}
                />
            )}

            <EventForm
                edit
                form={form}
                lists={lists}
                loading={loading}
                handleChange={handleChange}
                handleChangeKeyPoint={handleChangeKeyPoint}
                handleChangeTicket={handleChangeTicket}
                handleMinusKeyPoint={handleMinusKeyPoint}
                handleMinusTicket={handleMinusTicket}
                handlePlusKeyPoint={handlePlusKeyPoint}
                handlePlusTicket={handlePlusTicket}
                handleSubmit={handleSubmit}
            />
        </Container>
    )
}

export { EditEvent };