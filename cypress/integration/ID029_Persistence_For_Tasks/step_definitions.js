import { clickTaskBtn } from "../helper";

When("user requests to remove tasks", (table) => {
  const taskName = 0;
  for (let i = 1; i < table.rawTable.length; i++) {
    clickTaskBtn(table.rawTable[i][taskName], "delete task");
  }
});
