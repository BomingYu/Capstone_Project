import Alert from 'react-bootstrap/Alert';

function AlertMessage({show , onClose , variant ,heading }){
    return(
        show && (
            <Alert variant={variant} onClose={onClose} dismissible className='alert'>
                <Alert.Heading className='alertHeading'>{heading}</Alert.Heading>
            </Alert>
        )
    )
}

export default AlertMessage;