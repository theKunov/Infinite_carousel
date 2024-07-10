import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Item } from "./components/Item";
import useFetchImageList from "./hooks/useFetchList";
import {
  CarouselWrapProps,
  ItemWrapProps,
} from "./types/styledComponents.types";

type Props = {
  length: number;
  imageWidth?: number;
  imageHeight?: number;
};

const Carousel: React.FC<Props> = ({
  length,
  imageWidth = 200,
  imageHeight = 200,
}) => {
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setBrowserWidth(window.innerWidth);
  });

  const { data } = useFetchImageList({ imageWidth, imageHeight, length });

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (event: any) => {
    if (!carouselRef.current) return;
    const carousel = carouselRef.current;

    if (event.type === "wheel") {
      carousel.scrollLeft += event.deltaY; // Adjust scrolling speed
    }

    if (carousel.scrollLeft === 0) {
      carousel.scrollLeft = carousel.scrollWidth / 2;
    } else if (
      carousel.scrollLeft + carousel.offsetWidth + 5 >=
      carousel.scrollWidth
    ) {
      carousel.scrollLeft = carousel.scrollWidth / 2 - carousel.offsetWidth;
    }
  };

  const carouselList = [...data, ...data];

  return (
    <CarouselWrap
      length={length}
      imageWidth={imageWidth}
      browserWidth={browserWidth}
      ref={carouselRef}
      onWheel={handleWheel}
      onScroll={handleWheel}
    >
      {carouselList.map((item, index) => (
        <ItemWrap width={imageWidth} height={imageHeight} key={index}>
          <Item imageUrl={item} />
        </ItemWrap>
      ))}
    </CarouselWrap>
  );
};

export default Carousel;

const CarouselWrap = styled.div<CarouselWrapProps>`
  display: flex;
  overflow: scroll;
  gap: 10px;
  width: ${(props) =>
    props.browserWidth > props.length * props.imageWidth
      ? props.length * props.imageWidth - props.imageWidth
      : props.browserWidth}px;
  margin: 10vh auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ItemWrap = styled.div<ItemWrapProps>`
  overflow: hidden;
  min-width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  animation: ${fadeIn} 0.5s ease-in;
`;
