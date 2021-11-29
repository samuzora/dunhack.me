import { useState } from 'react';
import {
	Button,
	Card,
	Form,
	Modal,
	Row,
	Col,
	FloatingLabel,
} from 'react-bootstrap';
import styles from '../styles/challenge.module.scss';
import { MdKeyboardArrowRight, MdOutlineLightbulb } from 'react-icons/md';

export default function Challenge({ chal }: { chal: any }) {
	const { title, description, hint, files, points } = chal;
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<button className={styles.btnCard} onClick={handleShow}>
				<Card className={styles.card} style={{ width: '21rem' }}>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Text>{points}</Card.Text>
					</Card.Body>
				</Card>
			</button>
			<Modal dialogClassName={styles.modal} show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{description}</Modal.Body>
				<button className={styles.hint}>&gt; Hint</button>
				<Modal.Footer as={Row} className='justify-content-center g-0'>
					<Form method='post' action=''>
						<Row className='g-1'>
							<Col md={10}>
								<Form.Control
									name='flag'
									placeholder='CTF{Your_Flag_Here}'
								/>
							</Col>

							<Col md={2}>
								<Button className={styles.submit} type='submit'>
									Submit
								</Button>
							</Col>
						</Row>
					</Form>
				</Modal.Footer>
			</Modal>
		</>
	);
}