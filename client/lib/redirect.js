import Router from "next/router";

/**
 *
 * @required where to redirect
 * @param {boolean} path
 *
 * @required if called in serverside
 * @param {Context} ctx
 */
const redirect = (path, ctx) => {
  if (typeof window !== "undefined") {
    Router.push(path);
  } else {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: path });
      ctx.res.end();
    }
  }
};

export default redirect;
