import { useState, useEffect } from "react";
import axios from "axios";

interface BillboardData {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

const useBillboard = () => {
  const [data, setData] = useState<BillboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<BillboardData>(
          "http://localhost:3080/api/billboard"
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch billboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillboard();
  }, []);

  return { data, isLoading, error };
};

export default useBillboard;
