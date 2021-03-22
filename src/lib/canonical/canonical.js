
var dataHandler = require('../dataHandler/dataHandler');

module.exports = class hl7v2 extends dataHandler {
    constructor() {
        super("canonical");
    }

    parseSrcData(msg) {
        return new Promise((fulfill, reject) => {

            try{
                var data = parseHL7v2(msg);
                fulfill(data);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    preProcessTemplate(templateStr) {
        return super.preProcessTemplate(hl7v2TemplatePreprocessor.Process(templateStr));
    }

    postProcessResult(inResult) {
        return super.postProcessResult(inResult);
    }

    getConversionResultMetadata(context) {
        return {
            'unusedSegments': parseCoverageReport(context),
            'invalidAccess': parseInvalidAccess(context)
        };
    }
};