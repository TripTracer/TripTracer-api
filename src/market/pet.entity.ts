import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PetB {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field()
  greed: string;
}
