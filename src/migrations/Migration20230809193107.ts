import { Migration } from '@mikro-orm/migrations';

export class Migration20230809193107 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user_dislikes` (`user_id` int unsigned not null, `article_id` int unsigned not null, primary key (`user_id`, `article_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user_dislikes` add index `user_dislikes_user_id_index`(`user_id`);');
    this.addSql('alter table `user_dislikes` add index `user_dislikes_article_id_index`(`article_id`);');

    this.addSql('alter table `user_dislikes` add constraint `user_dislikes_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `user_dislikes` add constraint `user_dislikes_article_id_foreign` foreign key (`article_id`) references `article` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `article` add `dislikes_count` int not null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `user_dislikes`;');

    this.addSql('alter table `article` drop `dislikes_count`;');
  }

}
