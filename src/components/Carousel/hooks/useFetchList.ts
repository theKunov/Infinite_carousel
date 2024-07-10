import { useState, useEffect } from "react";
import fallbackImg from "../../../assets/fallbackImg.png";
import { PixabayImage } from "../types/apiData.types";

type Props = {
  imageWidth: number;
  imageHeight?: number;
  length: number;
};

interface State {
  data: string[];
  status: "idle" | "pending" | "success" | "error";
  error?: any;
}

const useFetchImageList = ({
  imageWidth,
  imageHeight,
  length,
}: Props): State => {
  const url = `https://pixabay.com/api/?key=44873050-711ccfe84c5f03adffb4f1df1&q=all&image_type=photo&per_page=${length}&page=1`;
  const fallbackArray = new Array(length).fill(fallbackImg);

  const [state, setState] = useState<State>({
    data: [],
    status: "idle",
    error: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: [], status: "pending", error: undefined });
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const urls = data.hits.map((hit: PixabayImage) => hit.webformatURL);
          setState({ data: urls, status: "success" });
        })
        .catch((error) => {
          setState({ data: fallbackArray, status: error });
        });
    };

    fetchData();
  }, [url]);

  return state;
};

export default useFetchImageList;
