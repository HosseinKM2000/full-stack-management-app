"use client";
import {
  BreadcrumbLink,
  BreadcrumbRoot
} from "<components>/ui/breadcrumb";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import style from "./index.module.css";

const Breadcrumb = () => {
  const pathname = usePathname().replace("/", "");
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return (
    <BreadcrumbRoot className={style.breadcrumbContainer} size={"lg"}>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
      <BreadcrumbLink href="#">{pathname}</BreadcrumbLink>
      {/* <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink> */}
    </BreadcrumbRoot>
  );
};

export default Breadcrumb;
