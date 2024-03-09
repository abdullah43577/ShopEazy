"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "../store";

const paths = ["/register", "/login"];

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  const isRegisterOrLogin = paths.some((path) => path === pathname);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {!isRegisterOrLogin && <Header />}
        {children}
        <ReactQueryDevtools />
        {!isRegisterOrLogin && <Footer />}
      </QueryClientProvider>
    </Provider>
  );
}
