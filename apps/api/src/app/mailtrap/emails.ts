import { ConfigService } from "@nestjs/config";
import { MailtrapClient } from "mailtrap";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates";

// TODO move those keys to a config file
export const miltrapClint = new MailtrapClient({
  token: "1601c6353be47285d3a42c17d3a7eac2",
});
export const sender = {
  email: "hello@demomailtrap.com",
  name: "=Mailtrap Test",
};
console.log("sender", sender);

// to signup ..
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]; // email : email
  // هذه العمليه لان مكتبه ميلتراب تتوقع مصفوفه

  try {
    const response = await miltrapClint.send({
      from: sender, // email: "hello@demomailtrap.com", //name: "Mailtrap Test",
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verifiction",
    });

    // باختصار قمنا بتعبيه ميلراب المكان المرسل منه والمرسل اليه والقالب
    // response.ok(console.log(verificationToken))
    // console.log("Emile sent successfully" , response ) ;
    console.log("Verification Token:", verificationToken);
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(` consol Error sendig verifiction email `, error);
    throw new Error(` throw Error sendig verifiction email : ${error}`);
  }
};

// to verifyEmail ..
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await miltrapClint.send({
      from: sender,
      to: recipient,
      template_uuid: "ef48c113-34f3-4f6b-a915-0d6d1fc75fcb",
      template_variables: {
        company_info_name: "Test_Company_info_name",
        name: name,
        company_info_address: "Test_Company_info_address",
        company_info_city: "Test_Company_info_city",
        company_info_zip_code: "Test_Company_info_zip_code",
        company_info_country: "Test_Company_info_country",
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

// to forgotPassword
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await miltrapClint.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

// to resetPassword
export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await miltrapClint.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
