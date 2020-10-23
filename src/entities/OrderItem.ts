import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, Float, ObjectType } from "type-graphql";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  productName!: string;

  @Field()
  @Column()
  quantity!: number;

  @Field(() => Float)
  @Column({ type: "float" })
  price!: number;

  @Field(() => Float)
  @Column({ type: "float" })
  total!: number;

  @Field()
  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
