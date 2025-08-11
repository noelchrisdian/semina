import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { accessTalents } from "../../utils/access";
import { CustomAlert } from "../../components/Alert";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { CustomButton } from "../../components/Button";
import { CustomTable } from "../../components/Table";
import { deleteData } from "../../utils/fetch";
import { fetchTalents, setKeyword } from "../../redux/talents/action";
import { Search } from "../../components/Search";
import { setNotif } from "../../redux/notif/action";

const Talent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const notif = useSelector((state) => state.notif);
    const talents = useSelector((state) => state.talents);

	const [access, setAccess] = useState({
		create: false,
		delete: false,
		update: false,
	})

	useEffect(() => {
		const checkAccess = () => {
			const { role } = localStorage.getItem("auth")
				? JSON.parse(localStorage.getItem("auth"))
				: {};
			const access = {
				create: false,
				delete: false,
				update: false,
			}
			Object.keys(accessTalents).forEach((key) => {
				if (accessTalents[key].includes(role)) {
					access[key] = true;
				}
			})

			setAccess(access);
		}

		checkAccess();
	}, [])

	useEffect(() => {
		dispatch(fetchTalents());
	}, [dispatch, talents.keyword])

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

		const response = await deleteData(`/talents/${id}`);
		dispatch(
			setNotif(
				true,
				"success",
				`Successfully deleted ${response.data.data.name} talent`
			)
        )
        
        dispatch(fetchTalents());
	}

	return (
		<Container className="mt-3">
			<CustomBreadcrumb secondText={"Talents"} />
			{access.create && (
				<CustomButton
					className={"mb-3"}
					action={() => navigate("/talents/create")}
                >
                    Add
                </CustomButton>
            )}
            
            <Search
                query={talents.keyword}
                handleChange={(e) => dispatch(setKeyword({keyword: e.target.value}))}
            />

			{notif.status && (
				<CustomAlert
					className={"w-100"}
					variant={notif.typeNotif}
					message={notif.message}
				/>
			)}

			<CustomTable
				status={talents.status}
				thead={["Name", "Role", "Avatar", "Action"]}
				data={talents.data}
				tbody={["name", "role", "avatar"]}
				editURL={access.update ? "/talents/edit" : null}
				deleteAction={access.delete ? (id) => handleDelete(id) : null}
			/>
		</Container>
	)
}

export { Talent };