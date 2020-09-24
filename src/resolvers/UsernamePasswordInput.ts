import {
  Field,
  InputType
} from "type-graphql";

//Inputs are what the resolver takes as an input, object types are what resolvers return

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
