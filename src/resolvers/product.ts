import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Product } from "../entities/Product";
import { isAuth } from "../middleware/isAuth";
import { ProductInput, PaginatedPublicProducts } from "./ProductInput";

//TODO sort by admin and public routes

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  @UseMiddleware(isAuth)
  async products(): Promise<Product[]> {
    return Product.find({})
  }

  @Query(() => PaginatedPublicProducts)
  async publicProducts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPublicProducts> {
    const cappedLimit = Math.min(50, limit);
    const cappedLimitPlusOne = cappedLimit + 1;

    const qb = getConnection()
      .getRepository(Product)
      .createQueryBuilder("p")
      .where("p.isPublic = :isPublic", { isPublic: true })
      .orderBy('"createdAt"')
      .take(cappedLimitPlusOne);

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    const products = await qb.getMany();

    return {
      publicProducts: products.slice(0, cappedLimit),
      hasMore: products.length === cappedLimitPlusOne,
    };
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
