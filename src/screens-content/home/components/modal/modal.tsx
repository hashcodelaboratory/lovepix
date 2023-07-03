import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalLayout = (): JSX.Element => {
  const router = useRouter();

  // TODO: implement cancel flow
  // const stripeStatusCanceled = router.query?.canceled as string;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (((router.query?.success as string) === "true")) {
      handleOpen();
    }
  }, [router.query]);

  return(
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Payment info
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Thank you for your order.
        </Typography>
      </Box>
    </Modal>
  )
}

export default ModalLayout