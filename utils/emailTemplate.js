
function emailTemplate (username,resetLink){
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>[DevDiaries] Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td>
        <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
          <tr>
            <td align="center" style="padding: 10px 0; font-size: 24px; font-weight: bold; color: #333;">
              Password Reset Request
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 10px 0 20px 0;">
              <img src="https://dev-diaries.netlify.app/static/media/login-logo.fb96358b.png" alt="Password Reset" style="width: 150px; height: auto;"/>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #333;">
              <p>Hello ${username},</p>
              <p>We received a request to reset your password. Click the link below to reset your password:</p>
              <p style="text-align: center;">
                <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
              </p>
              <p>If you didn't request a password reset, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; font-size: 12px; color: #999; text-align: center;">
              <p>If you’re having trouble clicking the "Reset Password" button, copy and paste the following link into your browser:</p>
              <p><a href="${resetLink}" style="color: #4CAF50; text-decoration: none;">${resetLink}</a></p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; font-size: 14px; color: #666;">
              <p>Thank you,<br> The Support Team</p>
            </td>
          </tr>
            <tr>
            <td align="center" style="padding: 20px; font-size: 14px; color: #666;">
              <p>If you have any questions or need further assistance, feel free to reach out to us at:</p>
              <p>Email: <a href="mailto:mansi.devsages@gmail.com" style="color: #4CAF50; text-decoration: none;">mansi.devsages@gmail.com</a></p>
              <p>Phone: <a href="tel:+919990839648" style="color: #4CAF50; text-decoration: none;">+919990839648</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export default emailTemplate
