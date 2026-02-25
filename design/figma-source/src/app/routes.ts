import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { GovernanceHub } from "./pages/GovernanceHub";
import { CorporatePortal } from "./pages/CorporatePortal";
import { ProfessionalPortal } from "./pages/ProfessionalPortal";
import { AIGovernanceIndex } from "./pages/AIGovernanceIndex";
import { Disclosures } from "./pages/Disclosures";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "governance-hub", Component: GovernanceHub },
      { path: "corporate-portal", Component: CorporatePortal },
      { path: "professional-portal", Component: ProfessionalPortal },
      { path: "ai-governance-index", Component: AIGovernanceIndex },
      { path: "disclosures", Component: Disclosures },
      { path: "*", Component: NotFound },
    ],
  },
]);
