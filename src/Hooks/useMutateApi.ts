import {useState} from "react";
import axios, {AxiosResponse} from "axios";
import useTranslation from "next-translate/useTranslation";

interface IPostApiState {
    loading: boolean;
    error: string | null;
    data: object | null;
    status: number;
}

interface IMutateProps {
    apiPath?: string;
    method?: "PUT" | "DELETE" | "POST" | "GET";
    baseURL?: string;
}

type TMutateReturn = [
    (object: any, params?: any) => any,
        object | null,
    boolean
];
const useMutateApi = ({
                          apiPath,
                          method,
                          baseURL,
                      }: IMutateProps): TMutateReturn => {
    const [responseData, setResponseData] = useState<IPostApiState>({
        loading: false,
        error: null,
        data: null,
        status: 0
    });
    const {t} = useTranslation("common");

    const BASE_API_URL = "http://localhost:3000/api";
    const fetchApi = async (variables: object, params?: object) => {
        setResponseData({...responseData, loading: true});
        const axiosConfig = {
            baseURL: baseURL ? baseURL : BASE_API_URL,
            url: apiPath,
            method: method ? method : "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Accept-Language": "tr"
            },
            params: params,
            data: variables,
        };
        const response = await axios(axiosConfig)
            .then((res: AxiosResponse) => res)
            .catch((err) => {
                return {...err.toJSON(), ...err.response};
            });
        if (response.message !== undefined) {
            console.log(response.status);
            switch (response.status) {
                case 400:
                    setResponseData({
                        loading: false,
                        error: response.data.Errors.map(
                            (err: { Message: string }) => err.Message
                        ).join(". "),
                        data: null,
                        status: response.status
                    });
                    return {
                        data: null,
                        error: response.data.Errors.map(
                            (err: { Message: string }) => err.Message
                        ).join(". "),
                        loading: false,
                        status: response.status
                    };
                case 500:
                    setResponseData({
                        loading: false,
                        error: t("UnexpectedErrorOccurred"),
                        data: null,
                        status: response.status
                    });
                    return {
                        data: null,
                        error: t("UnexpectedErrorOccurred"),
                        loading: false,
                        status: response.status
                    };
                case null:
                    setResponseData({
                        loading: false,
                        error: t("UnexpectedErrorOccurred"),
                        data: null,
                        status: response.status
                    });
                    return {
                        data: null,
                        error: t("UnexpectedErrorOccurred"),
                        loading: false,
                        status: response.status
                    };

                default:
                    setResponseData({
                        loading: false,
                        error: response.data.Message,
                        data: null,
                        status: response.status
                    });
                    return {data: null, error: response.data.Message, loading: false, status: response.status};
            }
        }
        setResponseData({loading: false, error: null, data: response.data, status: response.status});
        return {loading: false, error: null, data: response.data};
    };
    return [fetchApi, responseData.data, responseData.loading];
};
export default useMutateApi;
