import { Schema } from 'mongoose';

export const getNumberFromDecimal128 = (value: Schema.Types.Decimal128) => {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
};
