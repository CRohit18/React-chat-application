import routesConstants from "@/routes/routesConstants";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export const navLinks = [
  {
    name: "Dashboard",
    href: routesConstants?.DASHBOARD,
    iconUrl: <HomeOutlinedIcon />,
  },
  {
    name: "Trisita Customer Success APIs",
    isLabel: true,
    item: [
      {
        itemName: "Insight Metrics",
        href: routesConstants?.INSIGHT_METRICS,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Insight Metrics V2",
        href: routesConstants?.INSIGHT_METRICS_V2,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "ROR/LTC Alert",
        href: routesConstants?.ALERT_SUBSCRIPTION,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Get Usage",
        href: routesConstants?.GET_USAGE,
        iconUrl: <ContactsOutlinedIcon />,
      },
    ],
  },
  {
    name: "Trisita Sales API",
    isLabel: true,
    item: [
      {
        itemName: "Account",
        href: routesConstants?.ACCOUNT,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Add Account",
        href: routesConstants?.ADD_ACCOUNT,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Third Party Account",
        href: routesConstants?.THIRD_PARTY_ACCOUNT,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Opportunity",
        href: routesConstants?.OPPORTUNITY,
        iconUrl: <ContactsOutlinedIcon />,
      },
      {
        itemName: "Quotation",
        href: routesConstants?.QUOTATION,
        iconUrl: <ContactsOutlinedIcon />,
      },
    ],
  },
  {
    name: "Trisita Subscription API",
    isLabel: true,
    item: [
      {
        itemName: "Subscription",
        href: routesConstants?.SUBSCRIPTION,
        iconUrl: <ReceiptOutlinedIcon />,
      },
      {
        itemName: "New Subscription",
        href: routesConstants?.NEW_SUBSCRIPTION,
        iconUrl: <ContactsOutlinedIcon />,
      },
      {
        itemName: "Deleted Subscription",
        href: routesConstants?.DELETED_SUBSCRIPTION,
        iconUrl: <ContactsOutlinedIcon />,
      },
      {
        itemName: "Change Log Comparison",
        href: routesConstants?.CHANGED_LOG_SUBSCRIPTION,
        iconUrl: <ContactsOutlinedIcon />,
      },
      {
        itemName: "Subscription Data Comparison",
        href: routesConstants?.SUBSCRIPTION_DATA_COMPARISON,
        iconUrl: <ContactsOutlinedIcon />,
      },
    ],
  },
  {
    name: "Trisita Order Loading API",
    isLabel: true,
    item: [
      {
        itemName: "Order Loading to HO",
        href: routesConstants?.ORDER_LOADING_PO,
        iconUrl: <BorderAllIcon />,
      },
      {
        itemName: "Order Loading to Distributor",
        href: routesConstants?.ORDER_LOADING_DISTRIBUTOR,
        iconUrl: <ReceiptOutlinedIcon />,
      },
      {
        itemName: "RA Order",
        href: routesConstants?.RA_ORDER,
        iconUrl: <PeopleOutlinedIcon />,
      },
    ],
  },
  {
    name: "Data",
    isLabel: true,
    item: [
      {
        itemName: "Exported File",
        href: routesConstants?.EXPORTED_FILE,
        iconUrl: <Diversity3Icon />,
      },
      {
        itemName: "Product Master",
        href: routesConstants?.PRODUCT_MASTER,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Product",
        href: routesConstants?.PRODUCT,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Run Campaign",
        href: routesConstants?.RUN_CAMPAIGN,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Campaign History",
        href: routesConstants?.CAMPAIGN_HISTORY,
        iconUrl: <PeopleOutlinedIcon />,
      },
      {
        itemName: "Contacts Information",
        href: routesConstants?.CONTACT_INFORMATION,
        iconUrl: <ContactsOutlinedIcon />,
      },
      {
        itemName: "Renew Email History",
        href: routesConstants?.RENEW_HISTORY,
        iconUrl: <ReceiptOutlinedIcon />,
      },
    ],
  },
  {
    name: "Pages",
    isLabel: true,
    item: [
      {
        itemName: "Profile Form",
        href: routesConstants?.PROFILE_FORM,
        iconUrl: <PersonOutlinedIcon />,
      },
      {
        itemName: "Calendar",
        href: routesConstants?.CALENDAR,
        iconUrl: <CalendarTodayOutlinedIcon />,
      },
      {
        itemName: "FAQ Page",
        href: routesConstants?.FAQ,
        iconUrl: <HelpOutlineOutlinedIcon />,
      },
    ],
  },
];
