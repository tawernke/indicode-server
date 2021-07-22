import { Field, Float, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  @Generated("uuid")
  uuid!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => Float)
  @Column({ type: "float" })
  price: number;

  @Field()
  @Column()
  imageUrl?: string;

  @Field()
  @Column({ default: false })
  isSold!: boolean;

  @Field()
  @Column({ default: false })
  isPublic!: boolean;

  @Field()
  @Column({ default: 1 })
  quantity: number;

  @Field()
  @Column()
  ownerId: number;

  @ManyToOne(() => User, (user) => user.products)
  owner: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product, { cascade: true })
  orderItems: OrderItem[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
