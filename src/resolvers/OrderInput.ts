import { InputType, Field, Float } from "type-graphql";

@InputType()
export class OrderItemInput {
  @Field()
  productName: string;

  @Field()
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  total: number;
}

@InputType()
export class OrderInput {
  @Field(() => [OrderItemInput])
  orderItems: OrderItemInput[];

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  address2: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  zip: string;

  @Field(() => Float)
  total: number;

  @Field()
  totalQuantity: number;
}
