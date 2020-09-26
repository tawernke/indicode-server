import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  purchaseCode!: string;

  @Field()
  @Column({ default: false })
  isSold!: boolean;

  @Field()
  @Column({ default: 1 })
  quantity: number;

  @Field()
  @Column()
  ownerId: number;

  @ManyToOne(() => User, (user) => user.products)
  owner: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
