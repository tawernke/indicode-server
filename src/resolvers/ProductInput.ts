import { Field, InputType } from "type-graphql";

//Inputs are what the resolver takes as an input, object types are what resolvers return

@InputType()
export class ProductInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity?: number;

  @Field()
  purchaseCode: string;

  @Field()
  imageUrl?: string;
}
