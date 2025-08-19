import {
    CloseButton,
    Col,
    Figure,
    Form,
    FormControl,
    InputGroup,
    Row
} from "react-bootstrap";
import { CustomButton } from "../../components/Button";
import { CustomInputLabel } from "../../components/Input";
import { Selectbox } from '../../components/Selectbox';

const EventForm = ({
    edit,
    form,
    lists,
    loading,
    handleChange,
    handleChangeKeyPoint,
    handleChangeTicket,
    handleMinusKeyPoint,
    handleMinusTicket,
    handlePlusKeyPoint,
    handlePlusTicket,
    handleSubmit
}) => {
    return (
        <Form>
            <Row>
                <Col>
                    <CustomInputLabel
                        label={'Title'}
                        name={'title'}
                        value={form.title}
                        type={'text'}
                        placeholder={'Enter the title'}
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <CustomInputLabel
                        label={'Tagline'}
                        name={'tagline'}
                        value={form.tagline}
                        type={'text'}
                        placeholder={'Enter the tagline'}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CustomInputLabel
                        label={'Date'}
                        name={'date'}
                        value={form.date}
                        type={'datetime-local'}
                        placeholder={'Enter the event date'}
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <Selectbox
                        name={'category'}
                        clearable={true}
                        label={'Category'}
                        options={lists.categories}
                        placeholder={'Enter the category'}
                        value={form.category}
                        handleChange={(e) => handleChange(e)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CustomInputLabel
                        label={'About'}
                        name={'about'}
                        value={form.about}
                        type={'text'}
                        onChange={handleChange}
                        placeholder={'Enter the description'}
                    />
                </Col>
                <Col>
                    <CustomInputLabel
                        label={'Venue Name'}
                        name={'venueName'}
                        value={form.venueName}
                        type={'text'}
                        onChange={handleChange}
                        placeholder={'Enter the venue name'}
                    />
                </Col>
            </Row>

            <Form.Label>Key Point</Form.Label>
            <Row>
                {form.keyPoint.map((key, index) => {
                    return (
                        <Col key={index} sm={6}>
                            <InputGroup className="mb-3" key={index}>
                                <FormControl
                                    name="key"
                                    placeholder="Enter the keypoint"
                                    value={key}
                                    type="text"
                                    onChange={(e) => handleChangeKeyPoint(e, index)}
                                />

                                {index !== 0 && (
                                    <InputGroup.Text id="basic-addon2">
                                        <CloseButton onClick={() => handleMinusKeyPoint(index)} />
                                    </InputGroup.Text>
                                )}
                            </InputGroup>
                        </Col>
                    )
                })}
            </Row>

            <CustomButton
                variant={'success'}
                action={handlePlusKeyPoint}
                size={'sm'}
            >
                Add keypoint
            </CustomButton>

            <Row>
                <Col>
                    <Selectbox
                        name={'talent'}
                        clearable={true}
                        label={'Talent'}
                        options={lists.talents}
                        placeholder={'Enter the talent'}
                        value={form.talent}
                        handleChange={(e) => handleChange(e)}
                    />
                </Col>
                <Col>
                    <CustomInputLabel
                        label={'Cover'}
                        name={'avatar'}
                        type={'file'}
                        onChange={handleChange}
                        placeholder={'Enter the avatar'}
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
                                <Figure.Caption>Preview Image Cover</Figure.Caption>
                            </Figure>
                        </div>
                    )}
                </Col>
            </Row>

            <Form.Label>Ticket</Form.Label>
            {form.tickets.map((tic, index) => {
                return (
                    <Row key={index}>
                        <Col sm={6}>
                            <CustomInputLabel
                                label={'Ticket Type'}
                                name={'type'}
                                type={'text'}
                                value={tic.type}
                                placeholder={'Enter the ticket type'}
                                onChange={(e) => handleChangeTicket(e, index)}
                            />
                        </Col>
                        <Col sm={6}>
                            <CustomInputLabel
                                label={'Price'}
                                name={'price'}
                                type={'number'}
                                value={tic.price}
                                placeholder={'Enter the ticket price'}
                                onChange={(e) => handleChangeTicket(e, index)}
                            />
                        </Col>
                        <Col sm={6}>
                            <CustomInputLabel
                                label={'Stock'}
                                name={'stock'}
                                type={'number'}
                                value={tic.stock}
                                placeholder={'Enter the ticket type'}
                                onChange={(e) => handleChangeTicket(e, index)}
                            />
                        </Col>
                        {index !== 0 && (
                            <Col sm={1} className="d-flex justify-content-end align-items-center">
                                <CloseButton onClick={() => handleMinusTicket(index)} />
                            </Col>
                        )}
                    </Row>
                )
            })}
            <div className="mb-3">
                <CustomButton variant={'success'} action={handlePlusTicket} size='sm'>
                    Add Ticket
                </CustomButton>                
            </div>

            <CustomButton variant={'primary'} action={handleSubmit} loading={loading}>
                {edit ? 'Change' : 'Save'}
            </CustomButton>
        </Form>
    )
}

export { EventForm };