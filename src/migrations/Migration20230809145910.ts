import { Migration } from '@mikro-orm/migrations';

export class Migration20230809145910 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `article` modify `slug` text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `article` modify `slug` varchar(255) not null;');
  }

}
