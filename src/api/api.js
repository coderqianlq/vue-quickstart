import axios from 'axios';

export const getBaseInfoData = params => { return axios.get(`/getBaseInfoData`, { params: params }); };

export const getDetailData = params => {return axios.get(`/getDetailInfoData`, { params: params }); };

export const getResult = params => {return axios.get(`/getExtractResult`, { params: params }); };

export const showResult = params => {return axios.get(`/showExtractPage`, { params: params }); };

export const downloadResult = params => {return axios.get(`/downloadExtractPage`, { params: params }); };

export const getTaobaoBaseInfo = params => {return axios.get(`/getTaobaoBaseInfo`, { params: params }); };

export const getTaobaoRecord = params => {return axios.get(`/getTaobaoTrade`, { params: params }); };
