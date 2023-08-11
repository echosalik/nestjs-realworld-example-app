/* eslint-disable prefer-const */
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { Tag } from '../tag/tag.entity';
import { readFileSync } from "fs";
import * as path from "path";

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const filename = "articles.json";
    const jsonpath = path.join(...[__dirname, filename]);
    const articles_raw = readFileSync(jsonpath);
    const articles_json = JSON.parse(articles_raw.toString("utf8"))["articles"];
    const author = new User(
      'John Snow',
      'snow@wall.st',
      'snow123',
    );
    await em.insert(author);
    author.id = 1;
    let tags_raw : Set<string> = new Set();
    const articles = articles_json.map((x : any) => {
      let a = new Article(author, x.title, x.description, x.body);
      a.tagList = x.tagList;
      a.createdAt = new Date(x.createdAt);
      a.updatedAt = new Date(x.updatedAt);
      x.tagList.forEach(t => tags_raw.add(t));
      return a;
    });
    await em.insertMany(articles);
    let tags : Tag[] = [];
    for(const tag of tags_raw.values()){
      let t = new Tag();
      t.tag = tag;
      tags.push(t);
    }
    await em.insertMany(tags);
  }

}
