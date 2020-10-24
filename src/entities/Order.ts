import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, Float, ObjectType } from "type-graphql";
import { OrderItem } from "./OrderItem";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column()
  address2: string;

  @Field()
  @Column()
  city!: string;

  @Field()
  @Column()
  country!: string;

  @Field()
  @Column()
  zip!: string;

  @Field(() => Float)
  @Column({ type: "float" })
  total!: number;

  @Field()
  @Column()
  totalQuantity!: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
