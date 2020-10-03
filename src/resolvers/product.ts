import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Product } from "../entities/Product";
import { isAuth } from "../middleware/isAuth";
import { ProductInput } from "./ProductInput";

//TODO sort by admin and public routes

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

  @Query(() => [Product])
  async publicProducts(): Promise<Product[]> {
    const allProducts = await Product.find({
      where: { isPublic: true },
    });
    return allProducts;
  }

  @Query(() => Product, { nullable: true })
  product(@Arg("uuid") uuid: string): Promise<Product | undefined> {
    return Product.findOne({ where: { uuid } });
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
  @UseMiddleware(isAuth)
  async updateProduct(
    @Arg("uuid") uuid: string,
    @Arg("input") input: ProductInput
  ): Promise<Product | null> {
    const product = await Product.findOne({ where: { uuid } });
    if (!product) return null;
    if (typeof name !== undefined) {
      await Product.update({ id: product.id }, { ...input });
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
