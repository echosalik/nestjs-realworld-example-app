import { Migration } from '@mikro-orm/migrations';

export class Migration20230809144549 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `article` modify `body` text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `article` modify `body` varchar(255) not null;');
  }

}
