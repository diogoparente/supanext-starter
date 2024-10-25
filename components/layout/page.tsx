import { Toaster } from "sonner";
import { Providers } from "../providers";
import { Navbar } from "./navbar";
import { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => (
  <Providers>
    <Navbar />
    {children}
    <Toaster />
  </Providers>
);

export { Page };
