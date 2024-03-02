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
    handleCheckIn: async (data) => {
        try {
            console.log(data, "DATAAAASSS")
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
};
