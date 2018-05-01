import axios from 'axios';

export const getAccessToken = () => axios.post("/api/payment/token");
export const getMerchantUid = ({accessToken, merchant_uid, amount}) => axios.post("/api/payment/merchantuid", {accessToken, merchant_uid, amount});