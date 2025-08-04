import { Form } from "react-bootstrap";
import { CustomButton } from "../../components/Button";
import { CustomInputLabel } from "../../components/Input";

const CategoryForm = ({edit, loading, form, handleChange, handleSubmit}) => {
    return (
        <Form>
            <CustomInputLabel
                name='name'
                label={'Category name'}
                placeholder={'Enter the category name'}
                type={'text'}
                value={form.name}
                onChange={handleChange}
            />
            <CustomButton variant={'primary'} action={handleSubmit} loading={loading}>
                {edit ? 'Change' : 'Save'}
            </CustomButton>
        </Form>
    )
}

export { CategoryForm };