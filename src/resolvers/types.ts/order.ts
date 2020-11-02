import { InputType, Field, Float } from "type-graphql";

@InputType()
export class OrderItemInput {
  @Field()
  productName: string;

  @Field()
  productId: number;

  @Field()
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  total: number;
}

@InputType()
export class AddOrderInput {
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

@InputType()
export class UpdateOrderInput {
  @Field()
  shipped: true;
}
