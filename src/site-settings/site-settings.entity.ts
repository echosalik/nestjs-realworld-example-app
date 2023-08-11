import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class SiteSettings {

  @PrimaryKey({hidden: true})
  id: number;

  @Unique()
  @Property()
  name: string;

  @Property()
  value: string;
}

export class SiteSettingsDTO {
  name: string;
  value: string;
}