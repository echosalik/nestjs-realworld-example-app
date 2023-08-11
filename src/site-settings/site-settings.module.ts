import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../user/auth.middleware';
import { SiteSettingsController } from './site-settings.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SiteSettingsService } from './site-settings.service';
import { SiteSettings } from './site-settings.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [
    SiteSettingsController
  ],
  exports: [],
  imports: [MikroOrmModule.forFeature({ entities: [SiteSettings] }), UserModule],
  providers: [SiteSettingsService],
})
export class SiteSettingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'site-settings', method: RequestMethod.POST });
  }
}
