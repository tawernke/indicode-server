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
  customerFirstName!: string;

  @Field()
  @Column()
  customerLastName!: string;

  @Field()
  @Column()
  customerEmail!: string;

  @Field()
  @Column()
  customerAddress!: string;

  @Field()
  @Column()
  customerAddress2: string;

  @Field()
  @Column()
  customerCity!: string;

  @Field()
  @Column()
  customerCountry!: string;

  @Field()
  @Column()
  customerZip!: string;

  @Field(() => Float)
  @Column({ type: "float" })
  total!: number;

  @Field()
  @Column()
  totalQuantity!: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
