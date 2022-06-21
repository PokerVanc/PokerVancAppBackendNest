import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

// Controllers
import AuthenticationController from './Controllers/User/AuthenticationController';

// Providers
import AuthenticationService from './Services/Authentication/AuthenticationService';
import TokenService from './Services/Authentication/TokenService/TokenService';
import AxiosApiCalls from './Services/Infrastructure/ApiCalls/AxiosApiCalls';
import AxiosApiCallsExceptionHandler from './Services/Infrastructure/ApiCallsExceptionHandler/AxiosApiCallsExceptionHandler';
import TokenRepository from './Services/Authentication/TokenRepository/TokenRepository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: 'IApiCallsExceptionHandler',
      useClass: AxiosApiCallsExceptionHandler,
    },
    {
      provide: 'ITokenRepository',
      useClass: TokenRepository,
    },
    {
      provide: 'IApiCalls',
      useClass: AxiosApiCalls,
    },
    {
      provide: 'ITokenService',
      useClass: TokenService,
    },
    {
      provide: 'IAuthenticationService',
      useClass: AuthenticationService,
    },
  ],
})
export class AppModule {}
