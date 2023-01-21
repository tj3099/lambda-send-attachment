const aws = require("aws-sdk");
var ses = new aws.SES({ region: "eu-central-1" });
var mimemessage = require("mimemessage");

function sendMail(subject, body, file, email) {
  var mailContent = mimemessage.factory({
    contentType: "multipart/mixed",
    body: [],
  });
  mailContent.header(
    "From",
    "Stuttgart PRIDE <thomas.jansky@csd-stuttgart.de>"
  );
  mailContent.header("To", email);
  mailContent.header("Cc", "thomas.jansky@csd-stuttgart.de");
  mailContent.header("Subject", subject);
  var alternateEntity = mimemessage.factory({
    contentType: "multipart/alternate",
    body: [],
  });
  var htmlEntity = mimemessage.factory({
    contentType: "text/html;charset=utf-8",
    body: body,
  });
  alternateEntity.body.push(htmlEntity);
  mailContent.body.push(alternateEntity);
  if (!!file) {
    var attachmentEntity = mimemessage.factory({
      contentType: `image/png; name="${file.name}"`,
      contentTransferEncoding: "base64",
      body: file.data,
    });
    attachmentEntity.header(
      "Content-Disposition",
      `attachment ;filename="${file.name}"`
    );
    attachmentEntity.header("Content-Type", `image/png; filename="${file.name}"`);
    attachmentEntity.header("Content-Transfer-Encoding", `base64`);
    attachmentEntity.header("Content-ID", "12345");
    attachmentEntity.header("Content-Location", file.name);
    mailContent.body.push(attachmentEntity);
  }
  return mailContent;
}

