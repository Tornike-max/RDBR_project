import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/system";
import CreateRealEstateContext from "./context/CreateRealEstateContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CreateRealEstateContext>
        <NextUIProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <App />
        </NextUIProvider>
      </CreateRealEstateContext>
    </QueryClientProvider>
  </StrictMode>
);
