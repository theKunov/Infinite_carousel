import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import fallbackImg from "../../../assets/fallbackImg.png";

type Props = {
  imageUrl?: string;
};

export const Item: React.FC<Props> = ({ imageUrl }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          if (imgRef.current && observer) {
            observer.unobserve(imgRef.current);
          }
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current && observer) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <Image
      ref={imgRef}
      src={loaded ? imageUrl : undefined}
      onError={(e) => {
        if (e.target) {
          (e.target as HTMLImageElement).src = fallbackImg;
        }
      }}
      loading="lazy"
    />
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`;
