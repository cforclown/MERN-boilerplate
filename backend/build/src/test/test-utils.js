"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectDocumentToEqual = exports.docToJSON = void 0;
function docToJSON(doc) {
    return JSON.parse(JSON.stringify(doc));
}
exports.docToJSON = docToJSON;
function expectDocumentToEqual(doc, expectedDoc, ignoreTimestamp) {
    const rawDoc = docToJSON(doc);
    const rawExpectedDoc = docToJSON(expectedDoc);
    if (ignoreTimestamp) {
        delete rawExpectedDoc.createdAt;
        delete rawExpectedDoc.updatedAt;
    }
    expect(rawDoc).toMatchObject(rawExpectedDoc);
}
exports.expectDocumentToEqual = expectDocumentToEqual;
//# sourceMappingURL=test-utils.js.map