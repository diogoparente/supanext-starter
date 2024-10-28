import { Providers } from "../../providers";
import { Toaster } from "../ui/toaster";
import { Navbar } from "./navbar";
import { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => (
  <Providers>
    <Navbar />
    {children}
  </Providers>
);

export { Page };
