import { Figure, Form } from "react-bootstrap";
import { CustomButton } from "../../components/Button";
import { CustomInputLabel } from "../../components/Input";

const PaymentForm = ({
    edit,
    form,
    loading,
    handleChange,
    handleSubmit
}) => {
    return (
        <Form>
            <CustomInputLabel
                label={'Type'}
                name={'type'}
                type={'text'}
                value={form.type}
                placeholder={'Enter the payment type'}
                onChange={handleChange}
            />

            <CustomInputLabel
                label={'Avatar'}
                name={'avatar'}
                type={'file'}
                placeholder={'Enter the avatar'}
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

export { PaymentForm };