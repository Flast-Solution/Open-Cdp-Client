import { SUCCESS_CODE } from "configs";
import { decodeProperty } from "utils/dataUtils";
import RequestUtils from "utils/RequestUtils";

const WarehouseService = {
  allStatus: [],
  empty () {
    this.allStatus = [];
  },
  async hashSku(sku) {
    const encoder = new TextEncoder();
    const data = encoder.encode(sku);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },
  async fetch(filter = {}) {
    const { data, errorCode } = await RequestUtils.Get("/warehouse/fetch", filter);
    if (errorCode !== SUCCESS_CODE) {
      return { embedded: [], page: {} };
    }
    const { embedded, page } = data;
    decodeProperty(embedded, ['skuInfo']);
    return { embedded, page };
  }
}

export default WarehouseService;