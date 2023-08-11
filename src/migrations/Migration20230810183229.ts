import { Migration } from '@mikro-orm/migrations';

export class Migration20230810183229 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `is_admin` tinyint(1) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `is_admin`;');
  }

}
