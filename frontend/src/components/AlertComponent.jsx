import Alert from 'react-bootstrap/Alert';

function AlertMessage({show , onClose , variant ,heading }){
    return(
        show && (
            <Alert variant={variant} onClose={onClose} dismissible className={variant}>
                <Alert.Heading >{heading}</Alert.Heading>

            </Alert>
        )
    )
}

export default AlertMessage;