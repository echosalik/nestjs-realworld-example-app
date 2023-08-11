import { ArrayType, Collection, Entity, EntityDTO, ManyToOne, OneToMany, PrimaryKey, Property, TextType, wrap } from '@mikro-orm/core';
import slug from 'slug';

import { User } from '../user/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Article {

  @PrimaryKey()
  id: number;

  @Property({ type: TextType })
  slug: string;

  @Property()
  title: string;

  @Property({ type: TextType })
  description = '';

  @Property({ type: TextType })
  body = '';

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: ArrayType })
  tagList: string[] = [];

  @ManyToOne()
  author: User;

  @OneToMany(() => Comment, comment => comment.article, { eager: true, orphanRemoval: true })
  comments = new Collection<Comment>(this);

  @Property()
  favoritesCount = 0;

  @Property()
  dislikesCount = 0;

  constructor(author: User, title: string, description: string, body: string) {
    this.author = author;
    this.title = title.slice(0, 250);
    this.description = description;
    this.body = body;
    this.slug = (slug(title, { lower: true }).slice(0, 36) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36));
  }

  toJSON(user?: User) {
    const o = wrap<Article>(this).toObject() as ArticleDTO;
    o.favorited = user && user.favorites.isInitialized() ? user.favorites.contains(this) : false;
    o.disliked = user && user.dislikes.isInitialized() ? user.dislikes.contains(this) : false;
    o.author = this.author.toJSON(user);

    return o;
  }

}

export interface ArticleDTO extends EntityDTO<Article> {
  favorited?: boolean;
  disliked?: boolean;
}
