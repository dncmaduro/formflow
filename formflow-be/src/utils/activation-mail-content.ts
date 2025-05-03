export function activationEmailTemplate(username: string, activationLink: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f7f7f7; border-radius: 10px;">
      <h2 style="color: #4c1d95; text-align: center;">Welcome to FormFlow 🚀</h2>
      <p>Hi <strong>${username}</strong>,</p>
      <p>Thanks for signing up! Please activate your account by clicking the button below:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${activationLink}" style="background-color: #4c1d95; color: #ffffff; padding: 12px 24px; border-radius: 5px; text-decoration: none; display: inline-block;">
          Activate Account
        </a>
      </div>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all;">${activationLink}</p>
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #777;">If you didn't create a FormFlow account, please ignore this email.</p>
    </div>
  `;
}
