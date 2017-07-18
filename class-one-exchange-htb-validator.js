/**
 * @author:    Partner
 * @license:   UNLICENSED
 *
 * @copyright: Copyright (c) 2017 by Index Exchange. All rights reserved.
 *
 * The information contained within this document is confidential, copyrighted
 * and or a trade secret. No part of this document may be reproduced or
 * distributed in any form or by any means, in whole or in part, without the
 * prior written permission of Index Exchange.
 */


'use strict';

////////////////////////////////////////////////////////////////////////////////
// Dependencies ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var Inspector = require('../../../libs/external/schema-inspector.js');

////////////////////////////////////////////////////////////////////////////////
// Main ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/* =============================================================================
 * STEP 0 | Config Validation
 * -----------------------------------------------------------------------------
 * This file contains the necessary validation for the partner configuration.
 * This validation will be performed on the partner specific configuration object
 * that is passed into the wrapper. The wrapper uses an outside library called
 * schema-insepctor to perform the validation. Information about it can be found here:
 * https://atinux.fr/schema-inspector/.
 */

/** Example Configs for C1X bidder
*    "configs": {
*        "xSlots": {
*            "xSlot1": {
*                "siteID": "999",
*                "sizes": [ [300, 250], [300, 600] ]
*            },
*            "xSlot2": {
*                "siteID": "345",
*                "sizes": [ [300, 250] ]
*            }
*        },
*        "mapping": {
*            "htSlotID-1": [ "xSlot1" ],
*            "htSlotID-2": [ "xSlot2" ]
*        }
*    }
**/

var partnerValidator = function (configs) {
    var result = Inspector.validate({
        type: 'object',
        properties: {
            xSlots: {
                type: 'object',
                properties: {
                    '*': {
                        type: 'object',
                        properties: {
                            siteId: {
                                type: 'string',
                                minLength: 1
                            },
                            sizes: {
                                type: [ 'array' ],
                                minLength: 2
                            }
                        }
                    }
                }
            },
            mapping: {
                type: 'object',
                properties: {
                    '*': {
                        type: [ 'string' ]
                    }
                }
            }
        }
    }, configs);

    if (!result.valid) {
        return result.format();
    }

    return null;
};

module.exports = partnerValidator;