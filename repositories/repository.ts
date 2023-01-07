export interface Repository<T> {
    save(t: T): void;
    fetchAll(): Promise<T[]>;
}