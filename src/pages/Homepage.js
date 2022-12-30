import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Banner from "../components/Banner/Banner";
import ErrorFallback from "../components/ErrorBoundary";
const TabelKoin = React.lazy(() => import("../components/TabelKoin"));

const Homepage = () => {
  return (
    <div>
      <Banner />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset>
        <Suspense fallback={<div>Loading...</div>}>
          <TabelKoin />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Homepage;
