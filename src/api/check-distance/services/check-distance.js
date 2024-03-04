'use strict';

/**
 * check-distance service
 */

module.exports = {
    handleCheckDistance: async () => {
        try {
            const geolib = require('geolib');

            const entriesReduced = geolib.getDistance(
                { latitude: -7.729389421959053, longitude: 110.38102453976754 },
                { latitude: -7.729403938946339, longitude: 110.38085148865918 }
            );

            return entriesReduced;
        } catch (err) {
            return err;
        }
    },
    handleLastStatus: async (user) => {
        try {
            const lastStatus = await strapi.entityService.findMany('api::checkin-data.checkin-data', {
                // fields: ['title', 'description'],
                populate: {
                    id_user: true,
                },
                filters: {
                    id_user: {
                        id: {
                            $eq: user.id,
                        }
                    }
                },
                sort: ['publishedAt:desc'],
                limit: 1
                // populate: { category: true },
            });

            return lastStatus.length >= 1 ? lastStatus[0].status : 'CHECK_OUT';
        } catch (err) {
            return err;
        }
    },
    handleCheckIn: async (user, data) => {
        try {
            const { position } = data
            const geolib = require('geolib');

            //get data form master company location
            const entries = await strapi.entityService.findMany('api::company-location.company-location');

            //compare data with current location from device
            const entriesReduced = geolib.getDistance(
                { latitude: entries.latitude, longitude: entries.longitude },
                { latitude: position.coords.latitude, longitude: position.coords.longitude }
            );

            let isOutside = false
            if (entriesReduced > 500) {
                isOutside = true
            }

            const lastStatus = await strapi.entityService.findMany('api::checkin-data.checkin-data', {
                // fields: ['title', 'description'],
                populate: {
                    id_user: true,
                },
                filters: {
                    id_user: {
                        id: {
                            $eq: user.id,
                        }
                    }
                },
                sort: ['publishedAt:desc'],
                limit: 1
                // populate: { category: true },
            });

            console.log(lastStatus, "INI ?")

            const postData = await strapi.entityService.create('api::checkin-data.checkin-data', {
                data: {
                    id_user: user.id,
                    lat: position.coords.latitude.toString(),
                    long: position.coords.longitude.toString(),
                    outside_area: isOutside,
                    status: lastStatus.length >= 1 ? lastStatus[0].status === "CHECK_IN" ? "CHECK_OUT" : "CHECK_IN" : "CHECK_IN",
                    publishedAt: new Date()
                },
            }).catch((err) => {
                console.log(err.details)
            });

            if (postData) {
                return "Success";
            }

            return 'error'


        } catch (err) {
            return err;
        }
    },
};
