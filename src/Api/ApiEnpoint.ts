import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
export type responseFnType <R> = (result: R) => void;
export type ProgressFnType = (progress: ProgressEvent) => void;
export type RequestMethods =  "POST" | "PUT" | "GET" | "DELETE";
export interface EndpointConfig{
    url: string;
    token?:string;
    method: RequestMethods
}
export interface  CallBackConfig<Response> {
    commitFn: (result: Response) => void;
    errorFn: (result: AxiosError) => void;
    progressFn?: ProgressFnType;
}
export function apiEndpoint<
    Response,
    PAYLOAD> (
    endpointConfig: EndpointConfig,
    callBackConfig: CallBackConfig<Response>,
    payload: PAYLOAD,

): Promise<void> {
    console.log('endpointConfig');
    console.log(endpointConfig);
    const axiosConfig: AxiosRequestConfig =  {
        url: endpointConfig.url,
        withCredentials: false,
        method: endpointConfig.method,
        data: payload,
        headers: {
            Token:  endpointConfig.token, //the token is a variable which holds the token
            "Referrer-Policy": "no-referrer-when-downgrade"
        }
    };
    if({}.hasOwnProperty.call(callBackConfig,'progressFn')){
        axiosConfig['onUploadProgress'] = callBackConfig.progressFn;
    };
    if({}.hasOwnProperty.call(callBackConfig,'progressFn')){
        axiosConfig['onUploadProgress'] = callBackConfig.progressFn;
    }
    return axios.request(axiosConfig)
        .then((response:AxiosResponse<Response>)=> {
            callBackConfig.commitFn(response.data);
        })
        .catch((error: AxiosError)=>{
            callBackConfig.errorFn(error);
        });
}