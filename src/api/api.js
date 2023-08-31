import axios from "axios";


const  baseURL = 'https://learn.codeit.kr/api/';


const getMbti = async (params) => {
  return await axios.get(`${baseURL}color-surveys/`,{
    params
  });
};

const postMbti = async (params) => {
  return await axios.post(`${baseURL}color-surveys/`,
    params
  );
};

export { getMbti,postMbti };
