import ChevronDown from "apollo-react-icons/ChevronDown";
import ChevronRight from "apollo-react-icons/ChevronRight";
import React, { useState, useEffect } from "react";
import { neutral8 } from "apollo-react/colors";
import IconButton from "apollo-react/components/IconButton";
import Table, {
  compareStrings,
  createStringSearchFilter,
} from "apollo-react/components/Table";
import Tooltip from "apollo-react/components/Tooltip";
import Typography from "apollo-react/components/Typography";
import Header from "./Header";
import Button from "apollo-react/components/Button";
import { DEFAULT, EMAIL_TEMPLATES } from "../../../../constants/app";
import EmailClick from "apollo-react-icons/EmailClick";
import Rocket from "../../../../../img/rocket.svg";
import TextField from "apollo-react/components/TextField";
import { useSelector } from "react-redux";
import Loader from "apollo-react/components/Loader";
import { getSelectedBid } from "../../../../redux/selectors";

const EmailTemplates = () => {
  const { emailTemplatesList, isLoadingEmailTemplates } = useSelector(
    (state) => state.emailTemplates
  );
  const [expandedRows, setExpandedRows] = useState([]);
  const selectedBid = useSelector(getSelectedBid);
  const isCurrentBid = selectedBid.get("isCurrent");

  const handleToggleRow = (EmailTemplateId) => {
    setExpandedRows((expandedRows) =>
      expandedRows.includes(EmailTemplateId)
        ? expandedRows.filter((id) => id !== EmailTemplateId)
        : [...expandedRows, EmailTemplateId]
    );
  };

  const ExpandCell = ({
    row: { EmailTemplateId, handleToggleRow, expanded },
  }) => {
    return (
      <div>
        <IconButton
          id="expand"
          size="small"
          onClick={() => handleToggleRow(EmailTemplateId)}
        >
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </IconButton>
      </div>
    );
  };

  const Cell = ({ row, column }) => (
    <div className={row.expanded ? "activeRow" : ""}>
      {row[column.accessor]}
    </div>
  );

  const TextFieldFilter = ({ accessor, filters, updateFilterValue }) => {
    return (
      <TextField
        value={filters[accessor]}
        name={accessor}
        onChange={updateFilterValue}
        maxWidth={160}
        margin="none"
        size="small"
        style={{ marginTop: 10 }}
      />
    );
  };

  const columns = [
    {
      header: "",
      accessor: "expand",
      customCell: ExpandCell,
    },
    {
      header: "Template",
      accessor: "EmailTemplateName",
      customCell: Cell,
      sortFunction: compareStrings,
      filterFunction: createStringSearchFilter("EmailTemplateName"),
      filterComponent: TextFieldFilter,
    },
    {
      header: "Summary",
      accessor: "EmailTemplateDescription",
      customCell: Cell,
      sortFunction: compareStrings,
      filterFunction: createStringSearchFilter("EmailTemplateDescription"),
      filterComponent: TextFieldFilter,
    },
  ];

  const getEmailsTooltipInfo = (rowInfo) => {
    return rowInfo.map((item, index) => {
      if (item.Type == "EmailGroup") {
        return (
          <span key={index}>
            <Tooltip
              title={EMAIL_TEMPLATES.EMAILS_IN_THIS_GROUP}
              subtitle={item?.GroupValues}
              placement="top"
            >
              <span>
                {index !== 0 && <span>, </span>}
                {item?.GroupName}
              </span>
            </Tooltip>
          </span>
        );
      } else {
        return (
          <span key={index}>
            {index !== 0 && <span>, </span>}
            {item?.Value}
          </span>
        );
      }
    });
  };

  const handleSendEmailClick = (row) => {
    // console.log(row);
  };

  const DetailRow = ({ row }) => {
    return (
      <div className="detailed-row">
        <Typography style={{ fontWeight: 500, color: neutral8 }}>
          {EMAIL_TEMPLATES.PARAMETERS}
        </Typography>
        <Typography style={{ fontSize: 13, color: "#999999" }} variant="body2">
          {EMAIL_TEMPLATES.EMAIL_TEXT}
        </Typography>
        <div style={{ fontSize: 14 }}>
          <div style={{ marginBottom: 4 }}>
            <b>{EMAIL_TEMPLATES.TO}: </b>
            {getEmailsTooltipInfo(row.EmailTemplateTO)}
            {row.EmailTemplateTO.length > 0 && <span>, </span>}
            {row.EmailTemplateTORoles}
          </div>
          <div style={{ marginBottom: 4 }}>
            <b>{EMAIL_TEMPLATES.CC}: </b>
            {getEmailsTooltipInfo(row.EmailTemplateCC)}
            {row.EmailTemplateCC.length > 0 && <span>, </span>}
            {row.EmailTemplateCCRoles}
          </div>
        </div>
        <Typography style={{ fontSize: 14 }}>
          {EMAIL_TEMPLATES.INTERNAL_REQUESTED_SERVICES}
        </Typography>
        <div style={{ fontSize: 14, marginLeft: 20 }}>
          <ul>
            <li>ECOA</li>
            <li>Connected Devices</li>
          </ul>
        </div>
        <div className="email-button">
          <Button
            variant="primary"
            icon={<EmailClick fontSize="extraSmall" />}
            style={{ marginRight: 10 }}
            className="email-btn"
            onClick={() => {
              handleSendEmailClick(row);
            }}
          >
            {DEFAULT.EMAIL}
          </Button>
        </div>
      </div>
    );
  };

  const ExpandableRow = ({ row, ...rest }) => <DetailRow row={row} {...rest} />;

  return (
    <>
      <div id="key-milestone-left-section">
        <div className="key-milestone-header">
          <Header />
        </div>
        <div
          className={
            !isCurrentBid
              ? "email-template-panel disabled"
              : "email-template-panel"
          }
        >
          {isLoadingEmailTemplates && (
            <Loader
              isInner
              size={20}
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          )}
          {emailTemplatesList && emailTemplatesList.length > 0 && (
            <Table
              title={EMAIL_TEMPLATES.EMAIL_TEMPLATES_TITLE}
              columns={columns}
              rows={emailTemplatesList.map((row) => ({
                ...row,
                handleToggleRow,
                expanded: expandedRows.includes(row.EmailTemplateId),
              }))}
              ExpandableComponent={ExpandableRow}
              rowId="EmailTemplateId"
              initialSortOrder="asc"
              initialSortedColumn="EmailTemplateName"
            />
          )}
          {!emailTemplatesList.length && !isLoadingEmailTemplates && (
            <div className="no-data">
              <img
                src={Rocket}
                alt={EMAIL_TEMPLATES.NOEMAIL_TEMPLATES_AVAIABLE_TEXT}
              />
              <Typography variant="body2" style={{ marginTop: 10 }}>
                {EMAIL_TEMPLATES.NOEMAIL_TEMPLATES_AVAIABLE_TEXT}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default EmailTemplates;
