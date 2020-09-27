import { Product } from "../entities/Product";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { ProductInput } from "./ProductInput";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  @UseMiddleware(isAuth)
  async products(@Ctx() { req }: MyContext): Promise<Product[]> {
    const allProducts = await Product.find({
      where: { ownerId: req.session.userId },
    });
    return allProducts;
  }

  @Query(() => Product, { nullable: true })
  product(@Arg("id") id: number): Promise<Product | undefined> {
    return Product.findOne(id);
  }

  @Mutation(() => Product)
  @UseMiddleware(isAuth)
  async createProduct(
    @Arg("input") input: ProductInput,
    @Ctx() { req }: MyContext
  ): Promise<Product> {
    return Product.create({
      ...input,
      ownerId: req.session.userId,
    }).save();
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg("id") id: number,
    @Arg("name") name: string
  ): Promise<Product | null> {
    const product = await Product.findOne(id);
    if (!product) return null;
    if (typeof name !== undefined) {
      await Product.update({ id }, { name });
    }
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: number): Promise<boolean> {
    try {
      await Product.delete(id);
    } catch {
      return false;
    }
    return true;
  }
}
