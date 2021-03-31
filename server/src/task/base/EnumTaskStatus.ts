import { registerEnumType } from "@nestjs/graphql";

export enum EnumTaskStatus {
  New = "new",
  Pending = "pending",
  OnHold = "onHold",
  Ongoing = "ongoing",
  Done = "done",
}

registerEnumType(EnumTaskStatus, {
  name: "EnumTaskStatus",
});
