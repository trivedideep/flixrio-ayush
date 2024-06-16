import React from 'react'
import { Modal, Box, Typography } from '@mui/material'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '4px ridge purple',
  // borderradius: '5px',
  boxShadow: 24,
p: 4,
  background:'#15171E',
};

const VideoPlayer = ({path,thumbnail, open , setOpen}) => {
  return (
    <Modal
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
      >
          {/* <video id="my-video" class="video-js" controls preload="auto" width="600" height="400" poster={`http://localhost:8080/${thumbnail}`}>
              <source src={`http://localhost:8080/${path}`} type="video/mp4" />
        </video> */}
          <Box sx={style}>
           <video id="my-video" controls preload="auto" width="600" height="400" poster={`http://localhost:8080/${thumbnail}`}>
              <source src={`http://localhost:8080/${path}`} type="video/mp4" />
        </video>
        </Box>
</Modal>
  )
}

export default VideoPlayer