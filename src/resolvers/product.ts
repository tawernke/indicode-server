import { Product } from "../entities/Product";
import { Resolver, Query, Arg, Mutation } from "type-graphql";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return Product.find();
  }

  @Query(() => Product, { nullable: true })
  product(@Arg("id") id: number): Promise<Product | undefined> {
    return Product.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(@Arg("name") name: string): Promise<Product> {
    return Product.create({ name }).save();
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
