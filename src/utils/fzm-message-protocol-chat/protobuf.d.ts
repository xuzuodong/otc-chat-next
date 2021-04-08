import * as $protobuf from "protobufjs";
/** Namespace dtalk. */
export namespace dtalk {

    /** Namespace proto. */
    namespace proto {

        /** Properties of a Proto. */
        interface IProto {

            /** Proto eventType */
            eventType?: (dtalk.proto.EventType|null);

            /** Proto body */
            body?: (Uint8Array|null);
        }

        /** Represents a Proto. */
        class Proto implements IProto {

            /**
             * Constructs a new Proto.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IProto);

            /** Proto eventType. */
            public eventType: dtalk.proto.EventType;

            /** Proto body. */
            public body: Uint8Array;

            /**
             * Creates a new Proto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Proto instance
             */
            public static create(properties?: dtalk.proto.IProto): dtalk.proto.Proto;

            /**
             * Encodes the specified Proto message. Does not implicitly {@link dtalk.proto.Proto.verify|verify} messages.
             * @param message Proto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Proto message, length delimited. Does not implicitly {@link dtalk.proto.Proto.verify|verify} messages.
             * @param message Proto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dtalk.proto.IProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Proto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Proto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.Proto;

            /**
             * Decodes a Proto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Proto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dtalk.proto.Proto;

            /**
             * Verifies a Proto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Proto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Proto
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.Proto;

            /**
             * Creates a plain object from a Proto message. Also converts values to other types if specified.
             * @param message Proto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.Proto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Proto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CommonMsg. */
        interface ICommonMsg {

            /** CommonMsg channelType */
            channelType?: (number|null);

            /** CommonMsg logId */
            logId?: (number|Long|null);

            /** CommonMsg msgId */
            msgId?: (string|null);

            /** CommonMsg from */
            from?: (string|null);

            /** CommonMsg target */
            target?: (string|null);

            /** CommonMsg msgType */
            msgType?: (number|null);

            /** CommonMsg msg */
            msg?: (Uint8Array|null);

            /** CommonMsg datetime */
            datetime?: (number|Long|null);
        }

        /** Represents a CommonMsg. */
        class CommonMsg implements ICommonMsg {

            /**
             * Constructs a new CommonMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ICommonMsg);

            /** CommonMsg channelType. */
            public channelType: number;

            /** CommonMsg logId. */
            public logId: (number|Long);

            /** CommonMsg msgId. */
            public msgId: string;

            /** CommonMsg from. */
            public from: string;

            /** CommonMsg target. */
            public target: string;

            /** CommonMsg msgType. */
            public msgType: number;

            /** CommonMsg msg. */
            public msg: Uint8Array;

            /** CommonMsg datetime. */
            public datetime: (number|Long);

            /**
             * Creates a new CommonMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CommonMsg instance
             */
            public static create(properties?: dtalk.proto.ICommonMsg): dtalk.proto.CommonMsg;

            /**
             * Encodes the specified CommonMsg message. Does not implicitly {@link dtalk.proto.CommonMsg.verify|verify} messages.
             * @param message CommonMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ICommonMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CommonMsg message, length delimited. Does not implicitly {@link dtalk.proto.CommonMsg.verify|verify} messages.
             * @param message CommonMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dtalk.proto.ICommonMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CommonMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CommonMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.CommonMsg;

            /**
             * Decodes a CommonMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CommonMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dtalk.proto.CommonMsg;

            /**
             * Verifies a CommonMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CommonMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CommonMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.CommonMsg;

            /**
             * Creates a plain object from a CommonMsg message. Also converts values to other types if specified.
             * @param message CommonMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.CommonMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CommonMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** EventType enum. */
        enum EventType {
            commonMsg = 0,
            commonMsgAck = 1
        }

        /** MsgType enum. */
        enum MsgType {
            System = 0,
            Text = 1,
            Audio = 2,
            Image = 3,
            Video = 4,
            File = 5
        }

        /** Properties of a CommonMsgAck. */
        interface ICommonMsgAck {

            /** CommonMsgAck logId */
            logId?: (number|Long|null);

            /** CommonMsgAck datetime */
            datetime?: (number|Long|null);
        }

        /** Represents a CommonMsgAck. */
        class CommonMsgAck implements ICommonMsgAck {

