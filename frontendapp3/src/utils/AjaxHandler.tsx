import axios, { AxiosRequestConfig } from 'axios';

export interface AjaxConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  contentType?: string;
  data?: any;
  beforeSend?: () => void;
  error?: (error: any) => void;
  success?: (response: any) => void;
  complete?: () => void;
}

export class AjaxHandler {
  private static instance: AjaxHandler;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): AjaxHandler {
    if (!AjaxHandler.instance) {
      AjaxHandler.instance = new AjaxHandler();
    }
    return AjaxHandler.instance;
  }

  public getDomain(): string {
    const currentUrl = window.location.href;
    const REACT_APP_FRONTEND_PRO_API_URL=process.env.REACT_APP_FRONTEND_PRO_API_URL;
    const REACT_APP_FRONTEND_PRO_API_PORT=process.env.REACT_APP_FRONTEND_PRO_API_PORT;
    const REACT_APP_FRONTEND_DEV_API_URL=process.env.REACT_APP_FRONTEND_DEV_API_URL;
    const REACT_APP_FRONTEND_DEV_API_PORT=process.env.REACT_APP_FRONTEND_DEV_API_PORT;
    
    const REACT_APP_BACKEND_PRO_API_URL=process.env.REACT_APP_BACKEND_PRO_API_URL;
    const REACT_APP_BACKEND_PRO_API_PORT=process.env.REACT_APP_BACKEND_PRO_API_PORT;
    const REACT_APP_BACKEND_DEV_API_URL=process.env.REACT_APP_BACKEND_DEV_API_URL;
    const REACT_APP_BACKEND_DEV_API_PORT=process.env.REACT_APP_BACKEND_DEV_API_PORT;

    const isProduction = Boolean(
      REACT_APP_FRONTEND_PRO_API_URL && 
        (currentUrl.includes(REACT_APP_FRONTEND_PRO_API_URL) || currentUrl==REACT_APP_FRONTEND_PRO_API_URL)
    );



    const protocol = process.env.REACT_APP_IS_HTTPS === 'true' ? 'https' : 'http';
    const domain = isProduction
        ? `${REACT_APP_BACKEND_PRO_API_URL || ''}${((REACT_APP_BACKEND_PRO_API_PORT==='NONE')?'':':'+REACT_APP_BACKEND_PRO_API_PORT) || ''}`
        : `${REACT_APP_BACKEND_DEV_API_URL || ''}${((REACT_APP_BACKEND_DEV_API_PORT==='NONE')?'':':'+REACT_APP_BACKEND_DEV_API_PORT) || ''}`;

    if (!domain || domain.includes('undefined')) {
        console.warn('Domain URL or Port is not properly defined in environment variables.');
        return '';
    }

    return `${protocol}://${domain}`;
}


  public sendRequest(config: AjaxConfig): void {
    const {
      url,
      method,
      contentType = 'application/json',
      data,
      beforeSend,
      success,
      error,
      complete,
    } = config;

    if (beforeSend) beforeSend();

    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      headers: { 'Content-Type': contentType },
      data,
    };

    axios(axiosConfig)
      .then((response) => {
        if (success) success(response.data);
      })
      .catch((err) => {
        if (error) error(err);
      })
      .finally(() => {
        if (complete) complete();
      });
  }
}
