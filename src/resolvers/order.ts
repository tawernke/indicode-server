import { Arg, Mutation, Resolver } from "type-graphql";
import { Order } from "../entities/Order";
import { OrderInput } from "./OrderInput";

@Resolver()
export class OrderResolver {
  @Mutation(() => Order)
  async createOrder(
    @Arg("orderInput") orderInput: OrderInput,
  ): Promise<Order> {
    const order = await Order.create({
      ...orderInput,
    }).save();

    return order;
  }
}
