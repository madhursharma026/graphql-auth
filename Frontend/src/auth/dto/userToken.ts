import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserTokenInput {
    @Field()
    userToken: string;
}
