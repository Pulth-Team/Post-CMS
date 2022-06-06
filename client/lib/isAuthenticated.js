import axios from "axios";

export default function (ctx = undefined) {
  let headers = {};

  if (
    ctx !== undefined &&
    typeof ctx.req !== "undefined" &&
    ctx.req.headers.cookie !== undefined
  )
    headers.Cookie = ctx.req.headers.cookie;

  return axios
    .get("/api/auth/check", {
      withCredentials: true,
      headers,
    })
    .then((resp) => {
      return resp.data;
    });
}
