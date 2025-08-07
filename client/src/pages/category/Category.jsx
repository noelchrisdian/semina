import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accessCategories } from "../../utils/access";
import { CustomAlert } from "../../components/Alert";
import { CustomButton } from "../../components/Button";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { CustomTable } from "../../components/Table";
import { deleteData } from "../../utils/fetch";
import { fetchCategories } from "../../redux/categories/action";
import { setNotif } from "../../redux/notif/action";

const Category = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const notif = useSelector((state) => state.notif);

	const [access, setAccess] = useState({
		create: false,
		delete: false,
		update: false
	})

	useEffect(() => {
		const checkAccess = () => {
			const { role } = localStorage.getItem("auth")
				? JSON.parse(localStorage.getItem("auth"))
				: {};
			const access = {
				create: false,
				delete: false,
				update: false
			}
			Object.keys(accessCategories).forEach((key) => {
				if (accessCategories[key].includes(role)) {
					access[key] = true;
				}
			})

			setAccess(access);
		}

		checkAccess();
	}, [])

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch])

	const handleDelete = async (id) => {
		const result = await Swal.fire({
			title: 'Are you sure?',
			text: `This process can't be undone`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085D6',
			cancelButtonColor: '#D33D33',
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel'
		})
		if (!result.isConfirmed) {
			return;
		}
		
		const response = await deleteData(`categories/${id}`);
		dispatch(setNotif(
			true,
			'success',
			`Successfully deleted ${response.data.data.name} category`
		))

		dispatch(fetchCategories());
	}

	return (
		<Container className="mt-3">
			<CustomBreadcrumb secondText="Categories" />
			{access.create && (
				<CustomButton
					className={'mb-3'}
					action={() => navigate('/categories/create')}>
					Add
				</CustomButton>
			)}

			{notif.status && (
				<CustomAlert
					className={'w-100'}
					variant={notif.typeNotif}
					message={notif.message}
				/>
			)}

			<CustomTable
				status={categories.status}
				thead={['Name', 'Action']}
				data={categories.data}
				tbody={['name']}
				editURL={access.update ? `/categories/edit` : null}
				deleteAction={access.delete ? (id) => handleDelete(id) : null}
			/>
		</Container>
	)
}

export { Category };