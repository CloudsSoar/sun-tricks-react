import { useState } from 'react';
import { fetchMemberSignState } from '../api/fetch';
import { getQueryParams } from '../constant/query';
import { jsonParse } from 'safe-json-parse-and-stringify';

type ISignStateResponse = /*unresolved*/ any;
type ISignAgreementExtraInfo = /*unresolved*/ any;

export const useSignSate = () => {
  const queryParams = getQueryParams();
  const { merchantId, userRole, subMerchantId: sign_account_id } = queryParams;
  const [loading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [stateData, setStateData] = useState<ISignStateResponse>();
  const getSignState = async () => {
    try {
      const res = await fetchMemberSignState({
        merchant_id: merchantId,
        user_role: userRole,
        provider: 'SHENGYE',
        sign_product: 'SHENGYE_QUICK_RETURN',
        sign_account_id: sign_account_id,
      });
      const data = {
        ...res,
        info: jsonParse(res?.seller_agreement_extra_info, {}) as ISignAgreementExtraInfo,
      };
      setStateData(data);
      return data;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };
  const initSignSate = async () => {
    setIsLoading(true);
    try {
      await getSignState();
    } catch (e) {
      setIsError(true);
      setErrorMsg((e as Error).message || '获取信息失败');
    } finally {
      setIsLoading(false);
    }
  };
  return {
    loading,
    errorMsg,
    isError,
    initSignSate,
    getSignState,
    stateData,
    setStateData,
  };
};
