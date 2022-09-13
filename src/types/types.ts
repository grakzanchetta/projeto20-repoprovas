import * as models from "@prisma/client";

type CreateAndLoginUser = Omit<models.Users, "id">;
type Tests = Omit<models.Tests, "id">;

export { CreateAndLoginUser, Tests };
