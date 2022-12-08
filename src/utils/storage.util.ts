interface ConnectInfo {
  address: string;
  chainId: string;
}

export const ConnectInfoStored = {
  key: "connect__info",
  get value(): ConnectInfo{
    const val = window.localStorage.getItem(this.key);
    return val && JSON.parse(val);
  },
  set value(val: ConnectInfo) {
    const res = JSON.stringify(val || {});
    window.localStorage.setItem(this.key, res);
  },
  clear() {
    window.localStorage.removeItem(this.key);
  },
};

// export const UserInfoStored = {
//   key: "sd_user_info",
//   get value() {
//     return window.localStorage.getItem(this.key) || "";
//   },
//   set value(val: string) {
//     window.localStorage.setItem(this.key, val);
//   },
//   clear() {
//     window.localStorage.removeItem(this.key);
//   },
// };
