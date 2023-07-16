"use client";
import React from "react";
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { Navigation } from "swiper/modules";
import categories from "@/app/data/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import useBreakpoint from "@/app/hooks/useBreakpoint";
import { usePathname, useSearchParams } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";

const Categories: React.FC = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const breakpoint = useBreakpoint();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
            pt-4
        "
      >
        <Swiper modules={[Navigation]} slidesPerView={breakpoint} navigation>
          {categories.map((item) => (
            <SwiperSlide key={item.label}>
              <CategoryBox {...item} selected={category === item.label} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Categories;
