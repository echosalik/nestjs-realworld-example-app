import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SiteSettingsService } from './site-settings.service';
import { ISiteSettingsRO } from './site-settings.interface';
// import { SiteSettingsDTO } from './site-settings.entity';

@ApiBearerAuth()
@ApiTags('configuration')
@Controller('site-settings')
export class SiteSettingsController {
  constructor(private readonly siteSettingService: SiteSettingsService) {}

  @ApiOperation({ summary: 'Get all settings' })
  @ApiResponse({ status: 200, description: 'Return all settings.' })
  @Get()
  async findAll(): Promise<ISiteSettingsRO> {
    return this.siteSettingService.findAll();
  }

  @ApiOperation({ summary: 'Update settings' })
  @ApiResponse({ status: 200, description: 'Return all settings.' })
  @Post()
  async update(@Body() body : any ): Promise<ISiteSettingsRO> {
    for(const k of Object.keys(body)){
      this.siteSettingService.update({
        name: k,
        value: body[k]
      });
    }
    return this.siteSettingService.findAll();
  }
}
