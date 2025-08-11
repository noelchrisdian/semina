import { Form, Figure } from "react-bootstrap";
import { CustomButton } from "../../components/Button";
import { CustomInputLabel } from "../../components/Input";

const TalentForm = ({
    edit,
    form,
    loading,
    handleChange,
    handleSubmit
}) => {
    return (
        <Form>
            <CustomInputLabel
                label={'Name'}
                name={'name'}
                value={form.name}
                type={'text'}
                placeholder={`Enter the talent's name`}
                onChange={handleChange}
            />

            <CustomInputLabel
                label={'Role'}
                name={'role'}
                value={form.role}
                type={'text'}
                placeholder={`Enter the role`}
                onChange={handleChange}
            />

            <CustomInputLabel
                label={'Avatar'}
                name={'avatar'}
                type={'file'}
                placeholder={`Enter the avatar`}
                onChange={handleChange}
            />

            {form.avatar !== '' && (
                <div className="">
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src={`/api/${form.avatar}`}
                        />
                        <Figure.Caption>Preview Avatar</Figure.Caption>
                    </Figure>
                </div>
            )}
            <CustomButton variant={'primary'} action={handleSubmit} loading={loading}>
                {edit ? 'Change' : 'Save'}
            </CustomButton>
        </Form>
    )
}

export { TalentForm };