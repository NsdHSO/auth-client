import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../service/auth/authInterceptor/auth-interceptor';

export const authProvider : Provider = {
  provide:HTTP_INTERCEPTORS,
  useClass:AuthInterceptor,
  multi:true,
};
