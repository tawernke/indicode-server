import { Product } from "../entities/Product";
import { Arg, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Order } from "../entities/Order";
import { OrderInput } from "./OrderInput";

@Resolver()
export class OrderResolver {
  @Mutation(() => Order)
  async createOrder(@Arg("orderInput") orderInput: OrderInput): Promise<Order> {
    const order = await Order.create({
      ...orderInput,
    }).save();

    const updateIds = order.orderItems.map((item) => item.productId);
    const productsToUpdate = await Product.findByIds(updateIds);

    const updateInventoryQueries = productsToUpdate.map((product) => {
      const soldQuantity =
        order.orderItems.find(
          (orderItem) => orderItem.productId === product.id
        )?.quantity || 0;

      return getConnection()
        .createQueryBuilder()
        .update(Product)
        .set({ quantity: product.quantity - soldQuantity })
        .where("id = :id", { id: product.id })
        .execute();
    });
    await Promise.all(updateInventoryQueries);

    return order;
  }
}
