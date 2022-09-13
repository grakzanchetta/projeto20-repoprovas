import * as models from "@prisma/client";

type CreateAndLoginUser = Omit<models.Users, "id">;

export { CreateAndLoginUser };
