
import { Injectable } from '@nestjs/common';
import { SiteSettings, SiteSettingsDTO } from './site-settings.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ISiteSettingsRO } from './site-settings.interface';

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectRepository(SiteSettings)
    private readonly siteSettingsRepository: EntityRepository<SiteSettings>,
  ) {}

  async findAll(): Promise<ISiteSettingsRO> {
    const settings = await this.siteSettingsRepository.findAll();
    return { settings };
  }

  async update(setting : SiteSettingsDTO): Promise<boolean> {
    await this.siteSettingsRepository.upsert(setting);
    return true;
  }
}
