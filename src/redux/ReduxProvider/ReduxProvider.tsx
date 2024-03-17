"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "../store";

const paths = ["/register", "/login", "/profile", "/checkout"];

interface Children {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: Children) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  const isRegisterOrLogin = paths.some((path) => pathname.startsWith(path));

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
