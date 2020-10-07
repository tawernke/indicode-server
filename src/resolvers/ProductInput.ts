import { Product } from "../entities/Product";
import { Field, InputType, ObjectType } from "type-graphql";

//Inputs are what the resolver takes as an input, object types are what resolvers return

@InputType()
export class ProductInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  isPublic: boolean;
}

@ObjectType()
export class PaginatedPublicProducts {
  @Field(() => [Product])
  publicProducts: Product[];
  @Field()
  hasMore: boolean;
}
