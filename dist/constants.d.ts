export declare const FACTORY_ADDRESS = "0x6D8676147a648Ddf3835dfAF05F5f35B1AA17079";
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export declare const POOL_INIT_CODE_HASH = "0x010010aff6cbd6811df540ffd0b23ff5e3f663982fda3d7a27f56f05ae3a9f8c";
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export declare enum FeeAmount {
    LOWEST = 100,
    LOW = 500,
    MEDIUM = 3000,
    HIGH = 10000
}
/**
 * The default factory tick spacings by fee amount.
 */
export declare const TICK_SPACINGS: {
    [amount in FeeAmount]: number;
};
