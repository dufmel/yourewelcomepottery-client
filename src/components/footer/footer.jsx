import React from 'react'
import MarkunreadIcon from '@mui/icons-material/Markunread';
import "./footer.css"
function Footer() {
  let handleEmail = () => {
    let email = "jonathan.amsalem@gmail.com"
    let mailTo = `mailto:${email}`
    window.location.href = mailTo
  }
  return (
    <div>
      <h2>GET IN TOUCH</h2>
      <h3>Phone Number : 111-111-1111</h3>
      <h3>Location: 309 Plus Park DriveStudio 147, Nashville, TN 37217</h3>
      <h3>Hours of Operations: By Appointment Only</h3>

      <a
        href="javascript:void(
        window.open(
          'https://form.jotform.com/232046323497153',
          'blank',
          'scrollbars=yes,
          toolbar=no,
          width=700,
          height=500'
        )
      )
    "
      >
        Get Our Newsletter!
      </a>
    </div>
  );
}

export default Footer