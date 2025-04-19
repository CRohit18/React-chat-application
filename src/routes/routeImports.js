import { lazy } from "react";
export const Dashboard = lazy(() => import("@/modules/dashboard/pages"));
export const Insight_metrics = lazy(() =>
  import("@/modules/insightMetrics/pages/index")
);
export const Insight_metrics_v2 = lazy(() =>
  import("@/modules/insightMetricsV2/pages/index")
);
export const Alert_subscription = lazy(() =>
  import("@/modules/alertSubscription/pages/index")
);
export const Get_usage = lazy(() => import("@/modules/getUsage/pages/index"));

export const _404 = lazy(() => import("@/components/common/_404"));
export const Login = lazy(() => import("@/modules/login/pages"));
export const Profile = lazy(() => import("@/modules/profile/index"));
export const ChangePassword = lazy(() => import("@/modules/profile/components/ChangePassword"));

