import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";
import { Field, Float, ObjectType } from "type-graphql";

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
