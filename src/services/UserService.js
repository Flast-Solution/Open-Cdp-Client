import { SUCCESS_CODE } from "configs";
import { arrayEmpty } from "utils/dataUtils";
import RequestUtils from "utils/RequestUtils";

const UserService = {
  async findId(id) {
    const { data, errorCode, message } = await RequestUtils.Get("/user/find-id", { id });
    if(errorCode === SUCCESS_CODE) {
      return [null, data];
    }
    return [message, null];
  },
  async mapId2Name(ids = []) {
    let users = await RequestUtils.GetAsList("/user/list-name-id", { ids });
    if(arrayEmpty(users)) {
      return {};
    }
    return Object.fromEntries(users.map(item => [item.id, item.name]));
  }
}

export default UserService;