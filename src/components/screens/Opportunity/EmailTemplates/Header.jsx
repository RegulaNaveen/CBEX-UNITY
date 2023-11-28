import Typography from "apollo-react/components/Typography";
import React from "react";
import { EMAIL_TEMPLATES } from "../../../../constants/app";

const Header = () => {
  return (
    <>
      <Typography variant="h3">{EMAIL_TEMPLATES.EMAIL_TEMPLATES_TITLE}</Typography>
      <hr style={{ marginTop: "15px" }} className="key-milestone-divider-hr" />
    </>
  );
};

export default Header;
