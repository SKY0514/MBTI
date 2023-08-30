import axios from "axios";

const getMbti = async () => {
  return await axios.get("https://learn.codeit.kr/api/color-surveys?limit=40");
};

export { getMbti };
