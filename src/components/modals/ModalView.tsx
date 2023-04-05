import Modal from "@mui/material/Modal";

interface ModalViewProps {
    children: any;
    isOpen: boolean;
    handleClose: () => void;
}

export default function ModalView(props: ModalViewProps) {
    return (
        <>
            <Modal open={props.isOpen} onClose={props.handleClose}>
                {props.children}
            </Modal>
        </>
    );
}