            /**
             * Constructs a new CommonMsgAck.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ICommonMsgAck);

            /** CommonMsgAck logId. */
            public logId: (number|Long);

            /** CommonMsgAck datetime. */
            public datetime: (number|Long);

            /**
             * Creates a new CommonMsgAck instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CommonMsgAck instance
             */
            public static create(properties?: dtalk.proto.ICommonMsgAck): dtalk.proto.CommonMsgAck;

            /**
             * Encodes the specified CommonMsgAck message. Does not implicitly {@link dtalk.proto.CommonMsgAck.verify|verify} messages.
             * @param message CommonMsgAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ICommonMsgAck, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CommonMsgAck message, length delimited. Does not implicitly {@link dtalk.proto.CommonMsgAck.verify|verify} messages.
             * @param message CommonMsgAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dtalk.proto.ICommonMsgAck, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CommonMsgAck message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CommonMsgAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.CommonMsgAck;

            /**
             * Decodes a CommonMsgAck message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CommonMsgAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dtalk.proto.CommonMsgAck;

            /**
             * Verifies a CommonMsgAck message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CommonMsgAck message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CommonMsgAck
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.CommonMsgAck;

            /**
             * Creates a plain object from a CommonMsgAck message. Also converts values to other types if specified.
             * @param message CommonMsgAck
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.CommonMsgAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CommonMsgAck to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TextMsg. */
        interface ITextMsg {

            /** TextMsg content */
            content?: (string|null);
        }

        /** Represents a TextMsg. */
        class TextMsg implements ITextMsg {

            /**
             * Constructs a new TextMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.ITextMsg);

            /** TextMsg content. */
            public content: string;

            /**
             * Creates a new TextMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TextMsg instance
             */
            public static create(properties?: dtalk.proto.ITextMsg): dtalk.proto.TextMsg;

            /**
             * Encodes the specified TextMsg message. Does not implicitly {@link dtalk.proto.TextMsg.verify|verify} messages.
             * @param message TextMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.ITextMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TextMsg message, length delimited. Does not implicitly {@link dtalk.proto.TextMsg.verify|verify} messages.
             * @param message TextMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dtalk.proto.ITextMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TextMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TextMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.TextMsg;

            /**
             * Decodes a TextMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TextMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dtalk.proto.TextMsg;

            /**
             * Verifies a TextMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TextMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TextMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.TextMsg;

            /**
             * Creates a plain object from a TextMsg message. Also converts values to other types if specified.
             * @param message TextMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.TextMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TextMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AudioMsg. */
        interface IAudioMsg {

            /** AudioMsg mediaUrl */
            mediaUrl?: (string|null);

            /** AudioMsg time */
            time?: (number|null);
        }

        /** Represents an AudioMsg. */
        class AudioMsg implements IAudioMsg {

            /**
             * Constructs a new AudioMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IAudioMsg);

            /** AudioMsg mediaUrl. */
            public mediaUrl: string;

            /** AudioMsg time. */
            public time: number;

            /**
             * Creates a new AudioMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AudioMsg instance
             */
            public static create(properties?: dtalk.proto.IAudioMsg): dtalk.proto.AudioMsg;

            /**
             * Encodes the specified AudioMsg message. Does not implicitly {@link dtalk.proto.AudioMsg.verify|verify} messages.
             * @param message AudioMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IAudioMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AudioMsg message, length delimited. Does not implicitly {@link dtalk.proto.AudioMsg.verify|verify} messages.
             * @param message AudioMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dtalk.proto.IAudioMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AudioMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AudioMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.AudioMsg;

            /**
             * Decodes an AudioMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AudioMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dtalk.proto.AudioMsg;

            /**
             * Verifies an AudioMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AudioMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AudioMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.AudioMsg;

            /**
             * Creates a plain object from an AudioMsg message. Also converts values to other types if specified.
             * @param message AudioMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.AudioMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AudioMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ImageMsg. */
        interface IImageMsg {

            /** ImageMsg mediaUrl */
            mediaUrl?: (string|null);

            /** ImageMsg height */
            height?: (number|null);

            /** ImageMsg width */
            width?: (number|null);
        }

        /** Represents an ImageMsg. */
        class ImageMsg implements IImageMsg {

            /**
             * Constructs a new ImageMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IImageMsg);

            /** ImageMsg mediaUrl. */
            public mediaUrl: string;

