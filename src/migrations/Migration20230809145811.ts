import { Migration } from '@mikro-orm/migrations';

export class Migration20230809145811 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `article` modify `description` text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `article` modify `description` varchar(255) not null;');
  }

}
