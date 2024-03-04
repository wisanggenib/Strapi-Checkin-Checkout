'use strict';

/**
 * A set of functions called "actions" for `check-distance`
 */

module.exports = {
  async handleCheckDistance(ctx, next) {
    try {
      const data = await strapi
        .service("api::check-distance.check-distance")
        .handleCheckDistance();
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
  async handleCheckIn(ctx, next) {
    try {
      const { user } = ctx.state;
      const data = await strapi
        .service("api::check-distance.check-distance")
        .handleCheckIn(user, ctx.request.body);
      // console.log(data, "data checkin");

      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
  async handleLastStatus(ctx, next) {
    try {
      const { user } = ctx.state;
      const data = await strapi
        .service("api::check-distance.check-distance")
        .handleLastStatus(user);

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