            /** ImageMsg height. */
            public height: number;

            /** ImageMsg width. */
            public width: number;

            /**
             * Creates a new ImageMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ImageMsg instance
             */
            public static create(properties?: dtalk.proto.IImageMsg): dtalk.proto.ImageMsg;

            /**
             * Encodes the specified ImageMsg message. Does not implicitly {@link dtalk.proto.ImageMsg.verify|verify} messages.
             * @param message ImageMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IImageMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ImageMsg message, length delimited. Does not implicitly {@link dtalk.proto.ImageMsg.verify|verify} messages.
             * @param message ImageMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dtalk.proto.IImageMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ImageMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ImageMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.ImageMsg;

            /**
             * Decodes an ImageMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ImageMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dtalk.proto.ImageMsg;

            /**
             * Verifies an ImageMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ImageMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ImageMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.ImageMsg;

            /**
             * Creates a plain object from an ImageMsg message. Also converts values to other types if specified.
             * @param message ImageMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.ImageMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ImageMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a VideoMsg. */
        interface IVideoMsg {

            /** VideoMsg mediaUrl */
            mediaUrl?: (string|null);

            /** VideoMsg time */
            time?: (number|null);

            /** VideoMsg height */
            height?: (number|null);

            /** VideoMsg width */
            width?: (number|null);
        }

        /** Represents a VideoMsg. */
        class VideoMsg implements IVideoMsg {

            /**
             * Constructs a new VideoMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IVideoMsg);

            /** VideoMsg mediaUrl. */
            public mediaUrl: string;

            /** VideoMsg time. */
            public time: number;

            /** VideoMsg height. */
            public height: number;

            /** VideoMsg width. */
            public width: number;

            /**
             * Creates a new VideoMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VideoMsg instance
             */
            public static create(properties?: dtalk.proto.IVideoMsg): dtalk.proto.VideoMsg;

            /**
             * Encodes the specified VideoMsg message. Does not implicitly {@link dtalk.proto.VideoMsg.verify|verify} messages.
             * @param message VideoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IVideoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VideoMsg message, length delimited. Does not implicitly {@link dtalk.proto.VideoMsg.verify|verify} messages.
             * @param message VideoMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dtalk.proto.IVideoMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VideoMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VideoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.VideoMsg;

            /**
             * Decodes a VideoMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VideoMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dtalk.proto.VideoMsg;

            /**
             * Verifies a VideoMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VideoMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VideoMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.VideoMsg;

            /**
             * Creates a plain object from a VideoMsg message. Also converts values to other types if specified.
             * @param message VideoMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.VideoMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VideoMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileMsg. */
        interface IFileMsg {

            /** FileMsg mediaUrl */
            mediaUrl?: (string|null);

            /** FileMsg name */
            name?: (string|null);

            /** FileMsg md5 */
            md5?: (string|null);

            /** FileMsg size */
            size?: (number|Long|null);
        }

        /** Represents a FileMsg. */
        class FileMsg implements IFileMsg {

            /**
             * Constructs a new FileMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: dtalk.proto.IFileMsg);

            /** FileMsg mediaUrl. */
            public mediaUrl: string;

            /** FileMsg name. */
            public name: string;

            /** FileMsg md5. */
            public md5: string;

            /** FileMsg size. */
            public size: (number|Long);

            /**
             * Creates a new FileMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileMsg instance
             */
            public static create(properties?: dtalk.proto.IFileMsg): dtalk.proto.FileMsg;

            /**
             * Encodes the specified FileMsg message. Does not implicitly {@link dtalk.proto.FileMsg.verify|verify} messages.
             * @param message FileMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dtalk.proto.IFileMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileMsg message, length delimited. Does not implicitly {@link dtalk.proto.FileMsg.verify|verify} messages.
             * @param message FileMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dtalk.proto.IFileMsg, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dtalk.proto.FileMsg;

            /**
             * Decodes a FileMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dtalk.proto.FileMsg;

            /**
             * Verifies a FileMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileMsg
             */
            public static fromObject(object: { [k: string]: any }): dtalk.proto.FileMsg;

            /**
             * Creates a plain object from a FileMsg message. Also converts values to other types if specified.
             * @param message FileMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dtalk.proto.FileMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
