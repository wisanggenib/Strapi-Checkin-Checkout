'use strict';

/**
 * checkin-data service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::checkin-data.checkin-data');
