import { Route, Routes } from "react-router-dom"
import { CreateEvent } from "../pages/event/Create";
import { EditEvent } from "../pages/event/Edit";
import { Event } from "../pages/event/Event"

const EventRouter = () => {
    return (
        <Routes>
            <Route index element={<Event />} />
            <Route path="create" element={<CreateEvent />} />
            <Route path="edit/:eventID" element={<EditEvent />} />
        </Routes>
    )
}

export { EventRouter };