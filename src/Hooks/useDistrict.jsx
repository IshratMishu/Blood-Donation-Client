import { useState } from "react";
import { allDistSubDists } from "../../public/DistrictAndUpazilas";

const useDistrict = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const districts = Object.keys(allDistSubDists);
  const upozilas = selectedDistrict ? allDistSubDists[selectedDistrict] : [];
  return { districts, upozilas };
};

export default useDistrict;
