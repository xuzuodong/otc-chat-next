/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const dtalk = $root.dtalk = (() => {

    /**
     * Namespace dtalk.
     * @exports dtalk
     * @namespace
     */
    const dtalk = {};

    dtalk.proto = (function() {

        /**
         * Namespace proto.
         * @memberof dtalk
         * @namespace
         */
        const proto = {};

        /**
         * Device enum.
         * @name dtalk.proto.Device
         * @enum {number}
         * @property {number} Android=0 Android value
         * @property {number} IOS=1 IOS value
         */
        proto.Device = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Android"] = 0;
            values[valuesById[1] = "IOS"] = 1;
            return values;
        })();

        proto.Login = (function() {

            /**
             * Properties of a Login.
             * @memberof dtalk.proto
             * @interface ILogin
             * @property {dtalk.proto.Device|null} [device] Login device
             * @property {string|null} [username] Login username
             */

            /**
             * Constructs a new Login.
             * @memberof dtalk.proto
             * @classdesc Represents a Login.
             * @implements ILogin
             * @constructor
             * @param {dtalk.proto.ILogin=} [properties] Properties to set
             */
            function Login(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Login device.
             * @member {dtalk.proto.Device} device
             * @memberof dtalk.proto.Login
             * @instance
             */
            Login.prototype.device = 0;

            /**
             * Login username.
             * @member {string} username
             * @memberof dtalk.proto.Login
             * @instance
             */
            Login.prototype.username = "";

            /**
             * Creates a new Login instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.Login
             * @static
             * @param {dtalk.proto.ILogin=} [properties] Properties to set
             * @returns {dtalk.proto.Login} Login instance
             */
            Login.create = function create(properties) {
                return new Login(properties);
            };

            /**
             * Encodes the specified Login message. Does not implicitly {@link dtalk.proto.Login.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.Login
             * @static
             * @param {dtalk.proto.ILogin} message Login message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Login.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.device != null && Object.hasOwnProperty.call(message, "device"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.device);
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                return writer;
            };

            /**
             * Encodes the specified Login message, length delimited. Does not implicitly {@link dtalk.proto.Login.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.Login
             * @static
             * @param {dtalk.proto.ILogin} message Login message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Login.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Login message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.Login
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.Login} Login
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Login.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.Login();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.device = reader.int32();
                        break;
                    case 2:
                        message.username = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Login message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.Login
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.Login} Login
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Login.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Login message.
             * @function verify
             * @memberof dtalk.proto.Login
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Login.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.device != null && message.hasOwnProperty("device"))
                    switch (message.device) {
                    default:
                        return "device: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                return null;
            };

            /**
             * Creates a Login message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.Login
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.Login} Login
             */
            Login.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.Login)
                    return object;
                let message = new $root.dtalk.proto.Login();
                switch (object.device) {
                case "Android":
                case 0:
                    message.device = 0;
                    break;
                case "IOS":
                case 1:
                    message.device = 1;
                    break;
                }
                if (object.username != null)
                    message.username = String(object.username);
                return message;
            };

            /**
             * Creates a plain object from a Login message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.Login
             * @static
             * @param {dtalk.proto.Login} message Login
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Login.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.device = options.enums === String ? "Android" : 0;
                    object.username = "";
                }
                if (message.device != null && message.hasOwnProperty("device"))
                    object.device = options.enums === String ? $root.dtalk.proto.Device[message.device] : message.device;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                return object;
            };

            /**
             * Converts this Login to JSON.
             * @function toJSON
             * @memberof dtalk.proto.Login
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Login.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Login;
        })();

        proto.Proto = (function() {

            /**
             * Properties of a Proto.
             * @memberof dtalk.proto
             * @interface IProto
             * @property {dtalk.proto.EventType|null} [eventType] Proto eventType
             * @property {Uint8Array|null} [body] Proto body
             */

            /**
             * Constructs a new Proto.
             * @memberof dtalk.proto
             * @classdesc Represents a Proto.
             * @implements IProto
             * @constructor
             * @param {dtalk.proto.IProto=} [properties] Properties to set
             */
            function Proto(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Proto eventType.
             * @member {dtalk.proto.EventType} eventType
             * @memberof dtalk.proto.Proto
             * @instance
             */
            Proto.prototype.eventType = 0;

            /**
             * Proto body.
             * @member {Uint8Array} body
             * @memberof dtalk.proto.Proto
             * @instance
             */
            Proto.prototype.body = $util.newBuffer([]);

            /**
             * Creates a new Proto instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.Proto
             * @static
             * @param {dtalk.proto.IProto=} [properties] Properties to set
             * @returns {dtalk.proto.Proto} Proto instance
             */
            Proto.create = function create(properties) {
                return new Proto(properties);
            };

            /**
             * Encodes the specified Proto message. Does not implicitly {@link dtalk.proto.Proto.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.Proto
             * @static
             * @param {dtalk.proto.IProto} message Proto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Proto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.eventType);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.body);
                return writer;
            };

            /**
             * Encodes the specified Proto message, length delimited. Does not implicitly {@link dtalk.proto.Proto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.Proto
             * @static
             * @param {dtalk.proto.IProto} message Proto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Proto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Proto message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.Proto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.Proto} Proto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Proto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.Proto();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.eventType = reader.int32();
                        break;
                    case 2:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Proto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.Proto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.Proto} Proto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Proto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Proto message.
             * @function verify
             * @memberof dtalk.proto.Proto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Proto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.eventType != null && message.hasOwnProperty("eventType"))
                    switch (message.eventType) {
                    default:
                        return "eventType: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.body != null && message.hasOwnProperty("body"))
                    if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                        return "body: buffer expected";
                return null;
            };

            /**
             * Creates a Proto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.Proto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.Proto} Proto
             */
            Proto.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.Proto)
                    return object;
                let message = new $root.dtalk.proto.Proto();
                switch (object.eventType) {
                case "commonMsg":
                case 0:
                    message.eventType = 0;
                    break;
                case "commonMsgAck":
                case 1:
                    message.eventType = 1;
                    break;
                }
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };

            /**
             * Creates a plain object from a Proto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.Proto
             * @static
             * @param {dtalk.proto.Proto} message Proto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Proto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.eventType = options.enums === String ? "commonMsg" : 0;
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.eventType != null && message.hasOwnProperty("eventType"))
                    object.eventType = options.enums === String ? $root.dtalk.proto.EventType[message.eventType] : message.eventType;
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };

            /**
             * Converts this Proto to JSON.
             * @function toJSON
             * @memberof dtalk.proto.Proto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Proto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Proto;
        })();

        proto.CommonMsg = (function() {

            /**
             * Properties of a CommonMsg.
             * @memberof dtalk.proto
             * @interface ICommonMsg
             * @property {number|null} [channelType] CommonMsg channelType
             * @property {number|Long|null} [logId] CommonMsg logId
             * @property {string|null} [msgId] CommonMsg msgId
             * @property {string|null} [from] CommonMsg from
             * @property {string|null} [target] CommonMsg target
             * @property {number|null} [msgType] CommonMsg msgType
             * @property {Uint8Array|null} [msg] CommonMsg msg
             * @property {number|Long|null} [datetime] CommonMsg datetime
             */

            /**
             * Constructs a new CommonMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a CommonMsg.
             * @implements ICommonMsg
             * @constructor
             * @param {dtalk.proto.ICommonMsg=} [properties] Properties to set
             */
            function CommonMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CommonMsg channelType.
             * @member {number} channelType
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.channelType = 0;

            /**
             * CommonMsg logId.
             * @member {number|Long} logId
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.logId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * CommonMsg msgId.
             * @member {string} msgId
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.msgId = "";

            /**
             * CommonMsg from.
             * @member {string} from
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.from = "";

            /**
             * CommonMsg target.
             * @member {string} target
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.target = "";

            /**
             * CommonMsg msgType.
             * @member {number} msgType
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.msgType = 0;

            /**
             * CommonMsg msg.
             * @member {Uint8Array} msg
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.msg = $util.newBuffer([]);

            /**
             * CommonMsg datetime.
             * @member {number|Long} datetime
             * @memberof dtalk.proto.CommonMsg
             * @instance
             */
            CommonMsg.prototype.datetime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new CommonMsg instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {dtalk.proto.ICommonMsg=} [properties] Properties to set
             * @returns {dtalk.proto.CommonMsg} CommonMsg instance
             */
            CommonMsg.create = function create(properties) {
                return new CommonMsg(properties);
            };

            /**
             * Encodes the specified CommonMsg message. Does not implicitly {@link dtalk.proto.CommonMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {dtalk.proto.ICommonMsg} message CommonMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CommonMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.channelType != null && Object.hasOwnProperty.call(message, "channelType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.channelType);
                if (message.logId != null && Object.hasOwnProperty.call(message, "logId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.logId);
                if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.msgId);
                if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.from);
                if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.target);
                if (message.msgType != null && Object.hasOwnProperty.call(message, "msgType"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.msgType);
                if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                    writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.msg);
                if (message.datetime != null && Object.hasOwnProperty.call(message, "datetime"))
                    writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.datetime);
                return writer;
            };

            /**
             * Encodes the specified CommonMsg message, length delimited. Does not implicitly {@link dtalk.proto.CommonMsg.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {dtalk.proto.ICommonMsg} message CommonMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CommonMsg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CommonMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.CommonMsg} CommonMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CommonMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.CommonMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.channelType = reader.int32();
                        break;
                    case 2:
                        message.logId = reader.int64();
                        break;
                    case 3:
                        message.msgId = reader.string();
                        break;
                    case 4:
                        message.from = reader.string();
                        break;
                    case 5:
                        message.target = reader.string();
                        break;
                    case 6:
                        message.msgType = reader.int32();
                        break;
                    case 7:
                        message.msg = reader.bytes();
                        break;
                    case 8:
                        message.datetime = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CommonMsg message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.CommonMsg} CommonMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CommonMsg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CommonMsg message.
             * @function verify
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CommonMsg.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.channelType != null && message.hasOwnProperty("channelType"))
                    if (!$util.isInteger(message.channelType))
                        return "channelType: integer expected";
                if (message.logId != null && message.hasOwnProperty("logId"))
                    if (!$util.isInteger(message.logId) && !(message.logId && $util.isInteger(message.logId.low) && $util.isInteger(message.logId.high)))
                        return "logId: integer|Long expected";
                if (message.msgId != null && message.hasOwnProperty("msgId"))
                    if (!$util.isString(message.msgId))
                        return "msgId: string expected";
                if (message.from != null && message.hasOwnProperty("from"))
                    if (!$util.isString(message.from))
                        return "from: string expected";
                if (message.target != null && message.hasOwnProperty("target"))
                    if (!$util.isString(message.target))
                        return "target: string expected";
                if (message.msgType != null && message.hasOwnProperty("msgType"))
                    if (!$util.isInteger(message.msgType))
                        return "msgType: integer expected";
                if (message.msg != null && message.hasOwnProperty("msg"))
                    if (!(message.msg && typeof message.msg.length === "number" || $util.isString(message.msg)))
                        return "msg: buffer expected";
                if (message.datetime != null && message.hasOwnProperty("datetime"))
                    if (!$util.isInteger(message.datetime) && !(message.datetime && $util.isInteger(message.datetime.low) && $util.isInteger(message.datetime.high)))
                        return "datetime: integer|Long expected";
                return null;
            };

            /**
             * Creates a CommonMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.CommonMsg} CommonMsg
             */
            CommonMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.CommonMsg)
                    return object;
                let message = new $root.dtalk.proto.CommonMsg();
                if (object.channelType != null)
                    message.channelType = object.channelType | 0;
                if (object.logId != null)
                    if ($util.Long)
                        (message.logId = $util.Long.fromValue(object.logId)).unsigned = false;
                    else if (typeof object.logId === "string")
                        message.logId = parseInt(object.logId, 10);
                    else if (typeof object.logId === "number")
                        message.logId = object.logId;
                    else if (typeof object.logId === "object")
                        message.logId = new $util.LongBits(object.logId.low >>> 0, object.logId.high >>> 0).toNumber();
                if (object.msgId != null)
                    message.msgId = String(object.msgId);
                if (object.from != null)
                    message.from = String(object.from);
                if (object.target != null)
                    message.target = String(object.target);
                if (object.msgType != null)
                    message.msgType = object.msgType | 0;
                if (object.msg != null)
                    if (typeof object.msg === "string")
                        $util.base64.decode(object.msg, message.msg = $util.newBuffer($util.base64.length(object.msg)), 0);
                    else if (object.msg.length)
                        message.msg = object.msg;
                if (object.datetime != null)
                    if ($util.Long)
                        (message.datetime = $util.Long.fromValue(object.datetime)).unsigned = true;
                    else if (typeof object.datetime === "string")
                        message.datetime = parseInt(object.datetime, 10);
                    else if (typeof object.datetime === "number")
                        message.datetime = object.datetime;
                    else if (typeof object.datetime === "object")
                        message.datetime = new $util.LongBits(object.datetime.low >>> 0, object.datetime.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a CommonMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.CommonMsg
             * @static
             * @param {dtalk.proto.CommonMsg} message CommonMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CommonMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.channelType = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.logId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.logId = options.longs === String ? "0" : 0;
                    object.msgId = "";
                    object.from = "";
                    object.target = "";
                    object.msgType = 0;
                    if (options.bytes === String)
                        object.msg = "";
                    else {
                        object.msg = [];
                        if (options.bytes !== Array)
                            object.msg = $util.newBuffer(object.msg);
                    }
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.datetime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.datetime = options.longs === String ? "0" : 0;
                }
                if (message.channelType != null && message.hasOwnProperty("channelType"))
                    object.channelType = message.channelType;
                if (message.logId != null && message.hasOwnProperty("logId"))
                    if (typeof message.logId === "number")
                        object.logId = options.longs === String ? String(message.logId) : message.logId;
                    else
                        object.logId = options.longs === String ? $util.Long.prototype.toString.call(message.logId) : options.longs === Number ? new $util.LongBits(message.logId.low >>> 0, message.logId.high >>> 0).toNumber() : message.logId;
                if (message.msgId != null && message.hasOwnProperty("msgId"))
                    object.msgId = message.msgId;
                if (message.from != null && message.hasOwnProperty("from"))
                    object.from = message.from;
                if (message.target != null && message.hasOwnProperty("target"))
                    object.target = message.target;
                if (message.msgType != null && message.hasOwnProperty("msgType"))
                    object.msgType = message.msgType;
                if (message.msg != null && message.hasOwnProperty("msg"))
                    object.msg = options.bytes === String ? $util.base64.encode(message.msg, 0, message.msg.length) : options.bytes === Array ? Array.prototype.slice.call(message.msg) : message.msg;
                if (message.datetime != null && message.hasOwnProperty("datetime"))
                    if (typeof message.datetime === "number")
                        object.datetime = options.longs === String ? String(message.datetime) : message.datetime;
                    else
                        object.datetime = options.longs === String ? $util.Long.prototype.toString.call(message.datetime) : options.longs === Number ? new $util.LongBits(message.datetime.low >>> 0, message.datetime.high >>> 0).toNumber(true) : message.datetime;
                return object;
            };

            /**
             * Converts this CommonMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.CommonMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CommonMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CommonMsg;
        })();

        /**
         * EventType enum.
         * @name dtalk.proto.EventType
         * @enum {number}
         * @property {number} commonMsg=0 commonMsg value
         * @property {number} commonMsgAck=1 commonMsgAck value
         */
        proto.EventType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "commonMsg"] = 0;
            values[valuesById[1] = "commonMsgAck"] = 1;
            return values;
        })();

        /**
         * MsgType enum.
         * @name dtalk.proto.MsgType
         * @enum {number}
         * @property {number} System=0 System value
         * @property {number} Text=1 Text value
         * @property {number} Audio=2 Audio value
         * @property {number} Image=3 Image value
         * @property {number} Video=4 Video value
         * @property {number} File=5 File value
         * @property {number} Card=6 Card value
         */
        proto.MsgType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "System"] = 0;
            values[valuesById[1] = "Text"] = 1;
            values[valuesById[2] = "Audio"] = 2;
            values[valuesById[3] = "Image"] = 3;
            values[valuesById[4] = "Video"] = 4;
            values[valuesById[5] = "File"] = 5;
            values[valuesById[6] = "Card"] = 6;
            return values;
        })();

        proto.CommonMsgAck = (function() {

            /**
             * Properties of a CommonMsgAck.
             * @memberof dtalk.proto
             * @interface ICommonMsgAck
             * @property {number|Long|null} [logId] CommonMsgAck logId
             * @property {number|Long|null} [datetime] CommonMsgAck datetime
             */

            /**
             * Constructs a new CommonMsgAck.
             * @memberof dtalk.proto
             * @classdesc Represents a CommonMsgAck.
             * @implements ICommonMsgAck
             * @constructor
             * @param {dtalk.proto.ICommonMsgAck=} [properties] Properties to set
             */
            function CommonMsgAck(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CommonMsgAck logId.
             * @member {number|Long} logId
             * @memberof dtalk.proto.CommonMsgAck
             * @instance
             */
            CommonMsgAck.prototype.logId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * CommonMsgAck datetime.
             * @member {number|Long} datetime
             * @memberof dtalk.proto.CommonMsgAck
             * @instance
             */
            CommonMsgAck.prototype.datetime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new CommonMsgAck instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {dtalk.proto.ICommonMsgAck=} [properties] Properties to set
             * @returns {dtalk.proto.CommonMsgAck} CommonMsgAck instance
             */
            CommonMsgAck.create = function create(properties) {
                return new CommonMsgAck(properties);
            };

            /**
             * Encodes the specified CommonMsgAck message. Does not implicitly {@link dtalk.proto.CommonMsgAck.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {dtalk.proto.ICommonMsgAck} message CommonMsgAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CommonMsgAck.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.logId != null && Object.hasOwnProperty.call(message, "logId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.logId);
                if (message.datetime != null && Object.hasOwnProperty.call(message, "datetime"))
                    writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.datetime);
                return writer;
            };

            /**
             * Encodes the specified CommonMsgAck message, length delimited. Does not implicitly {@link dtalk.proto.CommonMsgAck.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {dtalk.proto.ICommonMsgAck} message CommonMsgAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CommonMsgAck.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CommonMsgAck message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.CommonMsgAck} CommonMsgAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CommonMsgAck.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.CommonMsgAck();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.logId = reader.int64();
                        break;
                    case 8:
                        message.datetime = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CommonMsgAck message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.CommonMsgAck} CommonMsgAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CommonMsgAck.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CommonMsgAck message.
             * @function verify
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CommonMsgAck.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.logId != null && message.hasOwnProperty("logId"))
                    if (!$util.isInteger(message.logId) && !(message.logId && $util.isInteger(message.logId.low) && $util.isInteger(message.logId.high)))
                        return "logId: integer|Long expected";
                if (message.datetime != null && message.hasOwnProperty("datetime"))
                    if (!$util.isInteger(message.datetime) && !(message.datetime && $util.isInteger(message.datetime.low) && $util.isInteger(message.datetime.high)))
                        return "datetime: integer|Long expected";
                return null;
            };

            /**
             * Creates a CommonMsgAck message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.CommonMsgAck} CommonMsgAck
             */
            CommonMsgAck.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.CommonMsgAck)
                    return object;
                let message = new $root.dtalk.proto.CommonMsgAck();
                if (object.logId != null)
                    if ($util.Long)
                        (message.logId = $util.Long.fromValue(object.logId)).unsigned = false;
                    else if (typeof object.logId === "string")
                        message.logId = parseInt(object.logId, 10);
                    else if (typeof object.logId === "number")
                        message.logId = object.logId;
                    else if (typeof object.logId === "object")
                        message.logId = new $util.LongBits(object.logId.low >>> 0, object.logId.high >>> 0).toNumber();
                if (object.datetime != null)
                    if ($util.Long)
                        (message.datetime = $util.Long.fromValue(object.datetime)).unsigned = true;
                    else if (typeof object.datetime === "string")
                        message.datetime = parseInt(object.datetime, 10);
                    else if (typeof object.datetime === "number")
                        message.datetime = object.datetime;
                    else if (typeof object.datetime === "object")
                        message.datetime = new $util.LongBits(object.datetime.low >>> 0, object.datetime.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a CommonMsgAck message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.CommonMsgAck
             * @static
             * @param {dtalk.proto.CommonMsgAck} message CommonMsgAck
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CommonMsgAck.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.logId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.logId = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.datetime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.datetime = options.longs === String ? "0" : 0;
                }
                if (message.logId != null && message.hasOwnProperty("logId"))
                    if (typeof message.logId === "number")
                        object.logId = options.longs === String ? String(message.logId) : message.logId;
                    else
                        object.logId = options.longs === String ? $util.Long.prototype.toString.call(message.logId) : options.longs === Number ? new $util.LongBits(message.logId.low >>> 0, message.logId.high >>> 0).toNumber() : message.logId;
                if (message.datetime != null && message.hasOwnProperty("datetime"))
                    if (typeof message.datetime === "number")
                        object.datetime = options.longs === String ? String(message.datetime) : message.datetime;
                    else
                        object.datetime = options.longs === String ? $util.Long.prototype.toString.call(message.datetime) : options.longs === Number ? new $util.LongBits(message.datetime.low >>> 0, message.datetime.high >>> 0).toNumber(true) : message.datetime;
                return object;
            };

            /**
             * Converts this CommonMsgAck to JSON.
             * @function toJSON
             * @memberof dtalk.proto.CommonMsgAck
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CommonMsgAck.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CommonMsgAck;
        })();

        proto.TextMsg = (function() {

            /**
             * Properties of a TextMsg.
             * @memberof dtalk.proto
             * @interface ITextMsg
             * @property {string|null} [content] TextMsg content
             */

            /**
             * Constructs a new TextMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a TextMsg.
             * @implements ITextMsg
             * @constructor
             * @param {dtalk.proto.ITextMsg=} [properties] Properties to set
             */
            function TextMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TextMsg content.
             * @member {string} content
             * @memberof dtalk.proto.TextMsg
             * @instance
             */
            TextMsg.prototype.content = "";

            /**
             * Creates a new TextMsg instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {dtalk.proto.ITextMsg=} [properties] Properties to set
             * @returns {dtalk.proto.TextMsg} TextMsg instance
             */
            TextMsg.create = function create(properties) {
                return new TextMsg(properties);
            };

            /**
             * Encodes the specified TextMsg message. Does not implicitly {@link dtalk.proto.TextMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {dtalk.proto.ITextMsg} message TextMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TextMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
                return writer;
            };

            /**
             * Encodes the specified TextMsg message, length delimited. Does not implicitly {@link dtalk.proto.TextMsg.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {dtalk.proto.ITextMsg} message TextMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TextMsg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TextMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.TextMsg} TextMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TextMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.TextMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.content = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TextMsg message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.TextMsg} TextMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TextMsg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TextMsg message.
             * @function verify
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TextMsg.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.content != null && message.hasOwnProperty("content"))
                    if (!$util.isString(message.content))
                        return "content: string expected";
                return null;
            };

            /**
             * Creates a TextMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.TextMsg} TextMsg
             */
            TextMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.TextMsg)
                    return object;
                let message = new $root.dtalk.proto.TextMsg();
                if (object.content != null)
                    message.content = String(object.content);
                return message;
            };

            /**
             * Creates a plain object from a TextMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.TextMsg
             * @static
             * @param {dtalk.proto.TextMsg} message TextMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TextMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.content = "";
                if (message.content != null && message.hasOwnProperty("content"))
                    object.content = message.content;
                return object;
            };

            /**
             * Converts this TextMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.TextMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TextMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TextMsg;
        })();

        proto.AudioMsg = (function() {

            /**
             * Properties of an AudioMsg.
             * @memberof dtalk.proto
             * @interface IAudioMsg
             * @property {string|null} [mediaUrl] AudioMsg mediaUrl
             * @property {number|null} [time] AudioMsg time
             */

            /**
             * Constructs a new AudioMsg.
             * @memberof dtalk.proto
             * @classdesc Represents an AudioMsg.
             * @implements IAudioMsg
             * @constructor
             * @param {dtalk.proto.IAudioMsg=} [properties] Properties to set
             */
            function AudioMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AudioMsg mediaUrl.
             * @member {string} mediaUrl
             * @memberof dtalk.proto.AudioMsg
             * @instance
             */
            AudioMsg.prototype.mediaUrl = "";

            /**
             * AudioMsg time.
             * @member {number} time
             * @memberof dtalk.proto.AudioMsg
             * @instance
             */
            AudioMsg.prototype.time = 0;

            /**
             * Creates a new AudioMsg instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {dtalk.proto.IAudioMsg=} [properties] Properties to set
             * @returns {dtalk.proto.AudioMsg} AudioMsg instance
             */
            AudioMsg.create = function create(properties) {
                return new AudioMsg(properties);
            };

            /**
             * Encodes the specified AudioMsg message. Does not implicitly {@link dtalk.proto.AudioMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {dtalk.proto.IAudioMsg} message AudioMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AudioMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.mediaUrl != null && Object.hasOwnProperty.call(message, "mediaUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.mediaUrl);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.time);
                return writer;
            };

            /**
             * Encodes the specified AudioMsg message, length delimited. Does not implicitly {@link dtalk.proto.AudioMsg.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {dtalk.proto.IAudioMsg} message AudioMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AudioMsg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AudioMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.AudioMsg} AudioMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AudioMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.AudioMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mediaUrl = reader.string();
                        break;
                    case 2:
                        message.time = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AudioMsg message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.AudioMsg} AudioMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AudioMsg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AudioMsg message.
             * @function verify
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AudioMsg.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    if (!$util.isString(message.mediaUrl))
                        return "mediaUrl: string expected";
                if (message.time != null && message.hasOwnProperty("time"))
                    if (!$util.isInteger(message.time))
                        return "time: integer expected";
                return null;
            };

            /**
             * Creates an AudioMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.AudioMsg} AudioMsg
             */
            AudioMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.AudioMsg)
                    return object;
                let message = new $root.dtalk.proto.AudioMsg();
                if (object.mediaUrl != null)
                    message.mediaUrl = String(object.mediaUrl);
                if (object.time != null)
                    message.time = object.time | 0;
                return message;
            };

            /**
             * Creates a plain object from an AudioMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.AudioMsg
             * @static
             * @param {dtalk.proto.AudioMsg} message AudioMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AudioMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.mediaUrl = "";
                    object.time = 0;
                }
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    object.mediaUrl = message.mediaUrl;
                if (message.time != null && message.hasOwnProperty("time"))
                    object.time = message.time;
                return object;
            };

            /**
             * Converts this AudioMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.AudioMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AudioMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AudioMsg;
        })();

        proto.ImageMsg = (function() {

            /**
             * Properties of an ImageMsg.
             * @memberof dtalk.proto
             * @interface IImageMsg
             * @property {string|null} [mediaUrl] ImageMsg mediaUrl
             * @property {number|null} [height] ImageMsg height
             * @property {number|null} [width] ImageMsg width
             */

            /**
             * Constructs a new ImageMsg.
             * @memberof dtalk.proto
             * @classdesc Represents an ImageMsg.
             * @implements IImageMsg
             * @constructor
             * @param {dtalk.proto.IImageMsg=} [properties] Properties to set
             */
            function ImageMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ImageMsg mediaUrl.
             * @member {string} mediaUrl
             * @memberof dtalk.proto.ImageMsg
             * @instance
             */
            ImageMsg.prototype.mediaUrl = "";

            /**
             * ImageMsg height.
             * @member {number} height
             * @memberof dtalk.proto.ImageMsg
             * @instance
             */
            ImageMsg.prototype.height = 0;

            /**
             * ImageMsg width.
             * @member {number} width
             * @memberof dtalk.proto.ImageMsg
             * @instance
             */
            ImageMsg.prototype.width = 0;

            /**
             * Creates a new ImageMsg instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {dtalk.proto.IImageMsg=} [properties] Properties to set
             * @returns {dtalk.proto.ImageMsg} ImageMsg instance
             */
            ImageMsg.create = function create(properties) {
                return new ImageMsg(properties);
            };

            /**
             * Encodes the specified ImageMsg message. Does not implicitly {@link dtalk.proto.ImageMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {dtalk.proto.IImageMsg} message ImageMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ImageMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.mediaUrl != null && Object.hasOwnProperty.call(message, "mediaUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.mediaUrl);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.height);
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.width);
                return writer;
            };

            /**
             * Encodes the specified ImageMsg message, length delimited. Does not implicitly {@link dtalk.proto.ImageMsg.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {dtalk.proto.IImageMsg} message ImageMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ImageMsg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ImageMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.ImageMsg} ImageMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ImageMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.ImageMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mediaUrl = reader.string();
                        break;
                    case 2:
                        message.height = reader.int32();
                        break;
                    case 3:
                        message.width = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ImageMsg message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.ImageMsg} ImageMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ImageMsg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ImageMsg message.
             * @function verify
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ImageMsg.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    if (!$util.isString(message.mediaUrl))
                        return "mediaUrl: string expected";
                if (message.height != null && message.hasOwnProperty("height"))
                    if (!$util.isInteger(message.height))
                        return "height: integer expected";
                if (message.width != null && message.hasOwnProperty("width"))
                    if (!$util.isInteger(message.width))
                        return "width: integer expected";
                return null;
            };

            /**
             * Creates an ImageMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.ImageMsg} ImageMsg
             */
            ImageMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.ImageMsg)
                    return object;
                let message = new $root.dtalk.proto.ImageMsg();
                if (object.mediaUrl != null)
                    message.mediaUrl = String(object.mediaUrl);
                if (object.height != null)
                    message.height = object.height | 0;
                if (object.width != null)
                    message.width = object.width | 0;
                return message;
            };

            /**
             * Creates a plain object from an ImageMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.ImageMsg
             * @static
             * @param {dtalk.proto.ImageMsg} message ImageMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ImageMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.mediaUrl = "";
                    object.height = 0;
                    object.width = 0;
                }
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    object.mediaUrl = message.mediaUrl;
                if (message.height != null && message.hasOwnProperty("height"))
                    object.height = message.height;
                if (message.width != null && message.hasOwnProperty("width"))
                    object.width = message.width;
                return object;
            };

            /**
             * Converts this ImageMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.ImageMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ImageMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ImageMsg;
        })();

        proto.VideoMsg = (function() {

            /**
             * Properties of a VideoMsg.
             * @memberof dtalk.proto
             * @interface IVideoMsg
             * @property {string|null} [mediaUrl] VideoMsg mediaUrl
             * @property {number|null} [time] VideoMsg time
             * @property {number|null} [height] VideoMsg height
             * @property {number|null} [width] VideoMsg width
             */

            /**
             * Constructs a new VideoMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a VideoMsg.
             * @implements IVideoMsg
             * @constructor
             * @param {dtalk.proto.IVideoMsg=} [properties] Properties to set
             */
            function VideoMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VideoMsg mediaUrl.
             * @member {string} mediaUrl
             * @memberof dtalk.proto.VideoMsg
             * @instance
             */
            VideoMsg.prototype.mediaUrl = "";

            /**
             * VideoMsg time.
             * @member {number} time
             * @memberof dtalk.proto.VideoMsg
             * @instance
             */
            VideoMsg.prototype.time = 0;

            /**
             * VideoMsg height.
             * @member {number} height
             * @memberof dtalk.proto.VideoMsg
             * @instance
             */
            VideoMsg.prototype.height = 0;

            /**
             * VideoMsg width.
             * @member {number} width
             * @memberof dtalk.proto.VideoMsg
             * @instance
             */
            VideoMsg.prototype.width = 0;

            /**
             * Creates a new VideoMsg instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {dtalk.proto.IVideoMsg=} [properties] Properties to set
             * @returns {dtalk.proto.VideoMsg} VideoMsg instance
             */
            VideoMsg.create = function create(properties) {
                return new VideoMsg(properties);
            };

            /**
             * Encodes the specified VideoMsg message. Does not implicitly {@link dtalk.proto.VideoMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {dtalk.proto.IVideoMsg} message VideoMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VideoMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.mediaUrl != null && Object.hasOwnProperty.call(message, "mediaUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.mediaUrl);
                if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.time);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.height);
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.width);
                return writer;
            };

            /**
             * Encodes the specified VideoMsg message, length delimited. Does not implicitly {@link dtalk.proto.VideoMsg.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {dtalk.proto.IVideoMsg} message VideoMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VideoMsg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a VideoMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.VideoMsg} VideoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VideoMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.VideoMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mediaUrl = reader.string();
                        break;
                    case 2:
                        message.time = reader.int32();
                        break;
                    case 3:
                        message.height = reader.int32();
                        break;
                    case 4:
                        message.width = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a VideoMsg message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.VideoMsg} VideoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VideoMsg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VideoMsg message.
             * @function verify
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VideoMsg.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    if (!$util.isString(message.mediaUrl))
                        return "mediaUrl: string expected";
                if (message.time != null && message.hasOwnProperty("time"))
                    if (!$util.isInteger(message.time))
                        return "time: integer expected";
                if (message.height != null && message.hasOwnProperty("height"))
                    if (!$util.isInteger(message.height))
                        return "height: integer expected";
                if (message.width != null && message.hasOwnProperty("width"))
                    if (!$util.isInteger(message.width))
                        return "width: integer expected";
                return null;
            };

            /**
             * Creates a VideoMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.VideoMsg} VideoMsg
             */
            VideoMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.VideoMsg)
                    return object;
                let message = new $root.dtalk.proto.VideoMsg();
                if (object.mediaUrl != null)
                    message.mediaUrl = String(object.mediaUrl);
                if (object.time != null)
                    message.time = object.time | 0;
                if (object.height != null)
                    message.height = object.height | 0;
                if (object.width != null)
                    message.width = object.width | 0;
                return message;
            };

            /**
             * Creates a plain object from a VideoMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.VideoMsg
             * @static
             * @param {dtalk.proto.VideoMsg} message VideoMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VideoMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.mediaUrl = "";
                    object.time = 0;
                    object.height = 0;
                    object.width = 0;
                }
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    object.mediaUrl = message.mediaUrl;
                if (message.time != null && message.hasOwnProperty("time"))
                    object.time = message.time;
                if (message.height != null && message.hasOwnProperty("height"))
                    object.height = message.height;
                if (message.width != null && message.hasOwnProperty("width"))
                    object.width = message.width;
                return object;
            };

            /**
             * Converts this VideoMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.VideoMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VideoMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return VideoMsg;
        })();

        proto.FileMsg = (function() {

            /**
             * Properties of a FileMsg.
             * @memberof dtalk.proto
             * @interface IFileMsg
             * @property {string|null} [mediaUrl] FileMsg mediaUrl
             * @property {string|null} [name] FileMsg name
             * @property {string|null} [md5] FileMsg md5
             * @property {number|Long|null} [size] FileMsg size
             */

            /**
             * Constructs a new FileMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a FileMsg.
             * @implements IFileMsg
             * @constructor
             * @param {dtalk.proto.IFileMsg=} [properties] Properties to set
             */
            function FileMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FileMsg mediaUrl.
             * @member {string} mediaUrl
             * @memberof dtalk.proto.FileMsg
             * @instance
             */
            FileMsg.prototype.mediaUrl = "";

            /**
             * FileMsg name.
             * @member {string} name
             * @memberof dtalk.proto.FileMsg
             * @instance
             */
            FileMsg.prototype.name = "";

            /**
             * FileMsg md5.
             * @member {string} md5
             * @memberof dtalk.proto.FileMsg
             * @instance
             */
            FileMsg.prototype.md5 = "";

            /**
             * FileMsg size.
             * @member {number|Long} size
             * @memberof dtalk.proto.FileMsg
             * @instance
             */
            FileMsg.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new FileMsg instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {dtalk.proto.IFileMsg=} [properties] Properties to set
             * @returns {dtalk.proto.FileMsg} FileMsg instance
             */
            FileMsg.create = function create(properties) {
                return new FileMsg(properties);
            };

            /**
             * Encodes the specified FileMsg message. Does not implicitly {@link dtalk.proto.FileMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {dtalk.proto.IFileMsg} message FileMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.mediaUrl != null && Object.hasOwnProperty.call(message, "mediaUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.mediaUrl);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.md5 != null && Object.hasOwnProperty.call(message, "md5"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.md5);
                if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.size);
                return writer;
            };

            /**
             * Encodes the specified FileMsg message, length delimited. Does not implicitly {@link dtalk.proto.FileMsg.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {dtalk.proto.IFileMsg} message FileMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileMsg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FileMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.FileMsg} FileMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FileMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.FileMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.mediaUrl = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.md5 = reader.string();
                        break;
                    case 4:
                        message.size = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a FileMsg message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.FileMsg} FileMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FileMsg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FileMsg message.
             * @function verify
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FileMsg.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    if (!$util.isString(message.mediaUrl))
                        return "mediaUrl: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.md5 != null && message.hasOwnProperty("md5"))
                    if (!$util.isString(message.md5))
                        return "md5: string expected";
                if (message.size != null && message.hasOwnProperty("size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                return null;
            };

            /**
             * Creates a FileMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.FileMsg} FileMsg
             */
            FileMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.FileMsg)
                    return object;
                let message = new $root.dtalk.proto.FileMsg();
                if (object.mediaUrl != null)
                    message.mediaUrl = String(object.mediaUrl);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.md5 != null)
                    message.md5 = String(object.md5);
                if (object.size != null)
                    if ($util.Long)
                        (message.size = $util.Long.fromValue(object.size)).unsigned = false;
                    else if (typeof object.size === "string")
                        message.size = parseInt(object.size, 10);
                    else if (typeof object.size === "number")
                        message.size = object.size;
                    else if (typeof object.size === "object")
                        message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a FileMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.FileMsg
             * @static
             * @param {dtalk.proto.FileMsg} message FileMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FileMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.mediaUrl = "";
                    object.name = "";
                    object.md5 = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.size = options.longs === String ? "0" : 0;
                }
                if (message.mediaUrl != null && message.hasOwnProperty("mediaUrl"))
                    object.mediaUrl = message.mediaUrl;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.md5 != null && message.hasOwnProperty("md5"))
                    object.md5 = message.md5;
                if (message.size != null && message.hasOwnProperty("size"))
                    if (typeof message.size === "number")
                        object.size = options.longs === String ? String(message.size) : message.size;
                    else
                        object.size = options.longs === String ? $util.Long.prototype.toString.call(message.size) : options.longs === Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                return object;
            };

            /**
             * Converts this FileMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.FileMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FileMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FileMsg;
        })();

        proto.CardMsg = (function() {

            /**
             * Properties of a CardMsg.
             * @memberof dtalk.proto
             * @interface ICardMsg
             * @property {string|null} [bank] CardMsg bank
             * @property {string|null} [name] CardMsg name
             * @property {string|null} [account] CardMsg account
             */

            /**
             * Constructs a new CardMsg.
             * @memberof dtalk.proto
             * @classdesc Represents a CardMsg.
             * @implements ICardMsg
             * @constructor
             * @param {dtalk.proto.ICardMsg=} [properties] Properties to set
             */
            function CardMsg(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CardMsg bank.
             * @member {string} bank
             * @memberof dtalk.proto.CardMsg
             * @instance
             */
            CardMsg.prototype.bank = "";

            /**
             * CardMsg name.
             * @member {string} name
             * @memberof dtalk.proto.CardMsg
             * @instance
             */
            CardMsg.prototype.name = "";

            /**
             * CardMsg account.
             * @member {string} account
             * @memberof dtalk.proto.CardMsg
             * @instance
             */
            CardMsg.prototype.account = "";

            /**
             * Creates a new CardMsg instance using the specified properties.
             * @function create
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {dtalk.proto.ICardMsg=} [properties] Properties to set
             * @returns {dtalk.proto.CardMsg} CardMsg instance
             */
            CardMsg.create = function create(properties) {
                return new CardMsg(properties);
            };

            /**
             * Encodes the specified CardMsg message. Does not implicitly {@link dtalk.proto.CardMsg.verify|verify} messages.
             * @function encode
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {dtalk.proto.ICardMsg} message CardMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CardMsg.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.bank != null && Object.hasOwnProperty.call(message, "bank"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.bank);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.account != null && Object.hasOwnProperty.call(message, "account"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.account);
                return writer;
            };

            /**
             * Encodes the specified CardMsg message, length delimited. Does not implicitly {@link dtalk.proto.CardMsg.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {dtalk.proto.ICardMsg} message CardMsg message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CardMsg.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CardMsg message from the specified reader or buffer.
             * @function decode
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dtalk.proto.CardMsg} CardMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CardMsg.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dtalk.proto.CardMsg();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.bank = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.account = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CardMsg message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dtalk.proto.CardMsg} CardMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CardMsg.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CardMsg message.
             * @function verify
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CardMsg.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.bank != null && message.hasOwnProperty("bank"))
                    if (!$util.isString(message.bank))
                        return "bank: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.account != null && message.hasOwnProperty("account"))
                    if (!$util.isString(message.account))
                        return "account: string expected";
                return null;
            };

            /**
             * Creates a CardMsg message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dtalk.proto.CardMsg} CardMsg
             */
            CardMsg.fromObject = function fromObject(object) {
                if (object instanceof $root.dtalk.proto.CardMsg)
                    return object;
                let message = new $root.dtalk.proto.CardMsg();
                if (object.bank != null)
                    message.bank = String(object.bank);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.account != null)
                    message.account = String(object.account);
                return message;
            };

            /**
             * Creates a plain object from a CardMsg message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dtalk.proto.CardMsg
             * @static
             * @param {dtalk.proto.CardMsg} message CardMsg
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CardMsg.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.bank = "";
                    object.name = "";
                    object.account = "";
                }
                if (message.bank != null && message.hasOwnProperty("bank"))
                    object.bank = message.bank;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.account != null && message.hasOwnProperty("account"))
                    object.account = message.account;
                return object;
            };

            /**
             * Converts this CardMsg to JSON.
             * @function toJSON
             * @memberof dtalk.proto.CardMsg
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CardMsg.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CardMsg;
        })();

        return proto;
    })();

    return dtalk;
})();

export { $root as default };
