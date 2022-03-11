import { clickTaskBtn } from "../helper";

When("user requests to remove task {string}", (taskName) => {
  clickTaskBtn(taskName, "delete task");
});
