import routesConstants from "./routesConstants";
import {
  _404,
  Dashboard,
  Login,
  Insight_metrics,
  Insight_metrics_v2,
  Alert_subscription,
  Get_usage,
  Profile,
  ChangePassword,
} from "./routeImports";

const routesConfig = {
  common: [{ path: routesConstants._404, component: _404 }],
  private: [
    {
      path: routesConstants.DASHBOARD,
      component: Dashboard,
    },
    {
      path: routesConstants.INSIGHT_METRICS,
      component: Insight_metrics,
    },
    {
      path: routesConstants.INSIGHT_METRICS_V2,
      component: Insight_metrics_v2,
    },
    {
      path: routesConstants.ALERT_SUBSCRIPTION,
      component: Alert_subscription,
    },
    {
      path: routesConstants.GET_USAGE,
      component: Get_usage,
    },
    {
      path: routesConstants.ACCOUNT,
      component: Dashboard,
    },
    {
      path: routesConstants.ADD_ACCOUNT,
      component: Dashboard,
    },
    {
      path: routesConstants.THIRD_PARTY_ACCOUNT,
      component: Dashboard,
    },
    {
      path: routesConstants.OPPORTUNITY,
      component: Dashboard,
    },
    {
      path: routesConstants.QUOTATION,
      component: Dashboard,
    },
    {
      path: routesConstants.SUBSCRIPTION,
      component: Dashboard,
    },
    {
      path: routesConstants.NEW_SUBSCRIPTION,
      component: Dashboard,
    },
    {
      path: routesConstants.DELETED_SUBSCRIPTION,
      component: Dashboard,
    },
    {
      path: routesConstants.CHANGED_LOG_SUBSCRIPTION,
      component: Dashboard,
    },
    {
      path: routesConstants.SUBSCRIPTION_DATA_COMPARISON,
      component: Dashboard,
    },
    {
      path: routesConstants.ORDER_LOADING_PO,
      component: Dashboard,
    },
    {
      path: routesConstants.ORDER_LOADING_DISTRIBUTOR,
      component: Dashboard,
    },
    {
      path: routesConstants.RA_ORDER,
      component: Dashboard,
    },
    {
      path: routesConstants.EXPORTED_FILE,
      component: Dashboard,
    },
    {
      path: routesConstants.PRODUCT_MASTER,
      component: Dashboard,
    },
    {
      path: routesConstants.PRODUCT,
      component: Dashboard,
    },
    {
      path: routesConstants.RUN_CAMPAIGN,
      component: Dashboard,
    },
    {
      path: routesConstants.CAMPAIGN_HISTORY,
      component: Dashboard,
    },
    {
      path: routesConstants.CAMPAIGN_HISTORY,
      component: Dashboard,
    },
    {
      path: routesConstants.CONTACT_INFORMATION,
      component: Dashboard,
    },
    {
      path: routesConstants.RENEW_HISTORY,
      component: Dashboard,
    },
    {
      path: routesConstants.PROFILE_FORM,
      component: Dashboard,
    },
    {
      path: routesConstants.CALENDAR,
      component: Dashboard,
    },
    {
      path: routesConstants.FAQ,
      component: Dashboard,
    },
    {
      path: routesConstants.PROFILE + `/:id`,
      component: Profile,
    },
    {
      path: routesConstants?.CHANGE_PASSWORD,
      component: ChangePassword,
    },
  ],
  public: [{ path: routesConstants?.LOGIN, component: Login }],
};

export default routesConfig;