exports.handler = async function (event) {
  // console.log(event.mappedData.mail);
  const data = { ...event.mappedData, ...event.bumaData };
  // console.log(data);
  mapData(data);
  // console.log(data);
  const text = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="font: normal 14px / 22px 'Open Sans';
  
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  
  background: #ffffff;
  color: #ffffff;">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=Windows-1252">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deine Anfrage zur CSD-Hocketse 2023</title>
  <style type="text/css">
    @import 'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300';
    @import 'https://fonts.googleapis.com/css?family=Open+Sans:400,300';

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    div,
    p,
    a,
    li,
    td {
      -webkit-text-size-adjust: none;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: inherit !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    @media screen and (max-width: 400px) {
      @-ms-viewport {
        width: device-width;
      }
    }

    @media (min-width: 1100px) {

      /* Horizontal */
      .uk-grid {
        margin-left: -35px;
      }

      .uk-grid>* {
        padding-left: 35px;
      }

      /* Vertical */
      .uk-grid+.uk-grid,
      .uk-grid-margin,
      .uk-grid>*>.uk-panel+.uk-panel {
        margin-top: 50px;
      }
    }

    @media (min-width: 768px) {
      .uk-grid-divider>[class*='uk-width-medium-']:not(.uk-width-medium-1-1):nth-child(n+2) {
        border-left: 1px solid rgba(238, 226, 231, 0);
      }
    }

    @media (min-width: 960px) {
      .uk-grid-divider>[class*='uk-width-large-']:not(.uk-width-large-1-1):nth-child(n+2) {
        border-left: 1px solid rgba(238, 226, 231, 0);
      }
    }

    @media (min-width: 1100px) {

      /*
     * Large gutter
     */
      .uk-grid-divider:not(:empty) {
        margin-left: -35px;
        margin-right: -35px;
      }

      .uk-grid-divider>* {
        padding-left: 35px;
        padding-right: 35px;
      }

      .uk-grid-divider:empty {
        margin-top: 50px;
        margin-bottom: 50px;
      }
    }

    @media (min-width: 480px) {
      .uk-grid-width-small-1-2>* {
        width: 50%;
      }

      .uk-grid-width-small-1-3>* {
        width: 33.333%;
      }

      .uk-grid-width-small-1-4>* {
        width: 25%;
      }

      .uk-grid-width-small-1-5>* {
        width: 20%;
      }

      .uk-grid-width-small-1-6>* {
        width: 16.666%;
      }

      .uk-grid-width-small-1-10>* {
        width: 10%;
      }
    }

    @media (min-width: 768px) {
      .uk-grid-width-medium-1-2>* {
        width: 50%;
      }

      .uk-grid-width-medium-1-3>* {
        width: 33.333%;
      }

      .uk-grid-width-medium-1-4>* {
        width: 25%;
      }

      .uk-grid-width-medium-1-5>* {
        width: 20%;
      }

      .uk-grid-width-medium-1-6>* {
        width: 16.666%;
      }

      .uk-grid-width-medium-1-10>* {
        width: 10%;
      }
    }

    @media (min-width: 960px) {
      .uk-grid-width-large-1-2>* {
        width: 50%;
      }

      .uk-grid-width-large-1-3>* {
        width: 33.333%;
      }

      .uk-grid-width-large-1-4>* {
        width: 25%;
      }

      .uk-grid-width-large-1-5>* {
        width: 20%;
      }

      .uk-grid-width-large-1-6>* {
        width: 16.666%;
      }

      .uk-grid-width-large-1-10>* {
        width: 10%;
      }
    }

    @media (min-width: 1100px) {
      .uk-grid-width-xlarge-1-2>* {
        width: 50%;
      }

      .uk-grid-width-xlarge-1-3>* {
        width: 33.333%;
      }

      .uk-grid-width-xlarge-1-4>* {
        width: 25%;
      }

      .uk-grid-width-xlarge-1-5>* {
        width: 20%;
      }

      .uk-grid-width-xlarge-1-6>* {
        width: 16.666%;
      }

      .uk-grid-width-xlarge-1-10>* {
        width: 10%;
      }
    }

    @media (min-width: 480px) {

      /* Whole */
      .uk-width-small-1-1 {
        width: 100%;
      }

      /* Halves */
      .uk-width-small-1-2,
      .uk-width-small-2-4,
      .uk-width-small-3-6,
      .uk-width-small-5-10 {
        width: 50%;
      }

      /* Thirds */
      .uk-width-small-1-3,
      .uk-width-small-2-6 {
        width: 33.333%;
      }

      .uk-width-small-2-3,
      .uk-width-small-4-6 {
        width: 66.666%;
      }

      /* Quarters */
      .uk-width-small-1-4 {
        width: 25%;
      }

      .uk-width-small-3-4 {
        width: 75%;
      }

      /* Fifths */
      .uk-width-small-1-5,
      .uk-width-small-2-10 {
        width: 20%;
      }

      .uk-width-small-2-5,
      .uk-width-small-4-10 {
        width: 40%;
      }

      .uk-width-small-3-5,
      .uk-width-small-6-10 {
        width: 60%;
      }

      .uk-width-small-4-5,
      .uk-width-small-8-10 {
        width: 80%;
      }

      /* Sixths */
      .uk-width-small-1-6 {
        width: 16.666%;
      }

      .uk-width-small-5-6 {
        width: 83.333%;
      }

      /* Tenths */
      .uk-width-small-1-10 {
        width: 10%;
      }

      .uk-width-small-3-10 {
        width: 30%;
      }

      .uk-width-small-7-10 {
        width: 70%;
      }

      .uk-width-small-9-10 {
        width: 90%;
      }
    }

    @media (min-width: 768px) {

      /* Whole */
      .uk-width-medium-1-1 {
        width: 100%;
      }

      /* Halves */
      .uk-width-medium-1-2,
      .uk-width-medium-2-4,
      .uk-width-medium-3-6,
      .uk-width-medium-5-10 {
        width: 50%;
      }

      /* Thirds */
      .uk-width-medium-1-3,
      .uk-width-medium-2-6 {
        width: 33.333%;
      }

      .uk-width-medium-2-3,
      .uk-width-medium-4-6 {
        width: 66.666%;
      }

      /* Quarters */
      .uk-width-medium-1-4 {
        width: 25%;
      }

      .uk-width-medium-3-4 {
        width: 75%;
      }

      /* Fifths */
      .uk-width-medium-1-5,
      .uk-width-medium-2-10 {
        width: 20%;
      }

      .uk-width-medium-2-5,
      .uk-width-medium-4-10 {
        width: 40%;
      }

      .uk-width-medium-3-5,
      .uk-width-medium-6-10 {
        width: 60%;
      }

      .uk-width-medium-4-5,
      .uk-width-medium-8-10 {
        width: 80%;
      }

      /* Sixths */
      .uk-width-medium-1-6 {
        width: 16.666%;
      }

      .uk-width-medium-5-6 {
        width: 83.333%;
      }

      /* Tenths */
      .uk-width-medium-1-10 {
        width: 10%;
      }

      .uk-width-medium-3-10 {
        width: 30%;
      }

      .uk-width-medium-7-10 {
        width: 70%;
      }

      .uk-width-medium-9-10 {
        width: 90%;
      }
    }

    @media (min-width: 960px) {

      /* Whole */
      .uk-width-large-1-1 {
        width: 100%;
      }

      /* Halves */
      .uk-width-large-1-2,
      .uk-width-large-2-4,
      .uk-width-large-3-6,
      .uk-width-large-5-10 {
        width: 50%;
      }

      /* Thirds */
      .uk-width-large-1-3,
      .uk-width-large-2-6 {
        width: 33.333%;
      }

      .uk-width-large-2-3,
      .uk-width-large-4-6 {
        width: 66.666%;
      }

      /* Quarters */
      .uk-width-large-1-4 {
        width: 25%;
      }

      .uk-width-large-3-4 {
        width: 75%;
      }

      /* Fifths */
      .uk-width-large-1-5,
      .uk-width-large-2-10 {
        width: 20%;
      }

      .uk-width-large-2-5,
      .uk-width-large-4-10 {
        width: 40%;
      }

      .uk-width-large-3-5,
      .uk-width-large-6-10 {
        width: 60%;
      }

      .uk-width-large-4-5,
      .uk-width-large-8-10 {
        width: 80%;
      }

      /* Sixths */
      .uk-width-large-1-6 {
        width: 16.666%;
      }

      .uk-width-large-5-6 {
        width: 83.333%;
      }

      /* Tenths */
      .uk-width-large-1-10 {
        width: 10%;
      }

      .uk-width-large-3-10 {
        width: 30%;
      }

      .uk-width-large-7-10 {
        width: 70%;
      }

      .uk-width-large-9-10 {
        width: 90%;
      }
    }

    @media (min-width: 768px) {

      [class*='uk-push-'],
      [class*='uk-pull-'] {
        position: relative;
      }

      /*
     * Push
     */
      /* Halves */
      .uk-push-1-2,
      .uk-push-2-4,
      .uk-push-3-6,
      .uk-push-5-10 {
        left: 50%;
      }

      /* Thirds */
      .uk-push-1-3,
      .uk-push-2-6 {
        left: 33.333%;
      }

      .uk-push-2-3,
      .uk-push-4-6 {
        left: 66.666%;
      }

      /* Quarters */
      .uk-push-1-4 {
        left: 25%;
      }

      .uk-push-3-4 {
        left: 75%;
      }

      /* Fifths */
      .uk-push-1-5,
      .uk-push-2-10 {
        left: 20%;
      }

      .uk-push-2-5,
      .uk-push-4-10 {
        left: 40%;
      }

      .uk-push-3-5,
      .uk-push-6-10 {
        left: 60%;
      }

      .uk-push-4-5,
      .uk-push-8-10 {
        left: 80%;
      }

      /* Sixths */
      .uk-push-1-6 {
        left: 16.666%;
      }

      .uk-push-5-6 {
        left: 83.333%;
      }

      /* Tenths */
      .uk-push-1-10 {
        left: 10%;
      }

      .uk-push-3-10 {
        left: 30%;
      }

      .uk-push-7-10 {
        left: 70%;
      }

      .uk-push-9-10 {
        left: 90%;
      }

      /*
     * Pull
     */
      /* Halves */
      .uk-pull-1-2,
      .uk-pull-2-4,
      .uk-pull-3-6,
      .uk-pull-5-10 {
        left: -50%;
      }

      /* Thirds */
      .uk-pull-1-3,
      .uk-pull-2-6 {
        left: -33.333%;
      }

      .uk-pull-2-3,
      .uk-pull-4-6 {
        left: -66.666%;
      }

      /* Quarters */
      .uk-pull-1-4 {
        left: -25%;
      }

      .uk-pull-3-4 {
        left: -75%;
      }

      /* Fifths */
      .uk-pull-1-5,
      .uk-pull-2-10 {
        left: -20%;
      }

      .uk-pull-2-5,
      .uk-pull-4-10 {
        left: -40%;
      }

      .uk-pull-3-5,
      .uk-pull-6-10 {
        left: -60%;
      }

      .uk-pull-4-5,
      .uk-pull-8-10 {
        left: -80%;
      }

      /* Sixths */
      .uk-pull-1-6 {
        left: -16.666%;
      }

      .uk-pull-5-6 {
        left: -83.333%;
      }

      /* Tenths */
      .uk-pull-1-10 {
        left: -10%;
      }

      .uk-pull-3-10 {
        left: -30%;
      }

      .uk-pull-7-10 {
        left: -70%;
      }

      .uk-pull-9-10 {
        left: -90%;
      }
    }

    @media (min-width: 1100px) {
      .uk-panel+.uk-panel-divider {
        margin-top: 70px !important;
      }

      .uk-panel+.uk-panel-divider:before {
        top: -35px;
      }
    }

    @media (min-width: 768px) {
      .uk-block {
        padding-top: 50px;
        padding-bottom: 50px;
      }
    }

    @media (min-width: 768px) {
      .uk-block-large {
        padding-top: 50px;
        padding-bottom: 50px;
      }
    }

    @media (min-width: 960px) {
      .uk-block-large {
        padding-top: 100px;
        padding-bottom: 100px;
      }
    }

    @media (min-width: 768px) {
      .uk-comment-list .uk-comment+ul {
        padding-left: 100px;
      }
    }

    @media (min-width: 768px) {

      .uk-tab-left,
      .uk-tab-right {
        border-bottom: none;
      }

      .uk-tab-left>li,
      .uk-tab-right>li {
        margin-bottom: 0;
        float: none;
      }

      .uk-tab-left>li>a,
      .uk-tab-right>li>a {
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .uk-tab-left>li:nth-child(n+2)>a,
      .uk-tab-right>li:nth-child(n+2)>a {
        margin-left: 0;
        margin-top: 5px;
      }

      .uk-tab-left>li.uk-active>a,
      .uk-tab-right>li.uk-active>a {
        border-color: rgba(238, 226, 231, 0);
      }

      /*
     * Modifier: 'tab-left'
     */
      .uk-tab-left {
        border-right: 1px solid rgba(238, 226, 231, 0);
      }

      .uk-tab-left>li {
        margin-right: -1px;
      }

      .uk-tab-left>li>a {
        border-bottom-width: 1px;
        border-right-width: 0;
      }

      .uk-tab-left>li:not(.uk-active)>a:hover,
      .uk-tab-left>li:not(.uk-active)>a:focus {
        margin-bottom: 0;
        margin-right: 1px;
        padding-bottom: 8px;
        padding-right: 11px;
      }

      .uk-tab-left>li.uk-active>a {
        border-right-color: transparent;
      }

      /*
     * Modifier: 'tab-right'
     */
      .uk-tab-right {
        border-left: 1px solid rgba(238, 226, 231, 0);
      }

      .uk-tab-right>li {
        margin-left: -1px;
      }

      .uk-tab-right>li>a {
        border-bottom-width: 1px;
        border-left-width: 0;
      }

      .uk-tab-right>li:not(.uk-active)>a:hover,
      .uk-tab-right>li:not(.uk-active)>a:focus {
        margin-bottom: 0;
        margin-left: 1px;
        padding-bottom: 8px;
        padding-left: 11px;
      }

      .uk-tab-right>li.uk-active>a {
        border-left-color: transparent;
      }
    }

    @media (min-width: 768px) {
      .uk-description-list-horizontal {
        overflow: hidden;
      }

      .uk-description-list-horizontal>dt {
        width: 160px;
        float: left;
        clear: both;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .uk-description-list-horizontal>dd {
        margin-left: 180px;
      }
    }

    /*
 * Improves readability when focused and also mouse hovered in all browsers.
 */
    a,
    a:hover {
      outline: 0;
    }

    a:hover,
    .uk-link:hover {
      color: #9e1981;
      text-decoration: underline;
    }

    /*
 * Allow panels to be anchors
 */
    .uk-panel,
    .uk-panel:hover {
      text-decoration: none;
    }

    .uk-panel-box-hover:hover {
      color: #444444;
    }

    .uk-panel-box-primary-hover:hover {
      color: #444444;
    }

    .uk-panel-box-secondary-hover:hover {
      color: #ffffff;
    }

    .uk-panel-hover:hover {
      background: #f5f5f5;
      color: #444444;
    }

    /*
 * Hover
 * 1. Apply hover style also to focus state
 * 2. Remove default focus style
 */
    .uk-nav-side>li>a:hover,
    .uk-nav-side>li>a:focus {
      background: rgba(0, 0, 0, 0.05);
      color: #ffffff;
      /* 2 */
      outline: none;
    }

    .uk-nav-side ul a:hover {
      color: #222222;
    }

    /*
 * Hover
 * 1. Apply hover style also to focus state
 * 2. Remove default focus style
 */
    .uk-nav-dropdown>li>a:hover,
    .uk-nav-dropdown>li>a:focus {
      background: #005ca9;
      color: #ffffff;
      /* 2 */
      outline: none;
    }

    .uk-nav-dropdown ul a:hover {
      color: #222222;
    }

    /*
 * Hover
 * 1. Apply hover style also to focus state
 * 2. Remove default focus style
 */
    .uk-nav-navbar>li>a:hover,
    .uk-nav-navbar>li>a:focus {
      background: #005ca9;
      color: #ffffff;
      /* 2 */
      outline: none;
    }

    .uk-nav-navbar ul a:hover {
      color: #222222;
    }

    /*
 * Hover
 * No hover on touch devices because it behaves buggy in fixed offcanvas
 * 1. Apply hover style also to focus state
 * 2. Remove default focus style
 */
    .uk-nav-offcanvas>.uk-open>a,
    html:not(.uk-touch) .uk-nav-offcanvas>li>a:hover,
    html:not(.uk-touch) .uk-nav-offcanvas>li>a:focus {
      background: #404040;
      color: #ffffff;
      /* 2 */
      outline: none;
    }

    html:not(.uk-touch) .uk-nav-offcanvas ul a:hover {
      color: #ffffff;
    }

    /*
 * Hover
 * 1. Apply hover style also to focus state
 * 2. Also apply if dropdown is opened
 * 3. Remove default focus style
 */
    .uk-navbar-nav>li:hover>a,
    .uk-navbar-nav>li>a:focus,
    .uk-navbar-nav>li.uk-open>a {
      background-color: #005ca9;
      color: #ffffff;
      /* 3 */
      outline: none;
    }

    .uk-navbar-content>a:not([class]):hover {
      color: #222222;
    }

    /*
 * 1. Apply hover style also to focus state
 * 2. Remove default focus style
 */
    .uk-navbar-brand:hover,
    .uk-navbar-brand:focus {
      color: #ffffff;
      text-decoration: none;
      /* 2 */
      outline: none;
    }

    /*
 * 1. Apply hover style also to focus state
 * 2. Remove default focus style
 */
    .uk-navbar-toggle:hover,
    .uk-navbar-toggle:focus {
      color: #ffffff;
      text-decoration: none;
      /* 2 */
      outline: none;
    }

    /*
 * Hover
 * 1. Apply hover style also to focus state
 */
    .uk-subnav>*> :hover,
    .uk-subnav>*> :focus {
      color: #005ca9;
      text-decoration: none;
    }

    /*
 * Hover
 * 1. Apply hover style also to focus state
 * 2. Remove default focus style
 */
    .uk-subnav-pill>*> :hover,
    .uk-subnav-pill>*> :focus {
      background: #eeeeee;
      color: #ffffff;
      text-decoration: none;
      /* 2 */
      outline: none;
    }

    /*
 * Hover
 * 1. Apply hover style also to focus state
 * 2. Remove default focus style
 */
    .uk-pagination>li>a:hover,
    .uk-pagination>li>a:focus {
      background-color: #f5f5f5;
      color: #ffffff;
      /* 2 */
      outline: none;
    }

    /*
 * Hover
 * 1. Apply hover style also to focus state
 * 2. Also apply if dropdown is opened
 * 3. Remove default focus style
 */
    .uk-tab>li>a:hover,
    .uk-tab>li>a:focus,
    .uk-tab>li.uk-open>a {
      border-color: #f5f5f5;
      background: #f5f5f5;
      color: #222222;
      /* 2 */
      outline: none;
    }

    .uk-tab>li.uk-disabled>a:hover,
    .uk-tab>li.uk-disabled>a:focus,
    .uk-tab>li.uk-disabled.uk-active>a {
      background: none;
      border-color: transparent;
    }

    .uk-tab-bottom>li:not(.uk-active)>a:hover,
    .uk-tab-bottom>li:not(.uk-active)>a:focus,
    .uk-tab-bottom>li.uk-open:not(.uk-active)>a {
      margin-bottom: 0;
      margin-top: 1px;
      padding-bottom: 8px;
      padding-top: 7px;
    }

    /*
 * Hover
 */
    .uk-thumbnav>*> :hover>img,
    .uk-thumbnav>*> :focus>img {
      opacity: 1;
    }

    /* Modifier: uk-table-hover
 ========================================================================== */
    .uk-table-hover tbody tr:hover {
      background: #eeeeee;
    }

    h1 {
      color: #9e1981;
    }

    h2 {
      color: #9e1981;
    }

    h3 {
      color: #9e1981;
    }

    h4 {
      color: #9e1981;
    }

    h5 {
      color: #9e1981;
    }

    h6 {
      color: #9e1981;
    }

    a:visited {
      color: #9e1981
    }
  </style>
</head>

<body yahoo="fix" style="margin: 0;">
  <div align="center" style="font-family:'Open Sans Condensed', 'Franklin Gothic Book',
Arial;width:100%;background-color:#FFFFFF;padding-bottom:20px;color:#1b181c;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="w600" style="font-family:'Open Sans Condensed', 'Franklin Gothic Book',
Arial;background-color:#ffffff;color:#1b181c;margin:auto;width:600px;">

      <tr>
        <td class="w600" colspan="3" height="16" width="600"
          style="font-family: 'Open Sans Condensed', 'Franklin Gothic Book', Arial;"></td>
      </tr>
      <tr>
        <td class="w30"
          style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;background-color:#ffffff;width:30px;height:32px;">
        </td>
        <td class="links w540" style="font-family:'Open Sans Condensed', 'Franklin Gothic Book',
Arial;background-color:#ffffff;text-align:right;width:540px;"></td>
        <td class="w30"
          style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;background-color:#ffffff;width:30px;height:32px;">
        </td>
      </tr>
      <tr>
        <td class="w30" width="30" style="font-family: 'Open Sans Condensed', 'Franklin Gothic Book', Arial;"></td>
        <td class="w540 pict" width="540" style="font-family: 'Open Sans Condensed', 'Franklin Gothic Book', Arial;">
          <h3 style="color:#444444;margin:0 0 15px 0;font-family:'Open Sans
Condensed';font-weight:300;text-transform:uppercase;font-size:24px;line-height:30px;">
            <br>
            Deine Anfrage zur CSD-Hocketse 2023
          </h3>

          <p style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;margin:0 0 15px 0;"><br>
            Hallo ${data.name},<br><br>
            am <b>29. und 30. Juli 2023</b> findet die <a href="https://www.stuttgart-pride.de"
              target="_blank">CSD-Hocketse</a> auf
            Markt- und Schillerplatz sowie in der Kirch- und Stiftstra&szlig;e statt. Wir, die <a
              href="https://www.stuttgart-pride.de/verein/igcsdstuttgart" target="_blank">IG CSD Stuttgart e.V.</a>,
            vergeben
            Standfl&auml;chen f&uuml;r <b>Gastronomie</b>, <b>Information</b> und <b>Promotion</b> beziehungsweise
            <b>Verkauf</b>.<br><br>Die
            Fl&auml;chen werden auf eigenes Risiko betreiben. Zur Ausgestaltung der St&auml;nde gelten folgende
            <b>Rahmenbedingungen</b>:<br><br><a
              href="https://www.stuttgart-pride.de/files/event/2023_CSD-Hocketse_GastroPromotion.pdf"
              target="_blank">Organisatorische Details f&uuml;r Gastro-St&auml;nde</a> (<a
              href="https://www.stuttgart-pride.de/files/event/2023_CSD-Hocketse_GastroPromotion.pdf"
              target="_blank">PDF</a>),
            u.a. Preisbindung, Pfand, Exklusivit&auml;ten, zentrale Listungen, Zentraleinkauf etc.<br><br><a
              href="https://www.stuttgart-pride.de/files/event/2023_CSD-Hocketse_Infostaende.pdf"
              target="_blank">Organisatorische
              Details f&uuml;r Infost&auml;nde</a> (<a
              href="https://www.stuttgart-pride.de/files/event/2023_CSD-Hocketse_Infostaende.pdf"
              target="_blank">PDF</a>), u.a. Standfl&auml;che, Standgeb&uuml;hren, Auf-/Abbau, Rotationssystem etc.<br><br>Via
            Onlineformular auf der CSD-Webseite wurde soeben eine <b>Bewerbung f&uuml;r einen Standplatz</b> eingereicht. Das
            ehrenamtliche <a href="https://www.stuttgart-pride.de/verein/orgateam"
              target="_blank">CSD-Organisationsteam</a> meldet
            sich zeitnah mit einem konkreten Angebot bzw. mit weiteren Informationen.<br><br>Folgende Daten gingen beim
            CSD-Verein
            ein:<br><br>
          <table>
            <tr>
              <td>Organisation/Firma</td>
              <td>${data.company ?? ''}</td>
            </tr>
            <tr>
              <td>Ansprechperson</td>
              <td>${data.name ?? ''}</td>
            </tr>
            <tr>
              <td>Stra&szlig;e</td>
              <td>${data.street ?? ''}</td>
            </tr>
            <tr>
              <td>PLZ</td>
              <td>${data.postcode ?? ''}</td>
            </tr>
            <tr>
              <td>Ort</td>
              <td>${data.city ?? ''}</td>
            </tr>
            <tr>
              <td>E-Mail</td>
              <td>${data.mail ?? ''}</td>
            </tr>
            <tr>
              <td>Telefon</td>
              <td>${data.phone ?? ''}</td>
            </tr>
            <tr>
              <td>RE-Adresse Name</td>
              <td>${data.nameRE ?? ''}</td>
            </tr>
            <tr>
              <td>RE-Adresse Stra&szlig;e</td>
              <td>${data.streetRE ?? ''}</td>
            </tr>
            <tr>
              <td>RE-Adresse PLZ</td>
              <td>${data.postcodeRE ?? ''}</td>
            </tr>
            <tr>
              <td>RE-Adresse Ort</td>
              <td>${data.cityRE ?? ''}</td>
            </tr>
            <tr>
              <td>Art des Standes</td>
              <td>${data.kindOf ?? ''}</td>
            </tr>
            <tr>
              <td>Art der Organisation</td>
              <td>${data.kindOfOrg ?? ''}</td>
            </tr>
            <tr>
              <td>Getr&auml;nkeangebot</td>
              <td>${data.drinks ?? ''}</td>
            </tr>
            <tr>
              <td>L&auml;nge der Mietfl&auml;che</td>
              <td>${data.length} Meter</td>
            </tr>
            <tr>
              <td>Tiefe der Mietfl&auml;che</td>
              <td>${data.depth} Meter</td>
            </tr>
            <tr>
              <td> </td>
              <td>Bitte beachten: Bei den Meter-Angaben zur Mietfl&auml;che handelt es sich um die Gesamtfl&auml;che, inklusive
                Klappen,
                Deichseln, Zugangswegen, T&uuml;rbereichen, Abstellfl&auml;chen, Stehtischen, Werbeaufstellern, eigene
                Bewirtungsbereichen und/oder Sitzgelegenheiten etc.</td>
            </tr>
            <tr>
              <td>Stromanschluss</td>
              <td>${data.electricity ?? ''}</td>
            </tr>
            <tr>
              <td>Wasseranschluss</td>
              <td>${data.water ?? ''}</td>
            </tr>
            <tr>
              <td>Eigener Gasanschluss</td>
              <td>${data.gas ?? ''}</td>
            </tr>
            <tr>
              <td>Eigener K&uuml;hlwagen (PKW-Anh&auml;nger)</td>
              <td>${data.refrigeratedTruck ?? ''}</td>
            </tr>
            <tr>
              <td>Kommentar</td>
              <td>${data.comment ?? ''}</td>
            </tr>
          </table>
          Viele Gr&uuml;&szlig;e<br>
          &nbsp;<br>
          Das Team von Stuttgart PRIDE<br>
          &nbsp;
          </p>
        </td>
        <td class="w30"
          style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;background-color:#ffffff;width:30px;">
        </td>
      </tr>
      <tr>
        <td class="w600" colspan="3"
          style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;width:600px;height:16px;"></td>
      </tr>
      <tr>
        <td class="w30"
          style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;background-color:#ffffff;width:30px;height:30px;">
        </td>
        <td class="w540" style="font-family:'Open Sans Condensed', 'Franklin Gothic Book',
Arial;background-color:#ffffff;text-align:left;width:540px;height:30px;" valign="bottom">
          <p
            style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;margin:0 0 15px 0;text-align:left;">
            <a href="https://www.stuttgart-pride.de/impressum-ig-csd-stuttgart" target="_blank"
              style="color:#9e1981;background:transparent;text-decoration:none;cursor:pointer;">Impressum</a><br>
            <a href="https://www.stuttgart-pride.de/datenschutzerklarung"
              style="color:#9e1981;background:transparent;text-decoration:none;cursor:pointer;">Datenschutzerkl&auml;rung</a>
          </p>
        </td>
        <td class="w30"
          style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;background-color:#ffffff;width:30px;height:30px;">
        </td>
      </tr>
      <tr>
        <td class="w600" colspan="3" style="font-family:'Open Sans Condensed', 'Franklin Gothic Book',
Arial;line-height:0px;background-color:#ffffff;width:600px;"></td>
      </tr>
      <tr>
        <td class="w600" colspan="3" style="font-family:'Open Sans Condensed', 'Franklin Gothic Book',
Arial;line-height:0px;background-color:#1b181c;width:600px;" valign="bottom"></td>
      </tr>
      <tr>
        <td class="w30" style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;width:30px;"></td>
        <td class="w540"
          style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;color:#000000;text-align:left;width:540px;">
        </td>
        <td class="w30" style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;width:30px;"></td>
      </tr>

    </table>
  </div>
  <div
    style="font-family:'Open Sans Condensed', 'Franklin Gothic Book', Arial;position:absolute;left:-9999px;top:-9999px;">
  </div>
</body>
</html>`;
  const file = {
    name: event.file?.name,
    data: event.file?.data,
  };
  const prepedMail = sendMail(
    "Vielen dank für deine Anfrage zur CSD-Hocketse",
    text,
    file,
    event.mappedData.mail
  );
  const response = await ses
    .sendRawEmail({
      RawMessage: { Data: prepedMail.toString() },
    })
    .promise();

  console.log("###", response);
  return { statusCode: 200 };
};

function mapData(data) {
  const KIND_OF_MAP = {
    info: "Infostand",
    gastro: "Gastronomie",
    promo: "Promotion",
  };

  const KIND_OF_ORG_MAP = {
    party: "Partei",
    society: "Verein",
    company: "Unternehmen",
  };

  const TRUE_FALSE_MAP = { true: "Ja", false: "Nein", undefined: "Nein" };
  const ELECRICITY_MAP = {
    false: "Nein",
    undefined: "Nein",
    "230v": "230 V",
    "400V/16A": "CEE 400 V / 16 A",
    "400V/32A": "CEE 400 V / 32 A",
    "2x230v": "2x 230 V",
    "2x400V/16A": "2x CEE 400 V / 16 A",
    "2x400V/32A": "2x CEE 400 V / 32 A",
  };
  const DAYS_MAP = {
    sunday: "Sonntag, 30.07.2023",
    both: "Samstag und Sonntag, 29.07. und 30.07.2023",
  };
  const DRINK_MAP = {
    beer: "Bier",
    wine: "Wein/Sekt",
    energy: "Energey",
    softdrinks: "Softdrinks",
    cocktail: "Cocktails / Longdrinks",
  };

  data.kindOf = KIND_OF_MAP[data.kindOf];
  data.kindOfOrg = KIND_OF_ORG_MAP[data.kindOfOrg];
  data.gas = TRUE_FALSE_MAP[data.gas];
  data.water = TRUE_FALSE_MAP[data.water];
  data.refrigeratedTruck = TRUE_FALSE_MAP[data.refrigeratedTruck];
  data.electricity = ELECRICITY_MAP[data.electricity];
  data.days = DAYS_MAP[data.days];
  data?.drinks?.map((drink) => DRINK_MAP[drink]);
}
