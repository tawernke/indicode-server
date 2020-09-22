import { Product } from "../entities/Product";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products(@Ctx() { em }: MyContext): Promise<Product[]> {
    return em.find(Product, {});
  }

  @Query(() => Product, { nullable: true })
  product(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Product | null> {
    return em.findOne(Product, { id });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("name") name: string,
    @Ctx() { em }: MyContext
  ): Promise<Product> {
    const product = em.create(Product, { name });
    await em.persistAndFlush(product);
    return product;
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Ctx() { em }: MyContext
  ): Promise<Product | null> {
    const product = await em.findOne(Product, { id });
    if (!product) return null;
    if (typeof name !== undefined) {
      product.name = name;
      await em.persistAndFlush(product);
    }
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Product, { id });
    } catch {
      return false;
    }
    return true;
  }
}
