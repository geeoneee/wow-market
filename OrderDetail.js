import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetail = ({ orderId = "1" }) => {
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }
      return config;
    });

    /**
     * 
     * {
    itemList: [
    itemId: Long
    name: string
    price: Long
    count: int
    , {…}]
    receiver: string
    address: string
    zipcode: string
    message: string
    phone: string
    seller_bank: string //판매자 은행
    seller_account: string  //판매자 계좌
    seller_account_name: string  //판매자 예금주명
    buyer_bank: string  // 입금정보-환불 은행명
    buyer_account: string  //입금 정보-환불 계좌
    buyer_account_name: string  //입금정보-입금자명
    deposittime: localdatetime  //입금 정보-입금시간
}
     */
    axios
      .get(`https://www.wowmkt.kr/mypage/myorder/detail/${orderId}`)
      .then((res) => {
        const responseData = res.data;
        console.log(responseData);
      });
  }, []);
  return <div className="OrderDetail"></div>;
};

export default OrderDetail;
