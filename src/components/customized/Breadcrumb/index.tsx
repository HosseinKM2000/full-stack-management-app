"use client";
import { BreadcrumbLink, BreadcrumbRoot } from "<components>/ui/breadcrumb";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import style from "./index.module.css";

const Breadcrumb = () => {
  const pathname = usePathname().split("/");
  pathname.shift();
  const searchParams = useSearchParams();

  useEffect(() => {}, [pathname, searchParams]);

  return (
    <BreadcrumbRoot className={style.breadcrumbContainer} size={"lg"}>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
      {pathname.map((item, index) => (
        <BreadcrumbLink key={index}>{item}</BreadcrumbLink>
      ))}
      {/* <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink> */}
    </BreadcrumbRoot>
  );
};

export default Breadcrumb;
