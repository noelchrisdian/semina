import { Col, Container, Row } from "react-bootstrap"
import { CustomBreadcrumb } from "../../components/Breadcrumb"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchEvents, setCategory, setKeyword, setTalent } from "../../redux/events/action";
import { fetchListsCategories, fetchListsTalents } from "../../redux/lists/action";
import { CustomButton } from "../../components/Button";
import { Search } from "../../components/Search";
import { Selectbox } from "../../components/Selectbox";
import { CustomTable } from "../../components/Table";
import { CustomAlert } from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData, putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/action";

const Event = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notif = useSelector((state) => state.notif);
    const events = useSelector((state) => state.events);
    const lists = useSelector((state) => state.lists)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch, events.keyword, events.category, events.talent])

    useEffect(() => {
        dispatch(fetchListsCategories());
        dispatch(fetchListsTalents());
    }, [dispatch])

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
			text: `This process can't be undone`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085D6",
			cancelButtonColor: "#D33D33",
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel"
        })
        if (!result.isConfirmed) return;

        const response = await deleteData(`events/${id}`);
        dispatch(setNotif(
            true,
            'success',
            `Successfully deleted ${response.data.data.title} event`
        ))

        dispatch(fetchEvents());
    }

    const handleChangeStatus = async (id, status) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#D33',
            confirmButtonText: 'Yes, change the status',
            cancelButtonText: 'Cancel'
        })
        if (!result.isConfirmed) return;

        const eventTarget = events.data.find((e) => e._id === id);
        if (!eventTarget) return;

        const payload = {
            category: eventTarget.category,
            image: eventTarget.image,
            statusEvent: status === 'Published' ? 'Draft' : 'Published',
            talent: eventTarget.talent
        }
        const response = await putData(`events/${id}`, payload);
        dispatch(setNotif(
            true,
            'success',
            `Successfully changed ${response.data.data.title} event status`
        ))

        dispatch(fetchEvents());
    }

    return (
        <Container>
            <CustomBreadcrumb
                secondText={'Events'}
            />
            <CustomButton
                className={'mb-3'}
                action={() => navigate('/events/create')}>
                Add
            </CustomButton>

            <Row>
                <Col>
                    <Search
                        query={events.keyword}
                        handleChange={(e) => dispatch(setKeyword({ keyword: e.target.value }))}
                    />
                </Col>
                <Col>
                    <Selectbox
                        name={'category'}
                        clearable={true}
                        placeholder={'Enter the category'}
                        value={events.category}
                        options={lists.categories}
                        handleChange={(e) => dispatch(setCategory({ category: e }))}
                    />
                </Col>
                <Col>
                    <Selectbox
                        name={'talent'}
                        clearable={true}
                        placeholder={'Enter the talent'}
                        value={events.talent}
                        options={lists.talents}
                        handleChange={(e) => dispatch(setTalent({ talent: e }))}
                    />
                </Col>
            </Row>

            {notif.status && (
				<CustomAlert
					className={"w-100"}
					variant={notif.typeNotif}
					message={notif.message}
				/>
            )}
            
            <CustomTable
                status={events.status}
                thead={['Title', 'Date', 'Venue', 'Status', 'Category', 'Talent', 'Action']}
                tbody={['title', 'date', 'venueName', 'statusEvent', 'categoryName', 'talentName']}
                data={events.data}
                editURL={'/events/edit'}
                deleteAction={(id) => handleDelete(id)}
                customAction={(id, status = '') => {
                    return (
                        <CustomButton
                            className={'mx-2'}
                            variant={'primary'}
                            size={'sm'}
                            action={() => handleChangeStatus(id, status)}
                        >
                            Change Status
                        </CustomButton>
                    )
                }}
            />
        </Container>
    )
}

export { Event };