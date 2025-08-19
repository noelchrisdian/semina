import { Container } from "react-bootstrap"
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { CustomAlert } from "../../components/Alert";
import { EventForm } from "./Form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListsCategories, fetchListsTalents } from "../../redux/lists/action";
import { postData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/action";

const CreateEvent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        dispatch(fetchListsTalents());
        dispatch(fetchListsCategories());
    }, [dispatch])

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('photo', file);

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
                    ...alert,
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
        const response = await postData('/events', payload);
        if (response?.data?.data) {
            dispatch(setNotif(
                true,
                'success',
                `Successfully created ${response.data.data.title} event`
            ))
            setLoading(false);
            navigate('/events');
        }

        setLoading(false);
        setAlert({
            ...alert,
            status: true,
            variant: 'danger',
            message: response?.response?.data?.message
        })
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

    const handlePlusKeyPoint = () => {
        const temp = [...form.keyPoint];
        temp.push('');
        setForm({
            ...form,
            keyPoint: temp
        })
    }

    const handleMinusKeyPoint = (index) => {
        const temp = [...form.keyPoint];
        const removeIndex = temp.map((_, i) => i).indexOf(index);
        temp.splice(removeIndex, 1);
        setForm({
            ...form,
            keyPoint: temp
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

    const handleMinusTicket = (index) => {
        const temp = [...form.tickets];
        const removeIndex = temp.map((_, i) => i).indexOf(index);
        temp.splice(removeIndex, 1);
        setForm({
            ...form,
            tickets: temp
        })
    }

    return (
        <Container>
            <CustomBreadcrumb
                secondText={'Events'}
                secondURL={'/events'}
                thirdText={'Add'}
            />

            {alert.status && (
                <CustomAlert
                    className={'mt-5 mb-3 mx-auto w-100'}
                    variant={alert.variant}
                    message={alert.message}
                />
            )}

            <EventForm
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

export { CreateEvent };