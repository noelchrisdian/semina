import { Route, Routes } from "react-router-dom";
import { CreateTalent } from "../pages/talent/Create";
import { EditTalent } from "../pages/talent/Edit";
import { Talent } from "../pages/talent/Talent";

const TalentRouter = () => {
    return (
        <Routes>
            <Route index element={<Talent />} />
            <Route path="create" element={<CreateTalent />} />
            <Route path="edit/:talentID" element={<EditTalent />} />
        </Routes>
    )
}

export { TalentRouter };