import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessPayments } from "../../utils/access";
import { CustomAlert } from "../../components/Alert";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { CustomButton } from "../../components/Button";
import { CustomTable } from "../../components/Table";
import { deleteData } from "../../utils/fetch";
import { fetchPayments } from "../../redux/payments/action";
import { setNotif } from "../../redux/notif/action";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notif = useSelector((state) => state.notif);
    const payments = useSelector((state) => state.payments);
    const [access, setAccess] = useState({
        create: false,
        delete: false,
        update: false
    })

    useEffect(() => {
        const checkAccess = () => {
            const { role } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
            const access = {
                create: false,
                delete: false,
                update: false
            }
            Object.keys(accessPayments).forEach((key) => {
                if (accessPayments[key].includes(role)) {
                    access[key] = true;
                }
            })

            setAccess(access);
        }

        checkAccess();
    }, [])

    useEffect(() => {
        dispatch(fetchPayments());
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

        const response = await deleteData(`/payments/${id}`);
        dispatch(setNotif(
            true,
            'success',
            `Successfully deleted ${response.data.data.type} payment method`
        ))

        dispatch(fetchPayments());
    }

    return (
        <Container>
            <CustomBreadcrumb
                secondText={'Payments'}
            />
            {access.create && (
                <CustomButton className={'mb-3'} action={() => navigate('/payments/create')} >
                    Add
                </CustomButton> 
            )}

            {notif.status && (
                <CustomAlert
                    className={'mt-5 mb-3 mx-auto w-100'}
                    variant={notif.typeNotif}
                    message={notif.message}
                />
            )}

            <CustomTable
                status={payments.status}
                thead={['Type', 'Avatar', 'Action']}
                data={payments.data}
                tbody={['type', 'avatar']}
                editURL={access.update ? '/payments/edit' : null}
                deleteAction={access.delete ? (id) => handleDelete(id) : null}
            />
        </Container>
    )
}

export { Payment };