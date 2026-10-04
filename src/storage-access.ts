/** Native transactions let host adapters atomically update files and SeqFile records.
 * Callers must await completion and perform only database work inside a transaction.
 */
export interface IndexedDBStorageAccess {
    readonly identity: string;
    transaction(stores: string | string[], mode?: IDBTransactionMode, options?: IDBTransactionOptions): IDBTransaction;
}
