
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MerchantAccount
 * 
 */
export type MerchantAccount = $Result.DefaultSelection<Prisma.$MerchantAccountPayload>
/**
 * Model PlatformStorefrontSettings
 * 
 */
export type PlatformStorefrontSettings = $Result.DefaultSelection<Prisma.$PlatformStorefrontSettingsPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductSku
 * 
 */
export type ProductSku = $Result.DefaultSelection<Prisma.$ProductSkuPayload>
/**
 * Model PaymentProfile
 * 
 */
export type PaymentProfile = $Result.DefaultSelection<Prisma.$PaymentProfilePayload>
/**
 * Model ControlAuditLog
 * 
 */
export type ControlAuditLog = $Result.DefaultSelection<Prisma.$ControlAuditLogPayload>
/**
 * Model PaymentProfileRevision
 * 
 */
export type PaymentProfileRevision = $Result.DefaultSelection<Prisma.$PaymentProfileRevisionPayload>
/**
 * Model CardItem
 * 
 */
export type CardItem = $Result.DefaultSelection<Prisma.$CardItemPayload>
/**
 * Model ShopOrder
 * 
 */
export type ShopOrder = $Result.DefaultSelection<Prisma.$ShopOrderPayload>
/**
 * Model ShopPaymentAttempt
 * 
 */
export type ShopPaymentAttempt = $Result.DefaultSelection<Prisma.$ShopPaymentAttemptPayload>
/**
 * Model WebhookEventLog
 * 
 */
export type WebhookEventLog = $Result.DefaultSelection<Prisma.$WebhookEventLogPayload>
/**
 * Model OrderSyncTask
 * 
 */
export type OrderSyncTask = $Result.DefaultSelection<Prisma.$OrderSyncTaskPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProductStatus: {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
};

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus]


export const ProductSaleMode: {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI'
};

export type ProductSaleMode = (typeof ProductSaleMode)[keyof typeof ProductSaleMode]


export const CardItemStatus: {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  SOLD: 'SOLD'
};

export type CardItemStatus = (typeof CardItemStatus)[keyof typeof CardItemStatus]


export const ShopOrderStatus: {
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  FULFILLED: 'FULFILLED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED'
};

export type ShopOrderStatus = (typeof ShopOrderStatus)[keyof typeof ShopOrderStatus]


export const PaymentAttemptStatus: {
  CREATED: 'CREATED',
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

export type PaymentAttemptStatus = (typeof PaymentAttemptStatus)[keyof typeof PaymentAttemptStatus]


export const SyncTaskStatus: {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED'
};

export type SyncTaskStatus = (typeof SyncTaskStatus)[keyof typeof SyncTaskStatus]

}

export type ProductStatus = $Enums.ProductStatus

export const ProductStatus: typeof $Enums.ProductStatus

export type ProductSaleMode = $Enums.ProductSaleMode

export const ProductSaleMode: typeof $Enums.ProductSaleMode

export type CardItemStatus = $Enums.CardItemStatus

export const CardItemStatus: typeof $Enums.CardItemStatus

export type ShopOrderStatus = $Enums.ShopOrderStatus

export const ShopOrderStatus: typeof $Enums.ShopOrderStatus

export type PaymentAttemptStatus = $Enums.PaymentAttemptStatus

export const PaymentAttemptStatus: typeof $Enums.PaymentAttemptStatus

export type SyncTaskStatus = $Enums.SyncTaskStatus

export const SyncTaskStatus: typeof $Enums.SyncTaskStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more MerchantAccounts
 * const merchantAccounts = await prisma.merchantAccount.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more MerchantAccounts
   * const merchantAccounts = await prisma.merchantAccount.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.merchantAccount`: Exposes CRUD operations for the **MerchantAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MerchantAccounts
    * const merchantAccounts = await prisma.merchantAccount.findMany()
    * ```
    */
  get merchantAccount(): Prisma.MerchantAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.platformStorefrontSettings`: Exposes CRUD operations for the **PlatformStorefrontSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformStorefrontSettings
    * const platformStorefrontSettings = await prisma.platformStorefrontSettings.findMany()
    * ```
    */
  get platformStorefrontSettings(): Prisma.PlatformStorefrontSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productSku`: Exposes CRUD operations for the **ProductSku** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductSkus
    * const productSkus = await prisma.productSku.findMany()
    * ```
    */
  get productSku(): Prisma.ProductSkuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentProfile`: Exposes CRUD operations for the **PaymentProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentProfiles
    * const paymentProfiles = await prisma.paymentProfile.findMany()
    * ```
    */
  get paymentProfile(): Prisma.PaymentProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.controlAuditLog`: Exposes CRUD operations for the **ControlAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ControlAuditLogs
    * const controlAuditLogs = await prisma.controlAuditLog.findMany()
    * ```
    */
  get controlAuditLog(): Prisma.ControlAuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentProfileRevision`: Exposes CRUD operations for the **PaymentProfileRevision** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentProfileRevisions
    * const paymentProfileRevisions = await prisma.paymentProfileRevision.findMany()
    * ```
    */
  get paymentProfileRevision(): Prisma.PaymentProfileRevisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cardItem`: Exposes CRUD operations for the **CardItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CardItems
    * const cardItems = await prisma.cardItem.findMany()
    * ```
    */
  get cardItem(): Prisma.CardItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shopOrder`: Exposes CRUD operations for the **ShopOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopOrders
    * const shopOrders = await prisma.shopOrder.findMany()
    * ```
    */
  get shopOrder(): Prisma.ShopOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shopPaymentAttempt`: Exposes CRUD operations for the **ShopPaymentAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopPaymentAttempts
    * const shopPaymentAttempts = await prisma.shopPaymentAttempt.findMany()
    * ```
    */
  get shopPaymentAttempt(): Prisma.ShopPaymentAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEventLog`: Exposes CRUD operations for the **WebhookEventLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEventLogs
    * const webhookEventLogs = await prisma.webhookEventLog.findMany()
    * ```
    */
  get webhookEventLog(): Prisma.WebhookEventLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderSyncTask`: Exposes CRUD operations for the **OrderSyncTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderSyncTasks
    * const orderSyncTasks = await prisma.orderSyncTask.findMany()
    * ```
    */
  get orderSyncTask(): Prisma.OrderSyncTaskDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MerchantAccount: 'MerchantAccount',
    PlatformStorefrontSettings: 'PlatformStorefrontSettings',
    Product: 'Product',
    ProductSku: 'ProductSku',
    PaymentProfile: 'PaymentProfile',
    ControlAuditLog: 'ControlAuditLog',
    PaymentProfileRevision: 'PaymentProfileRevision',
    CardItem: 'CardItem',
    ShopOrder: 'ShopOrder',
    ShopPaymentAttempt: 'ShopPaymentAttempt',
    WebhookEventLog: 'WebhookEventLog',
    OrderSyncTask: 'OrderSyncTask'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "merchantAccount" | "platformStorefrontSettings" | "product" | "productSku" | "paymentProfile" | "controlAuditLog" | "paymentProfileRevision" | "cardItem" | "shopOrder" | "shopPaymentAttempt" | "webhookEventLog" | "orderSyncTask"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MerchantAccount: {
        payload: Prisma.$MerchantAccountPayload<ExtArgs>
        fields: Prisma.MerchantAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MerchantAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MerchantAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>
          }
          findFirst: {
            args: Prisma.MerchantAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MerchantAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>
          }
          findMany: {
            args: Prisma.MerchantAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>[]
          }
          create: {
            args: Prisma.MerchantAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>
          }
          createMany: {
            args: Prisma.MerchantAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MerchantAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>[]
          }
          delete: {
            args: Prisma.MerchantAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>
          }
          update: {
            args: Prisma.MerchantAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>
          }
          deleteMany: {
            args: Prisma.MerchantAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MerchantAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MerchantAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>[]
          }
          upsert: {
            args: Prisma.MerchantAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantAccountPayload>
          }
          aggregate: {
            args: Prisma.MerchantAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMerchantAccount>
          }
          groupBy: {
            args: Prisma.MerchantAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<MerchantAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.MerchantAccountCountArgs<ExtArgs>
            result: $Utils.Optional<MerchantAccountCountAggregateOutputType> | number
          }
        }
      }
      PlatformStorefrontSettings: {
        payload: Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>
        fields: Prisma.PlatformStorefrontSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformStorefrontSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformStorefrontSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>
          }
          findFirst: {
            args: Prisma.PlatformStorefrontSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformStorefrontSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>
          }
          findMany: {
            args: Prisma.PlatformStorefrontSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>[]
          }
          create: {
            args: Prisma.PlatformStorefrontSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>
          }
          createMany: {
            args: Prisma.PlatformStorefrontSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformStorefrontSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>[]
          }
          delete: {
            args: Prisma.PlatformStorefrontSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>
          }
          update: {
            args: Prisma.PlatformStorefrontSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>
          }
          deleteMany: {
            args: Prisma.PlatformStorefrontSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformStorefrontSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlatformStorefrontSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>[]
          }
          upsert: {
            args: Prisma.PlatformStorefrontSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformStorefrontSettingsPayload>
          }
          aggregate: {
            args: Prisma.PlatformStorefrontSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformStorefrontSettings>
          }
          groupBy: {
            args: Prisma.PlatformStorefrontSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformStorefrontSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformStorefrontSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformStorefrontSettingsCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductSku: {
        payload: Prisma.$ProductSkuPayload<ExtArgs>
        fields: Prisma.ProductSkuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductSkuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductSkuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>
          }
          findFirst: {
            args: Prisma.ProductSkuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductSkuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>
          }
          findMany: {
            args: Prisma.ProductSkuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>[]
          }
          create: {
            args: Prisma.ProductSkuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>
          }
          createMany: {
            args: Prisma.ProductSkuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductSkuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>[]
          }
          delete: {
            args: Prisma.ProductSkuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>
          }
          update: {
            args: Prisma.ProductSkuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>
          }
          deleteMany: {
            args: Prisma.ProductSkuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductSkuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductSkuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>[]
          }
          upsert: {
            args: Prisma.ProductSkuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSkuPayload>
          }
          aggregate: {
            args: Prisma.ProductSkuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductSku>
          }
          groupBy: {
            args: Prisma.ProductSkuGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductSkuGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductSkuCountArgs<ExtArgs>
            result: $Utils.Optional<ProductSkuCountAggregateOutputType> | number
          }
        }
      }
      PaymentProfile: {
        payload: Prisma.$PaymentProfilePayload<ExtArgs>
        fields: Prisma.PaymentProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>
          }
          findFirst: {
            args: Prisma.PaymentProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>
          }
          findMany: {
            args: Prisma.PaymentProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>[]
          }
          create: {
            args: Prisma.PaymentProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>
          }
          createMany: {
            args: Prisma.PaymentProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>[]
          }
          delete: {
            args: Prisma.PaymentProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>
          }
          update: {
            args: Prisma.PaymentProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>
          }
          deleteMany: {
            args: Prisma.PaymentProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>[]
          }
          upsert: {
            args: Prisma.PaymentProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfilePayload>
          }
          aggregate: {
            args: Prisma.PaymentProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentProfile>
          }
          groupBy: {
            args: Prisma.PaymentProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentProfileCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentProfileCountAggregateOutputType> | number
          }
        }
      }
      ControlAuditLog: {
        payload: Prisma.$ControlAuditLogPayload<ExtArgs>
        fields: Prisma.ControlAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ControlAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ControlAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>
          }
          findFirst: {
            args: Prisma.ControlAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ControlAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>
          }
          findMany: {
            args: Prisma.ControlAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>[]
          }
          create: {
            args: Prisma.ControlAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>
          }
          createMany: {
            args: Prisma.ControlAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ControlAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>[]
          }
          delete: {
            args: Prisma.ControlAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>
          }
          update: {
            args: Prisma.ControlAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.ControlAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ControlAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ControlAuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>[]
          }
          upsert: {
            args: Prisma.ControlAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControlAuditLogPayload>
          }
          aggregate: {
            args: Prisma.ControlAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateControlAuditLog>
          }
          groupBy: {
            args: Prisma.ControlAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ControlAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ControlAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<ControlAuditLogCountAggregateOutputType> | number
          }
        }
      }
      PaymentProfileRevision: {
        payload: Prisma.$PaymentProfileRevisionPayload<ExtArgs>
        fields: Prisma.PaymentProfileRevisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentProfileRevisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentProfileRevisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>
          }
          findFirst: {
            args: Prisma.PaymentProfileRevisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentProfileRevisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>
          }
          findMany: {
            args: Prisma.PaymentProfileRevisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>[]
          }
          create: {
            args: Prisma.PaymentProfileRevisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>
          }
          createMany: {
            args: Prisma.PaymentProfileRevisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentProfileRevisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>[]
          }
          delete: {
            args: Prisma.PaymentProfileRevisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>
          }
          update: {
            args: Prisma.PaymentProfileRevisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>
          }
          deleteMany: {
            args: Prisma.PaymentProfileRevisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentProfileRevisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentProfileRevisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>[]
          }
          upsert: {
            args: Prisma.PaymentProfileRevisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentProfileRevisionPayload>
          }
          aggregate: {
            args: Prisma.PaymentProfileRevisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentProfileRevision>
          }
          groupBy: {
            args: Prisma.PaymentProfileRevisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentProfileRevisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentProfileRevisionCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentProfileRevisionCountAggregateOutputType> | number
          }
        }
      }
      CardItem: {
        payload: Prisma.$CardItemPayload<ExtArgs>
        fields: Prisma.CardItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CardItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CardItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>
          }
          findFirst: {
            args: Prisma.CardItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CardItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>
          }
          findMany: {
            args: Prisma.CardItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>[]
          }
          create: {
            args: Prisma.CardItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>
          }
          createMany: {
            args: Prisma.CardItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CardItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>[]
          }
          delete: {
            args: Prisma.CardItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>
          }
          update: {
            args: Prisma.CardItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>
          }
          deleteMany: {
            args: Prisma.CardItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CardItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CardItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>[]
          }
          upsert: {
            args: Prisma.CardItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardItemPayload>
          }
          aggregate: {
            args: Prisma.CardItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCardItem>
          }
          groupBy: {
            args: Prisma.CardItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CardItemCountArgs<ExtArgs>
            result: $Utils.Optional<CardItemCountAggregateOutputType> | number
          }
        }
      }
      ShopOrder: {
        payload: Prisma.$ShopOrderPayload<ExtArgs>
        fields: Prisma.ShopOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>
          }
          findFirst: {
            args: Prisma.ShopOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>
          }
          findMany: {
            args: Prisma.ShopOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>[]
          }
          create: {
            args: Prisma.ShopOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>
          }
          createMany: {
            args: Prisma.ShopOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>[]
          }
          delete: {
            args: Prisma.ShopOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>
          }
          update: {
            args: Prisma.ShopOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>
          }
          deleteMany: {
            args: Prisma.ShopOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShopOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>[]
          }
          upsert: {
            args: Prisma.ShopOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopOrderPayload>
          }
          aggregate: {
            args: Prisma.ShopOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopOrder>
          }
          groupBy: {
            args: Prisma.ShopOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopOrderCountArgs<ExtArgs>
            result: $Utils.Optional<ShopOrderCountAggregateOutputType> | number
          }
        }
      }
      ShopPaymentAttempt: {
        payload: Prisma.$ShopPaymentAttemptPayload<ExtArgs>
        fields: Prisma.ShopPaymentAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopPaymentAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopPaymentAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>
          }
          findFirst: {
            args: Prisma.ShopPaymentAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopPaymentAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>
          }
          findMany: {
            args: Prisma.ShopPaymentAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>[]
          }
          create: {
            args: Prisma.ShopPaymentAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>
          }
          createMany: {
            args: Prisma.ShopPaymentAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopPaymentAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>[]
          }
          delete: {
            args: Prisma.ShopPaymentAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>
          }
          update: {
            args: Prisma.ShopPaymentAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>
          }
          deleteMany: {
            args: Prisma.ShopPaymentAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopPaymentAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShopPaymentAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>[]
          }
          upsert: {
            args: Prisma.ShopPaymentAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPaymentAttemptPayload>
          }
          aggregate: {
            args: Prisma.ShopPaymentAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopPaymentAttempt>
          }
          groupBy: {
            args: Prisma.ShopPaymentAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopPaymentAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopPaymentAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<ShopPaymentAttemptCountAggregateOutputType> | number
          }
        }
      }
      WebhookEventLog: {
        payload: Prisma.$WebhookEventLogPayload<ExtArgs>
        fields: Prisma.WebhookEventLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEventLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEventLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>
          }
          findFirst: {
            args: Prisma.WebhookEventLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEventLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>
          }
          findMany: {
            args: Prisma.WebhookEventLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>[]
          }
          create: {
            args: Prisma.WebhookEventLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>
          }
          createMany: {
            args: Prisma.WebhookEventLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEventLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>[]
          }
          delete: {
            args: Prisma.WebhookEventLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>
          }
          update: {
            args: Prisma.WebhookEventLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEventLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEventLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookEventLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>[]
          }
          upsert: {
            args: Prisma.WebhookEventLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventLogPayload>
          }
          aggregate: {
            args: Prisma.WebhookEventLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEventLog>
          }
          groupBy: {
            args: Prisma.WebhookEventLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEventLogCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventLogCountAggregateOutputType> | number
          }
        }
      }
      OrderSyncTask: {
        payload: Prisma.$OrderSyncTaskPayload<ExtArgs>
        fields: Prisma.OrderSyncTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderSyncTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderSyncTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>
          }
          findFirst: {
            args: Prisma.OrderSyncTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderSyncTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>
          }
          findMany: {
            args: Prisma.OrderSyncTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>[]
          }
          create: {
            args: Prisma.OrderSyncTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>
          }
          createMany: {
            args: Prisma.OrderSyncTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderSyncTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>[]
          }
          delete: {
            args: Prisma.OrderSyncTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>
          }
          update: {
            args: Prisma.OrderSyncTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>
          }
          deleteMany: {
            args: Prisma.OrderSyncTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderSyncTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderSyncTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>[]
          }
          upsert: {
            args: Prisma.OrderSyncTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderSyncTaskPayload>
          }
          aggregate: {
            args: Prisma.OrderSyncTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderSyncTask>
          }
          groupBy: {
            args: Prisma.OrderSyncTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderSyncTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderSyncTaskCountArgs<ExtArgs>
            result: $Utils.Optional<OrderSyncTaskCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    merchantAccount?: MerchantAccountOmit
    platformStorefrontSettings?: PlatformStorefrontSettingsOmit
    product?: ProductOmit
    productSku?: ProductSkuOmit
    paymentProfile?: PaymentProfileOmit
    controlAuditLog?: ControlAuditLogOmit
    paymentProfileRevision?: PaymentProfileRevisionOmit
    cardItem?: CardItemOmit
    shopOrder?: ShopOrderOmit
    shopPaymentAttempt?: ShopPaymentAttemptOmit
    webhookEventLog?: WebhookEventLogOmit
    orderSyncTask?: OrderSyncTaskOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    skus: number
    cards: number
    orders: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skus?: boolean | ProductCountOutputTypeCountSkusArgs
    cards?: boolean | ProductCountOutputTypeCountCardsArgs
    orders?: boolean | ProductCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSkusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductSkuWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopOrderWhereInput
  }


  /**
   * Count Type ProductSkuCountOutputType
   */

  export type ProductSkuCountOutputType = {
    cards: number
    orders: number
  }

  export type ProductSkuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cards?: boolean | ProductSkuCountOutputTypeCountCardsArgs
    orders?: boolean | ProductSkuCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * ProductSkuCountOutputType without action
   */
  export type ProductSkuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSkuCountOutputType
     */
    select?: ProductSkuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductSkuCountOutputType without action
   */
  export type ProductSkuCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardItemWhereInput
  }

  /**
   * ProductSkuCountOutputType without action
   */
  export type ProductSkuCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopOrderWhereInput
  }


  /**
   * Count Type PaymentProfileCountOutputType
   */

  export type PaymentProfileCountOutputType = {
    products: number
    orders: number
    revisions: number
  }

  export type PaymentProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | PaymentProfileCountOutputTypeCountProductsArgs
    orders?: boolean | PaymentProfileCountOutputTypeCountOrdersArgs
    revisions?: boolean | PaymentProfileCountOutputTypeCountRevisionsArgs
  }

  // Custom InputTypes
  /**
   * PaymentProfileCountOutputType without action
   */
  export type PaymentProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileCountOutputType
     */
    select?: PaymentProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentProfileCountOutputType without action
   */
  export type PaymentProfileCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * PaymentProfileCountOutputType without action
   */
  export type PaymentProfileCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopOrderWhereInput
  }

  /**
   * PaymentProfileCountOutputType without action
   */
  export type PaymentProfileCountOutputTypeCountRevisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentProfileRevisionWhereInput
  }


  /**
   * Count Type ShopOrderCountOutputType
   */

  export type ShopOrderCountOutputType = {
    cards: number
    paymentAttempts: number
    syncTasks: number
  }

  export type ShopOrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cards?: boolean | ShopOrderCountOutputTypeCountCardsArgs
    paymentAttempts?: boolean | ShopOrderCountOutputTypeCountPaymentAttemptsArgs
    syncTasks?: boolean | ShopOrderCountOutputTypeCountSyncTasksArgs
  }

  // Custom InputTypes
  /**
   * ShopOrderCountOutputType without action
   */
  export type ShopOrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrderCountOutputType
     */
    select?: ShopOrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShopOrderCountOutputType without action
   */
  export type ShopOrderCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardItemWhereInput
  }

  /**
   * ShopOrderCountOutputType without action
   */
  export type ShopOrderCountOutputTypeCountPaymentAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopPaymentAttemptWhereInput
  }

  /**
   * ShopOrderCountOutputType without action
   */
  export type ShopOrderCountOutputTypeCountSyncTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderSyncTaskWhereInput
  }


  /**
   * Count Type ShopPaymentAttemptCountOutputType
   */

  export type ShopPaymentAttemptCountOutputType = {
    syncTasks: number
  }

  export type ShopPaymentAttemptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    syncTasks?: boolean | ShopPaymentAttemptCountOutputTypeCountSyncTasksArgs
  }

  // Custom InputTypes
  /**
   * ShopPaymentAttemptCountOutputType without action
   */
  export type ShopPaymentAttemptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttemptCountOutputType
     */
    select?: ShopPaymentAttemptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShopPaymentAttemptCountOutputType without action
   */
  export type ShopPaymentAttemptCountOutputTypeCountSyncTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderSyncTaskWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MerchantAccount
   */

  export type AggregateMerchantAccount = {
    _count: MerchantAccountCountAggregateOutputType | null
    _min: MerchantAccountMinAggregateOutputType | null
    _max: MerchantAccountMaxAggregateOutputType | null
  }

  export type MerchantAccountMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    isActive: boolean | null
    storeAnnouncementEnabled: boolean | null
    storeAnnouncementTitle: string | null
    storeAnnouncementBody: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MerchantAccountMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    isActive: boolean | null
    storeAnnouncementEnabled: boolean | null
    storeAnnouncementTitle: string | null
    storeAnnouncementBody: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MerchantAccountCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    isActive: number
    storeAnnouncementEnabled: number
    storeAnnouncementTitle: number
    storeAnnouncementBody: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MerchantAccountMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    isActive?: true
    storeAnnouncementEnabled?: true
    storeAnnouncementTitle?: true
    storeAnnouncementBody?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MerchantAccountMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    isActive?: true
    storeAnnouncementEnabled?: true
    storeAnnouncementTitle?: true
    storeAnnouncementBody?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MerchantAccountCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    isActive?: true
    storeAnnouncementEnabled?: true
    storeAnnouncementTitle?: true
    storeAnnouncementBody?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MerchantAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerchantAccount to aggregate.
     */
    where?: MerchantAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantAccounts to fetch.
     */
    orderBy?: MerchantAccountOrderByWithRelationInput | MerchantAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MerchantAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MerchantAccounts
    **/
    _count?: true | MerchantAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MerchantAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MerchantAccountMaxAggregateInputType
  }

  export type GetMerchantAccountAggregateType<T extends MerchantAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateMerchantAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMerchantAccount[P]>
      : GetScalarType<T[P], AggregateMerchantAccount[P]>
  }




  export type MerchantAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MerchantAccountWhereInput
    orderBy?: MerchantAccountOrderByWithAggregationInput | MerchantAccountOrderByWithAggregationInput[]
    by: MerchantAccountScalarFieldEnum[] | MerchantAccountScalarFieldEnum
    having?: MerchantAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MerchantAccountCountAggregateInputType | true
    _min?: MerchantAccountMinAggregateInputType
    _max?: MerchantAccountMaxAggregateInputType
  }

  export type MerchantAccountGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    isActive: boolean
    storeAnnouncementEnabled: boolean
    storeAnnouncementTitle: string | null
    storeAnnouncementBody: string | null
    createdAt: Date
    updatedAt: Date
    _count: MerchantAccountCountAggregateOutputType | null
    _min: MerchantAccountMinAggregateOutputType | null
    _max: MerchantAccountMaxAggregateOutputType | null
  }

  type GetMerchantAccountGroupByPayload<T extends MerchantAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MerchantAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MerchantAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MerchantAccountGroupByOutputType[P]>
            : GetScalarType<T[P], MerchantAccountGroupByOutputType[P]>
        }
      >
    >


  export type MerchantAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: boolean
    storeAnnouncementBody?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentProfile?: boolean | MerchantAccount$paymentProfileArgs<ExtArgs>
  }, ExtArgs["result"]["merchantAccount"]>

  export type MerchantAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: boolean
    storeAnnouncementBody?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["merchantAccount"]>

  export type MerchantAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: boolean
    storeAnnouncementBody?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["merchantAccount"]>

  export type MerchantAccountSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: boolean
    storeAnnouncementBody?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MerchantAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "isActive" | "storeAnnouncementEnabled" | "storeAnnouncementTitle" | "storeAnnouncementBody" | "createdAt" | "updatedAt", ExtArgs["result"]["merchantAccount"]>
  export type MerchantAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentProfile?: boolean | MerchantAccount$paymentProfileArgs<ExtArgs>
  }
  export type MerchantAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MerchantAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MerchantAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MerchantAccount"
    objects: {
      paymentProfile: Prisma.$PaymentProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      isActive: boolean
      storeAnnouncementEnabled: boolean
      storeAnnouncementTitle: string | null
      storeAnnouncementBody: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["merchantAccount"]>
    composites: {}
  }

  type MerchantAccountGetPayload<S extends boolean | null | undefined | MerchantAccountDefaultArgs> = $Result.GetResult<Prisma.$MerchantAccountPayload, S>

  type MerchantAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MerchantAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MerchantAccountCountAggregateInputType | true
    }

  export interface MerchantAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MerchantAccount'], meta: { name: 'MerchantAccount' } }
    /**
     * Find zero or one MerchantAccount that matches the filter.
     * @param {MerchantAccountFindUniqueArgs} args - Arguments to find a MerchantAccount
     * @example
     * // Get one MerchantAccount
     * const merchantAccount = await prisma.merchantAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MerchantAccountFindUniqueArgs>(args: SelectSubset<T, MerchantAccountFindUniqueArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MerchantAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MerchantAccountFindUniqueOrThrowArgs} args - Arguments to find a MerchantAccount
     * @example
     * // Get one MerchantAccount
     * const merchantAccount = await prisma.merchantAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MerchantAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, MerchantAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerchantAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantAccountFindFirstArgs} args - Arguments to find a MerchantAccount
     * @example
     * // Get one MerchantAccount
     * const merchantAccount = await prisma.merchantAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MerchantAccountFindFirstArgs>(args?: SelectSubset<T, MerchantAccountFindFirstArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerchantAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantAccountFindFirstOrThrowArgs} args - Arguments to find a MerchantAccount
     * @example
     * // Get one MerchantAccount
     * const merchantAccount = await prisma.merchantAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MerchantAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, MerchantAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MerchantAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MerchantAccounts
     * const merchantAccounts = await prisma.merchantAccount.findMany()
     * 
     * // Get first 10 MerchantAccounts
     * const merchantAccounts = await prisma.merchantAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const merchantAccountWithIdOnly = await prisma.merchantAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MerchantAccountFindManyArgs>(args?: SelectSubset<T, MerchantAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MerchantAccount.
     * @param {MerchantAccountCreateArgs} args - Arguments to create a MerchantAccount.
     * @example
     * // Create one MerchantAccount
     * const MerchantAccount = await prisma.merchantAccount.create({
     *   data: {
     *     // ... data to create a MerchantAccount
     *   }
     * })
     * 
     */
    create<T extends MerchantAccountCreateArgs>(args: SelectSubset<T, MerchantAccountCreateArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MerchantAccounts.
     * @param {MerchantAccountCreateManyArgs} args - Arguments to create many MerchantAccounts.
     * @example
     * // Create many MerchantAccounts
     * const merchantAccount = await prisma.merchantAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MerchantAccountCreateManyArgs>(args?: SelectSubset<T, MerchantAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MerchantAccounts and returns the data saved in the database.
     * @param {MerchantAccountCreateManyAndReturnArgs} args - Arguments to create many MerchantAccounts.
     * @example
     * // Create many MerchantAccounts
     * const merchantAccount = await prisma.merchantAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MerchantAccounts and only return the `id`
     * const merchantAccountWithIdOnly = await prisma.merchantAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MerchantAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, MerchantAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MerchantAccount.
     * @param {MerchantAccountDeleteArgs} args - Arguments to delete one MerchantAccount.
     * @example
     * // Delete one MerchantAccount
     * const MerchantAccount = await prisma.merchantAccount.delete({
     *   where: {
     *     // ... filter to delete one MerchantAccount
     *   }
     * })
     * 
     */
    delete<T extends MerchantAccountDeleteArgs>(args: SelectSubset<T, MerchantAccountDeleteArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MerchantAccount.
     * @param {MerchantAccountUpdateArgs} args - Arguments to update one MerchantAccount.
     * @example
     * // Update one MerchantAccount
     * const merchantAccount = await prisma.merchantAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MerchantAccountUpdateArgs>(args: SelectSubset<T, MerchantAccountUpdateArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MerchantAccounts.
     * @param {MerchantAccountDeleteManyArgs} args - Arguments to filter MerchantAccounts to delete.
     * @example
     * // Delete a few MerchantAccounts
     * const { count } = await prisma.merchantAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MerchantAccountDeleteManyArgs>(args?: SelectSubset<T, MerchantAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerchantAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MerchantAccounts
     * const merchantAccount = await prisma.merchantAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MerchantAccountUpdateManyArgs>(args: SelectSubset<T, MerchantAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerchantAccounts and returns the data updated in the database.
     * @param {MerchantAccountUpdateManyAndReturnArgs} args - Arguments to update many MerchantAccounts.
     * @example
     * // Update many MerchantAccounts
     * const merchantAccount = await prisma.merchantAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MerchantAccounts and only return the `id`
     * const merchantAccountWithIdOnly = await prisma.merchantAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MerchantAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, MerchantAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MerchantAccount.
     * @param {MerchantAccountUpsertArgs} args - Arguments to update or create a MerchantAccount.
     * @example
     * // Update or create a MerchantAccount
     * const merchantAccount = await prisma.merchantAccount.upsert({
     *   create: {
     *     // ... data to create a MerchantAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MerchantAccount we want to update
     *   }
     * })
     */
    upsert<T extends MerchantAccountUpsertArgs>(args: SelectSubset<T, MerchantAccountUpsertArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MerchantAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantAccountCountArgs} args - Arguments to filter MerchantAccounts to count.
     * @example
     * // Count the number of MerchantAccounts
     * const count = await prisma.merchantAccount.count({
     *   where: {
     *     // ... the filter for the MerchantAccounts we want to count
     *   }
     * })
    **/
    count<T extends MerchantAccountCountArgs>(
      args?: Subset<T, MerchantAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MerchantAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MerchantAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MerchantAccountAggregateArgs>(args: Subset<T, MerchantAccountAggregateArgs>): Prisma.PrismaPromise<GetMerchantAccountAggregateType<T>>

    /**
     * Group by MerchantAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MerchantAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MerchantAccountGroupByArgs['orderBy'] }
        : { orderBy?: MerchantAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MerchantAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerchantAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MerchantAccount model
   */
  readonly fields: MerchantAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MerchantAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MerchantAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paymentProfile<T extends MerchantAccount$paymentProfileArgs<ExtArgs> = {}>(args?: Subset<T, MerchantAccount$paymentProfileArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MerchantAccount model
   */
  interface MerchantAccountFieldRefs {
    readonly id: FieldRef<"MerchantAccount", 'String'>
    readonly name: FieldRef<"MerchantAccount", 'String'>
    readonly email: FieldRef<"MerchantAccount", 'String'>
    readonly passwordHash: FieldRef<"MerchantAccount", 'String'>
    readonly isActive: FieldRef<"MerchantAccount", 'Boolean'>
    readonly storeAnnouncementEnabled: FieldRef<"MerchantAccount", 'Boolean'>
    readonly storeAnnouncementTitle: FieldRef<"MerchantAccount", 'String'>
    readonly storeAnnouncementBody: FieldRef<"MerchantAccount", 'String'>
    readonly createdAt: FieldRef<"MerchantAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"MerchantAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MerchantAccount findUnique
   */
  export type MerchantAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * Filter, which MerchantAccount to fetch.
     */
    where: MerchantAccountWhereUniqueInput
  }

  /**
   * MerchantAccount findUniqueOrThrow
   */
  export type MerchantAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * Filter, which MerchantAccount to fetch.
     */
    where: MerchantAccountWhereUniqueInput
  }

  /**
   * MerchantAccount findFirst
   */
  export type MerchantAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * Filter, which MerchantAccount to fetch.
     */
    where?: MerchantAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantAccounts to fetch.
     */
    orderBy?: MerchantAccountOrderByWithRelationInput | MerchantAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerchantAccounts.
     */
    cursor?: MerchantAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantAccounts.
     */
    distinct?: MerchantAccountScalarFieldEnum | MerchantAccountScalarFieldEnum[]
  }

  /**
   * MerchantAccount findFirstOrThrow
   */
  export type MerchantAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * Filter, which MerchantAccount to fetch.
     */
    where?: MerchantAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantAccounts to fetch.
     */
    orderBy?: MerchantAccountOrderByWithRelationInput | MerchantAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerchantAccounts.
     */
    cursor?: MerchantAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantAccounts.
     */
    distinct?: MerchantAccountScalarFieldEnum | MerchantAccountScalarFieldEnum[]
  }

  /**
   * MerchantAccount findMany
   */
  export type MerchantAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * Filter, which MerchantAccounts to fetch.
     */
    where?: MerchantAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantAccounts to fetch.
     */
    orderBy?: MerchantAccountOrderByWithRelationInput | MerchantAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MerchantAccounts.
     */
    cursor?: MerchantAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantAccounts.
     */
    distinct?: MerchantAccountScalarFieldEnum | MerchantAccountScalarFieldEnum[]
  }

  /**
   * MerchantAccount create
   */
  export type MerchantAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a MerchantAccount.
     */
    data: XOR<MerchantAccountCreateInput, MerchantAccountUncheckedCreateInput>
  }

  /**
   * MerchantAccount createMany
   */
  export type MerchantAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MerchantAccounts.
     */
    data: MerchantAccountCreateManyInput | MerchantAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MerchantAccount createManyAndReturn
   */
  export type MerchantAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * The data used to create many MerchantAccounts.
     */
    data: MerchantAccountCreateManyInput | MerchantAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MerchantAccount update
   */
  export type MerchantAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a MerchantAccount.
     */
    data: XOR<MerchantAccountUpdateInput, MerchantAccountUncheckedUpdateInput>
    /**
     * Choose, which MerchantAccount to update.
     */
    where: MerchantAccountWhereUniqueInput
  }

  /**
   * MerchantAccount updateMany
   */
  export type MerchantAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MerchantAccounts.
     */
    data: XOR<MerchantAccountUpdateManyMutationInput, MerchantAccountUncheckedUpdateManyInput>
    /**
     * Filter which MerchantAccounts to update
     */
    where?: MerchantAccountWhereInput
    /**
     * Limit how many MerchantAccounts to update.
     */
    limit?: number
  }

  /**
   * MerchantAccount updateManyAndReturn
   */
  export type MerchantAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * The data used to update MerchantAccounts.
     */
    data: XOR<MerchantAccountUpdateManyMutationInput, MerchantAccountUncheckedUpdateManyInput>
    /**
     * Filter which MerchantAccounts to update
     */
    where?: MerchantAccountWhereInput
    /**
     * Limit how many MerchantAccounts to update.
     */
    limit?: number
  }

  /**
   * MerchantAccount upsert
   */
  export type MerchantAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the MerchantAccount to update in case it exists.
     */
    where: MerchantAccountWhereUniqueInput
    /**
     * In case the MerchantAccount found by the `where` argument doesn't exist, create a new MerchantAccount with this data.
     */
    create: XOR<MerchantAccountCreateInput, MerchantAccountUncheckedCreateInput>
    /**
     * In case the MerchantAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MerchantAccountUpdateInput, MerchantAccountUncheckedUpdateInput>
  }

  /**
   * MerchantAccount delete
   */
  export type MerchantAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    /**
     * Filter which MerchantAccount to delete.
     */
    where: MerchantAccountWhereUniqueInput
  }

  /**
   * MerchantAccount deleteMany
   */
  export type MerchantAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerchantAccounts to delete
     */
    where?: MerchantAccountWhereInput
    /**
     * Limit how many MerchantAccounts to delete.
     */
    limit?: number
  }

  /**
   * MerchantAccount.paymentProfile
   */
  export type MerchantAccount$paymentProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    where?: PaymentProfileWhereInput
  }

  /**
   * MerchantAccount without action
   */
  export type MerchantAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
  }


  /**
   * Model PlatformStorefrontSettings
   */

  export type AggregatePlatformStorefrontSettings = {
    _count: PlatformStorefrontSettingsCountAggregateOutputType | null
    _min: PlatformStorefrontSettingsMinAggregateOutputType | null
    _max: PlatformStorefrontSettingsMaxAggregateOutputType | null
  }

  export type PlatformStorefrontSettingsMinAggregateOutputType = {
    id: string | null
    announcementEnabled: boolean | null
    announcementTitle: string | null
    announcementBody: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformStorefrontSettingsMaxAggregateOutputType = {
    id: string | null
    announcementEnabled: boolean | null
    announcementTitle: string | null
    announcementBody: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformStorefrontSettingsCountAggregateOutputType = {
    id: number
    announcementEnabled: number
    announcementTitle: number
    announcementBody: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlatformStorefrontSettingsMinAggregateInputType = {
    id?: true
    announcementEnabled?: true
    announcementTitle?: true
    announcementBody?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlatformStorefrontSettingsMaxAggregateInputType = {
    id?: true
    announcementEnabled?: true
    announcementTitle?: true
    announcementBody?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlatformStorefrontSettingsCountAggregateInputType = {
    id?: true
    announcementEnabled?: true
    announcementTitle?: true
    announcementBody?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlatformStorefrontSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformStorefrontSettings to aggregate.
     */
    where?: PlatformStorefrontSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformStorefrontSettings to fetch.
     */
    orderBy?: PlatformStorefrontSettingsOrderByWithRelationInput | PlatformStorefrontSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformStorefrontSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformStorefrontSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformStorefrontSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformStorefrontSettings
    **/
    _count?: true | PlatformStorefrontSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformStorefrontSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformStorefrontSettingsMaxAggregateInputType
  }

  export type GetPlatformStorefrontSettingsAggregateType<T extends PlatformStorefrontSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformStorefrontSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformStorefrontSettings[P]>
      : GetScalarType<T[P], AggregatePlatformStorefrontSettings[P]>
  }




  export type PlatformStorefrontSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformStorefrontSettingsWhereInput
    orderBy?: PlatformStorefrontSettingsOrderByWithAggregationInput | PlatformStorefrontSettingsOrderByWithAggregationInput[]
    by: PlatformStorefrontSettingsScalarFieldEnum[] | PlatformStorefrontSettingsScalarFieldEnum
    having?: PlatformStorefrontSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformStorefrontSettingsCountAggregateInputType | true
    _min?: PlatformStorefrontSettingsMinAggregateInputType
    _max?: PlatformStorefrontSettingsMaxAggregateInputType
  }

  export type PlatformStorefrontSettingsGroupByOutputType = {
    id: string
    announcementEnabled: boolean
    announcementTitle: string | null
    announcementBody: string | null
    createdAt: Date
    updatedAt: Date
    _count: PlatformStorefrontSettingsCountAggregateOutputType | null
    _min: PlatformStorefrontSettingsMinAggregateOutputType | null
    _max: PlatformStorefrontSettingsMaxAggregateOutputType | null
  }

  type GetPlatformStorefrontSettingsGroupByPayload<T extends PlatformStorefrontSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformStorefrontSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformStorefrontSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformStorefrontSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformStorefrontSettingsGroupByOutputType[P]>
        }
      >
    >


  export type PlatformStorefrontSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    announcementEnabled?: boolean
    announcementTitle?: boolean
    announcementBody?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformStorefrontSettings"]>

  export type PlatformStorefrontSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    announcementEnabled?: boolean
    announcementTitle?: boolean
    announcementBody?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformStorefrontSettings"]>

  export type PlatformStorefrontSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    announcementEnabled?: boolean
    announcementTitle?: boolean
    announcementBody?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformStorefrontSettings"]>

  export type PlatformStorefrontSettingsSelectScalar = {
    id?: boolean
    announcementEnabled?: boolean
    announcementTitle?: boolean
    announcementBody?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlatformStorefrontSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "announcementEnabled" | "announcementTitle" | "announcementBody" | "createdAt" | "updatedAt", ExtArgs["result"]["platformStorefrontSettings"]>

  export type $PlatformStorefrontSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformStorefrontSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      announcementEnabled: boolean
      announcementTitle: string | null
      announcementBody: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["platformStorefrontSettings"]>
    composites: {}
  }

  type PlatformStorefrontSettingsGetPayload<S extends boolean | null | undefined | PlatformStorefrontSettingsDefaultArgs> = $Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload, S>

  type PlatformStorefrontSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlatformStorefrontSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlatformStorefrontSettingsCountAggregateInputType | true
    }

  export interface PlatformStorefrontSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformStorefrontSettings'], meta: { name: 'PlatformStorefrontSettings' } }
    /**
     * Find zero or one PlatformStorefrontSettings that matches the filter.
     * @param {PlatformStorefrontSettingsFindUniqueArgs} args - Arguments to find a PlatformStorefrontSettings
     * @example
     * // Get one PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformStorefrontSettingsFindUniqueArgs>(args: SelectSubset<T, PlatformStorefrontSettingsFindUniqueArgs<ExtArgs>>): Prisma__PlatformStorefrontSettingsClient<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlatformStorefrontSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlatformStorefrontSettingsFindUniqueOrThrowArgs} args - Arguments to find a PlatformStorefrontSettings
     * @example
     * // Get one PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformStorefrontSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformStorefrontSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformStorefrontSettingsClient<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformStorefrontSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStorefrontSettingsFindFirstArgs} args - Arguments to find a PlatformStorefrontSettings
     * @example
     * // Get one PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformStorefrontSettingsFindFirstArgs>(args?: SelectSubset<T, PlatformStorefrontSettingsFindFirstArgs<ExtArgs>>): Prisma__PlatformStorefrontSettingsClient<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformStorefrontSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStorefrontSettingsFindFirstOrThrowArgs} args - Arguments to find a PlatformStorefrontSettings
     * @example
     * // Get one PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformStorefrontSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformStorefrontSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformStorefrontSettingsClient<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlatformStorefrontSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStorefrontSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.findMany()
     * 
     * // Get first 10 PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformStorefrontSettingsWithIdOnly = await prisma.platformStorefrontSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformStorefrontSettingsFindManyArgs>(args?: SelectSubset<T, PlatformStorefrontSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlatformStorefrontSettings.
     * @param {PlatformStorefrontSettingsCreateArgs} args - Arguments to create a PlatformStorefrontSettings.
     * @example
     * // Create one PlatformStorefrontSettings
     * const PlatformStorefrontSettings = await prisma.platformStorefrontSettings.create({
     *   data: {
     *     // ... data to create a PlatformStorefrontSettings
     *   }
     * })
     * 
     */
    create<T extends PlatformStorefrontSettingsCreateArgs>(args: SelectSubset<T, PlatformStorefrontSettingsCreateArgs<ExtArgs>>): Prisma__PlatformStorefrontSettingsClient<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlatformStorefrontSettings.
     * @param {PlatformStorefrontSettingsCreateManyArgs} args - Arguments to create many PlatformStorefrontSettings.
     * @example
     * // Create many PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformStorefrontSettingsCreateManyArgs>(args?: SelectSubset<T, PlatformStorefrontSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlatformStorefrontSettings and returns the data saved in the database.
     * @param {PlatformStorefrontSettingsCreateManyAndReturnArgs} args - Arguments to create many PlatformStorefrontSettings.
     * @example
     * // Create many PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlatformStorefrontSettings and only return the `id`
     * const platformStorefrontSettingsWithIdOnly = await prisma.platformStorefrontSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformStorefrontSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformStorefrontSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlatformStorefrontSettings.
     * @param {PlatformStorefrontSettingsDeleteArgs} args - Arguments to delete one PlatformStorefrontSettings.
     * @example
     * // Delete one PlatformStorefrontSettings
     * const PlatformStorefrontSettings = await prisma.platformStorefrontSettings.delete({
     *   where: {
     *     // ... filter to delete one PlatformStorefrontSettings
     *   }
     * })
     * 
     */
    delete<T extends PlatformStorefrontSettingsDeleteArgs>(args: SelectSubset<T, PlatformStorefrontSettingsDeleteArgs<ExtArgs>>): Prisma__PlatformStorefrontSettingsClient<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlatformStorefrontSettings.
     * @param {PlatformStorefrontSettingsUpdateArgs} args - Arguments to update one PlatformStorefrontSettings.
     * @example
     * // Update one PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformStorefrontSettingsUpdateArgs>(args: SelectSubset<T, PlatformStorefrontSettingsUpdateArgs<ExtArgs>>): Prisma__PlatformStorefrontSettingsClient<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlatformStorefrontSettings.
     * @param {PlatformStorefrontSettingsDeleteManyArgs} args - Arguments to filter PlatformStorefrontSettings to delete.
     * @example
     * // Delete a few PlatformStorefrontSettings
     * const { count } = await prisma.platformStorefrontSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformStorefrontSettingsDeleteManyArgs>(args?: SelectSubset<T, PlatformStorefrontSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformStorefrontSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStorefrontSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformStorefrontSettingsUpdateManyArgs>(args: SelectSubset<T, PlatformStorefrontSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformStorefrontSettings and returns the data updated in the database.
     * @param {PlatformStorefrontSettingsUpdateManyAndReturnArgs} args - Arguments to update many PlatformStorefrontSettings.
     * @example
     * // Update many PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlatformStorefrontSettings and only return the `id`
     * const platformStorefrontSettingsWithIdOnly = await prisma.platformStorefrontSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlatformStorefrontSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, PlatformStorefrontSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlatformStorefrontSettings.
     * @param {PlatformStorefrontSettingsUpsertArgs} args - Arguments to update or create a PlatformStorefrontSettings.
     * @example
     * // Update or create a PlatformStorefrontSettings
     * const platformStorefrontSettings = await prisma.platformStorefrontSettings.upsert({
     *   create: {
     *     // ... data to create a PlatformStorefrontSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformStorefrontSettings we want to update
     *   }
     * })
     */
    upsert<T extends PlatformStorefrontSettingsUpsertArgs>(args: SelectSubset<T, PlatformStorefrontSettingsUpsertArgs<ExtArgs>>): Prisma__PlatformStorefrontSettingsClient<$Result.GetResult<Prisma.$PlatformStorefrontSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlatformStorefrontSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStorefrontSettingsCountArgs} args - Arguments to filter PlatformStorefrontSettings to count.
     * @example
     * // Count the number of PlatformStorefrontSettings
     * const count = await prisma.platformStorefrontSettings.count({
     *   where: {
     *     // ... the filter for the PlatformStorefrontSettings we want to count
     *   }
     * })
    **/
    count<T extends PlatformStorefrontSettingsCountArgs>(
      args?: Subset<T, PlatformStorefrontSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformStorefrontSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformStorefrontSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStorefrontSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatformStorefrontSettingsAggregateArgs>(args: Subset<T, PlatformStorefrontSettingsAggregateArgs>): Prisma.PrismaPromise<GetPlatformStorefrontSettingsAggregateType<T>>

    /**
     * Group by PlatformStorefrontSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformStorefrontSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlatformStorefrontSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformStorefrontSettingsGroupByArgs['orderBy'] }
        : { orderBy?: PlatformStorefrontSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlatformStorefrontSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformStorefrontSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformStorefrontSettings model
   */
  readonly fields: PlatformStorefrontSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformStorefrontSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformStorefrontSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlatformStorefrontSettings model
   */
  interface PlatformStorefrontSettingsFieldRefs {
    readonly id: FieldRef<"PlatformStorefrontSettings", 'String'>
    readonly announcementEnabled: FieldRef<"PlatformStorefrontSettings", 'Boolean'>
    readonly announcementTitle: FieldRef<"PlatformStorefrontSettings", 'String'>
    readonly announcementBody: FieldRef<"PlatformStorefrontSettings", 'String'>
    readonly createdAt: FieldRef<"PlatformStorefrontSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"PlatformStorefrontSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlatformStorefrontSettings findUnique
   */
  export type PlatformStorefrontSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStorefrontSettings to fetch.
     */
    where: PlatformStorefrontSettingsWhereUniqueInput
  }

  /**
   * PlatformStorefrontSettings findUniqueOrThrow
   */
  export type PlatformStorefrontSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStorefrontSettings to fetch.
     */
    where: PlatformStorefrontSettingsWhereUniqueInput
  }

  /**
   * PlatformStorefrontSettings findFirst
   */
  export type PlatformStorefrontSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStorefrontSettings to fetch.
     */
    where?: PlatformStorefrontSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformStorefrontSettings to fetch.
     */
    orderBy?: PlatformStorefrontSettingsOrderByWithRelationInput | PlatformStorefrontSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformStorefrontSettings.
     */
    cursor?: PlatformStorefrontSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformStorefrontSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformStorefrontSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformStorefrontSettings.
     */
    distinct?: PlatformStorefrontSettingsScalarFieldEnum | PlatformStorefrontSettingsScalarFieldEnum[]
  }

  /**
   * PlatformStorefrontSettings findFirstOrThrow
   */
  export type PlatformStorefrontSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStorefrontSettings to fetch.
     */
    where?: PlatformStorefrontSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformStorefrontSettings to fetch.
     */
    orderBy?: PlatformStorefrontSettingsOrderByWithRelationInput | PlatformStorefrontSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformStorefrontSettings.
     */
    cursor?: PlatformStorefrontSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformStorefrontSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformStorefrontSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformStorefrontSettings.
     */
    distinct?: PlatformStorefrontSettingsScalarFieldEnum | PlatformStorefrontSettingsScalarFieldEnum[]
  }

  /**
   * PlatformStorefrontSettings findMany
   */
  export type PlatformStorefrontSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * Filter, which PlatformStorefrontSettings to fetch.
     */
    where?: PlatformStorefrontSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformStorefrontSettings to fetch.
     */
    orderBy?: PlatformStorefrontSettingsOrderByWithRelationInput | PlatformStorefrontSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformStorefrontSettings.
     */
    cursor?: PlatformStorefrontSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformStorefrontSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformStorefrontSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformStorefrontSettings.
     */
    distinct?: PlatformStorefrontSettingsScalarFieldEnum | PlatformStorefrontSettingsScalarFieldEnum[]
  }

  /**
   * PlatformStorefrontSettings create
   */
  export type PlatformStorefrontSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a PlatformStorefrontSettings.
     */
    data: XOR<PlatformStorefrontSettingsCreateInput, PlatformStorefrontSettingsUncheckedCreateInput>
  }

  /**
   * PlatformStorefrontSettings createMany
   */
  export type PlatformStorefrontSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformStorefrontSettings.
     */
    data: PlatformStorefrontSettingsCreateManyInput | PlatformStorefrontSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformStorefrontSettings createManyAndReturn
   */
  export type PlatformStorefrontSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many PlatformStorefrontSettings.
     */
    data: PlatformStorefrontSettingsCreateManyInput | PlatformStorefrontSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformStorefrontSettings update
   */
  export type PlatformStorefrontSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a PlatformStorefrontSettings.
     */
    data: XOR<PlatformStorefrontSettingsUpdateInput, PlatformStorefrontSettingsUncheckedUpdateInput>
    /**
     * Choose, which PlatformStorefrontSettings to update.
     */
    where: PlatformStorefrontSettingsWhereUniqueInput
  }

  /**
   * PlatformStorefrontSettings updateMany
   */
  export type PlatformStorefrontSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformStorefrontSettings.
     */
    data: XOR<PlatformStorefrontSettingsUpdateManyMutationInput, PlatformStorefrontSettingsUncheckedUpdateManyInput>
    /**
     * Filter which PlatformStorefrontSettings to update
     */
    where?: PlatformStorefrontSettingsWhereInput
    /**
     * Limit how many PlatformStorefrontSettings to update.
     */
    limit?: number
  }

  /**
   * PlatformStorefrontSettings updateManyAndReturn
   */
  export type PlatformStorefrontSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * The data used to update PlatformStorefrontSettings.
     */
    data: XOR<PlatformStorefrontSettingsUpdateManyMutationInput, PlatformStorefrontSettingsUncheckedUpdateManyInput>
    /**
     * Filter which PlatformStorefrontSettings to update
     */
    where?: PlatformStorefrontSettingsWhereInput
    /**
     * Limit how many PlatformStorefrontSettings to update.
     */
    limit?: number
  }

  /**
   * PlatformStorefrontSettings upsert
   */
  export type PlatformStorefrontSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the PlatformStorefrontSettings to update in case it exists.
     */
    where: PlatformStorefrontSettingsWhereUniqueInput
    /**
     * In case the PlatformStorefrontSettings found by the `where` argument doesn't exist, create a new PlatformStorefrontSettings with this data.
     */
    create: XOR<PlatformStorefrontSettingsCreateInput, PlatformStorefrontSettingsUncheckedCreateInput>
    /**
     * In case the PlatformStorefrontSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformStorefrontSettingsUpdateInput, PlatformStorefrontSettingsUncheckedUpdateInput>
  }

  /**
   * PlatformStorefrontSettings delete
   */
  export type PlatformStorefrontSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
    /**
     * Filter which PlatformStorefrontSettings to delete.
     */
    where: PlatformStorefrontSettingsWhereUniqueInput
  }

  /**
   * PlatformStorefrontSettings deleteMany
   */
  export type PlatformStorefrontSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformStorefrontSettings to delete
     */
    where?: PlatformStorefrontSettingsWhereInput
    /**
     * Limit how many PlatformStorefrontSettings to delete.
     */
    limit?: number
  }

  /**
   * PlatformStorefrontSettings without action
   */
  export type PlatformStorefrontSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformStorefrontSettings
     */
    select?: PlatformStorefrontSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformStorefrontSettings
     */
    omit?: PlatformStorefrontSettingsOmit<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    priceCents: number | null
  }

  export type ProductSumAggregateOutputType = {
    priceCents: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    summary: string | null
    description: string | null
    priceCents: number | null
    saleMode: $Enums.ProductSaleMode | null
    paymentProfileId: string | null
    status: $Enums.ProductStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    summary: string | null
    description: string | null
    priceCents: number | null
    saleMode: $Enums.ProductSaleMode | null
    paymentProfileId: string | null
    status: $Enums.ProductStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    summary: number
    description: number
    priceCents: number
    saleMode: number
    paymentProfileId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    priceCents?: true
  }

  export type ProductSumAggregateInputType = {
    priceCents?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    summary?: true
    description?: true
    priceCents?: true
    saleMode?: true
    paymentProfileId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    summary?: true
    description?: true
    priceCents?: true
    saleMode?: true
    paymentProfileId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    summary?: true
    description?: true
    priceCents?: true
    saleMode?: true
    paymentProfileId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    slug: string
    summary: string | null
    description: string | null
    priceCents: number
    saleMode: $Enums.ProductSaleMode
    paymentProfileId: string | null
    status: $Enums.ProductStatus
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    summary?: boolean
    description?: boolean
    priceCents?: boolean
    saleMode?: boolean
    paymentProfileId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentProfile?: boolean | Product$paymentProfileArgs<ExtArgs>
    skus?: boolean | Product$skusArgs<ExtArgs>
    cards?: boolean | Product$cardsArgs<ExtArgs>
    orders?: boolean | Product$ordersArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    summary?: boolean
    description?: boolean
    priceCents?: boolean
    saleMode?: boolean
    paymentProfileId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentProfile?: boolean | Product$paymentProfileArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    summary?: boolean
    description?: boolean
    priceCents?: boolean
    saleMode?: boolean
    paymentProfileId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentProfile?: boolean | Product$paymentProfileArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    summary?: boolean
    description?: boolean
    priceCents?: boolean
    saleMode?: boolean
    paymentProfileId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "summary" | "description" | "priceCents" | "saleMode" | "paymentProfileId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentProfile?: boolean | Product$paymentProfileArgs<ExtArgs>
    skus?: boolean | Product$skusArgs<ExtArgs>
    cards?: boolean | Product$cardsArgs<ExtArgs>
    orders?: boolean | Product$ordersArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentProfile?: boolean | Product$paymentProfileArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentProfile?: boolean | Product$paymentProfileArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      paymentProfile: Prisma.$PaymentProfilePayload<ExtArgs> | null
      skus: Prisma.$ProductSkuPayload<ExtArgs>[]
      cards: Prisma.$CardItemPayload<ExtArgs>[]
      orders: Prisma.$ShopOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      summary: string | null
      description: string | null
      priceCents: number
      saleMode: $Enums.ProductSaleMode
      paymentProfileId: string | null
      status: $Enums.ProductStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paymentProfile<T extends Product$paymentProfileArgs<ExtArgs> = {}>(args?: Subset<T, Product$paymentProfileArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    skus<T extends Product$skusArgs<ExtArgs> = {}>(args?: Subset<T, Product$skusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cards<T extends Product$cardsArgs<ExtArgs> = {}>(args?: Subset<T, Product$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Product$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Product$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly summary: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly priceCents: FieldRef<"Product", 'Int'>
    readonly saleMode: FieldRef<"Product", 'ProductSaleMode'>
    readonly paymentProfileId: FieldRef<"Product", 'String'>
    readonly status: FieldRef<"Product", 'ProductStatus'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.paymentProfile
   */
  export type Product$paymentProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    where?: PaymentProfileWhereInput
  }

  /**
   * Product.skus
   */
  export type Product$skusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    where?: ProductSkuWhereInput
    orderBy?: ProductSkuOrderByWithRelationInput | ProductSkuOrderByWithRelationInput[]
    cursor?: ProductSkuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductSkuScalarFieldEnum | ProductSkuScalarFieldEnum[]
  }

  /**
   * Product.cards
   */
  export type Product$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    where?: CardItemWhereInput
    orderBy?: CardItemOrderByWithRelationInput | CardItemOrderByWithRelationInput[]
    cursor?: CardItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardItemScalarFieldEnum | CardItemScalarFieldEnum[]
  }

  /**
   * Product.orders
   */
  export type Product$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    where?: ShopOrderWhereInput
    orderBy?: ShopOrderOrderByWithRelationInput | ShopOrderOrderByWithRelationInput[]
    cursor?: ShopOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShopOrderScalarFieldEnum | ShopOrderScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductSku
   */

  export type AggregateProductSku = {
    _count: ProductSkuCountAggregateOutputType | null
    _avg: ProductSkuAvgAggregateOutputType | null
    _sum: ProductSkuSumAggregateOutputType | null
    _min: ProductSkuMinAggregateOutputType | null
    _max: ProductSkuMaxAggregateOutputType | null
  }

  export type ProductSkuAvgAggregateOutputType = {
    priceCents: number | null
    sortOrder: number | null
  }

  export type ProductSkuSumAggregateOutputType = {
    priceCents: number | null
    sortOrder: number | null
  }

  export type ProductSkuMinAggregateOutputType = {
    id: string | null
    productId: string | null
    name: string | null
    summary: string | null
    priceCents: number | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductSkuMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    name: string | null
    summary: string | null
    priceCents: number | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductSkuCountAggregateOutputType = {
    id: number
    productId: number
    name: number
    summary: number
    priceCents: number
    enabled: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductSkuAvgAggregateInputType = {
    priceCents?: true
    sortOrder?: true
  }

  export type ProductSkuSumAggregateInputType = {
    priceCents?: true
    sortOrder?: true
  }

  export type ProductSkuMinAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    summary?: true
    priceCents?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductSkuMaxAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    summary?: true
    priceCents?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductSkuCountAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    summary?: true
    priceCents?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductSkuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductSku to aggregate.
     */
    where?: ProductSkuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSkus to fetch.
     */
    orderBy?: ProductSkuOrderByWithRelationInput | ProductSkuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductSkuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSkus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSkus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductSkus
    **/
    _count?: true | ProductSkuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductSkuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSkuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductSkuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductSkuMaxAggregateInputType
  }

  export type GetProductSkuAggregateType<T extends ProductSkuAggregateArgs> = {
        [P in keyof T & keyof AggregateProductSku]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductSku[P]>
      : GetScalarType<T[P], AggregateProductSku[P]>
  }




  export type ProductSkuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductSkuWhereInput
    orderBy?: ProductSkuOrderByWithAggregationInput | ProductSkuOrderByWithAggregationInput[]
    by: ProductSkuScalarFieldEnum[] | ProductSkuScalarFieldEnum
    having?: ProductSkuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductSkuCountAggregateInputType | true
    _avg?: ProductSkuAvgAggregateInputType
    _sum?: ProductSkuSumAggregateInputType
    _min?: ProductSkuMinAggregateInputType
    _max?: ProductSkuMaxAggregateInputType
  }

  export type ProductSkuGroupByOutputType = {
    id: string
    productId: string
    name: string
    summary: string | null
    priceCents: number
    enabled: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: ProductSkuCountAggregateOutputType | null
    _avg: ProductSkuAvgAggregateOutputType | null
    _sum: ProductSkuSumAggregateOutputType | null
    _min: ProductSkuMinAggregateOutputType | null
    _max: ProductSkuMaxAggregateOutputType | null
  }

  type GetProductSkuGroupByPayload<T extends ProductSkuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductSkuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductSkuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductSkuGroupByOutputType[P]>
            : GetScalarType<T[P], ProductSkuGroupByOutputType[P]>
        }
      >
    >


  export type ProductSkuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    name?: boolean
    summary?: boolean
    priceCents?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    cards?: boolean | ProductSku$cardsArgs<ExtArgs>
    orders?: boolean | ProductSku$ordersArgs<ExtArgs>
    _count?: boolean | ProductSkuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productSku"]>

  export type ProductSkuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    name?: boolean
    summary?: boolean
    priceCents?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productSku"]>

  export type ProductSkuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    name?: boolean
    summary?: boolean
    priceCents?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productSku"]>

  export type ProductSkuSelectScalar = {
    id?: boolean
    productId?: boolean
    name?: boolean
    summary?: boolean
    priceCents?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductSkuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "name" | "summary" | "priceCents" | "enabled" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["productSku"]>
  export type ProductSkuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    cards?: boolean | ProductSku$cardsArgs<ExtArgs>
    orders?: boolean | ProductSku$ordersArgs<ExtArgs>
    _count?: boolean | ProductSkuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductSkuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductSkuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductSkuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductSku"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      cards: Prisma.$CardItemPayload<ExtArgs>[]
      orders: Prisma.$ShopOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      name: string
      summary: string | null
      priceCents: number
      enabled: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productSku"]>
    composites: {}
  }

  type ProductSkuGetPayload<S extends boolean | null | undefined | ProductSkuDefaultArgs> = $Result.GetResult<Prisma.$ProductSkuPayload, S>

  type ProductSkuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductSkuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductSkuCountAggregateInputType | true
    }

  export interface ProductSkuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductSku'], meta: { name: 'ProductSku' } }
    /**
     * Find zero or one ProductSku that matches the filter.
     * @param {ProductSkuFindUniqueArgs} args - Arguments to find a ProductSku
     * @example
     * // Get one ProductSku
     * const productSku = await prisma.productSku.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductSkuFindUniqueArgs>(args: SelectSubset<T, ProductSkuFindUniqueArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductSku that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductSkuFindUniqueOrThrowArgs} args - Arguments to find a ProductSku
     * @example
     * // Get one ProductSku
     * const productSku = await prisma.productSku.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductSkuFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductSkuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductSku that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSkuFindFirstArgs} args - Arguments to find a ProductSku
     * @example
     * // Get one ProductSku
     * const productSku = await prisma.productSku.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductSkuFindFirstArgs>(args?: SelectSubset<T, ProductSkuFindFirstArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductSku that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSkuFindFirstOrThrowArgs} args - Arguments to find a ProductSku
     * @example
     * // Get one ProductSku
     * const productSku = await prisma.productSku.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductSkuFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductSkuFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductSkus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSkuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductSkus
     * const productSkus = await prisma.productSku.findMany()
     * 
     * // Get first 10 ProductSkus
     * const productSkus = await prisma.productSku.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productSkuWithIdOnly = await prisma.productSku.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductSkuFindManyArgs>(args?: SelectSubset<T, ProductSkuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductSku.
     * @param {ProductSkuCreateArgs} args - Arguments to create a ProductSku.
     * @example
     * // Create one ProductSku
     * const ProductSku = await prisma.productSku.create({
     *   data: {
     *     // ... data to create a ProductSku
     *   }
     * })
     * 
     */
    create<T extends ProductSkuCreateArgs>(args: SelectSubset<T, ProductSkuCreateArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductSkus.
     * @param {ProductSkuCreateManyArgs} args - Arguments to create many ProductSkus.
     * @example
     * // Create many ProductSkus
     * const productSku = await prisma.productSku.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductSkuCreateManyArgs>(args?: SelectSubset<T, ProductSkuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductSkus and returns the data saved in the database.
     * @param {ProductSkuCreateManyAndReturnArgs} args - Arguments to create many ProductSkus.
     * @example
     * // Create many ProductSkus
     * const productSku = await prisma.productSku.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductSkus and only return the `id`
     * const productSkuWithIdOnly = await prisma.productSku.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductSkuCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductSkuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductSku.
     * @param {ProductSkuDeleteArgs} args - Arguments to delete one ProductSku.
     * @example
     * // Delete one ProductSku
     * const ProductSku = await prisma.productSku.delete({
     *   where: {
     *     // ... filter to delete one ProductSku
     *   }
     * })
     * 
     */
    delete<T extends ProductSkuDeleteArgs>(args: SelectSubset<T, ProductSkuDeleteArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductSku.
     * @param {ProductSkuUpdateArgs} args - Arguments to update one ProductSku.
     * @example
     * // Update one ProductSku
     * const productSku = await prisma.productSku.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductSkuUpdateArgs>(args: SelectSubset<T, ProductSkuUpdateArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductSkus.
     * @param {ProductSkuDeleteManyArgs} args - Arguments to filter ProductSkus to delete.
     * @example
     * // Delete a few ProductSkus
     * const { count } = await prisma.productSku.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductSkuDeleteManyArgs>(args?: SelectSubset<T, ProductSkuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductSkus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSkuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductSkus
     * const productSku = await prisma.productSku.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductSkuUpdateManyArgs>(args: SelectSubset<T, ProductSkuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductSkus and returns the data updated in the database.
     * @param {ProductSkuUpdateManyAndReturnArgs} args - Arguments to update many ProductSkus.
     * @example
     * // Update many ProductSkus
     * const productSku = await prisma.productSku.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductSkus and only return the `id`
     * const productSkuWithIdOnly = await prisma.productSku.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductSkuUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductSkuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductSku.
     * @param {ProductSkuUpsertArgs} args - Arguments to update or create a ProductSku.
     * @example
     * // Update or create a ProductSku
     * const productSku = await prisma.productSku.upsert({
     *   create: {
     *     // ... data to create a ProductSku
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductSku we want to update
     *   }
     * })
     */
    upsert<T extends ProductSkuUpsertArgs>(args: SelectSubset<T, ProductSkuUpsertArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductSkus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSkuCountArgs} args - Arguments to filter ProductSkus to count.
     * @example
     * // Count the number of ProductSkus
     * const count = await prisma.productSku.count({
     *   where: {
     *     // ... the filter for the ProductSkus we want to count
     *   }
     * })
    **/
    count<T extends ProductSkuCountArgs>(
      args?: Subset<T, ProductSkuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductSkuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductSku.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSkuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductSkuAggregateArgs>(args: Subset<T, ProductSkuAggregateArgs>): Prisma.PrismaPromise<GetProductSkuAggregateType<T>>

    /**
     * Group by ProductSku.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSkuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductSkuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductSkuGroupByArgs['orderBy'] }
        : { orderBy?: ProductSkuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductSkuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductSkuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductSku model
   */
  readonly fields: ProductSkuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductSku.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductSkuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cards<T extends ProductSku$cardsArgs<ExtArgs> = {}>(args?: Subset<T, ProductSku$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends ProductSku$ordersArgs<ExtArgs> = {}>(args?: Subset<T, ProductSku$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductSku model
   */
  interface ProductSkuFieldRefs {
    readonly id: FieldRef<"ProductSku", 'String'>
    readonly productId: FieldRef<"ProductSku", 'String'>
    readonly name: FieldRef<"ProductSku", 'String'>
    readonly summary: FieldRef<"ProductSku", 'String'>
    readonly priceCents: FieldRef<"ProductSku", 'Int'>
    readonly enabled: FieldRef<"ProductSku", 'Boolean'>
    readonly sortOrder: FieldRef<"ProductSku", 'Int'>
    readonly createdAt: FieldRef<"ProductSku", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductSku", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductSku findUnique
   */
  export type ProductSkuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * Filter, which ProductSku to fetch.
     */
    where: ProductSkuWhereUniqueInput
  }

  /**
   * ProductSku findUniqueOrThrow
   */
  export type ProductSkuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * Filter, which ProductSku to fetch.
     */
    where: ProductSkuWhereUniqueInput
  }

  /**
   * ProductSku findFirst
   */
  export type ProductSkuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * Filter, which ProductSku to fetch.
     */
    where?: ProductSkuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSkus to fetch.
     */
    orderBy?: ProductSkuOrderByWithRelationInput | ProductSkuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductSkus.
     */
    cursor?: ProductSkuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSkus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSkus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSkus.
     */
    distinct?: ProductSkuScalarFieldEnum | ProductSkuScalarFieldEnum[]
  }

  /**
   * ProductSku findFirstOrThrow
   */
  export type ProductSkuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * Filter, which ProductSku to fetch.
     */
    where?: ProductSkuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSkus to fetch.
     */
    orderBy?: ProductSkuOrderByWithRelationInput | ProductSkuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductSkus.
     */
    cursor?: ProductSkuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSkus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSkus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSkus.
     */
    distinct?: ProductSkuScalarFieldEnum | ProductSkuScalarFieldEnum[]
  }

  /**
   * ProductSku findMany
   */
  export type ProductSkuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * Filter, which ProductSkus to fetch.
     */
    where?: ProductSkuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSkus to fetch.
     */
    orderBy?: ProductSkuOrderByWithRelationInput | ProductSkuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductSkus.
     */
    cursor?: ProductSkuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSkus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSkus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSkus.
     */
    distinct?: ProductSkuScalarFieldEnum | ProductSkuScalarFieldEnum[]
  }

  /**
   * ProductSku create
   */
  export type ProductSkuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductSku.
     */
    data: XOR<ProductSkuCreateInput, ProductSkuUncheckedCreateInput>
  }

  /**
   * ProductSku createMany
   */
  export type ProductSkuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductSkus.
     */
    data: ProductSkuCreateManyInput | ProductSkuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductSku createManyAndReturn
   */
  export type ProductSkuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * The data used to create many ProductSkus.
     */
    data: ProductSkuCreateManyInput | ProductSkuCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductSku update
   */
  export type ProductSkuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductSku.
     */
    data: XOR<ProductSkuUpdateInput, ProductSkuUncheckedUpdateInput>
    /**
     * Choose, which ProductSku to update.
     */
    where: ProductSkuWhereUniqueInput
  }

  /**
   * ProductSku updateMany
   */
  export type ProductSkuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductSkus.
     */
    data: XOR<ProductSkuUpdateManyMutationInput, ProductSkuUncheckedUpdateManyInput>
    /**
     * Filter which ProductSkus to update
     */
    where?: ProductSkuWhereInput
    /**
     * Limit how many ProductSkus to update.
     */
    limit?: number
  }

  /**
   * ProductSku updateManyAndReturn
   */
  export type ProductSkuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * The data used to update ProductSkus.
     */
    data: XOR<ProductSkuUpdateManyMutationInput, ProductSkuUncheckedUpdateManyInput>
    /**
     * Filter which ProductSkus to update
     */
    where?: ProductSkuWhereInput
    /**
     * Limit how many ProductSkus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductSku upsert
   */
  export type ProductSkuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductSku to update in case it exists.
     */
    where: ProductSkuWhereUniqueInput
    /**
     * In case the ProductSku found by the `where` argument doesn't exist, create a new ProductSku with this data.
     */
    create: XOR<ProductSkuCreateInput, ProductSkuUncheckedCreateInput>
    /**
     * In case the ProductSku was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductSkuUpdateInput, ProductSkuUncheckedUpdateInput>
  }

  /**
   * ProductSku delete
   */
  export type ProductSkuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
    /**
     * Filter which ProductSku to delete.
     */
    where: ProductSkuWhereUniqueInput
  }

  /**
   * ProductSku deleteMany
   */
  export type ProductSkuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductSkus to delete
     */
    where?: ProductSkuWhereInput
    /**
     * Limit how many ProductSkus to delete.
     */
    limit?: number
  }

  /**
   * ProductSku.cards
   */
  export type ProductSku$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    where?: CardItemWhereInput
    orderBy?: CardItemOrderByWithRelationInput | CardItemOrderByWithRelationInput[]
    cursor?: CardItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardItemScalarFieldEnum | CardItemScalarFieldEnum[]
  }

  /**
   * ProductSku.orders
   */
  export type ProductSku$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    where?: ShopOrderWhereInput
    orderBy?: ShopOrderOrderByWithRelationInput | ShopOrderOrderByWithRelationInput[]
    cursor?: ShopOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShopOrderScalarFieldEnum | ShopOrderScalarFieldEnum[]
  }

  /**
   * ProductSku without action
   */
  export type ProductSkuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSku
     */
    select?: ProductSkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSku
     */
    omit?: ProductSkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSkuInclude<ExtArgs> | null
  }


  /**
   * Model PaymentProfile
   */

  export type AggregatePaymentProfile = {
    _count: PaymentProfileCountAggregateOutputType | null
    _min: PaymentProfileMinAggregateOutputType | null
    _max: PaymentProfileMaxAggregateOutputType | null
  }

  export type PaymentProfileMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    merchantCode: string | null
    apiKey: string | null
    apiSecret: string | null
    notifySecret: string | null
    defaultChannelCode: string | null
    enabledChannelCodes: string | null
    isActive: boolean | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentProfileMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    merchantCode: string | null
    apiKey: string | null
    apiSecret: string | null
    notifySecret: string | null
    defaultChannelCode: string | null
    enabledChannelCodes: string | null
    isActive: boolean | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentProfileCountAggregateOutputType = {
    id: number
    ownerId: number
    name: number
    merchantCode: number
    apiKey: number
    apiSecret: number
    notifySecret: number
    defaultChannelCode: number
    enabledChannelCodes: number
    isActive: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentProfileMinAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    merchantCode?: true
    apiKey?: true
    apiSecret?: true
    notifySecret?: true
    defaultChannelCode?: true
    enabledChannelCodes?: true
    isActive?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentProfileMaxAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    merchantCode?: true
    apiKey?: true
    apiSecret?: true
    notifySecret?: true
    defaultChannelCode?: true
    enabledChannelCodes?: true
    isActive?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentProfileCountAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    merchantCode?: true
    apiKey?: true
    apiSecret?: true
    notifySecret?: true
    defaultChannelCode?: true
    enabledChannelCodes?: true
    isActive?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentProfile to aggregate.
     */
    where?: PaymentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProfiles to fetch.
     */
    orderBy?: PaymentProfileOrderByWithRelationInput | PaymentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentProfiles
    **/
    _count?: true | PaymentProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentProfileMaxAggregateInputType
  }

  export type GetPaymentProfileAggregateType<T extends PaymentProfileAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentProfile[P]>
      : GetScalarType<T[P], AggregatePaymentProfile[P]>
  }




  export type PaymentProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentProfileWhereInput
    orderBy?: PaymentProfileOrderByWithAggregationInput | PaymentProfileOrderByWithAggregationInput[]
    by: PaymentProfileScalarFieldEnum[] | PaymentProfileScalarFieldEnum
    having?: PaymentProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentProfileCountAggregateInputType | true
    _min?: PaymentProfileMinAggregateInputType
    _max?: PaymentProfileMaxAggregateInputType
  }

  export type PaymentProfileGroupByOutputType = {
    id: string
    ownerId: string | null
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret: string | null
    defaultChannelCode: string
    enabledChannelCodes: string | null
    isActive: boolean
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: PaymentProfileCountAggregateOutputType | null
    _min: PaymentProfileMinAggregateOutputType | null
    _max: PaymentProfileMaxAggregateOutputType | null
  }

  type GetPaymentProfileGroupByPayload<T extends PaymentProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentProfileGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentProfileGroupByOutputType[P]>
        }
      >
    >


  export type PaymentProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    merchantCode?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    notifySecret?: boolean
    defaultChannelCode?: boolean
    enabledChannelCodes?: boolean
    isActive?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | PaymentProfile$ownerArgs<ExtArgs>
    products?: boolean | PaymentProfile$productsArgs<ExtArgs>
    orders?: boolean | PaymentProfile$ordersArgs<ExtArgs>
    revisions?: boolean | PaymentProfile$revisionsArgs<ExtArgs>
    _count?: boolean | PaymentProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProfile"]>

  export type PaymentProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    merchantCode?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    notifySecret?: boolean
    defaultChannelCode?: boolean
    enabledChannelCodes?: boolean
    isActive?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | PaymentProfile$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProfile"]>

  export type PaymentProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    merchantCode?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    notifySecret?: boolean
    defaultChannelCode?: boolean
    enabledChannelCodes?: boolean
    isActive?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | PaymentProfile$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProfile"]>

  export type PaymentProfileSelectScalar = {
    id?: boolean
    ownerId?: boolean
    name?: boolean
    merchantCode?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    notifySecret?: boolean
    defaultChannelCode?: boolean
    enabledChannelCodes?: boolean
    isActive?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "name" | "merchantCode" | "apiKey" | "apiSecret" | "notifySecret" | "defaultChannelCode" | "enabledChannelCodes" | "isActive" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentProfile"]>
  export type PaymentProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | PaymentProfile$ownerArgs<ExtArgs>
    products?: boolean | PaymentProfile$productsArgs<ExtArgs>
    orders?: boolean | PaymentProfile$ordersArgs<ExtArgs>
    revisions?: boolean | PaymentProfile$revisionsArgs<ExtArgs>
    _count?: boolean | PaymentProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | PaymentProfile$ownerArgs<ExtArgs>
  }
  export type PaymentProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | PaymentProfile$ownerArgs<ExtArgs>
  }

  export type $PaymentProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentProfile"
    objects: {
      owner: Prisma.$MerchantAccountPayload<ExtArgs> | null
      products: Prisma.$ProductPayload<ExtArgs>[]
      orders: Prisma.$ShopOrderPayload<ExtArgs>[]
      revisions: Prisma.$PaymentProfileRevisionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string | null
      name: string
      merchantCode: string
      apiKey: string
      apiSecret: string
      notifySecret: string | null
      defaultChannelCode: string
      enabledChannelCodes: string | null
      isActive: boolean
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentProfile"]>
    composites: {}
  }

  type PaymentProfileGetPayload<S extends boolean | null | undefined | PaymentProfileDefaultArgs> = $Result.GetResult<Prisma.$PaymentProfilePayload, S>

  type PaymentProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentProfileCountAggregateInputType | true
    }

  export interface PaymentProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentProfile'], meta: { name: 'PaymentProfile' } }
    /**
     * Find zero or one PaymentProfile that matches the filter.
     * @param {PaymentProfileFindUniqueArgs} args - Arguments to find a PaymentProfile
     * @example
     * // Get one PaymentProfile
     * const paymentProfile = await prisma.paymentProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentProfileFindUniqueArgs>(args: SelectSubset<T, PaymentProfileFindUniqueArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentProfileFindUniqueOrThrowArgs} args - Arguments to find a PaymentProfile
     * @example
     * // Get one PaymentProfile
     * const paymentProfile = await prisma.paymentProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileFindFirstArgs} args - Arguments to find a PaymentProfile
     * @example
     * // Get one PaymentProfile
     * const paymentProfile = await prisma.paymentProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentProfileFindFirstArgs>(args?: SelectSubset<T, PaymentProfileFindFirstArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileFindFirstOrThrowArgs} args - Arguments to find a PaymentProfile
     * @example
     * // Get one PaymentProfile
     * const paymentProfile = await prisma.paymentProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentProfiles
     * const paymentProfiles = await prisma.paymentProfile.findMany()
     * 
     * // Get first 10 PaymentProfiles
     * const paymentProfiles = await prisma.paymentProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentProfileWithIdOnly = await prisma.paymentProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentProfileFindManyArgs>(args?: SelectSubset<T, PaymentProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentProfile.
     * @param {PaymentProfileCreateArgs} args - Arguments to create a PaymentProfile.
     * @example
     * // Create one PaymentProfile
     * const PaymentProfile = await prisma.paymentProfile.create({
     *   data: {
     *     // ... data to create a PaymentProfile
     *   }
     * })
     * 
     */
    create<T extends PaymentProfileCreateArgs>(args: SelectSubset<T, PaymentProfileCreateArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentProfiles.
     * @param {PaymentProfileCreateManyArgs} args - Arguments to create many PaymentProfiles.
     * @example
     * // Create many PaymentProfiles
     * const paymentProfile = await prisma.paymentProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentProfileCreateManyArgs>(args?: SelectSubset<T, PaymentProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentProfiles and returns the data saved in the database.
     * @param {PaymentProfileCreateManyAndReturnArgs} args - Arguments to create many PaymentProfiles.
     * @example
     * // Create many PaymentProfiles
     * const paymentProfile = await prisma.paymentProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentProfiles and only return the `id`
     * const paymentProfileWithIdOnly = await prisma.paymentProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentProfile.
     * @param {PaymentProfileDeleteArgs} args - Arguments to delete one PaymentProfile.
     * @example
     * // Delete one PaymentProfile
     * const PaymentProfile = await prisma.paymentProfile.delete({
     *   where: {
     *     // ... filter to delete one PaymentProfile
     *   }
     * })
     * 
     */
    delete<T extends PaymentProfileDeleteArgs>(args: SelectSubset<T, PaymentProfileDeleteArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentProfile.
     * @param {PaymentProfileUpdateArgs} args - Arguments to update one PaymentProfile.
     * @example
     * // Update one PaymentProfile
     * const paymentProfile = await prisma.paymentProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentProfileUpdateArgs>(args: SelectSubset<T, PaymentProfileUpdateArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentProfiles.
     * @param {PaymentProfileDeleteManyArgs} args - Arguments to filter PaymentProfiles to delete.
     * @example
     * // Delete a few PaymentProfiles
     * const { count } = await prisma.paymentProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentProfileDeleteManyArgs>(args?: SelectSubset<T, PaymentProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentProfiles
     * const paymentProfile = await prisma.paymentProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentProfileUpdateManyArgs>(args: SelectSubset<T, PaymentProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentProfiles and returns the data updated in the database.
     * @param {PaymentProfileUpdateManyAndReturnArgs} args - Arguments to update many PaymentProfiles.
     * @example
     * // Update many PaymentProfiles
     * const paymentProfile = await prisma.paymentProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentProfiles and only return the `id`
     * const paymentProfileWithIdOnly = await prisma.paymentProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentProfile.
     * @param {PaymentProfileUpsertArgs} args - Arguments to update or create a PaymentProfile.
     * @example
     * // Update or create a PaymentProfile
     * const paymentProfile = await prisma.paymentProfile.upsert({
     *   create: {
     *     // ... data to create a PaymentProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentProfile we want to update
     *   }
     * })
     */
    upsert<T extends PaymentProfileUpsertArgs>(args: SelectSubset<T, PaymentProfileUpsertArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileCountArgs} args - Arguments to filter PaymentProfiles to count.
     * @example
     * // Count the number of PaymentProfiles
     * const count = await prisma.paymentProfile.count({
     *   where: {
     *     // ... the filter for the PaymentProfiles we want to count
     *   }
     * })
    **/
    count<T extends PaymentProfileCountArgs>(
      args?: Subset<T, PaymentProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentProfileAggregateArgs>(args: Subset<T, PaymentProfileAggregateArgs>): Prisma.PrismaPromise<GetPaymentProfileAggregateType<T>>

    /**
     * Group by PaymentProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentProfileGroupByArgs['orderBy'] }
        : { orderBy?: PaymentProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentProfile model
   */
  readonly fields: PaymentProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends PaymentProfile$ownerArgs<ExtArgs> = {}>(args?: Subset<T, PaymentProfile$ownerArgs<ExtArgs>>): Prisma__MerchantAccountClient<$Result.GetResult<Prisma.$MerchantAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    products<T extends PaymentProfile$productsArgs<ExtArgs> = {}>(args?: Subset<T, PaymentProfile$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends PaymentProfile$ordersArgs<ExtArgs> = {}>(args?: Subset<T, PaymentProfile$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    revisions<T extends PaymentProfile$revisionsArgs<ExtArgs> = {}>(args?: Subset<T, PaymentProfile$revisionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentProfile model
   */
  interface PaymentProfileFieldRefs {
    readonly id: FieldRef<"PaymentProfile", 'String'>
    readonly ownerId: FieldRef<"PaymentProfile", 'String'>
    readonly name: FieldRef<"PaymentProfile", 'String'>
    readonly merchantCode: FieldRef<"PaymentProfile", 'String'>
    readonly apiKey: FieldRef<"PaymentProfile", 'String'>
    readonly apiSecret: FieldRef<"PaymentProfile", 'String'>
    readonly notifySecret: FieldRef<"PaymentProfile", 'String'>
    readonly defaultChannelCode: FieldRef<"PaymentProfile", 'String'>
    readonly enabledChannelCodes: FieldRef<"PaymentProfile", 'String'>
    readonly isActive: FieldRef<"PaymentProfile", 'Boolean'>
    readonly isDefault: FieldRef<"PaymentProfile", 'Boolean'>
    readonly createdAt: FieldRef<"PaymentProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentProfile findUnique
   */
  export type PaymentProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfile to fetch.
     */
    where: PaymentProfileWhereUniqueInput
  }

  /**
   * PaymentProfile findUniqueOrThrow
   */
  export type PaymentProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfile to fetch.
     */
    where: PaymentProfileWhereUniqueInput
  }

  /**
   * PaymentProfile findFirst
   */
  export type PaymentProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfile to fetch.
     */
    where?: PaymentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProfiles to fetch.
     */
    orderBy?: PaymentProfileOrderByWithRelationInput | PaymentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentProfiles.
     */
    cursor?: PaymentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProfiles.
     */
    distinct?: PaymentProfileScalarFieldEnum | PaymentProfileScalarFieldEnum[]
  }

  /**
   * PaymentProfile findFirstOrThrow
   */
  export type PaymentProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfile to fetch.
     */
    where?: PaymentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProfiles to fetch.
     */
    orderBy?: PaymentProfileOrderByWithRelationInput | PaymentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentProfiles.
     */
    cursor?: PaymentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProfiles.
     */
    distinct?: PaymentProfileScalarFieldEnum | PaymentProfileScalarFieldEnum[]
  }

  /**
   * PaymentProfile findMany
   */
  export type PaymentProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfiles to fetch.
     */
    where?: PaymentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProfiles to fetch.
     */
    orderBy?: PaymentProfileOrderByWithRelationInput | PaymentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentProfiles.
     */
    cursor?: PaymentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProfiles.
     */
    distinct?: PaymentProfileScalarFieldEnum | PaymentProfileScalarFieldEnum[]
  }

  /**
   * PaymentProfile create
   */
  export type PaymentProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentProfile.
     */
    data: XOR<PaymentProfileCreateInput, PaymentProfileUncheckedCreateInput>
  }

  /**
   * PaymentProfile createMany
   */
  export type PaymentProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentProfiles.
     */
    data: PaymentProfileCreateManyInput | PaymentProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentProfile createManyAndReturn
   */
  export type PaymentProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentProfiles.
     */
    data: PaymentProfileCreateManyInput | PaymentProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentProfile update
   */
  export type PaymentProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentProfile.
     */
    data: XOR<PaymentProfileUpdateInput, PaymentProfileUncheckedUpdateInput>
    /**
     * Choose, which PaymentProfile to update.
     */
    where: PaymentProfileWhereUniqueInput
  }

  /**
   * PaymentProfile updateMany
   */
  export type PaymentProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentProfiles.
     */
    data: XOR<PaymentProfileUpdateManyMutationInput, PaymentProfileUncheckedUpdateManyInput>
    /**
     * Filter which PaymentProfiles to update
     */
    where?: PaymentProfileWhereInput
    /**
     * Limit how many PaymentProfiles to update.
     */
    limit?: number
  }

  /**
   * PaymentProfile updateManyAndReturn
   */
  export type PaymentProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * The data used to update PaymentProfiles.
     */
    data: XOR<PaymentProfileUpdateManyMutationInput, PaymentProfileUncheckedUpdateManyInput>
    /**
     * Filter which PaymentProfiles to update
     */
    where?: PaymentProfileWhereInput
    /**
     * Limit how many PaymentProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentProfile upsert
   */
  export type PaymentProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentProfile to update in case it exists.
     */
    where: PaymentProfileWhereUniqueInput
    /**
     * In case the PaymentProfile found by the `where` argument doesn't exist, create a new PaymentProfile with this data.
     */
    create: XOR<PaymentProfileCreateInput, PaymentProfileUncheckedCreateInput>
    /**
     * In case the PaymentProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentProfileUpdateInput, PaymentProfileUncheckedUpdateInput>
  }

  /**
   * PaymentProfile delete
   */
  export type PaymentProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    /**
     * Filter which PaymentProfile to delete.
     */
    where: PaymentProfileWhereUniqueInput
  }

  /**
   * PaymentProfile deleteMany
   */
  export type PaymentProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentProfiles to delete
     */
    where?: PaymentProfileWhereInput
    /**
     * Limit how many PaymentProfiles to delete.
     */
    limit?: number
  }

  /**
   * PaymentProfile.owner
   */
  export type PaymentProfile$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantAccount
     */
    select?: MerchantAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantAccount
     */
    omit?: MerchantAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantAccountInclude<ExtArgs> | null
    where?: MerchantAccountWhereInput
  }

  /**
   * PaymentProfile.products
   */
  export type PaymentProfile$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * PaymentProfile.orders
   */
  export type PaymentProfile$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    where?: ShopOrderWhereInput
    orderBy?: ShopOrderOrderByWithRelationInput | ShopOrderOrderByWithRelationInput[]
    cursor?: ShopOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShopOrderScalarFieldEnum | ShopOrderScalarFieldEnum[]
  }

  /**
   * PaymentProfile.revisions
   */
  export type PaymentProfile$revisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    where?: PaymentProfileRevisionWhereInput
    orderBy?: PaymentProfileRevisionOrderByWithRelationInput | PaymentProfileRevisionOrderByWithRelationInput[]
    cursor?: PaymentProfileRevisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentProfileRevisionScalarFieldEnum | PaymentProfileRevisionScalarFieldEnum[]
  }

  /**
   * PaymentProfile without action
   */
  export type PaymentProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
  }


  /**
   * Model ControlAuditLog
   */

  export type AggregateControlAuditLog = {
    _count: ControlAuditLogCountAggregateOutputType | null
    _min: ControlAuditLogMinAggregateOutputType | null
    _max: ControlAuditLogMaxAggregateOutputType | null
  }

  export type ControlAuditLogMinAggregateOutputType = {
    id: string | null
    scope: string | null
    actorType: string | null
    actorId: string | null
    actorLabel: string | null
    merchantAccountId: string | null
    paymentProfileId: string | null
    actionType: string | null
    riskLevel: string | null
    outcome: string | null
    targetType: string | null
    targetId: string | null
    targetLabel: string | null
    summary: string | null
    detail: string | null
    payload: string | null
    reviewStatus: string | null
    reviewerType: string | null
    reviewerId: string | null
    reviewerLabel: string | null
    reviewNote: string | null
    reviewedAt: Date | null
    createdAt: Date | null
  }

  export type ControlAuditLogMaxAggregateOutputType = {
    id: string | null
    scope: string | null
    actorType: string | null
    actorId: string | null
    actorLabel: string | null
    merchantAccountId: string | null
    paymentProfileId: string | null
    actionType: string | null
    riskLevel: string | null
    outcome: string | null
    targetType: string | null
    targetId: string | null
    targetLabel: string | null
    summary: string | null
    detail: string | null
    payload: string | null
    reviewStatus: string | null
    reviewerType: string | null
    reviewerId: string | null
    reviewerLabel: string | null
    reviewNote: string | null
    reviewedAt: Date | null
    createdAt: Date | null
  }

  export type ControlAuditLogCountAggregateOutputType = {
    id: number
    scope: number
    actorType: number
    actorId: number
    actorLabel: number
    merchantAccountId: number
    paymentProfileId: number
    actionType: number
    riskLevel: number
    outcome: number
    targetType: number
    targetId: number
    targetLabel: number
    summary: number
    detail: number
    payload: number
    reviewStatus: number
    reviewerType: number
    reviewerId: number
    reviewerLabel: number
    reviewNote: number
    reviewedAt: number
    createdAt: number
    _all: number
  }


  export type ControlAuditLogMinAggregateInputType = {
    id?: true
    scope?: true
    actorType?: true
    actorId?: true
    actorLabel?: true
    merchantAccountId?: true
    paymentProfileId?: true
    actionType?: true
    riskLevel?: true
    outcome?: true
    targetType?: true
    targetId?: true
    targetLabel?: true
    summary?: true
    detail?: true
    payload?: true
    reviewStatus?: true
    reviewerType?: true
    reviewerId?: true
    reviewerLabel?: true
    reviewNote?: true
    reviewedAt?: true
    createdAt?: true
  }

  export type ControlAuditLogMaxAggregateInputType = {
    id?: true
    scope?: true
    actorType?: true
    actorId?: true
    actorLabel?: true
    merchantAccountId?: true
    paymentProfileId?: true
    actionType?: true
    riskLevel?: true
    outcome?: true
    targetType?: true
    targetId?: true
    targetLabel?: true
    summary?: true
    detail?: true
    payload?: true
    reviewStatus?: true
    reviewerType?: true
    reviewerId?: true
    reviewerLabel?: true
    reviewNote?: true
    reviewedAt?: true
    createdAt?: true
  }

  export type ControlAuditLogCountAggregateInputType = {
    id?: true
    scope?: true
    actorType?: true
    actorId?: true
    actorLabel?: true
    merchantAccountId?: true
    paymentProfileId?: true
    actionType?: true
    riskLevel?: true
    outcome?: true
    targetType?: true
    targetId?: true
    targetLabel?: true
    summary?: true
    detail?: true
    payload?: true
    reviewStatus?: true
    reviewerType?: true
    reviewerId?: true
    reviewerLabel?: true
    reviewNote?: true
    reviewedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ControlAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ControlAuditLog to aggregate.
     */
    where?: ControlAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ControlAuditLogs to fetch.
     */
    orderBy?: ControlAuditLogOrderByWithRelationInput | ControlAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ControlAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ControlAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ControlAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ControlAuditLogs
    **/
    _count?: true | ControlAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ControlAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ControlAuditLogMaxAggregateInputType
  }

  export type GetControlAuditLogAggregateType<T extends ControlAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateControlAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateControlAuditLog[P]>
      : GetScalarType<T[P], AggregateControlAuditLog[P]>
  }




  export type ControlAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ControlAuditLogWhereInput
    orderBy?: ControlAuditLogOrderByWithAggregationInput | ControlAuditLogOrderByWithAggregationInput[]
    by: ControlAuditLogScalarFieldEnum[] | ControlAuditLogScalarFieldEnum
    having?: ControlAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ControlAuditLogCountAggregateInputType | true
    _min?: ControlAuditLogMinAggregateInputType
    _max?: ControlAuditLogMaxAggregateInputType
  }

  export type ControlAuditLogGroupByOutputType = {
    id: string
    scope: string
    actorType: string
    actorId: string | null
    actorLabel: string
    merchantAccountId: string | null
    paymentProfileId: string | null
    actionType: string
    riskLevel: string
    outcome: string
    targetType: string
    targetId: string | null
    targetLabel: string
    summary: string
    detail: string | null
    payload: string | null
    reviewStatus: string
    reviewerType: string | null
    reviewerId: string | null
    reviewerLabel: string | null
    reviewNote: string | null
    reviewedAt: Date | null
    createdAt: Date
    _count: ControlAuditLogCountAggregateOutputType | null
    _min: ControlAuditLogMinAggregateOutputType | null
    _max: ControlAuditLogMaxAggregateOutputType | null
  }

  type GetControlAuditLogGroupByPayload<T extends ControlAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ControlAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ControlAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ControlAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], ControlAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type ControlAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scope?: boolean
    actorType?: boolean
    actorId?: boolean
    actorLabel?: boolean
    merchantAccountId?: boolean
    paymentProfileId?: boolean
    actionType?: boolean
    riskLevel?: boolean
    outcome?: boolean
    targetType?: boolean
    targetId?: boolean
    targetLabel?: boolean
    summary?: boolean
    detail?: boolean
    payload?: boolean
    reviewStatus?: boolean
    reviewerType?: boolean
    reviewerId?: boolean
    reviewerLabel?: boolean
    reviewNote?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["controlAuditLog"]>

  export type ControlAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scope?: boolean
    actorType?: boolean
    actorId?: boolean
    actorLabel?: boolean
    merchantAccountId?: boolean
    paymentProfileId?: boolean
    actionType?: boolean
    riskLevel?: boolean
    outcome?: boolean
    targetType?: boolean
    targetId?: boolean
    targetLabel?: boolean
    summary?: boolean
    detail?: boolean
    payload?: boolean
    reviewStatus?: boolean
    reviewerType?: boolean
    reviewerId?: boolean
    reviewerLabel?: boolean
    reviewNote?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["controlAuditLog"]>

  export type ControlAuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scope?: boolean
    actorType?: boolean
    actorId?: boolean
    actorLabel?: boolean
    merchantAccountId?: boolean
    paymentProfileId?: boolean
    actionType?: boolean
    riskLevel?: boolean
    outcome?: boolean
    targetType?: boolean
    targetId?: boolean
    targetLabel?: boolean
    summary?: boolean
    detail?: boolean
    payload?: boolean
    reviewStatus?: boolean
    reviewerType?: boolean
    reviewerId?: boolean
    reviewerLabel?: boolean
    reviewNote?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["controlAuditLog"]>

  export type ControlAuditLogSelectScalar = {
    id?: boolean
    scope?: boolean
    actorType?: boolean
    actorId?: boolean
    actorLabel?: boolean
    merchantAccountId?: boolean
    paymentProfileId?: boolean
    actionType?: boolean
    riskLevel?: boolean
    outcome?: boolean
    targetType?: boolean
    targetId?: boolean
    targetLabel?: boolean
    summary?: boolean
    detail?: boolean
    payload?: boolean
    reviewStatus?: boolean
    reviewerType?: boolean
    reviewerId?: boolean
    reviewerLabel?: boolean
    reviewNote?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
  }

  export type ControlAuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "scope" | "actorType" | "actorId" | "actorLabel" | "merchantAccountId" | "paymentProfileId" | "actionType" | "riskLevel" | "outcome" | "targetType" | "targetId" | "targetLabel" | "summary" | "detail" | "payload" | "reviewStatus" | "reviewerType" | "reviewerId" | "reviewerLabel" | "reviewNote" | "reviewedAt" | "createdAt", ExtArgs["result"]["controlAuditLog"]>

  export type $ControlAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ControlAuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      scope: string
      actorType: string
      actorId: string | null
      actorLabel: string
      merchantAccountId: string | null
      paymentProfileId: string | null
      actionType: string
      riskLevel: string
      outcome: string
      targetType: string
      targetId: string | null
      targetLabel: string
      summary: string
      detail: string | null
      payload: string | null
      reviewStatus: string
      reviewerType: string | null
      reviewerId: string | null
      reviewerLabel: string | null
      reviewNote: string | null
      reviewedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["controlAuditLog"]>
    composites: {}
  }

  type ControlAuditLogGetPayload<S extends boolean | null | undefined | ControlAuditLogDefaultArgs> = $Result.GetResult<Prisma.$ControlAuditLogPayload, S>

  type ControlAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ControlAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ControlAuditLogCountAggregateInputType | true
    }

  export interface ControlAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ControlAuditLog'], meta: { name: 'ControlAuditLog' } }
    /**
     * Find zero or one ControlAuditLog that matches the filter.
     * @param {ControlAuditLogFindUniqueArgs} args - Arguments to find a ControlAuditLog
     * @example
     * // Get one ControlAuditLog
     * const controlAuditLog = await prisma.controlAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ControlAuditLogFindUniqueArgs>(args: SelectSubset<T, ControlAuditLogFindUniqueArgs<ExtArgs>>): Prisma__ControlAuditLogClient<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ControlAuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ControlAuditLogFindUniqueOrThrowArgs} args - Arguments to find a ControlAuditLog
     * @example
     * // Get one ControlAuditLog
     * const controlAuditLog = await prisma.controlAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ControlAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ControlAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ControlAuditLogClient<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ControlAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControlAuditLogFindFirstArgs} args - Arguments to find a ControlAuditLog
     * @example
     * // Get one ControlAuditLog
     * const controlAuditLog = await prisma.controlAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ControlAuditLogFindFirstArgs>(args?: SelectSubset<T, ControlAuditLogFindFirstArgs<ExtArgs>>): Prisma__ControlAuditLogClient<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ControlAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControlAuditLogFindFirstOrThrowArgs} args - Arguments to find a ControlAuditLog
     * @example
     * // Get one ControlAuditLog
     * const controlAuditLog = await prisma.controlAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ControlAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ControlAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ControlAuditLogClient<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ControlAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControlAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ControlAuditLogs
     * const controlAuditLogs = await prisma.controlAuditLog.findMany()
     * 
     * // Get first 10 ControlAuditLogs
     * const controlAuditLogs = await prisma.controlAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const controlAuditLogWithIdOnly = await prisma.controlAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ControlAuditLogFindManyArgs>(args?: SelectSubset<T, ControlAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ControlAuditLog.
     * @param {ControlAuditLogCreateArgs} args - Arguments to create a ControlAuditLog.
     * @example
     * // Create one ControlAuditLog
     * const ControlAuditLog = await prisma.controlAuditLog.create({
     *   data: {
     *     // ... data to create a ControlAuditLog
     *   }
     * })
     * 
     */
    create<T extends ControlAuditLogCreateArgs>(args: SelectSubset<T, ControlAuditLogCreateArgs<ExtArgs>>): Prisma__ControlAuditLogClient<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ControlAuditLogs.
     * @param {ControlAuditLogCreateManyArgs} args - Arguments to create many ControlAuditLogs.
     * @example
     * // Create many ControlAuditLogs
     * const controlAuditLog = await prisma.controlAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ControlAuditLogCreateManyArgs>(args?: SelectSubset<T, ControlAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ControlAuditLogs and returns the data saved in the database.
     * @param {ControlAuditLogCreateManyAndReturnArgs} args - Arguments to create many ControlAuditLogs.
     * @example
     * // Create many ControlAuditLogs
     * const controlAuditLog = await prisma.controlAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ControlAuditLogs and only return the `id`
     * const controlAuditLogWithIdOnly = await prisma.controlAuditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ControlAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ControlAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ControlAuditLog.
     * @param {ControlAuditLogDeleteArgs} args - Arguments to delete one ControlAuditLog.
     * @example
     * // Delete one ControlAuditLog
     * const ControlAuditLog = await prisma.controlAuditLog.delete({
     *   where: {
     *     // ... filter to delete one ControlAuditLog
     *   }
     * })
     * 
     */
    delete<T extends ControlAuditLogDeleteArgs>(args: SelectSubset<T, ControlAuditLogDeleteArgs<ExtArgs>>): Prisma__ControlAuditLogClient<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ControlAuditLog.
     * @param {ControlAuditLogUpdateArgs} args - Arguments to update one ControlAuditLog.
     * @example
     * // Update one ControlAuditLog
     * const controlAuditLog = await prisma.controlAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ControlAuditLogUpdateArgs>(args: SelectSubset<T, ControlAuditLogUpdateArgs<ExtArgs>>): Prisma__ControlAuditLogClient<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ControlAuditLogs.
     * @param {ControlAuditLogDeleteManyArgs} args - Arguments to filter ControlAuditLogs to delete.
     * @example
     * // Delete a few ControlAuditLogs
     * const { count } = await prisma.controlAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ControlAuditLogDeleteManyArgs>(args?: SelectSubset<T, ControlAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ControlAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControlAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ControlAuditLogs
     * const controlAuditLog = await prisma.controlAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ControlAuditLogUpdateManyArgs>(args: SelectSubset<T, ControlAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ControlAuditLogs and returns the data updated in the database.
     * @param {ControlAuditLogUpdateManyAndReturnArgs} args - Arguments to update many ControlAuditLogs.
     * @example
     * // Update many ControlAuditLogs
     * const controlAuditLog = await prisma.controlAuditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ControlAuditLogs and only return the `id`
     * const controlAuditLogWithIdOnly = await prisma.controlAuditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ControlAuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ControlAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ControlAuditLog.
     * @param {ControlAuditLogUpsertArgs} args - Arguments to update or create a ControlAuditLog.
     * @example
     * // Update or create a ControlAuditLog
     * const controlAuditLog = await prisma.controlAuditLog.upsert({
     *   create: {
     *     // ... data to create a ControlAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ControlAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends ControlAuditLogUpsertArgs>(args: SelectSubset<T, ControlAuditLogUpsertArgs<ExtArgs>>): Prisma__ControlAuditLogClient<$Result.GetResult<Prisma.$ControlAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ControlAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControlAuditLogCountArgs} args - Arguments to filter ControlAuditLogs to count.
     * @example
     * // Count the number of ControlAuditLogs
     * const count = await prisma.controlAuditLog.count({
     *   where: {
     *     // ... the filter for the ControlAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends ControlAuditLogCountArgs>(
      args?: Subset<T, ControlAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ControlAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ControlAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControlAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ControlAuditLogAggregateArgs>(args: Subset<T, ControlAuditLogAggregateArgs>): Prisma.PrismaPromise<GetControlAuditLogAggregateType<T>>

    /**
     * Group by ControlAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControlAuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ControlAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ControlAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: ControlAuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ControlAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetControlAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ControlAuditLog model
   */
  readonly fields: ControlAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ControlAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ControlAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ControlAuditLog model
   */
  interface ControlAuditLogFieldRefs {
    readonly id: FieldRef<"ControlAuditLog", 'String'>
    readonly scope: FieldRef<"ControlAuditLog", 'String'>
    readonly actorType: FieldRef<"ControlAuditLog", 'String'>
    readonly actorId: FieldRef<"ControlAuditLog", 'String'>
    readonly actorLabel: FieldRef<"ControlAuditLog", 'String'>
    readonly merchantAccountId: FieldRef<"ControlAuditLog", 'String'>
    readonly paymentProfileId: FieldRef<"ControlAuditLog", 'String'>
    readonly actionType: FieldRef<"ControlAuditLog", 'String'>
    readonly riskLevel: FieldRef<"ControlAuditLog", 'String'>
    readonly outcome: FieldRef<"ControlAuditLog", 'String'>
    readonly targetType: FieldRef<"ControlAuditLog", 'String'>
    readonly targetId: FieldRef<"ControlAuditLog", 'String'>
    readonly targetLabel: FieldRef<"ControlAuditLog", 'String'>
    readonly summary: FieldRef<"ControlAuditLog", 'String'>
    readonly detail: FieldRef<"ControlAuditLog", 'String'>
    readonly payload: FieldRef<"ControlAuditLog", 'String'>
    readonly reviewStatus: FieldRef<"ControlAuditLog", 'String'>
    readonly reviewerType: FieldRef<"ControlAuditLog", 'String'>
    readonly reviewerId: FieldRef<"ControlAuditLog", 'String'>
    readonly reviewerLabel: FieldRef<"ControlAuditLog", 'String'>
    readonly reviewNote: FieldRef<"ControlAuditLog", 'String'>
    readonly reviewedAt: FieldRef<"ControlAuditLog", 'DateTime'>
    readonly createdAt: FieldRef<"ControlAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ControlAuditLog findUnique
   */
  export type ControlAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which ControlAuditLog to fetch.
     */
    where: ControlAuditLogWhereUniqueInput
  }

  /**
   * ControlAuditLog findUniqueOrThrow
   */
  export type ControlAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which ControlAuditLog to fetch.
     */
    where: ControlAuditLogWhereUniqueInput
  }

  /**
   * ControlAuditLog findFirst
   */
  export type ControlAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which ControlAuditLog to fetch.
     */
    where?: ControlAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ControlAuditLogs to fetch.
     */
    orderBy?: ControlAuditLogOrderByWithRelationInput | ControlAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ControlAuditLogs.
     */
    cursor?: ControlAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ControlAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ControlAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ControlAuditLogs.
     */
    distinct?: ControlAuditLogScalarFieldEnum | ControlAuditLogScalarFieldEnum[]
  }

  /**
   * ControlAuditLog findFirstOrThrow
   */
  export type ControlAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which ControlAuditLog to fetch.
     */
    where?: ControlAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ControlAuditLogs to fetch.
     */
    orderBy?: ControlAuditLogOrderByWithRelationInput | ControlAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ControlAuditLogs.
     */
    cursor?: ControlAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ControlAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ControlAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ControlAuditLogs.
     */
    distinct?: ControlAuditLogScalarFieldEnum | ControlAuditLogScalarFieldEnum[]
  }

  /**
   * ControlAuditLog findMany
   */
  export type ControlAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which ControlAuditLogs to fetch.
     */
    where?: ControlAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ControlAuditLogs to fetch.
     */
    orderBy?: ControlAuditLogOrderByWithRelationInput | ControlAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ControlAuditLogs.
     */
    cursor?: ControlAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ControlAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ControlAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ControlAuditLogs.
     */
    distinct?: ControlAuditLogScalarFieldEnum | ControlAuditLogScalarFieldEnum[]
  }

  /**
   * ControlAuditLog create
   */
  export type ControlAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ControlAuditLog.
     */
    data: XOR<ControlAuditLogCreateInput, ControlAuditLogUncheckedCreateInput>
  }

  /**
   * ControlAuditLog createMany
   */
  export type ControlAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ControlAuditLogs.
     */
    data: ControlAuditLogCreateManyInput | ControlAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ControlAuditLog createManyAndReturn
   */
  export type ControlAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many ControlAuditLogs.
     */
    data: ControlAuditLogCreateManyInput | ControlAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ControlAuditLog update
   */
  export type ControlAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ControlAuditLog.
     */
    data: XOR<ControlAuditLogUpdateInput, ControlAuditLogUncheckedUpdateInput>
    /**
     * Choose, which ControlAuditLog to update.
     */
    where: ControlAuditLogWhereUniqueInput
  }

  /**
   * ControlAuditLog updateMany
   */
  export type ControlAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ControlAuditLogs.
     */
    data: XOR<ControlAuditLogUpdateManyMutationInput, ControlAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which ControlAuditLogs to update
     */
    where?: ControlAuditLogWhereInput
    /**
     * Limit how many ControlAuditLogs to update.
     */
    limit?: number
  }

  /**
   * ControlAuditLog updateManyAndReturn
   */
  export type ControlAuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * The data used to update ControlAuditLogs.
     */
    data: XOR<ControlAuditLogUpdateManyMutationInput, ControlAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which ControlAuditLogs to update
     */
    where?: ControlAuditLogWhereInput
    /**
     * Limit how many ControlAuditLogs to update.
     */
    limit?: number
  }

  /**
   * ControlAuditLog upsert
   */
  export type ControlAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ControlAuditLog to update in case it exists.
     */
    where: ControlAuditLogWhereUniqueInput
    /**
     * In case the ControlAuditLog found by the `where` argument doesn't exist, create a new ControlAuditLog with this data.
     */
    create: XOR<ControlAuditLogCreateInput, ControlAuditLogUncheckedCreateInput>
    /**
     * In case the ControlAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ControlAuditLogUpdateInput, ControlAuditLogUncheckedUpdateInput>
  }

  /**
   * ControlAuditLog delete
   */
  export type ControlAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
    /**
     * Filter which ControlAuditLog to delete.
     */
    where: ControlAuditLogWhereUniqueInput
  }

  /**
   * ControlAuditLog deleteMany
   */
  export type ControlAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ControlAuditLogs to delete
     */
    where?: ControlAuditLogWhereInput
    /**
     * Limit how many ControlAuditLogs to delete.
     */
    limit?: number
  }

  /**
   * ControlAuditLog without action
   */
  export type ControlAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControlAuditLog
     */
    select?: ControlAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControlAuditLog
     */
    omit?: ControlAuditLogOmit<ExtArgs> | null
  }


  /**
   * Model PaymentProfileRevision
   */

  export type AggregatePaymentProfileRevision = {
    _count: PaymentProfileRevisionCountAggregateOutputType | null
    _avg: PaymentProfileRevisionAvgAggregateOutputType | null
    _sum: PaymentProfileRevisionSumAggregateOutputType | null
    _min: PaymentProfileRevisionMinAggregateOutputType | null
    _max: PaymentProfileRevisionMaxAggregateOutputType | null
  }

  export type PaymentProfileRevisionAvgAggregateOutputType = {
    version: number | null
  }

  export type PaymentProfileRevisionSumAggregateOutputType = {
    version: number | null
  }

  export type PaymentProfileRevisionMinAggregateOutputType = {
    id: string | null
    paymentProfileId: string | null
    version: number | null
    sourceScope: string | null
    actorType: string | null
    actorId: string | null
    actorLabel: string | null
    changeType: string | null
    summary: string | null
    snapshot: string | null
    createdAt: Date | null
  }

  export type PaymentProfileRevisionMaxAggregateOutputType = {
    id: string | null
    paymentProfileId: string | null
    version: number | null
    sourceScope: string | null
    actorType: string | null
    actorId: string | null
    actorLabel: string | null
    changeType: string | null
    summary: string | null
    snapshot: string | null
    createdAt: Date | null
  }

  export type PaymentProfileRevisionCountAggregateOutputType = {
    id: number
    paymentProfileId: number
    version: number
    sourceScope: number
    actorType: number
    actorId: number
    actorLabel: number
    changeType: number
    summary: number
    snapshot: number
    createdAt: number
    _all: number
  }


  export type PaymentProfileRevisionAvgAggregateInputType = {
    version?: true
  }

  export type PaymentProfileRevisionSumAggregateInputType = {
    version?: true
  }

  export type PaymentProfileRevisionMinAggregateInputType = {
    id?: true
    paymentProfileId?: true
    version?: true
    sourceScope?: true
    actorType?: true
    actorId?: true
    actorLabel?: true
    changeType?: true
    summary?: true
    snapshot?: true
    createdAt?: true
  }

  export type PaymentProfileRevisionMaxAggregateInputType = {
    id?: true
    paymentProfileId?: true
    version?: true
    sourceScope?: true
    actorType?: true
    actorId?: true
    actorLabel?: true
    changeType?: true
    summary?: true
    snapshot?: true
    createdAt?: true
  }

  export type PaymentProfileRevisionCountAggregateInputType = {
    id?: true
    paymentProfileId?: true
    version?: true
    sourceScope?: true
    actorType?: true
    actorId?: true
    actorLabel?: true
    changeType?: true
    summary?: true
    snapshot?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentProfileRevisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentProfileRevision to aggregate.
     */
    where?: PaymentProfileRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProfileRevisions to fetch.
     */
    orderBy?: PaymentProfileRevisionOrderByWithRelationInput | PaymentProfileRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentProfileRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProfileRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProfileRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentProfileRevisions
    **/
    _count?: true | PaymentProfileRevisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentProfileRevisionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentProfileRevisionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentProfileRevisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentProfileRevisionMaxAggregateInputType
  }

  export type GetPaymentProfileRevisionAggregateType<T extends PaymentProfileRevisionAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentProfileRevision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentProfileRevision[P]>
      : GetScalarType<T[P], AggregatePaymentProfileRevision[P]>
  }




  export type PaymentProfileRevisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentProfileRevisionWhereInput
    orderBy?: PaymentProfileRevisionOrderByWithAggregationInput | PaymentProfileRevisionOrderByWithAggregationInput[]
    by: PaymentProfileRevisionScalarFieldEnum[] | PaymentProfileRevisionScalarFieldEnum
    having?: PaymentProfileRevisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentProfileRevisionCountAggregateInputType | true
    _avg?: PaymentProfileRevisionAvgAggregateInputType
    _sum?: PaymentProfileRevisionSumAggregateInputType
    _min?: PaymentProfileRevisionMinAggregateInputType
    _max?: PaymentProfileRevisionMaxAggregateInputType
  }

  export type PaymentProfileRevisionGroupByOutputType = {
    id: string
    paymentProfileId: string
    version: number
    sourceScope: string
    actorType: string
    actorId: string | null
    actorLabel: string
    changeType: string
    summary: string
    snapshot: string
    createdAt: Date
    _count: PaymentProfileRevisionCountAggregateOutputType | null
    _avg: PaymentProfileRevisionAvgAggregateOutputType | null
    _sum: PaymentProfileRevisionSumAggregateOutputType | null
    _min: PaymentProfileRevisionMinAggregateOutputType | null
    _max: PaymentProfileRevisionMaxAggregateOutputType | null
  }

  type GetPaymentProfileRevisionGroupByPayload<T extends PaymentProfileRevisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentProfileRevisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentProfileRevisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentProfileRevisionGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentProfileRevisionGroupByOutputType[P]>
        }
      >
    >


  export type PaymentProfileRevisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentProfileId?: boolean
    version?: boolean
    sourceScope?: boolean
    actorType?: boolean
    actorId?: boolean
    actorLabel?: boolean
    changeType?: boolean
    summary?: boolean
    snapshot?: boolean
    createdAt?: boolean
    paymentProfile?: boolean | PaymentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProfileRevision"]>

  export type PaymentProfileRevisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentProfileId?: boolean
    version?: boolean
    sourceScope?: boolean
    actorType?: boolean
    actorId?: boolean
    actorLabel?: boolean
    changeType?: boolean
    summary?: boolean
    snapshot?: boolean
    createdAt?: boolean
    paymentProfile?: boolean | PaymentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProfileRevision"]>

  export type PaymentProfileRevisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentProfileId?: boolean
    version?: boolean
    sourceScope?: boolean
    actorType?: boolean
    actorId?: boolean
    actorLabel?: boolean
    changeType?: boolean
    summary?: boolean
    snapshot?: boolean
    createdAt?: boolean
    paymentProfile?: boolean | PaymentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentProfileRevision"]>

  export type PaymentProfileRevisionSelectScalar = {
    id?: boolean
    paymentProfileId?: boolean
    version?: boolean
    sourceScope?: boolean
    actorType?: boolean
    actorId?: boolean
    actorLabel?: boolean
    changeType?: boolean
    summary?: boolean
    snapshot?: boolean
    createdAt?: boolean
  }

  export type PaymentProfileRevisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paymentProfileId" | "version" | "sourceScope" | "actorType" | "actorId" | "actorLabel" | "changeType" | "summary" | "snapshot" | "createdAt", ExtArgs["result"]["paymentProfileRevision"]>
  export type PaymentProfileRevisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentProfile?: boolean | PaymentProfileDefaultArgs<ExtArgs>
  }
  export type PaymentProfileRevisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentProfile?: boolean | PaymentProfileDefaultArgs<ExtArgs>
  }
  export type PaymentProfileRevisionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentProfile?: boolean | PaymentProfileDefaultArgs<ExtArgs>
  }

  export type $PaymentProfileRevisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentProfileRevision"
    objects: {
      paymentProfile: Prisma.$PaymentProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paymentProfileId: string
      version: number
      sourceScope: string
      actorType: string
      actorId: string | null
      actorLabel: string
      changeType: string
      summary: string
      snapshot: string
      createdAt: Date
    }, ExtArgs["result"]["paymentProfileRevision"]>
    composites: {}
  }

  type PaymentProfileRevisionGetPayload<S extends boolean | null | undefined | PaymentProfileRevisionDefaultArgs> = $Result.GetResult<Prisma.$PaymentProfileRevisionPayload, S>

  type PaymentProfileRevisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentProfileRevisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentProfileRevisionCountAggregateInputType | true
    }

  export interface PaymentProfileRevisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentProfileRevision'], meta: { name: 'PaymentProfileRevision' } }
    /**
     * Find zero or one PaymentProfileRevision that matches the filter.
     * @param {PaymentProfileRevisionFindUniqueArgs} args - Arguments to find a PaymentProfileRevision
     * @example
     * // Get one PaymentProfileRevision
     * const paymentProfileRevision = await prisma.paymentProfileRevision.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentProfileRevisionFindUniqueArgs>(args: SelectSubset<T, PaymentProfileRevisionFindUniqueArgs<ExtArgs>>): Prisma__PaymentProfileRevisionClient<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentProfileRevision that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentProfileRevisionFindUniqueOrThrowArgs} args - Arguments to find a PaymentProfileRevision
     * @example
     * // Get one PaymentProfileRevision
     * const paymentProfileRevision = await prisma.paymentProfileRevision.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentProfileRevisionFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentProfileRevisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentProfileRevisionClient<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentProfileRevision that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileRevisionFindFirstArgs} args - Arguments to find a PaymentProfileRevision
     * @example
     * // Get one PaymentProfileRevision
     * const paymentProfileRevision = await prisma.paymentProfileRevision.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentProfileRevisionFindFirstArgs>(args?: SelectSubset<T, PaymentProfileRevisionFindFirstArgs<ExtArgs>>): Prisma__PaymentProfileRevisionClient<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentProfileRevision that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileRevisionFindFirstOrThrowArgs} args - Arguments to find a PaymentProfileRevision
     * @example
     * // Get one PaymentProfileRevision
     * const paymentProfileRevision = await prisma.paymentProfileRevision.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentProfileRevisionFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentProfileRevisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentProfileRevisionClient<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentProfileRevisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileRevisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentProfileRevisions
     * const paymentProfileRevisions = await prisma.paymentProfileRevision.findMany()
     * 
     * // Get first 10 PaymentProfileRevisions
     * const paymentProfileRevisions = await prisma.paymentProfileRevision.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentProfileRevisionWithIdOnly = await prisma.paymentProfileRevision.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentProfileRevisionFindManyArgs>(args?: SelectSubset<T, PaymentProfileRevisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentProfileRevision.
     * @param {PaymentProfileRevisionCreateArgs} args - Arguments to create a PaymentProfileRevision.
     * @example
     * // Create one PaymentProfileRevision
     * const PaymentProfileRevision = await prisma.paymentProfileRevision.create({
     *   data: {
     *     // ... data to create a PaymentProfileRevision
     *   }
     * })
     * 
     */
    create<T extends PaymentProfileRevisionCreateArgs>(args: SelectSubset<T, PaymentProfileRevisionCreateArgs<ExtArgs>>): Prisma__PaymentProfileRevisionClient<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentProfileRevisions.
     * @param {PaymentProfileRevisionCreateManyArgs} args - Arguments to create many PaymentProfileRevisions.
     * @example
     * // Create many PaymentProfileRevisions
     * const paymentProfileRevision = await prisma.paymentProfileRevision.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentProfileRevisionCreateManyArgs>(args?: SelectSubset<T, PaymentProfileRevisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentProfileRevisions and returns the data saved in the database.
     * @param {PaymentProfileRevisionCreateManyAndReturnArgs} args - Arguments to create many PaymentProfileRevisions.
     * @example
     * // Create many PaymentProfileRevisions
     * const paymentProfileRevision = await prisma.paymentProfileRevision.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentProfileRevisions and only return the `id`
     * const paymentProfileRevisionWithIdOnly = await prisma.paymentProfileRevision.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentProfileRevisionCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentProfileRevisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentProfileRevision.
     * @param {PaymentProfileRevisionDeleteArgs} args - Arguments to delete one PaymentProfileRevision.
     * @example
     * // Delete one PaymentProfileRevision
     * const PaymentProfileRevision = await prisma.paymentProfileRevision.delete({
     *   where: {
     *     // ... filter to delete one PaymentProfileRevision
     *   }
     * })
     * 
     */
    delete<T extends PaymentProfileRevisionDeleteArgs>(args: SelectSubset<T, PaymentProfileRevisionDeleteArgs<ExtArgs>>): Prisma__PaymentProfileRevisionClient<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentProfileRevision.
     * @param {PaymentProfileRevisionUpdateArgs} args - Arguments to update one PaymentProfileRevision.
     * @example
     * // Update one PaymentProfileRevision
     * const paymentProfileRevision = await prisma.paymentProfileRevision.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentProfileRevisionUpdateArgs>(args: SelectSubset<T, PaymentProfileRevisionUpdateArgs<ExtArgs>>): Prisma__PaymentProfileRevisionClient<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentProfileRevisions.
     * @param {PaymentProfileRevisionDeleteManyArgs} args - Arguments to filter PaymentProfileRevisions to delete.
     * @example
     * // Delete a few PaymentProfileRevisions
     * const { count } = await prisma.paymentProfileRevision.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentProfileRevisionDeleteManyArgs>(args?: SelectSubset<T, PaymentProfileRevisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentProfileRevisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileRevisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentProfileRevisions
     * const paymentProfileRevision = await prisma.paymentProfileRevision.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentProfileRevisionUpdateManyArgs>(args: SelectSubset<T, PaymentProfileRevisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentProfileRevisions and returns the data updated in the database.
     * @param {PaymentProfileRevisionUpdateManyAndReturnArgs} args - Arguments to update many PaymentProfileRevisions.
     * @example
     * // Update many PaymentProfileRevisions
     * const paymentProfileRevision = await prisma.paymentProfileRevision.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentProfileRevisions and only return the `id`
     * const paymentProfileRevisionWithIdOnly = await prisma.paymentProfileRevision.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentProfileRevisionUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentProfileRevisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentProfileRevision.
     * @param {PaymentProfileRevisionUpsertArgs} args - Arguments to update or create a PaymentProfileRevision.
     * @example
     * // Update or create a PaymentProfileRevision
     * const paymentProfileRevision = await prisma.paymentProfileRevision.upsert({
     *   create: {
     *     // ... data to create a PaymentProfileRevision
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentProfileRevision we want to update
     *   }
     * })
     */
    upsert<T extends PaymentProfileRevisionUpsertArgs>(args: SelectSubset<T, PaymentProfileRevisionUpsertArgs<ExtArgs>>): Prisma__PaymentProfileRevisionClient<$Result.GetResult<Prisma.$PaymentProfileRevisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentProfileRevisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileRevisionCountArgs} args - Arguments to filter PaymentProfileRevisions to count.
     * @example
     * // Count the number of PaymentProfileRevisions
     * const count = await prisma.paymentProfileRevision.count({
     *   where: {
     *     // ... the filter for the PaymentProfileRevisions we want to count
     *   }
     * })
    **/
    count<T extends PaymentProfileRevisionCountArgs>(
      args?: Subset<T, PaymentProfileRevisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentProfileRevisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentProfileRevision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileRevisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentProfileRevisionAggregateArgs>(args: Subset<T, PaymentProfileRevisionAggregateArgs>): Prisma.PrismaPromise<GetPaymentProfileRevisionAggregateType<T>>

    /**
     * Group by PaymentProfileRevision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentProfileRevisionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentProfileRevisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentProfileRevisionGroupByArgs['orderBy'] }
        : { orderBy?: PaymentProfileRevisionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentProfileRevisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentProfileRevisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentProfileRevision model
   */
  readonly fields: PaymentProfileRevisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentProfileRevision.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentProfileRevisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paymentProfile<T extends PaymentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentProfileDefaultArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentProfileRevision model
   */
  interface PaymentProfileRevisionFieldRefs {
    readonly id: FieldRef<"PaymentProfileRevision", 'String'>
    readonly paymentProfileId: FieldRef<"PaymentProfileRevision", 'String'>
    readonly version: FieldRef<"PaymentProfileRevision", 'Int'>
    readonly sourceScope: FieldRef<"PaymentProfileRevision", 'String'>
    readonly actorType: FieldRef<"PaymentProfileRevision", 'String'>
    readonly actorId: FieldRef<"PaymentProfileRevision", 'String'>
    readonly actorLabel: FieldRef<"PaymentProfileRevision", 'String'>
    readonly changeType: FieldRef<"PaymentProfileRevision", 'String'>
    readonly summary: FieldRef<"PaymentProfileRevision", 'String'>
    readonly snapshot: FieldRef<"PaymentProfileRevision", 'String'>
    readonly createdAt: FieldRef<"PaymentProfileRevision", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentProfileRevision findUnique
   */
  export type PaymentProfileRevisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfileRevision to fetch.
     */
    where: PaymentProfileRevisionWhereUniqueInput
  }

  /**
   * PaymentProfileRevision findUniqueOrThrow
   */
  export type PaymentProfileRevisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfileRevision to fetch.
     */
    where: PaymentProfileRevisionWhereUniqueInput
  }

  /**
   * PaymentProfileRevision findFirst
   */
  export type PaymentProfileRevisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfileRevision to fetch.
     */
    where?: PaymentProfileRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProfileRevisions to fetch.
     */
    orderBy?: PaymentProfileRevisionOrderByWithRelationInput | PaymentProfileRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentProfileRevisions.
     */
    cursor?: PaymentProfileRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProfileRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProfileRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProfileRevisions.
     */
    distinct?: PaymentProfileRevisionScalarFieldEnum | PaymentProfileRevisionScalarFieldEnum[]
  }

  /**
   * PaymentProfileRevision findFirstOrThrow
   */
  export type PaymentProfileRevisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfileRevision to fetch.
     */
    where?: PaymentProfileRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProfileRevisions to fetch.
     */
    orderBy?: PaymentProfileRevisionOrderByWithRelationInput | PaymentProfileRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentProfileRevisions.
     */
    cursor?: PaymentProfileRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProfileRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProfileRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProfileRevisions.
     */
    distinct?: PaymentProfileRevisionScalarFieldEnum | PaymentProfileRevisionScalarFieldEnum[]
  }

  /**
   * PaymentProfileRevision findMany
   */
  export type PaymentProfileRevisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentProfileRevisions to fetch.
     */
    where?: PaymentProfileRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentProfileRevisions to fetch.
     */
    orderBy?: PaymentProfileRevisionOrderByWithRelationInput | PaymentProfileRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentProfileRevisions.
     */
    cursor?: PaymentProfileRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentProfileRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentProfileRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentProfileRevisions.
     */
    distinct?: PaymentProfileRevisionScalarFieldEnum | PaymentProfileRevisionScalarFieldEnum[]
  }

  /**
   * PaymentProfileRevision create
   */
  export type PaymentProfileRevisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentProfileRevision.
     */
    data: XOR<PaymentProfileRevisionCreateInput, PaymentProfileRevisionUncheckedCreateInput>
  }

  /**
   * PaymentProfileRevision createMany
   */
  export type PaymentProfileRevisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentProfileRevisions.
     */
    data: PaymentProfileRevisionCreateManyInput | PaymentProfileRevisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentProfileRevision createManyAndReturn
   */
  export type PaymentProfileRevisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentProfileRevisions.
     */
    data: PaymentProfileRevisionCreateManyInput | PaymentProfileRevisionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentProfileRevision update
   */
  export type PaymentProfileRevisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentProfileRevision.
     */
    data: XOR<PaymentProfileRevisionUpdateInput, PaymentProfileRevisionUncheckedUpdateInput>
    /**
     * Choose, which PaymentProfileRevision to update.
     */
    where: PaymentProfileRevisionWhereUniqueInput
  }

  /**
   * PaymentProfileRevision updateMany
   */
  export type PaymentProfileRevisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentProfileRevisions.
     */
    data: XOR<PaymentProfileRevisionUpdateManyMutationInput, PaymentProfileRevisionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentProfileRevisions to update
     */
    where?: PaymentProfileRevisionWhereInput
    /**
     * Limit how many PaymentProfileRevisions to update.
     */
    limit?: number
  }

  /**
   * PaymentProfileRevision updateManyAndReturn
   */
  export type PaymentProfileRevisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * The data used to update PaymentProfileRevisions.
     */
    data: XOR<PaymentProfileRevisionUpdateManyMutationInput, PaymentProfileRevisionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentProfileRevisions to update
     */
    where?: PaymentProfileRevisionWhereInput
    /**
     * Limit how many PaymentProfileRevisions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentProfileRevision upsert
   */
  export type PaymentProfileRevisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentProfileRevision to update in case it exists.
     */
    where: PaymentProfileRevisionWhereUniqueInput
    /**
     * In case the PaymentProfileRevision found by the `where` argument doesn't exist, create a new PaymentProfileRevision with this data.
     */
    create: XOR<PaymentProfileRevisionCreateInput, PaymentProfileRevisionUncheckedCreateInput>
    /**
     * In case the PaymentProfileRevision was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentProfileRevisionUpdateInput, PaymentProfileRevisionUncheckedUpdateInput>
  }

  /**
   * PaymentProfileRevision delete
   */
  export type PaymentProfileRevisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
    /**
     * Filter which PaymentProfileRevision to delete.
     */
    where: PaymentProfileRevisionWhereUniqueInput
  }

  /**
   * PaymentProfileRevision deleteMany
   */
  export type PaymentProfileRevisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentProfileRevisions to delete
     */
    where?: PaymentProfileRevisionWhereInput
    /**
     * Limit how many PaymentProfileRevisions to delete.
     */
    limit?: number
  }

  /**
   * PaymentProfileRevision without action
   */
  export type PaymentProfileRevisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfileRevision
     */
    select?: PaymentProfileRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfileRevision
     */
    omit?: PaymentProfileRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileRevisionInclude<ExtArgs> | null
  }


  /**
   * Model CardItem
   */

  export type AggregateCardItem = {
    _count: CardItemCountAggregateOutputType | null
    _min: CardItemMinAggregateOutputType | null
    _max: CardItemMaxAggregateOutputType | null
  }

  export type CardItemMinAggregateOutputType = {
    id: string | null
    productId: string | null
    skuId: string | null
    batchName: string | null
    secret: string | null
    status: $Enums.CardItemStatus | null
    orderId: string | null
    reservedAt: Date | null
    soldAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CardItemMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    skuId: string | null
    batchName: string | null
    secret: string | null
    status: $Enums.CardItemStatus | null
    orderId: string | null
    reservedAt: Date | null
    soldAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CardItemCountAggregateOutputType = {
    id: number
    productId: number
    skuId: number
    batchName: number
    secret: number
    status: number
    orderId: number
    reservedAt: number
    soldAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CardItemMinAggregateInputType = {
    id?: true
    productId?: true
    skuId?: true
    batchName?: true
    secret?: true
    status?: true
    orderId?: true
    reservedAt?: true
    soldAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CardItemMaxAggregateInputType = {
    id?: true
    productId?: true
    skuId?: true
    batchName?: true
    secret?: true
    status?: true
    orderId?: true
    reservedAt?: true
    soldAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CardItemCountAggregateInputType = {
    id?: true
    productId?: true
    skuId?: true
    batchName?: true
    secret?: true
    status?: true
    orderId?: true
    reservedAt?: true
    soldAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CardItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CardItem to aggregate.
     */
    where?: CardItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardItems to fetch.
     */
    orderBy?: CardItemOrderByWithRelationInput | CardItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CardItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CardItems
    **/
    _count?: true | CardItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardItemMaxAggregateInputType
  }

  export type GetCardItemAggregateType<T extends CardItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCardItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCardItem[P]>
      : GetScalarType<T[P], AggregateCardItem[P]>
  }




  export type CardItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardItemWhereInput
    orderBy?: CardItemOrderByWithAggregationInput | CardItemOrderByWithAggregationInput[]
    by: CardItemScalarFieldEnum[] | CardItemScalarFieldEnum
    having?: CardItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardItemCountAggregateInputType | true
    _min?: CardItemMinAggregateInputType
    _max?: CardItemMaxAggregateInputType
  }

  export type CardItemGroupByOutputType = {
    id: string
    productId: string
    skuId: string
    batchName: string | null
    secret: string
    status: $Enums.CardItemStatus
    orderId: string | null
    reservedAt: Date | null
    soldAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CardItemCountAggregateOutputType | null
    _min: CardItemMinAggregateOutputType | null
    _max: CardItemMaxAggregateOutputType | null
  }

  type GetCardItemGroupByPayload<T extends CardItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardItemGroupByOutputType[P]>
            : GetScalarType<T[P], CardItemGroupByOutputType[P]>
        }
      >
    >


  export type CardItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    skuId?: boolean
    batchName?: boolean
    secret?: boolean
    status?: boolean
    orderId?: boolean
    reservedAt?: boolean
    soldAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
    order?: boolean | CardItem$orderArgs<ExtArgs>
  }, ExtArgs["result"]["cardItem"]>

  export type CardItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    skuId?: boolean
    batchName?: boolean
    secret?: boolean
    status?: boolean
    orderId?: boolean
    reservedAt?: boolean
    soldAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
    order?: boolean | CardItem$orderArgs<ExtArgs>
  }, ExtArgs["result"]["cardItem"]>

  export type CardItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    skuId?: boolean
    batchName?: boolean
    secret?: boolean
    status?: boolean
    orderId?: boolean
    reservedAt?: boolean
    soldAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
    order?: boolean | CardItem$orderArgs<ExtArgs>
  }, ExtArgs["result"]["cardItem"]>

  export type CardItemSelectScalar = {
    id?: boolean
    productId?: boolean
    skuId?: boolean
    batchName?: boolean
    secret?: boolean
    status?: boolean
    orderId?: boolean
    reservedAt?: boolean
    soldAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CardItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "skuId" | "batchName" | "secret" | "status" | "orderId" | "reservedAt" | "soldAt" | "createdAt" | "updatedAt", ExtArgs["result"]["cardItem"]>
  export type CardItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
    order?: boolean | CardItem$orderArgs<ExtArgs>
  }
  export type CardItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
    order?: boolean | CardItem$orderArgs<ExtArgs>
  }
  export type CardItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
    order?: boolean | CardItem$orderArgs<ExtArgs>
  }

  export type $CardItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CardItem"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      sku: Prisma.$ProductSkuPayload<ExtArgs>
      order: Prisma.$ShopOrderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      skuId: string
      batchName: string | null
      secret: string
      status: $Enums.CardItemStatus
      orderId: string | null
      reservedAt: Date | null
      soldAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cardItem"]>
    composites: {}
  }

  type CardItemGetPayload<S extends boolean | null | undefined | CardItemDefaultArgs> = $Result.GetResult<Prisma.$CardItemPayload, S>

  type CardItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CardItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CardItemCountAggregateInputType | true
    }

  export interface CardItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CardItem'], meta: { name: 'CardItem' } }
    /**
     * Find zero or one CardItem that matches the filter.
     * @param {CardItemFindUniqueArgs} args - Arguments to find a CardItem
     * @example
     * // Get one CardItem
     * const cardItem = await prisma.cardItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CardItemFindUniqueArgs>(args: SelectSubset<T, CardItemFindUniqueArgs<ExtArgs>>): Prisma__CardItemClient<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CardItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CardItemFindUniqueOrThrowArgs} args - Arguments to find a CardItem
     * @example
     * // Get one CardItem
     * const cardItem = await prisma.cardItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CardItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CardItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CardItemClient<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CardItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardItemFindFirstArgs} args - Arguments to find a CardItem
     * @example
     * // Get one CardItem
     * const cardItem = await prisma.cardItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CardItemFindFirstArgs>(args?: SelectSubset<T, CardItemFindFirstArgs<ExtArgs>>): Prisma__CardItemClient<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CardItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardItemFindFirstOrThrowArgs} args - Arguments to find a CardItem
     * @example
     * // Get one CardItem
     * const cardItem = await prisma.cardItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CardItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CardItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CardItemClient<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CardItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CardItems
     * const cardItems = await prisma.cardItem.findMany()
     * 
     * // Get first 10 CardItems
     * const cardItems = await prisma.cardItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cardItemWithIdOnly = await prisma.cardItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CardItemFindManyArgs>(args?: SelectSubset<T, CardItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CardItem.
     * @param {CardItemCreateArgs} args - Arguments to create a CardItem.
     * @example
     * // Create one CardItem
     * const CardItem = await prisma.cardItem.create({
     *   data: {
     *     // ... data to create a CardItem
     *   }
     * })
     * 
     */
    create<T extends CardItemCreateArgs>(args: SelectSubset<T, CardItemCreateArgs<ExtArgs>>): Prisma__CardItemClient<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CardItems.
     * @param {CardItemCreateManyArgs} args - Arguments to create many CardItems.
     * @example
     * // Create many CardItems
     * const cardItem = await prisma.cardItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CardItemCreateManyArgs>(args?: SelectSubset<T, CardItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CardItems and returns the data saved in the database.
     * @param {CardItemCreateManyAndReturnArgs} args - Arguments to create many CardItems.
     * @example
     * // Create many CardItems
     * const cardItem = await prisma.cardItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CardItems and only return the `id`
     * const cardItemWithIdOnly = await prisma.cardItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CardItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CardItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CardItem.
     * @param {CardItemDeleteArgs} args - Arguments to delete one CardItem.
     * @example
     * // Delete one CardItem
     * const CardItem = await prisma.cardItem.delete({
     *   where: {
     *     // ... filter to delete one CardItem
     *   }
     * })
     * 
     */
    delete<T extends CardItemDeleteArgs>(args: SelectSubset<T, CardItemDeleteArgs<ExtArgs>>): Prisma__CardItemClient<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CardItem.
     * @param {CardItemUpdateArgs} args - Arguments to update one CardItem.
     * @example
     * // Update one CardItem
     * const cardItem = await prisma.cardItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CardItemUpdateArgs>(args: SelectSubset<T, CardItemUpdateArgs<ExtArgs>>): Prisma__CardItemClient<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CardItems.
     * @param {CardItemDeleteManyArgs} args - Arguments to filter CardItems to delete.
     * @example
     * // Delete a few CardItems
     * const { count } = await prisma.cardItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CardItemDeleteManyArgs>(args?: SelectSubset<T, CardItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CardItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CardItems
     * const cardItem = await prisma.cardItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CardItemUpdateManyArgs>(args: SelectSubset<T, CardItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CardItems and returns the data updated in the database.
     * @param {CardItemUpdateManyAndReturnArgs} args - Arguments to update many CardItems.
     * @example
     * // Update many CardItems
     * const cardItem = await prisma.cardItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CardItems and only return the `id`
     * const cardItemWithIdOnly = await prisma.cardItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CardItemUpdateManyAndReturnArgs>(args: SelectSubset<T, CardItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CardItem.
     * @param {CardItemUpsertArgs} args - Arguments to update or create a CardItem.
     * @example
     * // Update or create a CardItem
     * const cardItem = await prisma.cardItem.upsert({
     *   create: {
     *     // ... data to create a CardItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CardItem we want to update
     *   }
     * })
     */
    upsert<T extends CardItemUpsertArgs>(args: SelectSubset<T, CardItemUpsertArgs<ExtArgs>>): Prisma__CardItemClient<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CardItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardItemCountArgs} args - Arguments to filter CardItems to count.
     * @example
     * // Count the number of CardItems
     * const count = await prisma.cardItem.count({
     *   where: {
     *     // ... the filter for the CardItems we want to count
     *   }
     * })
    **/
    count<T extends CardItemCountArgs>(
      args?: Subset<T, CardItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CardItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CardItemAggregateArgs>(args: Subset<T, CardItemAggregateArgs>): Prisma.PrismaPromise<GetCardItemAggregateType<T>>

    /**
     * Group by CardItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CardItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CardItemGroupByArgs['orderBy'] }
        : { orderBy?: CardItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CardItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CardItem model
   */
  readonly fields: CardItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CardItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CardItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sku<T extends ProductSkuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductSkuDefaultArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    order<T extends CardItem$orderArgs<ExtArgs> = {}>(args?: Subset<T, CardItem$orderArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CardItem model
   */
  interface CardItemFieldRefs {
    readonly id: FieldRef<"CardItem", 'String'>
    readonly productId: FieldRef<"CardItem", 'String'>
    readonly skuId: FieldRef<"CardItem", 'String'>
    readonly batchName: FieldRef<"CardItem", 'String'>
    readonly secret: FieldRef<"CardItem", 'String'>
    readonly status: FieldRef<"CardItem", 'CardItemStatus'>
    readonly orderId: FieldRef<"CardItem", 'String'>
    readonly reservedAt: FieldRef<"CardItem", 'DateTime'>
    readonly soldAt: FieldRef<"CardItem", 'DateTime'>
    readonly createdAt: FieldRef<"CardItem", 'DateTime'>
    readonly updatedAt: FieldRef<"CardItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CardItem findUnique
   */
  export type CardItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * Filter, which CardItem to fetch.
     */
    where: CardItemWhereUniqueInput
  }

  /**
   * CardItem findUniqueOrThrow
   */
  export type CardItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * Filter, which CardItem to fetch.
     */
    where: CardItemWhereUniqueInput
  }

  /**
   * CardItem findFirst
   */
  export type CardItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * Filter, which CardItem to fetch.
     */
    where?: CardItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardItems to fetch.
     */
    orderBy?: CardItemOrderByWithRelationInput | CardItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CardItems.
     */
    cursor?: CardItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CardItems.
     */
    distinct?: CardItemScalarFieldEnum | CardItemScalarFieldEnum[]
  }

  /**
   * CardItem findFirstOrThrow
   */
  export type CardItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * Filter, which CardItem to fetch.
     */
    where?: CardItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardItems to fetch.
     */
    orderBy?: CardItemOrderByWithRelationInput | CardItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CardItems.
     */
    cursor?: CardItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CardItems.
     */
    distinct?: CardItemScalarFieldEnum | CardItemScalarFieldEnum[]
  }

  /**
   * CardItem findMany
   */
  export type CardItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * Filter, which CardItems to fetch.
     */
    where?: CardItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardItems to fetch.
     */
    orderBy?: CardItemOrderByWithRelationInput | CardItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CardItems.
     */
    cursor?: CardItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CardItems.
     */
    distinct?: CardItemScalarFieldEnum | CardItemScalarFieldEnum[]
  }

  /**
   * CardItem create
   */
  export type CardItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CardItem.
     */
    data: XOR<CardItemCreateInput, CardItemUncheckedCreateInput>
  }

  /**
   * CardItem createMany
   */
  export type CardItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CardItems.
     */
    data: CardItemCreateManyInput | CardItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CardItem createManyAndReturn
   */
  export type CardItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * The data used to create many CardItems.
     */
    data: CardItemCreateManyInput | CardItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CardItem update
   */
  export type CardItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CardItem.
     */
    data: XOR<CardItemUpdateInput, CardItemUncheckedUpdateInput>
    /**
     * Choose, which CardItem to update.
     */
    where: CardItemWhereUniqueInput
  }

  /**
   * CardItem updateMany
   */
  export type CardItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CardItems.
     */
    data: XOR<CardItemUpdateManyMutationInput, CardItemUncheckedUpdateManyInput>
    /**
     * Filter which CardItems to update
     */
    where?: CardItemWhereInput
    /**
     * Limit how many CardItems to update.
     */
    limit?: number
  }

  /**
   * CardItem updateManyAndReturn
   */
  export type CardItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * The data used to update CardItems.
     */
    data: XOR<CardItemUpdateManyMutationInput, CardItemUncheckedUpdateManyInput>
    /**
     * Filter which CardItems to update
     */
    where?: CardItemWhereInput
    /**
     * Limit how many CardItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CardItem upsert
   */
  export type CardItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CardItem to update in case it exists.
     */
    where: CardItemWhereUniqueInput
    /**
     * In case the CardItem found by the `where` argument doesn't exist, create a new CardItem with this data.
     */
    create: XOR<CardItemCreateInput, CardItemUncheckedCreateInput>
    /**
     * In case the CardItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CardItemUpdateInput, CardItemUncheckedUpdateInput>
  }

  /**
   * CardItem delete
   */
  export type CardItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    /**
     * Filter which CardItem to delete.
     */
    where: CardItemWhereUniqueInput
  }

  /**
   * CardItem deleteMany
   */
  export type CardItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CardItems to delete
     */
    where?: CardItemWhereInput
    /**
     * Limit how many CardItems to delete.
     */
    limit?: number
  }

  /**
   * CardItem.order
   */
  export type CardItem$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    where?: ShopOrderWhereInput
  }

  /**
   * CardItem without action
   */
  export type CardItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
  }


  /**
   * Model ShopOrder
   */

  export type AggregateShopOrder = {
    _count: ShopOrderCountAggregateOutputType | null
    _avg: ShopOrderAvgAggregateOutputType | null
    _sum: ShopOrderSumAggregateOutputType | null
    _min: ShopOrderMinAggregateOutputType | null
    _max: ShopOrderMaxAggregateOutputType | null
  }

  export type ShopOrderAvgAggregateOutputType = {
    quantity: number | null
    amountCents: number | null
  }

  export type ShopOrderSumAggregateOutputType = {
    quantity: number | null
    amountCents: number | null
  }

  export type ShopOrderMinAggregateOutputType = {
    id: string | null
    orderNo: string | null
    publicToken: string | null
    productId: string | null
    paymentProfileId: string | null
    skuId: string | null
    quantity: number | null
    customerEmail: string | null
    amountCents: number | null
    channelCode: string | null
    status: $Enums.ShopOrderStatus | null
    novapayOrderId: string | null
    novapayStatus: string | null
    checkoutUrl: string | null
    hostedCheckoutUrl: string | null
    failureMessage: string | null
    expiresAt: Date | null
    paidAt: Date | null
    fulfilledAt: Date | null
    lastSyncedAt: Date | null
    lastNovaCreateResponse: string | null
    lastNovaPayload: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopOrderMaxAggregateOutputType = {
    id: string | null
    orderNo: string | null
    publicToken: string | null
    productId: string | null
    paymentProfileId: string | null
    skuId: string | null
    quantity: number | null
    customerEmail: string | null
    amountCents: number | null
    channelCode: string | null
    status: $Enums.ShopOrderStatus | null
    novapayOrderId: string | null
    novapayStatus: string | null
    checkoutUrl: string | null
    hostedCheckoutUrl: string | null
    failureMessage: string | null
    expiresAt: Date | null
    paidAt: Date | null
    fulfilledAt: Date | null
    lastSyncedAt: Date | null
    lastNovaCreateResponse: string | null
    lastNovaPayload: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopOrderCountAggregateOutputType = {
    id: number
    orderNo: number
    publicToken: number
    productId: number
    paymentProfileId: number
    skuId: number
    quantity: number
    customerEmail: number
    amountCents: number
    channelCode: number
    status: number
    novapayOrderId: number
    novapayStatus: number
    checkoutUrl: number
    hostedCheckoutUrl: number
    failureMessage: number
    expiresAt: number
    paidAt: number
    fulfilledAt: number
    lastSyncedAt: number
    lastNovaCreateResponse: number
    lastNovaPayload: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopOrderAvgAggregateInputType = {
    quantity?: true
    amountCents?: true
  }

  export type ShopOrderSumAggregateInputType = {
    quantity?: true
    amountCents?: true
  }

  export type ShopOrderMinAggregateInputType = {
    id?: true
    orderNo?: true
    publicToken?: true
    productId?: true
    paymentProfileId?: true
    skuId?: true
    quantity?: true
    customerEmail?: true
    amountCents?: true
    channelCode?: true
    status?: true
    novapayOrderId?: true
    novapayStatus?: true
    checkoutUrl?: true
    hostedCheckoutUrl?: true
    failureMessage?: true
    expiresAt?: true
    paidAt?: true
    fulfilledAt?: true
    lastSyncedAt?: true
    lastNovaCreateResponse?: true
    lastNovaPayload?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopOrderMaxAggregateInputType = {
    id?: true
    orderNo?: true
    publicToken?: true
    productId?: true
    paymentProfileId?: true
    skuId?: true
    quantity?: true
    customerEmail?: true
    amountCents?: true
    channelCode?: true
    status?: true
    novapayOrderId?: true
    novapayStatus?: true
    checkoutUrl?: true
    hostedCheckoutUrl?: true
    failureMessage?: true
    expiresAt?: true
    paidAt?: true
    fulfilledAt?: true
    lastSyncedAt?: true
    lastNovaCreateResponse?: true
    lastNovaPayload?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopOrderCountAggregateInputType = {
    id?: true
    orderNo?: true
    publicToken?: true
    productId?: true
    paymentProfileId?: true
    skuId?: true
    quantity?: true
    customerEmail?: true
    amountCents?: true
    channelCode?: true
    status?: true
    novapayOrderId?: true
    novapayStatus?: true
    checkoutUrl?: true
    hostedCheckoutUrl?: true
    failureMessage?: true
    expiresAt?: true
    paidAt?: true
    fulfilledAt?: true
    lastSyncedAt?: true
    lastNovaCreateResponse?: true
    lastNovaPayload?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopOrder to aggregate.
     */
    where?: ShopOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopOrders to fetch.
     */
    orderBy?: ShopOrderOrderByWithRelationInput | ShopOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopOrders
    **/
    _count?: true | ShopOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShopOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShopOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopOrderMaxAggregateInputType
  }

  export type GetShopOrderAggregateType<T extends ShopOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateShopOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopOrder[P]>
      : GetScalarType<T[P], AggregateShopOrder[P]>
  }




  export type ShopOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopOrderWhereInput
    orderBy?: ShopOrderOrderByWithAggregationInput | ShopOrderOrderByWithAggregationInput[]
    by: ShopOrderScalarFieldEnum[] | ShopOrderScalarFieldEnum
    having?: ShopOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopOrderCountAggregateInputType | true
    _avg?: ShopOrderAvgAggregateInputType
    _sum?: ShopOrderSumAggregateInputType
    _min?: ShopOrderMinAggregateInputType
    _max?: ShopOrderMaxAggregateInputType
  }

  export type ShopOrderGroupByOutputType = {
    id: string
    orderNo: string
    publicToken: string
    productId: string
    paymentProfileId: string | null
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status: $Enums.ShopOrderStatus
    novapayOrderId: string | null
    novapayStatus: string | null
    checkoutUrl: string | null
    hostedCheckoutUrl: string | null
    failureMessage: string | null
    expiresAt: Date
    paidAt: Date | null
    fulfilledAt: Date | null
    lastSyncedAt: Date | null
    lastNovaCreateResponse: string | null
    lastNovaPayload: string | null
    createdAt: Date
    updatedAt: Date
    _count: ShopOrderCountAggregateOutputType | null
    _avg: ShopOrderAvgAggregateOutputType | null
    _sum: ShopOrderSumAggregateOutputType | null
    _min: ShopOrderMinAggregateOutputType | null
    _max: ShopOrderMaxAggregateOutputType | null
  }

  type GetShopOrderGroupByPayload<T extends ShopOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopOrderGroupByOutputType[P]>
            : GetScalarType<T[P], ShopOrderGroupByOutputType[P]>
        }
      >
    >


  export type ShopOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNo?: boolean
    publicToken?: boolean
    productId?: boolean
    paymentProfileId?: boolean
    skuId?: boolean
    quantity?: boolean
    customerEmail?: boolean
    amountCents?: boolean
    channelCode?: boolean
    status?: boolean
    novapayOrderId?: boolean
    novapayStatus?: boolean
    checkoutUrl?: boolean
    hostedCheckoutUrl?: boolean
    failureMessage?: boolean
    expiresAt?: boolean
    paidAt?: boolean
    fulfilledAt?: boolean
    lastSyncedAt?: boolean
    lastNovaCreateResponse?: boolean
    lastNovaPayload?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    paymentProfile?: boolean | ShopOrder$paymentProfileArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
    cards?: boolean | ShopOrder$cardsArgs<ExtArgs>
    paymentAttempts?: boolean | ShopOrder$paymentAttemptsArgs<ExtArgs>
    syncTasks?: boolean | ShopOrder$syncTasksArgs<ExtArgs>
    _count?: boolean | ShopOrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopOrder"]>

  export type ShopOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNo?: boolean
    publicToken?: boolean
    productId?: boolean
    paymentProfileId?: boolean
    skuId?: boolean
    quantity?: boolean
    customerEmail?: boolean
    amountCents?: boolean
    channelCode?: boolean
    status?: boolean
    novapayOrderId?: boolean
    novapayStatus?: boolean
    checkoutUrl?: boolean
    hostedCheckoutUrl?: boolean
    failureMessage?: boolean
    expiresAt?: boolean
    paidAt?: boolean
    fulfilledAt?: boolean
    lastSyncedAt?: boolean
    lastNovaCreateResponse?: boolean
    lastNovaPayload?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    paymentProfile?: boolean | ShopOrder$paymentProfileArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopOrder"]>

  export type ShopOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNo?: boolean
    publicToken?: boolean
    productId?: boolean
    paymentProfileId?: boolean
    skuId?: boolean
    quantity?: boolean
    customerEmail?: boolean
    amountCents?: boolean
    channelCode?: boolean
    status?: boolean
    novapayOrderId?: boolean
    novapayStatus?: boolean
    checkoutUrl?: boolean
    hostedCheckoutUrl?: boolean
    failureMessage?: boolean
    expiresAt?: boolean
    paidAt?: boolean
    fulfilledAt?: boolean
    lastSyncedAt?: boolean
    lastNovaCreateResponse?: boolean
    lastNovaPayload?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    paymentProfile?: boolean | ShopOrder$paymentProfileArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopOrder"]>

  export type ShopOrderSelectScalar = {
    id?: boolean
    orderNo?: boolean
    publicToken?: boolean
    productId?: boolean
    paymentProfileId?: boolean
    skuId?: boolean
    quantity?: boolean
    customerEmail?: boolean
    amountCents?: boolean
    channelCode?: boolean
    status?: boolean
    novapayOrderId?: boolean
    novapayStatus?: boolean
    checkoutUrl?: boolean
    hostedCheckoutUrl?: boolean
    failureMessage?: boolean
    expiresAt?: boolean
    paidAt?: boolean
    fulfilledAt?: boolean
    lastSyncedAt?: boolean
    lastNovaCreateResponse?: boolean
    lastNovaPayload?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShopOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderNo" | "publicToken" | "productId" | "paymentProfileId" | "skuId" | "quantity" | "customerEmail" | "amountCents" | "channelCode" | "status" | "novapayOrderId" | "novapayStatus" | "checkoutUrl" | "hostedCheckoutUrl" | "failureMessage" | "expiresAt" | "paidAt" | "fulfilledAt" | "lastSyncedAt" | "lastNovaCreateResponse" | "lastNovaPayload" | "createdAt" | "updatedAt", ExtArgs["result"]["shopOrder"]>
  export type ShopOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    paymentProfile?: boolean | ShopOrder$paymentProfileArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
    cards?: boolean | ShopOrder$cardsArgs<ExtArgs>
    paymentAttempts?: boolean | ShopOrder$paymentAttemptsArgs<ExtArgs>
    syncTasks?: boolean | ShopOrder$syncTasksArgs<ExtArgs>
    _count?: boolean | ShopOrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShopOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    paymentProfile?: boolean | ShopOrder$paymentProfileArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
  }
  export type ShopOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    paymentProfile?: boolean | ShopOrder$paymentProfileArgs<ExtArgs>
    sku?: boolean | ProductSkuDefaultArgs<ExtArgs>
  }

  export type $ShopOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopOrder"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      paymentProfile: Prisma.$PaymentProfilePayload<ExtArgs> | null
      sku: Prisma.$ProductSkuPayload<ExtArgs>
      cards: Prisma.$CardItemPayload<ExtArgs>[]
      paymentAttempts: Prisma.$ShopPaymentAttemptPayload<ExtArgs>[]
      syncTasks: Prisma.$OrderSyncTaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderNo: string
      publicToken: string
      productId: string
      paymentProfileId: string | null
      skuId: string
      quantity: number
      customerEmail: string
      amountCents: number
      channelCode: string
      status: $Enums.ShopOrderStatus
      novapayOrderId: string | null
      novapayStatus: string | null
      checkoutUrl: string | null
      hostedCheckoutUrl: string | null
      failureMessage: string | null
      expiresAt: Date
      paidAt: Date | null
      fulfilledAt: Date | null
      lastSyncedAt: Date | null
      lastNovaCreateResponse: string | null
      lastNovaPayload: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shopOrder"]>
    composites: {}
  }

  type ShopOrderGetPayload<S extends boolean | null | undefined | ShopOrderDefaultArgs> = $Result.GetResult<Prisma.$ShopOrderPayload, S>

  type ShopOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShopOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShopOrderCountAggregateInputType | true
    }

  export interface ShopOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopOrder'], meta: { name: 'ShopOrder' } }
    /**
     * Find zero or one ShopOrder that matches the filter.
     * @param {ShopOrderFindUniqueArgs} args - Arguments to find a ShopOrder
     * @example
     * // Get one ShopOrder
     * const shopOrder = await prisma.shopOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopOrderFindUniqueArgs>(args: SelectSubset<T, ShopOrderFindUniqueArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ShopOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopOrderFindUniqueOrThrowArgs} args - Arguments to find a ShopOrder
     * @example
     * // Get one ShopOrder
     * const shopOrder = await prisma.shopOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopOrderFindFirstArgs} args - Arguments to find a ShopOrder
     * @example
     * // Get one ShopOrder
     * const shopOrder = await prisma.shopOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopOrderFindFirstArgs>(args?: SelectSubset<T, ShopOrderFindFirstArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopOrderFindFirstOrThrowArgs} args - Arguments to find a ShopOrder
     * @example
     * // Get one ShopOrder
     * const shopOrder = await prisma.shopOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ShopOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopOrders
     * const shopOrders = await prisma.shopOrder.findMany()
     * 
     * // Get first 10 ShopOrders
     * const shopOrders = await prisma.shopOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopOrderWithIdOnly = await prisma.shopOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopOrderFindManyArgs>(args?: SelectSubset<T, ShopOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ShopOrder.
     * @param {ShopOrderCreateArgs} args - Arguments to create a ShopOrder.
     * @example
     * // Create one ShopOrder
     * const ShopOrder = await prisma.shopOrder.create({
     *   data: {
     *     // ... data to create a ShopOrder
     *   }
     * })
     * 
     */
    create<T extends ShopOrderCreateArgs>(args: SelectSubset<T, ShopOrderCreateArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ShopOrders.
     * @param {ShopOrderCreateManyArgs} args - Arguments to create many ShopOrders.
     * @example
     * // Create many ShopOrders
     * const shopOrder = await prisma.shopOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopOrderCreateManyArgs>(args?: SelectSubset<T, ShopOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShopOrders and returns the data saved in the database.
     * @param {ShopOrderCreateManyAndReturnArgs} args - Arguments to create many ShopOrders.
     * @example
     * // Create many ShopOrders
     * const shopOrder = await prisma.shopOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShopOrders and only return the `id`
     * const shopOrderWithIdOnly = await prisma.shopOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ShopOrder.
     * @param {ShopOrderDeleteArgs} args - Arguments to delete one ShopOrder.
     * @example
     * // Delete one ShopOrder
     * const ShopOrder = await prisma.shopOrder.delete({
     *   where: {
     *     // ... filter to delete one ShopOrder
     *   }
     * })
     * 
     */
    delete<T extends ShopOrderDeleteArgs>(args: SelectSubset<T, ShopOrderDeleteArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ShopOrder.
     * @param {ShopOrderUpdateArgs} args - Arguments to update one ShopOrder.
     * @example
     * // Update one ShopOrder
     * const shopOrder = await prisma.shopOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopOrderUpdateArgs>(args: SelectSubset<T, ShopOrderUpdateArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ShopOrders.
     * @param {ShopOrderDeleteManyArgs} args - Arguments to filter ShopOrders to delete.
     * @example
     * // Delete a few ShopOrders
     * const { count } = await prisma.shopOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopOrderDeleteManyArgs>(args?: SelectSubset<T, ShopOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopOrders
     * const shopOrder = await prisma.shopOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopOrderUpdateManyArgs>(args: SelectSubset<T, ShopOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopOrders and returns the data updated in the database.
     * @param {ShopOrderUpdateManyAndReturnArgs} args - Arguments to update many ShopOrders.
     * @example
     * // Update many ShopOrders
     * const shopOrder = await prisma.shopOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ShopOrders and only return the `id`
     * const shopOrderWithIdOnly = await prisma.shopOrder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShopOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, ShopOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ShopOrder.
     * @param {ShopOrderUpsertArgs} args - Arguments to update or create a ShopOrder.
     * @example
     * // Update or create a ShopOrder
     * const shopOrder = await prisma.shopOrder.upsert({
     *   create: {
     *     // ... data to create a ShopOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopOrder we want to update
     *   }
     * })
     */
    upsert<T extends ShopOrderUpsertArgs>(args: SelectSubset<T, ShopOrderUpsertArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ShopOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopOrderCountArgs} args - Arguments to filter ShopOrders to count.
     * @example
     * // Count the number of ShopOrders
     * const count = await prisma.shopOrder.count({
     *   where: {
     *     // ... the filter for the ShopOrders we want to count
     *   }
     * })
    **/
    count<T extends ShopOrderCountArgs>(
      args?: Subset<T, ShopOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopOrderAggregateArgs>(args: Subset<T, ShopOrderAggregateArgs>): Prisma.PrismaPromise<GetShopOrderAggregateType<T>>

    /**
     * Group by ShopOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopOrderGroupByArgs['orderBy'] }
        : { orderBy?: ShopOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopOrder model
   */
  readonly fields: ShopOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    paymentProfile<T extends ShopOrder$paymentProfileArgs<ExtArgs> = {}>(args?: Subset<T, ShopOrder$paymentProfileArgs<ExtArgs>>): Prisma__PaymentProfileClient<$Result.GetResult<Prisma.$PaymentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sku<T extends ProductSkuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductSkuDefaultArgs<ExtArgs>>): Prisma__ProductSkuClient<$Result.GetResult<Prisma.$ProductSkuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cards<T extends ShopOrder$cardsArgs<ExtArgs> = {}>(args?: Subset<T, ShopOrder$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    paymentAttempts<T extends ShopOrder$paymentAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, ShopOrder$paymentAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    syncTasks<T extends ShopOrder$syncTasksArgs<ExtArgs> = {}>(args?: Subset<T, ShopOrder$syncTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShopOrder model
   */
  interface ShopOrderFieldRefs {
    readonly id: FieldRef<"ShopOrder", 'String'>
    readonly orderNo: FieldRef<"ShopOrder", 'String'>
    readonly publicToken: FieldRef<"ShopOrder", 'String'>
    readonly productId: FieldRef<"ShopOrder", 'String'>
    readonly paymentProfileId: FieldRef<"ShopOrder", 'String'>
    readonly skuId: FieldRef<"ShopOrder", 'String'>
    readonly quantity: FieldRef<"ShopOrder", 'Int'>
    readonly customerEmail: FieldRef<"ShopOrder", 'String'>
    readonly amountCents: FieldRef<"ShopOrder", 'Int'>
    readonly channelCode: FieldRef<"ShopOrder", 'String'>
    readonly status: FieldRef<"ShopOrder", 'ShopOrderStatus'>
    readonly novapayOrderId: FieldRef<"ShopOrder", 'String'>
    readonly novapayStatus: FieldRef<"ShopOrder", 'String'>
    readonly checkoutUrl: FieldRef<"ShopOrder", 'String'>
    readonly hostedCheckoutUrl: FieldRef<"ShopOrder", 'String'>
    readonly failureMessage: FieldRef<"ShopOrder", 'String'>
    readonly expiresAt: FieldRef<"ShopOrder", 'DateTime'>
    readonly paidAt: FieldRef<"ShopOrder", 'DateTime'>
    readonly fulfilledAt: FieldRef<"ShopOrder", 'DateTime'>
    readonly lastSyncedAt: FieldRef<"ShopOrder", 'DateTime'>
    readonly lastNovaCreateResponse: FieldRef<"ShopOrder", 'String'>
    readonly lastNovaPayload: FieldRef<"ShopOrder", 'String'>
    readonly createdAt: FieldRef<"ShopOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"ShopOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShopOrder findUnique
   */
  export type ShopOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * Filter, which ShopOrder to fetch.
     */
    where: ShopOrderWhereUniqueInput
  }

  /**
   * ShopOrder findUniqueOrThrow
   */
  export type ShopOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * Filter, which ShopOrder to fetch.
     */
    where: ShopOrderWhereUniqueInput
  }

  /**
   * ShopOrder findFirst
   */
  export type ShopOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * Filter, which ShopOrder to fetch.
     */
    where?: ShopOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopOrders to fetch.
     */
    orderBy?: ShopOrderOrderByWithRelationInput | ShopOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopOrders.
     */
    cursor?: ShopOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopOrders.
     */
    distinct?: ShopOrderScalarFieldEnum | ShopOrderScalarFieldEnum[]
  }

  /**
   * ShopOrder findFirstOrThrow
   */
  export type ShopOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * Filter, which ShopOrder to fetch.
     */
    where?: ShopOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopOrders to fetch.
     */
    orderBy?: ShopOrderOrderByWithRelationInput | ShopOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopOrders.
     */
    cursor?: ShopOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopOrders.
     */
    distinct?: ShopOrderScalarFieldEnum | ShopOrderScalarFieldEnum[]
  }

  /**
   * ShopOrder findMany
   */
  export type ShopOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * Filter, which ShopOrders to fetch.
     */
    where?: ShopOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopOrders to fetch.
     */
    orderBy?: ShopOrderOrderByWithRelationInput | ShopOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopOrders.
     */
    cursor?: ShopOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopOrders.
     */
    distinct?: ShopOrderScalarFieldEnum | ShopOrderScalarFieldEnum[]
  }

  /**
   * ShopOrder create
   */
  export type ShopOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a ShopOrder.
     */
    data: XOR<ShopOrderCreateInput, ShopOrderUncheckedCreateInput>
  }

  /**
   * ShopOrder createMany
   */
  export type ShopOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopOrders.
     */
    data: ShopOrderCreateManyInput | ShopOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopOrder createManyAndReturn
   */
  export type ShopOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * The data used to create many ShopOrders.
     */
    data: ShopOrderCreateManyInput | ShopOrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShopOrder update
   */
  export type ShopOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a ShopOrder.
     */
    data: XOR<ShopOrderUpdateInput, ShopOrderUncheckedUpdateInput>
    /**
     * Choose, which ShopOrder to update.
     */
    where: ShopOrderWhereUniqueInput
  }

  /**
   * ShopOrder updateMany
   */
  export type ShopOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopOrders.
     */
    data: XOR<ShopOrderUpdateManyMutationInput, ShopOrderUncheckedUpdateManyInput>
    /**
     * Filter which ShopOrders to update
     */
    where?: ShopOrderWhereInput
    /**
     * Limit how many ShopOrders to update.
     */
    limit?: number
  }

  /**
   * ShopOrder updateManyAndReturn
   */
  export type ShopOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * The data used to update ShopOrders.
     */
    data: XOR<ShopOrderUpdateManyMutationInput, ShopOrderUncheckedUpdateManyInput>
    /**
     * Filter which ShopOrders to update
     */
    where?: ShopOrderWhereInput
    /**
     * Limit how many ShopOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShopOrder upsert
   */
  export type ShopOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the ShopOrder to update in case it exists.
     */
    where: ShopOrderWhereUniqueInput
    /**
     * In case the ShopOrder found by the `where` argument doesn't exist, create a new ShopOrder with this data.
     */
    create: XOR<ShopOrderCreateInput, ShopOrderUncheckedCreateInput>
    /**
     * In case the ShopOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopOrderUpdateInput, ShopOrderUncheckedUpdateInput>
  }

  /**
   * ShopOrder delete
   */
  export type ShopOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    /**
     * Filter which ShopOrder to delete.
     */
    where: ShopOrderWhereUniqueInput
  }

  /**
   * ShopOrder deleteMany
   */
  export type ShopOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopOrders to delete
     */
    where?: ShopOrderWhereInput
    /**
     * Limit how many ShopOrders to delete.
     */
    limit?: number
  }

  /**
   * ShopOrder.paymentProfile
   */
  export type ShopOrder$paymentProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentProfile
     */
    select?: PaymentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentProfile
     */
    omit?: PaymentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentProfileInclude<ExtArgs> | null
    where?: PaymentProfileWhereInput
  }

  /**
   * ShopOrder.cards
   */
  export type ShopOrder$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardItem
     */
    select?: CardItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardItem
     */
    omit?: CardItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardItemInclude<ExtArgs> | null
    where?: CardItemWhereInput
    orderBy?: CardItemOrderByWithRelationInput | CardItemOrderByWithRelationInput[]
    cursor?: CardItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardItemScalarFieldEnum | CardItemScalarFieldEnum[]
  }

  /**
   * ShopOrder.paymentAttempts
   */
  export type ShopOrder$paymentAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    where?: ShopPaymentAttemptWhereInput
    orderBy?: ShopPaymentAttemptOrderByWithRelationInput | ShopPaymentAttemptOrderByWithRelationInput[]
    cursor?: ShopPaymentAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShopPaymentAttemptScalarFieldEnum | ShopPaymentAttemptScalarFieldEnum[]
  }

  /**
   * ShopOrder.syncTasks
   */
  export type ShopOrder$syncTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    where?: OrderSyncTaskWhereInput
    orderBy?: OrderSyncTaskOrderByWithRelationInput | OrderSyncTaskOrderByWithRelationInput[]
    cursor?: OrderSyncTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderSyncTaskScalarFieldEnum | OrderSyncTaskScalarFieldEnum[]
  }

  /**
   * ShopOrder without action
   */
  export type ShopOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
  }


  /**
   * Model ShopPaymentAttempt
   */

  export type AggregateShopPaymentAttempt = {
    _count: ShopPaymentAttemptCountAggregateOutputType | null
    _avg: ShopPaymentAttemptAvgAggregateOutputType | null
    _sum: ShopPaymentAttemptSumAggregateOutputType | null
    _min: ShopPaymentAttemptMinAggregateOutputType | null
    _max: ShopPaymentAttemptMaxAggregateOutputType | null
  }

  export type ShopPaymentAttemptAvgAggregateOutputType = {
    amountCents: number | null
  }

  export type ShopPaymentAttemptSumAggregateOutputType = {
    amountCents: number | null
  }

  export type ShopPaymentAttemptMinAggregateOutputType = {
    id: string | null
    shopOrderId: string | null
    externalOrderId: string | null
    novapayOrderId: string | null
    merchantChannelAccountId: string | null
    channelCode: string | null
    amountCents: number | null
    status: $Enums.PaymentAttemptStatus | null
    checkoutUrl: string | null
    hostedCheckoutUrl: string | null
    expiresAt: Date | null
    callbackEventId: string | null
    traceId: string | null
    createRequestPayload: string | null
    createResponsePayload: string | null
    lastRemotePayload: string | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopPaymentAttemptMaxAggregateOutputType = {
    id: string | null
    shopOrderId: string | null
    externalOrderId: string | null
    novapayOrderId: string | null
    merchantChannelAccountId: string | null
    channelCode: string | null
    amountCents: number | null
    status: $Enums.PaymentAttemptStatus | null
    checkoutUrl: string | null
    hostedCheckoutUrl: string | null
    expiresAt: Date | null
    callbackEventId: string | null
    traceId: string | null
    createRequestPayload: string | null
    createResponsePayload: string | null
    lastRemotePayload: string | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopPaymentAttemptCountAggregateOutputType = {
    id: number
    shopOrderId: number
    externalOrderId: number
    novapayOrderId: number
    merchantChannelAccountId: number
    channelCode: number
    amountCents: number
    status: number
    checkoutUrl: number
    hostedCheckoutUrl: number
    expiresAt: number
    callbackEventId: number
    traceId: number
    createRequestPayload: number
    createResponsePayload: number
    lastRemotePayload: number
    lastSyncedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopPaymentAttemptAvgAggregateInputType = {
    amountCents?: true
  }

  export type ShopPaymentAttemptSumAggregateInputType = {
    amountCents?: true
  }

  export type ShopPaymentAttemptMinAggregateInputType = {
    id?: true
    shopOrderId?: true
    externalOrderId?: true
    novapayOrderId?: true
    merchantChannelAccountId?: true
    channelCode?: true
    amountCents?: true
    status?: true
    checkoutUrl?: true
    hostedCheckoutUrl?: true
    expiresAt?: true
    callbackEventId?: true
    traceId?: true
    createRequestPayload?: true
    createResponsePayload?: true
    lastRemotePayload?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopPaymentAttemptMaxAggregateInputType = {
    id?: true
    shopOrderId?: true
    externalOrderId?: true
    novapayOrderId?: true
    merchantChannelAccountId?: true
    channelCode?: true
    amountCents?: true
    status?: true
    checkoutUrl?: true
    hostedCheckoutUrl?: true
    expiresAt?: true
    callbackEventId?: true
    traceId?: true
    createRequestPayload?: true
    createResponsePayload?: true
    lastRemotePayload?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopPaymentAttemptCountAggregateInputType = {
    id?: true
    shopOrderId?: true
    externalOrderId?: true
    novapayOrderId?: true
    merchantChannelAccountId?: true
    channelCode?: true
    amountCents?: true
    status?: true
    checkoutUrl?: true
    hostedCheckoutUrl?: true
    expiresAt?: true
    callbackEventId?: true
    traceId?: true
    createRequestPayload?: true
    createResponsePayload?: true
    lastRemotePayload?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopPaymentAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopPaymentAttempt to aggregate.
     */
    where?: ShopPaymentAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPaymentAttempts to fetch.
     */
    orderBy?: ShopPaymentAttemptOrderByWithRelationInput | ShopPaymentAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopPaymentAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPaymentAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPaymentAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopPaymentAttempts
    **/
    _count?: true | ShopPaymentAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShopPaymentAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShopPaymentAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopPaymentAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopPaymentAttemptMaxAggregateInputType
  }

  export type GetShopPaymentAttemptAggregateType<T extends ShopPaymentAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateShopPaymentAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopPaymentAttempt[P]>
      : GetScalarType<T[P], AggregateShopPaymentAttempt[P]>
  }




  export type ShopPaymentAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopPaymentAttemptWhereInput
    orderBy?: ShopPaymentAttemptOrderByWithAggregationInput | ShopPaymentAttemptOrderByWithAggregationInput[]
    by: ShopPaymentAttemptScalarFieldEnum[] | ShopPaymentAttemptScalarFieldEnum
    having?: ShopPaymentAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopPaymentAttemptCountAggregateInputType | true
    _avg?: ShopPaymentAttemptAvgAggregateInputType
    _sum?: ShopPaymentAttemptSumAggregateInputType
    _min?: ShopPaymentAttemptMinAggregateInputType
    _max?: ShopPaymentAttemptMaxAggregateInputType
  }

  export type ShopPaymentAttemptGroupByOutputType = {
    id: string
    shopOrderId: string
    externalOrderId: string
    novapayOrderId: string | null
    merchantChannelAccountId: string | null
    channelCode: string
    amountCents: number
    status: $Enums.PaymentAttemptStatus
    checkoutUrl: string | null
    hostedCheckoutUrl: string | null
    expiresAt: Date | null
    callbackEventId: string | null
    traceId: string
    createRequestPayload: string | null
    createResponsePayload: string | null
    lastRemotePayload: string | null
    lastSyncedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ShopPaymentAttemptCountAggregateOutputType | null
    _avg: ShopPaymentAttemptAvgAggregateOutputType | null
    _sum: ShopPaymentAttemptSumAggregateOutputType | null
    _min: ShopPaymentAttemptMinAggregateOutputType | null
    _max: ShopPaymentAttemptMaxAggregateOutputType | null
  }

  type GetShopPaymentAttemptGroupByPayload<T extends ShopPaymentAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopPaymentAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopPaymentAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopPaymentAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], ShopPaymentAttemptGroupByOutputType[P]>
        }
      >
    >


  export type ShopPaymentAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopOrderId?: boolean
    externalOrderId?: boolean
    novapayOrderId?: boolean
    merchantChannelAccountId?: boolean
    channelCode?: boolean
    amountCents?: boolean
    status?: boolean
    checkoutUrl?: boolean
    hostedCheckoutUrl?: boolean
    expiresAt?: boolean
    callbackEventId?: boolean
    traceId?: boolean
    createRequestPayload?: boolean
    createResponsePayload?: boolean
    lastRemotePayload?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shopOrder?: boolean | ShopOrderDefaultArgs<ExtArgs>
    syncTasks?: boolean | ShopPaymentAttempt$syncTasksArgs<ExtArgs>
    _count?: boolean | ShopPaymentAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopPaymentAttempt"]>

  export type ShopPaymentAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopOrderId?: boolean
    externalOrderId?: boolean
    novapayOrderId?: boolean
    merchantChannelAccountId?: boolean
    channelCode?: boolean
    amountCents?: boolean
    status?: boolean
    checkoutUrl?: boolean
    hostedCheckoutUrl?: boolean
    expiresAt?: boolean
    callbackEventId?: boolean
    traceId?: boolean
    createRequestPayload?: boolean
    createResponsePayload?: boolean
    lastRemotePayload?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shopOrder?: boolean | ShopOrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopPaymentAttempt"]>

  export type ShopPaymentAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopOrderId?: boolean
    externalOrderId?: boolean
    novapayOrderId?: boolean
    merchantChannelAccountId?: boolean
    channelCode?: boolean
    amountCents?: boolean
    status?: boolean
    checkoutUrl?: boolean
    hostedCheckoutUrl?: boolean
    expiresAt?: boolean
    callbackEventId?: boolean
    traceId?: boolean
    createRequestPayload?: boolean
    createResponsePayload?: boolean
    lastRemotePayload?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shopOrder?: boolean | ShopOrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopPaymentAttempt"]>

  export type ShopPaymentAttemptSelectScalar = {
    id?: boolean
    shopOrderId?: boolean
    externalOrderId?: boolean
    novapayOrderId?: boolean
    merchantChannelAccountId?: boolean
    channelCode?: boolean
    amountCents?: boolean
    status?: boolean
    checkoutUrl?: boolean
    hostedCheckoutUrl?: boolean
    expiresAt?: boolean
    callbackEventId?: boolean
    traceId?: boolean
    createRequestPayload?: boolean
    createResponsePayload?: boolean
    lastRemotePayload?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShopPaymentAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopOrderId" | "externalOrderId" | "novapayOrderId" | "merchantChannelAccountId" | "channelCode" | "amountCents" | "status" | "checkoutUrl" | "hostedCheckoutUrl" | "expiresAt" | "callbackEventId" | "traceId" | "createRequestPayload" | "createResponsePayload" | "lastRemotePayload" | "lastSyncedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["shopPaymentAttempt"]>
  export type ShopPaymentAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shopOrder?: boolean | ShopOrderDefaultArgs<ExtArgs>
    syncTasks?: boolean | ShopPaymentAttempt$syncTasksArgs<ExtArgs>
    _count?: boolean | ShopPaymentAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShopPaymentAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shopOrder?: boolean | ShopOrderDefaultArgs<ExtArgs>
  }
  export type ShopPaymentAttemptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shopOrder?: boolean | ShopOrderDefaultArgs<ExtArgs>
  }

  export type $ShopPaymentAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopPaymentAttempt"
    objects: {
      shopOrder: Prisma.$ShopOrderPayload<ExtArgs>
      syncTasks: Prisma.$OrderSyncTaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopOrderId: string
      externalOrderId: string
      novapayOrderId: string | null
      merchantChannelAccountId: string | null
      channelCode: string
      amountCents: number
      status: $Enums.PaymentAttemptStatus
      checkoutUrl: string | null
      hostedCheckoutUrl: string | null
      expiresAt: Date | null
      callbackEventId: string | null
      traceId: string
      createRequestPayload: string | null
      createResponsePayload: string | null
      lastRemotePayload: string | null
      lastSyncedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shopPaymentAttempt"]>
    composites: {}
  }

  type ShopPaymentAttemptGetPayload<S extends boolean | null | undefined | ShopPaymentAttemptDefaultArgs> = $Result.GetResult<Prisma.$ShopPaymentAttemptPayload, S>

  type ShopPaymentAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShopPaymentAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShopPaymentAttemptCountAggregateInputType | true
    }

  export interface ShopPaymentAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopPaymentAttempt'], meta: { name: 'ShopPaymentAttempt' } }
    /**
     * Find zero or one ShopPaymentAttempt that matches the filter.
     * @param {ShopPaymentAttemptFindUniqueArgs} args - Arguments to find a ShopPaymentAttempt
     * @example
     * // Get one ShopPaymentAttempt
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopPaymentAttemptFindUniqueArgs>(args: SelectSubset<T, ShopPaymentAttemptFindUniqueArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ShopPaymentAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopPaymentAttemptFindUniqueOrThrowArgs} args - Arguments to find a ShopPaymentAttempt
     * @example
     * // Get one ShopPaymentAttempt
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopPaymentAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopPaymentAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopPaymentAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPaymentAttemptFindFirstArgs} args - Arguments to find a ShopPaymentAttempt
     * @example
     * // Get one ShopPaymentAttempt
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopPaymentAttemptFindFirstArgs>(args?: SelectSubset<T, ShopPaymentAttemptFindFirstArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShopPaymentAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPaymentAttemptFindFirstOrThrowArgs} args - Arguments to find a ShopPaymentAttempt
     * @example
     * // Get one ShopPaymentAttempt
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopPaymentAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopPaymentAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ShopPaymentAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPaymentAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopPaymentAttempts
     * const shopPaymentAttempts = await prisma.shopPaymentAttempt.findMany()
     * 
     * // Get first 10 ShopPaymentAttempts
     * const shopPaymentAttempts = await prisma.shopPaymentAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopPaymentAttemptWithIdOnly = await prisma.shopPaymentAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopPaymentAttemptFindManyArgs>(args?: SelectSubset<T, ShopPaymentAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ShopPaymentAttempt.
     * @param {ShopPaymentAttemptCreateArgs} args - Arguments to create a ShopPaymentAttempt.
     * @example
     * // Create one ShopPaymentAttempt
     * const ShopPaymentAttempt = await prisma.shopPaymentAttempt.create({
     *   data: {
     *     // ... data to create a ShopPaymentAttempt
     *   }
     * })
     * 
     */
    create<T extends ShopPaymentAttemptCreateArgs>(args: SelectSubset<T, ShopPaymentAttemptCreateArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ShopPaymentAttempts.
     * @param {ShopPaymentAttemptCreateManyArgs} args - Arguments to create many ShopPaymentAttempts.
     * @example
     * // Create many ShopPaymentAttempts
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopPaymentAttemptCreateManyArgs>(args?: SelectSubset<T, ShopPaymentAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShopPaymentAttempts and returns the data saved in the database.
     * @param {ShopPaymentAttemptCreateManyAndReturnArgs} args - Arguments to create many ShopPaymentAttempts.
     * @example
     * // Create many ShopPaymentAttempts
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShopPaymentAttempts and only return the `id`
     * const shopPaymentAttemptWithIdOnly = await prisma.shopPaymentAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopPaymentAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopPaymentAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ShopPaymentAttempt.
     * @param {ShopPaymentAttemptDeleteArgs} args - Arguments to delete one ShopPaymentAttempt.
     * @example
     * // Delete one ShopPaymentAttempt
     * const ShopPaymentAttempt = await prisma.shopPaymentAttempt.delete({
     *   where: {
     *     // ... filter to delete one ShopPaymentAttempt
     *   }
     * })
     * 
     */
    delete<T extends ShopPaymentAttemptDeleteArgs>(args: SelectSubset<T, ShopPaymentAttemptDeleteArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ShopPaymentAttempt.
     * @param {ShopPaymentAttemptUpdateArgs} args - Arguments to update one ShopPaymentAttempt.
     * @example
     * // Update one ShopPaymentAttempt
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopPaymentAttemptUpdateArgs>(args: SelectSubset<T, ShopPaymentAttemptUpdateArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ShopPaymentAttempts.
     * @param {ShopPaymentAttemptDeleteManyArgs} args - Arguments to filter ShopPaymentAttempts to delete.
     * @example
     * // Delete a few ShopPaymentAttempts
     * const { count } = await prisma.shopPaymentAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopPaymentAttemptDeleteManyArgs>(args?: SelectSubset<T, ShopPaymentAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopPaymentAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPaymentAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopPaymentAttempts
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopPaymentAttemptUpdateManyArgs>(args: SelectSubset<T, ShopPaymentAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopPaymentAttempts and returns the data updated in the database.
     * @param {ShopPaymentAttemptUpdateManyAndReturnArgs} args - Arguments to update many ShopPaymentAttempts.
     * @example
     * // Update many ShopPaymentAttempts
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ShopPaymentAttempts and only return the `id`
     * const shopPaymentAttemptWithIdOnly = await prisma.shopPaymentAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShopPaymentAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, ShopPaymentAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ShopPaymentAttempt.
     * @param {ShopPaymentAttemptUpsertArgs} args - Arguments to update or create a ShopPaymentAttempt.
     * @example
     * // Update or create a ShopPaymentAttempt
     * const shopPaymentAttempt = await prisma.shopPaymentAttempt.upsert({
     *   create: {
     *     // ... data to create a ShopPaymentAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopPaymentAttempt we want to update
     *   }
     * })
     */
    upsert<T extends ShopPaymentAttemptUpsertArgs>(args: SelectSubset<T, ShopPaymentAttemptUpsertArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ShopPaymentAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPaymentAttemptCountArgs} args - Arguments to filter ShopPaymentAttempts to count.
     * @example
     * // Count the number of ShopPaymentAttempts
     * const count = await prisma.shopPaymentAttempt.count({
     *   where: {
     *     // ... the filter for the ShopPaymentAttempts we want to count
     *   }
     * })
    **/
    count<T extends ShopPaymentAttemptCountArgs>(
      args?: Subset<T, ShopPaymentAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopPaymentAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopPaymentAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPaymentAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopPaymentAttemptAggregateArgs>(args: Subset<T, ShopPaymentAttemptAggregateArgs>): Prisma.PrismaPromise<GetShopPaymentAttemptAggregateType<T>>

    /**
     * Group by ShopPaymentAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPaymentAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopPaymentAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopPaymentAttemptGroupByArgs['orderBy'] }
        : { orderBy?: ShopPaymentAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopPaymentAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopPaymentAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopPaymentAttempt model
   */
  readonly fields: ShopPaymentAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopPaymentAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopPaymentAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shopOrder<T extends ShopOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopOrderDefaultArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    syncTasks<T extends ShopPaymentAttempt$syncTasksArgs<ExtArgs> = {}>(args?: Subset<T, ShopPaymentAttempt$syncTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShopPaymentAttempt model
   */
  interface ShopPaymentAttemptFieldRefs {
    readonly id: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly shopOrderId: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly externalOrderId: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly novapayOrderId: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly merchantChannelAccountId: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly channelCode: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly amountCents: FieldRef<"ShopPaymentAttempt", 'Int'>
    readonly status: FieldRef<"ShopPaymentAttempt", 'PaymentAttemptStatus'>
    readonly checkoutUrl: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly hostedCheckoutUrl: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly expiresAt: FieldRef<"ShopPaymentAttempt", 'DateTime'>
    readonly callbackEventId: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly traceId: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly createRequestPayload: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly createResponsePayload: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly lastRemotePayload: FieldRef<"ShopPaymentAttempt", 'String'>
    readonly lastSyncedAt: FieldRef<"ShopPaymentAttempt", 'DateTime'>
    readonly createdAt: FieldRef<"ShopPaymentAttempt", 'DateTime'>
    readonly updatedAt: FieldRef<"ShopPaymentAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShopPaymentAttempt findUnique
   */
  export type ShopPaymentAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ShopPaymentAttempt to fetch.
     */
    where: ShopPaymentAttemptWhereUniqueInput
  }

  /**
   * ShopPaymentAttempt findUniqueOrThrow
   */
  export type ShopPaymentAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ShopPaymentAttempt to fetch.
     */
    where: ShopPaymentAttemptWhereUniqueInput
  }

  /**
   * ShopPaymentAttempt findFirst
   */
  export type ShopPaymentAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ShopPaymentAttempt to fetch.
     */
    where?: ShopPaymentAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPaymentAttempts to fetch.
     */
    orderBy?: ShopPaymentAttemptOrderByWithRelationInput | ShopPaymentAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopPaymentAttempts.
     */
    cursor?: ShopPaymentAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPaymentAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPaymentAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopPaymentAttempts.
     */
    distinct?: ShopPaymentAttemptScalarFieldEnum | ShopPaymentAttemptScalarFieldEnum[]
  }

  /**
   * ShopPaymentAttempt findFirstOrThrow
   */
  export type ShopPaymentAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ShopPaymentAttempt to fetch.
     */
    where?: ShopPaymentAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPaymentAttempts to fetch.
     */
    orderBy?: ShopPaymentAttemptOrderByWithRelationInput | ShopPaymentAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopPaymentAttempts.
     */
    cursor?: ShopPaymentAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPaymentAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPaymentAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopPaymentAttempts.
     */
    distinct?: ShopPaymentAttemptScalarFieldEnum | ShopPaymentAttemptScalarFieldEnum[]
  }

  /**
   * ShopPaymentAttempt findMany
   */
  export type ShopPaymentAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * Filter, which ShopPaymentAttempts to fetch.
     */
    where?: ShopPaymentAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPaymentAttempts to fetch.
     */
    orderBy?: ShopPaymentAttemptOrderByWithRelationInput | ShopPaymentAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopPaymentAttempts.
     */
    cursor?: ShopPaymentAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPaymentAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPaymentAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopPaymentAttempts.
     */
    distinct?: ShopPaymentAttemptScalarFieldEnum | ShopPaymentAttemptScalarFieldEnum[]
  }

  /**
   * ShopPaymentAttempt create
   */
  export type ShopPaymentAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a ShopPaymentAttempt.
     */
    data: XOR<ShopPaymentAttemptCreateInput, ShopPaymentAttemptUncheckedCreateInput>
  }

  /**
   * ShopPaymentAttempt createMany
   */
  export type ShopPaymentAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopPaymentAttempts.
     */
    data: ShopPaymentAttemptCreateManyInput | ShopPaymentAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopPaymentAttempt createManyAndReturn
   */
  export type ShopPaymentAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many ShopPaymentAttempts.
     */
    data: ShopPaymentAttemptCreateManyInput | ShopPaymentAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShopPaymentAttempt update
   */
  export type ShopPaymentAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a ShopPaymentAttempt.
     */
    data: XOR<ShopPaymentAttemptUpdateInput, ShopPaymentAttemptUncheckedUpdateInput>
    /**
     * Choose, which ShopPaymentAttempt to update.
     */
    where: ShopPaymentAttemptWhereUniqueInput
  }

  /**
   * ShopPaymentAttempt updateMany
   */
  export type ShopPaymentAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopPaymentAttempts.
     */
    data: XOR<ShopPaymentAttemptUpdateManyMutationInput, ShopPaymentAttemptUncheckedUpdateManyInput>
    /**
     * Filter which ShopPaymentAttempts to update
     */
    where?: ShopPaymentAttemptWhereInput
    /**
     * Limit how many ShopPaymentAttempts to update.
     */
    limit?: number
  }

  /**
   * ShopPaymentAttempt updateManyAndReturn
   */
  export type ShopPaymentAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * The data used to update ShopPaymentAttempts.
     */
    data: XOR<ShopPaymentAttemptUpdateManyMutationInput, ShopPaymentAttemptUncheckedUpdateManyInput>
    /**
     * Filter which ShopPaymentAttempts to update
     */
    where?: ShopPaymentAttemptWhereInput
    /**
     * Limit how many ShopPaymentAttempts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShopPaymentAttempt upsert
   */
  export type ShopPaymentAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the ShopPaymentAttempt to update in case it exists.
     */
    where: ShopPaymentAttemptWhereUniqueInput
    /**
     * In case the ShopPaymentAttempt found by the `where` argument doesn't exist, create a new ShopPaymentAttempt with this data.
     */
    create: XOR<ShopPaymentAttemptCreateInput, ShopPaymentAttemptUncheckedCreateInput>
    /**
     * In case the ShopPaymentAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopPaymentAttemptUpdateInput, ShopPaymentAttemptUncheckedUpdateInput>
  }

  /**
   * ShopPaymentAttempt delete
   */
  export type ShopPaymentAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    /**
     * Filter which ShopPaymentAttempt to delete.
     */
    where: ShopPaymentAttemptWhereUniqueInput
  }

  /**
   * ShopPaymentAttempt deleteMany
   */
  export type ShopPaymentAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopPaymentAttempts to delete
     */
    where?: ShopPaymentAttemptWhereInput
    /**
     * Limit how many ShopPaymentAttempts to delete.
     */
    limit?: number
  }

  /**
   * ShopPaymentAttempt.syncTasks
   */
  export type ShopPaymentAttempt$syncTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    where?: OrderSyncTaskWhereInput
    orderBy?: OrderSyncTaskOrderByWithRelationInput | OrderSyncTaskOrderByWithRelationInput[]
    cursor?: OrderSyncTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderSyncTaskScalarFieldEnum | OrderSyncTaskScalarFieldEnum[]
  }

  /**
   * ShopPaymentAttempt without action
   */
  export type ShopPaymentAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
  }


  /**
   * Model WebhookEventLog
   */

  export type AggregateWebhookEventLog = {
    _count: WebhookEventLogCountAggregateOutputType | null
    _min: WebhookEventLogMinAggregateOutputType | null
    _max: WebhookEventLogMaxAggregateOutputType | null
  }

  export type WebhookEventLogMinAggregateOutputType = {
    id: string | null
    provider: string | null
    externalEventId: string | null
    externalOrderId: string | null
    eventType: string | null
    traceId: string | null
    signatureValid: boolean | null
    requestHeaders: string | null
    requestBody: string | null
    processingStatus: string | null
    processingError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookEventLogMaxAggregateOutputType = {
    id: string | null
    provider: string | null
    externalEventId: string | null
    externalOrderId: string | null
    eventType: string | null
    traceId: string | null
    signatureValid: boolean | null
    requestHeaders: string | null
    requestBody: string | null
    processingStatus: string | null
    processingError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookEventLogCountAggregateOutputType = {
    id: number
    provider: number
    externalEventId: number
    externalOrderId: number
    eventType: number
    traceId: number
    signatureValid: number
    requestHeaders: number
    requestBody: number
    processingStatus: number
    processingError: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WebhookEventLogMinAggregateInputType = {
    id?: true
    provider?: true
    externalEventId?: true
    externalOrderId?: true
    eventType?: true
    traceId?: true
    signatureValid?: true
    requestHeaders?: true
    requestBody?: true
    processingStatus?: true
    processingError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookEventLogMaxAggregateInputType = {
    id?: true
    provider?: true
    externalEventId?: true
    externalOrderId?: true
    eventType?: true
    traceId?: true
    signatureValid?: true
    requestHeaders?: true
    requestBody?: true
    processingStatus?: true
    processingError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookEventLogCountAggregateInputType = {
    id?: true
    provider?: true
    externalEventId?: true
    externalOrderId?: true
    eventType?: true
    traceId?: true
    signatureValid?: true
    requestHeaders?: true
    requestBody?: true
    processingStatus?: true
    processingError?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WebhookEventLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEventLog to aggregate.
     */
    where?: WebhookEventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEventLogs to fetch.
     */
    orderBy?: WebhookEventLogOrderByWithRelationInput | WebhookEventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEventLogs
    **/
    _count?: true | WebhookEventLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEventLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEventLogMaxAggregateInputType
  }

  export type GetWebhookEventLogAggregateType<T extends WebhookEventLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEventLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEventLog[P]>
      : GetScalarType<T[P], AggregateWebhookEventLog[P]>
  }




  export type WebhookEventLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEventLogWhereInput
    orderBy?: WebhookEventLogOrderByWithAggregationInput | WebhookEventLogOrderByWithAggregationInput[]
    by: WebhookEventLogScalarFieldEnum[] | WebhookEventLogScalarFieldEnum
    having?: WebhookEventLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEventLogCountAggregateInputType | true
    _min?: WebhookEventLogMinAggregateInputType
    _max?: WebhookEventLogMaxAggregateInputType
  }

  export type WebhookEventLogGroupByOutputType = {
    id: string
    provider: string
    externalEventId: string
    externalOrderId: string | null
    eventType: string
    traceId: string | null
    signatureValid: boolean
    requestHeaders: string | null
    requestBody: string
    processingStatus: string
    processingError: string | null
    createdAt: Date
    updatedAt: Date
    _count: WebhookEventLogCountAggregateOutputType | null
    _min: WebhookEventLogMinAggregateOutputType | null
    _max: WebhookEventLogMaxAggregateOutputType | null
  }

  type GetWebhookEventLogGroupByPayload<T extends WebhookEventLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEventLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEventLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEventLogGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEventLogGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEventLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    externalEventId?: boolean
    externalOrderId?: boolean
    eventType?: boolean
    traceId?: boolean
    signatureValid?: boolean
    requestHeaders?: boolean
    requestBody?: boolean
    processingStatus?: boolean
    processingError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webhookEventLog"]>

  export type WebhookEventLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    externalEventId?: boolean
    externalOrderId?: boolean
    eventType?: boolean
    traceId?: boolean
    signatureValid?: boolean
    requestHeaders?: boolean
    requestBody?: boolean
    processingStatus?: boolean
    processingError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webhookEventLog"]>

  export type WebhookEventLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    externalEventId?: boolean
    externalOrderId?: boolean
    eventType?: boolean
    traceId?: boolean
    signatureValid?: boolean
    requestHeaders?: boolean
    requestBody?: boolean
    processingStatus?: boolean
    processingError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webhookEventLog"]>

  export type WebhookEventLogSelectScalar = {
    id?: boolean
    provider?: boolean
    externalEventId?: boolean
    externalOrderId?: boolean
    eventType?: boolean
    traceId?: boolean
    signatureValid?: boolean
    requestHeaders?: boolean
    requestBody?: boolean
    processingStatus?: boolean
    processingError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WebhookEventLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "externalEventId" | "externalOrderId" | "eventType" | "traceId" | "signatureValid" | "requestHeaders" | "requestBody" | "processingStatus" | "processingError" | "createdAt" | "updatedAt", ExtArgs["result"]["webhookEventLog"]>

  export type $WebhookEventLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEventLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: string
      externalEventId: string
      externalOrderId: string | null
      eventType: string
      traceId: string | null
      signatureValid: boolean
      requestHeaders: string | null
      requestBody: string
      processingStatus: string
      processingError: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["webhookEventLog"]>
    composites: {}
  }

  type WebhookEventLogGetPayload<S extends boolean | null | undefined | WebhookEventLogDefaultArgs> = $Result.GetResult<Prisma.$WebhookEventLogPayload, S>

  type WebhookEventLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookEventLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookEventLogCountAggregateInputType | true
    }

  export interface WebhookEventLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEventLog'], meta: { name: 'WebhookEventLog' } }
    /**
     * Find zero or one WebhookEventLog that matches the filter.
     * @param {WebhookEventLogFindUniqueArgs} args - Arguments to find a WebhookEventLog
     * @example
     * // Get one WebhookEventLog
     * const webhookEventLog = await prisma.webhookEventLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEventLogFindUniqueArgs>(args: SelectSubset<T, WebhookEventLogFindUniqueArgs<ExtArgs>>): Prisma__WebhookEventLogClient<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookEventLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEventLogFindUniqueOrThrowArgs} args - Arguments to find a WebhookEventLog
     * @example
     * // Get one WebhookEventLog
     * const webhookEventLog = await prisma.webhookEventLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEventLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEventLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEventLogClient<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEventLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventLogFindFirstArgs} args - Arguments to find a WebhookEventLog
     * @example
     * // Get one WebhookEventLog
     * const webhookEventLog = await prisma.webhookEventLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEventLogFindFirstArgs>(args?: SelectSubset<T, WebhookEventLogFindFirstArgs<ExtArgs>>): Prisma__WebhookEventLogClient<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEventLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventLogFindFirstOrThrowArgs} args - Arguments to find a WebhookEventLog
     * @example
     * // Get one WebhookEventLog
     * const webhookEventLog = await prisma.webhookEventLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEventLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEventLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEventLogClient<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookEventLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEventLogs
     * const webhookEventLogs = await prisma.webhookEventLog.findMany()
     * 
     * // Get first 10 WebhookEventLogs
     * const webhookEventLogs = await prisma.webhookEventLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEventLogWithIdOnly = await prisma.webhookEventLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEventLogFindManyArgs>(args?: SelectSubset<T, WebhookEventLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookEventLog.
     * @param {WebhookEventLogCreateArgs} args - Arguments to create a WebhookEventLog.
     * @example
     * // Create one WebhookEventLog
     * const WebhookEventLog = await prisma.webhookEventLog.create({
     *   data: {
     *     // ... data to create a WebhookEventLog
     *   }
     * })
     * 
     */
    create<T extends WebhookEventLogCreateArgs>(args: SelectSubset<T, WebhookEventLogCreateArgs<ExtArgs>>): Prisma__WebhookEventLogClient<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookEventLogs.
     * @param {WebhookEventLogCreateManyArgs} args - Arguments to create many WebhookEventLogs.
     * @example
     * // Create many WebhookEventLogs
     * const webhookEventLog = await prisma.webhookEventLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEventLogCreateManyArgs>(args?: SelectSubset<T, WebhookEventLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEventLogs and returns the data saved in the database.
     * @param {WebhookEventLogCreateManyAndReturnArgs} args - Arguments to create many WebhookEventLogs.
     * @example
     * // Create many WebhookEventLogs
     * const webhookEventLog = await prisma.webhookEventLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEventLogs and only return the `id`
     * const webhookEventLogWithIdOnly = await prisma.webhookEventLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEventLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEventLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookEventLog.
     * @param {WebhookEventLogDeleteArgs} args - Arguments to delete one WebhookEventLog.
     * @example
     * // Delete one WebhookEventLog
     * const WebhookEventLog = await prisma.webhookEventLog.delete({
     *   where: {
     *     // ... filter to delete one WebhookEventLog
     *   }
     * })
     * 
     */
    delete<T extends WebhookEventLogDeleteArgs>(args: SelectSubset<T, WebhookEventLogDeleteArgs<ExtArgs>>): Prisma__WebhookEventLogClient<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookEventLog.
     * @param {WebhookEventLogUpdateArgs} args - Arguments to update one WebhookEventLog.
     * @example
     * // Update one WebhookEventLog
     * const webhookEventLog = await prisma.webhookEventLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEventLogUpdateArgs>(args: SelectSubset<T, WebhookEventLogUpdateArgs<ExtArgs>>): Prisma__WebhookEventLogClient<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookEventLogs.
     * @param {WebhookEventLogDeleteManyArgs} args - Arguments to filter WebhookEventLogs to delete.
     * @example
     * // Delete a few WebhookEventLogs
     * const { count } = await prisma.webhookEventLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEventLogDeleteManyArgs>(args?: SelectSubset<T, WebhookEventLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEventLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEventLogs
     * const webhookEventLog = await prisma.webhookEventLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEventLogUpdateManyArgs>(args: SelectSubset<T, WebhookEventLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEventLogs and returns the data updated in the database.
     * @param {WebhookEventLogUpdateManyAndReturnArgs} args - Arguments to update many WebhookEventLogs.
     * @example
     * // Update many WebhookEventLogs
     * const webhookEventLog = await prisma.webhookEventLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookEventLogs and only return the `id`
     * const webhookEventLogWithIdOnly = await prisma.webhookEventLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookEventLogUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookEventLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookEventLog.
     * @param {WebhookEventLogUpsertArgs} args - Arguments to update or create a WebhookEventLog.
     * @example
     * // Update or create a WebhookEventLog
     * const webhookEventLog = await prisma.webhookEventLog.upsert({
     *   create: {
     *     // ... data to create a WebhookEventLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEventLog we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEventLogUpsertArgs>(args: SelectSubset<T, WebhookEventLogUpsertArgs<ExtArgs>>): Prisma__WebhookEventLogClient<$Result.GetResult<Prisma.$WebhookEventLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookEventLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventLogCountArgs} args - Arguments to filter WebhookEventLogs to count.
     * @example
     * // Count the number of WebhookEventLogs
     * const count = await prisma.webhookEventLog.count({
     *   where: {
     *     // ... the filter for the WebhookEventLogs we want to count
     *   }
     * })
    **/
    count<T extends WebhookEventLogCountArgs>(
      args?: Subset<T, WebhookEventLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEventLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEventLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookEventLogAggregateArgs>(args: Subset<T, WebhookEventLogAggregateArgs>): Prisma.PrismaPromise<GetWebhookEventLogAggregateType<T>>

    /**
     * Group by WebhookEventLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookEventLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEventLogGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEventLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookEventLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEventLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEventLog model
   */
  readonly fields: WebhookEventLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEventLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEventLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEventLog model
   */
  interface WebhookEventLogFieldRefs {
    readonly id: FieldRef<"WebhookEventLog", 'String'>
    readonly provider: FieldRef<"WebhookEventLog", 'String'>
    readonly externalEventId: FieldRef<"WebhookEventLog", 'String'>
    readonly externalOrderId: FieldRef<"WebhookEventLog", 'String'>
    readonly eventType: FieldRef<"WebhookEventLog", 'String'>
    readonly traceId: FieldRef<"WebhookEventLog", 'String'>
    readonly signatureValid: FieldRef<"WebhookEventLog", 'Boolean'>
    readonly requestHeaders: FieldRef<"WebhookEventLog", 'String'>
    readonly requestBody: FieldRef<"WebhookEventLog", 'String'>
    readonly processingStatus: FieldRef<"WebhookEventLog", 'String'>
    readonly processingError: FieldRef<"WebhookEventLog", 'String'>
    readonly createdAt: FieldRef<"WebhookEventLog", 'DateTime'>
    readonly updatedAt: FieldRef<"WebhookEventLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEventLog findUnique
   */
  export type WebhookEventLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEventLog to fetch.
     */
    where: WebhookEventLogWhereUniqueInput
  }

  /**
   * WebhookEventLog findUniqueOrThrow
   */
  export type WebhookEventLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEventLog to fetch.
     */
    where: WebhookEventLogWhereUniqueInput
  }

  /**
   * WebhookEventLog findFirst
   */
  export type WebhookEventLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEventLog to fetch.
     */
    where?: WebhookEventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEventLogs to fetch.
     */
    orderBy?: WebhookEventLogOrderByWithRelationInput | WebhookEventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEventLogs.
     */
    cursor?: WebhookEventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEventLogs.
     */
    distinct?: WebhookEventLogScalarFieldEnum | WebhookEventLogScalarFieldEnum[]
  }

  /**
   * WebhookEventLog findFirstOrThrow
   */
  export type WebhookEventLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEventLog to fetch.
     */
    where?: WebhookEventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEventLogs to fetch.
     */
    orderBy?: WebhookEventLogOrderByWithRelationInput | WebhookEventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEventLogs.
     */
    cursor?: WebhookEventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEventLogs.
     */
    distinct?: WebhookEventLogScalarFieldEnum | WebhookEventLogScalarFieldEnum[]
  }

  /**
   * WebhookEventLog findMany
   */
  export type WebhookEventLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEventLogs to fetch.
     */
    where?: WebhookEventLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEventLogs to fetch.
     */
    orderBy?: WebhookEventLogOrderByWithRelationInput | WebhookEventLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEventLogs.
     */
    cursor?: WebhookEventLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEventLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEventLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEventLogs.
     */
    distinct?: WebhookEventLogScalarFieldEnum | WebhookEventLogScalarFieldEnum[]
  }

  /**
   * WebhookEventLog create
   */
  export type WebhookEventLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * The data needed to create a WebhookEventLog.
     */
    data: XOR<WebhookEventLogCreateInput, WebhookEventLogUncheckedCreateInput>
  }

  /**
   * WebhookEventLog createMany
   */
  export type WebhookEventLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEventLogs.
     */
    data: WebhookEventLogCreateManyInput | WebhookEventLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEventLog createManyAndReturn
   */
  export type WebhookEventLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookEventLogs.
     */
    data: WebhookEventLogCreateManyInput | WebhookEventLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEventLog update
   */
  export type WebhookEventLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * The data needed to update a WebhookEventLog.
     */
    data: XOR<WebhookEventLogUpdateInput, WebhookEventLogUncheckedUpdateInput>
    /**
     * Choose, which WebhookEventLog to update.
     */
    where: WebhookEventLogWhereUniqueInput
  }

  /**
   * WebhookEventLog updateMany
   */
  export type WebhookEventLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEventLogs.
     */
    data: XOR<WebhookEventLogUpdateManyMutationInput, WebhookEventLogUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEventLogs to update
     */
    where?: WebhookEventLogWhereInput
    /**
     * Limit how many WebhookEventLogs to update.
     */
    limit?: number
  }

  /**
   * WebhookEventLog updateManyAndReturn
   */
  export type WebhookEventLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * The data used to update WebhookEventLogs.
     */
    data: XOR<WebhookEventLogUpdateManyMutationInput, WebhookEventLogUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEventLogs to update
     */
    where?: WebhookEventLogWhereInput
    /**
     * Limit how many WebhookEventLogs to update.
     */
    limit?: number
  }

  /**
   * WebhookEventLog upsert
   */
  export type WebhookEventLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * The filter to search for the WebhookEventLog to update in case it exists.
     */
    where: WebhookEventLogWhereUniqueInput
    /**
     * In case the WebhookEventLog found by the `where` argument doesn't exist, create a new WebhookEventLog with this data.
     */
    create: XOR<WebhookEventLogCreateInput, WebhookEventLogUncheckedCreateInput>
    /**
     * In case the WebhookEventLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEventLogUpdateInput, WebhookEventLogUncheckedUpdateInput>
  }

  /**
   * WebhookEventLog delete
   */
  export type WebhookEventLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
    /**
     * Filter which WebhookEventLog to delete.
     */
    where: WebhookEventLogWhereUniqueInput
  }

  /**
   * WebhookEventLog deleteMany
   */
  export type WebhookEventLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEventLogs to delete
     */
    where?: WebhookEventLogWhereInput
    /**
     * Limit how many WebhookEventLogs to delete.
     */
    limit?: number
  }

  /**
   * WebhookEventLog without action
   */
  export type WebhookEventLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEventLog
     */
    select?: WebhookEventLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEventLog
     */
    omit?: WebhookEventLogOmit<ExtArgs> | null
  }


  /**
   * Model OrderSyncTask
   */

  export type AggregateOrderSyncTask = {
    _count: OrderSyncTaskCountAggregateOutputType | null
    _avg: OrderSyncTaskAvgAggregateOutputType | null
    _sum: OrderSyncTaskSumAggregateOutputType | null
    _min: OrderSyncTaskMinAggregateOutputType | null
    _max: OrderSyncTaskMaxAggregateOutputType | null
  }

  export type OrderSyncTaskAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type OrderSyncTaskSumAggregateOutputType = {
    retryCount: number | null
  }

  export type OrderSyncTaskMinAggregateOutputType = {
    id: string | null
    taskType: string | null
    shopOrderId: string | null
    paymentAttemptId: string | null
    status: $Enums.SyncTaskStatus | null
    scheduledAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    retryCount: number | null
    lastError: string | null
    payload: string | null
    createdAt: Date | null
  }

  export type OrderSyncTaskMaxAggregateOutputType = {
    id: string | null
    taskType: string | null
    shopOrderId: string | null
    paymentAttemptId: string | null
    status: $Enums.SyncTaskStatus | null
    scheduledAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    retryCount: number | null
    lastError: string | null
    payload: string | null
    createdAt: Date | null
  }

  export type OrderSyncTaskCountAggregateOutputType = {
    id: number
    taskType: number
    shopOrderId: number
    paymentAttemptId: number
    status: number
    scheduledAt: number
    startedAt: number
    finishedAt: number
    retryCount: number
    lastError: number
    payload: number
    createdAt: number
    _all: number
  }


  export type OrderSyncTaskAvgAggregateInputType = {
    retryCount?: true
  }

  export type OrderSyncTaskSumAggregateInputType = {
    retryCount?: true
  }

  export type OrderSyncTaskMinAggregateInputType = {
    id?: true
    taskType?: true
    shopOrderId?: true
    paymentAttemptId?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    finishedAt?: true
    retryCount?: true
    lastError?: true
    payload?: true
    createdAt?: true
  }

  export type OrderSyncTaskMaxAggregateInputType = {
    id?: true
    taskType?: true
    shopOrderId?: true
    paymentAttemptId?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    finishedAt?: true
    retryCount?: true
    lastError?: true
    payload?: true
    createdAt?: true
  }

  export type OrderSyncTaskCountAggregateInputType = {
    id?: true
    taskType?: true
    shopOrderId?: true
    paymentAttemptId?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    finishedAt?: true
    retryCount?: true
    lastError?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type OrderSyncTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderSyncTask to aggregate.
     */
    where?: OrderSyncTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderSyncTasks to fetch.
     */
    orderBy?: OrderSyncTaskOrderByWithRelationInput | OrderSyncTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderSyncTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderSyncTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderSyncTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderSyncTasks
    **/
    _count?: true | OrderSyncTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderSyncTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSyncTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderSyncTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderSyncTaskMaxAggregateInputType
  }

  export type GetOrderSyncTaskAggregateType<T extends OrderSyncTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderSyncTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderSyncTask[P]>
      : GetScalarType<T[P], AggregateOrderSyncTask[P]>
  }




  export type OrderSyncTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderSyncTaskWhereInput
    orderBy?: OrderSyncTaskOrderByWithAggregationInput | OrderSyncTaskOrderByWithAggregationInput[]
    by: OrderSyncTaskScalarFieldEnum[] | OrderSyncTaskScalarFieldEnum
    having?: OrderSyncTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderSyncTaskCountAggregateInputType | true
    _avg?: OrderSyncTaskAvgAggregateInputType
    _sum?: OrderSyncTaskSumAggregateInputType
    _min?: OrderSyncTaskMinAggregateInputType
    _max?: OrderSyncTaskMaxAggregateInputType
  }

  export type OrderSyncTaskGroupByOutputType = {
    id: string
    taskType: string
    shopOrderId: string | null
    paymentAttemptId: string | null
    status: $Enums.SyncTaskStatus
    scheduledAt: Date
    startedAt: Date | null
    finishedAt: Date | null
    retryCount: number
    lastError: string | null
    payload: string | null
    createdAt: Date
    _count: OrderSyncTaskCountAggregateOutputType | null
    _avg: OrderSyncTaskAvgAggregateOutputType | null
    _sum: OrderSyncTaskSumAggregateOutputType | null
    _min: OrderSyncTaskMinAggregateOutputType | null
    _max: OrderSyncTaskMaxAggregateOutputType | null
  }

  type GetOrderSyncTaskGroupByPayload<T extends OrderSyncTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderSyncTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderSyncTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderSyncTaskGroupByOutputType[P]>
            : GetScalarType<T[P], OrderSyncTaskGroupByOutputType[P]>
        }
      >
    >


  export type OrderSyncTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskType?: boolean
    shopOrderId?: boolean
    paymentAttemptId?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    retryCount?: boolean
    lastError?: boolean
    payload?: boolean
    createdAt?: boolean
    shopOrder?: boolean | OrderSyncTask$shopOrderArgs<ExtArgs>
    paymentAttempt?: boolean | OrderSyncTask$paymentAttemptArgs<ExtArgs>
  }, ExtArgs["result"]["orderSyncTask"]>

  export type OrderSyncTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskType?: boolean
    shopOrderId?: boolean
    paymentAttemptId?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    retryCount?: boolean
    lastError?: boolean
    payload?: boolean
    createdAt?: boolean
    shopOrder?: boolean | OrderSyncTask$shopOrderArgs<ExtArgs>
    paymentAttempt?: boolean | OrderSyncTask$paymentAttemptArgs<ExtArgs>
  }, ExtArgs["result"]["orderSyncTask"]>

  export type OrderSyncTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskType?: boolean
    shopOrderId?: boolean
    paymentAttemptId?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    retryCount?: boolean
    lastError?: boolean
    payload?: boolean
    createdAt?: boolean
    shopOrder?: boolean | OrderSyncTask$shopOrderArgs<ExtArgs>
    paymentAttempt?: boolean | OrderSyncTask$paymentAttemptArgs<ExtArgs>
  }, ExtArgs["result"]["orderSyncTask"]>

  export type OrderSyncTaskSelectScalar = {
    id?: boolean
    taskType?: boolean
    shopOrderId?: boolean
    paymentAttemptId?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    retryCount?: boolean
    lastError?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type OrderSyncTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskType" | "shopOrderId" | "paymentAttemptId" | "status" | "scheduledAt" | "startedAt" | "finishedAt" | "retryCount" | "lastError" | "payload" | "createdAt", ExtArgs["result"]["orderSyncTask"]>
  export type OrderSyncTaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shopOrder?: boolean | OrderSyncTask$shopOrderArgs<ExtArgs>
    paymentAttempt?: boolean | OrderSyncTask$paymentAttemptArgs<ExtArgs>
  }
  export type OrderSyncTaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shopOrder?: boolean | OrderSyncTask$shopOrderArgs<ExtArgs>
    paymentAttempt?: boolean | OrderSyncTask$paymentAttemptArgs<ExtArgs>
  }
  export type OrderSyncTaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shopOrder?: boolean | OrderSyncTask$shopOrderArgs<ExtArgs>
    paymentAttempt?: boolean | OrderSyncTask$paymentAttemptArgs<ExtArgs>
  }

  export type $OrderSyncTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderSyncTask"
    objects: {
      shopOrder: Prisma.$ShopOrderPayload<ExtArgs> | null
      paymentAttempt: Prisma.$ShopPaymentAttemptPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskType: string
      shopOrderId: string | null
      paymentAttemptId: string | null
      status: $Enums.SyncTaskStatus
      scheduledAt: Date
      startedAt: Date | null
      finishedAt: Date | null
      retryCount: number
      lastError: string | null
      payload: string | null
      createdAt: Date
    }, ExtArgs["result"]["orderSyncTask"]>
    composites: {}
  }

  type OrderSyncTaskGetPayload<S extends boolean | null | undefined | OrderSyncTaskDefaultArgs> = $Result.GetResult<Prisma.$OrderSyncTaskPayload, S>

  type OrderSyncTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderSyncTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderSyncTaskCountAggregateInputType | true
    }

  export interface OrderSyncTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderSyncTask'], meta: { name: 'OrderSyncTask' } }
    /**
     * Find zero or one OrderSyncTask that matches the filter.
     * @param {OrderSyncTaskFindUniqueArgs} args - Arguments to find a OrderSyncTask
     * @example
     * // Get one OrderSyncTask
     * const orderSyncTask = await prisma.orderSyncTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderSyncTaskFindUniqueArgs>(args: SelectSubset<T, OrderSyncTaskFindUniqueArgs<ExtArgs>>): Prisma__OrderSyncTaskClient<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderSyncTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderSyncTaskFindUniqueOrThrowArgs} args - Arguments to find a OrderSyncTask
     * @example
     * // Get one OrderSyncTask
     * const orderSyncTask = await prisma.orderSyncTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderSyncTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderSyncTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderSyncTaskClient<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderSyncTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncTaskFindFirstArgs} args - Arguments to find a OrderSyncTask
     * @example
     * // Get one OrderSyncTask
     * const orderSyncTask = await prisma.orderSyncTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderSyncTaskFindFirstArgs>(args?: SelectSubset<T, OrderSyncTaskFindFirstArgs<ExtArgs>>): Prisma__OrderSyncTaskClient<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderSyncTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncTaskFindFirstOrThrowArgs} args - Arguments to find a OrderSyncTask
     * @example
     * // Get one OrderSyncTask
     * const orderSyncTask = await prisma.orderSyncTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderSyncTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderSyncTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderSyncTaskClient<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderSyncTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderSyncTasks
     * const orderSyncTasks = await prisma.orderSyncTask.findMany()
     * 
     * // Get first 10 OrderSyncTasks
     * const orderSyncTasks = await prisma.orderSyncTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderSyncTaskWithIdOnly = await prisma.orderSyncTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderSyncTaskFindManyArgs>(args?: SelectSubset<T, OrderSyncTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderSyncTask.
     * @param {OrderSyncTaskCreateArgs} args - Arguments to create a OrderSyncTask.
     * @example
     * // Create one OrderSyncTask
     * const OrderSyncTask = await prisma.orderSyncTask.create({
     *   data: {
     *     // ... data to create a OrderSyncTask
     *   }
     * })
     * 
     */
    create<T extends OrderSyncTaskCreateArgs>(args: SelectSubset<T, OrderSyncTaskCreateArgs<ExtArgs>>): Prisma__OrderSyncTaskClient<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderSyncTasks.
     * @param {OrderSyncTaskCreateManyArgs} args - Arguments to create many OrderSyncTasks.
     * @example
     * // Create many OrderSyncTasks
     * const orderSyncTask = await prisma.orderSyncTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderSyncTaskCreateManyArgs>(args?: SelectSubset<T, OrderSyncTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderSyncTasks and returns the data saved in the database.
     * @param {OrderSyncTaskCreateManyAndReturnArgs} args - Arguments to create many OrderSyncTasks.
     * @example
     * // Create many OrderSyncTasks
     * const orderSyncTask = await prisma.orderSyncTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderSyncTasks and only return the `id`
     * const orderSyncTaskWithIdOnly = await prisma.orderSyncTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderSyncTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderSyncTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderSyncTask.
     * @param {OrderSyncTaskDeleteArgs} args - Arguments to delete one OrderSyncTask.
     * @example
     * // Delete one OrderSyncTask
     * const OrderSyncTask = await prisma.orderSyncTask.delete({
     *   where: {
     *     // ... filter to delete one OrderSyncTask
     *   }
     * })
     * 
     */
    delete<T extends OrderSyncTaskDeleteArgs>(args: SelectSubset<T, OrderSyncTaskDeleteArgs<ExtArgs>>): Prisma__OrderSyncTaskClient<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderSyncTask.
     * @param {OrderSyncTaskUpdateArgs} args - Arguments to update one OrderSyncTask.
     * @example
     * // Update one OrderSyncTask
     * const orderSyncTask = await prisma.orderSyncTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderSyncTaskUpdateArgs>(args: SelectSubset<T, OrderSyncTaskUpdateArgs<ExtArgs>>): Prisma__OrderSyncTaskClient<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderSyncTasks.
     * @param {OrderSyncTaskDeleteManyArgs} args - Arguments to filter OrderSyncTasks to delete.
     * @example
     * // Delete a few OrderSyncTasks
     * const { count } = await prisma.orderSyncTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderSyncTaskDeleteManyArgs>(args?: SelectSubset<T, OrderSyncTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderSyncTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderSyncTasks
     * const orderSyncTask = await prisma.orderSyncTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderSyncTaskUpdateManyArgs>(args: SelectSubset<T, OrderSyncTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderSyncTasks and returns the data updated in the database.
     * @param {OrderSyncTaskUpdateManyAndReturnArgs} args - Arguments to update many OrderSyncTasks.
     * @example
     * // Update many OrderSyncTasks
     * const orderSyncTask = await prisma.orderSyncTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderSyncTasks and only return the `id`
     * const orderSyncTaskWithIdOnly = await prisma.orderSyncTask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderSyncTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderSyncTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderSyncTask.
     * @param {OrderSyncTaskUpsertArgs} args - Arguments to update or create a OrderSyncTask.
     * @example
     * // Update or create a OrderSyncTask
     * const orderSyncTask = await prisma.orderSyncTask.upsert({
     *   create: {
     *     // ... data to create a OrderSyncTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderSyncTask we want to update
     *   }
     * })
     */
    upsert<T extends OrderSyncTaskUpsertArgs>(args: SelectSubset<T, OrderSyncTaskUpsertArgs<ExtArgs>>): Prisma__OrderSyncTaskClient<$Result.GetResult<Prisma.$OrderSyncTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderSyncTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncTaskCountArgs} args - Arguments to filter OrderSyncTasks to count.
     * @example
     * // Count the number of OrderSyncTasks
     * const count = await prisma.orderSyncTask.count({
     *   where: {
     *     // ... the filter for the OrderSyncTasks we want to count
     *   }
     * })
    **/
    count<T extends OrderSyncTaskCountArgs>(
      args?: Subset<T, OrderSyncTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderSyncTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderSyncTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderSyncTaskAggregateArgs>(args: Subset<T, OrderSyncTaskAggregateArgs>): Prisma.PrismaPromise<GetOrderSyncTaskAggregateType<T>>

    /**
     * Group by OrderSyncTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderSyncTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderSyncTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderSyncTaskGroupByArgs['orderBy'] }
        : { orderBy?: OrderSyncTaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderSyncTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderSyncTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderSyncTask model
   */
  readonly fields: OrderSyncTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderSyncTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderSyncTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shopOrder<T extends OrderSyncTask$shopOrderArgs<ExtArgs> = {}>(args?: Subset<T, OrderSyncTask$shopOrderArgs<ExtArgs>>): Prisma__ShopOrderClient<$Result.GetResult<Prisma.$ShopOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    paymentAttempt<T extends OrderSyncTask$paymentAttemptArgs<ExtArgs> = {}>(args?: Subset<T, OrderSyncTask$paymentAttemptArgs<ExtArgs>>): Prisma__ShopPaymentAttemptClient<$Result.GetResult<Prisma.$ShopPaymentAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderSyncTask model
   */
  interface OrderSyncTaskFieldRefs {
    readonly id: FieldRef<"OrderSyncTask", 'String'>
    readonly taskType: FieldRef<"OrderSyncTask", 'String'>
    readonly shopOrderId: FieldRef<"OrderSyncTask", 'String'>
    readonly paymentAttemptId: FieldRef<"OrderSyncTask", 'String'>
    readonly status: FieldRef<"OrderSyncTask", 'SyncTaskStatus'>
    readonly scheduledAt: FieldRef<"OrderSyncTask", 'DateTime'>
    readonly startedAt: FieldRef<"OrderSyncTask", 'DateTime'>
    readonly finishedAt: FieldRef<"OrderSyncTask", 'DateTime'>
    readonly retryCount: FieldRef<"OrderSyncTask", 'Int'>
    readonly lastError: FieldRef<"OrderSyncTask", 'String'>
    readonly payload: FieldRef<"OrderSyncTask", 'String'>
    readonly createdAt: FieldRef<"OrderSyncTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderSyncTask findUnique
   */
  export type OrderSyncTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * Filter, which OrderSyncTask to fetch.
     */
    where: OrderSyncTaskWhereUniqueInput
  }

  /**
   * OrderSyncTask findUniqueOrThrow
   */
  export type OrderSyncTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * Filter, which OrderSyncTask to fetch.
     */
    where: OrderSyncTaskWhereUniqueInput
  }

  /**
   * OrderSyncTask findFirst
   */
  export type OrderSyncTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * Filter, which OrderSyncTask to fetch.
     */
    where?: OrderSyncTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderSyncTasks to fetch.
     */
    orderBy?: OrderSyncTaskOrderByWithRelationInput | OrderSyncTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderSyncTasks.
     */
    cursor?: OrderSyncTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderSyncTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderSyncTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderSyncTasks.
     */
    distinct?: OrderSyncTaskScalarFieldEnum | OrderSyncTaskScalarFieldEnum[]
  }

  /**
   * OrderSyncTask findFirstOrThrow
   */
  export type OrderSyncTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * Filter, which OrderSyncTask to fetch.
     */
    where?: OrderSyncTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderSyncTasks to fetch.
     */
    orderBy?: OrderSyncTaskOrderByWithRelationInput | OrderSyncTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderSyncTasks.
     */
    cursor?: OrderSyncTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderSyncTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderSyncTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderSyncTasks.
     */
    distinct?: OrderSyncTaskScalarFieldEnum | OrderSyncTaskScalarFieldEnum[]
  }

  /**
   * OrderSyncTask findMany
   */
  export type OrderSyncTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * Filter, which OrderSyncTasks to fetch.
     */
    where?: OrderSyncTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderSyncTasks to fetch.
     */
    orderBy?: OrderSyncTaskOrderByWithRelationInput | OrderSyncTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderSyncTasks.
     */
    cursor?: OrderSyncTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderSyncTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderSyncTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderSyncTasks.
     */
    distinct?: OrderSyncTaskScalarFieldEnum | OrderSyncTaskScalarFieldEnum[]
  }

  /**
   * OrderSyncTask create
   */
  export type OrderSyncTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderSyncTask.
     */
    data: XOR<OrderSyncTaskCreateInput, OrderSyncTaskUncheckedCreateInput>
  }

  /**
   * OrderSyncTask createMany
   */
  export type OrderSyncTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderSyncTasks.
     */
    data: OrderSyncTaskCreateManyInput | OrderSyncTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderSyncTask createManyAndReturn
   */
  export type OrderSyncTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * The data used to create many OrderSyncTasks.
     */
    data: OrderSyncTaskCreateManyInput | OrderSyncTaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderSyncTask update
   */
  export type OrderSyncTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderSyncTask.
     */
    data: XOR<OrderSyncTaskUpdateInput, OrderSyncTaskUncheckedUpdateInput>
    /**
     * Choose, which OrderSyncTask to update.
     */
    where: OrderSyncTaskWhereUniqueInput
  }

  /**
   * OrderSyncTask updateMany
   */
  export type OrderSyncTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderSyncTasks.
     */
    data: XOR<OrderSyncTaskUpdateManyMutationInput, OrderSyncTaskUncheckedUpdateManyInput>
    /**
     * Filter which OrderSyncTasks to update
     */
    where?: OrderSyncTaskWhereInput
    /**
     * Limit how many OrderSyncTasks to update.
     */
    limit?: number
  }

  /**
   * OrderSyncTask updateManyAndReturn
   */
  export type OrderSyncTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * The data used to update OrderSyncTasks.
     */
    data: XOR<OrderSyncTaskUpdateManyMutationInput, OrderSyncTaskUncheckedUpdateManyInput>
    /**
     * Filter which OrderSyncTasks to update
     */
    where?: OrderSyncTaskWhereInput
    /**
     * Limit how many OrderSyncTasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderSyncTask upsert
   */
  export type OrderSyncTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderSyncTask to update in case it exists.
     */
    where: OrderSyncTaskWhereUniqueInput
    /**
     * In case the OrderSyncTask found by the `where` argument doesn't exist, create a new OrderSyncTask with this data.
     */
    create: XOR<OrderSyncTaskCreateInput, OrderSyncTaskUncheckedCreateInput>
    /**
     * In case the OrderSyncTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderSyncTaskUpdateInput, OrderSyncTaskUncheckedUpdateInput>
  }

  /**
   * OrderSyncTask delete
   */
  export type OrderSyncTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
    /**
     * Filter which OrderSyncTask to delete.
     */
    where: OrderSyncTaskWhereUniqueInput
  }

  /**
   * OrderSyncTask deleteMany
   */
  export type OrderSyncTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderSyncTasks to delete
     */
    where?: OrderSyncTaskWhereInput
    /**
     * Limit how many OrderSyncTasks to delete.
     */
    limit?: number
  }

  /**
   * OrderSyncTask.shopOrder
   */
  export type OrderSyncTask$shopOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopOrder
     */
    select?: ShopOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopOrder
     */
    omit?: ShopOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopOrderInclude<ExtArgs> | null
    where?: ShopOrderWhereInput
  }

  /**
   * OrderSyncTask.paymentAttempt
   */
  export type OrderSyncTask$paymentAttemptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPaymentAttempt
     */
    select?: ShopPaymentAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShopPaymentAttempt
     */
    omit?: ShopPaymentAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPaymentAttemptInclude<ExtArgs> | null
    where?: ShopPaymentAttemptWhereInput
  }

  /**
   * OrderSyncTask without action
   */
  export type OrderSyncTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderSyncTask
     */
    select?: OrderSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderSyncTask
     */
    omit?: OrderSyncTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderSyncTaskInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MerchantAccountScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    isActive: 'isActive',
    storeAnnouncementEnabled: 'storeAnnouncementEnabled',
    storeAnnouncementTitle: 'storeAnnouncementTitle',
    storeAnnouncementBody: 'storeAnnouncementBody',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MerchantAccountScalarFieldEnum = (typeof MerchantAccountScalarFieldEnum)[keyof typeof MerchantAccountScalarFieldEnum]


  export const PlatformStorefrontSettingsScalarFieldEnum: {
    id: 'id',
    announcementEnabled: 'announcementEnabled',
    announcementTitle: 'announcementTitle',
    announcementBody: 'announcementBody',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlatformStorefrontSettingsScalarFieldEnum = (typeof PlatformStorefrontSettingsScalarFieldEnum)[keyof typeof PlatformStorefrontSettingsScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    summary: 'summary',
    description: 'description',
    priceCents: 'priceCents',
    saleMode: 'saleMode',
    paymentProfileId: 'paymentProfileId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductSkuScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    name: 'name',
    summary: 'summary',
    priceCents: 'priceCents',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductSkuScalarFieldEnum = (typeof ProductSkuScalarFieldEnum)[keyof typeof ProductSkuScalarFieldEnum]


  export const PaymentProfileScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    name: 'name',
    merchantCode: 'merchantCode',
    apiKey: 'apiKey',
    apiSecret: 'apiSecret',
    notifySecret: 'notifySecret',
    defaultChannelCode: 'defaultChannelCode',
    enabledChannelCodes: 'enabledChannelCodes',
    isActive: 'isActive',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentProfileScalarFieldEnum = (typeof PaymentProfileScalarFieldEnum)[keyof typeof PaymentProfileScalarFieldEnum]


  export const ControlAuditLogScalarFieldEnum: {
    id: 'id',
    scope: 'scope',
    actorType: 'actorType',
    actorId: 'actorId',
    actorLabel: 'actorLabel',
    merchantAccountId: 'merchantAccountId',
    paymentProfileId: 'paymentProfileId',
    actionType: 'actionType',
    riskLevel: 'riskLevel',
    outcome: 'outcome',
    targetType: 'targetType',
    targetId: 'targetId',
    targetLabel: 'targetLabel',
    summary: 'summary',
    detail: 'detail',
    payload: 'payload',
    reviewStatus: 'reviewStatus',
    reviewerType: 'reviewerType',
    reviewerId: 'reviewerId',
    reviewerLabel: 'reviewerLabel',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
  };

  export type ControlAuditLogScalarFieldEnum = (typeof ControlAuditLogScalarFieldEnum)[keyof typeof ControlAuditLogScalarFieldEnum]


  export const PaymentProfileRevisionScalarFieldEnum: {
    id: 'id',
    paymentProfileId: 'paymentProfileId',
    version: 'version',
    sourceScope: 'sourceScope',
    actorType: 'actorType',
    actorId: 'actorId',
    actorLabel: 'actorLabel',
    changeType: 'changeType',
    summary: 'summary',
    snapshot: 'snapshot',
    createdAt: 'createdAt'
  };

  export type PaymentProfileRevisionScalarFieldEnum = (typeof PaymentProfileRevisionScalarFieldEnum)[keyof typeof PaymentProfileRevisionScalarFieldEnum]


  export const CardItemScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    skuId: 'skuId',
    batchName: 'batchName',
    secret: 'secret',
    status: 'status',
    orderId: 'orderId',
    reservedAt: 'reservedAt',
    soldAt: 'soldAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CardItemScalarFieldEnum = (typeof CardItemScalarFieldEnum)[keyof typeof CardItemScalarFieldEnum]


  export const ShopOrderScalarFieldEnum: {
    id: 'id',
    orderNo: 'orderNo',
    publicToken: 'publicToken',
    productId: 'productId',
    paymentProfileId: 'paymentProfileId',
    skuId: 'skuId',
    quantity: 'quantity',
    customerEmail: 'customerEmail',
    amountCents: 'amountCents',
    channelCode: 'channelCode',
    status: 'status',
    novapayOrderId: 'novapayOrderId',
    novapayStatus: 'novapayStatus',
    checkoutUrl: 'checkoutUrl',
    hostedCheckoutUrl: 'hostedCheckoutUrl',
    failureMessage: 'failureMessage',
    expiresAt: 'expiresAt',
    paidAt: 'paidAt',
    fulfilledAt: 'fulfilledAt',
    lastSyncedAt: 'lastSyncedAt',
    lastNovaCreateResponse: 'lastNovaCreateResponse',
    lastNovaPayload: 'lastNovaPayload',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopOrderScalarFieldEnum = (typeof ShopOrderScalarFieldEnum)[keyof typeof ShopOrderScalarFieldEnum]


  export const ShopPaymentAttemptScalarFieldEnum: {
    id: 'id',
    shopOrderId: 'shopOrderId',
    externalOrderId: 'externalOrderId',
    novapayOrderId: 'novapayOrderId',
    merchantChannelAccountId: 'merchantChannelAccountId',
    channelCode: 'channelCode',
    amountCents: 'amountCents',
    status: 'status',
    checkoutUrl: 'checkoutUrl',
    hostedCheckoutUrl: 'hostedCheckoutUrl',
    expiresAt: 'expiresAt',
    callbackEventId: 'callbackEventId',
    traceId: 'traceId',
    createRequestPayload: 'createRequestPayload',
    createResponsePayload: 'createResponsePayload',
    lastRemotePayload: 'lastRemotePayload',
    lastSyncedAt: 'lastSyncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopPaymentAttemptScalarFieldEnum = (typeof ShopPaymentAttemptScalarFieldEnum)[keyof typeof ShopPaymentAttemptScalarFieldEnum]


  export const WebhookEventLogScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    externalEventId: 'externalEventId',
    externalOrderId: 'externalOrderId',
    eventType: 'eventType',
    traceId: 'traceId',
    signatureValid: 'signatureValid',
    requestHeaders: 'requestHeaders',
    requestBody: 'requestBody',
    processingStatus: 'processingStatus',
    processingError: 'processingError',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WebhookEventLogScalarFieldEnum = (typeof WebhookEventLogScalarFieldEnum)[keyof typeof WebhookEventLogScalarFieldEnum]


  export const OrderSyncTaskScalarFieldEnum: {
    id: 'id',
    taskType: 'taskType',
    shopOrderId: 'shopOrderId',
    paymentAttemptId: 'paymentAttemptId',
    status: 'status',
    scheduledAt: 'scheduledAt',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    retryCount: 'retryCount',
    lastError: 'lastError',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type OrderSyncTaskScalarFieldEnum = (typeof OrderSyncTaskScalarFieldEnum)[keyof typeof OrderSyncTaskScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ProductSaleMode'
   */
  export type EnumProductSaleModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductSaleMode'>
    


  /**
   * Reference to a field of type 'ProductSaleMode[]'
   */
  export type ListEnumProductSaleModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductSaleMode[]'>
    


  /**
   * Reference to a field of type 'ProductStatus'
   */
  export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>
    


  /**
   * Reference to a field of type 'ProductStatus[]'
   */
  export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>
    


  /**
   * Reference to a field of type 'CardItemStatus'
   */
  export type EnumCardItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CardItemStatus'>
    


  /**
   * Reference to a field of type 'CardItemStatus[]'
   */
  export type ListEnumCardItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CardItemStatus[]'>
    


  /**
   * Reference to a field of type 'ShopOrderStatus'
   */
  export type EnumShopOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShopOrderStatus'>
    


  /**
   * Reference to a field of type 'ShopOrderStatus[]'
   */
  export type ListEnumShopOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShopOrderStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentAttemptStatus'
   */
  export type EnumPaymentAttemptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentAttemptStatus'>
    


  /**
   * Reference to a field of type 'PaymentAttemptStatus[]'
   */
  export type ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentAttemptStatus[]'>
    


  /**
   * Reference to a field of type 'SyncTaskStatus'
   */
  export type EnumSyncTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SyncTaskStatus'>
    


  /**
   * Reference to a field of type 'SyncTaskStatus[]'
   */
  export type ListEnumSyncTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SyncTaskStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MerchantAccountWhereInput = {
    AND?: MerchantAccountWhereInput | MerchantAccountWhereInput[]
    OR?: MerchantAccountWhereInput[]
    NOT?: MerchantAccountWhereInput | MerchantAccountWhereInput[]
    id?: StringFilter<"MerchantAccount"> | string
    name?: StringFilter<"MerchantAccount"> | string
    email?: StringFilter<"MerchantAccount"> | string
    passwordHash?: StringFilter<"MerchantAccount"> | string
    isActive?: BoolFilter<"MerchantAccount"> | boolean
    storeAnnouncementEnabled?: BoolFilter<"MerchantAccount"> | boolean
    storeAnnouncementTitle?: StringNullableFilter<"MerchantAccount"> | string | null
    storeAnnouncementBody?: StringNullableFilter<"MerchantAccount"> | string | null
    createdAt?: DateTimeFilter<"MerchantAccount"> | Date | string
    updatedAt?: DateTimeFilter<"MerchantAccount"> | Date | string
    paymentProfile?: XOR<PaymentProfileNullableScalarRelationFilter, PaymentProfileWhereInput> | null
  }

  export type MerchantAccountOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    storeAnnouncementEnabled?: SortOrder
    storeAnnouncementTitle?: SortOrderInput | SortOrder
    storeAnnouncementBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentProfile?: PaymentProfileOrderByWithRelationInput
  }

  export type MerchantAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: MerchantAccountWhereInput | MerchantAccountWhereInput[]
    OR?: MerchantAccountWhereInput[]
    NOT?: MerchantAccountWhereInput | MerchantAccountWhereInput[]
    name?: StringFilter<"MerchantAccount"> | string
    passwordHash?: StringFilter<"MerchantAccount"> | string
    isActive?: BoolFilter<"MerchantAccount"> | boolean
    storeAnnouncementEnabled?: BoolFilter<"MerchantAccount"> | boolean
    storeAnnouncementTitle?: StringNullableFilter<"MerchantAccount"> | string | null
    storeAnnouncementBody?: StringNullableFilter<"MerchantAccount"> | string | null
    createdAt?: DateTimeFilter<"MerchantAccount"> | Date | string
    updatedAt?: DateTimeFilter<"MerchantAccount"> | Date | string
    paymentProfile?: XOR<PaymentProfileNullableScalarRelationFilter, PaymentProfileWhereInput> | null
  }, "id" | "email">

  export type MerchantAccountOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    storeAnnouncementEnabled?: SortOrder
    storeAnnouncementTitle?: SortOrderInput | SortOrder
    storeAnnouncementBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MerchantAccountCountOrderByAggregateInput
    _max?: MerchantAccountMaxOrderByAggregateInput
    _min?: MerchantAccountMinOrderByAggregateInput
  }

  export type MerchantAccountScalarWhereWithAggregatesInput = {
    AND?: MerchantAccountScalarWhereWithAggregatesInput | MerchantAccountScalarWhereWithAggregatesInput[]
    OR?: MerchantAccountScalarWhereWithAggregatesInput[]
    NOT?: MerchantAccountScalarWhereWithAggregatesInput | MerchantAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MerchantAccount"> | string
    name?: StringWithAggregatesFilter<"MerchantAccount"> | string
    email?: StringWithAggregatesFilter<"MerchantAccount"> | string
    passwordHash?: StringWithAggregatesFilter<"MerchantAccount"> | string
    isActive?: BoolWithAggregatesFilter<"MerchantAccount"> | boolean
    storeAnnouncementEnabled?: BoolWithAggregatesFilter<"MerchantAccount"> | boolean
    storeAnnouncementTitle?: StringNullableWithAggregatesFilter<"MerchantAccount"> | string | null
    storeAnnouncementBody?: StringNullableWithAggregatesFilter<"MerchantAccount"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MerchantAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MerchantAccount"> | Date | string
  }

  export type PlatformStorefrontSettingsWhereInput = {
    AND?: PlatformStorefrontSettingsWhereInput | PlatformStorefrontSettingsWhereInput[]
    OR?: PlatformStorefrontSettingsWhereInput[]
    NOT?: PlatformStorefrontSettingsWhereInput | PlatformStorefrontSettingsWhereInput[]
    id?: StringFilter<"PlatformStorefrontSettings"> | string
    announcementEnabled?: BoolFilter<"PlatformStorefrontSettings"> | boolean
    announcementTitle?: StringNullableFilter<"PlatformStorefrontSettings"> | string | null
    announcementBody?: StringNullableFilter<"PlatformStorefrontSettings"> | string | null
    createdAt?: DateTimeFilter<"PlatformStorefrontSettings"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformStorefrontSettings"> | Date | string
  }

  export type PlatformStorefrontSettingsOrderByWithRelationInput = {
    id?: SortOrder
    announcementEnabled?: SortOrder
    announcementTitle?: SortOrderInput | SortOrder
    announcementBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformStorefrontSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlatformStorefrontSettingsWhereInput | PlatformStorefrontSettingsWhereInput[]
    OR?: PlatformStorefrontSettingsWhereInput[]
    NOT?: PlatformStorefrontSettingsWhereInput | PlatformStorefrontSettingsWhereInput[]
    announcementEnabled?: BoolFilter<"PlatformStorefrontSettings"> | boolean
    announcementTitle?: StringNullableFilter<"PlatformStorefrontSettings"> | string | null
    announcementBody?: StringNullableFilter<"PlatformStorefrontSettings"> | string | null
    createdAt?: DateTimeFilter<"PlatformStorefrontSettings"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformStorefrontSettings"> | Date | string
  }, "id">

  export type PlatformStorefrontSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    announcementEnabled?: SortOrder
    announcementTitle?: SortOrderInput | SortOrder
    announcementBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlatformStorefrontSettingsCountOrderByAggregateInput
    _max?: PlatformStorefrontSettingsMaxOrderByAggregateInput
    _min?: PlatformStorefrontSettingsMinOrderByAggregateInput
  }

  export type PlatformStorefrontSettingsScalarWhereWithAggregatesInput = {
    AND?: PlatformStorefrontSettingsScalarWhereWithAggregatesInput | PlatformStorefrontSettingsScalarWhereWithAggregatesInput[]
    OR?: PlatformStorefrontSettingsScalarWhereWithAggregatesInput[]
    NOT?: PlatformStorefrontSettingsScalarWhereWithAggregatesInput | PlatformStorefrontSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlatformStorefrontSettings"> | string
    announcementEnabled?: BoolWithAggregatesFilter<"PlatformStorefrontSettings"> | boolean
    announcementTitle?: StringNullableWithAggregatesFilter<"PlatformStorefrontSettings"> | string | null
    announcementBody?: StringNullableWithAggregatesFilter<"PlatformStorefrontSettings"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PlatformStorefrontSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlatformStorefrontSettings"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    summary?: StringNullableFilter<"Product"> | string | null
    description?: StringNullableFilter<"Product"> | string | null
    priceCents?: IntFilter<"Product"> | number
    saleMode?: EnumProductSaleModeFilter<"Product"> | $Enums.ProductSaleMode
    paymentProfileId?: StringNullableFilter<"Product"> | string | null
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    paymentProfile?: XOR<PaymentProfileNullableScalarRelationFilter, PaymentProfileWhereInput> | null
    skus?: ProductSkuListRelationFilter
    cards?: CardItemListRelationFilter
    orders?: ShopOrderListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    summary?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    priceCents?: SortOrder
    saleMode?: SortOrder
    paymentProfileId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentProfile?: PaymentProfileOrderByWithRelationInput
    skus?: ProductSkuOrderByRelationAggregateInput
    cards?: CardItemOrderByRelationAggregateInput
    orders?: ShopOrderOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    summary?: StringNullableFilter<"Product"> | string | null
    description?: StringNullableFilter<"Product"> | string | null
    priceCents?: IntFilter<"Product"> | number
    saleMode?: EnumProductSaleModeFilter<"Product"> | $Enums.ProductSaleMode
    paymentProfileId?: StringNullableFilter<"Product"> | string | null
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    paymentProfile?: XOR<PaymentProfileNullableScalarRelationFilter, PaymentProfileWhereInput> | null
    skus?: ProductSkuListRelationFilter
    cards?: CardItemListRelationFilter
    orders?: ShopOrderListRelationFilter
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    summary?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    priceCents?: SortOrder
    saleMode?: SortOrder
    paymentProfileId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringWithAggregatesFilter<"Product"> | string
    summary?: StringNullableWithAggregatesFilter<"Product"> | string | null
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    priceCents?: IntWithAggregatesFilter<"Product"> | number
    saleMode?: EnumProductSaleModeWithAggregatesFilter<"Product"> | $Enums.ProductSaleMode
    paymentProfileId?: StringNullableWithAggregatesFilter<"Product"> | string | null
    status?: EnumProductStatusWithAggregatesFilter<"Product"> | $Enums.ProductStatus
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ProductSkuWhereInput = {
    AND?: ProductSkuWhereInput | ProductSkuWhereInput[]
    OR?: ProductSkuWhereInput[]
    NOT?: ProductSkuWhereInput | ProductSkuWhereInput[]
    id?: StringFilter<"ProductSku"> | string
    productId?: StringFilter<"ProductSku"> | string
    name?: StringFilter<"ProductSku"> | string
    summary?: StringNullableFilter<"ProductSku"> | string | null
    priceCents?: IntFilter<"ProductSku"> | number
    enabled?: BoolFilter<"ProductSku"> | boolean
    sortOrder?: IntFilter<"ProductSku"> | number
    createdAt?: DateTimeFilter<"ProductSku"> | Date | string
    updatedAt?: DateTimeFilter<"ProductSku"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    cards?: CardItemListRelationFilter
    orders?: ShopOrderListRelationFilter
  }

  export type ProductSkuOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    summary?: SortOrderInput | SortOrder
    priceCents?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    cards?: CardItemOrderByRelationAggregateInput
    orders?: ShopOrderOrderByRelationAggregateInput
  }

  export type ProductSkuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductSkuWhereInput | ProductSkuWhereInput[]
    OR?: ProductSkuWhereInput[]
    NOT?: ProductSkuWhereInput | ProductSkuWhereInput[]
    productId?: StringFilter<"ProductSku"> | string
    name?: StringFilter<"ProductSku"> | string
    summary?: StringNullableFilter<"ProductSku"> | string | null
    priceCents?: IntFilter<"ProductSku"> | number
    enabled?: BoolFilter<"ProductSku"> | boolean
    sortOrder?: IntFilter<"ProductSku"> | number
    createdAt?: DateTimeFilter<"ProductSku"> | Date | string
    updatedAt?: DateTimeFilter<"ProductSku"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    cards?: CardItemListRelationFilter
    orders?: ShopOrderListRelationFilter
  }, "id">

  export type ProductSkuOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    summary?: SortOrderInput | SortOrder
    priceCents?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductSkuCountOrderByAggregateInput
    _avg?: ProductSkuAvgOrderByAggregateInput
    _max?: ProductSkuMaxOrderByAggregateInput
    _min?: ProductSkuMinOrderByAggregateInput
    _sum?: ProductSkuSumOrderByAggregateInput
  }

  export type ProductSkuScalarWhereWithAggregatesInput = {
    AND?: ProductSkuScalarWhereWithAggregatesInput | ProductSkuScalarWhereWithAggregatesInput[]
    OR?: ProductSkuScalarWhereWithAggregatesInput[]
    NOT?: ProductSkuScalarWhereWithAggregatesInput | ProductSkuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductSku"> | string
    productId?: StringWithAggregatesFilter<"ProductSku"> | string
    name?: StringWithAggregatesFilter<"ProductSku"> | string
    summary?: StringNullableWithAggregatesFilter<"ProductSku"> | string | null
    priceCents?: IntWithAggregatesFilter<"ProductSku"> | number
    enabled?: BoolWithAggregatesFilter<"ProductSku"> | boolean
    sortOrder?: IntWithAggregatesFilter<"ProductSku"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductSku"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductSku"> | Date | string
  }

  export type PaymentProfileWhereInput = {
    AND?: PaymentProfileWhereInput | PaymentProfileWhereInput[]
    OR?: PaymentProfileWhereInput[]
    NOT?: PaymentProfileWhereInput | PaymentProfileWhereInput[]
    id?: StringFilter<"PaymentProfile"> | string
    ownerId?: StringNullableFilter<"PaymentProfile"> | string | null
    name?: StringFilter<"PaymentProfile"> | string
    merchantCode?: StringFilter<"PaymentProfile"> | string
    apiKey?: StringFilter<"PaymentProfile"> | string
    apiSecret?: StringFilter<"PaymentProfile"> | string
    notifySecret?: StringNullableFilter<"PaymentProfile"> | string | null
    defaultChannelCode?: StringFilter<"PaymentProfile"> | string
    enabledChannelCodes?: StringNullableFilter<"PaymentProfile"> | string | null
    isActive?: BoolFilter<"PaymentProfile"> | boolean
    isDefault?: BoolFilter<"PaymentProfile"> | boolean
    createdAt?: DateTimeFilter<"PaymentProfile"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentProfile"> | Date | string
    owner?: XOR<MerchantAccountNullableScalarRelationFilter, MerchantAccountWhereInput> | null
    products?: ProductListRelationFilter
    orders?: ShopOrderListRelationFilter
    revisions?: PaymentProfileRevisionListRelationFilter
  }

  export type PaymentProfileOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    name?: SortOrder
    merchantCode?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    notifySecret?: SortOrderInput | SortOrder
    defaultChannelCode?: SortOrder
    enabledChannelCodes?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: MerchantAccountOrderByWithRelationInput
    products?: ProductOrderByRelationAggregateInput
    orders?: ShopOrderOrderByRelationAggregateInput
    revisions?: PaymentProfileRevisionOrderByRelationAggregateInput
  }

  export type PaymentProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ownerId?: string
    AND?: PaymentProfileWhereInput | PaymentProfileWhereInput[]
    OR?: PaymentProfileWhereInput[]
    NOT?: PaymentProfileWhereInput | PaymentProfileWhereInput[]
    name?: StringFilter<"PaymentProfile"> | string
    merchantCode?: StringFilter<"PaymentProfile"> | string
    apiKey?: StringFilter<"PaymentProfile"> | string
    apiSecret?: StringFilter<"PaymentProfile"> | string
    notifySecret?: StringNullableFilter<"PaymentProfile"> | string | null
    defaultChannelCode?: StringFilter<"PaymentProfile"> | string
    enabledChannelCodes?: StringNullableFilter<"PaymentProfile"> | string | null
    isActive?: BoolFilter<"PaymentProfile"> | boolean
    isDefault?: BoolFilter<"PaymentProfile"> | boolean
    createdAt?: DateTimeFilter<"PaymentProfile"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentProfile"> | Date | string
    owner?: XOR<MerchantAccountNullableScalarRelationFilter, MerchantAccountWhereInput> | null
    products?: ProductListRelationFilter
    orders?: ShopOrderListRelationFilter
    revisions?: PaymentProfileRevisionListRelationFilter
  }, "id" | "ownerId">

  export type PaymentProfileOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    name?: SortOrder
    merchantCode?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    notifySecret?: SortOrderInput | SortOrder
    defaultChannelCode?: SortOrder
    enabledChannelCodes?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentProfileCountOrderByAggregateInput
    _max?: PaymentProfileMaxOrderByAggregateInput
    _min?: PaymentProfileMinOrderByAggregateInput
  }

  export type PaymentProfileScalarWhereWithAggregatesInput = {
    AND?: PaymentProfileScalarWhereWithAggregatesInput | PaymentProfileScalarWhereWithAggregatesInput[]
    OR?: PaymentProfileScalarWhereWithAggregatesInput[]
    NOT?: PaymentProfileScalarWhereWithAggregatesInput | PaymentProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentProfile"> | string
    ownerId?: StringNullableWithAggregatesFilter<"PaymentProfile"> | string | null
    name?: StringWithAggregatesFilter<"PaymentProfile"> | string
    merchantCode?: StringWithAggregatesFilter<"PaymentProfile"> | string
    apiKey?: StringWithAggregatesFilter<"PaymentProfile"> | string
    apiSecret?: StringWithAggregatesFilter<"PaymentProfile"> | string
    notifySecret?: StringNullableWithAggregatesFilter<"PaymentProfile"> | string | null
    defaultChannelCode?: StringWithAggregatesFilter<"PaymentProfile"> | string
    enabledChannelCodes?: StringNullableWithAggregatesFilter<"PaymentProfile"> | string | null
    isActive?: BoolWithAggregatesFilter<"PaymentProfile"> | boolean
    isDefault?: BoolWithAggregatesFilter<"PaymentProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PaymentProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentProfile"> | Date | string
  }

  export type ControlAuditLogWhereInput = {
    AND?: ControlAuditLogWhereInput | ControlAuditLogWhereInput[]
    OR?: ControlAuditLogWhereInput[]
    NOT?: ControlAuditLogWhereInput | ControlAuditLogWhereInput[]
    id?: StringFilter<"ControlAuditLog"> | string
    scope?: StringFilter<"ControlAuditLog"> | string
    actorType?: StringFilter<"ControlAuditLog"> | string
    actorId?: StringNullableFilter<"ControlAuditLog"> | string | null
    actorLabel?: StringFilter<"ControlAuditLog"> | string
    merchantAccountId?: StringNullableFilter<"ControlAuditLog"> | string | null
    paymentProfileId?: StringNullableFilter<"ControlAuditLog"> | string | null
    actionType?: StringFilter<"ControlAuditLog"> | string
    riskLevel?: StringFilter<"ControlAuditLog"> | string
    outcome?: StringFilter<"ControlAuditLog"> | string
    targetType?: StringFilter<"ControlAuditLog"> | string
    targetId?: StringNullableFilter<"ControlAuditLog"> | string | null
    targetLabel?: StringFilter<"ControlAuditLog"> | string
    summary?: StringFilter<"ControlAuditLog"> | string
    detail?: StringNullableFilter<"ControlAuditLog"> | string | null
    payload?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewStatus?: StringFilter<"ControlAuditLog"> | string
    reviewerType?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewerId?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewerLabel?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewNote?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewedAt?: DateTimeNullableFilter<"ControlAuditLog"> | Date | string | null
    createdAt?: DateTimeFilter<"ControlAuditLog"> | Date | string
  }

  export type ControlAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    scope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorLabel?: SortOrder
    merchantAccountId?: SortOrderInput | SortOrder
    paymentProfileId?: SortOrderInput | SortOrder
    actionType?: SortOrder
    riskLevel?: SortOrder
    outcome?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrderInput | SortOrder
    targetLabel?: SortOrder
    summary?: SortOrder
    detail?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    reviewStatus?: SortOrder
    reviewerType?: SortOrderInput | SortOrder
    reviewerId?: SortOrderInput | SortOrder
    reviewerLabel?: SortOrderInput | SortOrder
    reviewNote?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ControlAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ControlAuditLogWhereInput | ControlAuditLogWhereInput[]
    OR?: ControlAuditLogWhereInput[]
    NOT?: ControlAuditLogWhereInput | ControlAuditLogWhereInput[]
    scope?: StringFilter<"ControlAuditLog"> | string
    actorType?: StringFilter<"ControlAuditLog"> | string
    actorId?: StringNullableFilter<"ControlAuditLog"> | string | null
    actorLabel?: StringFilter<"ControlAuditLog"> | string
    merchantAccountId?: StringNullableFilter<"ControlAuditLog"> | string | null
    paymentProfileId?: StringNullableFilter<"ControlAuditLog"> | string | null
    actionType?: StringFilter<"ControlAuditLog"> | string
    riskLevel?: StringFilter<"ControlAuditLog"> | string
    outcome?: StringFilter<"ControlAuditLog"> | string
    targetType?: StringFilter<"ControlAuditLog"> | string
    targetId?: StringNullableFilter<"ControlAuditLog"> | string | null
    targetLabel?: StringFilter<"ControlAuditLog"> | string
    summary?: StringFilter<"ControlAuditLog"> | string
    detail?: StringNullableFilter<"ControlAuditLog"> | string | null
    payload?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewStatus?: StringFilter<"ControlAuditLog"> | string
    reviewerType?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewerId?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewerLabel?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewNote?: StringNullableFilter<"ControlAuditLog"> | string | null
    reviewedAt?: DateTimeNullableFilter<"ControlAuditLog"> | Date | string | null
    createdAt?: DateTimeFilter<"ControlAuditLog"> | Date | string
  }, "id">

  export type ControlAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    scope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorLabel?: SortOrder
    merchantAccountId?: SortOrderInput | SortOrder
    paymentProfileId?: SortOrderInput | SortOrder
    actionType?: SortOrder
    riskLevel?: SortOrder
    outcome?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrderInput | SortOrder
    targetLabel?: SortOrder
    summary?: SortOrder
    detail?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    reviewStatus?: SortOrder
    reviewerType?: SortOrderInput | SortOrder
    reviewerId?: SortOrderInput | SortOrder
    reviewerLabel?: SortOrderInput | SortOrder
    reviewNote?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ControlAuditLogCountOrderByAggregateInput
    _max?: ControlAuditLogMaxOrderByAggregateInput
    _min?: ControlAuditLogMinOrderByAggregateInput
  }

  export type ControlAuditLogScalarWhereWithAggregatesInput = {
    AND?: ControlAuditLogScalarWhereWithAggregatesInput | ControlAuditLogScalarWhereWithAggregatesInput[]
    OR?: ControlAuditLogScalarWhereWithAggregatesInput[]
    NOT?: ControlAuditLogScalarWhereWithAggregatesInput | ControlAuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    scope?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    actorType?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    actorId?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    actorLabel?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    merchantAccountId?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    paymentProfileId?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    actionType?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    riskLevel?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    outcome?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    targetType?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    targetId?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    targetLabel?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    summary?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    detail?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    payload?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    reviewStatus?: StringWithAggregatesFilter<"ControlAuditLog"> | string
    reviewerType?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    reviewerId?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    reviewerLabel?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    reviewNote?: StringNullableWithAggregatesFilter<"ControlAuditLog"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"ControlAuditLog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ControlAuditLog"> | Date | string
  }

  export type PaymentProfileRevisionWhereInput = {
    AND?: PaymentProfileRevisionWhereInput | PaymentProfileRevisionWhereInput[]
    OR?: PaymentProfileRevisionWhereInput[]
    NOT?: PaymentProfileRevisionWhereInput | PaymentProfileRevisionWhereInput[]
    id?: StringFilter<"PaymentProfileRevision"> | string
    paymentProfileId?: StringFilter<"PaymentProfileRevision"> | string
    version?: IntFilter<"PaymentProfileRevision"> | number
    sourceScope?: StringFilter<"PaymentProfileRevision"> | string
    actorType?: StringFilter<"PaymentProfileRevision"> | string
    actorId?: StringNullableFilter<"PaymentProfileRevision"> | string | null
    actorLabel?: StringFilter<"PaymentProfileRevision"> | string
    changeType?: StringFilter<"PaymentProfileRevision"> | string
    summary?: StringFilter<"PaymentProfileRevision"> | string
    snapshot?: StringFilter<"PaymentProfileRevision"> | string
    createdAt?: DateTimeFilter<"PaymentProfileRevision"> | Date | string
    paymentProfile?: XOR<PaymentProfileScalarRelationFilter, PaymentProfileWhereInput>
  }

  export type PaymentProfileRevisionOrderByWithRelationInput = {
    id?: SortOrder
    paymentProfileId?: SortOrder
    version?: SortOrder
    sourceScope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorLabel?: SortOrder
    changeType?: SortOrder
    summary?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    paymentProfile?: PaymentProfileOrderByWithRelationInput
  }

  export type PaymentProfileRevisionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paymentProfileId_version?: PaymentProfileRevisionPaymentProfileIdVersionCompoundUniqueInput
    AND?: PaymentProfileRevisionWhereInput | PaymentProfileRevisionWhereInput[]
    OR?: PaymentProfileRevisionWhereInput[]
    NOT?: PaymentProfileRevisionWhereInput | PaymentProfileRevisionWhereInput[]
    paymentProfileId?: StringFilter<"PaymentProfileRevision"> | string
    version?: IntFilter<"PaymentProfileRevision"> | number
    sourceScope?: StringFilter<"PaymentProfileRevision"> | string
    actorType?: StringFilter<"PaymentProfileRevision"> | string
    actorId?: StringNullableFilter<"PaymentProfileRevision"> | string | null
    actorLabel?: StringFilter<"PaymentProfileRevision"> | string
    changeType?: StringFilter<"PaymentProfileRevision"> | string
    summary?: StringFilter<"PaymentProfileRevision"> | string
    snapshot?: StringFilter<"PaymentProfileRevision"> | string
    createdAt?: DateTimeFilter<"PaymentProfileRevision"> | Date | string
    paymentProfile?: XOR<PaymentProfileScalarRelationFilter, PaymentProfileWhereInput>
  }, "id" | "paymentProfileId_version">

  export type PaymentProfileRevisionOrderByWithAggregationInput = {
    id?: SortOrder
    paymentProfileId?: SortOrder
    version?: SortOrder
    sourceScope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorLabel?: SortOrder
    changeType?: SortOrder
    summary?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    _count?: PaymentProfileRevisionCountOrderByAggregateInput
    _avg?: PaymentProfileRevisionAvgOrderByAggregateInput
    _max?: PaymentProfileRevisionMaxOrderByAggregateInput
    _min?: PaymentProfileRevisionMinOrderByAggregateInput
    _sum?: PaymentProfileRevisionSumOrderByAggregateInput
  }

  export type PaymentProfileRevisionScalarWhereWithAggregatesInput = {
    AND?: PaymentProfileRevisionScalarWhereWithAggregatesInput | PaymentProfileRevisionScalarWhereWithAggregatesInput[]
    OR?: PaymentProfileRevisionScalarWhereWithAggregatesInput[]
    NOT?: PaymentProfileRevisionScalarWhereWithAggregatesInput | PaymentProfileRevisionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentProfileRevision"> | string
    paymentProfileId?: StringWithAggregatesFilter<"PaymentProfileRevision"> | string
    version?: IntWithAggregatesFilter<"PaymentProfileRevision"> | number
    sourceScope?: StringWithAggregatesFilter<"PaymentProfileRevision"> | string
    actorType?: StringWithAggregatesFilter<"PaymentProfileRevision"> | string
    actorId?: StringNullableWithAggregatesFilter<"PaymentProfileRevision"> | string | null
    actorLabel?: StringWithAggregatesFilter<"PaymentProfileRevision"> | string
    changeType?: StringWithAggregatesFilter<"PaymentProfileRevision"> | string
    summary?: StringWithAggregatesFilter<"PaymentProfileRevision"> | string
    snapshot?: StringWithAggregatesFilter<"PaymentProfileRevision"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PaymentProfileRevision"> | Date | string
  }

  export type CardItemWhereInput = {
    AND?: CardItemWhereInput | CardItemWhereInput[]
    OR?: CardItemWhereInput[]
    NOT?: CardItemWhereInput | CardItemWhereInput[]
    id?: StringFilter<"CardItem"> | string
    productId?: StringFilter<"CardItem"> | string
    skuId?: StringFilter<"CardItem"> | string
    batchName?: StringNullableFilter<"CardItem"> | string | null
    secret?: StringFilter<"CardItem"> | string
    status?: EnumCardItemStatusFilter<"CardItem"> | $Enums.CardItemStatus
    orderId?: StringNullableFilter<"CardItem"> | string | null
    reservedAt?: DateTimeNullableFilter<"CardItem"> | Date | string | null
    soldAt?: DateTimeNullableFilter<"CardItem"> | Date | string | null
    createdAt?: DateTimeFilter<"CardItem"> | Date | string
    updatedAt?: DateTimeFilter<"CardItem"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    sku?: XOR<ProductSkuScalarRelationFilter, ProductSkuWhereInput>
    order?: XOR<ShopOrderNullableScalarRelationFilter, ShopOrderWhereInput> | null
  }

  export type CardItemOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    skuId?: SortOrder
    batchName?: SortOrderInput | SortOrder
    secret?: SortOrder
    status?: SortOrder
    orderId?: SortOrderInput | SortOrder
    reservedAt?: SortOrderInput | SortOrder
    soldAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    sku?: ProductSkuOrderByWithRelationInput
    order?: ShopOrderOrderByWithRelationInput
  }

  export type CardItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CardItemWhereInput | CardItemWhereInput[]
    OR?: CardItemWhereInput[]
    NOT?: CardItemWhereInput | CardItemWhereInput[]
    productId?: StringFilter<"CardItem"> | string
    skuId?: StringFilter<"CardItem"> | string
    batchName?: StringNullableFilter<"CardItem"> | string | null
    secret?: StringFilter<"CardItem"> | string
    status?: EnumCardItemStatusFilter<"CardItem"> | $Enums.CardItemStatus
    orderId?: StringNullableFilter<"CardItem"> | string | null
    reservedAt?: DateTimeNullableFilter<"CardItem"> | Date | string | null
    soldAt?: DateTimeNullableFilter<"CardItem"> | Date | string | null
    createdAt?: DateTimeFilter<"CardItem"> | Date | string
    updatedAt?: DateTimeFilter<"CardItem"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    sku?: XOR<ProductSkuScalarRelationFilter, ProductSkuWhereInput>
    order?: XOR<ShopOrderNullableScalarRelationFilter, ShopOrderWhereInput> | null
  }, "id">

  export type CardItemOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    skuId?: SortOrder
    batchName?: SortOrderInput | SortOrder
    secret?: SortOrder
    status?: SortOrder
    orderId?: SortOrderInput | SortOrder
    reservedAt?: SortOrderInput | SortOrder
    soldAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CardItemCountOrderByAggregateInput
    _max?: CardItemMaxOrderByAggregateInput
    _min?: CardItemMinOrderByAggregateInput
  }

  export type CardItemScalarWhereWithAggregatesInput = {
    AND?: CardItemScalarWhereWithAggregatesInput | CardItemScalarWhereWithAggregatesInput[]
    OR?: CardItemScalarWhereWithAggregatesInput[]
    NOT?: CardItemScalarWhereWithAggregatesInput | CardItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CardItem"> | string
    productId?: StringWithAggregatesFilter<"CardItem"> | string
    skuId?: StringWithAggregatesFilter<"CardItem"> | string
    batchName?: StringNullableWithAggregatesFilter<"CardItem"> | string | null
    secret?: StringWithAggregatesFilter<"CardItem"> | string
    status?: EnumCardItemStatusWithAggregatesFilter<"CardItem"> | $Enums.CardItemStatus
    orderId?: StringNullableWithAggregatesFilter<"CardItem"> | string | null
    reservedAt?: DateTimeNullableWithAggregatesFilter<"CardItem"> | Date | string | null
    soldAt?: DateTimeNullableWithAggregatesFilter<"CardItem"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CardItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CardItem"> | Date | string
  }

  export type ShopOrderWhereInput = {
    AND?: ShopOrderWhereInput | ShopOrderWhereInput[]
    OR?: ShopOrderWhereInput[]
    NOT?: ShopOrderWhereInput | ShopOrderWhereInput[]
    id?: StringFilter<"ShopOrder"> | string
    orderNo?: StringFilter<"ShopOrder"> | string
    publicToken?: StringFilter<"ShopOrder"> | string
    productId?: StringFilter<"ShopOrder"> | string
    paymentProfileId?: StringNullableFilter<"ShopOrder"> | string | null
    skuId?: StringFilter<"ShopOrder"> | string
    quantity?: IntFilter<"ShopOrder"> | number
    customerEmail?: StringFilter<"ShopOrder"> | string
    amountCents?: IntFilter<"ShopOrder"> | number
    channelCode?: StringFilter<"ShopOrder"> | string
    status?: EnumShopOrderStatusFilter<"ShopOrder"> | $Enums.ShopOrderStatus
    novapayOrderId?: StringNullableFilter<"ShopOrder"> | string | null
    novapayStatus?: StringNullableFilter<"ShopOrder"> | string | null
    checkoutUrl?: StringNullableFilter<"ShopOrder"> | string | null
    hostedCheckoutUrl?: StringNullableFilter<"ShopOrder"> | string | null
    failureMessage?: StringNullableFilter<"ShopOrder"> | string | null
    expiresAt?: DateTimeFilter<"ShopOrder"> | Date | string
    paidAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    fulfilledAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    lastSyncedAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    lastNovaCreateResponse?: StringNullableFilter<"ShopOrder"> | string | null
    lastNovaPayload?: StringNullableFilter<"ShopOrder"> | string | null
    createdAt?: DateTimeFilter<"ShopOrder"> | Date | string
    updatedAt?: DateTimeFilter<"ShopOrder"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    paymentProfile?: XOR<PaymentProfileNullableScalarRelationFilter, PaymentProfileWhereInput> | null
    sku?: XOR<ProductSkuScalarRelationFilter, ProductSkuWhereInput>
    cards?: CardItemListRelationFilter
    paymentAttempts?: ShopPaymentAttemptListRelationFilter
    syncTasks?: OrderSyncTaskListRelationFilter
  }

  export type ShopOrderOrderByWithRelationInput = {
    id?: SortOrder
    orderNo?: SortOrder
    publicToken?: SortOrder
    productId?: SortOrder
    paymentProfileId?: SortOrderInput | SortOrder
    skuId?: SortOrder
    quantity?: SortOrder
    customerEmail?: SortOrder
    amountCents?: SortOrder
    channelCode?: SortOrder
    status?: SortOrder
    novapayOrderId?: SortOrderInput | SortOrder
    novapayStatus?: SortOrderInput | SortOrder
    checkoutUrl?: SortOrderInput | SortOrder
    hostedCheckoutUrl?: SortOrderInput | SortOrder
    failureMessage?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    fulfilledAt?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    lastNovaCreateResponse?: SortOrderInput | SortOrder
    lastNovaPayload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    paymentProfile?: PaymentProfileOrderByWithRelationInput
    sku?: ProductSkuOrderByWithRelationInput
    cards?: CardItemOrderByRelationAggregateInput
    paymentAttempts?: ShopPaymentAttemptOrderByRelationAggregateInput
    syncTasks?: OrderSyncTaskOrderByRelationAggregateInput
  }

  export type ShopOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderNo?: string
    publicToken?: string
    AND?: ShopOrderWhereInput | ShopOrderWhereInput[]
    OR?: ShopOrderWhereInput[]
    NOT?: ShopOrderWhereInput | ShopOrderWhereInput[]
    productId?: StringFilter<"ShopOrder"> | string
    paymentProfileId?: StringNullableFilter<"ShopOrder"> | string | null
    skuId?: StringFilter<"ShopOrder"> | string
    quantity?: IntFilter<"ShopOrder"> | number
    customerEmail?: StringFilter<"ShopOrder"> | string
    amountCents?: IntFilter<"ShopOrder"> | number
    channelCode?: StringFilter<"ShopOrder"> | string
    status?: EnumShopOrderStatusFilter<"ShopOrder"> | $Enums.ShopOrderStatus
    novapayOrderId?: StringNullableFilter<"ShopOrder"> | string | null
    novapayStatus?: StringNullableFilter<"ShopOrder"> | string | null
    checkoutUrl?: StringNullableFilter<"ShopOrder"> | string | null
    hostedCheckoutUrl?: StringNullableFilter<"ShopOrder"> | string | null
    failureMessage?: StringNullableFilter<"ShopOrder"> | string | null
    expiresAt?: DateTimeFilter<"ShopOrder"> | Date | string
    paidAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    fulfilledAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    lastSyncedAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    lastNovaCreateResponse?: StringNullableFilter<"ShopOrder"> | string | null
    lastNovaPayload?: StringNullableFilter<"ShopOrder"> | string | null
    createdAt?: DateTimeFilter<"ShopOrder"> | Date | string
    updatedAt?: DateTimeFilter<"ShopOrder"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    paymentProfile?: XOR<PaymentProfileNullableScalarRelationFilter, PaymentProfileWhereInput> | null
    sku?: XOR<ProductSkuScalarRelationFilter, ProductSkuWhereInput>
    cards?: CardItemListRelationFilter
    paymentAttempts?: ShopPaymentAttemptListRelationFilter
    syncTasks?: OrderSyncTaskListRelationFilter
  }, "id" | "orderNo" | "publicToken">

  export type ShopOrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderNo?: SortOrder
    publicToken?: SortOrder
    productId?: SortOrder
    paymentProfileId?: SortOrderInput | SortOrder
    skuId?: SortOrder
    quantity?: SortOrder
    customerEmail?: SortOrder
    amountCents?: SortOrder
    channelCode?: SortOrder
    status?: SortOrder
    novapayOrderId?: SortOrderInput | SortOrder
    novapayStatus?: SortOrderInput | SortOrder
    checkoutUrl?: SortOrderInput | SortOrder
    hostedCheckoutUrl?: SortOrderInput | SortOrder
    failureMessage?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    fulfilledAt?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    lastNovaCreateResponse?: SortOrderInput | SortOrder
    lastNovaPayload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopOrderCountOrderByAggregateInput
    _avg?: ShopOrderAvgOrderByAggregateInput
    _max?: ShopOrderMaxOrderByAggregateInput
    _min?: ShopOrderMinOrderByAggregateInput
    _sum?: ShopOrderSumOrderByAggregateInput
  }

  export type ShopOrderScalarWhereWithAggregatesInput = {
    AND?: ShopOrderScalarWhereWithAggregatesInput | ShopOrderScalarWhereWithAggregatesInput[]
    OR?: ShopOrderScalarWhereWithAggregatesInput[]
    NOT?: ShopOrderScalarWhereWithAggregatesInput | ShopOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShopOrder"> | string
    orderNo?: StringWithAggregatesFilter<"ShopOrder"> | string
    publicToken?: StringWithAggregatesFilter<"ShopOrder"> | string
    productId?: StringWithAggregatesFilter<"ShopOrder"> | string
    paymentProfileId?: StringNullableWithAggregatesFilter<"ShopOrder"> | string | null
    skuId?: StringWithAggregatesFilter<"ShopOrder"> | string
    quantity?: IntWithAggregatesFilter<"ShopOrder"> | number
    customerEmail?: StringWithAggregatesFilter<"ShopOrder"> | string
    amountCents?: IntWithAggregatesFilter<"ShopOrder"> | number
    channelCode?: StringWithAggregatesFilter<"ShopOrder"> | string
    status?: EnumShopOrderStatusWithAggregatesFilter<"ShopOrder"> | $Enums.ShopOrderStatus
    novapayOrderId?: StringNullableWithAggregatesFilter<"ShopOrder"> | string | null
    novapayStatus?: StringNullableWithAggregatesFilter<"ShopOrder"> | string | null
    checkoutUrl?: StringNullableWithAggregatesFilter<"ShopOrder"> | string | null
    hostedCheckoutUrl?: StringNullableWithAggregatesFilter<"ShopOrder"> | string | null
    failureMessage?: StringNullableWithAggregatesFilter<"ShopOrder"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"ShopOrder"> | Date | string
    paidAt?: DateTimeNullableWithAggregatesFilter<"ShopOrder"> | Date | string | null
    fulfilledAt?: DateTimeNullableWithAggregatesFilter<"ShopOrder"> | Date | string | null
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"ShopOrder"> | Date | string | null
    lastNovaCreateResponse?: StringNullableWithAggregatesFilter<"ShopOrder"> | string | null
    lastNovaPayload?: StringNullableWithAggregatesFilter<"ShopOrder"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ShopOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShopOrder"> | Date | string
  }

  export type ShopPaymentAttemptWhereInput = {
    AND?: ShopPaymentAttemptWhereInput | ShopPaymentAttemptWhereInput[]
    OR?: ShopPaymentAttemptWhereInput[]
    NOT?: ShopPaymentAttemptWhereInput | ShopPaymentAttemptWhereInput[]
    id?: StringFilter<"ShopPaymentAttempt"> | string
    shopOrderId?: StringFilter<"ShopPaymentAttempt"> | string
    externalOrderId?: StringFilter<"ShopPaymentAttempt"> | string
    novapayOrderId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    merchantChannelAccountId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    channelCode?: StringFilter<"ShopPaymentAttempt"> | string
    amountCents?: IntFilter<"ShopPaymentAttempt"> | number
    status?: EnumPaymentAttemptStatusFilter<"ShopPaymentAttempt"> | $Enums.PaymentAttemptStatus
    checkoutUrl?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    hostedCheckoutUrl?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    expiresAt?: DateTimeNullableFilter<"ShopPaymentAttempt"> | Date | string | null
    callbackEventId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    traceId?: StringFilter<"ShopPaymentAttempt"> | string
    createRequestPayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    createResponsePayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    lastRemotePayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    lastSyncedAt?: DateTimeNullableFilter<"ShopPaymentAttempt"> | Date | string | null
    createdAt?: DateTimeFilter<"ShopPaymentAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"ShopPaymentAttempt"> | Date | string
    shopOrder?: XOR<ShopOrderScalarRelationFilter, ShopOrderWhereInput>
    syncTasks?: OrderSyncTaskListRelationFilter
  }

  export type ShopPaymentAttemptOrderByWithRelationInput = {
    id?: SortOrder
    shopOrderId?: SortOrder
    externalOrderId?: SortOrder
    novapayOrderId?: SortOrderInput | SortOrder
    merchantChannelAccountId?: SortOrderInput | SortOrder
    channelCode?: SortOrder
    amountCents?: SortOrder
    status?: SortOrder
    checkoutUrl?: SortOrderInput | SortOrder
    hostedCheckoutUrl?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    callbackEventId?: SortOrderInput | SortOrder
    traceId?: SortOrder
    createRequestPayload?: SortOrderInput | SortOrder
    createResponsePayload?: SortOrderInput | SortOrder
    lastRemotePayload?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shopOrder?: ShopOrderOrderByWithRelationInput
    syncTasks?: OrderSyncTaskOrderByRelationAggregateInput
  }

  export type ShopPaymentAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalOrderId?: string
    AND?: ShopPaymentAttemptWhereInput | ShopPaymentAttemptWhereInput[]
    OR?: ShopPaymentAttemptWhereInput[]
    NOT?: ShopPaymentAttemptWhereInput | ShopPaymentAttemptWhereInput[]
    shopOrderId?: StringFilter<"ShopPaymentAttempt"> | string
    novapayOrderId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    merchantChannelAccountId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    channelCode?: StringFilter<"ShopPaymentAttempt"> | string
    amountCents?: IntFilter<"ShopPaymentAttempt"> | number
    status?: EnumPaymentAttemptStatusFilter<"ShopPaymentAttempt"> | $Enums.PaymentAttemptStatus
    checkoutUrl?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    hostedCheckoutUrl?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    expiresAt?: DateTimeNullableFilter<"ShopPaymentAttempt"> | Date | string | null
    callbackEventId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    traceId?: StringFilter<"ShopPaymentAttempt"> | string
    createRequestPayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    createResponsePayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    lastRemotePayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    lastSyncedAt?: DateTimeNullableFilter<"ShopPaymentAttempt"> | Date | string | null
    createdAt?: DateTimeFilter<"ShopPaymentAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"ShopPaymentAttempt"> | Date | string
    shopOrder?: XOR<ShopOrderScalarRelationFilter, ShopOrderWhereInput>
    syncTasks?: OrderSyncTaskListRelationFilter
  }, "id" | "externalOrderId">

  export type ShopPaymentAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    shopOrderId?: SortOrder
    externalOrderId?: SortOrder
    novapayOrderId?: SortOrderInput | SortOrder
    merchantChannelAccountId?: SortOrderInput | SortOrder
    channelCode?: SortOrder
    amountCents?: SortOrder
    status?: SortOrder
    checkoutUrl?: SortOrderInput | SortOrder
    hostedCheckoutUrl?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    callbackEventId?: SortOrderInput | SortOrder
    traceId?: SortOrder
    createRequestPayload?: SortOrderInput | SortOrder
    createResponsePayload?: SortOrderInput | SortOrder
    lastRemotePayload?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopPaymentAttemptCountOrderByAggregateInput
    _avg?: ShopPaymentAttemptAvgOrderByAggregateInput
    _max?: ShopPaymentAttemptMaxOrderByAggregateInput
    _min?: ShopPaymentAttemptMinOrderByAggregateInput
    _sum?: ShopPaymentAttemptSumOrderByAggregateInput
  }

  export type ShopPaymentAttemptScalarWhereWithAggregatesInput = {
    AND?: ShopPaymentAttemptScalarWhereWithAggregatesInput | ShopPaymentAttemptScalarWhereWithAggregatesInput[]
    OR?: ShopPaymentAttemptScalarWhereWithAggregatesInput[]
    NOT?: ShopPaymentAttemptScalarWhereWithAggregatesInput | ShopPaymentAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShopPaymentAttempt"> | string
    shopOrderId?: StringWithAggregatesFilter<"ShopPaymentAttempt"> | string
    externalOrderId?: StringWithAggregatesFilter<"ShopPaymentAttempt"> | string
    novapayOrderId?: StringNullableWithAggregatesFilter<"ShopPaymentAttempt"> | string | null
    merchantChannelAccountId?: StringNullableWithAggregatesFilter<"ShopPaymentAttempt"> | string | null
    channelCode?: StringWithAggregatesFilter<"ShopPaymentAttempt"> | string
    amountCents?: IntWithAggregatesFilter<"ShopPaymentAttempt"> | number
    status?: EnumPaymentAttemptStatusWithAggregatesFilter<"ShopPaymentAttempt"> | $Enums.PaymentAttemptStatus
    checkoutUrl?: StringNullableWithAggregatesFilter<"ShopPaymentAttempt"> | string | null
    hostedCheckoutUrl?: StringNullableWithAggregatesFilter<"ShopPaymentAttempt"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ShopPaymentAttempt"> | Date | string | null
    callbackEventId?: StringNullableWithAggregatesFilter<"ShopPaymentAttempt"> | string | null
    traceId?: StringWithAggregatesFilter<"ShopPaymentAttempt"> | string
    createRequestPayload?: StringNullableWithAggregatesFilter<"ShopPaymentAttempt"> | string | null
    createResponsePayload?: StringNullableWithAggregatesFilter<"ShopPaymentAttempt"> | string | null
    lastRemotePayload?: StringNullableWithAggregatesFilter<"ShopPaymentAttempt"> | string | null
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"ShopPaymentAttempt"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ShopPaymentAttempt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShopPaymentAttempt"> | Date | string
  }

  export type WebhookEventLogWhereInput = {
    AND?: WebhookEventLogWhereInput | WebhookEventLogWhereInput[]
    OR?: WebhookEventLogWhereInput[]
    NOT?: WebhookEventLogWhereInput | WebhookEventLogWhereInput[]
    id?: StringFilter<"WebhookEventLog"> | string
    provider?: StringFilter<"WebhookEventLog"> | string
    externalEventId?: StringFilter<"WebhookEventLog"> | string
    externalOrderId?: StringNullableFilter<"WebhookEventLog"> | string | null
    eventType?: StringFilter<"WebhookEventLog"> | string
    traceId?: StringNullableFilter<"WebhookEventLog"> | string | null
    signatureValid?: BoolFilter<"WebhookEventLog"> | boolean
    requestHeaders?: StringNullableFilter<"WebhookEventLog"> | string | null
    requestBody?: StringFilter<"WebhookEventLog"> | string
    processingStatus?: StringFilter<"WebhookEventLog"> | string
    processingError?: StringNullableFilter<"WebhookEventLog"> | string | null
    createdAt?: DateTimeFilter<"WebhookEventLog"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookEventLog"> | Date | string
  }

  export type WebhookEventLogOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    externalEventId?: SortOrder
    externalOrderId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    traceId?: SortOrderInput | SortOrder
    signatureValid?: SortOrder
    requestHeaders?: SortOrderInput | SortOrder
    requestBody?: SortOrder
    processingStatus?: SortOrder
    processingError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEventLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_externalEventId?: WebhookEventLogProviderExternalEventIdCompoundUniqueInput
    AND?: WebhookEventLogWhereInput | WebhookEventLogWhereInput[]
    OR?: WebhookEventLogWhereInput[]
    NOT?: WebhookEventLogWhereInput | WebhookEventLogWhereInput[]
    provider?: StringFilter<"WebhookEventLog"> | string
    externalEventId?: StringFilter<"WebhookEventLog"> | string
    externalOrderId?: StringNullableFilter<"WebhookEventLog"> | string | null
    eventType?: StringFilter<"WebhookEventLog"> | string
    traceId?: StringNullableFilter<"WebhookEventLog"> | string | null
    signatureValid?: BoolFilter<"WebhookEventLog"> | boolean
    requestHeaders?: StringNullableFilter<"WebhookEventLog"> | string | null
    requestBody?: StringFilter<"WebhookEventLog"> | string
    processingStatus?: StringFilter<"WebhookEventLog"> | string
    processingError?: StringNullableFilter<"WebhookEventLog"> | string | null
    createdAt?: DateTimeFilter<"WebhookEventLog"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookEventLog"> | Date | string
  }, "id" | "provider_externalEventId">

  export type WebhookEventLogOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    externalEventId?: SortOrder
    externalOrderId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    traceId?: SortOrderInput | SortOrder
    signatureValid?: SortOrder
    requestHeaders?: SortOrderInput | SortOrder
    requestBody?: SortOrder
    processingStatus?: SortOrder
    processingError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WebhookEventLogCountOrderByAggregateInput
    _max?: WebhookEventLogMaxOrderByAggregateInput
    _min?: WebhookEventLogMinOrderByAggregateInput
  }

  export type WebhookEventLogScalarWhereWithAggregatesInput = {
    AND?: WebhookEventLogScalarWhereWithAggregatesInput | WebhookEventLogScalarWhereWithAggregatesInput[]
    OR?: WebhookEventLogScalarWhereWithAggregatesInput[]
    NOT?: WebhookEventLogScalarWhereWithAggregatesInput | WebhookEventLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookEventLog"> | string
    provider?: StringWithAggregatesFilter<"WebhookEventLog"> | string
    externalEventId?: StringWithAggregatesFilter<"WebhookEventLog"> | string
    externalOrderId?: StringNullableWithAggregatesFilter<"WebhookEventLog"> | string | null
    eventType?: StringWithAggregatesFilter<"WebhookEventLog"> | string
    traceId?: StringNullableWithAggregatesFilter<"WebhookEventLog"> | string | null
    signatureValid?: BoolWithAggregatesFilter<"WebhookEventLog"> | boolean
    requestHeaders?: StringNullableWithAggregatesFilter<"WebhookEventLog"> | string | null
    requestBody?: StringWithAggregatesFilter<"WebhookEventLog"> | string
    processingStatus?: StringWithAggregatesFilter<"WebhookEventLog"> | string
    processingError?: StringNullableWithAggregatesFilter<"WebhookEventLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WebhookEventLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WebhookEventLog"> | Date | string
  }

  export type OrderSyncTaskWhereInput = {
    AND?: OrderSyncTaskWhereInput | OrderSyncTaskWhereInput[]
    OR?: OrderSyncTaskWhereInput[]
    NOT?: OrderSyncTaskWhereInput | OrderSyncTaskWhereInput[]
    id?: StringFilter<"OrderSyncTask"> | string
    taskType?: StringFilter<"OrderSyncTask"> | string
    shopOrderId?: StringNullableFilter<"OrderSyncTask"> | string | null
    paymentAttemptId?: StringNullableFilter<"OrderSyncTask"> | string | null
    status?: EnumSyncTaskStatusFilter<"OrderSyncTask"> | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFilter<"OrderSyncTask"> | Date | string
    startedAt?: DateTimeNullableFilter<"OrderSyncTask"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"OrderSyncTask"> | Date | string | null
    retryCount?: IntFilter<"OrderSyncTask"> | number
    lastError?: StringNullableFilter<"OrderSyncTask"> | string | null
    payload?: StringNullableFilter<"OrderSyncTask"> | string | null
    createdAt?: DateTimeFilter<"OrderSyncTask"> | Date | string
    shopOrder?: XOR<ShopOrderNullableScalarRelationFilter, ShopOrderWhereInput> | null
    paymentAttempt?: XOR<ShopPaymentAttemptNullableScalarRelationFilter, ShopPaymentAttemptWhereInput> | null
  }

  export type OrderSyncTaskOrderByWithRelationInput = {
    id?: SortOrder
    taskType?: SortOrder
    shopOrderId?: SortOrderInput | SortOrder
    paymentAttemptId?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    lastError?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    shopOrder?: ShopOrderOrderByWithRelationInput
    paymentAttempt?: ShopPaymentAttemptOrderByWithRelationInput
  }

  export type OrderSyncTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderSyncTaskWhereInput | OrderSyncTaskWhereInput[]
    OR?: OrderSyncTaskWhereInput[]
    NOT?: OrderSyncTaskWhereInput | OrderSyncTaskWhereInput[]
    taskType?: StringFilter<"OrderSyncTask"> | string
    shopOrderId?: StringNullableFilter<"OrderSyncTask"> | string | null
    paymentAttemptId?: StringNullableFilter<"OrderSyncTask"> | string | null
    status?: EnumSyncTaskStatusFilter<"OrderSyncTask"> | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFilter<"OrderSyncTask"> | Date | string
    startedAt?: DateTimeNullableFilter<"OrderSyncTask"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"OrderSyncTask"> | Date | string | null
    retryCount?: IntFilter<"OrderSyncTask"> | number
    lastError?: StringNullableFilter<"OrderSyncTask"> | string | null
    payload?: StringNullableFilter<"OrderSyncTask"> | string | null
    createdAt?: DateTimeFilter<"OrderSyncTask"> | Date | string
    shopOrder?: XOR<ShopOrderNullableScalarRelationFilter, ShopOrderWhereInput> | null
    paymentAttempt?: XOR<ShopPaymentAttemptNullableScalarRelationFilter, ShopPaymentAttemptWhereInput> | null
  }, "id">

  export type OrderSyncTaskOrderByWithAggregationInput = {
    id?: SortOrder
    taskType?: SortOrder
    shopOrderId?: SortOrderInput | SortOrder
    paymentAttemptId?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    lastError?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OrderSyncTaskCountOrderByAggregateInput
    _avg?: OrderSyncTaskAvgOrderByAggregateInput
    _max?: OrderSyncTaskMaxOrderByAggregateInput
    _min?: OrderSyncTaskMinOrderByAggregateInput
    _sum?: OrderSyncTaskSumOrderByAggregateInput
  }

  export type OrderSyncTaskScalarWhereWithAggregatesInput = {
    AND?: OrderSyncTaskScalarWhereWithAggregatesInput | OrderSyncTaskScalarWhereWithAggregatesInput[]
    OR?: OrderSyncTaskScalarWhereWithAggregatesInput[]
    NOT?: OrderSyncTaskScalarWhereWithAggregatesInput | OrderSyncTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderSyncTask"> | string
    taskType?: StringWithAggregatesFilter<"OrderSyncTask"> | string
    shopOrderId?: StringNullableWithAggregatesFilter<"OrderSyncTask"> | string | null
    paymentAttemptId?: StringNullableWithAggregatesFilter<"OrderSyncTask"> | string | null
    status?: EnumSyncTaskStatusWithAggregatesFilter<"OrderSyncTask"> | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeWithAggregatesFilter<"OrderSyncTask"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"OrderSyncTask"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"OrderSyncTask"> | Date | string | null
    retryCount?: IntWithAggregatesFilter<"OrderSyncTask"> | number
    lastError?: StringNullableWithAggregatesFilter<"OrderSyncTask"> | string | null
    payload?: StringNullableWithAggregatesFilter<"OrderSyncTask"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrderSyncTask"> | Date | string
  }

  export type MerchantAccountCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: string | null
    storeAnnouncementBody?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProfile?: PaymentProfileCreateNestedOneWithoutOwnerInput
  }

  export type MerchantAccountUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: string | null
    storeAnnouncementBody?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProfile?: PaymentProfileUncheckedCreateNestedOneWithoutOwnerInput
  }

  export type MerchantAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementEnabled?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    storeAnnouncementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProfile?: PaymentProfileUpdateOneWithoutOwnerNestedInput
  }

  export type MerchantAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementEnabled?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    storeAnnouncementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProfile?: PaymentProfileUncheckedUpdateOneWithoutOwnerNestedInput
  }

  export type MerchantAccountCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: string | null
    storeAnnouncementBody?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementEnabled?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    storeAnnouncementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementEnabled?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    storeAnnouncementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformStorefrontSettingsCreateInput = {
    id?: string
    announcementEnabled?: boolean
    announcementTitle?: string | null
    announcementBody?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformStorefrontSettingsUncheckedCreateInput = {
    id?: string
    announcementEnabled?: boolean
    announcementTitle?: string | null
    announcementBody?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformStorefrontSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementEnabled?: BoolFieldUpdateOperationsInput | boolean
    announcementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    announcementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformStorefrontSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementEnabled?: BoolFieldUpdateOperationsInput | boolean
    announcementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    announcementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformStorefrontSettingsCreateManyInput = {
    id?: string
    announcementEnabled?: boolean
    announcementTitle?: string | null
    announcementBody?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformStorefrontSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementEnabled?: BoolFieldUpdateOperationsInput | boolean
    announcementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    announcementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformStorefrontSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementEnabled?: BoolFieldUpdateOperationsInput | boolean
    announcementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    announcementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProfile?: PaymentProfileCreateNestedOneWithoutProductsInput
    skus?: ProductSkuCreateNestedManyWithoutProductInput
    cards?: CardItemCreateNestedManyWithoutProductInput
    orders?: ShopOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    paymentProfileId?: string | null
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: ProductSkuUncheckedCreateNestedManyWithoutProductInput
    cards?: CardItemUncheckedCreateNestedManyWithoutProductInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProfile?: PaymentProfileUpdateOneWithoutProductsNestedInput
    skus?: ProductSkuUpdateManyWithoutProductNestedInput
    cards?: CardItemUpdateManyWithoutProductNestedInput
    orders?: ShopOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: ProductSkuUncheckedUpdateManyWithoutProductNestedInput
    cards?: CardItemUncheckedUpdateManyWithoutProductNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    paymentProfileId?: string | null
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSkuCreateInput = {
    id?: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutSkusInput
    cards?: CardItemCreateNestedManyWithoutSkuInput
    orders?: ShopOrderCreateNestedManyWithoutSkuInput
  }

  export type ProductSkuUncheckedCreateInput = {
    id?: string
    productId: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutSkuInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutSkuInput
  }

  export type ProductSkuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSkusNestedInput
    cards?: CardItemUpdateManyWithoutSkuNestedInput
    orders?: ShopOrderUpdateManyWithoutSkuNestedInput
  }

  export type ProductSkuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutSkuNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutSkuNestedInput
  }

  export type ProductSkuCreateManyInput = {
    id?: string
    productId: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductSkuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSkuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProfileCreateInput = {
    id?: string
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: MerchantAccountCreateNestedOneWithoutPaymentProfileInput
    products?: ProductCreateNestedManyWithoutPaymentProfileInput
    orders?: ShopOrderCreateNestedManyWithoutPaymentProfileInput
    revisions?: PaymentProfileRevisionCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileUncheckedCreateInput = {
    id?: string
    ownerId?: string | null
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutPaymentProfileInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutPaymentProfileInput
    revisions?: PaymentProfileRevisionUncheckedCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: MerchantAccountUpdateOneWithoutPaymentProfileNestedInput
    products?: ProductUpdateManyWithoutPaymentProfileNestedInput
    orders?: ShopOrderUpdateManyWithoutPaymentProfileNestedInput
    revisions?: PaymentProfileRevisionUpdateManyWithoutPaymentProfileNestedInput
  }

  export type PaymentProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutPaymentProfileNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutPaymentProfileNestedInput
    revisions?: PaymentProfileRevisionUncheckedUpdateManyWithoutPaymentProfileNestedInput
  }

  export type PaymentProfileCreateManyInput = {
    id?: string
    ownerId?: string | null
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ControlAuditLogCreateInput = {
    id?: string
    scope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    merchantAccountId?: string | null
    paymentProfileId?: string | null
    actionType: string
    riskLevel: string
    outcome?: string
    targetType: string
    targetId?: string | null
    targetLabel: string
    summary: string
    detail?: string | null
    payload?: string | null
    reviewStatus?: string
    reviewerType?: string | null
    reviewerId?: string | null
    reviewerLabel?: string | null
    reviewNote?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ControlAuditLogUncheckedCreateInput = {
    id?: string
    scope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    merchantAccountId?: string | null
    paymentProfileId?: string | null
    actionType: string
    riskLevel: string
    outcome?: string
    targetType: string
    targetId?: string | null
    targetLabel: string
    summary: string
    detail?: string | null
    payload?: string | null
    reviewStatus?: string
    reviewerType?: string | null
    reviewerId?: string | null
    reviewerLabel?: string | null
    reviewNote?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ControlAuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    merchantAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    outcome?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    targetLabel?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewerType?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerLabel?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ControlAuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    merchantAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    outcome?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    targetLabel?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewerType?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerLabel?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ControlAuditLogCreateManyInput = {
    id?: string
    scope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    merchantAccountId?: string | null
    paymentProfileId?: string | null
    actionType: string
    riskLevel: string
    outcome?: string
    targetType: string
    targetId?: string | null
    targetLabel: string
    summary: string
    detail?: string | null
    payload?: string | null
    reviewStatus?: string
    reviewerType?: string | null
    reviewerId?: string | null
    reviewerLabel?: string | null
    reviewNote?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ControlAuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    merchantAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    outcome?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    targetLabel?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewerType?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerLabel?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ControlAuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    merchantAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    outcome?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    targetLabel?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewerType?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewerLabel?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProfileRevisionCreateInput = {
    id?: string
    version: number
    sourceScope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    changeType: string
    summary: string
    snapshot: string
    createdAt?: Date | string
    paymentProfile: PaymentProfileCreateNestedOneWithoutRevisionsInput
  }

  export type PaymentProfileRevisionUncheckedCreateInput = {
    id?: string
    paymentProfileId: string
    version: number
    sourceScope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    changeType: string
    summary: string
    snapshot: string
    createdAt?: Date | string
  }

  export type PaymentProfileRevisionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    sourceScope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    changeType?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    snapshot?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProfile?: PaymentProfileUpdateOneRequiredWithoutRevisionsNestedInput
  }

  export type PaymentProfileRevisionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    sourceScope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    changeType?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    snapshot?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProfileRevisionCreateManyInput = {
    id?: string
    paymentProfileId: string
    version: number
    sourceScope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    changeType: string
    summary: string
    snapshot: string
    createdAt?: Date | string
  }

  export type PaymentProfileRevisionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    sourceScope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    changeType?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    snapshot?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProfileRevisionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    sourceScope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    changeType?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    snapshot?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemCreateInput = {
    id?: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutCardsInput
    sku: ProductSkuCreateNestedOneWithoutCardsInput
    order?: ShopOrderCreateNestedOneWithoutCardsInput
  }

  export type CardItemUncheckedCreateInput = {
    id?: string
    productId: string
    skuId: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    orderId?: string | null
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutCardsNestedInput
    sku?: ProductSkuUpdateOneRequiredWithoutCardsNestedInput
    order?: ShopOrderUpdateOneWithoutCardsNestedInput
  }

  export type CardItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemCreateManyInput = {
    id?: string
    productId: string
    skuId: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    orderId?: string | null
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopOrderCreateInput = {
    id?: string
    orderNo: string
    publicToken: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutOrdersInput
    paymentProfile?: PaymentProfileCreateNestedOneWithoutOrdersInput
    sku: ProductSkuCreateNestedOneWithoutOrdersInput
    cards?: CardItemCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderUncheckedCreateInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    paymentProfileId?: string | null
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptUncheckedCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskUncheckedCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    paymentProfile?: PaymentProfileUpdateOneWithoutOrdersNestedInput
    sku?: ProductSkuUpdateOneRequiredWithoutOrdersNestedInput
    cards?: CardItemUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUncheckedUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderCreateManyInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    paymentProfileId?: string | null
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPaymentAttemptCreateInput = {
    id?: string
    externalOrderId: string
    novapayOrderId?: string | null
    merchantChannelAccountId?: string | null
    channelCode: string
    amountCents: number
    status?: $Enums.PaymentAttemptStatus
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    expiresAt?: Date | string | null
    callbackEventId?: string | null
    traceId: string
    createRequestPayload?: string | null
    createResponsePayload?: string | null
    lastRemotePayload?: string | null
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shopOrder: ShopOrderCreateNestedOneWithoutPaymentAttemptsInput
    syncTasks?: OrderSyncTaskCreateNestedManyWithoutPaymentAttemptInput
  }

  export type ShopPaymentAttemptUncheckedCreateInput = {
    id?: string
    shopOrderId: string
    externalOrderId: string
    novapayOrderId?: string | null
    merchantChannelAccountId?: string | null
    channelCode: string
    amountCents: number
    status?: $Enums.PaymentAttemptStatus
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    expiresAt?: Date | string | null
    callbackEventId?: string | null
    traceId: string
    createRequestPayload?: string | null
    createResponsePayload?: string | null
    lastRemotePayload?: string | null
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncTasks?: OrderSyncTaskUncheckedCreateNestedManyWithoutPaymentAttemptInput
  }

  export type ShopPaymentAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shopOrder?: ShopOrderUpdateOneRequiredWithoutPaymentAttemptsNestedInput
    syncTasks?: OrderSyncTaskUpdateManyWithoutPaymentAttemptNestedInput
  }

  export type ShopPaymentAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopOrderId?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncTasks?: OrderSyncTaskUncheckedUpdateManyWithoutPaymentAttemptNestedInput
  }

  export type ShopPaymentAttemptCreateManyInput = {
    id?: string
    shopOrderId: string
    externalOrderId: string
    novapayOrderId?: string | null
    merchantChannelAccountId?: string | null
    channelCode: string
    amountCents: number
    status?: $Enums.PaymentAttemptStatus
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    expiresAt?: Date | string | null
    callbackEventId?: string | null
    traceId: string
    createRequestPayload?: string | null
    createResponsePayload?: string | null
    lastRemotePayload?: string | null
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopPaymentAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPaymentAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopOrderId?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventLogCreateInput = {
    id?: string
    provider: string
    externalEventId: string
    externalOrderId?: string | null
    eventType: string
    traceId?: string | null
    signatureValid: boolean
    requestHeaders?: string | null
    requestBody: string
    processingStatus: string
    processingError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookEventLogUncheckedCreateInput = {
    id?: string
    provider: string
    externalEventId: string
    externalOrderId?: string | null
    eventType: string
    traceId?: string | null
    signatureValid: boolean
    requestHeaders?: string | null
    requestBody: string
    processingStatus: string
    processingError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookEventLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    externalOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    requestHeaders?: NullableStringFieldUpdateOperationsInput | string | null
    requestBody?: StringFieldUpdateOperationsInput | string
    processingStatus?: StringFieldUpdateOperationsInput | string
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    externalOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    requestHeaders?: NullableStringFieldUpdateOperationsInput | string | null
    requestBody?: StringFieldUpdateOperationsInput | string
    processingStatus?: StringFieldUpdateOperationsInput | string
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventLogCreateManyInput = {
    id?: string
    provider: string
    externalEventId: string
    externalOrderId?: string | null
    eventType: string
    traceId?: string | null
    signatureValid: boolean
    requestHeaders?: string | null
    requestBody: string
    processingStatus: string
    processingError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookEventLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    externalOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    requestHeaders?: NullableStringFieldUpdateOperationsInput | string | null
    requestBody?: StringFieldUpdateOperationsInput | string
    processingStatus?: StringFieldUpdateOperationsInput | string
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    externalOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    requestHeaders?: NullableStringFieldUpdateOperationsInput | string | null
    requestBody?: StringFieldUpdateOperationsInput | string
    processingStatus?: StringFieldUpdateOperationsInput | string
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderSyncTaskCreateInput = {
    id?: string
    taskType: string
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
    shopOrder?: ShopOrderCreateNestedOneWithoutSyncTasksInput
    paymentAttempt?: ShopPaymentAttemptCreateNestedOneWithoutSyncTasksInput
  }

  export type OrderSyncTaskUncheckedCreateInput = {
    id?: string
    taskType: string
    shopOrderId?: string | null
    paymentAttemptId?: string | null
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
  }

  export type OrderSyncTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shopOrder?: ShopOrderUpdateOneWithoutSyncTasksNestedInput
    paymentAttempt?: ShopPaymentAttemptUpdateOneWithoutSyncTasksNestedInput
  }

  export type OrderSyncTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    shopOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAttemptId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderSyncTaskCreateManyInput = {
    id?: string
    taskType: string
    shopOrderId?: string | null
    paymentAttemptId?: string | null
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
  }

  export type OrderSyncTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderSyncTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    shopOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAttemptId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PaymentProfileNullableScalarRelationFilter = {
    is?: PaymentProfileWhereInput | null
    isNot?: PaymentProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MerchantAccountCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    storeAnnouncementEnabled?: SortOrder
    storeAnnouncementTitle?: SortOrder
    storeAnnouncementBody?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerchantAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    storeAnnouncementEnabled?: SortOrder
    storeAnnouncementTitle?: SortOrder
    storeAnnouncementBody?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerchantAccountMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    storeAnnouncementEnabled?: SortOrder
    storeAnnouncementTitle?: SortOrder
    storeAnnouncementBody?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PlatformStorefrontSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    announcementEnabled?: SortOrder
    announcementTitle?: SortOrder
    announcementBody?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformStorefrontSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    announcementEnabled?: SortOrder
    announcementTitle?: SortOrder
    announcementBody?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformStorefrontSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    announcementEnabled?: SortOrder
    announcementTitle?: SortOrder
    announcementBody?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumProductSaleModeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductSaleMode | EnumProductSaleModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductSaleMode[] | ListEnumProductSaleModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductSaleMode[] | ListEnumProductSaleModeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductSaleModeFilter<$PrismaModel> | $Enums.ProductSaleMode
  }

  export type EnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type ProductSkuListRelationFilter = {
    every?: ProductSkuWhereInput
    some?: ProductSkuWhereInput
    none?: ProductSkuWhereInput
  }

  export type CardItemListRelationFilter = {
    every?: CardItemWhereInput
    some?: CardItemWhereInput
    none?: CardItemWhereInput
  }

  export type ShopOrderListRelationFilter = {
    every?: ShopOrderWhereInput
    some?: ShopOrderWhereInput
    none?: ShopOrderWhereInput
  }

  export type ProductSkuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CardItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShopOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    description?: SortOrder
    priceCents?: SortOrder
    saleMode?: SortOrder
    paymentProfileId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    priceCents?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    description?: SortOrder
    priceCents?: SortOrder
    saleMode?: SortOrder
    paymentProfileId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    summary?: SortOrder
    description?: SortOrder
    priceCents?: SortOrder
    saleMode?: SortOrder
    paymentProfileId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    priceCents?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumProductSaleModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductSaleMode | EnumProductSaleModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductSaleMode[] | ListEnumProductSaleModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductSaleMode[] | ListEnumProductSaleModeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductSaleModeWithAggregatesFilter<$PrismaModel> | $Enums.ProductSaleMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductSaleModeFilter<$PrismaModel>
    _max?: NestedEnumProductSaleModeFilter<$PrismaModel>
  }

  export type EnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductSkuCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    priceCents?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSkuAvgOrderByAggregateInput = {
    priceCents?: SortOrder
    sortOrder?: SortOrder
  }

  export type ProductSkuMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    priceCents?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSkuMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    summary?: SortOrder
    priceCents?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSkuSumOrderByAggregateInput = {
    priceCents?: SortOrder
    sortOrder?: SortOrder
  }

  export type MerchantAccountNullableScalarRelationFilter = {
    is?: MerchantAccountWhereInput | null
    isNot?: MerchantAccountWhereInput | null
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type PaymentProfileRevisionListRelationFilter = {
    every?: PaymentProfileRevisionWhereInput
    some?: PaymentProfileRevisionWhereInput
    none?: PaymentProfileRevisionWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentProfileRevisionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentProfileCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    merchantCode?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    notifySecret?: SortOrder
    defaultChannelCode?: SortOrder
    enabledChannelCodes?: SortOrder
    isActive?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    merchantCode?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    notifySecret?: SortOrder
    defaultChannelCode?: SortOrder
    enabledChannelCodes?: SortOrder
    isActive?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentProfileMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    merchantCode?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    notifySecret?: SortOrder
    defaultChannelCode?: SortOrder
    enabledChannelCodes?: SortOrder
    isActive?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ControlAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    scope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    actorLabel?: SortOrder
    merchantAccountId?: SortOrder
    paymentProfileId?: SortOrder
    actionType?: SortOrder
    riskLevel?: SortOrder
    outcome?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    targetLabel?: SortOrder
    summary?: SortOrder
    detail?: SortOrder
    payload?: SortOrder
    reviewStatus?: SortOrder
    reviewerType?: SortOrder
    reviewerId?: SortOrder
    reviewerLabel?: SortOrder
    reviewNote?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ControlAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    scope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    actorLabel?: SortOrder
    merchantAccountId?: SortOrder
    paymentProfileId?: SortOrder
    actionType?: SortOrder
    riskLevel?: SortOrder
    outcome?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    targetLabel?: SortOrder
    summary?: SortOrder
    detail?: SortOrder
    payload?: SortOrder
    reviewStatus?: SortOrder
    reviewerType?: SortOrder
    reviewerId?: SortOrder
    reviewerLabel?: SortOrder
    reviewNote?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ControlAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    scope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    actorLabel?: SortOrder
    merchantAccountId?: SortOrder
    paymentProfileId?: SortOrder
    actionType?: SortOrder
    riskLevel?: SortOrder
    outcome?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    targetLabel?: SortOrder
    summary?: SortOrder
    detail?: SortOrder
    payload?: SortOrder
    reviewStatus?: SortOrder
    reviewerType?: SortOrder
    reviewerId?: SortOrder
    reviewerLabel?: SortOrder
    reviewNote?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PaymentProfileScalarRelationFilter = {
    is?: PaymentProfileWhereInput
    isNot?: PaymentProfileWhereInput
  }

  export type PaymentProfileRevisionPaymentProfileIdVersionCompoundUniqueInput = {
    paymentProfileId: string
    version: number
  }

  export type PaymentProfileRevisionCountOrderByAggregateInput = {
    id?: SortOrder
    paymentProfileId?: SortOrder
    version?: SortOrder
    sourceScope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    actorLabel?: SortOrder
    changeType?: SortOrder
    summary?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentProfileRevisionAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type PaymentProfileRevisionMaxOrderByAggregateInput = {
    id?: SortOrder
    paymentProfileId?: SortOrder
    version?: SortOrder
    sourceScope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    actorLabel?: SortOrder
    changeType?: SortOrder
    summary?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentProfileRevisionMinOrderByAggregateInput = {
    id?: SortOrder
    paymentProfileId?: SortOrder
    version?: SortOrder
    sourceScope?: SortOrder
    actorType?: SortOrder
    actorId?: SortOrder
    actorLabel?: SortOrder
    changeType?: SortOrder
    summary?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentProfileRevisionSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type EnumCardItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CardItemStatus | EnumCardItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CardItemStatus[] | ListEnumCardItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CardItemStatus[] | ListEnumCardItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCardItemStatusFilter<$PrismaModel> | $Enums.CardItemStatus
  }

  export type ProductSkuScalarRelationFilter = {
    is?: ProductSkuWhereInput
    isNot?: ProductSkuWhereInput
  }

  export type ShopOrderNullableScalarRelationFilter = {
    is?: ShopOrderWhereInput | null
    isNot?: ShopOrderWhereInput | null
  }

  export type CardItemCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    skuId?: SortOrder
    batchName?: SortOrder
    secret?: SortOrder
    status?: SortOrder
    orderId?: SortOrder
    reservedAt?: SortOrder
    soldAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardItemMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    skuId?: SortOrder
    batchName?: SortOrder
    secret?: SortOrder
    status?: SortOrder
    orderId?: SortOrder
    reservedAt?: SortOrder
    soldAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardItemMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    skuId?: SortOrder
    batchName?: SortOrder
    secret?: SortOrder
    status?: SortOrder
    orderId?: SortOrder
    reservedAt?: SortOrder
    soldAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCardItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CardItemStatus | EnumCardItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CardItemStatus[] | ListEnumCardItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CardItemStatus[] | ListEnumCardItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCardItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.CardItemStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCardItemStatusFilter<$PrismaModel>
    _max?: NestedEnumCardItemStatusFilter<$PrismaModel>
  }

  export type EnumShopOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShopOrderStatus | EnumShopOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShopOrderStatus[] | ListEnumShopOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShopOrderStatus[] | ListEnumShopOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShopOrderStatusFilter<$PrismaModel> | $Enums.ShopOrderStatus
  }

  export type ShopPaymentAttemptListRelationFilter = {
    every?: ShopPaymentAttemptWhereInput
    some?: ShopPaymentAttemptWhereInput
    none?: ShopPaymentAttemptWhereInput
  }

  export type OrderSyncTaskListRelationFilter = {
    every?: OrderSyncTaskWhereInput
    some?: OrderSyncTaskWhereInput
    none?: OrderSyncTaskWhereInput
  }

  export type ShopPaymentAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderSyncTaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShopOrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderNo?: SortOrder
    publicToken?: SortOrder
    productId?: SortOrder
    paymentProfileId?: SortOrder
    skuId?: SortOrder
    quantity?: SortOrder
    customerEmail?: SortOrder
    amountCents?: SortOrder
    channelCode?: SortOrder
    status?: SortOrder
    novapayOrderId?: SortOrder
    novapayStatus?: SortOrder
    checkoutUrl?: SortOrder
    hostedCheckoutUrl?: SortOrder
    failureMessage?: SortOrder
    expiresAt?: SortOrder
    paidAt?: SortOrder
    fulfilledAt?: SortOrder
    lastSyncedAt?: SortOrder
    lastNovaCreateResponse?: SortOrder
    lastNovaPayload?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopOrderAvgOrderByAggregateInput = {
    quantity?: SortOrder
    amountCents?: SortOrder
  }

  export type ShopOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNo?: SortOrder
    publicToken?: SortOrder
    productId?: SortOrder
    paymentProfileId?: SortOrder
    skuId?: SortOrder
    quantity?: SortOrder
    customerEmail?: SortOrder
    amountCents?: SortOrder
    channelCode?: SortOrder
    status?: SortOrder
    novapayOrderId?: SortOrder
    novapayStatus?: SortOrder
    checkoutUrl?: SortOrder
    hostedCheckoutUrl?: SortOrder
    failureMessage?: SortOrder
    expiresAt?: SortOrder
    paidAt?: SortOrder
    fulfilledAt?: SortOrder
    lastSyncedAt?: SortOrder
    lastNovaCreateResponse?: SortOrder
    lastNovaPayload?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopOrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderNo?: SortOrder
    publicToken?: SortOrder
    productId?: SortOrder
    paymentProfileId?: SortOrder
    skuId?: SortOrder
    quantity?: SortOrder
    customerEmail?: SortOrder
    amountCents?: SortOrder
    channelCode?: SortOrder
    status?: SortOrder
    novapayOrderId?: SortOrder
    novapayStatus?: SortOrder
    checkoutUrl?: SortOrder
    hostedCheckoutUrl?: SortOrder
    failureMessage?: SortOrder
    expiresAt?: SortOrder
    paidAt?: SortOrder
    fulfilledAt?: SortOrder
    lastSyncedAt?: SortOrder
    lastNovaCreateResponse?: SortOrder
    lastNovaPayload?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopOrderSumOrderByAggregateInput = {
    quantity?: SortOrder
    amountCents?: SortOrder
  }

  export type EnumShopOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShopOrderStatus | EnumShopOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShopOrderStatus[] | ListEnumShopOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShopOrderStatus[] | ListEnumShopOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShopOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShopOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShopOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumShopOrderStatusFilter<$PrismaModel>
  }

  export type EnumPaymentAttemptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentAttemptStatus | EnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentAttemptStatus[] | ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentAttemptStatus[] | ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentAttemptStatusFilter<$PrismaModel> | $Enums.PaymentAttemptStatus
  }

  export type ShopOrderScalarRelationFilter = {
    is?: ShopOrderWhereInput
    isNot?: ShopOrderWhereInput
  }

  export type ShopPaymentAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    shopOrderId?: SortOrder
    externalOrderId?: SortOrder
    novapayOrderId?: SortOrder
    merchantChannelAccountId?: SortOrder
    channelCode?: SortOrder
    amountCents?: SortOrder
    status?: SortOrder
    checkoutUrl?: SortOrder
    hostedCheckoutUrl?: SortOrder
    expiresAt?: SortOrder
    callbackEventId?: SortOrder
    traceId?: SortOrder
    createRequestPayload?: SortOrder
    createResponsePayload?: SortOrder
    lastRemotePayload?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopPaymentAttemptAvgOrderByAggregateInput = {
    amountCents?: SortOrder
  }

  export type ShopPaymentAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    shopOrderId?: SortOrder
    externalOrderId?: SortOrder
    novapayOrderId?: SortOrder
    merchantChannelAccountId?: SortOrder
    channelCode?: SortOrder
    amountCents?: SortOrder
    status?: SortOrder
    checkoutUrl?: SortOrder
    hostedCheckoutUrl?: SortOrder
    expiresAt?: SortOrder
    callbackEventId?: SortOrder
    traceId?: SortOrder
    createRequestPayload?: SortOrder
    createResponsePayload?: SortOrder
    lastRemotePayload?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopPaymentAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    shopOrderId?: SortOrder
    externalOrderId?: SortOrder
    novapayOrderId?: SortOrder
    merchantChannelAccountId?: SortOrder
    channelCode?: SortOrder
    amountCents?: SortOrder
    status?: SortOrder
    checkoutUrl?: SortOrder
    hostedCheckoutUrl?: SortOrder
    expiresAt?: SortOrder
    callbackEventId?: SortOrder
    traceId?: SortOrder
    createRequestPayload?: SortOrder
    createResponsePayload?: SortOrder
    lastRemotePayload?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopPaymentAttemptSumOrderByAggregateInput = {
    amountCents?: SortOrder
  }

  export type EnumPaymentAttemptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentAttemptStatus | EnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentAttemptStatus[] | ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentAttemptStatus[] | ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentAttemptStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentAttemptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentAttemptStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentAttemptStatusFilter<$PrismaModel>
  }

  export type WebhookEventLogProviderExternalEventIdCompoundUniqueInput = {
    provider: string
    externalEventId: string
  }

  export type WebhookEventLogCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    externalEventId?: SortOrder
    externalOrderId?: SortOrder
    eventType?: SortOrder
    traceId?: SortOrder
    signatureValid?: SortOrder
    requestHeaders?: SortOrder
    requestBody?: SortOrder
    processingStatus?: SortOrder
    processingError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEventLogMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    externalEventId?: SortOrder
    externalOrderId?: SortOrder
    eventType?: SortOrder
    traceId?: SortOrder
    signatureValid?: SortOrder
    requestHeaders?: SortOrder
    requestBody?: SortOrder
    processingStatus?: SortOrder
    processingError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEventLogMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    externalEventId?: SortOrder
    externalOrderId?: SortOrder
    eventType?: SortOrder
    traceId?: SortOrder
    signatureValid?: SortOrder
    requestHeaders?: SortOrder
    requestBody?: SortOrder
    processingStatus?: SortOrder
    processingError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSyncTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncTaskStatus | EnumSyncTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncTaskStatus[] | ListEnumSyncTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncTaskStatus[] | ListEnumSyncTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncTaskStatusFilter<$PrismaModel> | $Enums.SyncTaskStatus
  }

  export type ShopPaymentAttemptNullableScalarRelationFilter = {
    is?: ShopPaymentAttemptWhereInput | null
    isNot?: ShopPaymentAttemptWhereInput | null
  }

  export type OrderSyncTaskCountOrderByAggregateInput = {
    id?: SortOrder
    taskType?: SortOrder
    shopOrderId?: SortOrder
    paymentAttemptId?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    retryCount?: SortOrder
    lastError?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderSyncTaskAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type OrderSyncTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    taskType?: SortOrder
    shopOrderId?: SortOrder
    paymentAttemptId?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    retryCount?: SortOrder
    lastError?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderSyncTaskMinOrderByAggregateInput = {
    id?: SortOrder
    taskType?: SortOrder
    shopOrderId?: SortOrder
    paymentAttemptId?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    retryCount?: SortOrder
    lastError?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderSyncTaskSumOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type EnumSyncTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncTaskStatus | EnumSyncTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncTaskStatus[] | ListEnumSyncTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncTaskStatus[] | ListEnumSyncTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.SyncTaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSyncTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumSyncTaskStatusFilter<$PrismaModel>
  }

  export type PaymentProfileCreateNestedOneWithoutOwnerInput = {
    create?: XOR<PaymentProfileCreateWithoutOwnerInput, PaymentProfileUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutOwnerInput
    connect?: PaymentProfileWhereUniqueInput
  }

  export type PaymentProfileUncheckedCreateNestedOneWithoutOwnerInput = {
    create?: XOR<PaymentProfileCreateWithoutOwnerInput, PaymentProfileUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutOwnerInput
    connect?: PaymentProfileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PaymentProfileUpdateOneWithoutOwnerNestedInput = {
    create?: XOR<PaymentProfileCreateWithoutOwnerInput, PaymentProfileUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutOwnerInput
    upsert?: PaymentProfileUpsertWithoutOwnerInput
    disconnect?: PaymentProfileWhereInput | boolean
    delete?: PaymentProfileWhereInput | boolean
    connect?: PaymentProfileWhereUniqueInput
    update?: XOR<XOR<PaymentProfileUpdateToOneWithWhereWithoutOwnerInput, PaymentProfileUpdateWithoutOwnerInput>, PaymentProfileUncheckedUpdateWithoutOwnerInput>
  }

  export type PaymentProfileUncheckedUpdateOneWithoutOwnerNestedInput = {
    create?: XOR<PaymentProfileCreateWithoutOwnerInput, PaymentProfileUncheckedCreateWithoutOwnerInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutOwnerInput
    upsert?: PaymentProfileUpsertWithoutOwnerInput
    disconnect?: PaymentProfileWhereInput | boolean
    delete?: PaymentProfileWhereInput | boolean
    connect?: PaymentProfileWhereUniqueInput
    update?: XOR<XOR<PaymentProfileUpdateToOneWithWhereWithoutOwnerInput, PaymentProfileUpdateWithoutOwnerInput>, PaymentProfileUncheckedUpdateWithoutOwnerInput>
  }

  export type PaymentProfileCreateNestedOneWithoutProductsInput = {
    create?: XOR<PaymentProfileCreateWithoutProductsInput, PaymentProfileUncheckedCreateWithoutProductsInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutProductsInput
    connect?: PaymentProfileWhereUniqueInput
  }

  export type ProductSkuCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductSkuCreateWithoutProductInput, ProductSkuUncheckedCreateWithoutProductInput> | ProductSkuCreateWithoutProductInput[] | ProductSkuUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSkuCreateOrConnectWithoutProductInput | ProductSkuCreateOrConnectWithoutProductInput[]
    createMany?: ProductSkuCreateManyProductInputEnvelope
    connect?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
  }

  export type CardItemCreateNestedManyWithoutProductInput = {
    create?: XOR<CardItemCreateWithoutProductInput, CardItemUncheckedCreateWithoutProductInput> | CardItemCreateWithoutProductInput[] | CardItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutProductInput | CardItemCreateOrConnectWithoutProductInput[]
    createMany?: CardItemCreateManyProductInputEnvelope
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
  }

  export type ShopOrderCreateNestedManyWithoutProductInput = {
    create?: XOR<ShopOrderCreateWithoutProductInput, ShopOrderUncheckedCreateWithoutProductInput> | ShopOrderCreateWithoutProductInput[] | ShopOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutProductInput | ShopOrderCreateOrConnectWithoutProductInput[]
    createMany?: ShopOrderCreateManyProductInputEnvelope
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
  }

  export type ProductSkuUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductSkuCreateWithoutProductInput, ProductSkuUncheckedCreateWithoutProductInput> | ProductSkuCreateWithoutProductInput[] | ProductSkuUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSkuCreateOrConnectWithoutProductInput | ProductSkuCreateOrConnectWithoutProductInput[]
    createMany?: ProductSkuCreateManyProductInputEnvelope
    connect?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
  }

  export type CardItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<CardItemCreateWithoutProductInput, CardItemUncheckedCreateWithoutProductInput> | CardItemCreateWithoutProductInput[] | CardItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutProductInput | CardItemCreateOrConnectWithoutProductInput[]
    createMany?: CardItemCreateManyProductInputEnvelope
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
  }

  export type ShopOrderUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ShopOrderCreateWithoutProductInput, ShopOrderUncheckedCreateWithoutProductInput> | ShopOrderCreateWithoutProductInput[] | ShopOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutProductInput | ShopOrderCreateOrConnectWithoutProductInput[]
    createMany?: ShopOrderCreateManyProductInputEnvelope
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumProductSaleModeFieldUpdateOperationsInput = {
    set?: $Enums.ProductSaleMode
  }

  export type EnumProductStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductStatus
  }

  export type PaymentProfileUpdateOneWithoutProductsNestedInput = {
    create?: XOR<PaymentProfileCreateWithoutProductsInput, PaymentProfileUncheckedCreateWithoutProductsInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutProductsInput
    upsert?: PaymentProfileUpsertWithoutProductsInput
    disconnect?: PaymentProfileWhereInput | boolean
    delete?: PaymentProfileWhereInput | boolean
    connect?: PaymentProfileWhereUniqueInput
    update?: XOR<XOR<PaymentProfileUpdateToOneWithWhereWithoutProductsInput, PaymentProfileUpdateWithoutProductsInput>, PaymentProfileUncheckedUpdateWithoutProductsInput>
  }

  export type ProductSkuUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductSkuCreateWithoutProductInput, ProductSkuUncheckedCreateWithoutProductInput> | ProductSkuCreateWithoutProductInput[] | ProductSkuUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSkuCreateOrConnectWithoutProductInput | ProductSkuCreateOrConnectWithoutProductInput[]
    upsert?: ProductSkuUpsertWithWhereUniqueWithoutProductInput | ProductSkuUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductSkuCreateManyProductInputEnvelope
    set?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
    disconnect?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
    delete?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
    connect?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
    update?: ProductSkuUpdateWithWhereUniqueWithoutProductInput | ProductSkuUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductSkuUpdateManyWithWhereWithoutProductInput | ProductSkuUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductSkuScalarWhereInput | ProductSkuScalarWhereInput[]
  }

  export type CardItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<CardItemCreateWithoutProductInput, CardItemUncheckedCreateWithoutProductInput> | CardItemCreateWithoutProductInput[] | CardItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutProductInput | CardItemCreateOrConnectWithoutProductInput[]
    upsert?: CardItemUpsertWithWhereUniqueWithoutProductInput | CardItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CardItemCreateManyProductInputEnvelope
    set?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    disconnect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    delete?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    update?: CardItemUpdateWithWhereUniqueWithoutProductInput | CardItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CardItemUpdateManyWithWhereWithoutProductInput | CardItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CardItemScalarWhereInput | CardItemScalarWhereInput[]
  }

  export type ShopOrderUpdateManyWithoutProductNestedInput = {
    create?: XOR<ShopOrderCreateWithoutProductInput, ShopOrderUncheckedCreateWithoutProductInput> | ShopOrderCreateWithoutProductInput[] | ShopOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutProductInput | ShopOrderCreateOrConnectWithoutProductInput[]
    upsert?: ShopOrderUpsertWithWhereUniqueWithoutProductInput | ShopOrderUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ShopOrderCreateManyProductInputEnvelope
    set?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    disconnect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    delete?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    update?: ShopOrderUpdateWithWhereUniqueWithoutProductInput | ShopOrderUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ShopOrderUpdateManyWithWhereWithoutProductInput | ShopOrderUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ShopOrderScalarWhereInput | ShopOrderScalarWhereInput[]
  }

  export type ProductSkuUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductSkuCreateWithoutProductInput, ProductSkuUncheckedCreateWithoutProductInput> | ProductSkuCreateWithoutProductInput[] | ProductSkuUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSkuCreateOrConnectWithoutProductInput | ProductSkuCreateOrConnectWithoutProductInput[]
    upsert?: ProductSkuUpsertWithWhereUniqueWithoutProductInput | ProductSkuUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductSkuCreateManyProductInputEnvelope
    set?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
    disconnect?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
    delete?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
    connect?: ProductSkuWhereUniqueInput | ProductSkuWhereUniqueInput[]
    update?: ProductSkuUpdateWithWhereUniqueWithoutProductInput | ProductSkuUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductSkuUpdateManyWithWhereWithoutProductInput | ProductSkuUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductSkuScalarWhereInput | ProductSkuScalarWhereInput[]
  }

  export type CardItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<CardItemCreateWithoutProductInput, CardItemUncheckedCreateWithoutProductInput> | CardItemCreateWithoutProductInput[] | CardItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutProductInput | CardItemCreateOrConnectWithoutProductInput[]
    upsert?: CardItemUpsertWithWhereUniqueWithoutProductInput | CardItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CardItemCreateManyProductInputEnvelope
    set?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    disconnect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    delete?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    update?: CardItemUpdateWithWhereUniqueWithoutProductInput | CardItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CardItemUpdateManyWithWhereWithoutProductInput | CardItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CardItemScalarWhereInput | CardItemScalarWhereInput[]
  }

  export type ShopOrderUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ShopOrderCreateWithoutProductInput, ShopOrderUncheckedCreateWithoutProductInput> | ShopOrderCreateWithoutProductInput[] | ShopOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutProductInput | ShopOrderCreateOrConnectWithoutProductInput[]
    upsert?: ShopOrderUpsertWithWhereUniqueWithoutProductInput | ShopOrderUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ShopOrderCreateManyProductInputEnvelope
    set?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    disconnect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    delete?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    update?: ShopOrderUpdateWithWhereUniqueWithoutProductInput | ShopOrderUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ShopOrderUpdateManyWithWhereWithoutProductInput | ShopOrderUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ShopOrderScalarWhereInput | ShopOrderScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutSkusInput = {
    create?: XOR<ProductCreateWithoutSkusInput, ProductUncheckedCreateWithoutSkusInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSkusInput
    connect?: ProductWhereUniqueInput
  }

  export type CardItemCreateNestedManyWithoutSkuInput = {
    create?: XOR<CardItemCreateWithoutSkuInput, CardItemUncheckedCreateWithoutSkuInput> | CardItemCreateWithoutSkuInput[] | CardItemUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutSkuInput | CardItemCreateOrConnectWithoutSkuInput[]
    createMany?: CardItemCreateManySkuInputEnvelope
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
  }

  export type ShopOrderCreateNestedManyWithoutSkuInput = {
    create?: XOR<ShopOrderCreateWithoutSkuInput, ShopOrderUncheckedCreateWithoutSkuInput> | ShopOrderCreateWithoutSkuInput[] | ShopOrderUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutSkuInput | ShopOrderCreateOrConnectWithoutSkuInput[]
    createMany?: ShopOrderCreateManySkuInputEnvelope
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
  }

  export type CardItemUncheckedCreateNestedManyWithoutSkuInput = {
    create?: XOR<CardItemCreateWithoutSkuInput, CardItemUncheckedCreateWithoutSkuInput> | CardItemCreateWithoutSkuInput[] | CardItemUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutSkuInput | CardItemCreateOrConnectWithoutSkuInput[]
    createMany?: CardItemCreateManySkuInputEnvelope
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
  }

  export type ShopOrderUncheckedCreateNestedManyWithoutSkuInput = {
    create?: XOR<ShopOrderCreateWithoutSkuInput, ShopOrderUncheckedCreateWithoutSkuInput> | ShopOrderCreateWithoutSkuInput[] | ShopOrderUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutSkuInput | ShopOrderCreateOrConnectWithoutSkuInput[]
    createMany?: ShopOrderCreateManySkuInputEnvelope
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutSkusNestedInput = {
    create?: XOR<ProductCreateWithoutSkusInput, ProductUncheckedCreateWithoutSkusInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSkusInput
    upsert?: ProductUpsertWithoutSkusInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSkusInput, ProductUpdateWithoutSkusInput>, ProductUncheckedUpdateWithoutSkusInput>
  }

  export type CardItemUpdateManyWithoutSkuNestedInput = {
    create?: XOR<CardItemCreateWithoutSkuInput, CardItemUncheckedCreateWithoutSkuInput> | CardItemCreateWithoutSkuInput[] | CardItemUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutSkuInput | CardItemCreateOrConnectWithoutSkuInput[]
    upsert?: CardItemUpsertWithWhereUniqueWithoutSkuInput | CardItemUpsertWithWhereUniqueWithoutSkuInput[]
    createMany?: CardItemCreateManySkuInputEnvelope
    set?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    disconnect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    delete?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    update?: CardItemUpdateWithWhereUniqueWithoutSkuInput | CardItemUpdateWithWhereUniqueWithoutSkuInput[]
    updateMany?: CardItemUpdateManyWithWhereWithoutSkuInput | CardItemUpdateManyWithWhereWithoutSkuInput[]
    deleteMany?: CardItemScalarWhereInput | CardItemScalarWhereInput[]
  }

  export type ShopOrderUpdateManyWithoutSkuNestedInput = {
    create?: XOR<ShopOrderCreateWithoutSkuInput, ShopOrderUncheckedCreateWithoutSkuInput> | ShopOrderCreateWithoutSkuInput[] | ShopOrderUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutSkuInput | ShopOrderCreateOrConnectWithoutSkuInput[]
    upsert?: ShopOrderUpsertWithWhereUniqueWithoutSkuInput | ShopOrderUpsertWithWhereUniqueWithoutSkuInput[]
    createMany?: ShopOrderCreateManySkuInputEnvelope
    set?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    disconnect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    delete?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    update?: ShopOrderUpdateWithWhereUniqueWithoutSkuInput | ShopOrderUpdateWithWhereUniqueWithoutSkuInput[]
    updateMany?: ShopOrderUpdateManyWithWhereWithoutSkuInput | ShopOrderUpdateManyWithWhereWithoutSkuInput[]
    deleteMany?: ShopOrderScalarWhereInput | ShopOrderScalarWhereInput[]
  }

  export type CardItemUncheckedUpdateManyWithoutSkuNestedInput = {
    create?: XOR<CardItemCreateWithoutSkuInput, CardItemUncheckedCreateWithoutSkuInput> | CardItemCreateWithoutSkuInput[] | CardItemUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutSkuInput | CardItemCreateOrConnectWithoutSkuInput[]
    upsert?: CardItemUpsertWithWhereUniqueWithoutSkuInput | CardItemUpsertWithWhereUniqueWithoutSkuInput[]
    createMany?: CardItemCreateManySkuInputEnvelope
    set?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    disconnect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    delete?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    update?: CardItemUpdateWithWhereUniqueWithoutSkuInput | CardItemUpdateWithWhereUniqueWithoutSkuInput[]
    updateMany?: CardItemUpdateManyWithWhereWithoutSkuInput | CardItemUpdateManyWithWhereWithoutSkuInput[]
    deleteMany?: CardItemScalarWhereInput | CardItemScalarWhereInput[]
  }

  export type ShopOrderUncheckedUpdateManyWithoutSkuNestedInput = {
    create?: XOR<ShopOrderCreateWithoutSkuInput, ShopOrderUncheckedCreateWithoutSkuInput> | ShopOrderCreateWithoutSkuInput[] | ShopOrderUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutSkuInput | ShopOrderCreateOrConnectWithoutSkuInput[]
    upsert?: ShopOrderUpsertWithWhereUniqueWithoutSkuInput | ShopOrderUpsertWithWhereUniqueWithoutSkuInput[]
    createMany?: ShopOrderCreateManySkuInputEnvelope
    set?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    disconnect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    delete?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    update?: ShopOrderUpdateWithWhereUniqueWithoutSkuInput | ShopOrderUpdateWithWhereUniqueWithoutSkuInput[]
    updateMany?: ShopOrderUpdateManyWithWhereWithoutSkuInput | ShopOrderUpdateManyWithWhereWithoutSkuInput[]
    deleteMany?: ShopOrderScalarWhereInput | ShopOrderScalarWhereInput[]
  }

  export type MerchantAccountCreateNestedOneWithoutPaymentProfileInput = {
    create?: XOR<MerchantAccountCreateWithoutPaymentProfileInput, MerchantAccountUncheckedCreateWithoutPaymentProfileInput>
    connectOrCreate?: MerchantAccountCreateOrConnectWithoutPaymentProfileInput
    connect?: MerchantAccountWhereUniqueInput
  }

  export type ProductCreateNestedManyWithoutPaymentProfileInput = {
    create?: XOR<ProductCreateWithoutPaymentProfileInput, ProductUncheckedCreateWithoutPaymentProfileInput> | ProductCreateWithoutPaymentProfileInput[] | ProductUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutPaymentProfileInput | ProductCreateOrConnectWithoutPaymentProfileInput[]
    createMany?: ProductCreateManyPaymentProfileInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ShopOrderCreateNestedManyWithoutPaymentProfileInput = {
    create?: XOR<ShopOrderCreateWithoutPaymentProfileInput, ShopOrderUncheckedCreateWithoutPaymentProfileInput> | ShopOrderCreateWithoutPaymentProfileInput[] | ShopOrderUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutPaymentProfileInput | ShopOrderCreateOrConnectWithoutPaymentProfileInput[]
    createMany?: ShopOrderCreateManyPaymentProfileInputEnvelope
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
  }

  export type PaymentProfileRevisionCreateNestedManyWithoutPaymentProfileInput = {
    create?: XOR<PaymentProfileRevisionCreateWithoutPaymentProfileInput, PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput> | PaymentProfileRevisionCreateWithoutPaymentProfileInput[] | PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput | PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput[]
    createMany?: PaymentProfileRevisionCreateManyPaymentProfileInputEnvelope
    connect?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutPaymentProfileInput = {
    create?: XOR<ProductCreateWithoutPaymentProfileInput, ProductUncheckedCreateWithoutPaymentProfileInput> | ProductCreateWithoutPaymentProfileInput[] | ProductUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutPaymentProfileInput | ProductCreateOrConnectWithoutPaymentProfileInput[]
    createMany?: ProductCreateManyPaymentProfileInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ShopOrderUncheckedCreateNestedManyWithoutPaymentProfileInput = {
    create?: XOR<ShopOrderCreateWithoutPaymentProfileInput, ShopOrderUncheckedCreateWithoutPaymentProfileInput> | ShopOrderCreateWithoutPaymentProfileInput[] | ShopOrderUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutPaymentProfileInput | ShopOrderCreateOrConnectWithoutPaymentProfileInput[]
    createMany?: ShopOrderCreateManyPaymentProfileInputEnvelope
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
  }

  export type PaymentProfileRevisionUncheckedCreateNestedManyWithoutPaymentProfileInput = {
    create?: XOR<PaymentProfileRevisionCreateWithoutPaymentProfileInput, PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput> | PaymentProfileRevisionCreateWithoutPaymentProfileInput[] | PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput | PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput[]
    createMany?: PaymentProfileRevisionCreateManyPaymentProfileInputEnvelope
    connect?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
  }

  export type MerchantAccountUpdateOneWithoutPaymentProfileNestedInput = {
    create?: XOR<MerchantAccountCreateWithoutPaymentProfileInput, MerchantAccountUncheckedCreateWithoutPaymentProfileInput>
    connectOrCreate?: MerchantAccountCreateOrConnectWithoutPaymentProfileInput
    upsert?: MerchantAccountUpsertWithoutPaymentProfileInput
    disconnect?: MerchantAccountWhereInput | boolean
    delete?: MerchantAccountWhereInput | boolean
    connect?: MerchantAccountWhereUniqueInput
    update?: XOR<XOR<MerchantAccountUpdateToOneWithWhereWithoutPaymentProfileInput, MerchantAccountUpdateWithoutPaymentProfileInput>, MerchantAccountUncheckedUpdateWithoutPaymentProfileInput>
  }

  export type ProductUpdateManyWithoutPaymentProfileNestedInput = {
    create?: XOR<ProductCreateWithoutPaymentProfileInput, ProductUncheckedCreateWithoutPaymentProfileInput> | ProductCreateWithoutPaymentProfileInput[] | ProductUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutPaymentProfileInput | ProductCreateOrConnectWithoutPaymentProfileInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutPaymentProfileInput | ProductUpsertWithWhereUniqueWithoutPaymentProfileInput[]
    createMany?: ProductCreateManyPaymentProfileInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutPaymentProfileInput | ProductUpdateWithWhereUniqueWithoutPaymentProfileInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutPaymentProfileInput | ProductUpdateManyWithWhereWithoutPaymentProfileInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ShopOrderUpdateManyWithoutPaymentProfileNestedInput = {
    create?: XOR<ShopOrderCreateWithoutPaymentProfileInput, ShopOrderUncheckedCreateWithoutPaymentProfileInput> | ShopOrderCreateWithoutPaymentProfileInput[] | ShopOrderUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutPaymentProfileInput | ShopOrderCreateOrConnectWithoutPaymentProfileInput[]
    upsert?: ShopOrderUpsertWithWhereUniqueWithoutPaymentProfileInput | ShopOrderUpsertWithWhereUniqueWithoutPaymentProfileInput[]
    createMany?: ShopOrderCreateManyPaymentProfileInputEnvelope
    set?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    disconnect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    delete?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    update?: ShopOrderUpdateWithWhereUniqueWithoutPaymentProfileInput | ShopOrderUpdateWithWhereUniqueWithoutPaymentProfileInput[]
    updateMany?: ShopOrderUpdateManyWithWhereWithoutPaymentProfileInput | ShopOrderUpdateManyWithWhereWithoutPaymentProfileInput[]
    deleteMany?: ShopOrderScalarWhereInput | ShopOrderScalarWhereInput[]
  }

  export type PaymentProfileRevisionUpdateManyWithoutPaymentProfileNestedInput = {
    create?: XOR<PaymentProfileRevisionCreateWithoutPaymentProfileInput, PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput> | PaymentProfileRevisionCreateWithoutPaymentProfileInput[] | PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput | PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput[]
    upsert?: PaymentProfileRevisionUpsertWithWhereUniqueWithoutPaymentProfileInput | PaymentProfileRevisionUpsertWithWhereUniqueWithoutPaymentProfileInput[]
    createMany?: PaymentProfileRevisionCreateManyPaymentProfileInputEnvelope
    set?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
    disconnect?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
    delete?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
    connect?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
    update?: PaymentProfileRevisionUpdateWithWhereUniqueWithoutPaymentProfileInput | PaymentProfileRevisionUpdateWithWhereUniqueWithoutPaymentProfileInput[]
    updateMany?: PaymentProfileRevisionUpdateManyWithWhereWithoutPaymentProfileInput | PaymentProfileRevisionUpdateManyWithWhereWithoutPaymentProfileInput[]
    deleteMany?: PaymentProfileRevisionScalarWhereInput | PaymentProfileRevisionScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutPaymentProfileNestedInput = {
    create?: XOR<ProductCreateWithoutPaymentProfileInput, ProductUncheckedCreateWithoutPaymentProfileInput> | ProductCreateWithoutPaymentProfileInput[] | ProductUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutPaymentProfileInput | ProductCreateOrConnectWithoutPaymentProfileInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutPaymentProfileInput | ProductUpsertWithWhereUniqueWithoutPaymentProfileInput[]
    createMany?: ProductCreateManyPaymentProfileInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutPaymentProfileInput | ProductUpdateWithWhereUniqueWithoutPaymentProfileInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutPaymentProfileInput | ProductUpdateManyWithWhereWithoutPaymentProfileInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ShopOrderUncheckedUpdateManyWithoutPaymentProfileNestedInput = {
    create?: XOR<ShopOrderCreateWithoutPaymentProfileInput, ShopOrderUncheckedCreateWithoutPaymentProfileInput> | ShopOrderCreateWithoutPaymentProfileInput[] | ShopOrderUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: ShopOrderCreateOrConnectWithoutPaymentProfileInput | ShopOrderCreateOrConnectWithoutPaymentProfileInput[]
    upsert?: ShopOrderUpsertWithWhereUniqueWithoutPaymentProfileInput | ShopOrderUpsertWithWhereUniqueWithoutPaymentProfileInput[]
    createMany?: ShopOrderCreateManyPaymentProfileInputEnvelope
    set?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    disconnect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    delete?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    connect?: ShopOrderWhereUniqueInput | ShopOrderWhereUniqueInput[]
    update?: ShopOrderUpdateWithWhereUniqueWithoutPaymentProfileInput | ShopOrderUpdateWithWhereUniqueWithoutPaymentProfileInput[]
    updateMany?: ShopOrderUpdateManyWithWhereWithoutPaymentProfileInput | ShopOrderUpdateManyWithWhereWithoutPaymentProfileInput[]
    deleteMany?: ShopOrderScalarWhereInput | ShopOrderScalarWhereInput[]
  }

  export type PaymentProfileRevisionUncheckedUpdateManyWithoutPaymentProfileNestedInput = {
    create?: XOR<PaymentProfileRevisionCreateWithoutPaymentProfileInput, PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput> | PaymentProfileRevisionCreateWithoutPaymentProfileInput[] | PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput[]
    connectOrCreate?: PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput | PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput[]
    upsert?: PaymentProfileRevisionUpsertWithWhereUniqueWithoutPaymentProfileInput | PaymentProfileRevisionUpsertWithWhereUniqueWithoutPaymentProfileInput[]
    createMany?: PaymentProfileRevisionCreateManyPaymentProfileInputEnvelope
    set?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
    disconnect?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
    delete?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
    connect?: PaymentProfileRevisionWhereUniqueInput | PaymentProfileRevisionWhereUniqueInput[]
    update?: PaymentProfileRevisionUpdateWithWhereUniqueWithoutPaymentProfileInput | PaymentProfileRevisionUpdateWithWhereUniqueWithoutPaymentProfileInput[]
    updateMany?: PaymentProfileRevisionUpdateManyWithWhereWithoutPaymentProfileInput | PaymentProfileRevisionUpdateManyWithWhereWithoutPaymentProfileInput[]
    deleteMany?: PaymentProfileRevisionScalarWhereInput | PaymentProfileRevisionScalarWhereInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PaymentProfileCreateNestedOneWithoutRevisionsInput = {
    create?: XOR<PaymentProfileCreateWithoutRevisionsInput, PaymentProfileUncheckedCreateWithoutRevisionsInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutRevisionsInput
    connect?: PaymentProfileWhereUniqueInput
  }

  export type PaymentProfileUpdateOneRequiredWithoutRevisionsNestedInput = {
    create?: XOR<PaymentProfileCreateWithoutRevisionsInput, PaymentProfileUncheckedCreateWithoutRevisionsInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutRevisionsInput
    upsert?: PaymentProfileUpsertWithoutRevisionsInput
    connect?: PaymentProfileWhereUniqueInput
    update?: XOR<XOR<PaymentProfileUpdateToOneWithWhereWithoutRevisionsInput, PaymentProfileUpdateWithoutRevisionsInput>, PaymentProfileUncheckedUpdateWithoutRevisionsInput>
  }

  export type ProductCreateNestedOneWithoutCardsInput = {
    create?: XOR<ProductCreateWithoutCardsInput, ProductUncheckedCreateWithoutCardsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCardsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductSkuCreateNestedOneWithoutCardsInput = {
    create?: XOR<ProductSkuCreateWithoutCardsInput, ProductSkuUncheckedCreateWithoutCardsInput>
    connectOrCreate?: ProductSkuCreateOrConnectWithoutCardsInput
    connect?: ProductSkuWhereUniqueInput
  }

  export type ShopOrderCreateNestedOneWithoutCardsInput = {
    create?: XOR<ShopOrderCreateWithoutCardsInput, ShopOrderUncheckedCreateWithoutCardsInput>
    connectOrCreate?: ShopOrderCreateOrConnectWithoutCardsInput
    connect?: ShopOrderWhereUniqueInput
  }

  export type EnumCardItemStatusFieldUpdateOperationsInput = {
    set?: $Enums.CardItemStatus
  }

  export type ProductUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<ProductCreateWithoutCardsInput, ProductUncheckedCreateWithoutCardsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCardsInput
    upsert?: ProductUpsertWithoutCardsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutCardsInput, ProductUpdateWithoutCardsInput>, ProductUncheckedUpdateWithoutCardsInput>
  }

  export type ProductSkuUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<ProductSkuCreateWithoutCardsInput, ProductSkuUncheckedCreateWithoutCardsInput>
    connectOrCreate?: ProductSkuCreateOrConnectWithoutCardsInput
    upsert?: ProductSkuUpsertWithoutCardsInput
    connect?: ProductSkuWhereUniqueInput
    update?: XOR<XOR<ProductSkuUpdateToOneWithWhereWithoutCardsInput, ProductSkuUpdateWithoutCardsInput>, ProductSkuUncheckedUpdateWithoutCardsInput>
  }

  export type ShopOrderUpdateOneWithoutCardsNestedInput = {
    create?: XOR<ShopOrderCreateWithoutCardsInput, ShopOrderUncheckedCreateWithoutCardsInput>
    connectOrCreate?: ShopOrderCreateOrConnectWithoutCardsInput
    upsert?: ShopOrderUpsertWithoutCardsInput
    disconnect?: ShopOrderWhereInput | boolean
    delete?: ShopOrderWhereInput | boolean
    connect?: ShopOrderWhereUniqueInput
    update?: XOR<XOR<ShopOrderUpdateToOneWithWhereWithoutCardsInput, ShopOrderUpdateWithoutCardsInput>, ShopOrderUncheckedUpdateWithoutCardsInput>
  }

  export type ProductCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrdersInput
    connect?: ProductWhereUniqueInput
  }

  export type PaymentProfileCreateNestedOneWithoutOrdersInput = {
    create?: XOR<PaymentProfileCreateWithoutOrdersInput, PaymentProfileUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutOrdersInput
    connect?: PaymentProfileWhereUniqueInput
  }

  export type ProductSkuCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ProductSkuCreateWithoutOrdersInput, ProductSkuUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProductSkuCreateOrConnectWithoutOrdersInput
    connect?: ProductSkuWhereUniqueInput
  }

  export type CardItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<CardItemCreateWithoutOrderInput, CardItemUncheckedCreateWithoutOrderInput> | CardItemCreateWithoutOrderInput[] | CardItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutOrderInput | CardItemCreateOrConnectWithoutOrderInput[]
    createMany?: CardItemCreateManyOrderInputEnvelope
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
  }

  export type ShopPaymentAttemptCreateNestedManyWithoutShopOrderInput = {
    create?: XOR<ShopPaymentAttemptCreateWithoutShopOrderInput, ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput> | ShopPaymentAttemptCreateWithoutShopOrderInput[] | ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput[]
    connectOrCreate?: ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput | ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput[]
    createMany?: ShopPaymentAttemptCreateManyShopOrderInputEnvelope
    connect?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
  }

  export type OrderSyncTaskCreateNestedManyWithoutShopOrderInput = {
    create?: XOR<OrderSyncTaskCreateWithoutShopOrderInput, OrderSyncTaskUncheckedCreateWithoutShopOrderInput> | OrderSyncTaskCreateWithoutShopOrderInput[] | OrderSyncTaskUncheckedCreateWithoutShopOrderInput[]
    connectOrCreate?: OrderSyncTaskCreateOrConnectWithoutShopOrderInput | OrderSyncTaskCreateOrConnectWithoutShopOrderInput[]
    createMany?: OrderSyncTaskCreateManyShopOrderInputEnvelope
    connect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
  }

  export type CardItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<CardItemCreateWithoutOrderInput, CardItemUncheckedCreateWithoutOrderInput> | CardItemCreateWithoutOrderInput[] | CardItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutOrderInput | CardItemCreateOrConnectWithoutOrderInput[]
    createMany?: CardItemCreateManyOrderInputEnvelope
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
  }

  export type ShopPaymentAttemptUncheckedCreateNestedManyWithoutShopOrderInput = {
    create?: XOR<ShopPaymentAttemptCreateWithoutShopOrderInput, ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput> | ShopPaymentAttemptCreateWithoutShopOrderInput[] | ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput[]
    connectOrCreate?: ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput | ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput[]
    createMany?: ShopPaymentAttemptCreateManyShopOrderInputEnvelope
    connect?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
  }

  export type OrderSyncTaskUncheckedCreateNestedManyWithoutShopOrderInput = {
    create?: XOR<OrderSyncTaskCreateWithoutShopOrderInput, OrderSyncTaskUncheckedCreateWithoutShopOrderInput> | OrderSyncTaskCreateWithoutShopOrderInput[] | OrderSyncTaskUncheckedCreateWithoutShopOrderInput[]
    connectOrCreate?: OrderSyncTaskCreateOrConnectWithoutShopOrderInput | OrderSyncTaskCreateOrConnectWithoutShopOrderInput[]
    createMany?: OrderSyncTaskCreateManyShopOrderInputEnvelope
    connect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
  }

  export type EnumShopOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShopOrderStatus
  }

  export type ProductUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrdersInput
    upsert?: ProductUpsertWithoutOrdersInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrdersInput, ProductUpdateWithoutOrdersInput>, ProductUncheckedUpdateWithoutOrdersInput>
  }

  export type PaymentProfileUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<PaymentProfileCreateWithoutOrdersInput, PaymentProfileUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PaymentProfileCreateOrConnectWithoutOrdersInput
    upsert?: PaymentProfileUpsertWithoutOrdersInput
    disconnect?: PaymentProfileWhereInput | boolean
    delete?: PaymentProfileWhereInput | boolean
    connect?: PaymentProfileWhereUniqueInput
    update?: XOR<XOR<PaymentProfileUpdateToOneWithWhereWithoutOrdersInput, PaymentProfileUpdateWithoutOrdersInput>, PaymentProfileUncheckedUpdateWithoutOrdersInput>
  }

  export type ProductSkuUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ProductSkuCreateWithoutOrdersInput, ProductSkuUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProductSkuCreateOrConnectWithoutOrdersInput
    upsert?: ProductSkuUpsertWithoutOrdersInput
    connect?: ProductSkuWhereUniqueInput
    update?: XOR<XOR<ProductSkuUpdateToOneWithWhereWithoutOrdersInput, ProductSkuUpdateWithoutOrdersInput>, ProductSkuUncheckedUpdateWithoutOrdersInput>
  }

  export type CardItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<CardItemCreateWithoutOrderInput, CardItemUncheckedCreateWithoutOrderInput> | CardItemCreateWithoutOrderInput[] | CardItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutOrderInput | CardItemCreateOrConnectWithoutOrderInput[]
    upsert?: CardItemUpsertWithWhereUniqueWithoutOrderInput | CardItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: CardItemCreateManyOrderInputEnvelope
    set?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    disconnect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    delete?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    update?: CardItemUpdateWithWhereUniqueWithoutOrderInput | CardItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: CardItemUpdateManyWithWhereWithoutOrderInput | CardItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: CardItemScalarWhereInput | CardItemScalarWhereInput[]
  }

  export type ShopPaymentAttemptUpdateManyWithoutShopOrderNestedInput = {
    create?: XOR<ShopPaymentAttemptCreateWithoutShopOrderInput, ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput> | ShopPaymentAttemptCreateWithoutShopOrderInput[] | ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput[]
    connectOrCreate?: ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput | ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput[]
    upsert?: ShopPaymentAttemptUpsertWithWhereUniqueWithoutShopOrderInput | ShopPaymentAttemptUpsertWithWhereUniqueWithoutShopOrderInput[]
    createMany?: ShopPaymentAttemptCreateManyShopOrderInputEnvelope
    set?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
    disconnect?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
    delete?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
    connect?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
    update?: ShopPaymentAttemptUpdateWithWhereUniqueWithoutShopOrderInput | ShopPaymentAttemptUpdateWithWhereUniqueWithoutShopOrderInput[]
    updateMany?: ShopPaymentAttemptUpdateManyWithWhereWithoutShopOrderInput | ShopPaymentAttemptUpdateManyWithWhereWithoutShopOrderInput[]
    deleteMany?: ShopPaymentAttemptScalarWhereInput | ShopPaymentAttemptScalarWhereInput[]
  }

  export type OrderSyncTaskUpdateManyWithoutShopOrderNestedInput = {
    create?: XOR<OrderSyncTaskCreateWithoutShopOrderInput, OrderSyncTaskUncheckedCreateWithoutShopOrderInput> | OrderSyncTaskCreateWithoutShopOrderInput[] | OrderSyncTaskUncheckedCreateWithoutShopOrderInput[]
    connectOrCreate?: OrderSyncTaskCreateOrConnectWithoutShopOrderInput | OrderSyncTaskCreateOrConnectWithoutShopOrderInput[]
    upsert?: OrderSyncTaskUpsertWithWhereUniqueWithoutShopOrderInput | OrderSyncTaskUpsertWithWhereUniqueWithoutShopOrderInput[]
    createMany?: OrderSyncTaskCreateManyShopOrderInputEnvelope
    set?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    disconnect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    delete?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    connect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    update?: OrderSyncTaskUpdateWithWhereUniqueWithoutShopOrderInput | OrderSyncTaskUpdateWithWhereUniqueWithoutShopOrderInput[]
    updateMany?: OrderSyncTaskUpdateManyWithWhereWithoutShopOrderInput | OrderSyncTaskUpdateManyWithWhereWithoutShopOrderInput[]
    deleteMany?: OrderSyncTaskScalarWhereInput | OrderSyncTaskScalarWhereInput[]
  }

  export type CardItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<CardItemCreateWithoutOrderInput, CardItemUncheckedCreateWithoutOrderInput> | CardItemCreateWithoutOrderInput[] | CardItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: CardItemCreateOrConnectWithoutOrderInput | CardItemCreateOrConnectWithoutOrderInput[]
    upsert?: CardItemUpsertWithWhereUniqueWithoutOrderInput | CardItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: CardItemCreateManyOrderInputEnvelope
    set?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    disconnect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    delete?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    connect?: CardItemWhereUniqueInput | CardItemWhereUniqueInput[]
    update?: CardItemUpdateWithWhereUniqueWithoutOrderInput | CardItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: CardItemUpdateManyWithWhereWithoutOrderInput | CardItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: CardItemScalarWhereInput | CardItemScalarWhereInput[]
  }

  export type ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderNestedInput = {
    create?: XOR<ShopPaymentAttemptCreateWithoutShopOrderInput, ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput> | ShopPaymentAttemptCreateWithoutShopOrderInput[] | ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput[]
    connectOrCreate?: ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput | ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput[]
    upsert?: ShopPaymentAttemptUpsertWithWhereUniqueWithoutShopOrderInput | ShopPaymentAttemptUpsertWithWhereUniqueWithoutShopOrderInput[]
    createMany?: ShopPaymentAttemptCreateManyShopOrderInputEnvelope
    set?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
    disconnect?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
    delete?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
    connect?: ShopPaymentAttemptWhereUniqueInput | ShopPaymentAttemptWhereUniqueInput[]
    update?: ShopPaymentAttemptUpdateWithWhereUniqueWithoutShopOrderInput | ShopPaymentAttemptUpdateWithWhereUniqueWithoutShopOrderInput[]
    updateMany?: ShopPaymentAttemptUpdateManyWithWhereWithoutShopOrderInput | ShopPaymentAttemptUpdateManyWithWhereWithoutShopOrderInput[]
    deleteMany?: ShopPaymentAttemptScalarWhereInput | ShopPaymentAttemptScalarWhereInput[]
  }

  export type OrderSyncTaskUncheckedUpdateManyWithoutShopOrderNestedInput = {
    create?: XOR<OrderSyncTaskCreateWithoutShopOrderInput, OrderSyncTaskUncheckedCreateWithoutShopOrderInput> | OrderSyncTaskCreateWithoutShopOrderInput[] | OrderSyncTaskUncheckedCreateWithoutShopOrderInput[]
    connectOrCreate?: OrderSyncTaskCreateOrConnectWithoutShopOrderInput | OrderSyncTaskCreateOrConnectWithoutShopOrderInput[]
    upsert?: OrderSyncTaskUpsertWithWhereUniqueWithoutShopOrderInput | OrderSyncTaskUpsertWithWhereUniqueWithoutShopOrderInput[]
    createMany?: OrderSyncTaskCreateManyShopOrderInputEnvelope
    set?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    disconnect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    delete?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    connect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    update?: OrderSyncTaskUpdateWithWhereUniqueWithoutShopOrderInput | OrderSyncTaskUpdateWithWhereUniqueWithoutShopOrderInput[]
    updateMany?: OrderSyncTaskUpdateManyWithWhereWithoutShopOrderInput | OrderSyncTaskUpdateManyWithWhereWithoutShopOrderInput[]
    deleteMany?: OrderSyncTaskScalarWhereInput | OrderSyncTaskScalarWhereInput[]
  }

  export type ShopOrderCreateNestedOneWithoutPaymentAttemptsInput = {
    create?: XOR<ShopOrderCreateWithoutPaymentAttemptsInput, ShopOrderUncheckedCreateWithoutPaymentAttemptsInput>
    connectOrCreate?: ShopOrderCreateOrConnectWithoutPaymentAttemptsInput
    connect?: ShopOrderWhereUniqueInput
  }

  export type OrderSyncTaskCreateNestedManyWithoutPaymentAttemptInput = {
    create?: XOR<OrderSyncTaskCreateWithoutPaymentAttemptInput, OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput> | OrderSyncTaskCreateWithoutPaymentAttemptInput[] | OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput[]
    connectOrCreate?: OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput | OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput[]
    createMany?: OrderSyncTaskCreateManyPaymentAttemptInputEnvelope
    connect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
  }

  export type OrderSyncTaskUncheckedCreateNestedManyWithoutPaymentAttemptInput = {
    create?: XOR<OrderSyncTaskCreateWithoutPaymentAttemptInput, OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput> | OrderSyncTaskCreateWithoutPaymentAttemptInput[] | OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput[]
    connectOrCreate?: OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput | OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput[]
    createMany?: OrderSyncTaskCreateManyPaymentAttemptInputEnvelope
    connect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
  }

  export type EnumPaymentAttemptStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentAttemptStatus
  }

  export type ShopOrderUpdateOneRequiredWithoutPaymentAttemptsNestedInput = {
    create?: XOR<ShopOrderCreateWithoutPaymentAttemptsInput, ShopOrderUncheckedCreateWithoutPaymentAttemptsInput>
    connectOrCreate?: ShopOrderCreateOrConnectWithoutPaymentAttemptsInput
    upsert?: ShopOrderUpsertWithoutPaymentAttemptsInput
    connect?: ShopOrderWhereUniqueInput
    update?: XOR<XOR<ShopOrderUpdateToOneWithWhereWithoutPaymentAttemptsInput, ShopOrderUpdateWithoutPaymentAttemptsInput>, ShopOrderUncheckedUpdateWithoutPaymentAttemptsInput>
  }

  export type OrderSyncTaskUpdateManyWithoutPaymentAttemptNestedInput = {
    create?: XOR<OrderSyncTaskCreateWithoutPaymentAttemptInput, OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput> | OrderSyncTaskCreateWithoutPaymentAttemptInput[] | OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput[]
    connectOrCreate?: OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput | OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput[]
    upsert?: OrderSyncTaskUpsertWithWhereUniqueWithoutPaymentAttemptInput | OrderSyncTaskUpsertWithWhereUniqueWithoutPaymentAttemptInput[]
    createMany?: OrderSyncTaskCreateManyPaymentAttemptInputEnvelope
    set?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    disconnect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    delete?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    connect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    update?: OrderSyncTaskUpdateWithWhereUniqueWithoutPaymentAttemptInput | OrderSyncTaskUpdateWithWhereUniqueWithoutPaymentAttemptInput[]
    updateMany?: OrderSyncTaskUpdateManyWithWhereWithoutPaymentAttemptInput | OrderSyncTaskUpdateManyWithWhereWithoutPaymentAttemptInput[]
    deleteMany?: OrderSyncTaskScalarWhereInput | OrderSyncTaskScalarWhereInput[]
  }

  export type OrderSyncTaskUncheckedUpdateManyWithoutPaymentAttemptNestedInput = {
    create?: XOR<OrderSyncTaskCreateWithoutPaymentAttemptInput, OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput> | OrderSyncTaskCreateWithoutPaymentAttemptInput[] | OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput[]
    connectOrCreate?: OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput | OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput[]
    upsert?: OrderSyncTaskUpsertWithWhereUniqueWithoutPaymentAttemptInput | OrderSyncTaskUpsertWithWhereUniqueWithoutPaymentAttemptInput[]
    createMany?: OrderSyncTaskCreateManyPaymentAttemptInputEnvelope
    set?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    disconnect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    delete?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    connect?: OrderSyncTaskWhereUniqueInput | OrderSyncTaskWhereUniqueInput[]
    update?: OrderSyncTaskUpdateWithWhereUniqueWithoutPaymentAttemptInput | OrderSyncTaskUpdateWithWhereUniqueWithoutPaymentAttemptInput[]
    updateMany?: OrderSyncTaskUpdateManyWithWhereWithoutPaymentAttemptInput | OrderSyncTaskUpdateManyWithWhereWithoutPaymentAttemptInput[]
    deleteMany?: OrderSyncTaskScalarWhereInput | OrderSyncTaskScalarWhereInput[]
  }

  export type ShopOrderCreateNestedOneWithoutSyncTasksInput = {
    create?: XOR<ShopOrderCreateWithoutSyncTasksInput, ShopOrderUncheckedCreateWithoutSyncTasksInput>
    connectOrCreate?: ShopOrderCreateOrConnectWithoutSyncTasksInput
    connect?: ShopOrderWhereUniqueInput
  }

  export type ShopPaymentAttemptCreateNestedOneWithoutSyncTasksInput = {
    create?: XOR<ShopPaymentAttemptCreateWithoutSyncTasksInput, ShopPaymentAttemptUncheckedCreateWithoutSyncTasksInput>
    connectOrCreate?: ShopPaymentAttemptCreateOrConnectWithoutSyncTasksInput
    connect?: ShopPaymentAttemptWhereUniqueInput
  }

  export type EnumSyncTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.SyncTaskStatus
  }

  export type ShopOrderUpdateOneWithoutSyncTasksNestedInput = {
    create?: XOR<ShopOrderCreateWithoutSyncTasksInput, ShopOrderUncheckedCreateWithoutSyncTasksInput>
    connectOrCreate?: ShopOrderCreateOrConnectWithoutSyncTasksInput
    upsert?: ShopOrderUpsertWithoutSyncTasksInput
    disconnect?: ShopOrderWhereInput | boolean
    delete?: ShopOrderWhereInput | boolean
    connect?: ShopOrderWhereUniqueInput
    update?: XOR<XOR<ShopOrderUpdateToOneWithWhereWithoutSyncTasksInput, ShopOrderUpdateWithoutSyncTasksInput>, ShopOrderUncheckedUpdateWithoutSyncTasksInput>
  }

  export type ShopPaymentAttemptUpdateOneWithoutSyncTasksNestedInput = {
    create?: XOR<ShopPaymentAttemptCreateWithoutSyncTasksInput, ShopPaymentAttemptUncheckedCreateWithoutSyncTasksInput>
    connectOrCreate?: ShopPaymentAttemptCreateOrConnectWithoutSyncTasksInput
    upsert?: ShopPaymentAttemptUpsertWithoutSyncTasksInput
    disconnect?: ShopPaymentAttemptWhereInput | boolean
    delete?: ShopPaymentAttemptWhereInput | boolean
    connect?: ShopPaymentAttemptWhereUniqueInput
    update?: XOR<XOR<ShopPaymentAttemptUpdateToOneWithWhereWithoutSyncTasksInput, ShopPaymentAttemptUpdateWithoutSyncTasksInput>, ShopPaymentAttemptUncheckedUpdateWithoutSyncTasksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumProductSaleModeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductSaleMode | EnumProductSaleModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductSaleMode[] | ListEnumProductSaleModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductSaleMode[] | ListEnumProductSaleModeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductSaleModeFilter<$PrismaModel> | $Enums.ProductSaleMode
  }

  export type NestedEnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumProductSaleModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductSaleMode | EnumProductSaleModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductSaleMode[] | ListEnumProductSaleModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductSaleMode[] | ListEnumProductSaleModeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductSaleModeWithAggregatesFilter<$PrismaModel> | $Enums.ProductSaleMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductSaleModeFilter<$PrismaModel>
    _max?: NestedEnumProductSaleModeFilter<$PrismaModel>
  }

  export type NestedEnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCardItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CardItemStatus | EnumCardItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CardItemStatus[] | ListEnumCardItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CardItemStatus[] | ListEnumCardItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCardItemStatusFilter<$PrismaModel> | $Enums.CardItemStatus
  }

  export type NestedEnumCardItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CardItemStatus | EnumCardItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CardItemStatus[] | ListEnumCardItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CardItemStatus[] | ListEnumCardItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCardItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.CardItemStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCardItemStatusFilter<$PrismaModel>
    _max?: NestedEnumCardItemStatusFilter<$PrismaModel>
  }

  export type NestedEnumShopOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShopOrderStatus | EnumShopOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShopOrderStatus[] | ListEnumShopOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShopOrderStatus[] | ListEnumShopOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShopOrderStatusFilter<$PrismaModel> | $Enums.ShopOrderStatus
  }

  export type NestedEnumShopOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShopOrderStatus | EnumShopOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShopOrderStatus[] | ListEnumShopOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShopOrderStatus[] | ListEnumShopOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShopOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShopOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShopOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumShopOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentAttemptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentAttemptStatus | EnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentAttemptStatus[] | ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentAttemptStatus[] | ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentAttemptStatusFilter<$PrismaModel> | $Enums.PaymentAttemptStatus
  }

  export type NestedEnumPaymentAttemptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentAttemptStatus | EnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentAttemptStatus[] | ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentAttemptStatus[] | ListEnumPaymentAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentAttemptStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentAttemptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentAttemptStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentAttemptStatusFilter<$PrismaModel>
  }

  export type NestedEnumSyncTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncTaskStatus | EnumSyncTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncTaskStatus[] | ListEnumSyncTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncTaskStatus[] | ListEnumSyncTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncTaskStatusFilter<$PrismaModel> | $Enums.SyncTaskStatus
  }

  export type NestedEnumSyncTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncTaskStatus | EnumSyncTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncTaskStatus[] | ListEnumSyncTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncTaskStatus[] | ListEnumSyncTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.SyncTaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSyncTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumSyncTaskStatusFilter<$PrismaModel>
  }

  export type PaymentProfileCreateWithoutOwnerInput = {
    id?: string
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutPaymentProfileInput
    orders?: ShopOrderCreateNestedManyWithoutPaymentProfileInput
    revisions?: PaymentProfileRevisionCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutPaymentProfileInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutPaymentProfileInput
    revisions?: PaymentProfileRevisionUncheckedCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileCreateOrConnectWithoutOwnerInput = {
    where: PaymentProfileWhereUniqueInput
    create: XOR<PaymentProfileCreateWithoutOwnerInput, PaymentProfileUncheckedCreateWithoutOwnerInput>
  }

  export type PaymentProfileUpsertWithoutOwnerInput = {
    update: XOR<PaymentProfileUpdateWithoutOwnerInput, PaymentProfileUncheckedUpdateWithoutOwnerInput>
    create: XOR<PaymentProfileCreateWithoutOwnerInput, PaymentProfileUncheckedCreateWithoutOwnerInput>
    where?: PaymentProfileWhereInput
  }

  export type PaymentProfileUpdateToOneWithWhereWithoutOwnerInput = {
    where?: PaymentProfileWhereInput
    data: XOR<PaymentProfileUpdateWithoutOwnerInput, PaymentProfileUncheckedUpdateWithoutOwnerInput>
  }

  export type PaymentProfileUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutPaymentProfileNestedInput
    orders?: ShopOrderUpdateManyWithoutPaymentProfileNestedInput
    revisions?: PaymentProfileRevisionUpdateManyWithoutPaymentProfileNestedInput
  }

  export type PaymentProfileUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutPaymentProfileNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutPaymentProfileNestedInput
    revisions?: PaymentProfileRevisionUncheckedUpdateManyWithoutPaymentProfileNestedInput
  }

  export type PaymentProfileCreateWithoutProductsInput = {
    id?: string
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: MerchantAccountCreateNestedOneWithoutPaymentProfileInput
    orders?: ShopOrderCreateNestedManyWithoutPaymentProfileInput
    revisions?: PaymentProfileRevisionCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileUncheckedCreateWithoutProductsInput = {
    id?: string
    ownerId?: string | null
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: ShopOrderUncheckedCreateNestedManyWithoutPaymentProfileInput
    revisions?: PaymentProfileRevisionUncheckedCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileCreateOrConnectWithoutProductsInput = {
    where: PaymentProfileWhereUniqueInput
    create: XOR<PaymentProfileCreateWithoutProductsInput, PaymentProfileUncheckedCreateWithoutProductsInput>
  }

  export type ProductSkuCreateWithoutProductInput = {
    id?: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemCreateNestedManyWithoutSkuInput
    orders?: ShopOrderCreateNestedManyWithoutSkuInput
  }

  export type ProductSkuUncheckedCreateWithoutProductInput = {
    id?: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutSkuInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutSkuInput
  }

  export type ProductSkuCreateOrConnectWithoutProductInput = {
    where: ProductSkuWhereUniqueInput
    create: XOR<ProductSkuCreateWithoutProductInput, ProductSkuUncheckedCreateWithoutProductInput>
  }

  export type ProductSkuCreateManyProductInputEnvelope = {
    data: ProductSkuCreateManyProductInput | ProductSkuCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CardItemCreateWithoutProductInput = {
    id?: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sku: ProductSkuCreateNestedOneWithoutCardsInput
    order?: ShopOrderCreateNestedOneWithoutCardsInput
  }

  export type CardItemUncheckedCreateWithoutProductInput = {
    id?: string
    skuId: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    orderId?: string | null
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardItemCreateOrConnectWithoutProductInput = {
    where: CardItemWhereUniqueInput
    create: XOR<CardItemCreateWithoutProductInput, CardItemUncheckedCreateWithoutProductInput>
  }

  export type CardItemCreateManyProductInputEnvelope = {
    data: CardItemCreateManyProductInput | CardItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ShopOrderCreateWithoutProductInput = {
    id?: string
    orderNo: string
    publicToken: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProfile?: PaymentProfileCreateNestedOneWithoutOrdersInput
    sku: ProductSkuCreateNestedOneWithoutOrdersInput
    cards?: CardItemCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderUncheckedCreateWithoutProductInput = {
    id?: string
    orderNo: string
    publicToken: string
    paymentProfileId?: string | null
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptUncheckedCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskUncheckedCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderCreateOrConnectWithoutProductInput = {
    where: ShopOrderWhereUniqueInput
    create: XOR<ShopOrderCreateWithoutProductInput, ShopOrderUncheckedCreateWithoutProductInput>
  }

  export type ShopOrderCreateManyProductInputEnvelope = {
    data: ShopOrderCreateManyProductInput | ShopOrderCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type PaymentProfileUpsertWithoutProductsInput = {
    update: XOR<PaymentProfileUpdateWithoutProductsInput, PaymentProfileUncheckedUpdateWithoutProductsInput>
    create: XOR<PaymentProfileCreateWithoutProductsInput, PaymentProfileUncheckedCreateWithoutProductsInput>
    where?: PaymentProfileWhereInput
  }

  export type PaymentProfileUpdateToOneWithWhereWithoutProductsInput = {
    where?: PaymentProfileWhereInput
    data: XOR<PaymentProfileUpdateWithoutProductsInput, PaymentProfileUncheckedUpdateWithoutProductsInput>
  }

  export type PaymentProfileUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: MerchantAccountUpdateOneWithoutPaymentProfileNestedInput
    orders?: ShopOrderUpdateManyWithoutPaymentProfileNestedInput
    revisions?: PaymentProfileRevisionUpdateManyWithoutPaymentProfileNestedInput
  }

  export type PaymentProfileUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: ShopOrderUncheckedUpdateManyWithoutPaymentProfileNestedInput
    revisions?: PaymentProfileRevisionUncheckedUpdateManyWithoutPaymentProfileNestedInput
  }

  export type ProductSkuUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductSkuWhereUniqueInput
    update: XOR<ProductSkuUpdateWithoutProductInput, ProductSkuUncheckedUpdateWithoutProductInput>
    create: XOR<ProductSkuCreateWithoutProductInput, ProductSkuUncheckedCreateWithoutProductInput>
  }

  export type ProductSkuUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductSkuWhereUniqueInput
    data: XOR<ProductSkuUpdateWithoutProductInput, ProductSkuUncheckedUpdateWithoutProductInput>
  }

  export type ProductSkuUpdateManyWithWhereWithoutProductInput = {
    where: ProductSkuScalarWhereInput
    data: XOR<ProductSkuUpdateManyMutationInput, ProductSkuUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductSkuScalarWhereInput = {
    AND?: ProductSkuScalarWhereInput | ProductSkuScalarWhereInput[]
    OR?: ProductSkuScalarWhereInput[]
    NOT?: ProductSkuScalarWhereInput | ProductSkuScalarWhereInput[]
    id?: StringFilter<"ProductSku"> | string
    productId?: StringFilter<"ProductSku"> | string
    name?: StringFilter<"ProductSku"> | string
    summary?: StringNullableFilter<"ProductSku"> | string | null
    priceCents?: IntFilter<"ProductSku"> | number
    enabled?: BoolFilter<"ProductSku"> | boolean
    sortOrder?: IntFilter<"ProductSku"> | number
    createdAt?: DateTimeFilter<"ProductSku"> | Date | string
    updatedAt?: DateTimeFilter<"ProductSku"> | Date | string
  }

  export type CardItemUpsertWithWhereUniqueWithoutProductInput = {
    where: CardItemWhereUniqueInput
    update: XOR<CardItemUpdateWithoutProductInput, CardItemUncheckedUpdateWithoutProductInput>
    create: XOR<CardItemCreateWithoutProductInput, CardItemUncheckedCreateWithoutProductInput>
  }

  export type CardItemUpdateWithWhereUniqueWithoutProductInput = {
    where: CardItemWhereUniqueInput
    data: XOR<CardItemUpdateWithoutProductInput, CardItemUncheckedUpdateWithoutProductInput>
  }

  export type CardItemUpdateManyWithWhereWithoutProductInput = {
    where: CardItemScalarWhereInput
    data: XOR<CardItemUpdateManyMutationInput, CardItemUncheckedUpdateManyWithoutProductInput>
  }

  export type CardItemScalarWhereInput = {
    AND?: CardItemScalarWhereInput | CardItemScalarWhereInput[]
    OR?: CardItemScalarWhereInput[]
    NOT?: CardItemScalarWhereInput | CardItemScalarWhereInput[]
    id?: StringFilter<"CardItem"> | string
    productId?: StringFilter<"CardItem"> | string
    skuId?: StringFilter<"CardItem"> | string
    batchName?: StringNullableFilter<"CardItem"> | string | null
    secret?: StringFilter<"CardItem"> | string
    status?: EnumCardItemStatusFilter<"CardItem"> | $Enums.CardItemStatus
    orderId?: StringNullableFilter<"CardItem"> | string | null
    reservedAt?: DateTimeNullableFilter<"CardItem"> | Date | string | null
    soldAt?: DateTimeNullableFilter<"CardItem"> | Date | string | null
    createdAt?: DateTimeFilter<"CardItem"> | Date | string
    updatedAt?: DateTimeFilter<"CardItem"> | Date | string
  }

  export type ShopOrderUpsertWithWhereUniqueWithoutProductInput = {
    where: ShopOrderWhereUniqueInput
    update: XOR<ShopOrderUpdateWithoutProductInput, ShopOrderUncheckedUpdateWithoutProductInput>
    create: XOR<ShopOrderCreateWithoutProductInput, ShopOrderUncheckedCreateWithoutProductInput>
  }

  export type ShopOrderUpdateWithWhereUniqueWithoutProductInput = {
    where: ShopOrderWhereUniqueInput
    data: XOR<ShopOrderUpdateWithoutProductInput, ShopOrderUncheckedUpdateWithoutProductInput>
  }

  export type ShopOrderUpdateManyWithWhereWithoutProductInput = {
    where: ShopOrderScalarWhereInput
    data: XOR<ShopOrderUpdateManyMutationInput, ShopOrderUncheckedUpdateManyWithoutProductInput>
  }

  export type ShopOrderScalarWhereInput = {
    AND?: ShopOrderScalarWhereInput | ShopOrderScalarWhereInput[]
    OR?: ShopOrderScalarWhereInput[]
    NOT?: ShopOrderScalarWhereInput | ShopOrderScalarWhereInput[]
    id?: StringFilter<"ShopOrder"> | string
    orderNo?: StringFilter<"ShopOrder"> | string
    publicToken?: StringFilter<"ShopOrder"> | string
    productId?: StringFilter<"ShopOrder"> | string
    paymentProfileId?: StringNullableFilter<"ShopOrder"> | string | null
    skuId?: StringFilter<"ShopOrder"> | string
    quantity?: IntFilter<"ShopOrder"> | number
    customerEmail?: StringFilter<"ShopOrder"> | string
    amountCents?: IntFilter<"ShopOrder"> | number
    channelCode?: StringFilter<"ShopOrder"> | string
    status?: EnumShopOrderStatusFilter<"ShopOrder"> | $Enums.ShopOrderStatus
    novapayOrderId?: StringNullableFilter<"ShopOrder"> | string | null
    novapayStatus?: StringNullableFilter<"ShopOrder"> | string | null
    checkoutUrl?: StringNullableFilter<"ShopOrder"> | string | null
    hostedCheckoutUrl?: StringNullableFilter<"ShopOrder"> | string | null
    failureMessage?: StringNullableFilter<"ShopOrder"> | string | null
    expiresAt?: DateTimeFilter<"ShopOrder"> | Date | string
    paidAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    fulfilledAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    lastSyncedAt?: DateTimeNullableFilter<"ShopOrder"> | Date | string | null
    lastNovaCreateResponse?: StringNullableFilter<"ShopOrder"> | string | null
    lastNovaPayload?: StringNullableFilter<"ShopOrder"> | string | null
    createdAt?: DateTimeFilter<"ShopOrder"> | Date | string
    updatedAt?: DateTimeFilter<"ShopOrder"> | Date | string
  }

  export type ProductCreateWithoutSkusInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProfile?: PaymentProfileCreateNestedOneWithoutProductsInput
    cards?: CardItemCreateNestedManyWithoutProductInput
    orders?: ShopOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSkusInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    paymentProfileId?: string | null
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutProductInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSkusInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSkusInput, ProductUncheckedCreateWithoutSkusInput>
  }

  export type CardItemCreateWithoutSkuInput = {
    id?: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutCardsInput
    order?: ShopOrderCreateNestedOneWithoutCardsInput
  }

  export type CardItemUncheckedCreateWithoutSkuInput = {
    id?: string
    productId: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    orderId?: string | null
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardItemCreateOrConnectWithoutSkuInput = {
    where: CardItemWhereUniqueInput
    create: XOR<CardItemCreateWithoutSkuInput, CardItemUncheckedCreateWithoutSkuInput>
  }

  export type CardItemCreateManySkuInputEnvelope = {
    data: CardItemCreateManySkuInput | CardItemCreateManySkuInput[]
    skipDuplicates?: boolean
  }

  export type ShopOrderCreateWithoutSkuInput = {
    id?: string
    orderNo: string
    publicToken: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutOrdersInput
    paymentProfile?: PaymentProfileCreateNestedOneWithoutOrdersInput
    cards?: CardItemCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderUncheckedCreateWithoutSkuInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    paymentProfileId?: string | null
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptUncheckedCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskUncheckedCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderCreateOrConnectWithoutSkuInput = {
    where: ShopOrderWhereUniqueInput
    create: XOR<ShopOrderCreateWithoutSkuInput, ShopOrderUncheckedCreateWithoutSkuInput>
  }

  export type ShopOrderCreateManySkuInputEnvelope = {
    data: ShopOrderCreateManySkuInput | ShopOrderCreateManySkuInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutSkusInput = {
    update: XOR<ProductUpdateWithoutSkusInput, ProductUncheckedUpdateWithoutSkusInput>
    create: XOR<ProductCreateWithoutSkusInput, ProductUncheckedCreateWithoutSkusInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSkusInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSkusInput, ProductUncheckedUpdateWithoutSkusInput>
  }

  export type ProductUpdateWithoutSkusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProfile?: PaymentProfileUpdateOneWithoutProductsNestedInput
    cards?: CardItemUpdateManyWithoutProductNestedInput
    orders?: ShopOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSkusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutProductNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CardItemUpsertWithWhereUniqueWithoutSkuInput = {
    where: CardItemWhereUniqueInput
    update: XOR<CardItemUpdateWithoutSkuInput, CardItemUncheckedUpdateWithoutSkuInput>
    create: XOR<CardItemCreateWithoutSkuInput, CardItemUncheckedCreateWithoutSkuInput>
  }

  export type CardItemUpdateWithWhereUniqueWithoutSkuInput = {
    where: CardItemWhereUniqueInput
    data: XOR<CardItemUpdateWithoutSkuInput, CardItemUncheckedUpdateWithoutSkuInput>
  }

  export type CardItemUpdateManyWithWhereWithoutSkuInput = {
    where: CardItemScalarWhereInput
    data: XOR<CardItemUpdateManyMutationInput, CardItemUncheckedUpdateManyWithoutSkuInput>
  }

  export type ShopOrderUpsertWithWhereUniqueWithoutSkuInput = {
    where: ShopOrderWhereUniqueInput
    update: XOR<ShopOrderUpdateWithoutSkuInput, ShopOrderUncheckedUpdateWithoutSkuInput>
    create: XOR<ShopOrderCreateWithoutSkuInput, ShopOrderUncheckedCreateWithoutSkuInput>
  }

  export type ShopOrderUpdateWithWhereUniqueWithoutSkuInput = {
    where: ShopOrderWhereUniqueInput
    data: XOR<ShopOrderUpdateWithoutSkuInput, ShopOrderUncheckedUpdateWithoutSkuInput>
  }

  export type ShopOrderUpdateManyWithWhereWithoutSkuInput = {
    where: ShopOrderScalarWhereInput
    data: XOR<ShopOrderUpdateManyMutationInput, ShopOrderUncheckedUpdateManyWithoutSkuInput>
  }

  export type MerchantAccountCreateWithoutPaymentProfileInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: string | null
    storeAnnouncementBody?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantAccountUncheckedCreateWithoutPaymentProfileInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    isActive?: boolean
    storeAnnouncementEnabled?: boolean
    storeAnnouncementTitle?: string | null
    storeAnnouncementBody?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantAccountCreateOrConnectWithoutPaymentProfileInput = {
    where: MerchantAccountWhereUniqueInput
    create: XOR<MerchantAccountCreateWithoutPaymentProfileInput, MerchantAccountUncheckedCreateWithoutPaymentProfileInput>
  }

  export type ProductCreateWithoutPaymentProfileInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: ProductSkuCreateNestedManyWithoutProductInput
    cards?: CardItemCreateNestedManyWithoutProductInput
    orders?: ShopOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutPaymentProfileInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: ProductSkuUncheckedCreateNestedManyWithoutProductInput
    cards?: CardItemUncheckedCreateNestedManyWithoutProductInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutPaymentProfileInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutPaymentProfileInput, ProductUncheckedCreateWithoutPaymentProfileInput>
  }

  export type ProductCreateManyPaymentProfileInputEnvelope = {
    data: ProductCreateManyPaymentProfileInput | ProductCreateManyPaymentProfileInput[]
    skipDuplicates?: boolean
  }

  export type ShopOrderCreateWithoutPaymentProfileInput = {
    id?: string
    orderNo: string
    publicToken: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutOrdersInput
    sku: ProductSkuCreateNestedOneWithoutOrdersInput
    cards?: CardItemCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderUncheckedCreateWithoutPaymentProfileInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptUncheckedCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskUncheckedCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderCreateOrConnectWithoutPaymentProfileInput = {
    where: ShopOrderWhereUniqueInput
    create: XOR<ShopOrderCreateWithoutPaymentProfileInput, ShopOrderUncheckedCreateWithoutPaymentProfileInput>
  }

  export type ShopOrderCreateManyPaymentProfileInputEnvelope = {
    data: ShopOrderCreateManyPaymentProfileInput | ShopOrderCreateManyPaymentProfileInput[]
    skipDuplicates?: boolean
  }

  export type PaymentProfileRevisionCreateWithoutPaymentProfileInput = {
    id?: string
    version: number
    sourceScope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    changeType: string
    summary: string
    snapshot: string
    createdAt?: Date | string
  }

  export type PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput = {
    id?: string
    version: number
    sourceScope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    changeType: string
    summary: string
    snapshot: string
    createdAt?: Date | string
  }

  export type PaymentProfileRevisionCreateOrConnectWithoutPaymentProfileInput = {
    where: PaymentProfileRevisionWhereUniqueInput
    create: XOR<PaymentProfileRevisionCreateWithoutPaymentProfileInput, PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput>
  }

  export type PaymentProfileRevisionCreateManyPaymentProfileInputEnvelope = {
    data: PaymentProfileRevisionCreateManyPaymentProfileInput | PaymentProfileRevisionCreateManyPaymentProfileInput[]
    skipDuplicates?: boolean
  }

  export type MerchantAccountUpsertWithoutPaymentProfileInput = {
    update: XOR<MerchantAccountUpdateWithoutPaymentProfileInput, MerchantAccountUncheckedUpdateWithoutPaymentProfileInput>
    create: XOR<MerchantAccountCreateWithoutPaymentProfileInput, MerchantAccountUncheckedCreateWithoutPaymentProfileInput>
    where?: MerchantAccountWhereInput
  }

  export type MerchantAccountUpdateToOneWithWhereWithoutPaymentProfileInput = {
    where?: MerchantAccountWhereInput
    data: XOR<MerchantAccountUpdateWithoutPaymentProfileInput, MerchantAccountUncheckedUpdateWithoutPaymentProfileInput>
  }

  export type MerchantAccountUpdateWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementEnabled?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    storeAnnouncementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantAccountUncheckedUpdateWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementEnabled?: BoolFieldUpdateOperationsInput | boolean
    storeAnnouncementTitle?: NullableStringFieldUpdateOperationsInput | string | null
    storeAnnouncementBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutPaymentProfileInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutPaymentProfileInput, ProductUncheckedUpdateWithoutPaymentProfileInput>
    create: XOR<ProductCreateWithoutPaymentProfileInput, ProductUncheckedCreateWithoutPaymentProfileInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutPaymentProfileInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutPaymentProfileInput, ProductUncheckedUpdateWithoutPaymentProfileInput>
  }

  export type ProductUpdateManyWithWhereWithoutPaymentProfileInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutPaymentProfileInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    summary?: StringNullableFilter<"Product"> | string | null
    description?: StringNullableFilter<"Product"> | string | null
    priceCents?: IntFilter<"Product"> | number
    saleMode?: EnumProductSaleModeFilter<"Product"> | $Enums.ProductSaleMode
    paymentProfileId?: StringNullableFilter<"Product"> | string | null
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ShopOrderUpsertWithWhereUniqueWithoutPaymentProfileInput = {
    where: ShopOrderWhereUniqueInput
    update: XOR<ShopOrderUpdateWithoutPaymentProfileInput, ShopOrderUncheckedUpdateWithoutPaymentProfileInput>
    create: XOR<ShopOrderCreateWithoutPaymentProfileInput, ShopOrderUncheckedCreateWithoutPaymentProfileInput>
  }

  export type ShopOrderUpdateWithWhereUniqueWithoutPaymentProfileInput = {
    where: ShopOrderWhereUniqueInput
    data: XOR<ShopOrderUpdateWithoutPaymentProfileInput, ShopOrderUncheckedUpdateWithoutPaymentProfileInput>
  }

  export type ShopOrderUpdateManyWithWhereWithoutPaymentProfileInput = {
    where: ShopOrderScalarWhereInput
    data: XOR<ShopOrderUpdateManyMutationInput, ShopOrderUncheckedUpdateManyWithoutPaymentProfileInput>
  }

  export type PaymentProfileRevisionUpsertWithWhereUniqueWithoutPaymentProfileInput = {
    where: PaymentProfileRevisionWhereUniqueInput
    update: XOR<PaymentProfileRevisionUpdateWithoutPaymentProfileInput, PaymentProfileRevisionUncheckedUpdateWithoutPaymentProfileInput>
    create: XOR<PaymentProfileRevisionCreateWithoutPaymentProfileInput, PaymentProfileRevisionUncheckedCreateWithoutPaymentProfileInput>
  }

  export type PaymentProfileRevisionUpdateWithWhereUniqueWithoutPaymentProfileInput = {
    where: PaymentProfileRevisionWhereUniqueInput
    data: XOR<PaymentProfileRevisionUpdateWithoutPaymentProfileInput, PaymentProfileRevisionUncheckedUpdateWithoutPaymentProfileInput>
  }

  export type PaymentProfileRevisionUpdateManyWithWhereWithoutPaymentProfileInput = {
    where: PaymentProfileRevisionScalarWhereInput
    data: XOR<PaymentProfileRevisionUpdateManyMutationInput, PaymentProfileRevisionUncheckedUpdateManyWithoutPaymentProfileInput>
  }

  export type PaymentProfileRevisionScalarWhereInput = {
    AND?: PaymentProfileRevisionScalarWhereInput | PaymentProfileRevisionScalarWhereInput[]
    OR?: PaymentProfileRevisionScalarWhereInput[]
    NOT?: PaymentProfileRevisionScalarWhereInput | PaymentProfileRevisionScalarWhereInput[]
    id?: StringFilter<"PaymentProfileRevision"> | string
    paymentProfileId?: StringFilter<"PaymentProfileRevision"> | string
    version?: IntFilter<"PaymentProfileRevision"> | number
    sourceScope?: StringFilter<"PaymentProfileRevision"> | string
    actorType?: StringFilter<"PaymentProfileRevision"> | string
    actorId?: StringNullableFilter<"PaymentProfileRevision"> | string | null
    actorLabel?: StringFilter<"PaymentProfileRevision"> | string
    changeType?: StringFilter<"PaymentProfileRevision"> | string
    summary?: StringFilter<"PaymentProfileRevision"> | string
    snapshot?: StringFilter<"PaymentProfileRevision"> | string
    createdAt?: DateTimeFilter<"PaymentProfileRevision"> | Date | string
  }

  export type PaymentProfileCreateWithoutRevisionsInput = {
    id?: string
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: MerchantAccountCreateNestedOneWithoutPaymentProfileInput
    products?: ProductCreateNestedManyWithoutPaymentProfileInput
    orders?: ShopOrderCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileUncheckedCreateWithoutRevisionsInput = {
    id?: string
    ownerId?: string | null
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutPaymentProfileInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileCreateOrConnectWithoutRevisionsInput = {
    where: PaymentProfileWhereUniqueInput
    create: XOR<PaymentProfileCreateWithoutRevisionsInput, PaymentProfileUncheckedCreateWithoutRevisionsInput>
  }

  export type PaymentProfileUpsertWithoutRevisionsInput = {
    update: XOR<PaymentProfileUpdateWithoutRevisionsInput, PaymentProfileUncheckedUpdateWithoutRevisionsInput>
    create: XOR<PaymentProfileCreateWithoutRevisionsInput, PaymentProfileUncheckedCreateWithoutRevisionsInput>
    where?: PaymentProfileWhereInput
  }

  export type PaymentProfileUpdateToOneWithWhereWithoutRevisionsInput = {
    where?: PaymentProfileWhereInput
    data: XOR<PaymentProfileUpdateWithoutRevisionsInput, PaymentProfileUncheckedUpdateWithoutRevisionsInput>
  }

  export type PaymentProfileUpdateWithoutRevisionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: MerchantAccountUpdateOneWithoutPaymentProfileNestedInput
    products?: ProductUpdateManyWithoutPaymentProfileNestedInput
    orders?: ShopOrderUpdateManyWithoutPaymentProfileNestedInput
  }

  export type PaymentProfileUncheckedUpdateWithoutRevisionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutPaymentProfileNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutPaymentProfileNestedInput
  }

  export type ProductCreateWithoutCardsInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProfile?: PaymentProfileCreateNestedOneWithoutProductsInput
    skus?: ProductSkuCreateNestedManyWithoutProductInput
    orders?: ShopOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCardsInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    paymentProfileId?: string | null
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: ProductSkuUncheckedCreateNestedManyWithoutProductInput
    orders?: ShopOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCardsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCardsInput, ProductUncheckedCreateWithoutCardsInput>
  }

  export type ProductSkuCreateWithoutCardsInput = {
    id?: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutSkusInput
    orders?: ShopOrderCreateNestedManyWithoutSkuInput
  }

  export type ProductSkuUncheckedCreateWithoutCardsInput = {
    id?: string
    productId: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: ShopOrderUncheckedCreateNestedManyWithoutSkuInput
  }

  export type ProductSkuCreateOrConnectWithoutCardsInput = {
    where: ProductSkuWhereUniqueInput
    create: XOR<ProductSkuCreateWithoutCardsInput, ProductSkuUncheckedCreateWithoutCardsInput>
  }

  export type ShopOrderCreateWithoutCardsInput = {
    id?: string
    orderNo: string
    publicToken: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutOrdersInput
    paymentProfile?: PaymentProfileCreateNestedOneWithoutOrdersInput
    sku: ProductSkuCreateNestedOneWithoutOrdersInput
    paymentAttempts?: ShopPaymentAttemptCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderUncheckedCreateWithoutCardsInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    paymentProfileId?: string | null
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentAttempts?: ShopPaymentAttemptUncheckedCreateNestedManyWithoutShopOrderInput
    syncTasks?: OrderSyncTaskUncheckedCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderCreateOrConnectWithoutCardsInput = {
    where: ShopOrderWhereUniqueInput
    create: XOR<ShopOrderCreateWithoutCardsInput, ShopOrderUncheckedCreateWithoutCardsInput>
  }

  export type ProductUpsertWithoutCardsInput = {
    update: XOR<ProductUpdateWithoutCardsInput, ProductUncheckedUpdateWithoutCardsInput>
    create: XOR<ProductCreateWithoutCardsInput, ProductUncheckedCreateWithoutCardsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutCardsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutCardsInput, ProductUncheckedUpdateWithoutCardsInput>
  }

  export type ProductUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProfile?: PaymentProfileUpdateOneWithoutProductsNestedInput
    skus?: ProductSkuUpdateManyWithoutProductNestedInput
    orders?: ShopOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: ProductSkuUncheckedUpdateManyWithoutProductNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductSkuUpsertWithoutCardsInput = {
    update: XOR<ProductSkuUpdateWithoutCardsInput, ProductSkuUncheckedUpdateWithoutCardsInput>
    create: XOR<ProductSkuCreateWithoutCardsInput, ProductSkuUncheckedCreateWithoutCardsInput>
    where?: ProductSkuWhereInput
  }

  export type ProductSkuUpdateToOneWithWhereWithoutCardsInput = {
    where?: ProductSkuWhereInput
    data: XOR<ProductSkuUpdateWithoutCardsInput, ProductSkuUncheckedUpdateWithoutCardsInput>
  }

  export type ProductSkuUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSkusNestedInput
    orders?: ShopOrderUpdateManyWithoutSkuNestedInput
  }

  export type ProductSkuUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: ShopOrderUncheckedUpdateManyWithoutSkuNestedInput
  }

  export type ShopOrderUpsertWithoutCardsInput = {
    update: XOR<ShopOrderUpdateWithoutCardsInput, ShopOrderUncheckedUpdateWithoutCardsInput>
    create: XOR<ShopOrderCreateWithoutCardsInput, ShopOrderUncheckedCreateWithoutCardsInput>
    where?: ShopOrderWhereInput
  }

  export type ShopOrderUpdateToOneWithWhereWithoutCardsInput = {
    where?: ShopOrderWhereInput
    data: XOR<ShopOrderUpdateWithoutCardsInput, ShopOrderUncheckedUpdateWithoutCardsInput>
  }

  export type ShopOrderUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    paymentProfile?: PaymentProfileUpdateOneWithoutOrdersNestedInput
    sku?: ProductSkuUpdateOneRequiredWithoutOrdersNestedInput
    paymentAttempts?: ShopPaymentAttemptUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentAttempts?: ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUncheckedUpdateManyWithoutShopOrderNestedInput
  }

  export type ProductCreateWithoutOrdersInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentProfile?: PaymentProfileCreateNestedOneWithoutProductsInput
    skus?: ProductSkuCreateNestedManyWithoutProductInput
    cards?: CardItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    paymentProfileId?: string | null
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: ProductSkuUncheckedCreateNestedManyWithoutProductInput
    cards?: CardItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrdersInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
  }

  export type PaymentProfileCreateWithoutOrdersInput = {
    id?: string
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: MerchantAccountCreateNestedOneWithoutPaymentProfileInput
    products?: ProductCreateNestedManyWithoutPaymentProfileInput
    revisions?: PaymentProfileRevisionCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileUncheckedCreateWithoutOrdersInput = {
    id?: string
    ownerId?: string | null
    name: string
    merchantCode: string
    apiKey: string
    apiSecret: string
    notifySecret?: string | null
    defaultChannelCode: string
    enabledChannelCodes?: string | null
    isActive?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutPaymentProfileInput
    revisions?: PaymentProfileRevisionUncheckedCreateNestedManyWithoutPaymentProfileInput
  }

  export type PaymentProfileCreateOrConnectWithoutOrdersInput = {
    where: PaymentProfileWhereUniqueInput
    create: XOR<PaymentProfileCreateWithoutOrdersInput, PaymentProfileUncheckedCreateWithoutOrdersInput>
  }

  export type ProductSkuCreateWithoutOrdersInput = {
    id?: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutSkusInput
    cards?: CardItemCreateNestedManyWithoutSkuInput
  }

  export type ProductSkuUncheckedCreateWithoutOrdersInput = {
    id?: string
    productId: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutSkuInput
  }

  export type ProductSkuCreateOrConnectWithoutOrdersInput = {
    where: ProductSkuWhereUniqueInput
    create: XOR<ProductSkuCreateWithoutOrdersInput, ProductSkuUncheckedCreateWithoutOrdersInput>
  }

  export type CardItemCreateWithoutOrderInput = {
    id?: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutCardsInput
    sku: ProductSkuCreateNestedOneWithoutCardsInput
  }

  export type CardItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    skuId: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardItemCreateOrConnectWithoutOrderInput = {
    where: CardItemWhereUniqueInput
    create: XOR<CardItemCreateWithoutOrderInput, CardItemUncheckedCreateWithoutOrderInput>
  }

  export type CardItemCreateManyOrderInputEnvelope = {
    data: CardItemCreateManyOrderInput | CardItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type ShopPaymentAttemptCreateWithoutShopOrderInput = {
    id?: string
    externalOrderId: string
    novapayOrderId?: string | null
    merchantChannelAccountId?: string | null
    channelCode: string
    amountCents: number
    status?: $Enums.PaymentAttemptStatus
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    expiresAt?: Date | string | null
    callbackEventId?: string | null
    traceId: string
    createRequestPayload?: string | null
    createResponsePayload?: string | null
    lastRemotePayload?: string | null
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncTasks?: OrderSyncTaskCreateNestedManyWithoutPaymentAttemptInput
  }

  export type ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput = {
    id?: string
    externalOrderId: string
    novapayOrderId?: string | null
    merchantChannelAccountId?: string | null
    channelCode: string
    amountCents: number
    status?: $Enums.PaymentAttemptStatus
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    expiresAt?: Date | string | null
    callbackEventId?: string | null
    traceId: string
    createRequestPayload?: string | null
    createResponsePayload?: string | null
    lastRemotePayload?: string | null
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncTasks?: OrderSyncTaskUncheckedCreateNestedManyWithoutPaymentAttemptInput
  }

  export type ShopPaymentAttemptCreateOrConnectWithoutShopOrderInput = {
    where: ShopPaymentAttemptWhereUniqueInput
    create: XOR<ShopPaymentAttemptCreateWithoutShopOrderInput, ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput>
  }

  export type ShopPaymentAttemptCreateManyShopOrderInputEnvelope = {
    data: ShopPaymentAttemptCreateManyShopOrderInput | ShopPaymentAttemptCreateManyShopOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderSyncTaskCreateWithoutShopOrderInput = {
    id?: string
    taskType: string
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
    paymentAttempt?: ShopPaymentAttemptCreateNestedOneWithoutSyncTasksInput
  }

  export type OrderSyncTaskUncheckedCreateWithoutShopOrderInput = {
    id?: string
    taskType: string
    paymentAttemptId?: string | null
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
  }

  export type OrderSyncTaskCreateOrConnectWithoutShopOrderInput = {
    where: OrderSyncTaskWhereUniqueInput
    create: XOR<OrderSyncTaskCreateWithoutShopOrderInput, OrderSyncTaskUncheckedCreateWithoutShopOrderInput>
  }

  export type OrderSyncTaskCreateManyShopOrderInputEnvelope = {
    data: OrderSyncTaskCreateManyShopOrderInput | OrderSyncTaskCreateManyShopOrderInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutOrdersInput = {
    update: XOR<ProductUpdateWithoutOrdersInput, ProductUncheckedUpdateWithoutOrdersInput>
    create: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrdersInput, ProductUncheckedUpdateWithoutOrdersInput>
  }

  export type ProductUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProfile?: PaymentProfileUpdateOneWithoutProductsNestedInput
    skus?: ProductSkuUpdateManyWithoutProductNestedInput
    cards?: CardItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: ProductSkuUncheckedUpdateManyWithoutProductNestedInput
    cards?: CardItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type PaymentProfileUpsertWithoutOrdersInput = {
    update: XOR<PaymentProfileUpdateWithoutOrdersInput, PaymentProfileUncheckedUpdateWithoutOrdersInput>
    create: XOR<PaymentProfileCreateWithoutOrdersInput, PaymentProfileUncheckedCreateWithoutOrdersInput>
    where?: PaymentProfileWhereInput
  }

  export type PaymentProfileUpdateToOneWithWhereWithoutOrdersInput = {
    where?: PaymentProfileWhereInput
    data: XOR<PaymentProfileUpdateWithoutOrdersInput, PaymentProfileUncheckedUpdateWithoutOrdersInput>
  }

  export type PaymentProfileUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: MerchantAccountUpdateOneWithoutPaymentProfileNestedInput
    products?: ProductUpdateManyWithoutPaymentProfileNestedInput
    revisions?: PaymentProfileRevisionUpdateManyWithoutPaymentProfileNestedInput
  }

  export type PaymentProfileUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    merchantCode?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    apiSecret?: StringFieldUpdateOperationsInput | string
    notifySecret?: NullableStringFieldUpdateOperationsInput | string | null
    defaultChannelCode?: StringFieldUpdateOperationsInput | string
    enabledChannelCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutPaymentProfileNestedInput
    revisions?: PaymentProfileRevisionUncheckedUpdateManyWithoutPaymentProfileNestedInput
  }

  export type ProductSkuUpsertWithoutOrdersInput = {
    update: XOR<ProductSkuUpdateWithoutOrdersInput, ProductSkuUncheckedUpdateWithoutOrdersInput>
    create: XOR<ProductSkuCreateWithoutOrdersInput, ProductSkuUncheckedCreateWithoutOrdersInput>
    where?: ProductSkuWhereInput
  }

  export type ProductSkuUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ProductSkuWhereInput
    data: XOR<ProductSkuUpdateWithoutOrdersInput, ProductSkuUncheckedUpdateWithoutOrdersInput>
  }

  export type ProductSkuUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSkusNestedInput
    cards?: CardItemUpdateManyWithoutSkuNestedInput
  }

  export type ProductSkuUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutSkuNestedInput
  }

  export type CardItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: CardItemWhereUniqueInput
    update: XOR<CardItemUpdateWithoutOrderInput, CardItemUncheckedUpdateWithoutOrderInput>
    create: XOR<CardItemCreateWithoutOrderInput, CardItemUncheckedCreateWithoutOrderInput>
  }

  export type CardItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: CardItemWhereUniqueInput
    data: XOR<CardItemUpdateWithoutOrderInput, CardItemUncheckedUpdateWithoutOrderInput>
  }

  export type CardItemUpdateManyWithWhereWithoutOrderInput = {
    where: CardItemScalarWhereInput
    data: XOR<CardItemUpdateManyMutationInput, CardItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type ShopPaymentAttemptUpsertWithWhereUniqueWithoutShopOrderInput = {
    where: ShopPaymentAttemptWhereUniqueInput
    update: XOR<ShopPaymentAttemptUpdateWithoutShopOrderInput, ShopPaymentAttemptUncheckedUpdateWithoutShopOrderInput>
    create: XOR<ShopPaymentAttemptCreateWithoutShopOrderInput, ShopPaymentAttemptUncheckedCreateWithoutShopOrderInput>
  }

  export type ShopPaymentAttemptUpdateWithWhereUniqueWithoutShopOrderInput = {
    where: ShopPaymentAttemptWhereUniqueInput
    data: XOR<ShopPaymentAttemptUpdateWithoutShopOrderInput, ShopPaymentAttemptUncheckedUpdateWithoutShopOrderInput>
  }

  export type ShopPaymentAttemptUpdateManyWithWhereWithoutShopOrderInput = {
    where: ShopPaymentAttemptScalarWhereInput
    data: XOR<ShopPaymentAttemptUpdateManyMutationInput, ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderInput>
  }

  export type ShopPaymentAttemptScalarWhereInput = {
    AND?: ShopPaymentAttemptScalarWhereInput | ShopPaymentAttemptScalarWhereInput[]
    OR?: ShopPaymentAttemptScalarWhereInput[]
    NOT?: ShopPaymentAttemptScalarWhereInput | ShopPaymentAttemptScalarWhereInput[]
    id?: StringFilter<"ShopPaymentAttempt"> | string
    shopOrderId?: StringFilter<"ShopPaymentAttempt"> | string
    externalOrderId?: StringFilter<"ShopPaymentAttempt"> | string
    novapayOrderId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    merchantChannelAccountId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    channelCode?: StringFilter<"ShopPaymentAttempt"> | string
    amountCents?: IntFilter<"ShopPaymentAttempt"> | number
    status?: EnumPaymentAttemptStatusFilter<"ShopPaymentAttempt"> | $Enums.PaymentAttemptStatus
    checkoutUrl?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    hostedCheckoutUrl?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    expiresAt?: DateTimeNullableFilter<"ShopPaymentAttempt"> | Date | string | null
    callbackEventId?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    traceId?: StringFilter<"ShopPaymentAttempt"> | string
    createRequestPayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    createResponsePayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    lastRemotePayload?: StringNullableFilter<"ShopPaymentAttempt"> | string | null
    lastSyncedAt?: DateTimeNullableFilter<"ShopPaymentAttempt"> | Date | string | null
    createdAt?: DateTimeFilter<"ShopPaymentAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"ShopPaymentAttempt"> | Date | string
  }

  export type OrderSyncTaskUpsertWithWhereUniqueWithoutShopOrderInput = {
    where: OrderSyncTaskWhereUniqueInput
    update: XOR<OrderSyncTaskUpdateWithoutShopOrderInput, OrderSyncTaskUncheckedUpdateWithoutShopOrderInput>
    create: XOR<OrderSyncTaskCreateWithoutShopOrderInput, OrderSyncTaskUncheckedCreateWithoutShopOrderInput>
  }

  export type OrderSyncTaskUpdateWithWhereUniqueWithoutShopOrderInput = {
    where: OrderSyncTaskWhereUniqueInput
    data: XOR<OrderSyncTaskUpdateWithoutShopOrderInput, OrderSyncTaskUncheckedUpdateWithoutShopOrderInput>
  }

  export type OrderSyncTaskUpdateManyWithWhereWithoutShopOrderInput = {
    where: OrderSyncTaskScalarWhereInput
    data: XOR<OrderSyncTaskUpdateManyMutationInput, OrderSyncTaskUncheckedUpdateManyWithoutShopOrderInput>
  }

  export type OrderSyncTaskScalarWhereInput = {
    AND?: OrderSyncTaskScalarWhereInput | OrderSyncTaskScalarWhereInput[]
    OR?: OrderSyncTaskScalarWhereInput[]
    NOT?: OrderSyncTaskScalarWhereInput | OrderSyncTaskScalarWhereInput[]
    id?: StringFilter<"OrderSyncTask"> | string
    taskType?: StringFilter<"OrderSyncTask"> | string
    shopOrderId?: StringNullableFilter<"OrderSyncTask"> | string | null
    paymentAttemptId?: StringNullableFilter<"OrderSyncTask"> | string | null
    status?: EnumSyncTaskStatusFilter<"OrderSyncTask"> | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFilter<"OrderSyncTask"> | Date | string
    startedAt?: DateTimeNullableFilter<"OrderSyncTask"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"OrderSyncTask"> | Date | string | null
    retryCount?: IntFilter<"OrderSyncTask"> | number
    lastError?: StringNullableFilter<"OrderSyncTask"> | string | null
    payload?: StringNullableFilter<"OrderSyncTask"> | string | null
    createdAt?: DateTimeFilter<"OrderSyncTask"> | Date | string
  }

  export type ShopOrderCreateWithoutPaymentAttemptsInput = {
    id?: string
    orderNo: string
    publicToken: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutOrdersInput
    paymentProfile?: PaymentProfileCreateNestedOneWithoutOrdersInput
    sku: ProductSkuCreateNestedOneWithoutOrdersInput
    cards?: CardItemCreateNestedManyWithoutOrderInput
    syncTasks?: OrderSyncTaskCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderUncheckedCreateWithoutPaymentAttemptsInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    paymentProfileId?: string | null
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutOrderInput
    syncTasks?: OrderSyncTaskUncheckedCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderCreateOrConnectWithoutPaymentAttemptsInput = {
    where: ShopOrderWhereUniqueInput
    create: XOR<ShopOrderCreateWithoutPaymentAttemptsInput, ShopOrderUncheckedCreateWithoutPaymentAttemptsInput>
  }

  export type OrderSyncTaskCreateWithoutPaymentAttemptInput = {
    id?: string
    taskType: string
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
    shopOrder?: ShopOrderCreateNestedOneWithoutSyncTasksInput
  }

  export type OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput = {
    id?: string
    taskType: string
    shopOrderId?: string | null
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
  }

  export type OrderSyncTaskCreateOrConnectWithoutPaymentAttemptInput = {
    where: OrderSyncTaskWhereUniqueInput
    create: XOR<OrderSyncTaskCreateWithoutPaymentAttemptInput, OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput>
  }

  export type OrderSyncTaskCreateManyPaymentAttemptInputEnvelope = {
    data: OrderSyncTaskCreateManyPaymentAttemptInput | OrderSyncTaskCreateManyPaymentAttemptInput[]
    skipDuplicates?: boolean
  }

  export type ShopOrderUpsertWithoutPaymentAttemptsInput = {
    update: XOR<ShopOrderUpdateWithoutPaymentAttemptsInput, ShopOrderUncheckedUpdateWithoutPaymentAttemptsInput>
    create: XOR<ShopOrderCreateWithoutPaymentAttemptsInput, ShopOrderUncheckedCreateWithoutPaymentAttemptsInput>
    where?: ShopOrderWhereInput
  }

  export type ShopOrderUpdateToOneWithWhereWithoutPaymentAttemptsInput = {
    where?: ShopOrderWhereInput
    data: XOR<ShopOrderUpdateWithoutPaymentAttemptsInput, ShopOrderUncheckedUpdateWithoutPaymentAttemptsInput>
  }

  export type ShopOrderUpdateWithoutPaymentAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    paymentProfile?: PaymentProfileUpdateOneWithoutOrdersNestedInput
    sku?: ProductSkuUpdateOneRequiredWithoutOrdersNestedInput
    cards?: CardItemUpdateManyWithoutOrderNestedInput
    syncTasks?: OrderSyncTaskUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateWithoutPaymentAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutOrderNestedInput
    syncTasks?: OrderSyncTaskUncheckedUpdateManyWithoutShopOrderNestedInput
  }

  export type OrderSyncTaskUpsertWithWhereUniqueWithoutPaymentAttemptInput = {
    where: OrderSyncTaskWhereUniqueInput
    update: XOR<OrderSyncTaskUpdateWithoutPaymentAttemptInput, OrderSyncTaskUncheckedUpdateWithoutPaymentAttemptInput>
    create: XOR<OrderSyncTaskCreateWithoutPaymentAttemptInput, OrderSyncTaskUncheckedCreateWithoutPaymentAttemptInput>
  }

  export type OrderSyncTaskUpdateWithWhereUniqueWithoutPaymentAttemptInput = {
    where: OrderSyncTaskWhereUniqueInput
    data: XOR<OrderSyncTaskUpdateWithoutPaymentAttemptInput, OrderSyncTaskUncheckedUpdateWithoutPaymentAttemptInput>
  }

  export type OrderSyncTaskUpdateManyWithWhereWithoutPaymentAttemptInput = {
    where: OrderSyncTaskScalarWhereInput
    data: XOR<OrderSyncTaskUpdateManyMutationInput, OrderSyncTaskUncheckedUpdateManyWithoutPaymentAttemptInput>
  }

  export type ShopOrderCreateWithoutSyncTasksInput = {
    id?: string
    orderNo: string
    publicToken: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutOrdersInput
    paymentProfile?: PaymentProfileCreateNestedOneWithoutOrdersInput
    sku: ProductSkuCreateNestedOneWithoutOrdersInput
    cards?: CardItemCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderUncheckedCreateWithoutSyncTasksInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    paymentProfileId?: string | null
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardItemUncheckedCreateNestedManyWithoutOrderInput
    paymentAttempts?: ShopPaymentAttemptUncheckedCreateNestedManyWithoutShopOrderInput
  }

  export type ShopOrderCreateOrConnectWithoutSyncTasksInput = {
    where: ShopOrderWhereUniqueInput
    create: XOR<ShopOrderCreateWithoutSyncTasksInput, ShopOrderUncheckedCreateWithoutSyncTasksInput>
  }

  export type ShopPaymentAttemptCreateWithoutSyncTasksInput = {
    id?: string
    externalOrderId: string
    novapayOrderId?: string | null
    merchantChannelAccountId?: string | null
    channelCode: string
    amountCents: number
    status?: $Enums.PaymentAttemptStatus
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    expiresAt?: Date | string | null
    callbackEventId?: string | null
    traceId: string
    createRequestPayload?: string | null
    createResponsePayload?: string | null
    lastRemotePayload?: string | null
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shopOrder: ShopOrderCreateNestedOneWithoutPaymentAttemptsInput
  }

  export type ShopPaymentAttemptUncheckedCreateWithoutSyncTasksInput = {
    id?: string
    shopOrderId: string
    externalOrderId: string
    novapayOrderId?: string | null
    merchantChannelAccountId?: string | null
    channelCode: string
    amountCents: number
    status?: $Enums.PaymentAttemptStatus
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    expiresAt?: Date | string | null
    callbackEventId?: string | null
    traceId: string
    createRequestPayload?: string | null
    createResponsePayload?: string | null
    lastRemotePayload?: string | null
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopPaymentAttemptCreateOrConnectWithoutSyncTasksInput = {
    where: ShopPaymentAttemptWhereUniqueInput
    create: XOR<ShopPaymentAttemptCreateWithoutSyncTasksInput, ShopPaymentAttemptUncheckedCreateWithoutSyncTasksInput>
  }

  export type ShopOrderUpsertWithoutSyncTasksInput = {
    update: XOR<ShopOrderUpdateWithoutSyncTasksInput, ShopOrderUncheckedUpdateWithoutSyncTasksInput>
    create: XOR<ShopOrderCreateWithoutSyncTasksInput, ShopOrderUncheckedCreateWithoutSyncTasksInput>
    where?: ShopOrderWhereInput
  }

  export type ShopOrderUpdateToOneWithWhereWithoutSyncTasksInput = {
    where?: ShopOrderWhereInput
    data: XOR<ShopOrderUpdateWithoutSyncTasksInput, ShopOrderUncheckedUpdateWithoutSyncTasksInput>
  }

  export type ShopOrderUpdateWithoutSyncTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    paymentProfile?: PaymentProfileUpdateOneWithoutOrdersNestedInput
    sku?: ProductSkuUpdateOneRequiredWithoutOrdersNestedInput
    cards?: CardItemUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateWithoutSyncTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopPaymentAttemptUpsertWithoutSyncTasksInput = {
    update: XOR<ShopPaymentAttemptUpdateWithoutSyncTasksInput, ShopPaymentAttemptUncheckedUpdateWithoutSyncTasksInput>
    create: XOR<ShopPaymentAttemptCreateWithoutSyncTasksInput, ShopPaymentAttemptUncheckedCreateWithoutSyncTasksInput>
    where?: ShopPaymentAttemptWhereInput
  }

  export type ShopPaymentAttemptUpdateToOneWithWhereWithoutSyncTasksInput = {
    where?: ShopPaymentAttemptWhereInput
    data: XOR<ShopPaymentAttemptUpdateWithoutSyncTasksInput, ShopPaymentAttemptUncheckedUpdateWithoutSyncTasksInput>
  }

  export type ShopPaymentAttemptUpdateWithoutSyncTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shopOrder?: ShopOrderUpdateOneRequiredWithoutPaymentAttemptsNestedInput
  }

  export type ShopPaymentAttemptUncheckedUpdateWithoutSyncTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopOrderId?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSkuCreateManyProductInput = {
    id?: string
    name: string
    summary?: string | null
    priceCents: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardItemCreateManyProductInput = {
    id?: string
    skuId: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    orderId?: string | null
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopOrderCreateManyProductInput = {
    id?: string
    orderNo: string
    publicToken: string
    paymentProfileId?: string | null
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductSkuUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUpdateManyWithoutSkuNestedInput
    orders?: ShopOrderUpdateManyWithoutSkuNestedInput
  }

  export type ProductSkuUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutSkuNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutSkuNestedInput
  }

  export type ProductSkuUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: ProductSkuUpdateOneRequiredWithoutCardsNestedInput
    order?: ShopOrderUpdateOneWithoutCardsNestedInput
  }

  export type CardItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopOrderUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentProfile?: PaymentProfileUpdateOneWithoutOrdersNestedInput
    sku?: ProductSkuUpdateOneRequiredWithoutOrdersNestedInput
    cards?: CardItemUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUncheckedUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemCreateManySkuInput = {
    id?: string
    productId: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    orderId?: string | null
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopOrderCreateManySkuInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    paymentProfileId?: string | null
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardItemUpdateWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutCardsNestedInput
    order?: ShopOrderUpdateOneWithoutCardsNestedInput
  }

  export type CardItemUncheckedUpdateWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemUncheckedUpdateManyWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopOrderUpdateWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    paymentProfile?: PaymentProfileUpdateOneWithoutOrdersNestedInput
    cards?: CardItemUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUncheckedUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateManyWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    paymentProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyPaymentProfileInput = {
    id?: string
    name: string
    slug: string
    summary?: string | null
    description?: string | null
    priceCents: number
    saleMode?: $Enums.ProductSaleMode
    status?: $Enums.ProductStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopOrderCreateManyPaymentProfileInput = {
    id?: string
    orderNo: string
    publicToken: string
    productId: string
    skuId: string
    quantity: number
    customerEmail: string
    amountCents: number
    channelCode: string
    status?: $Enums.ShopOrderStatus
    novapayOrderId?: string | null
    novapayStatus?: string | null
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    failureMessage?: string | null
    expiresAt: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    lastSyncedAt?: Date | string | null
    lastNovaCreateResponse?: string | null
    lastNovaPayload?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentProfileRevisionCreateManyPaymentProfileInput = {
    id?: string
    version: number
    sourceScope: string
    actorType: string
    actorId?: string | null
    actorLabel: string
    changeType: string
    summary: string
    snapshot: string
    createdAt?: Date | string
  }

  export type ProductUpdateWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: ProductSkuUpdateManyWithoutProductNestedInput
    cards?: CardItemUpdateManyWithoutProductNestedInput
    orders?: ShopOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: ProductSkuUncheckedUpdateManyWithoutProductNestedInput
    cards?: CardItemUncheckedUpdateManyWithoutProductNestedInput
    orders?: ShopOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceCents?: IntFieldUpdateOperationsInput | number
    saleMode?: EnumProductSaleModeFieldUpdateOperationsInput | $Enums.ProductSaleMode
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopOrderUpdateWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    sku?: ProductSkuUpdateOneRequiredWithoutOrdersNestedInput
    cards?: CardItemUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardItemUncheckedUpdateManyWithoutOrderNestedInput
    paymentAttempts?: ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderNestedInput
    syncTasks?: OrderSyncTaskUncheckedUpdateManyWithoutShopOrderNestedInput
  }

  export type ShopOrderUncheckedUpdateManyWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    customerEmail?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    channelCode?: StringFieldUpdateOperationsInput | string
    status?: EnumShopOrderStatusFieldUpdateOperationsInput | $Enums.ShopOrderStatus
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    novapayStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastNovaCreateResponse?: NullableStringFieldUpdateOperationsInput | string | null
    lastNovaPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProfileRevisionUpdateWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    sourceScope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    changeType?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    snapshot?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProfileRevisionUncheckedUpdateWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    sourceScope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    changeType?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    snapshot?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentProfileRevisionUncheckedUpdateManyWithoutPaymentProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    sourceScope?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorLabel?: StringFieldUpdateOperationsInput | string
    changeType?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    snapshot?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemCreateManyOrderInput = {
    id?: string
    productId: string
    skuId: string
    batchName?: string | null
    secret: string
    status?: $Enums.CardItemStatus
    reservedAt?: Date | string | null
    soldAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopPaymentAttemptCreateManyShopOrderInput = {
    id?: string
    externalOrderId: string
    novapayOrderId?: string | null
    merchantChannelAccountId?: string | null
    channelCode: string
    amountCents: number
    status?: $Enums.PaymentAttemptStatus
    checkoutUrl?: string | null
    hostedCheckoutUrl?: string | null
    expiresAt?: Date | string | null
    callbackEventId?: string | null
    traceId: string
    createRequestPayload?: string | null
    createResponsePayload?: string | null
    lastRemotePayload?: string | null
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderSyncTaskCreateManyShopOrderInput = {
    id?: string
    taskType: string
    paymentAttemptId?: string | null
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
  }

  export type CardItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutCardsNestedInput
    sku?: ProductSkuUpdateOneRequiredWithoutCardsNestedInput
  }

  export type CardItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    batchName?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumCardItemStatusFieldUpdateOperationsInput | $Enums.CardItemStatus
    reservedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    soldAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPaymentAttemptUpdateWithoutShopOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncTasks?: OrderSyncTaskUpdateManyWithoutPaymentAttemptNestedInput
  }

  export type ShopPaymentAttemptUncheckedUpdateWithoutShopOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncTasks?: OrderSyncTaskUncheckedUpdateManyWithoutPaymentAttemptNestedInput
  }

  export type ShopPaymentAttemptUncheckedUpdateManyWithoutShopOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalOrderId?: StringFieldUpdateOperationsInput | string
    novapayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    merchantChannelAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    channelCode?: StringFieldUpdateOperationsInput | string
    amountCents?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentAttemptStatusFieldUpdateOperationsInput | $Enums.PaymentAttemptStatus
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    hostedCheckoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    callbackEventId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: StringFieldUpdateOperationsInput | string
    createRequestPayload?: NullableStringFieldUpdateOperationsInput | string | null
    createResponsePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastRemotePayload?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderSyncTaskUpdateWithoutShopOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentAttempt?: ShopPaymentAttemptUpdateOneWithoutSyncTasksNestedInput
  }

  export type OrderSyncTaskUncheckedUpdateWithoutShopOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    paymentAttemptId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderSyncTaskUncheckedUpdateManyWithoutShopOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    paymentAttemptId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderSyncTaskCreateManyPaymentAttemptInput = {
    id?: string
    taskType: string
    shopOrderId?: string | null
    status?: $Enums.SyncTaskStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    retryCount?: number
    lastError?: string | null
    payload?: string | null
    createdAt?: Date | string
  }

  export type OrderSyncTaskUpdateWithoutPaymentAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shopOrder?: ShopOrderUpdateOneWithoutSyncTasksNestedInput
  }

  export type OrderSyncTaskUncheckedUpdateWithoutPaymentAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    shopOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderSyncTaskUncheckedUpdateManyWithoutPaymentAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskType?: StringFieldUpdateOperationsInput | string
    shopOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSyncTaskStatusFieldUpdateOperationsInput | $Enums.SyncTaskStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}