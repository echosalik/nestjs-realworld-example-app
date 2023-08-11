import { Migration } from '@mikro-orm/migrations';

export class Migration20230810175241 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `site_settings` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `value` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `site_settings` add unique `site_settings_name_unique`(`name`);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `site_settings`;');
  }

}
