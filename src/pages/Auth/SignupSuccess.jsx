import { Helmet } from "react-helmet";
import SuccessCard from "../../components/Main/SuccessCard";

export default function SignupSuccess() {
  return (
    <div>
      <Helmet>
        <title>Account Created</title>
      </Helmet>

      <SuccessCard
        status="success"
        message="Signed up successfully!"
        buttonText="Go to Gmail"
        buttonLink="https://mail.google.com/mail/u/0/#inbox"
      />
    </div>
  );
}
