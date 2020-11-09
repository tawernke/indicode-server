import { Arg, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { isAuth } from "../middleware/isAuth";
import { AddOrderInput, UpdateOrderInput } from "./types.ts/order";
import { sendEmail } from "../utils/sendEmail"

@Resolver()
export class OrderResolver {
  @Mutation(() => Order)
  async createOrder(
    @Arg("orderInput") orderInput: AddOrderInput
  ): Promise<Order> {
    const order = await Order.create({
      ...orderInput,
    }).save();

    await sendEmail(
      order.email,
      'Order Confirmed',
      'customer-confirm-order',
      order
    );

    const updateIds = order.orderItems.map((item) => item.productId);
    const productsToUpdate = await Product.findByIds(updateIds);

    const updateInventoryQueries = productsToUpdate.map((product) => {
      const soldQuantity =
        order.orderItems.find((orderItem) => orderItem.productId === product.id)
          ?.quantity || 0;

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

  @Query(() => [Order])
  @UseMiddleware(isAuth)
  async orders(): Promise<Order[]> {
    return Order.find({ relations: ["orderItems"] });
  }

  @Query(() => Order, { nullable: true })
  @UseMiddleware(isAuth)
  async order(@Arg("id") id: string): Promise<Order | undefined> {
    return Order.findOne({
      where: { id },
      relations: ["orderItems"],
    });
  }

  @Mutation(() => Order, { nullable: true })
  @UseMiddleware(isAuth)
  async updateOrder(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: UpdateOrderInput
  ): Promise<Order | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Order)
      .set({ ...input })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return result.raw[0];
  }
}
