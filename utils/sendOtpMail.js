const nodemailer = require("nodemailer")
const generateOtp = require("./generateOtp")
const sendOtp = async(email, otp) => {
    try {
        const mailTransport = nodemailer.createTransport({
            service:"gmail",
            auth:{
               user:process.env.EMAIL,
                pass:process.env.PWORD
            }
        })
        const mailDetails = {
            from:`${process.env.EMAIL}`,
            to:`${email}`,
            subject:`EMAIL VERIFICATION OTP`,
            html:`<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>EMAIL VERIFICATION</title>
          </head>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                    <tr>
                      <td align="center" style="background-color: #007BFF; padding: 20px; color: #ffffff;">
                        <h2>EMAIL VERIFICATION OTP</h2>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px;">
                        <p style="font-size: 16px; color: #333333;">Hi there,</p>
                        <p style="font-size: 16px; color: #333333;">
                          This is your verification OTP:${otp}
                        </p>
                      
                        <p style="font-size: 14px; color: #555555;">
                          If you did not request this, you can ignore this email.
                        </p>
                        <p style="font-size: 14px; color: #555555;">This OTP is valid for 5 minutes..</p>
                        <p style="font-size: 16px; color: #333333;">Thanks,<br />The kOINSAVE Team</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #f4f4f4; text-align: center; padding: 20px; font-size: 12px; color: #888888;">
                        Koinsave Inc. &middot; Lagos, Nigeria<br />
                        <a href="mailto:support@Koinsave.com" style="color: #007BFF;">Contact Support</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>`
        }
        await mailTransport.sendMail(mailDetails)
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendOtp