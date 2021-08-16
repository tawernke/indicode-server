import { Field, Float, InputType, ObjectType } from "type-graphql";
import { Product } from "../../entities/Product";

//Inputs are what the resolver takes as an input, object types are what resolvers return

@InputType()
export class ProductInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  quantity: number;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  isPublic: boolean;

  @Field({ nullable: true })
  deleted?: boolean;
}

@ObjectType()
export class PaginatedPublicProducts {
  @Field(() => [Product])
  publicProducts: Product[];
  @Field()
  hasMore: boolean;
}
